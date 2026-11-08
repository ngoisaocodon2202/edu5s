# 5S AI Education — Nền tảng Đào tạo AI & Bảo mật số Thực chiến

Hệ sinh thái đào tạo trực tuyến chuẩn hóa theo 3 cấp độ: **Cơ bản (Miễn phí)** • **Trung cấp (Thực chiến)** • **Nâng cao (Chuyên gia)**.

- **Google & Bảo Mật Số**: Bảo vệ tài khoản Google 2FA, Passkeys sinh trắc học FIDO2, Safe Browsing, chống Phishing.
- **AI Coding Thế Hệ Mới**: Google Antigravity IDE, `agy` CLI v2.0, Claude Code, Cursor IDE, VS Code.
- **Ứng Dụng AI Văn Phòng**: Tự động hóa Excel (Copilot, XLOOKUP), PowerPoint AI, Canva Magic Studio.

---

## 🚀 Tính năng nổi bật

1. **Phòng học 5S AI Video Live Simulator**:
   - Giao diện thao tác trực tiếp trên môi trường thực (Antigravity IDE, Google Chrome Security Center, Office Copilot).
   - Thuyết minh chuẩn **Giọng đọc Nam đơn nhất** (Tiếng Việt: `vi-VN-NamMinhNeural` / Tiếng Anh: `en-US-GuyNeural`).
   - Tự động đánh dấu tích xanh hoàn thành bài học khi xem xong.
   - Cơ chế bảo vệ bản quyền **5S-DRM**: Chặn tải video, chặn quay màn hình và chống chụp ảnh màn hình.

2. **Cổng thanh toán tự động SePay**:
   - Tích hợp QR Code động MBBank, webhook đối soát tự động kích hoạt khóa học tức thì.

3. **Cơ sở dữ liệu & Quản trị**:
   - Hỗ trợ lưu trữ PostgreSQL (qua ElectricSQL PGlite wire-protocol port 5432) đồng bộ real-time.
   - Trang Quản trị (Admin Dashboard) quản lý danh sách học viên, khóa học, đơn hàng và cấu hình hệ thống.

---

## 🛠️ Hướng dẫn cài đặt & Chạy Local

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển
- **Chạy Frontend (Vite)**:
  ```bash
  npm run dev
  ```
  Truy cập: `http://localhost:5173`

- **Chạy Backend API (Express + PostgreSQL + TTS)**:
  ```bash
  npm run server
  ```
  Backend chạy tại: `http://localhost:3001`

### 3. Build sản phẩm
```bash
npm run build
```

---

## ☁️ Triển khai lên Vercel (Vercel Deployment)

Dự án đã được cấu hình sẵn tệp `vercel.json` và Serverless Function `api/tts.js`:

1. Đăng nhập vào [vercel.com](https://vercel.com).
2. Chọn **Add New Project** -> Chọn repository **`ngoisacodon2202/edu5s`**.
3. Framework Preset: **Vite**.
4. Root Directory: `./` (mặc định).
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Nhấn **Deploy**.

