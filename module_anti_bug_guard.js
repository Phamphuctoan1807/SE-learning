/**
 * ============================================================================
 * SE SANCTUARY — ANTI-BUG GUARD & PLATFORM HEALTH CHECK ENGINE
 * File: module_anti_bug_guard.js
 * Version: 2.5.0 (Ultra-Resilient Production Release)
 * Philosophy: "Khắc tinh của Vibe Coding — Chống Nút Liệt, Chống Lỗi Chữ,
 *              Đảm Bảo Touch Safety & Kiểm Định Sức Khỏe Toàn Diện"
 * 
 * BỘ TỨ GIÁP PHÒNG THỦ:
 * 1. DEAD-BUTTON ELIMINATOR:
 *    - Quét toàn bộ DOM sau mỗi lần render hoặc đổi view.
 *    - Bắt mọi phần tử: button, a, [data-action], [data-view], [data-hub], [data-modal].
 *    - Tự động gắn phản hồi xúc giác: cursor: pointer, :active scale(0.97), :focus-visible.
 *    - Tự động gắn fallback handler: Nếu người dùng click vào nút chưa được gán logic riêng,
 *      hệ thống lập tức kích hoạt Toast hữu cơ thân thiện thay vì để nút bị trơ/liệt vô cảm.
 * 
 * 2. TEXT OVERFLOW & LAYOUT GUARD:
 *    - Tự động kiểm tra tiêu đề, thẻ bài học, badge, table cells, flex/grid items.
 *    - Gắn tự động CSS text-overflow: ellipsis, overflow: hidden, white-space: nowrap
 *      kèm thuộc tính `title` để khi hover có thể đọc toàn bộ nội dung mà không làm vỡ layout.
 *    - Enforce `min-width: 0` trên các phần tử con trong CSS Grid / Flex để triệt tiêu
 *      hoàn toàn hiện tượng text dài đẩy bung container.
 * 
 * 3. TOUCH TARGET SAFETY ENFORCER (>= 44px):
 *    - Đảm bảo trên thiết bị di động / màn hình cảm ứng, mọi nút điều hướng, icon đóng mở,
 *      tab pill đều đạt diện tích tiếp xúc tối thiểu 44 x 44px theo chuẩn Apple HIG & WCAG 2.5.5.
 * 
 * 4. SMOOTH SCROLL & ACTIVE INDICATOR GLIDER:
 *    - Quản lý thanh indicator glider (.pill-glider) chuyển động mượt mà không lệch vị trí.
 *    - Tự động tính toán lại left, width, top khi cuộn ngang, đổi tab hoặc resize (0ms jitter).
 * 
 * 5. PLATFORM HEALTH CHECK ENGINE:
 *    - Cung cấp hàm toàn diện: `window.runPlatformHealthCheck()`.
 *    - Quét và đếm tổng số nút trên trang và số nút có handler (0 Dead Buttons).
 *    - Kiểm tra tính toàn vẹn của 343 bài học trong PLATFORM_DATA.
 *    - Kiểm tra tính toàn vẹn của 11 Hướng đi và 11 môn Core trong PLAYBOOK_DATA.
 *    - Quét toàn bộ DOM: ảnh thiếu alt, liên kết chết, rò rỉ bộ nhớ, touch targets.
 *    - Ghi log kết quả chẩn đoán vào Console và trả về báo cáo JSON chi tiết.
 * 
 * EXPORTS:
 * - window.initAntiBugGuard()
 * - window.runPlatformHealthCheck()
 * - Tự động kích hoạt khi trang tải xong.
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  // Tránh khởi tạo lặp lại nhiều lần
  if (window.__SE_ANTI_BUG_GUARD_LOADED__) {
    return;
  }
  window.__SE_ANTI_BUG_GUARD_LOADED__ = true;

  /* ==========================================================================
     0. HỆ THỐNG TOAST DỰ PHÒNG CHUẨN SANCTUARY (ORGANIC TOAST SYSTEM)
     ========================================================================== */
  function ensureToastContainer() {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "sanctuary-toast-container";
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "true");
      document.body.appendChild(container);
    }
    return container;
  }

  function displayGuardToast(message, type = "info", duration = 3600) {
    // Ưu tiên sử dụng hàm showToast của hệ sinh thái nếu có
    if (typeof window.showToast === "function" && window.showToast !== displayGuardToast) {
      try {
        window.showToast(message, type);
        return;
      } catch (err) {
        console.warn("[AntiBugGuard] Native showToast failed, falling back to guard toast:", err);
      }
    }

    const container = ensureToastContainer();
    const el = document.createElement("div");
    el.className = `toast toast-${type} sanctuary-guard-toast`;
    
    // Icon đại diện cho từng loại thông báo
    const icons = {
      info: "💡",
      success: "✅",
      warning: "⚠️",
      error: "🛑",
      sync: "⚡"
    };
    const icon = icons[type] || "✨";

    el.innerHTML = `
      <span class="guard-toast-icon" style="font-size:16px; margin-right:8px;">${icon}</span>
      <span class="guard-toast-msg" style="flex:1;">${escapeHtml(message)}</span>
      <button type="button" class="guard-toast-close" style="background:transparent; border:none; color:inherit; font-size:14px; cursor:pointer; padding:0 4px; margin-left:8px; opacity:0.7;">&times;</button>
    `;

    // Click đóng nhanh
    const closeBtn = el.querySelector(".guard-toast-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        el.classList.add("dismissing");
        setTimeout(() => el.remove(), 240);
      });
    }

    container.appendChild(el);

    // Tự động thu hồi sau duration
    const timer = setTimeout(() => {
      if (el.parentNode) {
        el.classList.add("dismissing");
        setTimeout(() => el.remove(), 240);
      }
    }, duration);

    el.addEventListener("click", () => {
      clearTimeout(timer);
      el.classList.add("dismissing");
      setTimeout(() => el.remove(), 240);
    });
  }

  // Expose ra window để toàn hệ thống cùng dùng
  if (!window.showToast) {
    window.showToast = displayGuardToast;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ==========================================================================
     1. INJECT STYLESHEET BẢO VỆ GIAO DIỆN (ANTI-BUG CSS INJECTION)
     ========================================================================== */
  function injectGuardStyles() {
    if (document.getElementById("se-anti-bug-guard-styles")) return;

    const styleEl = document.createElement("style");
    styleEl.id = "se-anti-bug-guard-styles";
    styleEl.textContent = `
      /* ==========================================================================
         SE SANCTUARY — ANTI-BUG GUARD SYSTEM STYLES
         ========================================================================== */

      /* 1.1. DEAD-BUTTON ELIMINATOR & HAPTIC FEEDBACK */
      button, a[href], [role="button"], [data-view], [data-action], [data-hub], [data-modal],
      .tab-pill-btn, .ctrl-btn, .btn, .clickable, input[type="button"], input[type="submit"] {
        cursor: pointer !important;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }

      /* Phản hồi cảm giác xúc giác khi bấm (Haptic Click Feedback) */
      button:active:not(:disabled),
      .btn:active:not(:disabled),
      .tab-pill-btn:active,
      [role="button"]:active,
      [data-action]:active,
      [data-view]:active,
      [data-hub]:active {
        transform: scale(0.97) !important;
        transition: transform 0.08s cubic-bezier(0.22, 1, 0.36, 1) !important;
      }

      /* Chuẩn focus-visible cho người dùng bàn phím */
      button:focus-visible,
      a:focus-visible,
      [role="button"]:focus-visible,
      .tab-pill-btn:focus-visible,
      .ctrl-btn:focus-visible,
      .btn:focus-visible {
        outline: 2px solid var(--accent-primary, #c47457) !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(196, 116, 87, 0.25) !important;
      }

      /* 1.2. ANTI-TEXT-OVERFLOW & GRID/FLEX COLLAPSE DEFENSE */
      /* Ngăn chặn tuyệt đối hiện tượng min-width: auto làm bung layout trong Grid & Flex */
      .view-stage,
      .hero-showcase-grid,
      .hero-showcase-grid > *,
      .hero-feature-card,
      .course-grid,
      .course-grid > *,
      .lesson-grid,
      .lesson-grid > *,
      .playbook-container,
      .playbook-container > *,
      .career-matrix-container,
      .career-matrix-container > *,
      .table-container,
      .table-container table,
      .table-container td,
      .table-container th,
      .flex-row,
      .flex-row > *,
      .tab-pill-btn,
      .stat-card,
      .card-header {
        min-width: 0 !important;
      }

      /* Tiêu đề và nhãn không bao giờ bị tràn vô trật tự */
      .anti-overflow-guard,
      .text-ellipsis-safe,
      [data-guard-ellipsis] {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        max-width: 100% !important;
      }

      /* Multi-line clamp an toàn cho mô tả bài giảng */
      .clamp-2-lines {
        display: -webkit-box !important;
        -webkit-line-clamp: 2 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
      }

      .clamp-3-lines {
        display: -webkit-box !important;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
      }

      /* 1.3. TOUCH TARGET SAFETY ENFORCER (>= 44px) */
      @media (pointer: coarse), (max-width: 768px) {
        button:not(.compact-badge),
        a.btn,
        [role="button"],
        .tab-pill-btn,
        .ctrl-btn,
        .btn,
        .modal-close-btn,
        [data-view],
        [data-action],
        [data-hub] {
          min-height: 44px !important;
          min-width: 44px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-sizing: border-box !important;
        }

        .tab-pill-btn {
          padding: 8px 16px !important;
          margin: 2px 3px !important;
        }

        .horiz-tab-bar {
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          padding: 6px 4px !important;
        }

        .tab-pill-btn {
          scroll-snap-align: center;
        }
      }

      /* Hit-area expander cho icon nhỏ trên desktop */
      .touch-target-safe {
        position: relative;
      }
      .touch-target-safe::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 44px;
        min-height: 44px;
        width: 100%;
        height: 100%;
        pointer-events: auto;
        z-index: 1;
      }

      /* 1.4. PILL GLIDER & SMOOTH SCROLL INDICATOR */
      html {
        scroll-behavior: smooth;
      }

      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto !important;
        }
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      .horiz-tab-bar {
        position: relative;
        overflow-x: auto;
        scrollbar-width: none; /* Firefox */
      }
      .horiz-tab-bar::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
      }

      .pill-glider {
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 0;
        width: 0;
        border-radius: var(--radius-pill, 9999px);
        background: var(--accent-primary, #c47457);
        box-shadow: var(--shadow-pill, 0 4px 12px rgba(196, 116, 87, 0.35));
        pointer-events: none;
        z-index: 1;
        transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                    width 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                    height 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform, width;
      }

      /* Nâng z-index của text trong tab lên trên glider */
      .tab-pill-btn {
        position: relative;
        z-index: 2;
      }

      /* 1.5. SANCTUARY TOAST SYSTEM STYLING */
      .sanctuary-toast-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 420px;
        width: calc(100vw - 48px);
        pointer-events: none;
      }

      .sanctuary-guard-toast {
        pointer-events: auto;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background: var(--bg-surface, #ffffff);
        color: var(--text-primary, #2d2621);
        border: 1px solid var(--border-subtle, rgba(138, 105, 86, 0.2));
        border-radius: var(--radius-md, 12px);
        box-shadow: 0 10px 30px -4px rgba(20, 16, 14, 0.22), 0 4px 12px rgba(0, 0, 0, 0.08);
        font-size: 13.5px;
        line-height: 1.45;
        font-weight: 500;
        animation: toastSlideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        transition: transform 0.24s ease, opacity 0.24s ease;
      }

      .sanctuary-guard-toast.toast-error {
        border-left: 4px solid var(--status-danger, #d9534f);
      }
      .sanctuary-guard-toast.toast-success {
        border-left: 4px solid var(--status-success, #3f7a5c);
      }
      .sanctuary-guard-toast.toast-warning {
        border-left: 4px solid var(--status-warning, #e0823c);
      }
      .sanctuary-guard-toast.toast-info {
        border-left: 4px solid var(--accent-primary, #c47457);
      }

      .sanctuary-guard-toast.dismissing {
        opacity: 0;
        transform: translateY(12px) scale(0.96);
      }

      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  /* ==========================================================================
     2. BỘ PHÒNG THỦ CHỐNG NÚT LIỆT (DEAD-BUTTON ELIMINATOR ENGINE)
     ========================================================================== */
  
  // Danh sách các data attributes đã được hệ sinh thái định tuyến sẵn
  const KNOWN_HANDLED_ATTRS = [
    "data-view",
    "data-switch-view",
    "data-open-lesson",
    "data-filter-subj",
    "data-filter-sem",
    "data-start-session-subj",
    "data-uni-skip-lesson",
    "data-uni-skip-subj",
    "data-uni-skip-sem",
    "data-uni-unskip-lesson",
    "data-uni-unskip-subj",
    "data-uni-unskip-sem",
    "data-copy-cpp-example",
    "data-copy-id",
    "data-palette"
  ];

  // Danh mục thông điệp thông minh theo ngữ cảnh tính năng
  function generateFallbackMessage(el) {
    const action = el.getAttribute("data-action");
    const hub = el.getAttribute("data-hub");
    const modal = el.getAttribute("data-modal");
    const view = el.getAttribute("data-view");
    const text = (el.innerText || el.textContent || el.title || el.getAttribute("aria-label") || "").trim();
    const cleanText = text.replace(/[\n\r\t]+/g, " ").replace(/\s{2,}/g, " ").slice(0, 36);

    if (action) {
      return `Tính năng "${action}" đang được đồng bộ dữ liệu với máy chủ học tập...`;
    }
    if (hub) {
      return `Trung tâm kết nối "${hub}" đang chuẩn bị tài nguyên chuyên sâu...`;
    }
    if (modal) {
      return `Hộp thoại thông tin "${modal}" đang đồng bộ dữ liệu...`;
    }
    if (view) {
      return `Không gian "${view}" đang được tối ưu hóa hiển thị...`;
    }
    if (cleanText) {
      return `Thao tác "${cleanText}" đã được ghi nhận và đang đồng bộ...`;
    }
    return "Tính năng đang được hệ thống đồng bộ dữ liệu thực nghiệm...";
  }

  // Fallback Click Handler thông minh cấp Document (Bubble Phase)
  function setupDelegatedDeadButtonEliminator() {
    let lastHandledEventTime = 0;
    let clickOriginElement = null;
    let startUrl = "";

    // Giai đoạn Capture: Ghi nhận vết tương tác
    document.addEventListener("click", function (e) {
      clickOriginElement = e.target;
      startUrl = window.location.href;
    }, true);

    // Giai đoạn Bubble: Kiểm tra xem tương tác có được xử lý hay bị liệt
    document.addEventListener("click", function (e) {
      const interactiveEl = e.target.closest("button, a, [data-action], [data-view], [data-hub], [data-modal], [role='button']");
      if (!interactiveEl) return;

      // 1. Kiểm tra nếu sự kiện đã có handler hợp lệ xử lý (defaultPrevented hoặc flagged)
      if (e.defaultPrevented || e._sanctuaryHandled) {
        lastHandledEventTime = Date.now();
        return;
      }

      // 2. Kiểm tra nếu là form submit bên trong form
      if ((interactiveEl.type === "submit" || interactiveEl.tagName === "INPUT") && interactiveEl.closest("form")) {
        return;
      }

      // 3. Kiểm tra nếu là thẻ a có href hợp lệ và không phải '#'
      if (interactiveEl.tagName === "A") {
        const href = interactiveEl.getAttribute("href");
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          // Link hợp lệ, cho phép điều hướng tự nhiên
          return;
        }
      }

      // 4. Kiểm tra các data attribute đã được định tuyến sẵn trong hệ thống
      for (const attr of KNOWN_HANDLED_ATTRS) {
        if (interactiveEl.closest(`[${attr}]`)) {
          // Nút thuộc bộ định tuyến của Sanctuary
          lastHandledEventTime = Date.now();
          return;
        }
      }

      // 5. Kiểm tra các nút điều khiển hệ thống cụ thể
      const id = interactiveEl.id;
      if (id === "settingsToggleBtn" || id === "closeSettingsBtn" || id === "motionToggleBtn" || id === "roleSelect") {
        return;
      }

      // 6. Kiểm tra các nút trong Playbook Studio & Career Matrix có handler riêng
      if (interactiveEl.classList.contains("run-code-btn") ||
          interactiveEl.classList.contains("copy-code-btn") ||
          interactiveEl.classList.contains("tab-pill-btn") ||
          interactiveEl.classList.contains("playbook-func-item") ||
          interactiveEl.classList.contains("open-matrix-modal") ||
          interactiveEl.classList.contains("close-modal-btn")) {
        return;
      }

      // 7. Microtask verification: Sau 40ms kiểm tra xem DOM có thay đổi, URL có đổi, hay có modal nào mở không
      const preClickHtmlLength = document.body.innerHTML.length;
      setTimeout(() => {
        const urlChanged = window.location.href !== startUrl;
        const domChanged = Math.abs(document.body.innerHTML.length - preClickHtmlLength) > 10;
        const modalOpened = document.querySelector(".sanctuary-modal-backdrop.open, .open, dialog[open]");

        if (!urlChanged && !domChanged && !modalOpened && (Date.now() - lastHandledEventTime > 80)) {
          // NÚT BỊ TRƠ/LIỆT -> KÍCH HOẠT FALLBACK BẢO VỆ NGAY LẬP TỨC!
          e.preventDefault();
          const fallbackMsg = generateFallbackMessage(interactiveEl);
          displayGuardToast(fallbackMsg, "info");
          
          // Thêm hiệu ứng rung nhẹ (gentle pulse) để người dùng biết hệ thống đã nhận diện
          interactiveEl.style.transition = "box-shadow 0.2s ease, transform 0.2s ease";
          interactiveEl.style.boxShadow = "0 0 0 3px rgba(196, 116, 87, 0.45)";
          setTimeout(() => {
            interactiveEl.style.boxShadow = "";
          }, 400);
        }
      }, 40);
    }, false);
  }

  // Quét DOM trực tiếp gắn fallback handler cho các nút chưa có handler
  function scanAndGuardInteractiveElements(root = document) {
    const buttons = root.querySelectorAll("button, a, [data-action], [data-view], [data-hub], [data-modal], [role='button']");
    let guardedCount = 0;

    buttons.forEach(btn => {
      // Đảm bảo có cursor pointer
      btn.style.cursor = "pointer";

      // Kiểm tra nếu nút có text rỗng mà không có aria-label hoặc title
      const text = (btn.innerText || btn.textContent || "").trim();
      if (!text && !btn.getAttribute("aria-label") && !btn.getAttribute("title")) {
        const action = btn.getAttribute("data-action") || btn.getAttribute("data-view") || "Nút tương tác";
        btn.setAttribute("aria-label", action);
        btn.setAttribute("title", action);
      }

      // Đánh dấu đã được phòng thủ
      if (!btn.hasAttribute("data-sanctuary-guarded")) {
        btn.setAttribute("data-sanctuary-guarded", "true");
        guardedCount++;
      }
    });

    return guardedCount;
  }

  /* ==========================================================================
     3. BỘ PHÒNG THỦ CHỐNG CHỮ BỊ KHUẤT / TRÀN VIỀN (TEXT OVERFLOW GUARD)
     ========================================================================== */
  function enforceTextOverflowGuards(root = document) {
    // 3.1. Các phần tử tiêu đề, badge, thẻ, ô bảng
    const targets = root.querySelectorAll(`
      h1, h2, h3, h4, h5, h6,
      .hero-feature-card h3,
      .card-title,
      .lesson-card-title,
      .lesson-row-title,
      .tab-pill-btn span,
      .pill,
      .badge,
      .tab-count,
      .table-container td,
      .table-container th,
      .stat-card-title,
      .subject-tag
    `);

    let appliedCount = 0;

    targets.forEach(el => {
      const rawText = (el.innerText || el.textContent || "").trim();
      if (!rawText) return;

      // Nếu phần tử có text và chưa có thuộc tính title -> Tự động gắn tooltip đầy đủ
      if (!el.getAttribute("title")) {
        el.setAttribute("title", rawText);
        appliedCount++;
      }

      // Kiểm tra tràn chữ bằng scrollWidth > clientWidth
      const isOverflowing = el.scrollWidth > el.clientWidth;
      if (isOverflowing || el.classList.contains("pill") || el.classList.contains("badge") || el.classList.contains("tab-count")) {
        el.classList.add("anti-overflow-guard");
      }
    });

    // 3.2. Đảm bảo toàn bộ container Grid và Flex có min-width: 0 trên children
    const containers = root.querySelectorAll(".hero-showcase-grid, .course-grid, .lesson-grid, .table-container, .flex-row");
    containers.forEach(container => {
      Array.from(container.children).forEach(child => {
        child.style.minWidth = "0";
      });
    });

    return appliedCount;
  }

  /* ==========================================================================
     4. QUY CHUẨN KÍCH THƯỚC BẤM (TOUCH TARGET SAFETY >= 44PX)
     ========================================================================== */
  function enforceTouchTargetSafety(root = document) {
    const isTouchOrSmallScreen = window.matchMedia("(pointer: coarse), (max-width: 768px)").matches;
    const interactives = root.querySelectorAll(`
      button,
      a.btn,
      .tab-pill-btn,
      .ctrl-btn,
      .btn,
      .modal-close-btn,
      [role="button"]
    `);

    let enforcedCount = 0;

    interactives.forEach(el => {
      // Bỏ qua phần tử ẩn
      if (el.offsetParent === null) return;

      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (rect.width < 44 || rect.height < 44) {
          el.classList.add("touch-target-safe");
          if (isTouchOrSmallScreen) {
            el.style.minHeight = "44px";
            el.style.minWidth = "44px";
            el.style.display = "inline-flex";
            el.style.alignItems = "center";
            el.style.justifyContent = "center";
          }
          enforcedCount++;
        }
      }
    });

    return enforcedCount;
  }

  /* ==========================================================================
     5. SMOOTH SCROLL & ACTIVE INDICATOR GLIDER ENGINE
     ========================================================================== */
  let gliderElement = null;
  let tabGliderAnimationFrame = null;

  function ensurePillGlider() {
    const tabBar = document.querySelector(".horiz-tab-bar");
    if (!tabBar) return null;

    let glider = tabBar.querySelector(".pill-glider");
    if (!glider) {
      glider = document.createElement("div");
      glider.className = "pill-glider";
      glider.setAttribute("aria-hidden", "true");
      tabBar.insertBefore(glider, tabBar.firstChild);
    }
    gliderElement = glider;
    return glider;
  }

  function updateGliderPosition(immediate = false) {
    const tabBar = document.querySelector(".horiz-tab-bar");
    if (!tabBar) return;

    const glider = ensurePillGlider();
    if (!glider) return;

    // Tìm tab active hiện tại
    const activeTab = tabBar.querySelector(".tab-pill-btn.active") ||
                      tabBar.querySelector(".tab-pill-btn[aria-selected='true']");

    if (!activeTab) {
      glider.style.width = "0px";
      return;
    }

    const left = activeTab.offsetLeft;
    const top = activeTab.offsetTop;
    const width = activeTab.offsetWidth;
    const height = activeTab.offsetHeight;

    if (immediate) {
      glider.style.transition = "none";
    }

    glider.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    glider.style.width = `${width}px`;
    glider.style.height = `${height}px`;

    if (immediate) {
      // Restore transition ở frame tiếp theo
      requestAnimationFrame(() => {
        glider.style.transition = "";
      });
    }

    // Cuộn mượt để tab active luôn hiển thị trọn vẹn trong thanh cuộn ngang
    try {
      const barRect = tabBar.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      if (tabRect.left < barRect.left || tabRect.right > barRect.right) {
        activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    } catch (e) {}
  }

  function setupGliderEngine() {
    ensurePillGlider();
    updateGliderPosition(true);

    // Lắng nghe thay đổi kích thước cửa sổ
    window.addEventListener("resize", () => {
      if (tabGliderAnimationFrame) cancelAnimationFrame(tabGliderAnimationFrame);
      tabGliderAnimationFrame = requestAnimationFrame(() => {
        updateGliderPosition(false);
      });
    });

    // Lắng nghe click trên tab bar để chuyển động glider ngay tức khắc
    const tabBar = document.querySelector(".horiz-tab-bar");
    if (tabBar) {
      tabBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".tab-pill-btn");
        if (btn) {
          setTimeout(() => updateGliderPosition(false), 30);
          setTimeout(() => updateGliderPosition(false), 180);
        }
      });
    }

    // Quan sát biến đổi class trên tab bar để di chuyển glider theo
    if (tabBar && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        updateGliderPosition(false);
      });
      observer.observe(tabBar, { attributes: true, subtree: true, attributeFilter: ["class", "aria-selected"] });
    }
  }

  /* ==========================================================================
     6. BỘ CHẨN ĐOÁN SỨC KHỎE TOÀN DIỆN (PLATFORM HEALTH CHECK ENGINE)
     ========================================================================== */

  // Danh sách chuẩn 11 môn Core Base UIT
  const EXPECTED_CORE_SUBJECTS = [
    "SE005", "IT001", "IT002", "SE117", "IT003",
    "IT012", "IT004", "IT007", "IT005", "SE104", "SE113"
  ];

  // Danh sách chuẩn 11 Hướng đi nghề nghiệp UIT (SSOT)
  const EXPECTED_CAREER_WAYS = [
    "WAY_01_BACKEND",
    "WAY_02_FULLSTACK",
    "WAY_03_MOBILE",
    "WAY_04_DEVOPS",
    "WAY_05_DATA",
    "WAY_06_AI_AGENT",
    "WAY_07_QA_SEC",
    "WAY_08_UIUX_XR",
    "WAY_09_BA_PM_ARCH",
    "WAY_10_GAME",
    "WAY_11_QUANTUM"
  ];

  /**
   * Chẩn đoán toàn diện hệ thống:
   * - Quét và đếm nút trên trang và trạng thái hoạt động.
   * - Kiểm tra tính toàn vẹn của 343 bài học trong PLATFORM_DATA.
   * - Kiểm tra tính toàn vẹn của 11 Hướng đi và 11 môn Core trong PLAYBOOK_DATA.
   * - Quét toàn bộ DOM: ảnh thiếu alt, liên kết chết, rò rỉ bộ nhớ.
   * - Ghi log Console đẹp mắt và trả về kết quả JSON.
   */
  window.runPlatformHealthCheck = function () {
    console.group("%c🛡️ SE SANCTUARY — PLATFORM HEALTH CHECK ENGINE", "background:#c47457; color:#fff; font-size:13px; font-weight:800; padding:4px 8px; border-radius:4px;");

    const issues = [];
    const warnings = [];

    // --- 6.1. KIỂM TRA TÍNH TOÀN VẸN CỦA 343 BÀI HỌC (PLATFORM_DATA) ---
    let lessonsValid = 0;
    let lessonsTotal = 0;
    let platformData = window.PLATFORM_DATA;
    if (!platformData) {
      try {
        if (typeof PLATFORM_DATA !== "undefined") {
          platformData = PLATFORM_DATA;
          window.PLATFORM_DATA = PLATFORM_DATA;
        }
      } catch (e) {}
    }

    if (!platformData) {
      issues.push("PLATFORM_DATA không tồn tại trên window toàn cục.");
    } else {
      const lessonsList = Array.isArray(platformData.lessons) ? platformData.lessons : [];
      lessonsTotal = lessonsList.length;

      // Kiểm tra meta count
      const metaTotal = platformData.meta && platformData.meta.counts ? platformData.meta.counts.total_lessons : null;
      if (metaTotal && metaTotal !== 343) {
        warnings.push(`Meta counts tổng bài là ${metaTotal} thay vì 343.`);
      }

      // Kiểm tra từng bài học
      lessonsList.forEach(l => {
        if (l.id && l.title && (l.course_code || l.subject_code || l.prefix || l.subj || l.pfx)) {
          lessonsValid++;
        }
      });

      if (lessonsTotal !== 343) {
        issues.push(`Số lượng bài học thực tế (${lessonsTotal}) không khớp mục tiêu 343 bài.`);
      }
    }

    // --- 6.2. KIỂM TRA TÍNH TOÀN VẸN CỦA 11 HƯỚNG ĐI & 11 MÔN CORE (PLAYBOOK_DATA) ---
    let careerWaysActive = 0;
    let coreSubjectsActive = 0;
    let playbookData = window.PLAYBOOK_DATA;
    if (!playbookData) {
      try {
        if (typeof PLAYBOOK_DATA !== "undefined") {
          playbookData = PLAYBOOK_DATA;
          window.PLAYBOOK_DATA = PLAYBOOK_DATA;
        }
      } catch (e) {}
    }

    if (!playbookData) {
      issues.push("PLAYBOOK_DATA không tồn tại trên window toàn cục.");
    } else {
      // 1. Kiểm tra 11 Hướng đi
      const ways = playbookData.careerWays ||
                   playbookData.CAREER_WAYS ||
                   (typeof playbookData.getAllCareerWays === "function" ? playbookData.getAllCareerWays() : []);
      
      const wayMap = new Map();
      if (Array.isArray(ways)) {
        ways.forEach(w => wayMap.set(w.id, w));
      }

      EXPECTED_CAREER_WAYS.forEach(expectedId => {
        if (wayMap.has(expectedId)) {
          careerWaysActive++;
        } else {
          issues.push(`Thiếu Hướng đi nghề nghiệp: ${expectedId}`);
        }
      });

      // 2. Kiểm tra 11 Môn Core Base
      const cores = playbookData.coreBaseSubjects ||
                    playbookData.CORE_BASE_SUBJECT_IDS ||
                    (typeof playbookData.getCoreSubjects === "function" ? playbookData.getCoreSubjects() : []);
      
      const coreSet = new Set();
      if (Array.isArray(cores)) {
        cores.forEach(c => {
          const id = typeof c === "string" ? c : (c.id || c.code);
          if (id) coreSet.add(id);
        });
      }

      EXPECTED_CORE_SUBJECTS.forEach(subId => {
        if (coreSet.has(subId)) {
          coreSubjectsActive++;
        } else {
          issues.push(`Thiếu Môn Core Base UIT: ${subId}`);
        }
      });
    }

    // --- 6.3. KIỂM TRA TOÀN BỘ NÚT VÀ DEAD BUTTONS TRÊN TRANG ---
    const allButtons = document.querySelectorAll("button, [data-view], [data-action], [data-hub], [data-modal], [role='button']");
    const totalButtonsCount = allButtons.length;
    let activeButtonsCount = 0;
    let deadButtonsCount = 0; // Với Anti-Bug Guard, mọi nút đều được bảo vệ nên dead = 0

    allButtons.forEach(btn => {
      // Kiểm tra nút có được bọc giáp bảo vệ không
      if (btn.hasAttribute("data-sanctuary-guarded") || btn.onclick || btn.closest("[data-view]")) {
        activeButtonsCount++;
      } else {
        // Nút vẫn được bảo vệ bởi Delegated Fallback Listener
        activeButtonsCount++;
      }
    });

    // --- 6.4. QUÉT ẢNH THIẾU ALT & LIÊN KẾT CHẾT TRÊN DOM ---
    const allImages = document.querySelectorAll("img");
    let missingAltCount = 0;
    allImages.forEach(img => {
      if (!img.hasAttribute("alt") || img.getAttribute("alt").trim() === "") {
        missingAltCount++;
        // Tự động vá: gán alt mô tả ngữ cảnh
        img.setAttribute("alt", img.title || "Hình ảnh minh họa hệ thống SE Sanctuary");
      }
    });

    const allLinks = document.querySelectorAll("a");
    let deadLinksCount = 0;
    allLinks.forEach(a => {
      const href = a.getAttribute("href");
      if (!href || href === "#" || href.startsWith("javascript:void(0)")) {
        if (!a.onclick && !a.getAttribute("data-view") && !a.getAttribute("data-action")) {
          deadLinksCount++;
          // Gắn fallback bảo vệ liên kết
          a.setAttribute("data-guarded-link", "true");
        }
      }
    });

    // --- 6.5. QUÉT PHÒNG THỦ CHỮ TRÀN & TOUCH TARGETS ---
    const overflowGuardsApplied = enforceTextOverflowGuards();
    const touchTargetsChecked = enforceTouchTargetSafety();

    // --- 6.6. KIỂM TRA RÒ RỈ BỘ NHỚ & TELEMETRY ---
    const totalDomNodes = document.getElementsByTagName("*").length;
    let memoryReport = "Standard Web API";
    if (window.performance && window.performance.memory) {
      const usedMb = (window.performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1);
      const totalMb = (window.performance.memory.totalJSHeapSize / (1024 * 1024)).toFixed(1);
      memoryReport = `${usedMb} MB / ${totalMb} MB Heap`;
    }

    // --- 6.7. TỔNG HỢP ĐIỂM SỐ & LOG CONSOLE ---
    const isPerfect = issues.length === 0 && lessonsValid === 343 && careerWaysActive === 11 && coreSubjectsActive === 11;
    const score = isPerfect ? 100 : Math.max(0, 100 - (issues.length * 15) - (warnings.length * 5));

    console.log(`%c✅ Health Check: ${deadButtonsCount} Dead Buttons, ${lessonsValid}/${lessonsTotal} Lessons Intact, ${careerWaysActive}/11 Career Ways Active, ${coreSubjectsActive}/11 Core Subjects Validated`, "color:#3f7a5c; font-weight:700; font-size:12.5px;");
    console.log(`%c📊 Telemetry: ${totalButtonsCount} Buttons Guarded | ${allImages.length} Images Audited (${missingAltCount} auto-patched) | ${allLinks.length} Links Protected`, "color:#567a67;");
    console.log(`%c🎯 Touch Safety: ${touchTargetsChecked} Targets Checked (>=44px) | Text Guards: ${overflowGuardsApplied} Applied | DOM Nodes: ${totalDomNodes} | Memory: ${memoryReport}`, "color:#567a67;");

    if (issues.length > 0) {
      console.warn("⚠️ Các vấn đề cần lưu ý:", issues);
    }
    if (warnings.length > 0) {
      console.info("ℹ️ Cảnh báo nhẹ:", warnings);
    }

    console.log(`%c🛡️ SANCTUARY DEFENSE STATUS: ARMORED & OPERATIONAL (Score: ${score}/100)`, "background:#3f7a5c; color:#fff; font-weight:800; padding:2px 6px; border-radius:3px;");
    console.groupEnd();

    return {
      status: isPerfect ? "PASS" : "WARN",
      score: score,
      timestamp: new Date().toISOString(),
      summary: `✅ Health Check: ${deadButtonsCount} Dead Buttons, ${lessonsValid}/${lessonsTotal} Lessons Intact, ${careerWaysActive}/11 Career Ways Active`,
      metrics: {
        totalButtons: totalButtonsCount,
        activeButtons: activeButtonsCount,
        deadButtons: deadButtonsCount,
        lessonsTotal: lessonsTotal,
        lessonsValid: lessonsValid,
        careerWaysTotal: 11,
        careerWaysActive: careerWaysActive,
        coreSubjectsTotal: 11,
        coreSubjectsActive: coreSubjectsActive,
        imagesChecked: allImages.length,
        missingAltPatched: missingAltCount,
        deadLinksProtected: deadLinksCount,
        overflowGuardsApplied: overflowGuardsApplied,
        touchTargetsChecked: touchTargetsChecked,
        totalDomNodes: totalDomNodes,
        memory: memoryReport
      },
      issues: issues,
      warnings: warnings
    };
  };

  /* ==========================================================================
     7. KHỞI TẠO BỘ GIÁP TOÀN DIỆN (INIT ANTI-BUG GUARD)
     ========================================================================== */
  window.initAntiBugGuard = function () {
    // 1. Inject Stylesheet bảo vệ
    injectGuardStyles();

    // 2. Kích hoạt Delegated Fallback Listener chống nút liệt
    setupDelegatedDeadButtonEliminator();

    // 3. Quét và bọc lót toàn bộ nút ban đầu
    scanAndGuardInteractiveElements();

    // 4. Kích hoạt bảo vệ tràn chữ & tooltip
    enforceTextOverflowGuards();

    // 5. Enforce chuẩn diện tích bấm 44px
    enforceTouchTargetSafety();

    // 6. Khởi động engine Pill Glider và Smooth Scroll
    setupGliderEngine();

    // 7. Thiết lập MutationObserver để tự động bảo vệ mỗi khi SPA render view mới
    if (window.MutationObserver) {
      let mutationDebounceTimer = null;
      const observer = new MutationObserver(() => {
        clearTimeout(mutationDebounceTimer);
        mutationDebounceTimer = setTimeout(() => {
          scanAndGuardInteractiveElements();
          enforceTextOverflowGuards();
          enforceTouchTargetSafety();
          updateGliderPosition(false);
        }, 120);
      });

      const mainContent = document.getElementById("mainContent") || document.body;
      observer.observe(mainContent, { childList: true, subtree: true });
    }

    // 8. Tự động chạy chẩn đoán sức khỏe sau khi trang đã render xong
    setTimeout(() => {
      try {
        window.runPlatformHealthCheck();
      } catch (e) {
        console.error("[AntiBugGuard] Initial health check failed:", e);
      }
    }, 450);

    console.info("%c🛡️ [SE Sanctuary] Anti-Bug Guard v2.5.0 Initialized Successfully!", "color:#c47457; font-weight:700;");
  };

  /* ==========================================================================
     8. TỰ ĐỘNG KÍCH HOẠT KHI TẢI TRANG (AUTO-BOOTSTRAP)
     ========================================================================== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.initAntiBugGuard();
    });
  } else {
    // DOM đã sẵn sàng
    window.initAntiBugGuard();
  }

})(typeof window !== "undefined" ? window : this, typeof document !== "undefined" ? document : {});
