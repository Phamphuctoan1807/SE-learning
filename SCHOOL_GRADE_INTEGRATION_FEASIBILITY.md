# Báo Cáo Đánh Giá Khả Thi — Tích Hợp Điểm Từ Cổng Trường (`SCHOOL_GRADE_INTEGRATION_FEASIBILITY.md`)

> **Trạng thái:** Đã hoàn tất đánh giá Giai đoạn A (Audit & Feasibility Gate) theo `ROADMAP_SINGLE_USER_AUTH_AND_SCHOOL_GRADES_INTEGRATION_SPEC.md`.  
> **Ngày đánh giá:** 2026-10-15  
> **Người thực hiện:** Coding Agent + Chủ Website  
> **Kết luận cổng quyết định:** **`NO-GO` (Chưa triển khai tự động kết nối trực tiếp cổng trường ở thời điểm hiện tại — Sử dụng Nhập điểm thủ công & Import file CSV/JSON có bước Xem trước / Xác nhận)**.

---

## 1. Hệ thống đích

- **Tên hệ thống tham chiếu trong tài liệu học phần:** Cổng Đào tạo ĐH Công nghệ Thông tin — ĐHQG-HCM (`daa.uit.edu.vn`) và hệ thống LMS (`courses.uit.edu.vn`).
- **Xác nhận từ chủ website:** Chủ website chưa cung cấp thông tin đăng ký OAuth client, API key, hoặc tài liệu tích hợp dành cho nhà phát triển bên thứ ba.
- **Đơn vị quản lý:** Phòng Đào tạo Đại học / Tổ Quản trị Hệ thống UIT.
- **URL API chính thức dành cho ứng dụng cá nhân của sinh viên:** Chưa có tài liệu công khai được xác minh.
- **Môi trường sandbox/test được cấp phép:** Không có (`Not available / Not verified`).

## 2. Bằng chứng cho phép tích hợp

| Câu hỏi | Bằng chứng / URL | Ngày kiểm tra | Kết quả |
| :--- | :--- | :--- | :--- |
| Có API đọc điểm chính thức công khai cho sinh viên tự tích hợp không? | Đã kiểm tra các nguồn trong `SE_Verification_and_Sources_MA003_final_20261011.md` (`daa.uit.edu.vn`); chỉ có trang HTML chương trình đào tạo và cổng đăng nhập sinh viên, không có tài liệu REST/GraphQL API công khai cho ứng dụng ngoài. | `2026-10-15` | **Không có bằng chứng xác minh** |
| Có OAuth2 / cơ chế ủy quyền chính thức với scope giới hạn (`read:grades`) không? | Không có tài liệu OAuth2/OIDC delegated scope dành cho ứng dụng cá nhân của sinh viên. | `2026-10-15` | **Chưa hỗ trợ / Chưa xác minh** |
| Điều khoản có cho phép bot/script tự động đăng nhập lấy điểm không? | Cổng trường dùng xác thực phiên sinh viên (kèm bảo vệ chống bot/CAPTCHA/session timeout). Tự động dùng mật khẩu trường hoặc cạo HTML (scraping) vi phạm quy tắc bảo mật Mục 3 của đặc tả. | `2026-10-15` | **Không được phép scraping** |
| Có tài liệu scope / rate limit / versioning không? | Không có. | `2026-10-15` | **Không có** |

## 3. Trường dữ liệu khả dụng

- **Từ nguồn đề cương đã xác minh trong `SE_Verification_and_Sources_MA003_final_20261011.md`:**
  - Có thông tin tham chiếu cho 9 mã học phần (`IT001`, `IT012`, `MA006`, `MA003`, `MA004`, `MA005`, `IT002`, `IT003`, `IT004`), nhưng ngay cả đề cương `IT001` (bản cập nhật 09/2026) vẫn có điểm bất đồng `CONF-IT001-A2` (trọng số `A2` để trống), và đề cương `MA003` kỳ hiện hành chưa được xác minh công khai.
- **Từ cổng điểm cá nhân:** Vì không có API chính thức, không thể xác minh cấu trúc JSON trả về cho `external_course_id`, `published_status`, hay `updated_at`.

## 4. Xác thực và bảo mật

- **Phương thức ủy quyền chính thức:** Chưa có.
- **Quy tắc bảo mật bắt buộc (Mục 3 & 4.2 của đặc tả):**
  - **Tuyệt đối không** xây dựng form yêu cầu người dùng nhập mật khẩu cổng trường vào website.
  - **Tuyệt đối không** lưu mật khẩu cổng trường trong database, biến môi trường, localStorage hay log.
  - **Tuyệt đối không** dùng kỹ thuật scraping, reverse-engineer API nội bộ, giả lập cookie/session, hoặc vượt CAPTCHA/MFA.

## 5. Tính ổn định và vận hành

- **Kill Switch ở tầng Server:** Biến cấu hình `SCHOOL_SYNC_ENABLED=false` (mặc định tắt hoàn toàn ở `backend/gpa_and_sessions.py`).
- **Trạng thái hiển thị trên giao diện Tab GPA:** Hiển thị rõ trạng thái kết nối cổng trường là **`Chưa kết nối (NO-GO: Chưa có API ủy quyền chính thức từ trường — Đang dùng chế độ Nhập thủ công & Import file an toàn)`**.

## 6. Kết luận cổng quyết định

- **Quyết định:** **`NO-GO`** cho việc tự động kết nối trực tiếp vào cổng trường.
- **Bằng chứng hỗ trợ kết luận:** Chưa có API chính thức, chưa có OAuth/token ủy quyền hợp lệ, và không có môi trường test/sandbox được trường cấp phép.
- **Điều kiện cần hoàn thành nếu muốn chuyển sang `CONDITIONAL GO` / `GO` trong tương lai:**
  1. Trường cung cấp cổng OAuth2/API đọc điểm chính thức với scope chỉ đọc (`read-only`) và khả năng thu hồi token (`revoke`).
  2. Có tài liệu schema chính thức cho học kỳ, mã môn, tín chỉ, điểm thành phần, điểm tổng kết và trạng thái công bố.
  3. Có môi trường test/sandbox hợp lệ để kiểm thử mà không dùng tài khoản thật.
- **Phương án Fallback đã triển khai đầy đủ & an toàn:**
  1. **Nhập điểm thủ công (`manual`):** Hỗ trợ đầy đủ thêm/sửa/xóa học kỳ, học phần, tín chỉ, các thành phần đánh giá có trọng số, điểm tổng kết chính thức và cấu hình bảng quy đổi GPA hệ 4.0.
  2. **Nhập/Xuất dữ liệu từ file (`file_import` — JSON/CSV có bước Xem trước & Xác nhận):** Cho phép người dùng tự tải bảng điểm hoặc bản sao lưu về máy, kiểm tra hợp lệ toàn bộ schema, **xem trước (Preview)** danh sách môn mới / môn thay đổi / xung đột với điểm đã nhập thủ công, và chỉ lưu khi người dùng bấm xác nhận (không bao giờ âm thầm ghi đè điểm thủ công).

## 7. Quyết định triển khai

Tuân thủ nghiêm ngặt `ROADMAP_SINGLE_USER_AUTH_AND_SCHOOL_GRADES_INTEGRATION_SPEC.md`: dừng việc viết connector tự động lấy điểm cổng trường tại cổng `NO-GO`, giữ nguyên kiến trúc nhập thủ công + import file có preview an toàn, và bảo vệ toàn bộ dữ liệu GPA / Buổi học / Ghi chú bằng xác thực một chủ tài khoản cá nhân ở phía server.
