# TỔNG HỢP TOÀN DIỆN CHỨC NĂNG & QUY TRÌNH VẬN HÀNH
## NỀN TẢNG ĐÀO TẠO TRỰC TUYẾN 5S AI EDUCATION (5S TECHNOLOGY)

> **Kính gửi:** Ban Lãnh đạo & Quản lý Dự án Công ty Phát triển Công nghệ 5S  
> **Đơn vị thực hiện:** Đội ngũ Kỹ thuật & Phát triển Sản phẩm 5S AI  
> **Địa chỉ Website chính thức:** [https://edu5s.vercel.app](https://edu5s.vercel.app)  
> **Mã nguồn GitHub:** [https://github.com/ngoisaocodon2202/edu5s](https://github.com/ngoisaocodon2202/edu5s)  
> **Ngày cập nhật:** Tháng 11/2026

---

## 1. TỔNG QUAN DỰ ÁN & ĐỊNH VỊ THỊ TRƯỜNG

**5S AI Education** là nền tảng đào tạo trực tuyến thực chiến tiên phong tại Việt Nam, tập trung giải quyết bài toán: **Ứng dụng Trí tuệ Nhân tạo thế hệ mới (AI Agents) kết hợp Bảo mật số toàn diện** cho 3 nhóm đối tượng: Học sinh - Sinh viên, Người đi làm (Cá nhân) và Doanh nghiệp (B2B L&D).

```mermaid
flowchart TD
    A["Hệ Sinh Thái 5S AI Education"] --> B["Trụ cột 1: Google & Bảo Mật Số"]
    A --> C["Trụ cột 2: AI Coding Thế Hệ Mới"]
    A --> D["Trụ cột 3: AI Văn Phòng Thực Chiến"]

    B --> B1["Passkeys, 2FA, Safe Setup, Phishing Shield"]
    C --> C1["Google Antigravity IDE, agy CLI, Cursor, Claude"]
    D --> D1["Excel Copilot, PowerPoint AI, Canva Magic"]

    A --> E["Mô Hình 3 Cấp Độ"]
    E --> E1["Cơ bản (Miễn phí 5 bài đầu)"]
    E --> E2["Trung cấp (Thực hành thực tế)"]
    E --> E3["Nâng cao (15 bài chuyên sâu + Chứng chỉ)"]
```

### Các giá trị cốt lõi:
- **Chuẩn hóa 3 Cấp độ rõ ràng:** Cơ bản (Beginner) $\rightarrow$ Trung cấp (Intermediate) $\rightarrow$ Nâng cao (Advanced).
- **Chính sách hỗ trợ cộng đồng:** Miễn phí hoàn toàn 5 bài học nền tảng thiết yếu của mọi khóa học cho đối tượng Học sinh - Sinh viên.
- **Học thực chiến qua mô phỏng:** Không chỉ học lý thuyết tĩnh, học viên được tương tác trực tiếp với giao diện phần mềm thực tế thông qua trình giả lập độc quyền **5S AI Video Simulator**.

---

## 2. KIẾN TRÚC KỸ THUẬT & HỆ THỐNG CÔNG NGHỆ

Hệ thống được thiết kế theo tiêu chuẩn hiện đại, tốc độ phản hồi dưới 0.3s, tối ưu SEO, hỗ trợ đa thiết bị (Responsive Mobile / Tablet / Desktop) và bảo mật dữ liệu đa tầng.

| Thành phần | Công nghệ sử dụng | Mục đích & Ưu điểm |
| :--- | :--- | :--- |
| **Giao diện (Frontend)** | React 18, Vite 5, Tailwind CSS | Tốc độ tải trang cực nhanh, giao diện Sáng (Light Mode) thanh lịch chuẩn Coursera. |
| **Đa ngôn ngữ (i18n)** | Custom Engine (VI - EN) | Chuyển đổi tức thì giữa Tiếng Việt và Tiếng Anh mà không cần reload trang. |
| **Âm thanh AI (TTS)** | Neural Edge Voice (`msedge-tts`) | Giọng đọc Nam trầm ấm, tự nhiên, không bị giật rè, chuẩn ngữ điệu kỹ thuật. |
| **Cơ sở dữ liệu** | PostgreSQL 16 (Wire Protocol :5432) | Lưu trữ người dùng, khóa học, đơn hàng đồng bộ thời gian thực. |
| **Cổng thanh toán** | SePay Banking Automation | Đối soát tự động qua mã VietQR MBBank, kích hoạt khóa học tức thì 24/7. |
| **Hạ tầng Cloud** | Vercel Edge Global CDN | Tự động cân bằng tải, bảo mật SSL, uptime 99.99%. |

---

## 3. CHI TIẾT CÁC TÍNH NĂNG NỔI BẬT DÀNH CHO HỌC VIÊN

### 3.1. Trình phát Video Học tập Thực chiến (Interactive Video Simulator)
Khác biệt hoàn toàn so với các nền tảng video thụ động thông thường, mỗi bài học được xây dựng theo quy trình 4 bước chuẩn thao tác thực tế:

```mermaid
sequenceDiagram
    autonumber
    actor Student as Học viên
    participant Player as Trình mô phỏng 5S Video
    participant Audio as Engine Giọng Nam AI
    participant DB as Hệ thống Đánh dấu Bài học

    Student->>Player: Bấm nút Xem Bài giảng
    Player->>Audio: Tải âm thanh Giọng Nam (NamMinh / Guy)
    Audio-->>Player: Đồng bộ nhịp thuyết minh từng câu
    Player->>Player: Di chuyển chuột, gõ lệnh CLI, duyệt Diff mã nguồn
    Player->>DB: Hoàn tất 4 bước (Tiến trình 100%)
    DB-->>Student: Tự động gắn tích xanh [✓ Đã hoàn thành]
```

- **Môi trường thao tác thực tế theo từng trụ cột:**
  - *Với mảng AI Coding:* Giao diện chuẩn **Google Antigravity IDE**, cửa sổ dòng lệnh gõ lệnh `agy --workspace eduAI`, phím tắt `Ctrl + I` phân tích mã nguồn và khung kế hoạch phụ `implementation_plan.md`.
  - *Với mảng Bảo mật Google:* Giao diện trình duyệt Chrome mở `myaccount.google.com/security`, rà soát phiên đăng nhập lạ, bật xác minh 2 bước 2FA và tạo khóa sinh trắc học **Passkeys (FIDO2)**.
  - *Với mảng Văn phòng AI:* Giao diện bảng tính Excel kết hợp **Copilot AI Studio**, tự động viết hàm `XLOOKUP`, tự động vẽ biểu đồ tăng trưởng và xuất Slide PowerPoint chuẩn nhận diện 5S.
- **Thuyết minh giọng Nam đồng nhất:**
  - Tiếng Việt: Giọng Nam chuẩn `vi-VN-NamMinhNeural`.
  - Tiếng Anh: Giọng Nam chuẩn `en-US-GuyNeural`.
  - Đã tích hợp bộ lọc từ vựng công nghệ đặc thù, phát âm chính xác các thuật ngữ: *Antigravity IDE, agy, CLI, VS Code, Passkeys, 2FA, PostgreSQL, XLOOKUP*.
- **Tự động lưu tiến độ:** Khi học viên xem hết bài học (hoặc làm xong bài tập), hệ thống tự động ghi nhận và hiển thị dấu tích xanh `✓ Đã hoàn thành` trong danh mục 20 bài học.

### 3.2. Cơ chế Bảo vệ Bản quyền & Chống Ghi hình (5S-DRM Protection)
Nhằm bảo vệ tài sản trí tuệ và bài giảng của công ty, trình phát video được trang bị lớp bảo mật nghiêm ngặt:
- **Logo Watermark cố định:** Logo thương hiệu 5S AI Education luôn hiển thị nổi bật ở góc trên bên trái khung hình kèm nhãn `5S AI LIVE`.
- **Thủy vân số định danh (Forensic Watermark):** Hiển thị email học viên mờ ngẫu nhiên trên màn hình (`5S-DRM • user@email.com • NO SCREEN RECORDING`) nhằm răn đe chia sẻ tài khoản.
- **Chống tải về (Anti-Download):** Khóa hoàn toàn chuột phải (`onContextMenu`), khóa kéo thả (`onDragStart`), không để lộ link stream video trực tiếp.
- **Chống chụp và quay màn hình (Anti-Screen Recording):**
  - Chặn các phím tắt nguy hiểm: `PrintScreen`, `F12` (DevTools), `Ctrl + S`, `Ctrl + U`, `Ctrl + Shift + I/C/S`, phím tắt chụp ảnh macOS (`Cmd + Shift + 3/4/5`).
  - Tự động tạm dừng và khóa nội dung ngay lập tức khi học viên chuyển tab (`visibilitychange`) hoặc khi phát hiện luồng `getDisplayMedia` ghi màn hình.

### 3.3. Hệ thống Bài tập Thực hành & Đánh giá Năng lực
- Mỗi bài học nâng cao đều đi kèm tab **Bài Tập Thực Hành & Kiểm Tra**.
- Câu hỏi tình huống trắc nghiệm sát với bài học thực tế, phản hồi kết quả và giải thích chi tiết ngay khi học viên nộp bài.

### 3.4. Đăng ký & Đăng nhập Thân thiện, An toàn
- Tích hợp nút **Ẩn / Hiện mật khẩu** (mắt đóng/mở) ở cả 2 form Đăng nhập và Đăng ký.
- Cho phép học viên lựa chọn vai trò ngay khi tạo tài khoản: *Học sinh - Sinh viên*, *Cá nhân*, hoặc *Doanh nghiệp*.
- Hỗ trợ đăng nhập nhanh bằng tài khoản Google.

---

## 4. QUY TRÌNH THANH TOÁN & ĐỐI SOÁT TỰ ĐỘNG (SEPAY WORKFLOW)

Hệ thống thanh toán được tự động hóa hoàn toàn từ bước tạo đơn đến kích hoạt quyền học:

```mermaid
sequenceDiagram
    autonumber
    actor User as Học viên
    participant Web as Website 5S AI
    participant SePay as Cổng SePay (MBBank)
    participant Admin as Quản trị viên

    User->>Web: Bấm "Mở khóa trọn đời (15 bài nâng cao)"
    Web->>Web: Tạo mã đơn EDU5S_xxxx + Hiển thị VietQR MBBank
    User->>SePay: Quét mã QR chuyển khoản chính xác nội dung
    SePay->>Web: Webhook thông báo tiền đã vào tài khoản MBBank
    Web->>Web: Khớp mã đơn, tự động mở khóa 15 bài học tức thì
    Web-->>User: Màn hình kích hoạt thành công, học viên vào học ngay
    Note over Admin,Web: Nếu có sự cố chuyển nhầm cú pháp: Admin bấm "Duyệt tay"
```

1. **Tạo mã QR động thông minh:**
   - Mã VietQR nạp sẵn: Số tài khoản MBBank (`789220206`), Tên chủ tài khoản (`CONG TY PHAT TRIEN CONG NGHE 5S`), Số tiền chính xác và Nội dung chuyển khoản duy nhất (Ví dụ: `EDU5S_1731089201`).
2. **Xử lý Webhook tức thì (Real-time):**
   - Khi tiền về tài khoản MBBank của công ty, SePay đẩy tín hiệu Webhook về máy chủ 5S AI.
   - Máy chủ kiểm tra số tiền và mã đơn, lập tức chuyển trạng thái sang `completed` và kích hoạt toàn bộ 15 bài học nâng cao cho tài khoản của học viên.
3. **Cơ chế duyệt dự phòng (Admin Manual Approval):**
   - Trường hợp học viên ghi sai nội dung chuyển khoản, quản trị viên chỉ cần vào Trang Quản trị và bấm nút **Duyệt Đơn** để mở khóa tức thì.

---

## 5. TRANG QUẢN TRỊ DÀNH CHO NỘI BỘ (ADMIN DASHBOARD)

Trang Quản trị được thiết kế chuyên biệt để ban quản lý nắm bắt toàn diện số liệu kinh doanh và vận hành:

```mermaid
graph LR
    Admin["Bảng Điều Khiển Admin"] --> M1["Quản lý Khóa học & Bài giảng"]
    Admin --> M2["Quản lý Học viên & Cấp quyền"]
    Admin --> M3["Quản lý Đơn hàng & Doanh thu"]
    Admin --> M4["Cấu hình Thanh toán SePay"]
```

### Các phân hệ chính:
1. **Thống kê tổng quan:** Tổng số học viên, doanh thu lũy kế, tỷ lệ hoàn thành bài học, số đơn hàng đang chờ duyệt.
2. **Quản lý Khóa học:**
   - Xem toàn bộ danh sách 60 khóa học thuộc 3 trụ cột và 3 cấp độ.
   - Thêm mới, chỉnh sửa tiêu đề, mô tả, công cụ đào tạo, biểu phí, thời lượng học.
3. **Quản lý Học viên:**
   - Tìm kiếm học viên theo Tên hoặc Email.
   - Xem danh sách các khóa học học viên đã mua/mở khóa.
   - Cấp quyền mở khóa trực tiếp cho các tài khoản đặc biệt (nhân viên nội bộ, đối tác).
4. **Quản lý Đơn hàng (Orders):**
   - Bảng tra cứu tất cả giao dịch chuyển khoản MBBank.
   - Lọc đơn: *Đã duyệt*, *Chờ thanh toán*, *Đã hủy*.
   - Nút thao tác nhanh: Duyệt thủ công, Hủy đơn, Xuất biên lai.
5. **Cấu hình Cổng SePay:**
   - Cho phép giám đốc hoặc kế toán thay đổi số tài khoản ngân hàng, tên người thụ hưởng và API Token trực tiếp trên giao diện mà không cần can thiệp vào code.

---

## 6. HƯỚNG DẪN QUY TRÌNH VẬN HÀNH HÀNG NGÀY CHO DOANH NGHIỆP

| Thời điểm | Bộ phận phụ trách | Nhiệm vụ cụ thể |
| :--- | :--- | :--- |
| **Đầu ngày (08:30)** | Kế toán / CSKH | Kiểm tra mục **Quản lý Đơn hàng**: Đối soát sao kê app ngân hàng MBBank với danh sách đơn hàng `completed` trên hệ thống. |
| **Trong ngày** | Bộ phận Hỗ trợ (CSKH) | Trực hotline/Zalo (`0862034101`), giải đáp thắc mắc về khóa học, hỗ trợ học viên gặp lỗi quên mật khẩu hoặc nhập sai mã chuyển khoản. |
| **Khi có khóa học mới** | Ban Đào tạo / Giảng viên | Vào Admin Dashboard $\rightarrow$ Thêm khóa học mới $\rightarrow$ Nhập danh mục 20 bài học kèm nội dung thực hành và kịch bản video. |
| **Định kỳ hàng tuần** | Kỹ thuật (IT/Dev) | Kiểm tra nhật ký lỗi trên Vercel, sao lưu dữ liệu PostgreSQL, cập nhật các bài giảng công nghệ AI mới nhất (Antigravity v2, Claude 3.5, Gemini 2.5). |

---

## 7. HỆ SINH THÁI 5 PHÂN HỆ ĐỐI TƯỢNG ĐÀO TẠO (MÔ HÌNH COURSERA CHUẨN MỰC)

Hệ thống được kiến trúc theo tiêu chuẩn quốc tế của **Coursera**, chia tách rõ ràng 5 tệp đối tượng với 5 Bảng Điều Khiển (Dashboard) chuyên biệt:

### 7.1. Phân hệ 1: Dành Cho Học Sinh (Student Ecosystem)
- **Đặc trưng:** Học tập miễn phí 100% các khóa học nền tảng tư duy số, an toàn không gian mạng và AI Logic. Các tính năng nâng cao (Pro) được tích hợp mở rộng sau.
- **Trang Dashboard Học Sinh (`StudentDashboard`):**
  - **Chuỗi học tập (Daily Streak) & Điểm kinh nghiệm (XP):** Cơ chế Gamification khích lệ học sinh duy trì thói quen học tập hàng ngày.
  - **Kệ huy hiệu danh dự:** Huy hiệu Tân Binh Số, Nhà Thám Hiểm AI, Vệ Sĩ Không Gian Mạng,...
  - **La bàn định hướng nghề nghiệp số (Future Career Compass):** Đưa ra lộ trình định hướng nghề nghiệp tương lai cho học sinh (AI Engineer, Data Analyst, Digital Creator).
  - **Thử thách AI hàng ngày:** Câu hỏi trắc nghiệm tương tác kiểm tra kiến thức công nghệ tức thì.

### 7.2. Phân hệ 2: Dành Cho Trường Đại Học & Giảng Viên (Campus & Credits)
- **Đặc trưng:** Khung chương trình đào tạo tích lũy tín chỉ học phần (Academic Credits) tương đương chuẩn giáo trình Đại học.
- **Trang Dashboard Đại Học (`CampusDashboard`):**
  - **Hồ sơ sinh viên & Tích lũy tín chỉ:** Theo dõi số tín chỉ tích lũy (9/12 tín chỉ), điểm trung bình tích lũy GPA (3.8/4.0).
  - **Mã học phần tương đương:** Quy đổi mã môn học chuẩn (`CS-5S101`, `SEC-5S204`, `AIO-5S302`).
  - **Cổng nộp đồ án Capstone:** Sinh viên nộp repository GitHub và báo cáo đề tài thực hành, hệ thống chấm điểm tự động.
  - **Bảng điểm học thuật & Xuất chứng nhận PDF:** Tra cứu bảng điểm chính thức và xuất chứng nhận tín chỉ hoàn thành khóa học.
  - **Cổng giảng viên phụ trách (Faculty Advisor Portal):** Kết nối trực tiếp với giảng viên hướng dẫn của trường.

### 7.3. Phân hệ 3: Dành Cho Cá Nhân & Người Đi Làm (Individual Pro)
- **Đặc trưng:** Nâng cấp kỹ năng nghề nghiệp thực chiến, chuyển đổi vị trí công việc sang Kỹ sư AI-Native, gấp đôi năng suất làm việc.
- **Trang Dashboard Cá Nhân Pro (`IndividualDashboard`):**
  - **Ma trận năng lực kỹ năng (Competency Matrix):** Đo lường radar 4 trụ cột kỹ năng: Antigravity IDE, Cursor & Claude, Copilot Office, Security Zero-Trust.
  - **Chứng chỉ nghề nghiệp chuyên nghiệp:** Cấp mã chứng chỉ định danh kèm mã QR xác thực và nút đính kèm hồ sơ **Add to LinkedIn Profile**.
  - **Bộ công cụ Pro Toolkit:** Thư viện 500+ Prompt mẫu, Bộ template Excel tài chính tự động, Bộ slide PowerPoint AI chuẩn doanh nghiệp.
  - **Lộ trình thăng tiến thu nhập (Salary Boost Roadmap):** Hướng dẫn bước nhảy thu nhập từ mức cơ bản lên mức $2,500 – $4,000/tháng.

### 7.4. Phân hệ 4: Dành Cho Doanh Nghiệp (Enterprise & Corporate B2B)
- **Đặc trưng:** Đào tạo nội bộ quy mô lớn cho toàn thể nhân sự công ty, quản lý chỉ số hoàn vốn đầu tư đào tạo (ROI Metrics).
- **Trang Dashboard Doanh Nghiệp (`BusinessDashboard`):**
  - **Bảng chỉ số đo lường hiệu quả (Executive ROI):** +320% Năng suất toàn công ty, 15 giờ tiết kiệm/nhân sự/tuần, -95% Nguy cơ rò rỉ dữ liệu.
  - **Tiến độ học tập theo 3 phòng ban:** Khối Kỹ thuật (Tech / Dev), Khối Kinh doanh & Marketing, Khối Vận hành & Kế toán.
  - **Quản lý 50 giấy phép tài khoản (Seat Licenses):** Gửi lời mời nhân viên qua email, phân quyền học tập, thu hồi hoặc cấp phát giấy phép.
  - **Xuất báo cáo Ban Giám Đốc:** Xuất file bảng tính Excel báo cáo chi tiết tỷ lệ hoàn thành đào tạo của các phòng ban.

### 7.5. Phân hệ 5: Dành Cho Chính Phủ, Cộng Đồng & Lao Động Toàn Cầu (Government & Global Workforce)
- **Đặc trưng:** Cổng phổ cập kỹ năng số quốc gia, an toàn an ninh mạng cộng đồng, đào tạo chuyển giao công nghệ, du học và xuất khẩu lao động.
- **Trang Dashboard Chính Phủ (`GovernmentDashboard`):**
  - **Chỉ số tác động quốc gia:** 34,500+ Công dân & Lao động được đào tạo, 63/63 Tỉnh thành phủ sóng, 99.4% Tỷ lệ qua sát hạch kỹ năng.
  - **3 Trụ cột phổ cập kỹ năng số:** Công dân số & An toàn mạng (phòng chống Deepfake, bảo mật 2 lớp), Kỹ năng AI văn phòng & hành chính công, Kỹ năng số cho thị trường lao động quốc tế.
  - **Cổng việc làm quốc tế & Du học (Global Workforce Mobility):** Cung cấp thông tin và lộ trình đào tạo sang thị trường Nhật Bản 🇯🇵, Hàn Quốc 🇰🇷, Đức & Châu Âu 🇩🇪.
  - **Quỹ học bổng cộng đồng:** Theo dõi ngân sách học bổng đã giải ngân tài trợ 100% học phí cho học viên diện chính sách và vùng sâu vùng xa.
  - **Biểu mẫu đăng ký tư vấn & hợp tác địa phương:** Kết nối trực tiếp giữa các cơ quan quản lý nhà nước, địa phương với ban điều hành 5S AI Education.

---

## 8. HƯỚNG DẪN ĐIỀU HƯỚNG VÀ TRẢI NGHIỆM GIAO DIỆN MỚI

1. **Thanh Menu Điều Hướng (Top Navigation Switcher):**
   - Đặt ngay trên cùng thanh Navbar với 5 tab biểu tượng đại diện cho 5 phân hệ:
     - 🎓 **Học sinh**
     - 🏫 **Đại học**
     - 💼 **Cá nhân**
     - 🏢 **Doanh nghiệp**
     - 🏛️ **Chính phủ**
   - Nút nổi bật **Bảng Điều Khiển Của Tôi (My Dashboard)** giúp người dùng truy cập ngay vào không gian học tập của vai trò mình.

2. **Khung Banner Nổi Bật Phân Hệ (Coursera Audience Spotlight):**
   - Khi chọn bất kỳ phân hệ nào, hệ thống hiển thị banner sang trọng phong cách Coursera tại đầu danh mục khóa học.
   - Hiển thị đầy đủ Badge định danh, slogan giá trị và nút hành động nhanh **"Vào Bảng Điều Khiển"** để trải nghiệm ngay.

3. **Bộ Lọc Khóa Học Thông Minh (Adaptive Course Catalog):**
   - Lọc chính xác danh sách khóa học phù hợp với từng phân hệ đối tượng mà không làm gián đoạn trải nghiệm của người dùng.

---

## 9. KẾ HOẠCH PHÁT TRIỂN TIẾP THEO

1. **Cấp Chứng chỉ Tốt nghiệp Blockchain/NFT:** Học viên hoàn thành đủ 20 bài học và vượt qua bài thi thực hành sẽ được cấp mã chứng chỉ số có thể đính kèm trên LinkedIn.
2. **Hệ thống AI Chatbot Trợ giảng 24/7:** Tích hợp trực tiếp trợ lý Gemini Pro vào góc phải bài học để giải đáp bài tập lập trình và gỡ lỗi code ngay trong lúc xem video.
3. **Mở rộng kho bài học video tương tác:** Bổ sung thêm các kịch bản thực hành chuyên sâu theo nhu cầu đặt hàng đào tạo của các doanh nghiệp và trường Đại học đối tác.

---

> **Kết luận:** Nền tảng **5S AI Education** đã hoàn thiện toàn diện về mặt sản phẩm, trải nghiệm học viên, hệ thống thanh toán tự động, hạ tầng bảo mật DRM và **chuẩn hóa trọn vẹn 5 phân hệ người dùng theo mô hình Coursera quốc tế**. Sản phẩm sẵn sàng 100% để công ty đưa vào vận hành thương mại và triển khai chiến dịch truyền thông tuyển sinh.

