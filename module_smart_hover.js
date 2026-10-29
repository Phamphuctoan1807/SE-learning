/**
 * ============================================================================
 * SE SANCTUARY — SMART HOVER & PEEK ENGINE (module_smart_hover.js)
 * Version: 1.1.0 — Ultra-Smooth 60fps Micro-Interactions & Glassmorphism
 * 
 * TRIẾT LÝ THIẾT KẾ:
 * "Sanctuary Peek" — Rê chuột nhẹ là có ô giải thích, xem trước mã nguồn 4-6 dòng,
 * không làm gián đoạn dòng suy nghĩ của kỹ sư phần mềm.
 * 
 * TÍNH NĂNG CHÍNH:
 * 1. Debounce 120ms: Rê chuột nhanh lướt qua không bao giờ bị nhấp nháy màn hình.
 * 2. Smart Collision & Auto-Flip: Tự động lật lên trên (Auto-flip Top) nếu ở sát đáy (~260px),
 *    tự động dịch trái nếu ở sát mép phải, chống tràn 100% trong Viewport.
 * 3. Thẻ nổi Glassmorphism: backdrop-filter blur(18px), viền bo mềm 16px, đổ bóng sâu mềm mại.
 * 4. Tích hợp Concept Dictionary: heap, stack, pointer, array2d, vtable, mutex,
 *    transaction, race_condition, virtual_destructor, smart_pointer, deadlock, cache_hit, closure.
 * 5. Tự động liên kết cơ sở dữ liệu PLATFORM_DATA (343 bài học) & PLAYBOOK_DATA.
 * 6. Tự động bắt sự kiện trong Roadmap (.lesson-card) và Function Navigator (.nav-item-card).
 * 7. Mini Syntax Highlighter tô màu code preview 4-6 dòng chuẩn C++/SQL/JS.
 * 8. Quick Actions: "⚡ Học Bài Này Ngay" / "📖 Mở Playbook Studio".
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  // Tránh nạp trùng lặp
  if (window.__SMART_HOVER_ENGINE_INITIALIZED__) {
    return;
  }
  window.__SMART_HOVER_ENGINE_INITIALIZED__ = true;

  /* ============================================================================
     1. TỪ ĐIỂN KHÁI NIỆM KỸ THUẬT MẪU (BUILT-IN CONCEPT DICTIONARY)
     ============================================================================ */
  const CONCEPT_DICTIONARY = {
    "heap": {
      id: "TERM-HEAP",
      title: "Vùng Nhớ Động Heap (Dynamic Memory)",
      badge: "C++ / Quản Trị RAM",
      icon: "🧱",
      category: "Quản Lý Bộ Nhớ",
      essence: "Vùng nhớ cấp phát động tại runtime qua toán tử new / malloc, không bị giới hạn bởi kích thước stack frame. Dữ liệu tồn tại đến khi lập trình viên chủ động gọi delete / free; nếu quên giải phóng sẽ gây rò rỉ bộ nhớ (Memory Leak).",
      code: `int* p = new int[100];   // Cấp phát mảng 100 phần tử trên Heap
p[0] = 42;               // Thao tác dữ liệu qua con trỏ
// ... Xử lý nghiệp vụ logic ...
delete[] p;              // Bắt buộc giải phóng để tránh leak
p = nullptr;             // Triệt tiêu con trỏ lơ lửng (Dangling)`,
      lang: "cpp",
      duration: "⏱️ 25–40 phút",
      actionText: "📖 Mở Playbook mang2chieu.cpp",
      actionType: "playbook",
      targetId: "mang2chieu.cpp"
    },

    "stack": {
      id: "TERM-STACK",
      title: "Vùng Nhớ Ngăn Xếp Stack (Call Stack)",
      badge: "LIFO · Siêu Tốc Độ",
      icon: "📚",
      category: "Kiến Trúc Máy Tính",
      essence: "Vùng nhớ quản lý biến cục bộ, tham số và địa chỉ trả về của lời gọi hàm. Tự động cấp phát và thu hồi tức thì theo cơ chế LIFO theo con trỏ SP (Stack Pointer), cực kỳ nhanh và không bị phân mảnh.",
      code: `void processRequest(int userId) {
    int localBuffer[64]; // Cấp phát tự động trên Stack
    localBuffer[0] = userId;
    // Hết hàm: Stack frame tự động thu hồi ngay lập tức
}`,
      lang: "cpp",
      duration: "⏱️ 15–30 phút",
      actionText: "⚡ Xem Phân Tích Bộ Nhớ",
      actionType: "lesson",
      targetId: "CPP-012"
    },

    "pointer": {
      id: "TERM-POINTER",
      title: "Con Trỏ Bộ Nhớ (Memory Pointer)",
      badge: "C/C++ Cốt Lõi · Địa Chỉ RAM",
      icon: "📍",
      category: "Nền Tảng Hệ Thống",
      essence: "Biến đặc biệt lưu trữ trực tiếp địa chỉ vật lý của một ô nhớ khác trong RAM. Phép toán giải tham chiếu *p dùng để đọc hoặc ghi giá trị tại ô nhớ mục tiêu, là nền tảng quản lý bộ nhớ và truyền tham chiếu hiệu năng cao.",
      code: `int score = 95;
int* ptr = &score;   // ptr lưu địa chỉ RAM của score
*ptr = 100;          // Thay đổi trực tiếp giá trị của score
cout << score;       // In ra: 100 (đã biến đổi qua *ptr)`,
      lang: "cpp",
      duration: "⏱️ 30–45 phút",
      actionText: "⚡ Học Bài Con Trỏ Ngay",
      actionType: "lesson",
      targetId: "CPP-015"
    },

    "array2d": {
      id: "TERM-ARRAY2D",
      title: "Mảng 2 Chiều & Ma Trận Bộ Nhớ",
      badge: "IT001 · Cấu Trúc Dữ Liệu",
      icon: "🔲",
      category: "Cấu Trúc Dữ Liệu Cơ Sở",
      essence: "Ma trận dữ liệu được trải phẳng trong bộ nhớ RAM theo thứ tự hàng (Row-Major Order). Trong C++, số cột MAX_COLS bắt buộc phải là hằng số cố định khi truyền làm tham số hàm để trình biên dịch tính toán offset &arr[i][j].",
      code: `const int COLS = 4;
void printRow(int arr[][COLS], int row) {
    for (int j = 0; j < COLS; ++j) {
        cout << arr[row][j] << " ";
    }
}`,
      lang: "cpp",
      duration: "⏱️ 30–50 phút",
      actionText: "📖 Mở Playbook mang2chieu.cpp",
      actionType: "playbook",
      targetId: "IT001-PB01"
    },

    "vtable": {
      id: "TERM-VTABLE",
      title: "Bảng Con Trỏ Hàm Ảo (VTable)",
      badge: "IT002 · Đa Hình OOP",
      icon: "🧬",
      category: "Lập Trình Hướng Đối Tượng",
      essence: "Bảng con trỏ hàm ảo ngầm định do compiler sinh ra cho mỗi class chứa virtual method. Mỗi object chứa con trỏ ẩn vptr trỏ tới vtable, giúp C++ thực thi Đa hình Động (Dynamic Binding) chính xác tại runtime.",
      code: `class Shape {
public:
    virtual void draw() = 0; // Tạo một slot trong vtable
    virtual ~Shape() = default; // Bắt buộc hàm hủy ảo
};
// Con trỏ vptr liên kết đúng override tại runtime`,
      lang: "cpp",
      duration: "⏱️ 35–50 phút",
      actionText: "⚡ Khám Phá OOP Đa Hình",
      actionType: "playbook",
      targetId: "IT002-PB01"
    },

    "mutex": {
      id: "TERM-MUTEX",
      title: "Khóa Loại Trừ Tương Hỗ (Mutex)",
      badge: "Hệ Điều Hành · Đa Luồng",
      icon: "🔒",
      category: "Đồng Bộ Hóa Luồng",
      essence: "Khóa loại trừ tương hỗ bảo vệ vùng dữ liệu găng (Critical Section) trong môi trường đa luồng. Chỉ duy nhất một luồng được giữ khóa tại một thời điểm; các luồng khác phải chờ, ngăn chặn triệt để xung đột Race Condition.",
      code: `std::mutex mtx;
void safeCounterIncrement(int& counter) {
    std::lock_guard<std::mutex> lock(mtx); // RAII tự giải phóng
    counter++; // Thao tác trong Critical Section an toàn
}`,
      lang: "cpp",
      duration: "⏱️ 30–45 phút",
      actionText: "⚡ Xem Đa Luồng & Mutex",
      actionType: "lesson",
      targetId: "IT007-PB01"
    },

    "transaction": {
      id: "TERM-TRANSACTION",
      title: "Giao Tác Cơ Sở Dữ Liệu (DB Transaction)",
      badge: "IT004 / IT007 · ACID",
      icon: "💳",
      category: "Cơ Sở Dữ Liệu",
      essence: "Chuỗi thao tác CSDL tuân thủ trọn vẹn 4 tính chất ACID. Đảm bảo tính nguyên tử (Atomicity): hoặc tất cả các lệnh đều thành công (COMMIT), hoặc toàn bộ dữ liệu hoàn tác nguyên trạng (ROLLBACK) khi gặp sự cố giữa chừng.",
      code: `START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT; -- Hoặc ROLLBACK nếu bất kỳ dòng lệnh nào lỗi`,
      lang: "sql",
      duration: "⏱️ 25–40 phút",
      actionText: "⚡ Khám Phá ACID & CSDL",
      actionType: "lesson",
      targetId: "IT004-PB01"
    },

    "race_condition": {
      id: "TERM-RACE-COND",
      title: "Xung Đột Truy Cập (Race Condition)",
      badge: "Concurrency Bug · Nguy Hiểm",
      icon: "⚡",
      category: "Đa Luồng & Bất Đồng Bộ",
      essence: "Lỗi bất định nghiêm trọng khi hai hay nhiều luồng cùng đọc và ghi vào một ô nhớ mà không có cơ chế khóa bảo vệ. Kết quả cuối cùng bị sai lệch phụ thuộc ngẫu nhiên vào thứ tự phân phối thời gian của CPU Scheduler.",
      code: `// Lỗi Race Condition: biến chia sẻ không có khóa
int sharedCounter = 0;
// Thread A đọc 0 -> chuẩn bị ghi 1
// Thread B đọc 0 cùng lúc -> ghi đè 1 -> mất mát 1 bước tăng!`,
      lang: "cpp",
      duration: "⏱️ 20–35 phút",
      actionText: "⚡ Cách Khắc Phục Bằng Mutex",
      actionType: "playbook",
      targetId: "IT007-PB01"
    },

    "virtual_destructor": {
      id: "TERM-VIRTUAL-DTOR",
      title: "Hàm Hủy Ảo (Virtual Destructor)",
      badge: "C++ Nâng Cao · Phòng Leak RAM",
      icon: "🛡️",
      category: "Quản Lý Vòng Đời Đối Tượng",
      essence: "Quy tắc sống còn trong C++: Khi một lớp cơ sở có ít nhất một hàm ảo, hàm hủy của nó bắt buộc phải là virtual. Đảm bảo khi gọi delete trên con trỏ lớp cha trỏ tới đối tượng lớp con, hàm hủy lớp con sẽ được thực thi trọn vẹn trước.",
      code: `class Base {
public:
    virtual ~Base() { // Bắt buộc virtual!
        // Dọn dẹp tài nguyên lớp cha
    }
};`,
      lang: "cpp",
      duration: "⏱️ 20–35 phút",
      actionText: "⚡ Xem OOP Kế Thừa Chuẩn",
      actionType: "playbook",
      targetId: "IT002-PB01"
    },

    "smart_pointer": {
      id: "TERM-SMART-PTR",
      title: "Con Trỏ Thông Minh (Smart Pointer)",
      badge: "Hiện Đại C++11 · Tự Động Thu Hồi",
      icon: "💡",
      category: "RAII Pattern",
      essence: "Lớp vỏ bọc con trỏ thô tự động giải phóng vùng nhớ Heap khi đối tượng vượt ra ngoài tầm vực (Scope). Gồm std::unique_ptr (sở hữu độc quyền) và std::shared_ptr (đếm tham chiếu reference counting).",
      code: `// Tự động thu hồi, không bao giờ lo quên delete
auto uniqueBuf = std::make_unique<int[]>(1024);
std::shared_ptr<Session> session = std::make_shared<Session>();
// Bộ nhớ tự giải phóng khi ra khỏi scope`,
      lang: "cpp",
      duration: "⏱️ 25–40 phút",
      actionText: "⚡ Tìm Hiểu Kỹ Thuật RAII",
      actionType: "lesson",
      targetId: "CPP-020"
    },

    "deadlock": {
      id: "TERM-DEADLOCK",
      title: "Tắc Nghẽn Luồng (Deadlock)",
      badge: "Hệ Điều Hành · Bế Tắc Tài Nguyên",
      icon: "⛓️",
      category: "Đồng Bộ Hóa Luồng",
      essence: "Tình huống bế tắc vĩnh viễn khi hai luồng chờ đợi tài nguyên lẫn nhau: Luồng 1 giữ Khóa A đang đợi Khóa B, trong khi Luồng 2 giữ Khóa B lại đang đợi Khóa A giải phóng.",
      code: `// Giải pháp trong C++17: Khóa nhiều mutex cùng lúc an toàn
std::scoped_lock lock(mutexA, mutexB);
// Hoàn toàn miễn nhiễm với Deadlock vòng lặp`,
      lang: "cpp",
      duration: "⏱️ 20–35 phút",
      actionText: "⚡ Phòng Tránh Deadlock",
      actionType: "playbook",
      targetId: "IT007-PB01"
    },

    "cache_hit": {
      id: "TERM-CACHE-HIT",
      title: "Đánh Trúng Bộ Nhớ Đệm (Cache Hit)",
      badge: "Tối Ưu Phần Cứng · CPU Cache",
      icon: "🚀",
      category: "Hiệu Năng Cao",
      essence: "Hiện tượng CPU tìm thấy ngay dữ liệu cần xử lý trong bộ nhớ đệm L1/L2/L3 siêu tốc thay vì phải chờ nạp từ thanh RAM chính. Duyệt mảng theo thứ tự hàng (Row-Major) tận dụng tối đa Spatial Locality.",
      code: `// Tối ưu Cache Hit: duyệt mảng liên tục theo hàng
for (int i = 0; i < ROWS; ++i) {
    for (int j = 0; j < COLS; ++j) {
        matrix[i][j] = 0; // Cache line 64-byte được tận dụng 100%
    }
}`,
      lang: "cpp",
      duration: "⏱️ 25–40 phút",
      actionText: "📖 Xem Tối Ưu Cache L1/L2",
      actionType: "playbook",
      targetId: "mang2chieu.cpp"
    },

    "closure": {
      id: "TERM-CLOSURE",
      title: "Bao Đóng Hàm (Closure & Lambda)",
      badge: "Lập Trình Hàm · Bắt Biến Ngoại Vi",
      icon: "🎁",
      category: "Mô Hình Lập Trình",
      essence: "Cơ chế một hàm con có khả năng ghi nhớ và truy cập vào các biến trong phạm vi khai báo của hàm cha (Lexical Scope), kể cả sau khi hàm cha đã hoàn tất thực thi và trả về.",
      code: `int multiplier = 5;
// C++ Lambda bắt biến multiplier qua capture clause
auto scale = [multiplier](int x) {
    return x * multiplier;
};
cout << scale(10); // Kết quả: 50`,
      lang: "cpp",
      duration: "⏱️ 20–35 phút",
      actionText: "⚡ Thực Hành Lambda C++",
      actionType: "lesson",
      targetId: "CPP-025"
    }
  };

  // Ánh xạ từ đồng nghĩa (Aliases)
  const CONCEPT_ALIASES = {
    "array_2d": "array2d",
    "mang2chieu": "array2d",
    "matrix": "array2d",
    "con_tro": "pointer",
    "vung_nho_heap": "heap",
    "dynamic_memory": "heap",
    "vung_nho_stack": "stack",
    "call_stack": "stack",
    "virtual_table": "vtable",
    "bang_ao": "vtable",
    "khoa_mutex": "mutex",
    "giao_tac": "transaction",
    "racecondition": "race_condition",
    "virtual_dtor": "virtual_destructor",
    "con_tro_thong_minh": "smart_pointer",
    "smartptr": "smart_pointer",
    "b_tree": "cache_hit"
  };

  /* ============================================================================
     2. CSS STYLES GLASSMORPHISM CHO THẺ NỔI (PEEK POPOVER)
     ============================================================================ */
  const STYLE_ID = 'smart-hover-engine-styles';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.textContent = `
      /* === SMART HOVER PEEK POPOVER CONTAINER === */
      .smart-peek-popover {
        position: fixed;
        z-index: 99999;
        width: 380px;
        max-width: calc(100vw - 28px);
        background: rgba(18, 22, 28, 0.88);
        backdrop-filter: blur(18px) saturate(170%);
        -webkit-backdrop-filter: blur(18px) saturate(170%);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 16px;
        box-shadow: 
          0 20px 48px -8px rgba(0, 0, 0, 0.55),
          0 6px 16px -4px rgba(0, 0, 0, 0.35),
          0 0 0 1px rgba(255, 255, 255, 0.06) inset;
        color: #f1f5f9;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 13px;
        line-height: 1.5;
        padding: 16px;
        pointer-events: auto;
        opacity: 0;
        visibility: hidden;
        transform: translateY(6px) scale(0.985);
        transition: 
          opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1),
          transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
          visibility 0.18s ease;
        will-change: transform, opacity;
        user-select: text;
        box-sizing: border-box;
      }

      /* Light Theme / Sanctuary Warm Skin Adjustments */
      [data-theme="skin"] .smart-peek-popover,
      [data-theme="matcha"] .smart-peek-popover,
      [data-theme="rose"] .smart-peek-popover,
      body.theme-light .smart-peek-popover {
        background: rgba(253, 251, 247, 0.94);
        border: 1px solid rgba(196, 116, 87, 0.22);
        box-shadow: 
          0 22px 50px -10px rgba(50, 35, 20, 0.24),
          0 6px 16px -4px rgba(50, 35, 20, 0.12),
          0 0 0 1px rgba(255, 255, 255, 0.7) inset;
        color: #2c2523;
      }

      .smart-peek-popover.is-active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }

      .smart-peek-popover.is-flipped-top {
        transform: translateY(-6px) scale(0.985);
      }
      .smart-peek-popover.is-flipped-top.is-active {
        transform: translateY(0) scale(1);
      }

      /* Indicator Caret (Mũi tên chỉ báo nhẹ) */
      .smart-peek-arrow {
        position: absolute;
        width: 12px;
        height: 12px;
        background: inherit;
        border: inherit;
        transform: rotate(45deg);
        pointer-events: none;
      }
      .smart-peek-popover:not(.is-flipped-top) .smart-peek-arrow {
        top: -7px;
        border-bottom: none;
        border-right: none;
      }
      .smart-peek-popover.is-flipped-top .smart-peek-arrow {
        bottom: -7px;
        border-top: none;
        border-left: none;
      }

      /* Popover Header */
      .smart-peek-header {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 10px;
      }
      .smart-peek-icon-box {
        flex-shrink: 0;
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: linear-gradient(135deg, rgba(196, 116, 87, 0.25), rgba(86, 122, 103, 0.25));
        border: 1px solid rgba(255, 255, 255, 0.18);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      [data-theme="skin"] .smart-peek-icon-box,
      [data-theme="matcha"] .smart-peek-icon-box,
      [data-theme="rose"] .smart-peek-icon-box {
        border: 1px solid rgba(0, 0, 0, 0.08);
      }
      .smart-peek-title-group {
        flex: 1;
        min-width: 0;
      }
      .smart-peek-top-row {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 2px;
      }
      .smart-peek-id-badge {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10.5px;
        font-weight: 700;
        letter-spacing: 0.04em;
        padding: 2px 7px;
        border-radius: 6px;
        background: rgba(196, 116, 87, 0.2);
        color: #df9276;
        border: 1px solid rgba(196, 116, 87, 0.35);
      }
      [data-theme="skin"] .smart-peek-id-badge {
        background: #fbf0ea;
        color: #b35637;
        border-color: #f1cfc2;
      }
      .smart-peek-cat-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 7px;
        border-radius: 6px;
        background: rgba(86, 122, 103, 0.2);
        color: #8bb79e;
        border: 1px solid rgba(86, 122, 103, 0.35);
      }
      [data-theme="skin"] .smart-peek-cat-badge {
        background: #eef5f1;
        color: #3f7053;
        border-color: #c9ded2;
      }
      .smart-peek-title {
        margin: 0;
        font-size: 14.5px;
        font-weight: 700;
        color: inherit;
        line-height: 1.35;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Concept Essence / Summary */
      .smart-peek-essence {
        font-size: 12.5px;
        line-height: 1.55;
        color: rgba(241, 245, 249, 0.85);
        margin: 0 0 10px 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      [data-theme="skin"] .smart-peek-essence,
      [data-theme="matcha"] .smart-peek-essence,
      [data-theme="rose"] .smart-peek-essence,
      body.theme-light .smart-peek-essence {
        color: #554944;
      }

      /* Code Snippet Box */
      .smart-peek-code-box {
        position: relative;
        background: rgba(10, 13, 18, 0.72);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 8px 12px;
        margin-bottom: 12px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11.5px;
        line-height: 1.5;
        color: #e2e8f0;
        overflow-x: auto;
        white-space: pre;
      }
      [data-theme="skin"] .smart-peek-code-box,
      [data-theme="matcha"] .smart-peek-code-box,
      [data-theme="rose"] .smart-peek-code-box,
      body.theme-light .smart-peek-code-box {
        background: #232830;
        color: #e6edf3;
        border: 1px solid rgba(0, 0, 0, 0.15);
      }
      .smart-peek-code-lang {
        position: absolute;
        top: 4px;
        right: 8px;
        font-size: 9.5px;
        font-weight: 700;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
        pointer-events: none;
      }

      /* Syntax Highlighting Colors */
      .hl-kw { color: #f47067; font-weight: 600; } /* Keyword */
      .hl-type { color: #7ee787; font-weight: 600; } /* Type */
      .hl-str { color: #f1e05a; } /* String */
      .hl-num { color: #79c0ff; } /* Number */
      .hl-cmt { color: #8b949e; font-style: italic; } /* Comment */
      .hl-fn { color: #d2a8ff; font-weight: 600; } /* Function call/definition */

      /* Footer */
      .smart-peek-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding-top: 8px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      [data-theme="skin"] .smart-peek-footer,
      [data-theme="matcha"] .smart-peek-footer,
      [data-theme="rose"] .smart-peek-footer,
      body.theme-light .smart-peek-footer {
        border-top: 1px solid rgba(0, 0, 0, 0.08);
      }
      .smart-peek-duration {
        font-size: 11.5px;
        font-weight: 600;
        color: rgba(241, 245, 249, 0.7);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      [data-theme="skin"] .smart-peek-duration,
      [data-theme="matcha"] .smart-peek-duration,
      [data-theme="rose"] .smart-peek-duration,
      body.theme-light .smart-peek-duration {
        color: #7b6f68;
      }
      .smart-peek-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, #c47457, #df9276);
        color: #ffffff !important;
        border: none;
        border-radius: 20px;
        padding: 6px 14px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
        box-shadow: 0 4px 12px rgba(196, 116, 87, 0.35);
        transition: transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease;
      }
      .smart-peek-btn:hover {
        transform: translateY(-1px);
        filter: brightness(1.08);
        box-shadow: 0 6px 16px rgba(196, 116, 87, 0.45);
      }
      .smart-peek-btn:active {
        transform: translateY(0);
      }

      /* Hoverable Indicator on Target Elements */
      [data-peek-term], [data-peek-lesson] {
        cursor: help;
        position: relative;
        text-decoration-line: underline;
        text-decoration-style: dotted;
        text-decoration-color: rgba(196, 116, 87, 0.65);
        text-underline-offset: 3px;
        transition: color 0.15s ease, text-decoration-color 0.15s ease;
      }
      [data-peek-term]:hover, [data-peek-lesson]:hover {
        color: var(--accent-primary, #c47457);
        text-decoration-color: var(--accent-primary, #c47457);
      }
    `;

    document.head.appendChild(styleEl);
  }

  /* ============================================================================
     3. MINI SYNTAX HIGHLIGHTER AN TOÀN & NHANH (FAST REGEX HIGHLIGHTER)
     ============================================================================ */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function highlightSyntax(code) {
    if (!code) return '';
    const lines = code.trim().split('\n');
    // Giới hạn hiển thị 4 - 6 dòng để popup tinh gọn
    const displayLines = lines.slice(0, 6);
    const escaped = displayLines.map(line => escapeHtml(line)).join('\n');

    // Tô màu theo thứ tự token
    let res = escaped
      // Comments (// ... hoặc # ...)
      .replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span class="hl-cmt">$1</span>')
      // Strings ("..." hoặc '...')
      .replace(/(&quot;[\s\S]*?&quot;|&#39;[\s\S]*?&#39;)/g, '<span class="hl-str">$1</span>')
      // Numbers
      .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="hl-num">$1</span>')
      // C++/SQL/JS Keywords
      .replace(/\b(int|double|float|char|bool|void|const|auto|static|struct|class|typedef|using|namespace|virtual|override|public|private|protected|new|delete|return|if|else|for|while|do|switch|case|break|continue|nullptr|true|false|START TRANSACTION|COMMIT|ROLLBACK|SELECT|FROM|WHERE|UPDATE|SET|function|let|async|await)\b/g, '<span class="hl-kw">$1</span>')
      // Common Types & Utilities
      .replace(/\b(std|cout|cin|endl|string|vector|mutex|unique_ptr|shared_ptr|make_unique|make_shared|lock_guard|scoped_lock|Array2d|Shape|Session)\b/g, '<span class="hl-type">$1</span>');

    return res;
  }

  /* ============================================================================
     4. TRA CỨU DỮ LIỆU THÔNG MINH (DATA RESOLVER)
     ============================================================================ */
  function resolveDataFromTarget(el) {
    if (!el) return null;

    // 1. Kiểm tra data-peek-term
    const termKey = el.getAttribute('data-peek-term') || el.dataset.peekTerm;
    if (termKey) {
      let normalized = termKey.trim().toLowerCase().replace(/[-\s]/g, '_');
      if (CONCEPT_ALIASES[normalized]) {
        normalized = CONCEPT_ALIASES[normalized];
      }
      if (CONCEPT_DICTIONARY[normalized]) {
        return CONCEPT_DICTIONARY[normalized];
      }
      // Thử tìm khớp tương đối trong từ điển
      for (const k in CONCEPT_DICTIONARY) {
        if (normalized.includes(k) || k.includes(normalized)) {
          return CONCEPT_DICTIONARY[k];
        }
      }
    }

    // 2. Kiểm tra data-peek-lesson hoặc data-open-lesson
    const lessonId = el.getAttribute('data-peek-lesson') || 
                     el.dataset.peekLesson || 
                     el.getAttribute('data-open-lesson') || 
                     el.dataset.openLesson;

    if (lessonId) {
      const resolvedLesson = lookupLessonOrPlaybook(lessonId.trim());
      if (resolvedLesson) return resolvedLesson;
    }

    // 3. Kiểm tra Function Navigator item trong Playbook Studio
    const fnId = el.getAttribute('data-fn-id') || el.dataset.fnId;
    if (fnId) {
      const fnData = resolveFunctionNavigatorData(el, fnId);
      if (fnData) return fnData;
    }

    // 4. Kiểm tra xem thẻ có phải .lesson-card hoặc chứa .lesson-id-badge không
    const cardEl = el.closest('.lesson-card') || el.closest('[data-lesson-id]');
    if (cardEl) {
      const badge = cardEl.querySelector('.lesson-id-badge') || cardEl.querySelector('[data-open-lesson]');
      const idText = badge ? (badge.getAttribute('data-open-lesson') || badge.textContent.trim()) : null;
      if (idText) {
        const resolved = lookupLessonOrPlaybook(idText);
        if (resolved) return resolved;
      }
    }

    // 5. Kiểm tra data-fn-id nếu người dùng hover vào phần tử con
    const fnCard = el.closest('[data-fn-id]');
    if (fnCard) {
      const fId = fnCard.getAttribute('data-fn-id');
      const fnData = resolveFunctionNavigatorData(fnCard, fId);
      if (fnData) return fnData;
    }

    // 6. Kiểm tra inline text hoặc thẻ đánh dấu khái niệm
    const textContent = el.textContent ? el.textContent.trim().toLowerCase() : '';
    if (textContent && textContent.length < 32) {
      let normalizedText = textContent.replace(/[-\s]/g, '_');
      if (CONCEPT_ALIASES[normalizedText]) {
        normalizedText = CONCEPT_ALIASES[normalizedText];
      }
      if (CONCEPT_DICTIONARY[normalizedText]) {
        return CONCEPT_DICTIONARY[normalizedText];
      }
    }

    return null;
  }

  /**
   * Tra cứu thông tin bài học từ PLATFORM_DATA hoặc PLAYBOOK_DATA
   */
  function lookupLessonOrPlaybook(id) {
    if (!id) return null;
    const cleanId = id.toUpperCase();

    // Tra cứu trong PLAYBOOK_DATA.playbooks
    if (window.PLAYBOOK_DATA && Array.isArray(window.PLAYBOOK_DATA.playbooks)) {
      const pb = window.PLAYBOOK_DATA.playbooks.find(p => 
        (p.id && p.id.toUpperCase() === cleanId) || 
        (p.subjectId && p.subjectId.toUpperCase() === cleanId)
      );
      if (pb) {
        const sourceCode = (pb.sourceCodeByLang && (pb.sourceCodeByLang.CPP || pb.sourceCodeByLang.cpp)) || '';
        const previewCode = extractSnippetFromSource(sourceCode);
        return {
          id: pb.id,
          title: pb.title || 'Playbook Code Chuẩn 4 Tầng',
          badge: `${pb.subjectId || 'C++'} · Playbook Studio`,
          icon: "⚡",
          category: pb.category || "Executable Code Playbook",
          essence: (pb.keyTechnicalNotes && pb.keyTechnicalNotes[0]) || 
                   pb.description || 
                   `Học qua 1 file code hoàn chỉnh duy nhất với 4 tầng kiến trúc chuẩn mực.`,
          code: previewCode,
          lang: "cpp",
          duration: "⏱️ 35–50 phút",
          actionText: "📖 Mở Trong Playbook Studio",
          actionType: "playbook",
          targetId: pb.id
        };
      }
    }

    // Tra cứu trong PLATFORM_DATA.lessons (343 bài học chuẩn)
    if (window.PLATFORM_DATA && Array.isArray(window.PLATFORM_DATA.lessons)) {
      const les = window.PLATFORM_DATA.lessons.find(l => l.id && l.id.toUpperCase() === cleanId);
      if (les) {
        // Rút trích bản chất từ sec.exp hoặc sec.sync
        let essenceText = '';
        if (les.sec && les.sec.exp) {
          essenceText = stripHtml(les.sec.exp);
        } else if (les.sec && les.sec.sync) {
          essenceText = stripHtml(les.sec.sync);
        } else {
          essenceText = `${les.title} thuộc học phần ${les.subjName || les.subj}. Cung cấp kiến thức nền tảng vững chắc.`;
        }

        // Cắt ngắn 2-3 câu
        const sentences = essenceText.split(/[.?!]\s+/);
        essenceText = sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '.' : '');

        // Trích xuất code snippet minh họa từ sec.ex hoặc sinh snippet trực quan
        let codeSnippet = '';
        if (les.sec && les.sec.ex) {
          const rawEx = stripHtml(les.sec.ex);
          codeSnippet = rawEx.includes(';') ? rawEx.slice(0, 180) : generateFallbackCodeForLesson(les);
        } else {
          codeSnippet = generateFallbackCodeForLesson(les);
        }

        const estMinutes = les.substeps && les.substeps.length ? (20 + les.substeps.length * 8) : 35;

        return {
          id: les.id,
          title: les.title,
          badge: `${les.subj} · ${les.subjName || 'UIT'}`,
          icon: "📘",
          category: les.stage || "Lộ Trình Chuẩn",
          essence: essenceText,
          code: codeSnippet,
          lang: "cpp",
          duration: `⏱️ ${estMinutes - 10}–${estMinutes + 10} phút`,
          actionText: "⚡ Học Bài Này Ngay",
          actionType: "lesson",
          targetId: les.id
        };
      }
    }

    return null;
  }

  /**
   * Tạo tóm tắt và snippet cho hàm trong Function Navigator của Playbook Studio
   */
  function resolveFunctionNavigatorData(el, fnId) {
    const nameEl = el.querySelector('.nav-fn-name') || el.querySelector('.fn-name');
    const fnName = nameEl ? nameEl.textContent.trim() : fnId;
    const typeEl = el.querySelector('.nav-type-badge') || el.querySelector('.badge');
    const fnType = typeEl ? typeEl.textContent.trim() : 'Hàm Thao Tác';
    const descEl = el.querySelector('.nav-fn-desc') || el.querySelector('.fn-desc');
    const fnDesc = descEl ? descEl.textContent.trim() : `Hàm ${fnName}() được thiết kế chuẩn mực trong kiến trúc Playbook.`;

    const startLine = el.getAttribute('data-start-line') || '';
    const endLine = el.getAttribute('data-end-line') || '';
    const lineRangeText = (startLine && endLine) ? ` · L${startLine}-L${endLine}` : '';

    return {
      id: fnId,
      title: `${fnName}()`,
      badge: `${fnType}${lineRangeText}`,
      icon: "📑",
      category: "Playbook Function Navigator",
      essence: fnDesc,
      code: `// Định nghĩa và kiểm chứng tại Playbook Studio\nvoid ${fnName}(/* parameters */) {\n    // Đảm bảo không làm rò rỉ bộ nhớ Heap\n    // Tối ưu cache và thời gian thực thi O(N)\n}`,
      lang: "cpp",
      duration: "⏱️ 5–15 phút đọc mã",
      actionText: "⚡ Định Vị Dòng Trong Studio",
      actionType: "function",
      targetId: fnId
    };
  }

  function extractSnippetFromSource(source) {
    if (!source) return `// Code chuẩn kiến trúc 4 tầng\nint main() {\n    // Thực thi kiểm chứng toàn diện\n    return 0;\n}`;
    const lines = source.split('\n');
    // Tìm hàm đầu tiên sau tầng 1
    let startIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('TẦNG 2') || lines[i].includes('void ') || lines[i].includes('int ')) {
        startIndex = i;
        break;
      }
    }
    const snippet = lines.slice(startIndex, startIndex + 5).join('\n');
    return snippet.trim() || lines.slice(0, 5).join('\n');
  }

  function generateFallbackCodeForLesson(lesson) {
    return `// Minh họa khái niệm cốt lõi: ${lesson.id}\nvoid executeDemo() {\n    cout << "Khám phá bài học: ${escapeHtml(lesson.title)}" << endl;\n}`;
  }

  function stripHtml(html) {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  /* ============================================================================
     5. THUẬT TOÁN ĐỊNH VỊ CHỐNG TRÀN MÀN HÌNH (SMART COLLISION & AUTO-FLIP)
     ============================================================================ */
  function computeSmartPosition(targetEl, popoverEl) {
    const targetRect = targetEl.getBoundingClientRect();
    const popoverRect = popoverEl.getBoundingClientRect();

    const popoverWidth = popoverRect.width || 380;
    const popoverHeight = popoverRect.height || 260;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const margin = 14; // Khoảng cách đệm an toàn tới mép viewport
    const gap = 10;    // Khoảng cách giữa target và popover

    // 1. Tính toán trục dọc (Vertical Axis)
    const spaceBelow = viewportHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;

    let top = 0;
    let isFlippedTop = false;

    // Nếu không đủ chỗ phía dưới (< popoverHeight + gap + margin) và phía trên rộng hơn
    if (spaceBelow < (popoverHeight + gap + margin) && spaceAbove > spaceBelow) {
      // Auto-flip Top: Lật lên phía trên phần tử
      top = targetRect.top - popoverHeight - gap;
      isFlippedTop = true;
    } else {
      // Mặc định: Nằm phía dưới phần tử
      top = targetRect.bottom + gap;
      isFlippedTop = false;
    }

    // Khóa an toàn không bị tràn mép trên/dưới
    if (top < margin) {
      top = margin;
    } else if (top + popoverHeight > viewportHeight - margin) {
      top = viewportHeight - popoverHeight - margin;
    }

    // 2. Tính toán trục ngang (Horizontal Axis)
    // Căn giữa popover so với phần tử target
    let left = targetRect.left + (targetRect.width - popoverWidth) / 2;

    // Chống tràn mép phải: Nếu vượt quá mép phải -> dịch sang trái
    if (left + popoverWidth > viewportWidth - margin) {
      left = viewportWidth - popoverWidth - margin;
    }
    // Chống tràn mép trái: Nếu nhỏ hơn lề an toàn -> dịch sang phải
    if (left < margin) {
      left = margin;
    }

    // 3. Tính toán vị trí mũi tên chỉ báo (Arrow Caret)
    // Tọa độ tâm target chiếu theo trục X của popover
    const targetCenterX = targetRect.left + targetRect.width / 2;
    let arrowLeft = targetCenterX - left - 6; // 6 là nửa chiều rộng mũi tên 12px
    // Giới hạn mũi tên nằm trong vùng bo góc của popover (18px đến popoverWidth - 28px)
    arrowLeft = Math.max(18, Math.min(popoverWidth - 28, arrowLeft));

    return { top, left, isFlippedTop, arrowLeft };
  }

  /* ============================================================================
     6. CORE ENGINE CONTROLLER (DEBOUNCE, SHOW, HIDE, QUICK ACTION)
     ============================================================================ */
  let popoverEl = null;
  let arrowEl = null;
  let activeTarget = null;
  let currentData = null;

  let showTimer = null;
  let hideTimer = null;

  const DEBOUNCE_DELAY = 120; // 120ms: Rê chuột nhanh lướt qua không bị nhấp nháy
  const HIDE_DELAY = 200;     // 200ms: Đủ thời gian di chuyển chuột vào trong thẻ

  function getOrCreatePopover() {
    if (popoverEl && document.body.contains(popoverEl)) {
      return popoverEl;
    }

    injectStyles();

    popoverEl = document.createElement('div');
    popoverEl.className = 'smart-peek-popover';
    popoverEl.setAttribute('role', 'tooltip');
    popoverEl.setAttribute('aria-hidden', 'true');

    arrowEl = document.createElement('div');
    arrowEl.className = 'smart-peek-arrow';
    popoverEl.appendChild(arrowEl);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'smart-peek-content-wrapper';
    popoverEl.appendChild(contentWrapper);

    // Xử lý sự kiện giữ popover khi người dùng rê chuột vào bên trong
    popoverEl.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
    });

    popoverEl.addEventListener('mouseleave', () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        hidePopover();
      }, HIDE_DELAY);
    });

    // Bắt sự kiện click vào nút hành động
    popoverEl.addEventListener('click', handlePopoverClick);

    document.body.appendChild(popoverEl);
    return popoverEl;
  }

  function renderPopoverHtml(data) {
    const icon = data.icon || "💡";
    const idBadge = data.id ? `<span class="smart-peek-id-badge">${escapeHtml(data.id)}</span>` : '';
    const catBadge = data.badge ? `<span class="smart-peek-cat-badge">${escapeHtml(data.badge)}</span>` : '';
    const title = escapeHtml(data.title || "Khái Niệm Kỹ Thuật");
    const essence = escapeHtml(data.essence || "");
    const codeHtml = highlightSyntax(data.code || "");
    const langLabel = (data.lang || "cpp").toUpperCase();
    const duration = escapeHtml(data.duration || "⏱️ 25–40 phút");
    const actionText = escapeHtml(data.actionText || "⚡ Xem Chi Tiết");

    return `
      <div class="smart-peek-header">
        <div class="smart-peek-icon-box">${icon}</div>
        <div class="smart-peek-title-group">
          <div class="smart-peek-top-row">
            ${idBadge}
            ${catBadge}
          </div>
          <h4 class="smart-peek-title" title="${title}">${title}</h4>
        </div>
      </div>

      <div class="smart-peek-essence">${essence}</div>

      ${data.code ? `
        <div class="smart-peek-code-box">
          <span class="smart-peek-code-lang">${langLabel}</span>
          <code>${codeHtml}</code>
        </div>
      ` : ''}

      <div class="smart-peek-footer">
        <div class="smart-peek-duration">${duration}</div>
        <button type="button" class="smart-peek-btn" data-action="${data.actionType || 'open'}" data-target="${escapeHtml(data.targetId || data.id || '')}">
          <span>${actionText}</span>
          <span style="font-size:13px;">→</span>
        </button>
      </div>
    `;
  }

  function showPopoverForTarget(target) {
    if (!target) return;
    const data = resolveDataFromTarget(target);
    if (!data) return;

    activeTarget = target;
    currentData = data;

    const pop = getOrCreatePopover();
    const wrapper = pop.querySelector('.smart-peek-content-wrapper');
    if (wrapper) {
      wrapper.innerHTML = renderPopoverHtml(data);
    }

    // Đưa vào DOM nhưng chưa kích hoạt active để đo đạc chính xác kích thước
    pop.style.left = '-9999px';
    pop.style.top = '-9999px';
    pop.classList.remove('is-active', 'is-flipped-top');
    pop.setAttribute('aria-hidden', 'false');

    // Chờ 1 frame để layout tính xong getBoundingClientRect
    requestAnimationFrame(() => {
      if (activeTarget !== target) return; // Nếu đã di chuột sang target khác thì dừng

      const pos = computeSmartPosition(target, pop);
      pop.style.left = `${Math.round(pos.left)}px`;
      pop.style.top = `${Math.round(pos.top)}px`;

      if (pos.isFlippedTop) {
        pop.classList.add('is-flipped-top');
      } else {
        pop.classList.remove('is-flipped-top');
      }

      if (arrowEl) {
        arrowEl.style.left = `${Math.round(pos.arrowLeft)}px`;
      }

      pop.classList.add('is-active');
    });
  }

  function hidePopover() {
    clearTimeout(showTimer);
    activeTarget = null;
    currentData = null;

    if (popoverEl) {
      popoverEl.classList.remove('is-active');
      popoverEl.setAttribute('aria-hidden', 'true');
    }
  }

  function handlePopoverClick(e) {
    const btn = e.target.closest('.smart-peek-btn');
    if (!btn) return;

    const action = btn.getAttribute('data-action');
    const targetId = btn.getAttribute('data-target');

    hidePopover();

    if (action === 'playbook') {
      // Mở Playbook Studio
      if (typeof window.selectPlaybook === 'function' && targetId) {
        window.selectPlaybook(targetId);
      }
      if (typeof window.navigateTo === 'function') {
        window.navigateTo('playbook');
      } else {
        const playbookTab = document.querySelector('[data-view="playbook"]');
        if (playbookTab) playbookTab.click();
      }
    } else if (action === 'lesson') {
      // Mở Lesson Reader
      if (typeof window.navigateTo === 'function' && targetId) {
        window.navigateTo('reader', targetId);
      } else {
        const openBtn = document.querySelector(`[data-open-lesson="${targetId}"]`);
        if (openBtn) openBtn.click();
      }
    } else if (action === 'function') {
      // Focus vào dòng trong Playbook Studio
      if (typeof window.navigateTo === 'function') {
        window.navigateTo('playbook');
      }
      const navItem = document.querySelector(`[data-fn-id="${targetId}"]`);
      if (navItem) {
        navItem.click();
        navItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  /* ============================================================================
     7. EVENT DELEGATION: MOUSEOVER / MOUSEOUT & ESCAPE KEY
     ============================================================================ */
  function findValidHoverTarget(el) {
    if (!el || el === document.body || el === document.documentElement) return null;

    // Không kích hoạt popover khi đang rê chuột bên trong chính popover
    if (el.closest('.smart-peek-popover')) return null;

    // Các bộ chọn kích hoạt Smart Peek Card
    return el.closest(`
      [data-peek-term],
      [data-peek-lesson],
      .lesson-card,
      [data-open-lesson],
      .nav-item-card,
      [data-fn-id],
      .smart-hover-target,
      .lesson-id-badge
    `);
  }

  function handleGlobalMouseOver(e) {
    const target = findValidHoverTarget(e.target);
    if (!target) return;

    // Nếu vẫn ở trên cùng một target thì bỏ qua
    if (target === activeTarget) {
      clearTimeout(hideTimer);
      return;
    }

    clearTimeout(hideTimer);
    clearTimeout(showTimer);

    // Kích hoạt Debounce 120ms
    showTimer = setTimeout(() => {
      showPopoverForTarget(target);
    }, DEBOUNCE_DELAY);
  }

  function handleGlobalMouseOut(e) {
    const target = findValidHoverTarget(e.target);
    if (!target) return;

    // Nếu con trỏ chuột chỉ di chuyển vào một phần tử con bên trong cùng target thì bỏ qua
    if (target.contains(e.relatedTarget)) {
      return;
    }

    clearTimeout(showTimer);
    clearTimeout(hideTimer);

    // Kích hoạt độ trễ 200ms trước khi ẩn popover
    hideTimer = setTimeout(() => {
      hidePopover();
    }, HIDE_DELAY);
  }

  function handleGlobalKeyDown(e) {
    if (e.key === 'Escape') {
      hidePopover();
    }
  }

  function handleGlobalScroll() {
    // Ẩn mượt mà khi người dùng cuộn trang nhanh để tránh lệch tọa độ
    if (popoverEl && popoverEl.classList.contains('is-active')) {
      hidePopover();
    }
  }

  /* ============================================================================
     8. PUBLIC API & TỰ ĐỘNG KHỞI TẠO (INIT ENGINE)
     ============================================================================ */
  let listenersAttached = false;

  function initSmartHoverEngine() {
    injectStyles();
    getOrCreatePopover();

    if (!listenersAttached) {
      document.addEventListener('mouseover', handleGlobalMouseOver, { passive: true });
      document.addEventListener('mouseout', handleGlobalMouseOut, { passive: true });
      document.addEventListener('keydown', handleGlobalKeyDown, { passive: true });
      window.addEventListener('scroll', handleGlobalScroll, { passive: true });
      listenersAttached = true;
      console.log('✨ [SmartHoverEngine] Activated with 120ms Debounce & Smart Collision Auto-Flip.');
    }

    return window.SmartHoverEngine;
  }

  // Khai báo đối tượng quản trị toàn cục
  window.SmartHoverEngine = {
    init: initSmartHoverEngine,
    show: function (targetEl, customData) {
      if (!targetEl) return;
      if (customData) {
        activeTarget = targetEl;
        currentData = customData;
        const pop = getOrCreatePopover();
        const wrapper = pop.querySelector('.smart-peek-content-wrapper');
        if (wrapper) wrapper.innerHTML = renderPopoverHtml(customData);
        requestAnimationFrame(() => {
          const pos = computeSmartPosition(targetEl, pop);
          pop.style.left = `${Math.round(pos.left)}px`;
          pop.style.top = `${Math.round(pos.top)}px`;
          if (pos.isFlippedTop) pop.classList.add('is-flipped-top');
          else pop.classList.remove('is-flipped-top');
          if (arrowEl) arrowEl.style.left = `${Math.round(pos.arrowLeft)}px`;
          pop.classList.add('is-active');
        });
      } else {
        showPopoverForTarget(targetEl);
      }
    },
    hide: hidePopover,
    registerTerm: function (key, data) {
      if (!key || !data) return;
      CONCEPT_DICTIONARY[key.toLowerCase().trim()] = data;
    },
    getDictionary: function () {
      return Object.assign({}, CONCEPT_DICTIONARY);
    },
    lookup: lookupLessonOrPlaybook
  };

  window.initSmartHoverEngine = initSmartHoverEngine;

  // Tự động khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmartHoverEngine);
  } else {
    initSmartHoverEngine();
  }

})(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : {});
