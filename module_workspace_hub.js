/**
 * ============================================================================
 * TOÀN PHẠM IT SANCTUARY — MODULE WORKSPACE HUB & OMNI COMMAND PALETTE
 * File: module_workspace_hub.js
 * Version: 4.0.0 (Core Workspace Hub Architecture)
 * 
 * TÁC GIẢ & BẢN QUYỀN:
 * Kiến trúc & Xây dựng bởi Toàn Phạm · UIT SE
 * 
 * MỤC TIÊU CỐT LÕI:
 * 1. Tái cấu trúc 11 Tab dàn trải thành 4 Core Workspace Hubs chuyên sâu:
 *    - Hub 1: [⚡ STUDIO HỌC & CODE]: Trình đọc lý thuyết (Reader) + Code Playbook Studio 3 cột + Terminal + Memory Visualizer.
 *    - Hub 2: [🧭 LỘ TRÌNH 11 NGÀNH]: Lộ trình 343 bài học UIT + 11 Hướng đi nghề nghiệp + Bộ tính điểm giao chuyển ngành resolveCareerBridge.
 *    - Hub 3: [🧪 PHÒNG LUYỆN LAB]: English Lab 25 ENQ + Củng cố lỗi Remediation + Buổi học Pomodoro.
 *    - Hub 4: [📊 HỒ SƠ & TÍN CHỈ UIT]: GPA Tín chỉ UIT + Dự án / Semester Gates + Kiểm định chất lượng Audit.
 * 
 * 2. Omni Command Palette (Ctrl + K / Cmd + K):
 *    - Spotlight search tức thời, animation mượt mà 60fps.
 *    - Tìm kiếm thông minh mờ (Fuzzy Search) trên toàn bộ 343 bài học, 11 Hướng đi UIT,
 *      Code Playbooks (mang2chieu.cpp, oop_ke_thua_da_hinh.cpp,...), các môn học UIT (IT001, IT002, IT003, MA006,...).
 *    - Click / Enter là nhảy ngay đến đúng Hub và kích hoạt bài học/tính năng ngay lập tức.
 * 
 * 3. Quản lý Sub-tabs (Segmented Controls) mượt mà, phản hồi hai chiều với ứng dụng.
 * 
 * EXPORTS:
 * - window.initWorkspaceHubs()
 * - window.switchWorkspaceHub(hubId, subTabId)
 * - window.toggleCommandPalette()
 * - window.openCommandPalette()
 * - window.closeCommandPalette()
 * - window.getCurrentWorkspaceHub()
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  /* ==========================================================================
     1. CẤU TRÚC DỮ LIỆU 4 CORE WORKSPACE HUBS (SINGLE SOURCE OF TRUTH)
     ========================================================================== */
  const WORKSPACE_HUBS = [
    {
      id: 'studio',
      title: 'STUDIO HỌC & CODE',
      shortTitle: 'Studio Code',
      icon: '⚡',
      badge: 'Live / C++17',
      badgeClass: 'hub-badge-accent',
      description: 'Lý thuyết song hành thực thi 4 tầng, Terminal tương tác & Memory Visualizer',
      defaultSubTab: 'reader',
      subTabs: [
        {
          id: 'reader',
          label: 'Đọc Bài & Lý Thuyết',
          icon: '📖',
          badge: 'CPP-001',
          badgeId: 'navCurrentLessonBadge',
          viewTarget: 'reader',
          description: 'Trình đọc bài học lý thuyết chi tiết theo lộ trình'
        },
        {
          id: 'playbook',
          label: 'Code Playbook Studio',
          icon: '⚡',
          badge: 'Studio 3 Cột',
          badgeClass: 'tab-count-highlight',
          viewTarget: 'playbook',
          description: 'Môi trường code 1 file chuẩn mang2chieu.cpp, Terminal & Heap Visualizer'
        }
      ]
    },
    {
      id: 'roadmap_hub',
      title: 'LỘ TRÌNH 11 NGÀNH',
      shortTitle: 'Lộ Trình 11 Ngành',
      icon: '🧭',
      badge: '343 Bài · 11 Ngành',
      badgeClass: 'hub-badge-info',
      description: 'Chuẩn 343 bài học UIT & Bản đồ 11 Hướng đi chuyển ngành Zero-Overlap',
      defaultSubTab: 'roadmap',
      subTabs: [
        {
          id: 'roadmap',
          label: 'Lộ Trình 343 Bài',
          icon: '🗺️',
          badge: '343 Bài',
          badgeId: 'navRoadmapBadge',
          viewTarget: 'roadmap',
          description: 'Toàn bộ 343 bài học kỹ sư phần mềm UIT'
        },
        {
          id: 'career',
          label: '11 Hướng Đi & Điểm Giao',
          icon: '🚀',
          badge: 'Zero-Overlap',
          viewTarget: 'career',
          description: '11 Hướng đi nghề nghiệp UIT & Bộ tính chuyển ngành resolveCareerBridge'
        }
      ]
    },
    {
      id: 'lab_hub',
      title: 'PHÒNG LUYỆN LAB',
      shortTitle: 'Phòng Luyện Lab',
      icon: '🧪',
      badge: '25 ENQ · Pomodoro',
      badgeClass: 'hub-badge-warning',
      description: 'English kỹ thuật 25 ENQ, Sổ tay khắc phục lỗi & Buổi học tập trung Pomodoro',
      defaultSubTab: 'english',
      subTabs: [
        {
          id: 'english',
          label: 'English Lab (25 ENQ)',
          icon: '🇬🇧',
          badge: '25 ENQ',
          viewTarget: 'english',
          description: 'Luyện 25 câu hỏi phỏng vấn tiếng Anh chuyên ngành SE'
        },
        {
          id: 'remediation',
          label: 'Củng Cố & Sửa Lỗi',
          icon: '🩹',
          badge: 'Lỗ Hổng',
          viewTarget: 'remediation',
          description: 'Sổ tay củng cố kiến thức và khắc phục lỗi thường gặp'
        },
        {
          id: 'sessions',
          label: 'Buổi Học Pomodoro',
          icon: '⏱️',
          badge: '0 buổi',
          badgeId: 'navSessionBadge',
          viewTarget: 'sessions',
          description: 'Quản lý phiên học tập trung, bấm giờ Pomodoro & Thống kê'
        }
      ]
    },
    {
      id: 'portal_hub',
      title: 'HỒ SƠ & TÍN CHỈ UIT',
      shortTitle: 'Hồ Sơ & UIT',
      icon: '📊',
      badge: 'GPA · Audit',
      badgeClass: 'hub-badge-success',
      description: 'Theo dõi GPA UIT, Cột mốc Semester Gates & Báo cáo kiểm định chất lượng',
      defaultSubTab: 'gpa',
      subTabs: [
        {
          id: 'gpa',
          label: 'Điểm Số & GPA UIT',
          icon: '📊',
          badge: 'Tín Chỉ',
          viewTarget: 'gpa',
          description: 'Theo dõi điểm tích lũy, GPA học kỳ và tiến độ tốt nghiệp'
        },
        {
          id: 'projects',
          label: 'Dự Án & Semester Gates',
          icon: '🎯',
          badge: 'Gates',
          viewTarget: 'projects',
          description: 'Cột mốc Semester Gates và các môn học đồ án chuyên ngành'
        },
        {
          id: 'admin',
          label: 'Kiểm Định & Báo Cáo',
          icon: '🛡️',
          badge: 'Audit',
          viewTarget: 'admin',
          description: 'Kiểm định toàn diện tiến độ, tính toàn vẹn và phân tích dữ liệu'
        }
      ]
    }
  ];

  // Bản đồ tra cứu nhanh: view -> { hubId, subTabId }
  const VIEW_TO_HUB_MAP = {
    reader: { hubId: 'studio', subTabId: 'reader' },
    playbook: { hubId: 'studio', subTabId: 'playbook' },
    roadmap: { hubId: 'roadmap_hub', subTabId: 'roadmap' },
    career: { hubId: 'roadmap_hub', subTabId: 'career' },
    english: { hubId: 'lab_hub', subTabId: 'english' },
    remediation: { hubId: 'lab_hub', subTabId: 'remediation' },
    sessions: { hubId: 'lab_hub', subTabId: 'sessions' },
    gpa: { hubId: 'portal_hub', subTabId: 'gpa' },
    projects: { hubId: 'portal_hub', subTabId: 'projects' },
    admin: { hubId: 'portal_hub', subTabId: 'admin' },
    dashboard: { hubId: 'roadmap_hub', subTabId: 'roadmap' },
    security: { hubId: 'portal_hub', subTabId: 'admin' }
  };

  /* ==========================================================================
     2. DỮ LIỆU DỰ PHÒNG CHUẨN (FALLBACK DATASETS FOR FUZZY SEARCH)
     ========================================================================== */
  const FALLBACK_CAREER_WAYS = [
    { id: 'WAY_01', code: 'WAY_01_BACKEND', title: 'Kỹ Sư Backend & Hệ Thống Phân Tán', desc: 'Kiến trúc dịch vụ, C++17/Go/Java, Database Tuning, High Concurrency' },
    { id: 'WAY_02', code: 'WAY_02_FRONTEND', title: 'Kỹ Sư Frontend & Web Performance', desc: 'Modern Web, React/TypeScript, Micro-frontends, Tối ưu 60fps' },
    { id: 'WAY_03', code: 'WAY_03_FULLSTACK', title: 'Kỹ Sư Fullstack Web & Cloud Apps', desc: 'End-to-End Engineering, REST/GraphQL, Clean Architecture' },
    { id: 'WAY_04', code: 'WAY_04_MOBILE', title: 'Kỹ Sư Mobile (Flutter & Native)', desc: 'Cross-platform Flutter, Kotlin/Swift, Offline-First, Mobile Cache' },
    { id: 'WAY_05', code: 'WAY_05_DEVOPS_CLOUD', title: 'Kỹ Sư DevOps, SRE & Cloud Native', desc: 'CI/CD Pipelines, Docker, Kubernetes, Terraform, AWS/GCP' },
    { id: 'WAY_06', code: 'WAY_06_DATA_ENGINEERING', title: 'Kỹ Sư Kỹ Thuật Dữ Liệu (Data Engineer)', desc: 'Big Data, Spark/Flink, Kafka streaming, DWH & Lakehouse' },
    { id: 'WAY_07', code: 'WAY_07_AI_ML', title: 'Kỹ Sư AI, Trí Tuệ Nhân Tạo & Học Máy', desc: 'Deep Learning, PyTorch, LLMs, Computer Vision, MLOps' },
    { id: 'WAY_08', code: 'WAY_08_CYBERSECURITY', title: 'Kỹ Sư An Toàn Thông Tin & DevSecOps', desc: 'Network Security, Pentesting, Reverse Engineering, Cryptography' },
    { id: 'WAY_09', code: 'WAY_09_GAME_DEV', title: 'Kỹ Sư Lập Trình Game & Đồ Họa (Game Dev)', desc: 'C++, Unity/Unreal Engine, Shader programming, Physics Engine' },
    { id: 'WAY_10', code: 'WAY_10_EMBEDDED_IOT', title: 'Kỹ Sư Hệ Thống Nhúng & IoT', desc: 'C/Embedded C++, RTOS, Vi điều khiển ARM/ESP32, Firmware' },
    { id: 'WAY_11', code: 'WAY_11_QUANTUM', title: 'Kỹ Sư Điện Toán Lượng Tử (Quantum Computing)', desc: 'Qiskit, Quantum Circuits, Linear Algebra, Quantum Algorithms' }
  ];

  const FALLBACK_CORE_SUBJECTS = [
    { code: 'IT001', name: 'Nhập Môn Lập Trình', credits: 4, sem: 'HK1', desc: 'Thuật toán cơ sở, biến, vòng lặp, mảng 2 chiều chuẩn mang2chieu.cpp' },
    { code: 'IT002', name: 'Lập Trình Hướng Đối Tượng (OOP)', credits: 4, sem: 'HK2', desc: '4 trụ cột OOP, Con trỏ, Vtable, Đa hình động, Lớp trừu tượng' },
    { code: 'IT003', name: 'Cấu Trúc Dữ Liệu & Giải Thuật', credits: 4, sem: 'HK3', desc: 'Danh sách liên kết, Cây nhị phân, Bảng băm, Đồ thị, Độ phức tạp Big-O' },
    { code: 'IT004', name: 'Cơ Sở Dữ Liệu', credits: 4, sem: 'HK3', desc: 'Mô hình quan hệ, Đại số quan hệ, Chuẩn hóa 1NF-3NF/BCNF, SQL' },
    { code: 'IT005', name: 'Nhập Môn Mạng Máy Tính', credits: 3, sem: 'HK4', desc: 'Mô hình OSI/TCP-IP, Socket programming, Routing, DNS, HTTP' },
    { code: 'SE005', name: 'Nhập Môn Kỹ Thuật Phần Mềm', credits: 3, sem: 'HK1', desc: 'SDLC, Git workflow, Quản lý phiên bản, Thiết kế kiến trúc' },
    { code: 'SE117', name: 'Kỹ Thuật Lập Trình', credits: 3, sem: 'HK2', desc: 'Quản trị bộ nhớ Heap/Stack, Đệ quy, Con trỏ hàm, File nhị phân' },
    { code: 'MA006', name: 'Xác Suất Thống Kê', credits: 3, sem: 'HK2', desc: 'Biến ngẫu nhiên, Phân phối, Ước lượng, Kiểm định giả thuyết' },
    { code: 'MA003', name: 'Đại Số Tuyến Tính', credits: 3, sem: 'HK1', desc: 'Ma trận, Định thức, Không gian vector, Trị riêng & Vector riêng' },
    { code: 'CE119', name: 'Kiến Trúc Máy Tính', credits: 3, sem: 'HK2', desc: 'Tập lệnh MIPS/RISC-V, ALU, Pipeline, Cache L1/L2, Bộ nhớ ảo' }
  ];

  const FALLBACK_PLAYBOOKS = [
    { id: 'mang2chieu.cpp', title: 'Mảng 2 Chiều & Cấp Phát Động 4 Tầng (C++17)', category: 'C++ & Core Data Structures', badge: 'C++17 / Core DSA' },
    { id: 'oop_ke_thua_da_hinh.cpp', title: 'Lập Trình Hướng Đối Tượng & Kế Thừa Đa Hình Chuẩn UIT', category: 'OOP & Modern Design', badge: 'OOP / Polymorphism' },
    { id: 'danh_sach_lien_ket.cpp', title: 'Cấu Trúc Dữ Liệu Danh Sách Liên Kết Đơn (Singly Linked List)', category: 'Data Structures', badge: 'Linked List' },
    { id: 'concurrency_mutex_threads.cpp', title: 'Lập Trình Đa Luồng & Đồng Bộ Hóa Mutex (C++ Concurrency)', category: 'System Programming', badge: 'Threads / Mutex' }
  ];

  /* ==========================================================================
     3. QUẢN TRỊ TRẠNG THÁI NỘI BỘ (INTERNAL HUB STATE)
     ========================================================================== */
  const STORAGE_KEY = 'tp_workspace_hub_state_v4';

  function loadSavedHubState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Workspace Hub state load warning:', e);
    }
    return {
      currentHubId: 'studio',
      activeSubTabs: {
        studio: 'reader',
        roadmap_hub: 'roadmap',
        lab_hub: 'english',
        portal_hub: 'gpa'
      }
    };
  }

  function saveHubState(hubState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hubState));
    } catch (e) {
      // storage unavailable
    }
  }

  let hubState = loadSavedHubState();

  /* ==========================================================================
     4. TIỆN ÍCH CHUẨN HÓA TIẾNG VIỆT & TÌM KIẾM MỜ (FUZZY SEARCH ENGINE)
     ========================================================================== */
  function normalizeText(str) {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
      .replace(/[^a-z0-9\s._-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function calculateRelevanceScore(queryNorm, itemNorm, idNorm, titleNorm) {
    if (!queryNorm) return 0;
    let score = 0;

    // 1. Khớp chính xác ID (e.g. CPP-001, IT001, WAY_01)
    if (idNorm === queryNorm) score += 2000;
    else if (idNorm.startsWith(queryNorm)) score += 1200;
    else if (idNorm.includes(queryNorm)) score += 600;

    // 2. Khớp trong tiêu đề
    if (titleNorm === queryNorm) score += 1500;
    else if (titleNorm.startsWith(queryNorm)) score += 800;
    else if (titleNorm.includes(queryNorm)) score += 400;

    // 3. Khớp từng từ đơn lẻ (Token match)
    const tokens = queryNorm.split(' ').filter(Boolean);
    let matchedTokens = 0;
    tokens.forEach(tok => {
      if (itemNorm.includes(tok)) {
        matchedTokens++;
        score += 80;
      }
    });

    if (matchedTokens === tokens.length && tokens.length > 1) {
      score += 300; // All tokens present
    }

    return score;
  }

  /* ==========================================================================
     5. XÂY DỰNG CHỈ MỤC TÌM KIẾM TỔNG HỢP (UNIFIED SEARCH INDEX)
     ========================================================================== */
  function buildUnifiedSearchIndex() {
    const items = [];

    // --- 5.1. 343 BÀI HỌC UIT ---
    const lessons = (window.PLATFORM_DATA && Array.isArray(window.PLATFORM_DATA.lessons))
      ? window.PLATFORM_DATA.lessons
      : [];

    lessons.forEach(l => {
      const id = l.id || '';
      const title = l.title || '';
      const stage = l.stage || '';
      const subj = l.subjName || l.subj || '';
      const uitMap = l.uitMap || '';
      const combined = `${id} ${title} ${stage} ${subj} ${uitMap} ${l.cat || ''}`;

      items.push({
        type: 'lesson',
        id: id,
        title: title,
        subtitle: `${id} · ${stage ? stage + ' · ' : ''}${subj}`,
        meta: uitMap ? `UIT: ${uitMap}` : (l.sem || 'HK1'),
        icon: '📖',
        badge: id,
        category: '343 Bài Học UIT',
        categoryKey: 'lesson',
        rawText: combined,
        normText: normalizeText(combined),
        normId: normalizeText(id),
        normTitle: normalizeText(title),
        action: () => {
          switchWorkspaceHub('studio', 'reader');
          triggerAppNavigation('reader', id);
        }
      });
    });

    // --- 5.2. 11 HƯỚNG ĐI NGHỀ NGHIỆP UIT ---
    let careerWays = [];
    if (window.PLAYBOOK_DATA && Array.isArray(window.PLAYBOOK_DATA.careerWays)) {
      careerWays = window.PLAYBOOK_DATA.careerWays;
    } else if (window.PLAYBOOK_DATA && Array.isArray(window.PLAYBOOK_DATA.CAREER_WAYS)) {
      careerWays = window.PLAYBOOK_DATA.CAREER_WAYS;
    } else {
      careerWays = FALLBACK_CAREER_WAYS;
    }

    careerWays.forEach(w => {
      const id = w.id || w.code || '';
      const title = w.title || w.name || '';
      const desc = w.marketOutlook || w.description || w.desc || '';
      const combined = `${id} ${w.code || ''} ${title} ${desc} career way huong di nghe nghiep`;

      items.push({
        type: 'career',
        id: id,
        title: title,
        subtitle: desc ? (desc.length > 85 ? desc.substring(0, 85) + '...' : desc) : 'Lộ trình chuyển ngành Zero-Overlap',
        meta: '11 Hướng Đi UIT',
        icon: '🚀',
        badge: id.replace('_', ' '),
        category: '11 Hướng Đi Nghề Nghiệp',
        categoryKey: 'career',
        rawText: combined,
        normText: normalizeText(combined),
        normId: normalizeText(id),
        normTitle: normalizeText(title),
        action: () => {
          switchWorkspaceHub('roadmap_hub', 'career');
          setTimeout(() => {
            const el = document.querySelector(`[data-way-id="${id}"]`) || document.getElementById(`way-${id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 120);
        }
      });
    });

    // --- 5.3. EXECUTABLE CODE PLAYBOOKS ---
    let playbooks = [];
    if (window.PLAYBOOK_DATA && Array.isArray(window.PLAYBOOK_DATA.playbooks) && window.PLAYBOOK_DATA.playbooks.length > 0) {
      playbooks = window.PLAYBOOK_DATA.playbooks;
    } else if (window.PLAYBOOK_DATA && Array.isArray(window.PLAYBOOK_DATA.PLAYBOOKS) && window.PLAYBOOK_DATA.PLAYBOOKS.length > 0) {
      playbooks = window.PLAYBOOK_DATA.PLAYBOOKS;
    } else {
      playbooks = FALLBACK_PLAYBOOKS;
    }

    playbooks.forEach(pb => {
      const id = pb.id || pb.sourceFilename || '';
      const title = pb.title || '';
      const category = pb.category || 'C++ Playbook';
      const badge = pb.badge || pb.sourceFilename || 'C++17';
      const desc = pb.description || pb.desc || '';
      const combined = `${id} ${title} ${category} ${badge} ${desc} code playbook c++`;

      items.push({
        type: 'playbook',
        id: id,
        title: title,
        subtitle: `${id} · ${category}`,
        meta: badge,
        icon: '⚡',
        badge: badge,
        category: 'Code Playbook Studio',
        categoryKey: 'playbook',
        rawText: combined,
        normText: normalizeText(combined),
        normId: normalizeText(id),
        normTitle: normalizeText(title),
        action: () => {
          switchWorkspaceHub('studio', 'playbook');
          if (typeof window.selectPlaybook === 'function') {
            setTimeout(() => window.selectPlaybook(id), 60);
          }
        }
      });
    });

    // --- 5.4. CÁC MÔN HỌC UIT (CORE & CHUYÊN NGÀNH) ---
    let subjects = [];
    if (window.PLATFORM_DATA && Array.isArray(window.PLATFORM_DATA.subjects) && window.PLATFORM_DATA.subjects.length > 0) {
      subjects = window.PLATFORM_DATA.subjects;
    } else {
      subjects = FALLBACK_CORE_SUBJECTS;
    }

    subjects.forEach(s => {
      const code = s.code || s.id || '';
      const name = s.name || '';
      const desc = s.desc || s.description || '';
      const credits = s.credits || 3;
      const sem = s.sem || s.semester || 'Đại học UIT';
      const combined = `${code} ${name} ${desc} ${sem} mon hoc uit tin chi`;

      items.push({
        type: 'subject',
        id: code,
        title: `${code}: ${name}`,
        subtitle: `${credits} Tín chỉ · ${sem} · ${desc || 'Chương trình đào tạo Kỹ sư Phần mềm UIT'}`,
        meta: `${credits} Tín chỉ`,
        icon: '🎓',
        badge: code,
        category: 'Môn Học UIT',
        categoryKey: 'subject',
        rawText: combined,
        normText: normalizeText(combined),
        normId: normalizeText(code),
        normTitle: normalizeText(name),
        action: () => {
          switchWorkspaceHub('roadmap_hub', 'roadmap');
          setTimeout(() => {
            const filterBtn = document.querySelector(`[data-filter-subj="${code}"]`);
            if (filterBtn) filterBtn.click();
          }, 100);
        }
      });
    });

    // --- 5.5. CÁC PHÂN HỆ TÍNH NĂNG CỐT LÕI (QUICK SHORTCUTS) ---
    const featureShortcuts = [
      {
        id: 'feat_english',
        title: 'English Lab: 25 ENQ Phỏng Vấn Chuyên Ngành',
        subtitle: 'Luyện 25 câu hỏi kỹ thuật chuẩn kỹ sư phần mềm quốc tế',
        category: 'Phòng Luyện Lab',
        categoryKey: 'feature',
        icon: '🇬🇧',
        badge: '25 ENQ',
        meta: 'Hub 3 · Lab',
        rawText: 'english lab 25 enq phong van tieng anh tieng anh chuyen nganh ky thuat',
        action: () => switchWorkspaceHub('lab_hub', 'english')
      },
      {
        id: 'feat_remediation',
        title: 'Sổ Tay Củng Cố & Khắc Phục Lỗi (Remediation)',
        subtitle: 'Chẩn đoán lỗ hổng, bài tập khắc phục và củng cố nền tảng',
        category: 'Phòng Luyện Lab',
        categoryKey: 'feature',
        icon: '🩹',
        badge: 'Lỗ Hổng',
        meta: 'Hub 3 · Lab',
        rawText: 'cung co sua loi remediation lo hong on tap can ban',
        action: () => switchWorkspaceHub('lab_hub', 'remediation')
      },
      {
        id: 'feat_sessions',
        title: 'Buổi Học Tập Trung & Bấm Giờ Pomodoro',
        subtitle: 'Quản lý phiên học 25/5, ghi nhận tiến độ và phân tích nhịp học',
        category: 'Phòng Luyện Lab',
        categoryKey: 'feature',
        icon: '⏱️',
        badge: 'Pomodoro',
        meta: 'Hub 3 · Lab',
        rawText: 'buoi hoc tap trung pomodoro thoi gian bam gio hoc tap thong ke',
        action: () => switchWorkspaceHub('lab_hub', 'sessions')
      },
      {
        id: 'feat_gpa',
        title: 'Hồ Sơ Tín Chỉ & Bảng Điểm GPA UIT',
        subtitle: 'Tính toán điểm trung bình tích lũy, quy đổi tín chỉ và tiến độ tốt nghiệp',
        category: 'Hồ Sơ & Tín Chỉ UIT',
        categoryKey: 'feature',
        icon: '📊',
        badge: 'GPA UIT',
        meta: 'Hub 4 · Hồ sơ',
        rawText: 'bang diem gpa tin chi uit hoc bong xep loai tot nghiep',
        action: () => switchWorkspaceHub('portal_hub', 'gpa')
      },
      {
        id: 'feat_projects',
        title: 'Cột Mốc Semester Gates & Đồ Án Chuyên Ngành',
        subtitle: 'Kiểm soát điều kiện chuyển học kỳ và đồ án công nghệ thực chiến',
        category: 'Hồ Sơ & Tín Chỉ UIT',
        categoryKey: 'feature',
        icon: '🎯',
        badge: 'Semester Gates',
        meta: 'Hub 4 · Hồ sơ',
        rawText: 'do an du an semester gates cot moc hoc ky tot nghiep',
        action: () => switchWorkspaceHub('portal_hub', 'projects')
      },
      {
        id: 'feat_admin',
        title: 'Báo Cáo Kiểm Định Chất Lượng & Dữ Liệu (Audit)',
        subtitle: 'Kiểm tra tính toàn vẹn 343 bài, cây tiên quyết và độ phủ môn học',
        category: 'Hồ Sơ & Tín Chỉ UIT',
        categoryKey: 'feature',
        icon: '🛡️',
        badge: 'Audit',
        meta: 'Hub 4 · Hồ sơ',
        rawText: 'kiem dinh bao cao audit admin toan ven du lieu tien quyet',
        action: () => switchWorkspaceHub('portal_hub', 'admin')
      },
      {
        id: 'feat_bridge',
        title: 'Bộ Tính Điểm Giao Chuyển Ngành (Career Bridge Calculator)',
        subtitle: 'Thuật toán resolveCareerBridge tách biệt môn dùng chung và môn cầu nối',
        category: 'Lộ Trình 11 Ngành',
        categoryKey: 'career',
        icon: '🔄',
        badge: 'Zero-Overlap',
        meta: 'Hub 2 · Điểm giao',
        rawText: 'diem giao chuyen nganh resolveCareerBridge career bridge calculator mon cau noi',
        action: () => switchWorkspaceHub('roadmap_hub', 'career')
      }
    ];

    featureShortcuts.forEach(f => {
      items.push({
        type: 'feature',
        id: f.id,
        title: f.title,
        subtitle: f.subtitle,
        meta: f.meta,
        icon: f.icon,
        badge: f.badge,
        category: f.category,
        categoryKey: f.categoryKey,
        rawText: `${f.title} ${f.subtitle} ${f.rawText}`,
        normText: normalizeText(`${f.title} ${f.subtitle} ${f.rawText}`),
        normId: normalizeText(f.id),
        normTitle: normalizeText(f.title),
        action: f.action
      });
    });

    return items;
  }

  /* ==========================================================================
     6. ĐIỀU HƯỚNG ỨNG DỤNG AN TOÀN (SAFE APP NAVIGATION BRIDGE)
     ========================================================================== */
  function triggerAppNavigation(view, lessonId = null) {
    // 1. Ưu tiên gọi hàm native nếu có trên window
    if (typeof window.navigateTo === 'function') {
      window.navigateTo(view, lessonId);
      return;
    }

    // 2. Kích hoạt qua data-open-lesson nếu có lessonId
    if (lessonId) {
      const dummyBtn = document.createElement('button');
      dummyBtn.setAttribute('data-open-lesson', lessonId);
      dummyBtn.style.display = 'none';
      document.body.appendChild(dummyBtn);
      dummyBtn.click();
      dummyBtn.remove();
      return;
    }

    // 3. Kích hoạt qua data-view giả lập
    if (view) {
      const dummyBtn = document.createElement('button');
      dummyBtn.setAttribute('data-view', view);
      dummyBtn.style.display = 'none';
      document.body.appendChild(dummyBtn);
      dummyBtn.click();
      dummyBtn.remove();
    }
  }

  /* ==========================================================================
     7. INJECT CSS NATIVE CHO WORKSPACE HUBS & COMMAND PALETTE
     ========================================================================== */
  function injectWorkspaceStyles() {
    if (document.getElementById('toanpham-workspace-hub-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'toanpham-workspace-hub-styles';
    styleEl.textContent = `
/* ============================================================================
   TOÀN PHẠM IT SANCTUARY — 4 CORE WORKSPACE HUBS & COMMAND PALETTE STYLES
   ============================================================================ */

/* --- 1. WORKSPACE HUB CONTAINER & WRAPPER --- */
.workspace-hub-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding: 4px 0 2px 0;
  position: relative;
}

/* --- 2. TOP LEVEL: 4 CORE HUBS BAR --- */
.workspace-hub-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 6px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-soft);
  position: relative;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.workspace-hub-bar::-webkit-scrollbar {
  display: none;
}

/* Hub Pill Button */
.hub-pill-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: color 220ms var(--ease-spring),
              background-color 240ms var(--ease-spring),
              border-color 220ms var(--ease-spring),
              transform 200ms var(--ease-spring),
              box-shadow 240ms var(--ease-spring);
  z-index: 2;
}

.hub-pill-btn:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.45);
  transform: translateY(-1px);
}

.hub-pill-btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.hub-pill-btn.active {
  background: var(--accent-primary);
  color: var(--accent-primary-fg);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-pill);
  transform: translateY(-1px);
}

.hub-pill-btn .hub-icon {
  font-size: 17px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 220ms var(--ease-spring);
}

.hub-pill-btn:hover .hub-icon {
  transform: scale(1.15) rotate(-4deg);
}

.hub-pill-btn.active .hub-icon {
  transform: scale(1.1);
}

.hub-pill-btn .hub-text {
  font-weight: 700;
  letter-spacing: 0.01em;
}

/* Hub Badges */
.hub-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.06);
  color: inherit;
  transition: background 200ms ease, color 200ms ease;
}

.hub-pill-btn.active .hub-badge {
  background: rgba(255, 255, 255, 0.24);
  color: #fff;
}

.hub-badge-accent {
  background: var(--accent-primary-bg);
  color: var(--accent-primary);
}

.hub-badge-info {
  background: var(--status-info-bg);
  color: var(--status-info);
}

.hub-badge-warning {
  background: var(--status-warning-bg);
  color: var(--status-warning);
}

.hub-badge-success {
  background: var(--status-success-bg);
  color: var(--status-success);
}

/* --- 3. SUB-LEVEL: SEGMENTED CONTROLS BAR --- */
.workspace-subtab-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 4px 6px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-soft);
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  animation: subtabFadeIn 240ms var(--ease-spring);
}

.workspace-subtab-bar::-webkit-scrollbar {
  display: none;
}

@keyframes subtabFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Subtab Pill Button */
.subtab-pill-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: all 200ms var(--ease-spring);
}

.subtab-pill-btn:hover {
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.04);
}

