import pg from 'pg';
import net from 'net';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { buildAll60SeedCourses } from './seedCourses.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '220206',
  database: process.env.DB_NAME || 'eduai_5s',
};

let dbAdapter = null;
let dbMode = 'postgresql'; // 'native-pg' or 'embedded-pg-5432'

function checkTcpPort(host, port, timeout = 1200) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let resolved = false;
    const done = (result) => {
      if (!resolved) {
        resolved = true;
        socket.destroy();
        resolve(result);
      }
    };
    socket.setTimeout(timeout);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));
    socket.connect(port, host);
  });
}

export async function initDatabase() {
  if (dbAdapter) return dbAdapter;

  const isPortOpen = await checkTcpPort(DB_CONFIG.host, DB_CONFIG.port);

  if (isPortOpen) {
    try {
      // Connect to default 'postgres' database first to ensure 'eduai_5s' exists
      const adminClient = new pg.Client({
        host: DB_CONFIG.host,
        port: DB_CONFIG.port,
        user: DB_CONFIG.user,
        password: DB_CONFIG.password,
        database: 'postgres',
      });
      await adminClient.connect();
      const checkDb = await adminClient.query(
        'SELECT 1 FROM pg_database WHERE datname = $1',
        [DB_CONFIG.database]
      );
      if (checkDb.rowCount === 0) {
        await adminClient.query(`CREATE DATABASE ${DB_CONFIG.database}`);
        console.log(`[PostgreSQL] Created database '${DB_CONFIG.database}'`);
      }
      await adminClient.end();

      const pool = new pg.Pool(DB_CONFIG);
      await pool.query('SELECT 1');
      dbAdapter = {
        query: (text, params) => pool.query(text, params),
      };
      dbMode = 'native-pg';
      console.log(
        `[PostgreSQL] Connected to native PostgreSQL at ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database} (user: ${DB_CONFIG.user})`
      );
    } catch (err) {
      console.warn(
        `[PostgreSQL] Native port ${DB_CONFIG.port} open but connection failed (${err.message}), falling back to embedded PostgreSQL engine.`
      );
    }
  }

  if (!dbAdapter) {
    const { PGlite } = await import('@electric-sql/pglite');
    const { PGLiteSocketServer } = await import('@electric-sql/pglite-socket');

    const dataDir = path.join(__dirname, 'pgdata_eduai_5s');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const pglite = await PGlite.create({ dataDir });
    dbAdapter = {
      query: (text, params = []) => pglite.query(text, params),
    };
    dbMode = 'embedded-pg-5432';

    // Also expose standard PostgreSQL wire protocol on port 5432 if port is free
    try {
      const socketServer = new PGLiteSocketServer({
        db: pglite,
        port: DB_CONFIG.port,
        host: '127.0.0.1',
      });
      await socketServer.start();
      console.log(
        `[PostgreSQL] Started local PostgreSQL wire-protocol server on 127.0.0.1:${DB_CONFIG.port} (DB: ${DB_CONFIG.database}, Password: ${DB_CONFIG.password})`
      );
    } catch (sockErr) {
      console.log(`[PostgreSQL] Running persisted PGlite engine at ${dataDir}`);
    }
  }

  await runMigrations(dbAdapter);
  return dbAdapter;
}

