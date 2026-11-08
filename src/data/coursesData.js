// ============================================================================
// 5S AI EDUCATION - SYSTEM CONFIGURATION & BILINGUAL METADATA
// All course records are stored in and synchronized with PostgreSQL (eduai_5s)
// ============================================================================

export const CONTACT_INFO = {
  phone: '0862034101',
  phoneDisplay: '0862.034.101',
  zaloUrl: 'https://zalo.me/0862034101',
  email: 'congtyphattriencongnghe5s@gmail.com',
  fanpageUrl: 'https://www.facebook.com/share/1Cffgf33LJ/?mibextid=wwXIfr',
  companyName: 'Công ty Phát triển Công nghệ 5S',
};

export const DEFAULT_SEPAY_CONFIG = {
  bankName: 'MBBank',
  accountNumber: '789220206',
  accountName: 'CONG TY PHAT TRIEN CONG NGHE 5S',
  template: 'compact2',
  webhookUrl: '/api/webhooks/sepay',
};

export const USER_ROLES = [
  {
    id: 'student',
    label: 'Học sinh / Sinh viên (Được tặng khóa Cơ bản Miễn phí)',
    labelEn: 'Students & Campus (Free Foundational Courses)',
    shortLabel: 'Học sinh / Sinh viên',
    shortLabelEn: 'Students & Campus',
    badge: 'Học viên HSSV',
    badgeEn: 'Student Member',
    description:
      'Mở khóa miễn phí các khóa học nền tảng chọn lọc về Bảo mật Google, AI Viết Code & AI Văn phòng. Các khóa chuyên sâu cần mua để mở khóa.',
    descriptionEn:
      'Free access to foundational courses in Google Security, AI Coding & Office AI. Intermediate and Advanced courses can be unlocked via SePay.',
    allowedPillars: ['google-security', 'ai-coding', 'ai-office'],
    color: 'blue',
  },
  {
    id: 'business',
    label: 'Doanh nghiệp cần triển khai học AI (Gói B2B & Quản trị)',
    labelEn: 'Enterprise AI Training (B2B & Corporate Package)',
    shortLabel: 'Doanh nghiệp (B2B)',
    shortLabelEn: 'Enterprise (B2B)',
    badge: 'Tài khoản Doanh nghiệp',
    badgeEn: 'Enterprise Account',
    description:
      'Lộ trình đào tạo nhân sự toàn diện: Chuẩn hóa bảo mật Google Workspace, tự động hóa PowerPoint/Canva/Excel và ứng dụng AI Coding cho đội ngũ kỹ thuật.',
    descriptionEn:
      'Comprehensive corporate training: Google Workspace security standardization, PowerPoint/Canva/Excel automation, and AI Coding for engineering teams.',
    allowedPillars: ['ai-office', 'google-security', 'ai-coding'],
    color: 'blue',
  },
  {
    id: 'individual_google',
    label: 'Cá nhân: Học chuyên sâu Google & Bảo mật thông tin',
    labelEn: 'Individual: Google Ecosystem & Information Security',
    shortLabel: 'Chuyên đề Google & Bảo mật',
    shortLabelEn: 'Google & Security Track',
    badge: 'Học viên Bảo mật & Google',
    badgeEn: 'Google Security Learner',
    description:
      'Hiển thị chuyên biệt lộ trình làm chủ hệ sinh thái Google, thao tác hệ thống chuẩn, cài đặt phần mềm an toàn và chống lừa đảo mạng.',
    descriptionEn:
      'Dedicated learning track for mastering the Google ecosystem, safe software installation, system operations, and anti-phishing security.',
    allowedPillars: ['google-security'],
    color: 'blue',
  },
  {
    id: 'individual_aicode',
    label: 'Cá nhân: Học dùng AI viết Code (Antigravity, VS Code, Claude, Cursor)',
    labelEn: 'Individual: AI Software Coding (Antigravity, VS Code, Claude, Cursor)',
    shortLabel: 'Chuyên đề AI Viết Code',
    shortLabelEn: 'AI Coding Track',
    badge: 'Học viên AI Coding',
    badgeEn: 'AI Coding Learner',
    description:
      'Hiển thị chuyên biệt lộ trình lập trình thế hệ mới với 4 công cụ mạnh nhất: Google Antigravity, VS Code, Claude và Cursor.',
    descriptionEn:
      'Dedicated next-gen software engineering curriculum focused on the 4 core tools: Google Antigravity, VS Code, Claude, and Cursor.',
    allowedPillars: ['ai-coding'],
    color: 'blue',
  },
  {
    id: 'individual_aioffice',
    label: 'Cá nhân: Ứng dụng AI Thực tế & Công việc (PowerPoint, Canva, Excel)',
    labelEn: 'Individual: Applied Office AI (PowerPoint, Canva, Excel)',
    shortLabel: 'Chuyên đề AI Văn phòng & Thực tế',
    shortLabelEn: 'Applied Office AI Track',
    badge: 'Học viên AI Văn phòng',
    badgeEn: 'Office AI Learner',
    description:
      'Hiển thị chuyên biệt lộ trình ứng dụng AI tạo Slide thuyết trình, thiết kế Canva tự động và phân tích dữ liệu báo cáo Excel.',
    descriptionEn:
      'Dedicated track for AI presentation slides, automated Canva visual design, and intelligent Excel reporting.',
    allowedPillars: ['ai-office'],
    color: 'blue',
  },
  {
    id: 'individual_all',
    label: 'Cá nhân: Khám phá toàn diện cả 3 mảng (Google + AI Code + AI Văn phòng)',
    labelEn: 'Individual: Full All-Access Track (All 3 Core Pillars)',
    shortLabel: 'Cá nhân (Tất cả 3 mảng)',
    shortLabelEn: 'All-Access (3 Pillars)',
    badge: 'Học viên Toàn diện',
    badgeEn: 'All-Access Learner',
    description:
      'Hiển thị đầy đủ các khóa học từ Cơ bản miễn phí đến Nâng cao trên cả 3 trụ cột đào tạo của 5S AI Education.',
    descriptionEn:
      'Full access to browse Beginner free courses and Pro courses across all 3 training pillars of 5S AI Education.',
    allowedPillars: ['google-security', 'ai-coding', 'ai-office'],
    color: 'blue',
  },
];

