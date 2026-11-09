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
    label: '1. Dành cho Học sinh (Khóa học cơ bản Miễn phí 100%)',
    labelEn: '1. For Students (100% Free Foundational Courses)',
    shortLabel: 'Học sinh (Miễn phí)',
    shortLabelEn: 'Students (Free)',
    badge: 'Học viên Học sinh',
    badgeEn: 'Student Member',
    description:
      'Miễn phí hoàn toàn các khóa học nền tảng về Tư duy AI, An toàn trên Internet & Kỹ năng sáng tạo. Các khóa chuyên sâu có thể nâng cấp thêm sau.',
    descriptionEn:
      '100% free access to foundational courses in AI logic, cyber safety & creative prompt design. Advanced courses can be unlocked later.',
    allowedPillars: ['google-security', 'ai-coding', 'ai-office'],
    color: 'sky',
    dashboardType: 'student',
  },
  {
    id: 'campus',
    label: '2. Dành cho Trường Đại học (Tích lũy Tín chỉ sinh viên & Đồ án)',
    labelEn: '2. For Campus & Universities (Academic Credits & Capstones)',
    shortLabel: 'Trường Đại học (Tín chỉ)',
    shortLabelEn: 'Campus (Credits)',
    badge: 'Sinh viên / Tín chỉ',
    badgeEn: 'Campus Student',
    description:
      'Chương trình học thuật tích lũy tín chỉ đại học, đồ án thực hành công nghệ AI, bảng điểm học phần và chứng nhận học thuật.',
    descriptionEn:
      'Academic credit-eligible curriculum, semester credit tracking, automated code assessment, and university certified credentials.',
    allowedPillars: ['google-security', 'ai-coding', 'ai-office'],
    color: 'indigo',
    dashboardType: 'campus',
  },
  {
    id: 'individual',
    label: '3. Dành cho Cá nhân (Người đi làm, Nâng cấp kỹ năng & Nghề nghiệp)',
    labelEn: '3. For Individuals (Career Upskilling & Professional Certs)',
    shortLabel: 'Cá nhân (Đi làm)',
    shortLabelEn: 'Individual (Pro)',
    badge: 'Học viên Cá nhân Pro',
    badgeEn: 'Professional Learner',
    description:
      'Lộ trình chuyên nghiệp: Chứng chỉ Kỹ sư AI Coding, Bản đồ năng lực kỹ năng (Radar Chart), Toolkit mẫu và gia tăng thu nhập thực chiến.',
    descriptionEn:
      'Professional career tracks: Verified certifications, Skill competency radar chart, developer toolkits, and career advancement paths.',
    allowedPillars: ['google-security', 'ai-coding', 'ai-office'],
    color: 'blue',
    dashboardType: 'individual',
  },
  {
    id: 'business',
    label: '4. Dành cho Doanh nghiệp (Đào tạo nhân sự B2B, Quản lý License)',
    labelEn: '4. For Business (Corporate L&D, Seat License Management)',
    shortLabel: 'Doanh nghiệp (B2B)',
    shortLabelEn: 'Enterprise (B2B)',
    badge: 'Tài khoản Doanh nghiệp',
    badgeEn: 'Enterprise Account',
    description:
      'Cổng đào tạo nhân sự toàn diện: Báo cáo tỷ lệ hoàn thành theo phòng ban, quản lý License, đo lường ROI tăng trưởng năng suất.',
    descriptionEn:
      'Comprehensive corporate L&D portal: Department progress analytics, seat license allocation, and measurable productivity ROI.',
    allowedPillars: ['ai-office', 'google-security', 'ai-coding'],
    color: 'emerald',
    dashboardType: 'business',
  },
  {
    id: 'government',
    label: '5. Dành cho Chính phủ (Cổng Phổ cập số, Du học & Xuất khẩu Lao động)',
    labelEn: '5. For Government (National Digital Literacy, Overseas & Workforce)',
    shortLabel: 'Chính phủ & Xã hội',
    shortLabelEn: 'Government & Workforce',
    badge: 'Cổng Quốc gia',
    badgeEn: 'National Portal',
    description:
      'Cổng thông tin phổ cập kỹ năng số diện rộng, chương trình hành trang du học và đào tạo kỹ năng AI cho thị trường lao động toàn cầu.',
    descriptionEn:
      'National digital workforce initiative, community cyber safety programs, and overseas education & workforce preparation portal.',
    allowedPillars: ['google-security', 'ai-coding', 'ai-office'],
    color: 'purple',
    dashboardType: 'government',
  },
  // Backward compatibility aliases
  {
    id: 'individual_all',
    label: 'Cá nhân: Toàn diện 3 mảng (Google + AI Code + AI Văn phòng)',
    labelEn: 'Individual: Full All-Access Track (3 Pillars)',
    shortLabel: 'Cá nhân (Toàn diện)',
    shortLabelEn: 'Individual (All)',
    badge: 'Cá nhân Pro',
    badgeEn: 'Pro Member',
    description: 'Lộ trình phát triển toàn diện cả 3 trụ cột kỹ năng.',
    descriptionEn: 'Full comprehensive track across all 3 skill pillars.',
    allowedPillars: ['google-security', 'ai-coding', 'ai-office'],
    color: 'blue',
    dashboardType: 'individual',
  },
  {
    id: 'individual_google',
    label: 'Cá nhân: Chuyên sâu Google & Bảo mật',
    labelEn: 'Individual: Google & Security Track',
    shortLabel: 'Google & Bảo mật',
    shortLabelEn: 'Google & Security',
    badge: 'Bảo mật Google',
    badgeEn: 'Google Security',
    description: 'Lộ trình làm chủ hệ sinh thái Google và bảo mật số.',
    descriptionEn: 'Google ecosystem and cyber security track.',
    allowedPillars: ['google-security'],
    color: 'blue',
    dashboardType: 'individual',
  },
  {
    id: 'individual_aicode',
    label: 'Cá nhân: Chuyên sâu AI Viết Code',
    labelEn: 'Individual: AI Coding Track',
    shortLabel: 'AI Viết Code',
    shortLabelEn: 'AI Coding',
    badge: 'AI Coding Pro',
    badgeEn: 'AI Coding Pro',
    description: 'Lập trình cùng Antigravity, VS Code, Claude, Cursor.',
    descriptionEn: 'Software engineering with Antigravity, VS Code, Claude, Cursor.',
    allowedPillars: ['ai-coding'],
    color: 'blue',
    dashboardType: 'individual',
  },
  {
    id: 'individual_aioffice',
    label: 'Cá nhân: Chuyên sâu AI Văn phòng & Thực tế',
    labelEn: 'Individual: Applied Office AI Track',
    shortLabel: 'AI Văn phòng',
    shortLabelEn: 'Office AI',
    badge: 'AI Văn phòng',
    badgeEn: 'Office AI',
    description: 'Tự động hóa PowerPoint, Canva AI và Excel Copilot.',
    descriptionEn: 'PowerPoint, Canva, and Excel AI automation track.',
    allowedPillars: ['ai-office'],
    color: 'blue',
    dashboardType: 'individual',
  },
];