.subtab-pill-btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.subtab-pill-btn.active {
  background: var(--bg-elevated);
  color: var(--accent-primary);
  border-color: var(--border-strong);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  font-weight: 700;
}

.subtab-pill-btn .subtab-icon {
  font-size: 14px;
}

.subtab-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 1px 7px;
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.06);
  color: inherit;
}

.subtab-pill-btn.active .subtab-badge {
  background: var(--accent-primary-bg);
  color: var(--accent-primary);
}

.tab-count-highlight {
  background: var(--status-warning-bg) !important;
  color: var(--status-warning) !important;
}

/* --- 4. HEADER SEARCH TRIGGER BUTTON --- */
.omni-search-trigger-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  color: var(--text-muted);
  font-size: 13px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 220ms var(--ease-spring);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.omni-search-trigger-btn:hover {
  background: var(--bg-surface);
  border-color: var(--accent-primary);
  color: var(--text-primary);
  box-shadow: 0 4px 14px rgba(196, 116, 87, 0.18);
  transform: translateY(-1px);
}

.omni-search-trigger-btn .search-icon {
  font-size: 14px;
  color: var(--accent-primary);
}

.omni-search-trigger-btn .search-label {
  white-space: nowrap;
}

.omni-search-trigger-btn .search-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: var(--text-secondary);
}