async function runMigrations(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(64) NOT NULL DEFAULT 'student',
      role_label VARCHAR(255),
      google_id VARCHAR(255),
      avatar VARCHAR(16),
      unlocked_courses JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id VARCHAR(100) PRIMARY KEY,
      pillar VARCHAR(64) NOT NULL,
      level VARCHAR(32) NOT NULL,
      title VARCHAR(500) NOT NULL,
      title_en VARCHAR(500),
      provider VARCHAR(255) DEFAULT '5S AI Education',
      duration VARCHAR(100) DEFAULT '10 giờ học',
      duration_en VARCHAR(100) DEFAULT '10 hours',
      lessons INTEGER DEFAULT 12,
      rating NUMERIC(3,1) DEFAULT 5.0,
      reviews INTEGER DEFAULT 1,
      is_free BOOLEAN DEFAULT false,
      free_for_student BOOLEAN DEFAULT false,
      free_for_business BOOLEAN DEFAULT false,
      is_b2b_ready BOOLEAN DEFAULT false,
      price INTEGER DEFAULT 0,
      old_price INTEGER DEFAULT 0,
      tools JSONB DEFAULT '[]'::jsonb,
      skills JSONB DEFAULT '[]'::jsonb,
      skills_en JSONB DEFAULT '[]'::jsonb,
      thumbnail TEXT,
      description TEXT,
      description_en TEXT,
      syllabus JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_code VARCHAR(64) UNIQUE NOT NULL,
      user_id INTEGER,
      user_name VARCHAR(255),
      user_email VARCHAR(255),
      course_id VARCHAR(100) NOT NULL,
      course_title VARCHAR(500),
      amount INTEGER NOT NULL,
      bank_name VARCHAR(64) DEFAULT 'MBBank',
      account_number VARCHAR(64) DEFAULT '789220206',
      status VARCHAR(32) DEFAULT 'pending',
      sepay_transaction_id VARCHAR(128),
      paid_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id VARCHAR(100) PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      category_en VARCHAR(255),
      read_time VARCHAR(64),
      read_time_en VARCHAR(64),
      title VARCHAR(500) NOT NULL,
      title_en VARCHAR(500),
      excerpt TEXT,
      excerpt_en TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS system_settings (
      key VARCHAR(100) PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default Admin user
  const adminCheck = await db.query(
    'SELECT id FROM users WHERE email = $1',
    ['admin@5seduai.vn']
  );
  if (adminCheck.rows.length === 0) {
    const hash = await bcrypt.hash('Admin@123', 10);
    await db.query(
      `INSERT INTO users (name, email, password_hash, role, role_label, avatar, unlocked_courses)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        'Quản Trị Viên 5S AI',
        'admin@5seduai.vn',
        hash,
        'admin',
        'Administrator',
        'AD',
        JSON.stringify([]),
      ]
    );
  }

  // Seed default SePay settings (MBBank: 789220206)
  const sepayCheck = await db.query(
    'SELECT key FROM system_settings WHERE key = $1',
    ['sepay_config']
  );
  if (sepayCheck.rows.length === 0) {
    await db.query(
      'INSERT INTO system_settings (key, value) VALUES ($1, $2)',
      [
        'sepay_config',
        JSON.stringify({
          bankName: process.env.SEPAY_BANK || 'MBBank',
          accountNumber: process.env.SEPAY_ACCOUNT || '789220206',
          accountName:
            process.env.SEPAY_ACCOUNT_NAME || 'CONG TY PHAT TRIEN CONG NGHE 5S',
          template: 'compact2',
          webhookUrl: '/api/webhooks/sepay',
          autoApprove: true,
        }),
      ]
    );
  }

  // Seed default featured articles if empty
  const articlesCheck = await db.query('SELECT COUNT(*) AS cnt FROM articles');
  const articleCount = parseInt(articlesCheck.rows[0]?.cnt || '0', 10);
  if (articleCount === 0) {
    const defaultArticles = [
      {
        id: 'art-1',
        category: 'AI Viết Code • Chuyên sâu',
        category_en: 'AI Coding • Deep Dive',
        read_time: '7 phút đọc',
        read_time_en: '7 min read',
        title:
          'Google Antigravity vs Cursor vs Claude: Cách kết hợp "Bộ Tứ AI Coding" để xây dựng phần mềm nhanh gấp 5 lần',
        title_en:
          'Google Antigravity vs Cursor vs Claude: Combining the "AI Coding Quartet" to Build Software 5x Faster',
        excerpt:
          'Phân tích chi tiết vai trò của từng công cụ: Khi nào dùng Agentic IDE của Google Antigravity, khi nào dùng Composer của Cursor và cách kết hợp Claude với VS Code chuẩn kỹ sư phần mềm.',
        excerpt_en:
          'Detailed breakdown of each tool: When to use Google Antigravity Agentic IDE, when to use Cursor Composer, and how to pair Claude with VS Code like a senior engineer.',
        image:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'art-2',
        category: 'Google & Bảo mật • Cẩm nang',
        category_en: 'Google & Security • Handbook',
        read_time: '5 phút đọc',
        read_time_en: '5 min read',
        title:
          '7 Sai lầm chí mạng khi cài đặt phần mềm & dùng Google khiến 80% người dùng Việt mất tài khoản',
        title_en:
          '7 Critical Mistakes When Installing Apps & Using Google That Compromise 80% of User Accounts',
        excerpt:
          'Hướng dẫn thực hành kiểm tra chữ ký số bộ cài, phòng tránh mã độc đánh cắp Cookie trình duyệt (Session Hijacking) và thiết lập khóa bảo mật Passkeys cho tài khoản Google.',
        excerpt_en:
          'Practical guide to verifying installer digital signatures, preventing browser cookie Session Hijacking malware, and setting up Passkeys for your Google account.',
        image:
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'art-3',
        category: 'AI Văn phòng • Năng suất',
        category_en: 'Applied Office AI • Productivity',
        read_time: '6 phút đọc',
        read_time_en: '6 min read',
        title:
          'Quy trình 15 phút: Biến bảng số liệu Excel thô thành bộ Slide PowerPoint & Ấn phẩm Canva chuẩn thương hiệu bằng AI',
        title_en:
          'The 15-Minute Workflow: Turn Raw Excel Data into Brand-Ready PowerPoint Slides & Canva Designs with AI',
        excerpt:
          'Thay vì mất cả ngày cuối tuần làm báo cáo tuần/tháng, khám phá quy trình liên hoàn từ làm sạch dữ liệu Excel bằng AI đến xuất bản slide thuyết trình tự động.',
        excerpt_en:
          'Instead of spending hours on weekly reports, discover the end-to-end pipeline from AI Excel data cleaning to automated presentation slide publishing.',
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      },
    ];

    for (const art of defaultArticles) {
      await db.query(
        `INSERT INTO articles (id, category, category_en, read_time, read_time_en, title, title_en, excerpt, excerpt_en, image)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          art.id,
          art.category,
          art.category_en,
          art.read_time,
          art.read_time_en,
          art.title,
          art.title_en,
          art.excerpt,
          art.excerpt_en,
          art.image,
        ]
      );
    }
  }

  // Seed 60 Real Production Courses (20 per level: 5 Free + 15 Pro per level)
  const coursesCountRes = await db.query('SELECT COUNT(*) AS cnt FROM courses');
  const currentCourseCount = parseInt(coursesCountRes.rows[0]?.cnt || '0', 10);
  if (currentCourseCount < 60) {
    const seedCourses = buildAll60SeedCourses();
    for (const c of seedCourses) {
      await db.query(
        `INSERT INTO courses (
          id, pillar, level, title, title_en, provider, duration, duration_en,
          lessons, rating, reviews, is_free, free_for_student, free_for_business,
          is_b2b_ready, price, old_price, tools, skills, skills_en,
          thumbnail, description, description_en, syllabus
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24
        ) ON CONFLICT (id) DO UPDATE SET
          pillar = EXCLUDED.pillar,
          level = EXCLUDED.level,
          title = EXCLUDED.title,
          title_en = EXCLUDED.title_en,
          provider = EXCLUDED.provider,
          duration = EXCLUDED.duration,
          duration_en = EXCLUDED.duration_en,
          lessons = EXCLUDED.lessons,
          is_free = EXCLUDED.is_free,
          free_for_student = EXCLUDED.free_for_student,
          free_for_business = EXCLUDED.free_for_business,
          price = EXCLUDED.price,
          old_price = EXCLUDED.old_price,
          tools = EXCLUDED.tools,
          skills = EXCLUDED.skills,
          skills_en = EXCLUDED.skills_en,
          thumbnail = EXCLUDED.thumbnail,
          description = EXCLUDED.description,
          description_en = EXCLUDED.description_en,
          syllabus = EXCLUDED.syllabus`,
        [
          c.id,
          c.pillar,
          c.level,
          c.title,
          c.title_en,
          c.provider,
          c.duration,
          c.duration_en,
          c.lessons,
          c.rating,
          c.reviews,
          c.is_free,
          c.free_for_student,
          c.free_for_business,
          c.is_b2b_ready,
          c.price,
          c.old_price,
          JSON.stringify(c.tools),
          JSON.stringify(c.skills),
          JSON.stringify(c.skills_en),
          c.thumbnail,
          c.description,
          c.description_en,
          JSON.stringify(c.syllabus),
        ]
      );
    }
    console.log('[PostgreSQL] Seeded 60 real courses (20 per level: 5 Free + 15 Pro per level)');
  }
}

export function getDbInfo() {
  return {
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    user: DB_CONFIG.user,
    database: DB_CONFIG.database,
    mode: dbMode,
  };
}

