---
title: UIT SE Learning Platform
emoji: 💻
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
---

# SE Learning Platform — UIT Software Engineering 4-Year Adaptive Workspace

Nền tảng học tập tương tác dành cho sinh viên Kỹ thuật Phần mềm (nhịp học thích ứng 4–6 giờ/tuần), được xây dựng từ 3 tài liệu Master chính thống:
1. `SE_Roadmap_Master_MA003_final_20261011.md` (`343` bài học: `300` bài lõi + `43` module bổ sung `SUP-*`)
2. `SE_Content_Companion_Master_MA003_final_20261011.md` (Đầy đủ 6 mục chuẩn/bài, 11 bài đa mục tiêu có 32 tiểu bước `substeps`, 25 câu quiz `ENQ-001`–`025`, 12 câu chẩn đoán `ENDIAG-001`–`012` và 62 thuật ngữ kỹ thuật)
3. `SE_Verification_and_Sources_MA003_final_20261011.md` (16 nguồn tham khảo `[S1]`–`[S15]` + Giáo trình Đại số tuyến tính 2019 và hồ sơ kiểm định 9 học phần UIT)

## 1. Cấu Trúc Thư Mục

- `migrations/001_initial_schema.sql`: Schema cơ sở dữ liệu quan hệ (tương thích SQLite 3 & PostgreSQL) với đầy đủ khóa ngoại, `UNIQUE`, `CHECK` constraints và chỉ mục.
- `scripts/ingest_content.py`: Pipeline phân tích, làm sạch HTML/Markdown chống XSS và kiểm kê đồng bộ 3 file Master (`idempotent`).
- `backend/db.py`: Quản lý kết nối DB, chạy migration, mã hóa mật khẩu `PBKDF2-HMAC-SHA256` (210,000 vòng), sao lưu (`backup_database`) và diễn tập khôi phục (`restore_database_drill`).
- `backend/services.py`: Tầng dịch vụ ứng dụng thực thi RBAC (`anonymous`, `learner`, `editor`, `admin`), chống IDOR/BOLA, chấm điểm quiz tại server (`server-side scoring`), kiểm tra `idempotency_key`, cổng thành thạo (`Mastery Gate`) và thuật toán lập lịch tuần thích ứng (`0–6h`).
- `backend/app.py`: Tầng API FastAPI với Request ID, structured logging (tự động ẩn mật khẩu/token), rate limiting, CSRF protection và chuẩn hóa mã lỗi.
- `frontend/index.html`: Giao diện WebApp chuẩn **Precision Technical Editorial Workspace** (Dark/Light mode, WCAG 2.2 AA contrast, hỗ trợ bàn phím, `prefers-reduced-motion`, responsive từ 320px–1440px).
- `tests/test_platform.py`: Bộ 12 bài kiểm thử tự động (Unit, Integration, Content Integrity, Security OWASP ASVS, Backup/Restore Drill).
- `docs/`:
  - `CONTENT_INGESTION_REPORT.md` & `CONTENT_INTEGRITY_CI_REPORT.json`
  - `ARCHITECTURE_DECISIONS.md`
  - `GLOSSARY.md`
  - `QA_REPORT.md`
  - `DEPLOY_AND_OPERATIONS.md`
  - `openapi.json`

## 2. Hướng Dẫn Chạy & Tái Lập Local

```bash
# 1. Chạy lại pipeline kiểm kê & đồng bộ nội dung từ 3 file Master
python3 scripts/ingest_content.py

# 2. Chạy toàn bộ 12 bài kiểm thử Unit, Integration & Security
python3 tests/test_platform.py

# 3. Khởi động FastAPI Server
python3 -m uvicorn backend.app:app --host 127.0.0.1 --port 8000
```

## 3. Tài Khoản Kiểm Thử Phân Quyền (RBAC & IDOR)

| Username | Mật khẩu | Role | Mục đích kiểm thử |
| :--- | :--- | :--- | :--- |
| `learner_uit` | `LearnerPass!2026` | `learner` | Học viên chính (Sinh viên A) |
| `learner_two` | `LearnerTwo!2026` | `learner` | Học viên B (Dùng kiểm thử chống đọc/ghi trộm dữ liệu của Sinh viên A — IDOR/BOLA) |
| `editor_uit` | `EditorPass!2026` | `editor` | Xem chẩn đoán nội dung nguồn (`/api/v1/admin/diagnostics`) |
| `admin_uit` | `AdminPass!2026` | `admin` | Toàn quyền quản trị & chạy Dry-Run Import (`/api/v1/admin/import/dry-run`) |

## 4. Giới Hạn Được Ghi Nhận Minh Bạch (Known Limitations)

- Dữ liệu kiểm định cấu trúc xác nhận `343/343` bài học và `25/25` câu `ENQ-*` khớp hoàn toàn giữa các file Master, nhưng không thay thế việc giảng viên UIT thẩm định từng câu chữ hay xác nhận đề cương bắt buộc của học kỳ hiện tại (`CURRENT_TERM_UNVERIFIED`).
- Trong môi trường máy ảo sandbox không có internet và không có daemon PostgreSQL rời, hệ thống sử dụng SQLite 3 với kiểm tra khóa ngoại (`PRAGMA foreign_keys = ON`) và giao dịch `BEGIN IMMEDIATE`.