/* --- 5. OMNI COMMAND PALETTE MODAL --- */
.omni-palette-modal {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: min(12vh, 100px);
  padding-left: 16px;
  padding-right: 16px;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 220ms ease, visibility 220ms ease;
}

.omni-palette-modal.open {
  pointer-events: auto;
  opacity: 1;
  visibility: visible;
}

/* Backdrop */
.omni-palette-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(18, 14, 12, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
}

/* Spotlight Dialog Container */
.omni-palette-dialog {
  position: relative;
  width: 100%;
  max-width: 680px;
  background: var(--bg-surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 32px 80px -16px rgba(0, 0, 0, 0.38),
              0 0 0 1px var(--border-subtle);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 82vh;
  transform: scale(0.96) translateY(-8px);
  transition: transform 260ms var(--ease-spring);
  z-index: 2;
}

.omni-palette-modal.open .omni-palette-dialog {
  transform: scale(1) translateY(0);
}

/* Input Area */
.omni-search-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
}

.omni-search-icon {
  font-size: 19px;
  color: var(--accent-primary);
  flex-shrink: 0;
}

.omni-search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16.5px;
  font-weight: 500;
  font-family: inherit;
  color: var(--text-primary);
  padding: 0;
}

.omni-search-input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

.omni-search-clear-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 16px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 160ms ease;
}

