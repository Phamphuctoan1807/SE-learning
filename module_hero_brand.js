/**
 * ============================================================================
 * TOÀN PHẠM IT SANCTUARY — MODULE SIGNATURE BRAND HERO & MOTION ENGINE
 * File: module_hero_brand.js
 * Version: 3.0.0 (Ultra-Polish Production Release)
 * 
 * TÁC GIẢ & BẢN QUYỀN:
 * Sáng lập, Kiến trúc & Tuyển chọn bởi Toàn Phạm · UIT SE
 * Triết lý đào tạo chuẩn mực "mang2chieu.cpp" — Lý thuyết song hành thực thi.
 * 
 * TÍNH NĂNG ĐẶC TRƯNG:
 * 1. Personal Brand Identity: Logo Orb TP đa tầng hòa quyện cùng nhánh lá Sanctuary,
 *    dòng tiêu đề kiêu hãnh và huy hiệu tác quyền chuẩn mực.
 * 2. Typewriter Slogan Engine: Luân phiên 3 tuyên ngôn thực chiến mượt mà,
 *    tự động dừng đọc, xoá lùi, có pause-on-hover và tôn trọng reduced-motion.
 * 3. Interactive Dynamic Stat Grid: 4 Thẻ chỉ số chuẩn hóa (343 bài học, 11 hướng đi UIT,
 *    11 môn Core Base, 100% Playbook) tích hợp hiệu ứng Count-Up 60fps mượt mà.
 * 4. Quick Action Hub: 3 Nút hành động thần tốc (Studio Code, 11 Ngành, Tìm kiếm nhanh Ctrl+K)
 *    kèm micro-interactions xúc giác cao cấp.
 * 5. Organic Ambient Glow 60fps: Quầng sáng hữu cơ chuyển động chu kỳ 12s dịu mắt,
 *    tương thích hoàn hảo cả 4 bảng màu theme (skin, matcha, rose, espresso).
 * 
 * EXPORT API:
 * - window.renderToanPhamHeroHtml()
 * - window.initToanPhamHero(container)
 * - window.renderToanPhamHero(container)
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  /* ==========================================================================
     1. CẤU HÌNH DỮ LIỆU & HẰNG SỐ (HERO CONFIGURATION DATA)
     ========================================================================== */
  const HERO_CONFIG = {
    brand: {
      title: 'TOÀN PHẠM IT SANCTUARY',
      subtitle: 'Không Gian Luyện Kim Kỹ Sư Phần Mềm Thực Chiến · Đại Học Công Nghệ Thông Tin (UIT)',
      founderBadge: '🛡️ Sáng lập & Tuyển chọn bởi Toàn Phạm · UIT SE',
      tagline: 'Triết lý đào tạo chuẩn mực "mang2chieu.cpp" — Lý thuyết song hành thực thi.'
    },
    slogans: [
      'Mọi kiến thức đều được đúc kết thành 1 File Code chạy được ngay.',
      'Chuyển ngành không lãng phí 1 tín chỉ đại học với Zero-Overlap Engine.',
      'Làm chủ tư duy hệ thống từ RAM, Con trỏ đến Microservices & AI Agent.'
    ],
    stats: [
      {
        id: 'stat-lessons',
        targetValue: 343,
        unit: '',
        label: 'Bài Học Chuẩn Hóa',
        desc: '300 Core Base + 43 Supplemental UIT',
        icon: '📚',
        badge: 'Chuẩn hóa 100%',
        targetView: 'roadmap'
      },
      {
        id: 'stat-careers',
        targetValue: 11,
        unit: '',
        label: 'Hướng Đi Nghề Nghiệp UIT',
        desc: 'Từ Backend đến AI & Quantum Computing',
        icon: '🚀',
        badge: 'Lộ trình L₁ → L₄',
        targetView: 'career'
      },
      {
        id: 'stat-core',
        targetValue: 11,
        unit: '',
        label: 'Môn Core Base Dùng Chung',
        desc: 'Single Source of Truth · Không trùng lặp',
        icon: '💎',
        badge: 'Zero-Overlap',
        targetView: 'career'
      },
      {
        id: 'stat-playbook',
        targetValue: 100,
        unit: '%',
        label: 'Code Playbook Chạy Ngay',
        desc: 'Không lý thuyết suông · Tự kiểm chứng',
        icon: '⚡',
        badge: 'Zero Fluff',
        targetView: 'playbook'
      }
    ],
    actions: [
      {
        id: 'tp-hero-action-studio',
        text: 'Mở Studio Học & Code',
        icon: '⚡',
        badge: 'Chuẩn 4 Tầng Code',
        view: 'playbook',
        btnClass: 'tp-hero-btn-primary'
      },
      {
        id: 'tp-hero-action-career',
        text: 'Khám Phá 11 Hướng Đi UIT',
        icon: '🚀',
        badge: 'Zero-Overlap',
        view: 'career',
        btnClass: 'tp-hero-btn-secondary'
      },
      {
        id: 'tp-hero-action-search',
        text: 'Tìm Kiếm Nhanh',
        icon: '🔍',
        badge: 'Ctrl + K',
        isSearch: true,
        btnClass: 'tp-hero-btn-ghost'
      }
    ],
    typewriterSettings: {
      typeSpeed: 38,       // Tốc độ gõ mỗi ký tự (ms)
      deleteSpeed: 20,     // Tốc độ xoá lùi mỗi ký tự (ms)
      holdDelay: 2800,     // Thời gian dừng để người học đọc câu slogan (ms)
      nextDelay: 420       // Thời gian nghỉ trước khi gõ câu tiếp theo (ms)
    }
  };

  /* ==========================================================================
     2. TỰ ĐỘNG TIÊM CSS STYLES (SELF-INJECTING MOTION & THEME CSS)
     ========================================================================== */
  function injectHeroStyles() {
    if (document.getElementById('toanpham-hero-brand-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'toanpham-hero-brand-styles';
    styleEl.textContent = `
/* ============================================================================
   TOÀN PHẠM IT SANCTUARY — HERO BRAND STYLES & MOTION KEYFRAMES
   ============================================================================ */

/* 1. Theme-Aware Color Tokens cho Ambient Glow & Hero Elements */
:root, [data-theme="skin"] {
  --tp-glow-a: rgba(196, 116, 87, 0.24);
  --tp-glow-b: rgba(86, 122, 103, 0.18);
  --tp-glow-c: rgba(224, 150, 112, 0.14);
  --tp-card-bg: rgba(255, 252, 248, 0.82);
  --tp-card-border: rgba(138, 105, 86, 0.16);
  --tp-card-hover-border: rgba(196, 116, 87, 0.42);
  --tp-orb-grad-1: #c47457;
  --tp-orb-grad-2: #567a67;
  --tp-orb-leaf: #3f7a5c;
  --tp-kbd-bg: #efe2d3;
  --tp-kbd-border: rgba(138, 105, 86, 0.28);
}

[data-theme="matcha"] {
  --tp-glow-a: rgba(77, 124, 96, 0.26);
  --tp-glow-b: rgba(181, 124, 86, 0.18);
  --tp-glow-c: rgba(108, 158, 125, 0.15);
  --tp-card-bg: rgba(255, 255, 253, 0.85);
  --tp-card-border: rgba(78, 107, 88, 0.18);
  --tp-card-hover-border: rgba(77, 124, 96, 0.45);
  --tp-orb-grad-1: #4d7c60;
  --tp-orb-grad-2: #b57c56;
  --tp-orb-leaf: #3e684f;
  --tp-kbd-bg: #dfe7d9;
  --tp-kbd-border: rgba(78, 107, 88, 0.3);
}

[data-theme="rose"] {
  --tp-glow-a: rgba(184, 101, 113, 0.24);
  --tp-glow-b: rgba(108, 125, 103, 0.18);
  --tp-glow-c: rgba(214, 138, 149, 0.14);
  --tp-card-bg: rgba(255, 253, 252, 0.85);
  --tp-card-border: rgba(156, 104, 112, 0.18);
  --tp-card-hover-border: rgba(184, 101, 113, 0.45);
  --tp-orb-grad-1: #b86571;
  --tp-orb-grad-2: #6c7d67;
  --tp-orb-leaf: #52664d;
  --tp-kbd-bg: #eedbd8;
  --tp-kbd-border: rgba(156, 104, 112, 0.3);
}

[data-theme="espresso"] {
  --tp-glow-a: rgba(223, 146, 118, 0.28);
  --tp-glow-b: rgba(111, 194, 150, 0.22);
  --tp-glow-c: rgba(239, 181, 103, 0.16);
  --tp-card-bg: rgba(36, 30, 27, 0.86);
  --tp-card-border: rgba(224, 185, 160, 0.16);
  --tp-card-hover-border: rgba(223, 146, 118, 0.48);
  --tp-orb-grad-1: #df9276;
  --tp-orb-grad-2: #83ad95;
  --tp-orb-leaf: #6fc296;
  --tp-kbd-bg: #2e2622;
  --tp-kbd-border: rgba(224, 185, 160, 0.25);
}

/* 2. Container Khung Vỏ Hero Tổng Thể */
.tp-hero-container {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg, 24px);
  background: var(--bg-surface, rgba(255, 252, 248, 0.88));
  border: 1px solid var(--border-subtle, rgba(138, 105, 86, 0.13));
  box-shadow: var(--shadow-soft, 0 14px 38px -12px rgba(78, 52, 36, 0.08));
  padding: 38px 42px 34px;
  margin-bottom: 28px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 3. Lớp Quầng Sáng Hữu Cơ Ambient Glow Chuyển Động 12s Chu Kì */
.tp-hero-ambient-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  border-radius: inherit;
}

.tp-ambient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  opacity: 0.85;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
}

.tp-ambient-blob-1 {
  width: 380px;
  height: 380px;
  top: -120px;
  left: -80px;
  background: radial-gradient(circle, var(--tp-glow-a) 0%, transparent 70%);
  animation: tpAmbientDriftOne 12s ease-in-out infinite alternate;
}

.tp-ambient-blob-2 {
  width: 440px;
  height: 440px;
  bottom: -160px;
  right: -100px;
  background: radial-gradient(circle, var(--tp-glow-b) 0%, transparent 70%);
  animation: tpAmbientDriftTwo 15s ease-in-out infinite alternate;
}

.tp-ambient-blob-3 {
  width: 280px;
  height: 280px;
  top: 40%;
  left: 35%;
  background: radial-gradient(circle, var(--tp-glow-c) 0%, transparent 75%);
  animation: tpAmbientDriftThree 18s ease-in-out infinite alternate;
}

@keyframes tpAmbientDriftOne {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(45px, 30px, 0) scale(1.08); }
  100% { transform: translate3d(20px, 60px, 0) scale(0.96); }
}

@keyframes tpAmbientDriftTwo {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-50px, -35px, 0) scale(1.12); }
  100% { transform: translate3d(-25px, -65px, 0) scale(0.94); }
}

@keyframes tpAmbientDriftThree {
  0% { transform: translate3d(0, 0, 0) scale(0.9); opacity: 0.6; }
  50% { transform: translate3d(-30px, 25px, 0) scale(1.1); opacity: 0.9; }
  100% { transform: translate3d(35px, -20px, 0) scale(1.0); opacity: 0.7; }
}

/* 4. Nội Dung Chính Hero Căn Giữa Sắc Sảo */
.tp-hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* 5. Header Brand & Huy Hiệu Tác Quyền */
.tp-hero-brand-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

/* 5.1. Logo Orb Toàn Phạm IT Sanctuary */
.tp-brand-orb-wrapper {
  position: relative;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tp-brand-orb-aura {
  position: absolute;
  inset: -6px;
  border-radius: 26px;
  background: linear-gradient(135deg, var(--tp-orb-grad-1), var(--tp-orb-grad-2));
  opacity: 0.35;
  filter: blur(12px);
  animation: tpOrbAuraPulse 4s ease-in-out infinite alternate;
  pointer-events: none;
}

.tp-brand-orb-disk {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 22px;
  background: linear-gradient(145deg, var(--bg-surface), var(--bg-elevated));
  border: 1.5px solid var(--tp-card-hover-border);
  box-shadow: 0 10px 24px -6px var(--tp-glow-a), inset 0 1px 2px rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.36s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.36s ease;
  cursor: pointer;
}

.tp-brand-orb-disk:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 14px 30px -4px var(--tp-glow-a), 0 0 18px var(--tp-glow-b);
}

.tp-brand-orb-svg {
  width: 48px;
  height: 48px;
  display: block;
}

@keyframes tpOrbAuraPulse {
  0% { transform: scale(0.94); opacity: 0.28; }
  100% { transform: scale(1.08); opacity: 0.52; }
}

/* 5.2. Nhãn & Tiêu Đề */
.tp-hero-brand-meta {
  flex: 1;
  min-width: 0;
}

.tp-hero-badge-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.tp-founder-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--accent-primary-bg, rgba(196, 116, 87, 0.12));
  color: var(--accent-primary, #c47457);
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.01em;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.tp-philosophy-tagline {
  font-size: 12.5px;
  color: var(--text-muted);
  font-style: italic;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.tp-philosophy-tagline code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-style: normal;
  font-size: 11.5px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--bg-elevated);
  color: var(--accent-primary);
  border: 1px solid var(--border-subtle);
}

.tp-hero-title {
  margin: 0 0 6px 0;
  font-size: 32px;
  font-weight: 850;
  letter-spacing: -0.028em;
  line-height: 1.22;
  color: var(--text-primary);
  text-rendering: optimizeLegibility;
}

.tp-hero-title-accent {
  background: linear-gradient(120deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.tp-hero-subtitle {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 6. Typewriter Slogan Bar Dịu Mắt & Nhấp Nháy Êm */
.tp-slogan-capsule {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  border-radius: 14px;
  background: var(--tp-card-bg);
  border: 1px solid var(--tp-card-border);
  box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.03);
  min-height: 48px;
  box-sizing: border-box;
  transition: border-color 0.25s ease, background 0.25s ease;
  user-select: none;
}

.tp-slogan-capsule:hover {
  border-color: var(--tp-card-hover-border);
}

.tp-slogan-icon {
  font-size: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
}

.tp-slogan-prefix {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--accent-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  flex-shrink: 0;
}

.tp-slogan-body {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 600;
  line-height: 1.45;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.tp-typewriter-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}

.tp-typewriter-cursor {
  display: inline-block;
  margin-left: 2px;
  width: 2px;
  height: 16px;
  background-color: var(--accent-primary);
  vertical-align: middle;
  border-radius: 1px;
  animation: tpCursorPulse 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes tpCursorPulse {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0; transform: scaleY(0.7); }
}

/* 7. Cụm Nút Hành Động Thần Tốc (Quick Action Hub) */
.tp-hero-action-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.tp-hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
  user-select: none;
  outline: none;
}

.tp-hero-btn:focus-visible {
  box-shadow: var(--focus-ring, 0 0 0 3px rgba(196, 116, 87, 0.35));
}

.tp-hero-btn-primary {
  background: var(--accent-primary);
  color: var(--accent-primary-fg, #ffffff);
  box-shadow: var(--shadow-pill, 0 4px 14px rgba(196, 116, 87, 0.25));
}

.tp-hero-btn-primary:hover {
  background: var(--accent-primary-hover, #b06246);
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(196, 116, 87, 0.35);
}

.tp-hero-btn-secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border-color: var(--border-subtle);
}

.tp-hero-btn-secondary:hover {
  background: var(--bg-subtle);
  border-color: var(--accent-secondary);
  color: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

.tp-hero-btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border-color: var(--border-subtle);
}

.tp-hero-btn-ghost:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.tp-btn-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 5px;
  background: var(--tp-kbd-bg);
  border: 1px solid var(--tp-kbd-border);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  color: var(--text-muted);
  line-height: 1;
}

.tp-btn-badge {
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  line-height: 1;
}

/* 8. Dải Thống Kê Thời Gian Thực 4 Thẻ (Dynamic Stat Grid) */
.tp-hero-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 4px;
}

.tp-stat-card {
  position: relative;
  background: var(--tp-card-bg);
  border: 1px solid var(--tp-card-border);
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 4px 14px -4px rgba(0, 0, 0, 0.04);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), 
              border-color 0.28s ease, 
              box-shadow 0.28s ease;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tp-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  opacity: 0;
  transition: opacity 0.28s ease;
}

.tp-stat-card:hover {
  transform: translateY(-3px);
  border-color: var(--tp-card-hover-border);
  box-shadow: 0 12px 28px -8px var(--tp-glow-a);
}

.tp-stat-card:hover::before {
  opacity: 1;
}

.tp-stat-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.tp-stat-icon {
  font-size: 18px;
  line-height: 1;
}

.tp-stat-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  background: var(--accent-primary-bg);
  color: var(--accent-primary);
  border: 1px solid var(--border-subtle);
  line-height: 1.2;
}

.tp-stat-number-wrap {
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin-bottom: 4px;
}

.tp-stat-number {
  font-size: 27px;
  font-weight: 850;
  color: var(--text-primary);
  line-height: 1.1;
  font-feature-settings: "tnum" 1;
  letter-spacing: -0.02em;
}

.tp-stat-unit {
  font-size: 18px;
  font-weight: 800;
  color: var(--accent-primary);
}

.tp-stat-label {
  font-size: 13px;
  font-weight: 750;
  color: var(--text-primary);
  margin-bottom: 2px;
  line-height: 1.3;
}

.tp-stat-desc {
  font-size: 11.5px;
  color: var(--text-muted);
  line-height: 1.35;
}

/* ============================================================================
   RESPONSIVE DESIGN BREAKPOINTS
   ============================================================================ */
@media (max-width: 1024px) {
  .tp-hero-container {
    padding: 28px 24px 26px;
  }
  .tp-hero-stat-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .tp-hero-title {
    font-size: 26px;
  }
}

@media (max-width: 640px) {
  .tp-hero-container {
    padding: 20px 16px 20px;
    border-radius: var(--radius-md, 16px);
    margin-bottom: 20px;
  }
  .tp-hero-brand-row {
    gap: 16px;
  }
  .tp-brand-orb-wrapper {
    width: 56px;
    height: 56px;
  }
  .tp-brand-orb-disk {
    width: 56px;
    height: 56px;
    border-radius: 16px;
  }
  .tp-brand-orb-svg {
    width: 36px;
    height: 36px;
  }
  .tp-hero-title {
    font-size: 21px;
  }
  .tp-hero-subtitle {
    font-size: 13.5px;
  }
  .tp-slogan-capsule {
    padding: 8px 12px;
    min-height: 42px;
  }
  .tp-slogan-prefix {
    display: none; /* Rút gọn trên mobile */
  }
  .tp-slogan-body {
    font-size: 13px;
  }
  .tp-hero-action-row {
    flex-direction: column;
    align-items: stretch;
  }
  .tp-hero-btn {
    width: 100%;
    justify-content: center;
  }
  .tp-hero-stat-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

/* ============================================================================
   TÔN TRỌNG PREFERS-REDUCED-MOTION (ACCESSIBILITY FIRST)
   ============================================================================ */
@media (prefers-reduced-motion: reduce) {
  .tp-ambient-blob,
  .tp-brand-orb-aura,
  .tp-typewriter-cursor {
    animation: none !important;
  }
  .tp-ambient-blob {
    opacity: 0.5 !important;
  }
  .tp-stat-card,
  .tp-hero-btn,
  .tp-brand-orb-disk {
    transition: none !important;
  }
  .tp-stat-card:hover,
  .tp-hero-btn:hover,
  .tp-brand-orb-disk:hover {
    transform: none !important;
  }
}
`;
    document.head.appendChild(styleEl);
  }

  /* ==========================================================================
     3. RENDER SVG LOGO ORB (KÝ HIỆU TP & NHÁNH LÁ SANCTUARY)
     ========================================================================== */
  function renderBrandOrbSvg() {
    return `
      <svg class="tp-brand-orb-svg" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="tpLogoGrad1" x1="8" y1="8" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="var(--accent-primary, #c47457)" />
            <stop offset="100%" stop-color="var(--accent-secondary, #567a67)" />
          </linearGradient>
          <linearGradient id="tpLeafGrad" x1="16" y1="46" x2="52" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="var(--tp-orb-leaf, #3f7a5c)" />
            <stop offset="100%" stop-color="var(--accent-secondary, #567a67)" />
          </linearGradient>
          <filter id="tpGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="var(--tp-glow-a)" flood-opacity="0.35"/>
          </filter>
        </defs>

        <!-- Vòng hào quang quỹ đạo sáng vi mô -->
        <circle cx="34" cy="34" r="30" stroke="url(#tpLogoGrad1)" stroke-width="1.2" stroke-dasharray="4 6" opacity="0.45" />

        <!-- Ký hiệu Monogram 'T' & 'P' Cách Điệu Sắc Nét -->
        <!-- Chữ T: Nét ngang trên đỉnh & nét dọc vững chãi -->
        <path d="M16 20 H42" stroke="url(#tpLogoGrad1)" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M28 20 V46" stroke="url(#tpLogoGrad1)" stroke-width="4.2" stroke-linecap="round" />

        <!-- Chữ P: Vòng parabol lồng khép tinh tế ôm lấy trục T -->
        <path d="M28 20 H40 C46.5 20 51 24 51 29.5 C51 35 46.5 39 40 39 H28" 
              stroke="url(#tpLogoGrad1)" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Nhánh lá Sanctuary (Botanical Laurel & Sprout) biểu tượng tri thức & bền vững -->
        <!-- Cành uốn lượn mềm mại dưới chân chữ P và vươn lên phía trên -->
        <path d="M22 48 C28 50 38 48 45 40 C49 35 52 28 53 23" 
              stroke="url(#tpLeafGrad)" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.9" />

        <!-- Chiếc lá 1: Gốc cành -->
        <path d="M23 48 C21 44 23 41 27 43 C29 45 27 49 23 48 Z" 
              fill="url(#tpLeafGrad)" opacity="0.95" />

        <!-- Chiếc lá 2: Giữa cành hướng lên -->
        <path d="M33 47 C34 43 38 42 40 45 C39 48 35 49 33 47 Z" 
              fill="url(#tpLeafGrad)" opacity="0.95" />

        <!-- Chiếc lá 3: Vòm chữ P -->
        <path d="M43 43 C46 40 50 41 49 45 C46 46 43 45 43 43 Z" 
              fill="url(#tpLeafGrad)" opacity="0.95" />

        <!-- Chiếc lá 4: Đỉnh chồi Sanctuary -->
        <path d="M51 32 C54 29 57 31 56 34 C53 36 51 34 51 32 Z" 
              fill="url(#tpLeafGrad)" opacity="0.95" />

        <!-- Tâm sáng điểm xuyết hạt ngọc tri thức -->
        <circle cx="28" cy="20" r="2.2" fill="#ffffff" opacity="0.85" filter="url(#tpGlowFilter)" />
        <circle cx="53" cy="23" r="1.6" fill="var(--accent-primary)" opacity="0.9" />
      </svg>
    `;
  }

  /* ==========================================================================
     4. RENDER HTML TOÀN DIỆN (HERO MARKUP GENERATOR)
     ========================================================================== */
  function renderToanPhamHeroHtml() {
    // Đảm bảo CSS đã được tiêm vào DOM
    injectHeroStyles();

    const { brand, stats, actions } = HERO_CONFIG;

    // 4.1. Tạo markup cho 4 Thẻ Thống Kê
    const statsHtml = stats.map(stat => `
      <div class="tp-stat-card" data-stat-id="${stat.id}" data-target-view="${stat.targetView}" role="button" tabindex="0" title="Nhấp để khám phá ${stat.label}">
        <div class="tp-stat-top-row">
          <span class="tp-stat-icon" aria-hidden="true">${stat.icon}</span>
          <span class="tp-stat-badge">${stat.badge}</span>
        </div>
        <div class="tp-stat-number-wrap">
          <span class="tp-stat-number" data-count-to="${stat.targetValue}">0</span>
          ${stat.unit ? `<span class="tp-stat-unit">${stat.unit}</span>` : ''}
        </div>
        <div class="tp-stat-label">${stat.label}</div>
        <div class="tp-stat-desc">${stat.desc}</div>
      </div>
    `).join('');

    // 4.2. Tạo markup cho Cụm Nút Hành Động
    const actionsHtml = actions.map(act => {
      let extraBadge = '';
      if (act.isSearch) {
        extraBadge = `<kbd class="tp-btn-kbd">${act.badge}</kbd>`;
      } else if (act.badge) {
        extraBadge = `<span class="tp-btn-badge">${act.badge}</span>`;
      }

      return `
        <button type="button" 
                class="tp-hero-btn ${act.btnClass}" 
                id="${act.id}"
                data-target-view="${act.view || ''}"
                data-is-search="${act.isSearch ? 'true' : 'false'}"
                aria-label="${act.text}">
          <span aria-hidden="true">${act.icon}</span>
          <span>${act.text}</span>
          ${extraBadge}
        </button>
      `;
    }).join('');

    // 4.3. Khung HTML Hoàn chỉnh
    return `
      <section class="tp-hero-container" id="toanpham-hero-brand-section" aria-label="${brand.title}">
        <!-- Lớp Quầng Sáng Ambient Glow Chuyển Động Chậm 12s Chu Kì -->
        <div class="tp-hero-ambient-layer" aria-hidden="true">
          <div class="tp-ambient-blob tp-ambient-blob-1"></div>
          <div class="tp-ambient-blob tp-ambient-blob-2"></div>
          <div class="tp-ambient-blob tp-ambient-blob-3"></div>
        </div>

        <div class="tp-hero-content">
          <!-- Hàng 1: Dấu Ấn Thương Hiệu & Logo Orb TP -->
          <div class="tp-hero-brand-row">
            <div class="tp-brand-orb-wrapper" title="${brand.title} — Luyện Kim Kỹ Sư Phần Mềm">
              <div class="tp-brand-orb-aura" aria-hidden="true"></div>
              <div class="tp-brand-orb-disk" role="img" aria-label="Logo Toàn Phạm IT Sanctuary">
                ${renderBrandOrbSvg()}
              </div>
            </div>

            <div class="tp-hero-brand-meta">
              <div class="tp-hero-badge-row">
                <span class="tp-founder-badge">${brand.founderBadge}</span>
                <span class="tp-philosophy-tagline">
                  ${brand.tagline}
                </span>
              </div>
              <h1 class="tp-hero-title">
                <span class="tp-hero-title-accent">${brand.title}</span>
              </h1>
              <p class="tp-hero-subtitle">${brand.subtitle}</p>
            </div>
          </div>

          <!-- Hàng 2: Hộp Slogan Chạy Chữ Mượt Mà (Typewriter Capsule) -->
          <div class="tp-slogan-capsule" id="tp-hero-slogan-capsule" role="region" aria-live="polite" aria-label="Tuyên ngôn đào tạo thực chiến">
            <span class="tp-slogan-icon" aria-hidden="true">💬</span>
            <span class="tp-slogan-prefix">Tuyên ngôn thực chiến:</span>
            <div class="tp-slogan-body">
              <span class="tp-typewriter-text" id="tp-hero-typewriter-target">Mọi kiến thức đều được đúc kết thành 1 File Code chạy được ngay.</span>
              <span class="tp-typewriter-cursor" aria-hidden="true"></span>
            </div>
          </div>

          <!-- Hàng 3: Cụm Nút Hành Động Thần Tốc (Quick Action Hub) -->
          <div class="tp-hero-action-row" role="group" aria-label="Hành động nhanh">
            ${actionsHtml}
          </div>

          <!-- Hàng 4: Dải Thống Kê Động 4 Thẻ (Interactive Dynamic Stat Grid) -->
          <div class="tp-hero-stat-grid" role="region" aria-label="Thống kê hệ thống chuẩn hóa">
            ${statsHtml}
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     5. CƠ CHẾ ANIMATION TYPEWRITER (TYPEWRITER CONTROLLER)
     ========================================================================== */
  class TypewriterEngine {
    constructor(targetEl, slogans, settings) {
      this.targetEl = targetEl;
      this.slogans = slogans;
      this.settings = Object.assign({}, HERO_CONFIG.typewriterSettings, settings);
      this.sloganIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.isPaused = false;
      this.timerId = null;
      this.isDestroyed = false;

      // Kiểm tra prefers-reduced-motion
      this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    start() {
      if (this.prefersReduced) {
        // Nếu người dùng bật giảm chuyển động, hiển thị câu đầu tiên tĩnh
        if (this.targetEl) this.targetEl.textContent = this.slogans[0];
        return;
      }
      this.tick();
    }

    pause() {
      this.isPaused = true;
    }

    resume() {
      if (this.isPaused) {
        this.isPaused = false;
        this.tick();
      }
    }

    destroy() {
      this.isDestroyed = true;
      if (this.timerId) clearTimeout(this.timerId);
    }

    tick() {
      if (this.isDestroyed || this.isPaused) return;

      const currentSlogan = this.slogans[this.sloganIndex];

      if (!this.isDeleting) {
        // Trạng thái đang gõ
        this.charIndex++;
        this.targetEl.textContent = currentSlogan.substring(0, this.charIndex);

        if (this.charIndex >= currentSlogan.length) {
          // Gõ xong câu, chuyển sang trạng thái dừng đọc
          this.isDeleting = true;
          this.timerId = setTimeout(() => this.tick(), this.settings.holdDelay);
          return;
        }

        // Độ trễ gõ ngẫu nhiên nhẹ nhàng (human-like typing variation)
        const variance = Math.floor(Math.random() * 15) - 7;
        const delay = Math.max(18, this.settings.typeSpeed + variance);
        this.timerId = setTimeout(() => this.tick(), delay);
      } else {
        // Trạng thái đang xoá lùi
        this.charIndex--;
        this.targetEl.textContent = currentSlogan.substring(0, this.charIndex);

        if (this.charIndex <= 0) {
          // Xoá xong câu, chuyển sang câu kế tiếp
          this.isDeleting = false;
          this.sloganIndex = (this.sloganIndex + 1) % this.slogans.length;
          this.timerId = setTimeout(() => this.tick(), this.settings.nextDelay);
          return;
        }

        this.timerId = setTimeout(() => this.tick(), this.settings.deleteSpeed);
      }
    }
  }

  /* ==========================================================================
     6. CƠ CHẾ ANIMATION COUNT-UP ĐỘNG (DYNAMIC STATS COUNT-UP)
     ========================================================================== */
  function animateCountUp(numberEl, targetValue, duration = 1800) {
    if (!numberEl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      numberEl.textContent = targetValue.toLocaleString('vi-VN');
      return;
    }

    const startTime = performance.now();
    const startValue = 0;

    // Easing Out Quartic mượt mà dịu mắt
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);

      numberEl.textContent = currentValue.toLocaleString('vi-VN');

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        numberEl.textContent = targetValue.toLocaleString('vi-VN');
      }
    }

    requestAnimationFrame(frame);
  }

  /* ==========================================================================
     7. KHỞI TẠO TƯƠNG TÁC (INIT HERO CONTROLLER)
     ========================================================================== */
  function initToanPhamHero(container) {
    const root = container || document.getElementById('toanpham-hero-brand-section') || document;

    // 7.1. Khởi tạo Typewriter Slogan Engine
    const typewriterTarget = root.querySelector('#tp-hero-typewriter-target');
    const sloganCapsule = root.querySelector('#tp-hero-slogan-capsule');

    let typewriterInstance = null;
    if (typewriterTarget) {
      typewriterInstance = new TypewriterEngine(typewriterTarget, HERO_CONFIG.slogans);
      typewriterInstance.start();

      // Pause khi hover để người học có thể đọc chậm rãi
      if (sloganCapsule) {
        sloganCapsule.addEventListener('mouseenter', () => typewriterInstance.pause());
        sloganCapsule.addEventListener('mouseleave', () => typewriterInstance.resume());
      }
    }

    // 7.2. Khởi tạo Count-Up Animation với IntersectionObserver
    const statCards = root.querySelectorAll('.tp-stat-card');
    let hasAnimatedStats = false;

    function triggerStatsAnimation() {
      if (hasAnimatedStats) return;
      hasAnimatedStats = true;

      statCards.forEach((card, idx) => {
        const numEl = card.querySelector('.tp-stat-number');
        if (!numEl) return;
        const targetVal = parseInt(numEl.getAttribute('data-count-to') || '0', 10);
        // Trì hoãn nhẹ giữa các thẻ (staggered delay)
        setTimeout(() => {
          animateCountUp(numEl, targetVal, 1600 + idx * 150);
        }, idx * 100);
      });
    }

    if ('IntersectionObserver' in window && statCards.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerStatsAnimation();
            observer.disconnect();
          }
        });
      }, { threshold: 0.25 });

      const statGrid = root.querySelector('.tp-hero-stat-grid');
      if (statGrid) observer.observe(statGrid);
      else triggerStatsAnimation();
    } else {
      triggerStatsAnimation();
    }

    // 7.3. Điều hướng chuyển Tab trong SPA (Tab Switching Helper)
    function navigateToView(viewName) {
      if (!viewName) return;

      // 1. Thử kích hoạt nút tab tương ứng trong thanh tab chính
      const targetTabBtn = document.querySelector(`.tab-pill-btn[data-view="${viewName}"]`);
      if (targetTabBtn) {
        targetTabBtn.click();
        return;
      }

      // 2. Thử gọi hàm switchView hoặc render main view nếu có sẵn trên window/state
      if (typeof window.switchMainView === 'function') {
        window.switchMainView(viewName);
        return;
      }

      // 3. Dispatch Custom Event để ứng dụng SPA bắt sự kiện
      const navEvent = new CustomEvent('sanctuary:navigate', {
        detail: { view: viewName },
        bubbles: true
      });
      document.dispatchEvent(navEvent);
    }

    // 7.4. Kích hoạt Tìm Kiếm Nhanh (Search Activation Helper)
    function activateSearch() {
      // 1. Tìm input tìm kiếm trên thanh điều hướng hoặc modal
      const searchInputs = [
        document.querySelector('.nav-search-box input'),
        document.querySelector('.search-input'),
        document.querySelector('.cm-search-input'),
        document.querySelector('#globalSearchInput'),
        document.querySelector('input[type="search"]')
      ];

      for (const input of searchInputs) {
        if (input && input.offsetParent !== null) { // Kiểm tra input đang hiển thị
          input.focus();
          if (typeof input.select === 'function') input.select();
          
          // Hiệu ứng nhấp nháy làm nổi bật ô tìm kiếm
          input.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
          input.style.borderColor = 'var(--accent-primary)';
          input.style.boxShadow = 'var(--focus-ring, 0 0 0 3px rgba(196, 116, 87, 0.35))';
          setTimeout(() => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
          }, 1200);
          return;
        }
      }

      // 2. Dispatch phím tắt Ctrl+K hoặc custom search event
      const searchEvent = new CustomEvent('sanctuary:search', {
        detail: { action: 'open' },
        bubbles: true
      });
      document.dispatchEvent(searchEvent);
    }

    // 7.5. Lắng nghe click các nút hành động (Action Buttons)
    const actionBtns = root.querySelectorAll('.tp-hero-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isSearch = btn.getAttribute('data-is-search') === 'true';
        const targetView = btn.getAttribute('data-target-view');

        if (isSearch) {
          activateSearch();
        } else if (targetView) {
          navigateToView(targetView);
        }
      });
    });

    // 7.6. Lắng nghe click trên các Card Thống Kê
    statCards.forEach(card => {
      const handleCardNav = () => {
        const view = card.getAttribute('data-target-view');
        if (view) navigateToView(view);
      };

      card.addEventListener('click', handleCardNav);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardNav();
        }
      });
    });

    // 7.7. Bắt phím tắt toàn cục Ctrl + K / Cmd + K
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        // Chỉ kích hoạt nếu không đang gõ trong một input/textarea khác
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          activateSearch();
        }
      }
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyDown);

    // 7.8. Micro-interaction: Click vào Brand Orb để scroll mượt hoặc reset nhẹ
    const brandOrb = root.querySelector('.tp-brand-orb-disk');
    if (brandOrb) {
      brandOrb.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    return {
      typewriter: typewriterInstance,
      triggerStats: triggerStatsAnimation,
      destroy: () => {
        if (typewriterInstance) typewriterInstance.destroy();
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }

  /* ==========================================================================
     8. UNIVERSAL MOUNT HELPER (RENDER TO CONTAINER & INITIALIZE)
     ========================================================================== */
  function renderToanPhamHero(containerTarget) {
    let containerEl = null;

    if (typeof containerTarget === 'string') {
      containerEl = document.querySelector(containerTarget);
    } else if (containerTarget instanceof HTMLElement) {
      containerEl = containerTarget;
    }

    if (!containerEl) {
      console.warn('[Toàn Phạm IT Sanctuary Hero] Không tìm thấy phần tử mục tiêu:', containerTarget);
      return null;
    }

    // Render HTML và gắn vào container
    containerEl.innerHTML = renderToanPhamHeroHtml();

    // Khởi tạo animation & event listeners
    return initToanPhamHero(containerEl);
  }

  /* ==========================================================================
     9. AUTO-UPGRADE DISCOVERY (TỰ ĐỘNG NÂNG CẤP HERO KHI CÓ TRONG DOM)
     ========================================================================== */
  function autoMountIfFound() {
    // Tìm container chuyên dụng nếu trang đã chuẩn bị sẵn
    const explicitContainer = document.getElementById('toanpham-hero-container');
    if (explicitContainer) {
      renderToanPhamHero(explicitContainer);
      return;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMountIfFound);
  } else {
    // DOM đã sẵn sàng
    setTimeout(autoMountIfFound, 10);
  }

  /* ==========================================================================
     10. EXPORT API RA GLOBAL WINDOW SCOPE
     ========================================================================== */
  window.ToanPhamHeroBrand = {
    version: '3.0.0',
    config: HERO_CONFIG,
    renderHtml: renderToanPhamHeroHtml,
    init: initToanPhamHero,
    render: renderToanPhamHero
  };

  // Các hàm export chuẩn mực theo yêu cầu
  window.renderToanPhamHeroHtml = renderToanPhamHeroHtml;
  window.initToanPhamHero = initToanPhamHero;
  window.renderToanPhamHero = renderToanPhamHero;

})(window, document);