export const PILLARS = [
  {
    id: 'google-security',
    name: 'Google & Bảo Mật Thông Tin',
    nameEn: 'Google & Information Security',
    shortName: 'Google & Bảo mật',
    shortNameEn: 'Google & Security',
    subtitle:
      'Thao tác hệ thống chuẩn • Cài đặt App an toàn • Bảo mật Google Workspace',
    subtitleEn:
      'Safe System Operations • Secure App Installation • Google Workspace Security',
    accentColor: '#0056D2',
    badgeBg: 'bg-blue-50 text-[#0056D2] border-blue-200',
    tools: ['Google Workspace', 'Chrome Security', 'Google Drive', 'Windows / macOS Safe'],
    whyLearnTitle:
      'Tại sao phải học Bảo mật & Thao tác Google trong kỷ nguyên số?',
    whyLearnTitleEn:
      'Why Master Google Ecosystem & Cyber Security in the Digital Era?',
    whyLearnPoints: [
      '92% vụ mất tài khoản ngân hàng, Gmail và dữ liệu doanh nghiệp bắt nguồn từ việc tải nhầm bộ cài giả mạo (.exe/.dmg chứa mã độc) và bấm vào link lừa đảo.',
      'Biết cách kiểm tra nguồn cài đặt phần mềm chính thống, cô lập quyền truy cập và thiết lập bảo mật 2 lớp (2FA / Passkeys) giúp bảo vệ tài sản số tuyệt đối.',
      'Tối ưu hóa toàn bộ hệ sinh thái Google (Drive, Gmail, Docs, Chrome Profiles) để làm việc khoa học, đồng bộ đám mây không bao giờ lo mất file.',
    ],
    whyLearnPointsEn: [
      '92% of account breaches and corporate data leaks originate from fake software installers (.exe/.dmg malware) and sophisticated phishing links.',
      'Learn how to verify digital signatures, isolate app permissions, and configure hardware-grade 2FA / Passkeys to protect your digital assets.',
      'Optimize the entire Google ecosystem (Drive, Gmail, Docs, Chrome Profiles) for structured cloud workflows without ever losing files.',
    ],
  },
  {
    id: 'ai-coding',
    name: 'AI Viết Code (Antigravity, VS Code, Claude, Cursor)',
    nameEn: 'AI Software Coding (Antigravity, VS Code, Claude, Cursor)',
    shortName: 'AI Viết Code',
    shortNameEn: 'AI Coding',
    subtitle:
      'Lập trình thực chiến cùng bộ tứ: Google Antigravity • VS Code • Claude • Cursor',
    subtitleEn:
      'Hands-on engineering with: Google Antigravity • VS Code • Claude • Cursor',
    accentColor: '#0284C7',
    badgeBg: 'bg-sky-50 text-[#0284C7] border-sky-200',
    tools: ['Google Antigravity', 'VS Code', 'Claude AI', 'Cursor IDE'],
    whyLearnTitle:
      'Tại sao AI Viết Code đang thay đổi hoàn toàn ngành phần mềm?',
    whyLearnTitleEn:
      'Why AI-Native Coding is Redefining Software Engineering',
    whyLearnPoints: [
      'Một người biết điều phối Google Antigravity, Cursor và Claude trên VS Code hiện nay có thể tự xây dựng hoàn chỉnh Website, App và Tool tự động hóa nhanh gấp 5–10 lần lập trình truyền thống.',
      'Không cần mất nhiều năm học cú pháp khô khan: Bạn học cách tư duy kiến trúc hệ thống, viết Prompt kỹ thuật chuẩn xác và kiểm thử sản phẩm thực tế.',
      'Trở thành nhân sự AI-Native được săn đón nhất tại các công ty công nghệ hoặc tự xây dựng sản phẩm khởi nghiệp (SaaS) với chi phí tối ưu.',
    ],
    whyLearnPointsEn: [
      'A single developer orchestrating Google Antigravity, Cursor, and Claude in VS Code can build full-stack web apps and automation tools 5–10x faster.',
      'Move beyond memorizing syntax: Learn system architecture thinking, structured technical prompting, and production code verification.',
      'Become a sought-after AI-Native engineer or launch your own software products with minimal overhead.',
    ],
  },
  {
    id: 'ai-office',
    name: 'Ứng Dụng AI Thực Tế & Công Việc (PowerPoint, Canva, Excel)',
    nameEn: 'Applied Office & Workplace AI (PowerPoint, Canva, Excel)',
    shortName: 'AI Văn phòng & Thực tế',
    shortNameEn: 'Applied Office AI',
    subtitle:
      'Tự động hóa thuyết trình PowerPoint • Thiết kế Canva AI • Phân tích dữ liệu Excel',
    subtitleEn:
      'PowerPoint Slide Automation • Canva AI Visuals • Excel Data Analytics',
    accentColor: '#0EA5E9',
    badgeBg: 'bg-cyan-50 text-[#0369A1] border-cyan-200',
    tools: ['PowerPoint AI', 'Canva Magic Studio', 'Excel AI & Copilot'],
    whyLearnTitle:
      'Tại sao dân văn phòng & sinh viên bắt buộc phải làm chủ AI Thực tế?',
    whyLearnTitleEn:
      'Why Office Professionals & Students Must Master Applied AI',
    whyLearnPoints: [
      'Rút ngắn thời gian làm slide thuyết trình PowerPoint từ 6 tiếng xuống còn 15 phút với bố cục chuẩn tư vấn chiến lược và biểu đồ trực quan.',
      'Tự tay thiết kế hàng loạt ấn phẩm truyền thông, bài thuyết trình và bộ nhận diện thương hiệu chuyên nghiệp trên Canva AI mà không cần thuê Designer.',
      'Xử lý bảng tính Excel hàng chục nghìn dòng, tự động viết công thức phức tạp, làm sạch dữ liệu và xuất báo cáo quản trị chỉ bằng câu lệnh tiếng Việt.',
    ],
    whyLearnPointsEn: [
      'Cut PowerPoint slide creation time from 6 hours to 15 minutes with executive-grade layouts and automated data visualization.',
      'Design brand-ready marketing assets, presentations, and social media campaigns in Canva AI without needing a dedicated design team.',
      'Process tens of thousands of Excel rows, generate complex formulas, clean messy datasets, and build executive dashboards using natural language.',
    ],
  },
];