.omni-search-clear-btn:hover {
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.08);
}

.omni-esc-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
}

/* Category Filter Bar */
.omni-filter-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  overflow-x: auto;
  scrollbar-width: none;
}

.omni-filter-bar::-webkit-scrollbar {
  display: none;
}

.omni-filter-pill {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all 180ms ease;
}

.omni-filter-pill:hover {
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.04);
}

.omni-filter-pill.active {
  background: var(--accent-primary-bg);
  color: var(--accent-primary);
  border-color: rgba(196, 116, 87, 0.28);
}

/* Results List */
.omni-results-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
  max-height: 480px;
  scroll-behavior: smooth;
}

.omni-results-container::-webkit-scrollbar {
  width: 6px;
}

.omni-results-container::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: var(--radius-pill);
}

/* Category Group Header */
.omni-group-header {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  padding: 10px 12px 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.omni-group-header .group-count {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 600;
  opacity: 0.8;
}

/* Result Item */
.omni-result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;
  transition: background-color 150ms ease, transform 150ms ease, border-left-color 150ms ease;
  border-left: 3px solid transparent;
  margin-bottom: 2px;
}

.omni-result-item:hover,
.omni-result-item.selected {
  background: var(--bg-elevated);
  border-left-color: var(--accent-primary);
  transform: translateX(2px);
}