export const AUDIENCES = [
  {
    id: 'student',
    title: 'Dành cho Học sinh',
    titleEn: 'For Students',
    short: 'Học sinh',
    shortEn: 'Students',
    badge: '100% Free Pass',
    badgeEn: '100% Free Pass',
    color: 'sky',
    tagline: 'Khóa học nền tảng miễn phí, rèn luyện tư duy AI & an toàn số cho học sinh',
    taglineEn: 'Free foundational AI literacy, logic thinking & cyber safety for students',
    description: 'Trang bị sớm tư duy công nghệ, cách dùng AI an toàn, phòng ngừa lừa đảo mạng và khai phá tiềm năng sáng tạo của bản thân.',
    descriptionEn: 'Equip next-gen youth with AI logic, internet safety, anti-scam awareness, and creative problem solving skills.',
  },
  {
    id: 'campus',
    title: 'Dành cho Trường Đại học',
    titleEn: 'For Campus & Universities',
    short: 'Đại học (Tín chỉ)',
    shortEn: 'Campus (Credits)',
    badge: 'Tín chỉ Đại học',
    badgeEn: 'Academic Credits',
    color: 'indigo',
    tagline: 'Chương trình học thuật tích lũy tín chỉ đại học, đồ án thực hành AI chuyên sâu',
    taglineEn: 'Academic credit-eligible curriculum, hands-on capstone projects for college students',
    description: 'Liên kết chuẩn học phần với các trường Đại học, sinh viên học thực hành và quy đổi tín chỉ môn học tương đương.',
    descriptionEn: 'Integrated academic credit system with university partners, providing course equivalence and project evaluations.',
  },
  {
    id: 'individual',
    title: 'Dành cho Cá nhân',
    titleEn: 'For Individuals & Pros',
    short: 'Cá nhân (Đi làm)',
    shortEn: 'Individuals',
    badge: 'Chứng chỉ Nghề Pro',
    badgeEn: 'Professional Certs',
    color: 'blue',
    tagline: 'Nâng cấp kỹ năng nghề nghiệp, chứng chỉ chuyên nghiệp Antigravity, Cursor, Copilot',
    taglineEn: 'Career upskilling, professional certificates in Antigravity, Cursor, and Office AI',
    description: 'Dành cho người đi làm muốn tăng gấp đôi năng suất, chuyển đổi nghề nghiệp sang kỹ sư AI-Native và nâng tầm thu nhập.',
    descriptionEn: 'Designed for working professionals to double productivity, transition to AI-native roles, and boost career prospects.',
  },
  {
    id: 'business',
    title: 'Dành cho Doanh nghiệp',
    titleEn: 'For Business (AI B2B)',
    short: 'Doanh nghiệp (B2B)',
    shortEn: 'Enterprise',
    badge: 'Gói L&D Tổ chức',
    badgeEn: 'Corporate L&D',
    color: 'emerald',
    tagline: 'Đào tạo đội ngũ nhân sự quy mô lớn, đo lường ROI tăng trưởng năng suất',
    taglineEn: 'Scale workforce AI adoption, department track management, and productivity ROI',
    description: 'Giải pháp L&D may đo cho doanh nghiệp: chuẩn hóa bảo mật Google Workspace, tự động hóa văn phòng và AI Coding nội bộ.',
    descriptionEn: 'Customized corporate AI training: Google Workspace compliance, office automation, and software engineering transformation.',
  },
  {
    id: 'government',
    title: 'Dành cho Chính phủ',
    titleEn: 'For Government & Workforce',
    short: 'Chính phủ & Xã hội',
    shortEn: 'Government',
    badge: 'Cổng Quốc gia',
    badgeEn: 'National Program',
    color: 'purple',
    tagline: 'Cổng thông tin phổ cập kỹ năng số cộng đồng, du học & xuất khẩu lao động toàn cầu',
    taglineEn: 'National digital literacy initiative, global workforce & overseas education portal',
    description: 'Đồng hành cùng các chương trình phát triển nguồn nhân lực quốc gia, chuyển giao công nghệ và trang bị kỹ năng xuất khẩu lao động.',
    descriptionEn: 'Partnering with public initiatives for nationwide digital empowerment, technology transfer, and international workforce mobility.',
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