export const LEVELS = [
  { id: 'all', name: 'Tất cả cấp độ', nameEn: 'All Levels' },
  {
    id: 'beginner',
    name: 'Cơ bản (Beginner)',
    nameEn: 'Beginner',
    short: 'Cơ bản',
    shortEn: 'Beginner',
    badgeClass: 'bg-sky-50 text-[#0284C7] border-sky-200',
  },
  {
    id: 'intermediate',
    name: 'Trung cấp (Intermediate)',
    nameEn: 'Intermediate',
    short: 'Trung cấp',
    shortEn: 'Intermediate',
    badgeClass: 'bg-blue-50 text-[#0056D2] border-blue-200',
  },
  {
    id: 'advanced',
    name: 'Nâng cao (Advanced)',
    nameEn: 'Advanced',
    short: 'Nâng cao',
    shortEn: 'Advanced',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
];

export const AVAILABLE_TOOLS = [
  'Google Antigravity',
  'VS Code',
  'Claude AI',
  'Cursor IDE',
  'Google Workspace',
  'Google Drive',
  'Chrome Security',
  'PowerPoint AI',
  'Canva AI',
  'Excel AI',
];

// Sample courses removed as requested. Courses are managed via Admin Dashboard & PostgreSQL.
export const COURSES = [];