.omni-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}

.omni-item-icon {
  font-size: 19px;
  line-height: 1;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 180ms var(--ease-spring);
}

.omni-result-item:hover .omni-item-icon,
.omni-result-item.selected .omni-item-icon {
  transform: scale(1.1);
  background: var(--accent-primary-bg);
}

.omni-item-content {
  min-width: 0;
  flex: 1;
}

.omni-item-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.omni-item-title mark {
  background: rgba(196, 116, 87, 0.22);
  color: var(--accent-primary);
  font-weight: 800;
  padding: 0 2px;
  border-radius: 2px;
}

.omni-item-subtitle {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.omni-item-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.omni-item-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-secondary);
}

.omni-item-enter-icon {
  font-size: 12px;
  color: var(--accent-primary);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 160ms ease;
}

.omni-result-item:hover .omni-item-enter-icon,
.omni-result-item.selected .omni-item-enter-icon {
  opacity: 1;
  transform: translateX(0);
}

/* Empty & Suggestion States */
.omni-empty-state {
  padding: 40px 24px;
  text-align: center;
}

.omni-empty-icon {
  font-size: 38px;
  margin-bottom: 12px;
  opacity: 0.8;
}

.omni-empty-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.omni-empty-desc {
  font-size: 13px;
  color: var(--text-muted);
  max-width: 380px;
  margin: 0 auto;
  line-height: 1.5;
}

/* Footer Shortcuts */
.omni-palette-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border-subtle);
  font-size: 11.5px;
  color: var(--text-muted);
}

.omni-shortcuts-group {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.omni-shortcut-tip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.omni-shortcut-tip kbd {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .omni-search-trigger-btn .search-label {
    display: none;
  }
  .omni-search-trigger-btn {
    padding: 7px 12px;
  }
  .workspace-hub-bar {
    gap: 4px;
    padding: 4px;
  }
  .hub-pill-btn {
    padding: 7px 12px;
    font-size: 12.5px;
    gap: 6px;
  }
  .hub-badge {
    display: none;
  }
  .omni-palette-modal {
    padding-top: 24px;
  }
  .omni-palette-dialog {
    max-height: 92vh;
  }
}
`;

    document.head.appendChild(styleEl);
  }

  /* ==========================================================================
     8. KHỞI TẠO VÀ RENDER GIAO DIỆN 4 WORKSPACE HUBS & SUB-TABS
     ========================================================================== */
  function renderWorkspaceHubNavigation() {
    const navRow = document.querySelector('.header-nav-row');
    if (!navRow) return;

    // Lưu lại vị trí badge và bài học hiện tại nếu có
    const currentLesson = (window.SEPlatform && typeof window.SEPlatform.getCurrentLessonId === 'function')
      ? window.SEPlatform.getCurrentLessonId()
      : 'CPP-001';

    // 1. Tạo wrapper chứa Hubs & Subtabs
    let wrapper = navRow.querySelector('.workspace-hub-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'workspace-hub-wrapper';
      navRow.innerHTML = '';
      navRow.appendChild(wrapper);
    }

    // 2. Render Level 1: 4 Core Hubs
    const hubsHtml = `
      <nav class="workspace-hub-bar" role="tablist" aria-label="4 Core Workspace Hubs Toàn Phạm IT Sanctuary">
        ${WORKSPACE_HUBS.map(hub => {
          const isActive = hub.id === hubState.currentHubId;
          return `
            <button type="button" 
                    class="hub-pill-btn ${isActive ? 'active' : ''}" 
                    data-hub="${hub.id}" 
                    role="tab" 
                    aria-selected="${isActive}"
                    title="${hub.description}">
              <span class="hub-icon">${hub.icon}</span>
              <span class="hub-text">${hub.title}</span>
              <span class="hub-badge ${hub.badgeClass}">${hub.badge}</span>
            </button>
          `;
        }).join('')}
      </nav>
      <div class="workspace-subtab-bar" id="workspaceSubTabBar" role="tablist" aria-label="Phân hệ chức năng"></div>
    `;

    wrapper.innerHTML = hubsHtml;

    // 3. Render Level 2: Sub-tabs cho Hub đang hoạt động
    updateSubTabBar();

    // 4. Lắng nghe click trên các nút Hub
    const hubButtons = wrapper.querySelectorAll('.hub-pill-btn');
    hubButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetHubId = btn.getAttribute('data-hub');
        switchWorkspaceHub(targetHubId);
      });
    });
  }

  /* Cập nhật thanh Sub-tabs theo Hub hiện tại */
  function updateSubTabBar() {
    const subTabBar = document.getElementById('workspaceSubTabBar');
    if (!subTabBar) return;

    const currentHub = WORKSPACE_HUBS.find(h => h.id === hubState.currentHubId) || WORKSPACE_HUBS[0];
    const activeSubTabId = hubState.activeSubTabs[currentHub.id] || currentHub.defaultSubTab;

    subTabBar.innerHTML = currentHub.subTabs.map(sub => {
      const isActive = sub.id === activeSubTabId;
      const badgeIdAttr = sub.badgeId ? `id="${sub.badgeId}"` : '';
      const badgeClassAttr = sub.badgeClass || '';
      return `
        <button type="button" 
                class="subtab-pill-btn tab-pill-btn ${isActive ? 'active' : ''}" 
                data-view="${sub.viewTarget}" 
                data-subtab="${sub.id}"
                role="tab" 
                aria-selected="${isActive}"
                title="${sub.description}">
          <span class="subtab-icon">${sub.icon}</span>
          <span class="subtab-label">${sub.label}</span>
          <span class="subtab-badge ${badgeClassAttr}" ${badgeIdAttr}>${sub.badge}</span>
        </button>
      `;
    }).join('');

    // Lắng nghe click chuyển sub-tab
    subTabBar.querySelectorAll('.subtab-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const subId = btn.getAttribute('data-subtab');
        const viewTarget = btn.getAttribute('data-view');
        hubState.activeSubTabs[hubState.currentHubId] = subId;
        saveHubState(hubState);

        // Cập nhật trạng thái active
        subTabBar.querySelectorAll('.subtab-pill-btn').forEach(b => {
          const act = b === btn;
          b.classList.toggle('active', act);
          b.setAttribute('aria-selected', String(act));
        });

        // Kích hoạt điều hướng view của SPA
        triggerAppNavigation(viewTarget);
      });
    });
  }

  /* ==========================================================================
     9. KHỞI TẠO NÚT TÌM KIẾM TRÊN HEADER & COMMAND PALETTE MODAL
     ========================================================================== */
  function renderHeaderSearchTrigger() {
    // Tìm vị trí header actions
    const headerActions = document.querySelector('.header-actions');
    if (!headerActions || document.getElementById('omniSearchTrigger')) return;

    const triggerBtn = document.createElement('button');
    triggerBtn.type = 'button';
    triggerBtn.className = 'omni-search-trigger-btn';
    triggerBtn.id = 'omniSearchTrigger';
    triggerBtn.title = 'Tìm nhanh bài học, code, môn UIT... (Ctrl + K)';
    triggerBtn.innerHTML = `
      <span class="search-icon">🔍</span>
      <span class="search-label">Tìm nhanh bài học, code, môn UIT...</span>
      <kbd class="search-kbd">Ctrl K</kbd>
    `;

    triggerBtn.addEventListener('click', () => {
      openCommandPalette();
    });

    // Chèn vào trước palette swatches hoặc đầu header actions
    const swatches = headerActions.querySelector('.palette-swatches');
    if (swatches) {
      headerActions.insertBefore(triggerBtn, swatches);
    } else {
      headerActions.prepend(triggerBtn);
    }
  }

  /* Khởi tạo DOM Command Palette Modal */
  function renderCommandPaletteModal() {
    if (document.getElementById('omniCommandPaletteModal')) return;

    const modalHtml = `
      <div class="omni-palette-modal" id="omniCommandPaletteModal" role="dialog" aria-modal="true" aria-label="Omni Command Palette">
        <div class="omni-palette-backdrop" id="omniPaletteBackdrop"></div>
        <div class="omni-palette-dialog">
          
          <!-- SEARCH HEADER -->
          <div class="omni-search-header">
            <span class="omni-search-icon">🔍</span>
            <input type="text" 
                   class="omni-search-input" 
                   id="omniSearchInput" 
                   placeholder="Tìm 343 bài học, 11 hướng đi UIT, file code C++, môn học..." 
                   autocomplete="off" 
                   spellcheck="false">
            <button type="button" class="omni-search-clear-btn" id="omniSearchClearBtn" title="Xóa tìm kiếm" style="display:none;">✕</button>
            <kbd class="omni-esc-badge">ESC</kbd>
          </div>

          <!-- CATEGORY FILTER BAR -->
          <div class="omni-filter-bar" id="omniFilterBar">
            <button type="button" class="omni-filter-pill active" data-filter="all">Tất cả</button>
            <button type="button" class="omni-filter-pill" data-filter="lesson">📖 343 Bài Học</button>
            <button type="button" class="omni-filter-pill" data-filter="career">🚀 11 Ngành UIT</button>
            <button type="button" class="omni-filter-pill" data-filter="playbook">⚡ Code Playbook</button>
            <button type="button" class="omni-filter-pill" data-filter="subject">🎓 Môn Học UIT</button>
          </div>

          <!-- RESULTS CONTAINER -->
          <div class="omni-results-container" id="omniResultsContainer">
            <!-- Rendered dynamically -->
          </div>

          <!-- FOOTER SHORTCUTS -->
          <div class="omni-palette-footer">
            <div class="omni-shortcuts-group">
              <span class="omni-shortcut-tip"><kbd>↑</kbd><kbd>↓</kbd> Di chuyển</span>
              <span class="omni-shortcut-tip"><kbd>↵ Enter</kbd> Mở tính năng</span>
              <span class="omni-shortcut-tip"><kbd>ESC</kbd> Đóng</span>
            </div>
            <div style="font-weight: 600; opacity: 0.85;">
              Toàn Phạm IT Sanctuary
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Gắn sự kiện cho Palette
    setupPaletteEvents();
  }

  /* ==========================================================================
     10. LOGIC TÌM KIẾM, PHÍM TẮT & ĐIỀU HƯỚNG TỨC THÌ (SEARCH CONTROLLER)
     ========================================================================== */
  let searchIndex = [];
  let currentResults = [];
  let selectedIndex = 0;
  let activeFilter = 'all';

  function setupPaletteEvents() {
    const modal = document.getElementById('omniCommandPaletteModal');
    const backdrop = document.getElementById('omniPaletteBackdrop');
    const input = document.getElementById('omniSearchInput');
    const clearBtn = document.getElementById('omniSearchClearBtn');
    const filterBar = document.getElementById('omniFilterBar');
    const resultsContainer = document.getElementById('omniResultsContainer');

    if (!modal || !input) return;

    // 1. Đóng khi click backdrop
    backdrop.addEventListener('click', () => closeCommandPalette());

    // 2. Clear button
    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.style.display = 'none';
      input.focus();
      executeSearch();
    });

    // 3. Input typing listener
    input.addEventListener('input', () => {
      clearBtn.style.display = input.value.trim() ? 'block' : 'none';
      executeSearch();
    });

    // 4. Keyboard Navigation bên trong Input
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateResultItems(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateResultItems(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        selectCurrentItem();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeCommandPalette();
      }
    });

    // 5. Category Filter Buttons
    if (filterBar) {
      filterBar.querySelectorAll('.omni-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          filterBar.querySelectorAll('.omni-filter-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeFilter = btn.getAttribute('data-filter');
          executeSearch();
          input.focus();
        });
      });
    }

    // 6. Global Shortcuts: Ctrl + K / Cmd + K và Escape
    window.addEventListener('keydown', (e) => {
      // Ctrl + K hoặc Cmd + K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }
      // Escape
      if (e.key === 'Escape') {
        if (modal.classList.contains('open')) {
          e.preventDefault();
          closeCommandPalette();
        }
      }
    });

    // 7. Lắng nghe Custom Event 'sanctuary:search' từ module_hero_brand.js
    document.addEventListener('sanctuary:search', () => {
      openCommandPalette();
    });
  }

  /* Di chuyển con trỏ lên / xuống trong danh sách kết quả */
  function navigateResultItems(direction) {
    if (!currentResults || currentResults.length === 0) return;

    selectedIndex += direction;
    if (selectedIndex < 0) selectedIndex = currentResults.length - 1;
    if (selectedIndex >= currentResults.length) selectedIndex = 0;

    highlightSelectedItem();
  }

  function highlightSelectedItem() {
    const container = document.getElementById('omniResultsContainer');
    if (!container) return;

    const items = container.querySelectorAll('.omni-result-item');
    items.forEach((item, idx) => {
      const isSel = idx === selectedIndex;
      item.classList.toggle('selected', isSel);
      if (isSel) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  /* Kích hoạt item đang được chọn */
  function selectCurrentItem() {
    if (!currentResults || currentResults.length === 0) return;
    const selected = currentResults[selectedIndex];
    if (selected && typeof selected.action === 'function') {
      closeCommandPalette();
      selected.action();
    }
  }

  /* Thực thi tìm kiếm thông minh */
  function executeSearch() {
    const input = document.getElementById('omniSearchInput');
    const container = document.getElementById('omniResultsContainer');
    if (!container) return;

    if (!searchIndex || searchIndex.length === 0) {
      searchIndex = buildUnifiedSearchIndex();
    }

    const query = input ? input.value.trim() : '';
    const queryNorm = normalizeText(query);

    // Nếu không nhập query -> Hiển thị danh mục gợi ý nổi bật
    if (!queryNorm) {
      renderCuratedRecommendations(container);
      return;
    }

    // Lọc theo Category Filter nếu được chọn
    let pool = searchIndex;
    if (activeFilter !== 'all') {
      pool = searchIndex.filter(item => item.categoryKey === activeFilter);
    }

    // Tính điểm và sắp xếp
    const scoredResults = [];
    pool.forEach(item => {
      const score = calculateRelevanceScore(queryNorm, item.normText, item.normId, item.normTitle);
      if (score > 0) {
        scoredResults.push({ item, score });
      }
    });

    // Sắp xếp giảm dần theo điểm số
    scoredResults.sort((a, b) => b.score - a.score);

    // Lấy top 40 kết quả phù hợp nhất
    currentResults = scoredResults.slice(0, 40).map(r => r.item);
    selectedIndex = 0;

    // Render kết quả
    if (currentResults.length === 0) {
      renderNoResultsState(container, query);
    } else {
      renderResultItems(container, currentResults, queryNorm);
    }
  }

  /* Render danh mục gợi ý khởi điểm (Recommendations) */
  function renderCuratedRecommendations(container) {
    // Chọn 8 items cốt lõi đại diện
    const curatedIds = [
      'CPP-001',
      'mang2chieu.cpp',
      'WAY_01',
      'IT001',
      'IT002',
      'feat_english',
      'feat_gpa',
      'feat_bridge'
    ];

    const curatedItems = searchIndex.filter(item => curatedIds.includes(item.id));
    currentResults = curatedItems.length > 0 ? curatedItems : searchIndex.slice(0, 8);
    selectedIndex = 0;

    let html = `
      <div class="omni-group-header">
        <span>⚡ GỢI Ý TRUY CẬP NHANH</span>
        <span class="group-count">Toàn Phạm Sanctuary</span>
      </div>
    `;

    html += currentResults.map((item, idx) => `
      <div class="omni-result-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
        <div class="omni-item-left">
          <div class="omni-item-icon">${item.icon}</div>
          <div class="omni-item-content">
            <div class="omni-item-title">${item.title}</div>
            <div class="omni-item-subtitle">${item.subtitle}</div>
          </div>
        </div>
        <div class="omni-item-right">
          <span class="omni-item-meta">${item.meta || item.badge}</span>
          <span class="omni-item-enter-icon">↵</span>
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
    attachItemClickHandlers(container);
  }

  /* Render kết quả tìm kiếm với highlight từ khóa */
  function renderResultItems(container, items, queryNorm) {
    // Nhóm theo Category
    const grouped = {};
    items.forEach((item, idx) => {
      const cat = item.category || 'Kết quả khác';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({ item, originalIdx: idx });
    });

    let html = '';
    const queryRegex = new RegExp(`(${queryNorm.split(' ').filter(Boolean).join('|')})`, 'gi');

    Object.keys(grouped).forEach(cat => {
      const list = grouped[cat];
      html += `
        <div class="omni-group-header">
          <span>${cat}</span>
          <span class="group-count">${list.length} mục</span>
        </div>
      `;

      list.forEach(({ item, originalIdx }) => {
        // Highlight từ khóa
        let displayTitle = item.title;
        if (queryNorm) {
          displayTitle = displayTitle.replace(queryRegex, '<mark>$1</mark>');
        }

        html += `
          <div class="omni-result-item ${originalIdx === selectedIndex ? 'selected' : ''}" data-idx="${originalIdx}">
            <div class="omni-item-left">
              <div class="omni-item-icon">${item.icon}</div>
              <div class="omni-item-content">
                <div class="omni-item-title">${displayTitle}</div>
                <div class="omni-item-subtitle">${item.subtitle}</div>
              </div>
            </div>
            <div class="omni-item-right">
              <span class="omni-item-meta">${item.meta || item.badge}</span>
              <span class="omni-item-enter-icon">↵</span>
            </div>
          </div>
        `;
      });
    });

    container.innerHTML = html;
    attachItemClickHandlers(container);
  }

  /* Render trạng thái không có kết quả */
  function renderNoResultsState(container, query) {
    container.innerHTML = `
      <div class="omni-empty-state">
        <div class="omni-empty-icon">🔍</div>
        <div class="omni-empty-title">Không tìm thấy kết quả nào</div>
        <div class="omni-empty-desc">
          Không có bài học, hướng đi hay file code nào khớp với từ khóa <strong>"${escapeHtml(query)}"</strong>.
          Hãy thử tìm với <code>CPP-001</code>, <code>mang2chieu</code>, <code>IT001</code>, hoặc <code>WAY_01</code>.
        </div>
      </div>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }

  function attachItemClickHandlers(container) {
    container.querySelectorAll('.omni-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx'), 10);
        if (!isNaN(idx) && currentResults[idx]) {
          closeCommandPalette();
          currentResults[idx].action();
        }
      });
      el.addEventListener('mouseenter', () => {
        const idx = parseInt(el.getAttribute('data-idx'), 10);
        if (!isNaN(idx)) {
          selectedIndex = idx;
          highlightSelectedItem();
        }
      });
    });
  }

  /* ==========================================================================
     11. ĐỒNG BỘ HAI CHIỀU VỚI CÁC SỰ KIỆN CỦA TOÀN BỘ ỨNG DỤNG
     ========================================================================== */
  function syncHubFromView(viewName) {
    if (!viewName) return;
    const mapping = VIEW_TO_HUB_MAP[viewName];
    if (!mapping) return;

    const { hubId, subTabId } = mapping;
    let changed = false;

    if (hubState.currentHubId !== hubId) {
      hubState.currentHubId = hubId;
      changed = true;
    }

    if (hubState.activeSubTabs[hubId] !== subTabId) {
      hubState.activeSubTabs[hubId] = subTabId;
      changed = true;
    }

    if (changed) {
      saveHubState(hubState);
    }

    // Cập nhật DOM Hub Bar
    document.querySelectorAll('.hub-pill-btn').forEach(btn => {
      const isAct = btn.getAttribute('data-hub') === hubId;
      btn.classList.toggle('active', isAct);
      btn.setAttribute('aria-selected', String(isAct));
    });

    // Cập nhật DOM Subtab Bar
    updateSubTabBar();
  }

  function setupAppInterceptors() {
    // 1. Lắng nghe click toàn cục để bắt các nút [data-view] và [data-open-lesson]
    document.addEventListener('click', e => {
      const lesBtn = e.target.closest('[data-open-lesson]');
      if (lesBtn) {
        syncHubFromView('reader');
        return;
      }

      const navBtn = e.target.closest('[data-view]');
      if (navBtn) {
        const view = navBtn.getAttribute('data-view');
        syncHubFromView(view);
      }
    }, true);

    // 2. Intercept window.navigateTo nếu đã có sẵn
    if (typeof window.navigateTo === 'function') {
      const origNavigate = window.navigateTo;
      window.navigateTo = function (view, lessonId) {
        origNavigate(view, lessonId);
        syncHubFromView(view);
      };
    }
  }

  /* ==========================================================================
     12. PUBLIC API CHÍNH THỨC EXPORT CHO ỨNG DỤNG
     ========================================================================== */

  /**
   * Chuyển đổi giữa 4 Core Workspace Hubs
   * @param {string} hubId - 'studio' | 'roadmap_hub' | 'lab_hub' | 'portal_hub'
   * @param {string} [subTabId] - Optional subtab id (e.g. 'reader', 'playbook', 'career',...)
   */
  function switchWorkspaceHub(hubId, subTabId = null) {
    const hub = WORKSPACE_HUBS.find(h => h.id === hubId);
    if (!hub) return;

    hubState.currentHubId = hubId;
    const targetSubTab = subTabId || hubState.activeSubTabs[hubId] || hub.defaultSubTab;
    hubState.activeSubTabs[hubId] = targetSubTab;
    saveHubState(hubState);

    // 1. Cập nhật Hub Buttons
    document.querySelectorAll('.hub-pill-btn').forEach(btn => {
      const isAct = btn.getAttribute('data-hub') === hubId;
      btn.classList.toggle('active', isAct);
      btn.setAttribute('aria-selected', String(isAct));
    });

    // 2. Cập nhật Sub-tabs
    updateSubTabBar();

    // 3. Kích hoạt view tương ứng
    triggerAppNavigation(targetSubTab);
  }

  /**
   * Bật / Tắt Omni Command Palette
   */
  function toggleCommandPalette() {
    const modal = document.getElementById('omniCommandPaletteModal');
    if (!modal) {
      renderCommandPaletteModal();
    }
    const curModal = document.getElementById('omniCommandPaletteModal');
    if (curModal && curModal.classList.contains('open')) {
      closeCommandPalette();
    } else {
      openCommandPalette();
    }
  }

  /**
   * Mở Omni Command Palette
   */
  function openCommandPalette() {
    let modal = document.getElementById('omniCommandPaletteModal');
    if (!modal) {
      renderCommandPaletteModal();
      modal = document.getElementById('omniCommandPaletteModal');
    }

    if (!modal) return;
    modal.classList.add('open');

    const input = document.getElementById('omniSearchInput');
    if (input) {
      input.value = '';
      const clearBtn = document.getElementById('omniSearchClearBtn');
      if (clearBtn) clearBtn.style.display = 'none';
      setTimeout(() => input.focus(), 60);
    }

    // Chuẩn bị index và hiển thị gợi ý
    searchIndex = buildUnifiedSearchIndex();
    const container = document.getElementById('omniResultsContainer');
    if (container) {
      renderCuratedRecommendations(container);
    }
  }

  /**
   * Đóng Omni Command Palette
   */
  function closeCommandPalette() {
    const modal = document.getElementById('omniCommandPaletteModal');
    if (modal) {
      modal.classList.remove('open');
    }
  }

  /**
   * Khởi tạo toàn bộ Workspace Hubs & Command Palette
   */
  function initWorkspaceHubs() {
    injectWorkspaceStyles();
    renderWorkspaceHubNavigation();
    renderHeaderSearchTrigger();
    renderCommandPaletteModal();
    setupAppInterceptors();

    // Khởi tạo index tìm kiếm ở chế độ idle
    setTimeout(() => {
      searchIndex = buildUnifiedSearchIndex();
    }, 400);

    console.log('✅ [module_workspace_hub.js] 4 Core Workspace Hubs & Omni Command Palette initialized successfully.');
  }

  // --- Export ra đối tượng toàn cục window ---
  window.initWorkspaceHubs = initWorkspaceHubs;
  window.switchWorkspaceHub = switchWorkspaceHub;
  window.toggleCommandPalette = toggleCommandPalette;
  window.openCommandPalette = openCommandPalette;
  window.closeCommandPalette = closeCommandPalette;
  window.getCurrentWorkspaceHub = () => ({ ...hubState });
  window.WORKSPACE_HUBS_CONFIG = WORKSPACE_HUBS;

  // Tự động khởi tạo an toàn khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorkspaceHubs);
  } else {
    setTimeout(initWorkspaceHubs, 50);
  }

})(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : {});
