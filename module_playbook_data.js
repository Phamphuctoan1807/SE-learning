/**
 * SE SANCTUARY — EXECUTABLE CODE PLAYBOOK & ZERO-OVERLAP CAREER ENGINE
 * Module: module_playbook_data.js
 * Version: 2.0.0
 * Architecture: Single Source of Truth (SSOT)
 * 
 * 1. 11 Môn CORE_BASE UIT duy nhất (không trùng lặp).
 * 2. 50+ Môn Chuyên ngành UIT chuẩn hóa.
 * 3. 11 Hướng đi nghề nghiệp UIT (WAY_01_BACKEND đến WAY_11_QUANTUM).
 * 4. Hệ thống Điểm giao ngôn ngữ (START_L1, LANG_XOVER_1..4).
 * 5. Ma trận Điểm giao ngành nghề (CROSS_01..08).
 * 6. Thuật toán resolveCareerBridge(currentWay, targetWay, userCompletedIds).
 * 7. Bộ bài giảng Executable Code Playbooks chuẩn 4 tầng (mang2chieu.cpp, oop_ke_thua_da_hinh.cpp, ...).
 * 8. Bộ hàm API tra cứu tiện ích.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PLAYBOOK_DATA = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const CORE_BASE_SUBJECT_IDS = [
  "SE005",
  "IT001",
  "IT002",
  "SE117",
  "IT003",
  "IT012",
  "IT004",
  "IT007",
  "IT005",
  "SE104",
  "SE113"
];

  const SUPPORTED_LANGUAGES = {
  "CPP": {
    "id": "CPP",
    "name": "C / C++",
    "ext": ".cpp",
    "icon": "⚡",
    "description": "Nền tảng hiểu sâu quản lý bộ nhớ, con trỏ, cấu trúc dữ liệu và giải thuật hiệu năng cao."
  },
  "PYTHON": {
    "id": "PYTHON",
    "name": "Python",
    "ext": ".py",
    "icon": "🐍",
    "description": "Cú pháp tinh gọn, tối ưu cho AI, Khoa học dữ liệu, Scripting và Agentic Workflows."
  },
  "TS": {
    "id": "TS",
    "name": "TypeScript / JavaScript",
    "ext": ".ts",
    "icon": "🌐",
    "description": "Ngôn ngữ toàn năng cho Full-Stack Web, Front-End hiện đại và Bất đồng bộ Event Loop."
  },
  "JAVA_CS": {
    "id": "JAVA_CS",
    "name": "Java / C# .NET",
    "ext": ".cs",
    "icon": "🏢",
    "description": "Chuẩn mực công nghiệp cho kiến trúc doanh nghiệp lớn, hướng đối tượng chặt chẽ và ORM."
  },
  "GO_RUST": {
    "id": "GO_RUST",
    "name": "Go / Rust",
    "ext": ".go",
    "icon": "🦀",
    "description": "Tối ưu cho Microservices phân tán cao độ, xử lý đồng thời siêu nhẹ và an toàn bộ nhớ."
  }
};

  const LANGUAGE_CROSSOVERS = [
  {
    "id": "START_L1",
    "title": "Khởi đầu Nền tảng Ngôn ngữ L1",
    "trigger": "Bắt đầu môn IT001 (Nhập môn lập trình)",
    "transition": "Chọn L1 ∈ {C++, Python, TypeScript, Java/C#, Go/Rust}",
    "pairedPlaybook": "Khởi tạo toàn bộ kho Playbook nền tảng theo ngôn ngữ L1 đã chọn.",
    "rationale": "Hình thành tư duy logic thuật toán, luồng rẽ nhánh, vòng lặp và tổ chức mảng ô nhớ đầu tiên."
  },
  {
    "id": "LANG_XOVER_1",
    "title": "Điểm giao Bộ nhớ & Con trỏ RAM",
    "trigger": "Sau môn IT002 (Lập trình hướng đối tượng)",
    "transition": "L1 → L2 (C/C++ hoặc Rust để hiểu sâu RAM/Con trỏ)",
    "pairedPlaybook": "memory_pointer_playbook (So sánh quản lý vùng nhớ thủ công vs tự động Garbage Collection).",
    "rationale": "Hiểu cặn kẽ Stack vs Heap, Pointer, Reference, Virtual Table và triệt tiêu Memory Leak."
  },
  {
    "id": "LANG_XOVER_2",
    "title": "Điểm giao Hướng đối tượng Doanh nghiệp & CSDL",
    "trigger": "Sau môn IT004 (Cơ sở dữ liệu)",
    "transition": "L2 → L3 (C# .NET hoặc Java cho OOP & CSDL)",
    "pairedPlaybook": "db_oop_playbook (Kết nối CSDL, Transaction ACID và kiến trúc phân tầng Clean Architecture).",
    "rationale": "Chuyển giao từ code giải thuật đơn thuần sang cấu trúc dự án phần mềm chuyên nghiệp hướng module."
  },
  {
    "id": "LANG_XOVER_3",
    "title": "Điểm giao Web, UI & Bất đồng bộ",
    "trigger": "Trước môn SE347 (Web) hoặc SE114 (Mobile)",
    "transition": "L3 → L4 (TypeScript / JS cho Web & Bất đồng bộ)",
    "pairedPlaybook": "async_dom_playbook (Event Loop, Promise, async/await, DOM tree & Reactive UI State).",
    "rationale": "Làm chủ tư duy luồng đơn bất đồng bộ (Single-threaded Non-blocking I/O) và tương tác người dùng."
  },
  {
    "id": "LANG_XOVER_4",
    "title": "Điểm giao Hệ thống Phân tán & AI Tác nhân",
    "trigger": "Trước môn SE361 (Microservices) hoặc SE118 / SE373 (AI Agent)",
    "transition": "L4 → Ln (Go cho Microservices / Python cho AI Pipelines)",
    "pairedPlaybook": "concurrency_ai_playbook (Goroutines/Channels vs PyTorch/LangChain ReAct Loop).",
    "rationale": "Mở rộng quy mô xử lý hàng triệu requests song song hoặc điều phối LLM Agents tự hành."
  }
];

  const SUBJECTS = {
  "SE005": {
    "id": "SE005",
    "name": "Giới thiệu ngành Kỹ thuật Phần mềm",
    "isCoreBase": true,
    "credits": 3,
    "prerequisites": [],
    "description": "Tổng quan về ngành Kỹ thuật Phần mềm UIT, đạo đức nghề nghiệp, quy trình phát triển và công cụ quản trị mã nguồn Git.",
    "playbooks": [
      "SE005-PB01"
    ]
  },
  "IT001": {
    "id": "IT001",
    "name": "Nhập môn lập trình",
    "isCoreBase": true,
    "credits": 4,
    "prerequisites": [],
    "description": "Cơ sở tư duy giải thuật, kiểu dữ liệu, cấu trúc điều khiển, mảng 1D, mảng 2D (mang2chieu.cpp) và quản lý bộ nhớ nền tảng.",
    "playbooks": [
      "IT001-PB01"
    ]
  },
  "IT002": {
    "id": "IT002",
    "name": "Lập trình hướng đối tượng (OOP)",
    "isCoreBase": true,
    "credits": 4,
    "prerequisites": [
      "IT001"
    ],
    "description": "4 trụ cột OOP (Đóng gói, Kế thừa, Đa hình, Trừu tượng), con trỏ vtable, Virtual Destructors và thiết kế hướng đối tượng.",
    "playbooks": [
      "IT002-PB01"
    ]
  },
  "SE117": {
    "id": "SE117",
    "name": "Kỹ thuật lập trình",
    "isCoreBase": true,
    "credits": 3,
    "prerequisites": [
      "IT001"
    ],
    "description": "Kỹ thuật tối ưu hóa mã nguồn, con trỏ hàm, đệ quy nâng cao, cấp phát bộ nhớ động nhiều chiều và debug hệ thống.",
    "playbooks": []
  },
  "IT003": {
    "id": "IT003",
    "name": "Cấu trúc dữ liệu và giải thuật",
    "isCoreBase": true,
    "credits": 4,
    "prerequisites": [
      "IT002",
      "SE117"
    ],
    "description": "Danh sách liên kết, Stack, Queue, Cây nhị phân tìm kiếm (BST), Bảng băm (Hash Table) và các giải thuật tìm kiếm, sắp xếp O(n log n).",
    "playbooks": [
      "IT003-PB01"
    ]
  },
  "IT012": {
    "id": "IT012",
    "name": "Tổ chức & Cấu trúc Máy tính II",
    "isCoreBase": true,
    "credits": 3,
    "prerequisites": [
      "IT001"
    ],
    "description": "Kiến trúc tập lệnh MIPS/x86, phân tầng bộ nhớ Cache L1/L2/L3, Endianness, thao tác Bitwise và chuẩn dấu phẩy động IEEE 754.",
    "playbooks": [
      "IT012-PB01"
    ]
  },
  "IT004": {
    "id": "IT004",
    "name": "Cơ sở dữ liệu",
    "isCoreBase": true,
    "credits": 4,
    "prerequisites": [
      "IT001"
    ],
    "description": "Mô hình quan hệ (Relational Model), chuẩn hóa 1NF/2NF/3NF/BCNF, ngôn ngữ SQL nâng cao, Index B-Tree và Giao tác ACID.",
    "playbooks": [
      "IT004-PB01"
    ]
  },
  "IT007": {
    "id": "IT007",
    "name": "Hệ điều hành",
    "isCoreBase": true,
    "credits": 3,
    "prerequisites": [
      "IT012",
      "IT003"
    ],
    "description": "Quản lý tiến trình (Process), Đa luồng (Threads), Xung đột tài nguyên Race Condition, Đồng bộ Mutex/Semaphore và Bộ nhớ ảo Paging.",
    "playbooks": [
      "IT007-PB01"
    ]
  },
  "IT005": {
    "id": "IT005",
    "name": "Nhập môn mạng máy tính",
    "isCoreBase": true,
    "credits": 3,
    "prerequisites": [
      "IT012"
    ],
    "description": "Mô hình OSI & TCP/IP, phân tích gói tin, lập trình Socket TCP/UDP, giao thức tầng ứng dụng HTTP/HTTPS và định tuyến IP.",
    "playbooks": [
      "IT005-PB01"
    ]
  },
  "SE104": {
    "id": "SE104",
    "name": "Nhập môn Công nghệ Phần mềm",
    "isCoreBase": true,
    "credits": 3,
    "prerequisites": [
      "IT002",
      "IT004"
    ],
    "description": "Các mô hình phát triển phần mềm (Agile, Scrum, Waterfall), phân tích đặc tả yêu cầu, biểu đồ ca sử dụng UML và thiết kế hệ thống.",
    "playbooks": [
      "SE104-PB01"
    ]
  },
  "SE113": {
    "id": "SE113",
    "name": "Kiểm chứng phần mềm",
    "isCoreBase": true,
    "credits": 3,
    "prerequisites": [
      "SE104"
    ],
    "description": "Kiểm thử phần mềm tự động, Unit Test, Test-Driven Development (TDD), Boundary Value Analysis, Mocking và kiểm thử tích hợp.",
    "playbooks": [
      "SE104-PB01"
    ]
  },
  "IT008": {
    "id": "IT008",
    "name": "Lập trình trực quan",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT002"
    ],
    "description": "Thiết kế giao diện đồ họa GUI (WPF / WinForms / Modern Desktop), xử lý sự kiện Event-Driven và kiến trúc MVVM.",
    "playbooks": []
  },
  "SE100": {
    "id": "SE100",
    "name": "Phương pháp và Công cụ Phát triển Phần mềm",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE104"
    ],
    "description": "Áp dụng công cụ hiện đại: CI/CD, Containerization, Linting, SonarQube và quản lý quy trình kỹ nghệ dự án.",
    "playbooks": []
  },
  "SE102": {
    "id": "SE102",
    "name": "Nhập môn Phát triển Game",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT001"
    ],
    "description": "Tổng quan ngành công nghiệp Game, Game Loop, nguyên lý chuyển động 2D/3D và thiết kế Game Mechanics.",
    "playbooks": []
  },
  "SE109": {
    "id": "SE109",
    "name": "Quản trị Mạng và Hệ thống",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT005",
      "IT007"
    ],
    "description": "Cấu hình Server Linux/Windows, Quản trị dịch vụ mạng (DNS, DHCP, NGINX), Tường lửa và Giám sát máy chủ.",
    "playbooks": []
  },
  "SE114": {
    "id": "SE114",
    "name": "Lập trình ứng dụng trên thiết bị di động cơ bản",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT002"
    ],
    "description": "Cơ chế Activity/Fragment, vòng đời ứng dụng Mobile (Android/iOS), Layout responsive và lưu trữ dữ liệu local SQLite.",
    "playbooks": []
  },
  "SE115": {
    "id": "SE115",
    "name": "Lập trình Unity Engine cơ bản",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT002",
      "SE102"
    ],
    "description": "Kiến trúc Entity-Component, C# Scripting trong Unity, hệ thống vật lý Rigidbody và Prefab Management.",
    "playbooks": []
  },
  "SE116": {
    "id": "SE116",
    "name": "Thiết kế Game & Level Design",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE102"
    ],
    "description": "Xây dựng Game Design Document (GDD), bố cục màn chơi, cân bằng độ khó và tâm lý người chơi.",
    "playbooks": []
  },
  "SE118": {
    "id": "SE118",
    "name": "Phát triển ứng dụng tích hợp AI",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT003"
    ],
    "description": "Tích hợp mô hình AI/ML qua REST API, sử dụng OpenAI/Gemini SDKs, RAG Pipeline và Fine-tuning cơ bản.",
    "playbooks": []
  },
  "SE120": {
    "id": "SE120",
    "name": "Nhập môn Điện toán & Thuật toán Lượng tử",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT003"
    ],
    "description": "Khái niệm Qubit, Trạng thái chồng chập (Superposition), Vướng víu lượng tử (Entanglement) và Cổng lượng tử Hadamard/CNOT.",
    "playbooks": []
  },
  "SE214": {
    "id": "SE214",
    "name": "Đảm bảo chất lượng & An toàn phần mềm",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE113"
    ],
    "description": "Tiêu chuẩn ISO/IEC 25010, phòng chống lỗ hổng bảo mật OWASP Top 10, Static Code Analysis và bảo mật mã nguồn.",
    "playbooks": []
  },
  "SE215": {
    "id": "SE215",
    "name": "Thiết kế Giao diện & Trải nghiệm Người dùng (UI/UX)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE104"
    ],
    "description": "Quy trình Design Thinking, Wireframing, Figma Prototyping, Hệ thống màu sắc, Typography và Kiểm thử Usability.",
    "playbooks": []
  },
  "SE220": {
    "id": "SE220",
    "name": "Toán & Vật lý ứng dụng trong Game",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT001"
    ],
    "description": "Đại số tuyến tính (Vector, Ma trận xoay, Quaternions), phát hiện va chạm (AABB, OBB, Raycast) và trọng lực mô phỏng.",
    "playbooks": []
  },
  "MM225": {
    "id": "MM225",
    "name": "Đồ họa máy tính & Xử lý hình ảnh trong Game",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT003"
    ],
    "description": "Pipeline đồ họa OpenGL/DirectX, chiếu sáng đồ họa (Phong Shading), Render Mesh, Texture Mapping và Camera 3D.",
    "playbooks": []
  },
  "SE310": {
    "id": "SE310",
    "name": "Phát triển ứng dụng chuyên sâu với .NET Core / C#",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT002",
      "IT004"
    ],
    "description": "ASP.NET Core Web API, Entity Framework Core, Dependency Injection, JWT Authentication và kiến trúc phân tầng Clean Architecture.",
    "playbooks": []
  },
  "SE313": {
    "id": "SE313",
    "name": "Giải thuật nâng cao & Thuật toán thông minh",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT003"
    ],
    "description": "Quy hoạch động nâng cao, Thuật toán di truyền (Genetic Algorithm), Giải thuật tìm kiếm heuristic A* và Simulated Annealing.",
    "playbooks": []
  },
  "SE314": {
    "id": "SE314",
    "name": "Phát triển Game 3D & Shaders",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE115",
      "MM225"
    ],
    "description": "Lập trình Shaders (HLSL/GLSL), PBR Materials, hiệu ứng Post-Processing và tối ưu hóa Draw Calls trong môi trường 3D.",
    "playbooks": []
  },
  "SE315": {
    "id": "SE315",
    "name": "Lập trình Game Mạng & Multiplayer Online",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT005",
      "SE115"
    ],
    "description": "Kiến trúc Client-Server Game, Đồng bộ hóa vị trí (Dead Reckoning, Client Prediction), Lag Compensation và WebSockets/UDP.",
    "playbooks": []
  },
  "SE316": {
    "id": "SE316",
    "name": "Lập trình Game Di động Đa nền tảng",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE115"
    ],
    "description": "Tối ưu hóa bộ nhớ di động, Touch Controls, Monetization (Ads, In-App Purchase) và xuất bản lên Google Play / App Store.",
    "playbooks": []
  },
  "SE317": {
    "id": "SE317",
    "name": "Trí tuệ nhân tạo trong Game (Game AI)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE115",
      "SE313"
    ],
    "description": "Cây hành vi (Behavior Trees), Máy trạng thái hữu hạn (FSM), Hệ thống NavMesh Pathfinding và AI đối kháng.",
    "playbooks": []
  },
  "SE327": {
    "id": "SE327",
    "name": "Tối ưu hóa hiệu năng & Đồ họa Game",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE314"
    ],
    "description": "Phân tích Profile CPU/GPU, Occlusion Culling, LOD (Level of Detail), Quản lý bộ nhớ Object Pooling và giảm nhiệt thiết bị.",
    "playbooks": []
  },
  "SE330": {
    "id": "SE330",
    "name": "Phát triển ứng dụng doanh nghiệp với Java Spring Boot",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT002",
      "IT004"
    ],
    "description": "Spring Boot MVC, Spring Data JPA/Hibernate, Spring Security, Quản lý giao tác nâng cao và RESTful API chuẩn Enterprise.",
    "playbooks": []
  },
  "SE332": {
    "id": "SE332",
    "name": "Hệ Quản trị CSDL Nâng cao & Tối ưu hóa Truy vấn",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT004"
    ],
    "description": "Query Optimizer Plan, Phân vùng dữ liệu (Partitioning), Sharding, CSDL NoSQL (MongoDB, Redis) và Quản lý đồng thời đa phiên bản (MVCC).",
    "playbooks": []
  },
  "SE334": {
    "id": "SE334",
    "name": "Thiết kế & Xây dựng RESTful API / gRPC",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT004",
      "IT005"
    ],
    "description": "Chuẩn thiết kế API OpenAPI/Swagger, Rate Limiting, Streaming gRPC Protocol Buffers và kiến trúc API Gateway.",
    "playbooks": []
  },
  "SE344": {
    "id": "SE344",
    "name": "Kiểm thử & Đảm bảo chất lượng Game (Game QA)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE113",
      "SE102"
    ],
    "description": "Kiểm thử Gameplay, Collision Glitch Testing, Stress Testing phòng tải server và kịch bản tự động hóa Automation QA trong Game.",
    "playbooks": []
  },
  "SE346": {
    "id": "SE346",
    "name": "Lập trình di động nâng cao (Flutter / Native)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE114"
    ],
    "description": "Kiến trúc State Management (BLoC / Riverpod / Redux), Background Tasks, Push Notifications, Offline-First Sync và Native FFI interop.",
    "playbooks": []
  },
  "SE347": {
    "id": "SE347",
    "name": "Phát triển ứng dụng Web chuyên sâu (React / Next.js)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT004",
      "IT008"
    ],
    "description": "Server-Side Rendering (SSR), Static Site Generation (SSG), React Server Components, TypeScript và tối ưu Core Web Vitals.",
    "playbooks": []
  },
  "SE352": {
    "id": "SE352",
    "name": "Thực tế ảo & Thực tế tăng cường (VR / AR / XR)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE314"
    ],
    "description": "Phát triển ứng dụng không gian 3D với Unity XR Interaction Toolkit, Apple ARKit, Google ARCore và Meta Quest SDK.",
    "playbooks": []
  },
  "SE356": {
    "id": "SE356",
    "name": "Kiến trúc phần mềm doanh nghiệp & Giải pháp hệ thống",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE100",
      "SE310"
    ],
    "description": "Kiến trúc Domain-Driven Design (DDD), Event-Driven Architecture (EDA), CQRS & Event Sourcing và Solution Architecture Manifesto.",
    "playbooks": []
  },
  "SE357": {
    "id": "SE357",
    "name": "Phân tích nghiệp vụ & Quản lý yêu cầu phần mềm (BA)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE104"
    ],
    "description": "Kỹ thuật khơi gợi yêu cầu (Requirements Elicitation), User Story Mapping, Mô hình hóa quy trình BPMN và tiêu chuẩn chấp nhận Acceptance Criteria.",
    "playbooks": []
  },
  "SE358": {
    "id": "SE358",
    "name": "Quản trị dự án phần mềm theo Agile / Scrum",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE104"
    ],
    "description": "Lập kế hoạch Sprint, Quản lý rủi ro dự án, Đo lường Velocity/Burndown Chart, Công cụ Jira và kỹ năng lãnh đạo Servant Leadership.",
    "playbooks": []
  },
  "SE359": {
    "id": "SE359",
    "name": "Quy trình CI/CD & Tự động hóa Hạ tầng DevOps",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT007",
      "SE100"
    ],
    "description": "Xây dựng Pipeline tự động với GitHub Actions / GitLab CI, Docker Containerization, Kubernetes Orchestration và Terraform IaC.",
    "playbooks": []
  },
  "SE360": {
    "id": "SE360",
    "name": "Điện toán đám mây & Kiến trúc Cloud-Native",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT005",
      "IT007"
    ],
    "description": "Dịch vụ đám mây AWS / GCP / Azure, Serverless Functions, S3 Object Storage, Load Balancer, Autoscaling và Well-Architected Framework.",
    "playbooks": []
  },
  "SE361": {
    "id": "SE361",
    "name": "Kiến trúc Microservices & Hệ thống Phân tán",
    "isCoreBase": false,
    "credits": 4,
    "prerequisites": [
      "IT007",
      "SE334"
    ],
    "description": "Hệ thống phân tán cao độ, Service Discovery, Saga Pattern xử lý phân tán, Circuit Breaker phòng thủ sụp đổ và Apache Kafka.",
    "playbooks": [
      "SE361-PB01"
    ]
  },
  "SE362": {
    "id": "SE362",
    "name": "An toàn ứng dụng & Kiểm thử bảo mật DevSecOps",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE214",
      "SE359"
    ],
    "description": "Tích hợp SAST/DAST vào CI/CD, Container Image Scanning, Quản lý khóa bí mật Vault, Pentesting cơ bản và phòng thủ tấn công mạng.",
    "playbooks": []
  },
  "SE363": {
    "id": "SE363",
    "name": "Kỹ thuật Dữ liệu lớn & Xử lý phân tán (Big Data)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE332"
    ],
    "description": "Xử lý hàng loạt và xử lý dòng với Apache Spark, Hadoop HDFS, Kafka Streams, Data Lakehouse và tối ưu bộ nhớ phân tán.",
    "playbooks": []
  },
  "SE364": {
    "id": "SE364",
    "name": "Kỹ thuật tương tác Front-End hiện đại & Design Systems",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT008",
      "SE215"
    ],
    "description": "Xây dựng Design System dùng chung, Web Accessibility (a11y), CSS Architecture (Tailwind/Tokens), Micro-Frontends và Motion UX.",
    "playbooks": []
  },
  "SE365": {
    "id": "SE365",
    "name": "Học sâu ứng dụng & Mô hình sinh (Deep Learning)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE118"
    ],
    "description": "Mạng Nơ-ron sâu CNN, RNN, Transformers Attention Mechanism, Diffusion Models và huấn luyện với PyTorch.",
    "playbooks": []
  },
  "SE366": {
    "id": "SE366",
    "name": "Ngôn ngữ lập trình lượng tử Qiskit & Cirq",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE120"
    ],
    "description": "Lập trình mạch lượng tử thực tế trên máy tính lượng tử của IBM qua thư viện Qiskit và Google Cirq, mô phỏng đo đạc xác suất.",
    "playbooks": []
  },
  "SE367": {
    "id": "SE367",
    "name": "Hệ thống Đa tác nhân (Multi-Agent Systems)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE118"
    ],
    "description": "Điều phối đội ngũ tác nhân AI phân quyền (CrewAI, LangGraph, AutoGen), giao tiếp liên tác nhân Agent-to-Agent và giải quyết nhiệm vụ phức hợp.",
    "playbooks": []
  },
  "SE368": {
    "id": "SE368",
    "name": "Kỹ nghệ phần mềm với AI (Vibe Coding)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE100"
    ],
    "description": "Kỹ năng lập trình cộng tác cùng AI (Copilot, Claude, Cursor), kỹ nghệ Prompting bậc thầy, sinh mã nguồn nhanh và kiểm chứng chất lượng mã.",
    "playbooks": []
  },
  "SE370": {
    "id": "SE370",
    "name": "Kinh tế học & Phát triển Game Web3 / Blockchain",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE102"
    ],
    "description": "Thiết kế Game Economy cân bằng, Smart Contracts tương tác tài sản trong game, Tokenomics và tích hợp ví Web3.",
    "playbooks": []
  },
  "SE373": {
    "id": "SE373",
    "name": "Kỹ nghệ Agentic AI & Vòng lặp ReAct",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE118"
    ],
    "description": "Kiến trúc Agentic AI hoàn chỉnh: Vòng lặp suy luận ReAct (Thought-Action-Observation), Tool Calling, Bộ nhớ ngắn/dài hạn và Lập kế hoạch tự chủ.",
    "playbooks": [
      "SE373-PB01"
    ]
  },
  "SE374": {
    "id": "SE374",
    "name": "Triển khai & Giám sát Hệ thống Agentic AI (LLMOps)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE373"
    ],
    "description": "Vận hành và giám sát Agent trong môi trường production, Đánh giá chất lượng sinh mã, Giảm thiểu Hallucination và Quản lý chi phí Token.",
    "playbooks": []
  },
  "SE375": {
    "id": "SE375",
    "name": "Học máy lượng tử & Tối ưu hóa tổ hợp (QML)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE120",
      "SE366"
    ],
    "description": "Thuật toán VQE (Variational Quantum Eigensolver), QAOA giải bài toán tối ưu hóa tổ hợp NP-Hard và phân loại dữ liệu lượng tử Quantum SVM.",
    "playbooks": []
  },
  "SE400": {
    "id": "SE400",
    "name": "Đồ án nghiên cứu & ứng dụng Lượng tử thực nghiệm",
    "isCoreBase": false,
    "credits": 4,
    "prerequisites": [
      "SE375"
    ],
    "description": "Thực hiện đề tài nghiên cứu hoặc phần mềm ứng dụng thực chứng trên phần cứng máy tính lượng tử thực tế qua nền tảng Cloud.",
    "playbooks": []
  },
  "SE406": {
    "id": "SE406",
    "name": "Design Patterns nâng cao & Refactoring mã nguồn sạch",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT002",
      "SE100"
    ],
    "description": "23 Mẫu thiết kế GoF thực chiến, Nguyên lý SOLID chuyên sâu, Kỹ thuật Refactoring mã nguồn có kiểm thử bảo vệ và Architecture Smells.",
    "playbooks": []
  },
  "SE407": {
    "id": "SE407",
    "name": "Lập trình ứng dụng IoT & Thiết bị thông minh nhúng",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "IT005",
      "IT012"
    ],
    "description": "Giao thức MQTT/CoAP cho thiết bị hạn chế tài nguyên, tương tác phần cứng cảm biến vi điều khiển và xử lý Edge Computing.",
    "playbooks": []
  },
  "SE408": {
    "id": "SE408",
    "name": "Phát hành & Vận hành Game Trực tuyến (LiveOps)",
    "isCoreBase": false,
    "credits": 3,
    "prerequisites": [
      "SE315"
    ],
    "description": "Chiến lược vận hành LiveOps, A/B Testing tính năng, Game Analytics dữ liệu hành vi người chơi, vá lỗi nóng (Hotfix) và quản lý Server quy mô lớn.",
    "playbooks": []
  },
  "SE409": {
    "id": "SE409",
    "name": "Đồ án phát triển Game Capstone Project",
    "isCoreBase": false,
    "credits": 4,
    "prerequisites": [
      "SE314",
      "SE315"
    ],
    "description": "Sản xuất trọn vẹn một tựa Game thương mại hoàn chỉnh theo nhóm từ khâu lên ý tưởng GDD, lập trình, kiểm thử đến xuất bản.",
    "playbooks": []
  },
  "SS004": {
    "id": "SS004",
    "name": "Giao tiếp & Kỹ năng Đàm phán trong Dự án Phần mềm",
    "isCoreBase": false,
    "credits": 2,
    "prerequisites": [
      "SE005"
    ],
    "description": "Kỹ năng thuyết trình giải pháp kỹ thuật, đàm phán phạm vi dự án với khách hàng, quản lý kỳ vọng các bên liên quan (Stakeholder Management).",
    "playbooks": []
  }
};

  const CAREER_WAYS = {
  "WAY_01_BACKEND": {
    "id": "WAY_01_BACKEND",
    "code": "WAY_01",
    "name": "Kỹ sư Backend & Kiến trúc Hệ thống",
    "roleTitle": "Backend & Distributed Systems Architect",
    "icon": "⚙️",
    "summary": "Thiết kế, xây dựng và tối ưu các hệ thống dịch vụ phía máy chủ chịu tải cao, kiến trúc phân tán Microservices, cơ sở dữ liệu lớn và giao tiếp mạng tin cậy.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "SE100",
      "SE310",
      "SE330",
      "SE334",
      "SE332",
      "SE361",
      "SE356",
      "SE406"
    ],
    "keySkills": [
      "RESTful API & gRPC",
      "Microservices & Saga",
      "High Concurrency",
      "Database Tuning & Sharding",
      "Design Patterns"
    ],
    "typicalJobs": [
      "Backend Engineer",
      "System Architect",
      "API Specialist",
      "Enterprise Software Engineer"
    ]
  },
  "WAY_02_FULLSTACK": {
    "id": "WAY_02_FULLSTACK",
    "code": "WAY_02",
    "name": "Kỹ sư Full-Stack Web & Product",
    "roleTitle": "Full-Stack Web & Product Engineer",
    "icon": "🚀",
    "summary": "Phát triển toàn diện từ giao diện người dùng hiện đại, trải nghiệm tương tác mượt mà đến API máy chủ, cơ sở dữ liệu và triển khai Cloud-Native.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "IT008",
      "SE100",
      "SE347",
      "SE364",
      "SE310",
      "SE330",
      "SE360",
      "SE368"
    ],
    "keySkills": [
      "React & Next.js SSR",
      "State Management & Tokens",
      "Backend API Integration",
      "Cloud Deployment",
      "AI-Augmented Coding"
    ],
    "typicalJobs": [
      "Full-Stack Developer",
      "Product Engineer",
      "Web Applications Architect",
      "Technical Lead"
    ]
  },
  "WAY_03_MOBILE": {
    "id": "WAY_03_MOBILE",
    "code": "WAY_03",
    "name": "Kỹ sư Di động & Đa thiết bị",
    "roleTitle": "Mobile & Multi-Device Application Engineer",
    "icon": "📱",
    "summary": "Xây dựng các ứng dụng di động hiệu năng cao trên Android, iOS và đa nền tảng, cơ chế đồng bộ ngoại tuyến Offline-First và trải nghiệm chạm vuốt đỉnh cao.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "IT008",
      "SE114",
      "SE215",
      "SE346",
      "SE364",
      "SE360",
      "SE407"
    ],
    "keySkills": [
      "Flutter & Native Interop",
      "Offline Sync & Local DB",
      "Mobile UI/UX Micro-Interactions",
      "Cloud Push & IoT"
    ],
    "typicalJobs": [
      "Mobile Software Engineer",
      "Flutter/React Native Lead",
      "iOS/Android Native Developer"
    ]
  },
  "WAY_04_DEVOPS": {
    "id": "WAY_04_DEVOPS",
    "code": "WAY_04",
    "name": "Kỹ sư DevOps, Cloud & SRE",
    "roleTitle": "Cloud Infrastructure, DevOps & Site Reliability Engineer",
    "icon": "☁️",
    "summary": "Tự động hóa toàn bộ vòng đời phát triển phần mềm, xây dựng đường ống CI/CD, điều phối Container Kubernetes và bảo đảm tính sẵn sàng 99.99% cho hệ thống.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "SE109",
      "SE359",
      "SE360",
      "SE361",
      "SE362"
    ],
    "keySkills": [
      "CI/CD Automation",
      "Docker & Kubernetes",
      "Infrastructure as Code (IaC)",
      "Cloud Reliability & Monitoring",
      "DevSecOps"
    ],
    "typicalJobs": [
      "DevOps Engineer",
      "Cloud Solutions Architect",
      "Site Reliability Engineer (SRE)",
      "Platform Engineer"
    ]
  },
  "WAY_05_DATA": {
    "id": "WAY_05_DATA",
    "code": "WAY_05",
    "name": "Kỹ sư Dữ liệu & Hệ thống Big Data",
    "roleTitle": "Data Platform & Big Data Systems Engineer",
    "icon": "📊",
    "summary": "Xây dựng hạ tầng xử lý dữ liệu lớn theo thời gian thực và hàng loạt, tối ưu hóa lưu trữ phân tán, đường ống ETL và Data Lakehouse cho doanh nghiệp.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "SE332",
      "SE313",
      "SE363",
      "SE360",
      "SE361"
    ],
    "keySkills": [
      "Apache Spark & Streaming",
      "Advanced SQL Optimization",
      "Distributed Storage & Kafka",
      "Data Lakehouse Design",
      "Heuristic Algorithms"
    ],
    "typicalJobs": [
      "Data Engineer",
      "Big Data Architect",
      "Data Infrastructure Lead",
      "ETL Pipeline Developer"
    ]
  },
  "WAY_06_AI_AGENT": {
    "id": "WAY_06_AI_AGENT",
    "code": "WAY_06",
    "name": "Kỹ sư AI Phần mềm & Agentic AI",
    "roleTitle": "Agentic AI & Intelligent Systems Engineer",
    "icon": "🤖",
    "summary": "Phát triển thế hệ phần mềm thông minh tự hành với tác nhân AI, điều phối chuỗi suy luận ReAct, Tool Calling, RAG nâng cao và giám sát LLMOps.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "SE313",
      "SE118",
      "SE365",
      "SE367",
      "SE373",
      "SE374"
    ],
    "keySkills": [
      "Agentic AI & ReAct Loop",
      "Tool Calling & Memory",
      "Multi-Agent Orchestration",
      "Deep Learning Transformers",
      "LLMOps & Guardrails"
    ],
    "typicalJobs": [
      "AI Software Engineer",
      "Agentic Systems Architect",
      "GenAI Application Specialist",
      "Machine Learning Engineer"
    ]
  },
  "WAY_07_QA_SEC": {
    "id": "WAY_07_QA_SEC",
    "code": "WAY_07",
    "name": "Kỹ sư QA Automation & An toàn PM",
    "roleTitle": "Software Quality Assurance & Application Security Engineer",
    "icon": "🛡️",
    "summary": "Bảo vệ độ tin cậy và an ninh tuyệt đối cho sản phẩm thông qua kiểm thử tự động toàn diện, rà soát lỗ hổng bảo mật OWASP và tích hợp an toàn DevSecOps.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "SE109",
      "SE214",
      "SE359",
      "SE362"
    ],
    "keySkills": [
      "Automated E2E Testing",
      "OWASP Top 10 Mitigation",
      "Static/Dynamic Code Analysis (SAST/DAST)",
      "CI/CD Quality Gates",
      "Penetration Testing"
    ],
    "typicalJobs": [
      "QA Automation Lead",
      "Application Security Engineer",
      "DevSecOps Specialist",
      "Security Auditor"
    ]
  },
  "WAY_08_UIUX_XR": {
    "id": "WAY_08_UIUX_XR",
    "code": "WAY_08",
    "name": "Kỹ sư Giao diện, Tương tác Người-Máy & XR",
    "roleTitle": "Human-Computer Interaction, UI/UX & XR Engineer",
    "icon": "🎨",
    "summary": "Kiến tạo các không gian tương tác số đột phá từ Web Front-End mượt mà đến ứng dụng không gian 3D, Thực tế ảo (VR) và Thực tế tăng cường (AR).",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "IT008",
      "SE215",
      "SE364",
      "SE347",
      "SE352",
      "SE368"
    ],
    "keySkills": [
      "Design System & a11y",
      "Micro-Interactions & Motion",
      "3D Spatial Computing",
      "Web & XR Interoperability",
      "Usability Testing"
    ],
    "typicalJobs": [
      "Creative Technologist",
      "Design Technologist",
      "Front-End Architect",
      "Spatial Computing / XR Developer"
    ]
  },
  "WAY_09_BA_PM_ARCH": {
    "id": "WAY_09_BA_PM_ARCH",
    "code": "WAY_09",
    "name": "Kỹ sư BA, Quản lý Dự án & Solution Architect",
    "roleTitle": "Business Analyst, Agile PM & Solution Architect",
    "icon": "📐",
    "summary": "Cầu nối chiến lược giữa kinh doanh và công nghệ: phân tích nghiệp vụ chuyên sâu, điều phối dự án Agile/Scrum linh hoạt và kiến tạo giải pháp phần mềm tổng thể.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "SE357",
      "SE215",
      "SE358",
      "SE214",
      "SE356",
      "SS004"
    ],
    "keySkills": [
      "Business Analysis & BPMN",
      "Agile & Scrum Leadership",
      "Enterprise Architecture (DDD)",
      "Quality & Risk Governance",
      "Stakeholder Negotiation"
    ],
    "typicalJobs": [
      "Technical Product Manager",
      "Business Analyst (BA)",
      "Scrum Master / Agile Coach",
      "Solution Architect"
    ]
  },
  "WAY_10_GAME": {
    "id": "WAY_10_GAME",
    "code": "WAY_10",
    "name": "Kỹ sư Phát triển Game Chuyên nghiệp",
    "roleTitle": "Professional Game Developer & Graphics Engineer",
    "icon": "🎮",
    "summary": "Lập trình các tựa game sống động với engine đồ họa tiên tiến (Unity/Unreal), mô phỏng vật lý chân thực, mạng nhiều người chơi và tối ưu hiệu năng tối đa.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "SE102",
      "SE115",
      "SE116",
      "SE220",
      "MM225",
      "SE314",
      "SE315",
      "SE316",
      "SE344",
      "SE370",
      "SE317",
      "SE327",
      "SE408",
      "SE409"
    ],
    "keySkills": [
      "Game Engine Scripting (C# / C++)",
      "3D Mathematics & Physics Simulation",
      "Shader Programming (HLSL)",
      "Multiplayer Sync & Netcode",
      "Profiling & Draw Call Optimization"
    ],
    "typicalJobs": [
      "Game Gameplay Programmer",
      "Graphics / Shader Engineer",
      "Game Engine Specialist",
      "Multiplayer Netcode Engineer"
    ]
  },
  "WAY_11_QUANTUM": {
    "id": "WAY_11_QUANTUM",
    "code": "WAY_11",
    "name": "Kỹ sư Phần mềm & Học máy Lượng tử",
    "roleTitle": "Quantum Software & Quantum Machine Learning Engineer",
    "icon": "⚛️",
    "summary": "Tiên phong trong kỷ nguyên điện toán tương lai: thiết kế thuật toán lượng tử, lập trình mạch Qiskit và giải quyết các bài toán tối ưu hóa tổ hợp vượt giới hạn cổ điển.",
    "coreSubjectIds": [
      "SE005",
      "IT001",
      "IT002",
      "SE117",
      "IT003",
      "IT012",
      "IT004",
      "IT007",
      "IT005",
      "SE104",
      "SE113"
    ],
    "specializedSubjectIds": [
      "SE120",
      "SE366",
      "SE375",
      "SE400"
    ],
    "keySkills": [
      "Quantum Circuit Programming (Qiskit)",
      "Superposition & Entanglement",
      "Quantum Machine Learning (VQE / QAOA)",
      "Hybrid Quantum-Classical Computing"
    ],
    "typicalJobs": [
      "Quantum Software Developer",
      "Quantum Algorithm Researcher",
      "Quantum Computing Consultant"
    ]
  }
};

  const CAREER_CROSSOVERS = [
  {
    "id": "CROSS_01",
    "fromWay": "WAY_01_BACKEND",
    "toWay": "WAY_02_FULLSTACK",
    "title": "Backend chuyển sang Full-Stack Web & Product",
    "sharedSubjectsNote": "CORE_BASE + SE100, SE310 / SE330",
    "bridgeSubjectIds": [
      "IT008",
      "SE347",
      "SE364",
      "SE360",
      "SE368"
    ],
    "summary": "Kỹ sư Backend bổ sung thêm giao diện trực quan, React/Next.js, Front-End Design Systems, Cloud và AI Coding."
  },
  {
    "id": "CROSS_02",
    "fromWay": "WAY_02_FULLSTACK",
    "toWay": "WAY_01_BACKEND",
    "title": "Full-Stack chuyển sâu vào Backend & Kiến trúc Hệ thống",
    "sharedSubjectsNote": "CORE_BASE + SE100, SE310 / SE330",
    "bridgeSubjectIds": [
      "SE334",
      "SE332",
      "SE361",
      "SE356",
      "SE406"
    ],
    "summary": "Kỹ sư Full-Stack đào sâu vào REST/gRPC chuyên sâu, tối ưu CSDL nâng cao, Microservices và Enterprise Architecture."
  },
  {
    "id": "CROSS_03",
    "fromWay": "WAY_01_BACKEND",
    "toWay": "WAY_04_DEVOPS",
    "title": "Backend chuyển sang DevOps, Cloud & SRE",
    "sharedSubjectsNote": "CORE_BASE + SE361",
    "bridgeSubjectIds": [
      "SE109",
      "SE359",
      "SE360",
      "SE362"
    ],
    "summary": "Kỹ sư Backend làm chủ quản trị mạng Linux, đường ống CI/CD, đám mây Cloud-Native và kiểm thử bảo mật DevSecOps."
  },
  {
    "id": "CROSS_04",
    "fromWay": "WAY_01_BACKEND",
    "toWay": "WAY_05_DATA",
    "title": "Backend chuyển sang Dữ liệu lớn & Big Data",
    "sharedSubjectsNote": "CORE_BASE + SE332, SE361",
    "bridgeSubjectIds": [
      "SE313",
      "SE363",
      "SE360"
    ],
    "summary": "Kỹ sư Backend tiếp cận thuật toán thông minh, nền tảng phân tán Apache Spark và kiến trúc Data Lakehouse."
  },
  {
    "id": "CROSS_05",
    "fromWay": "WAY_01_BACKEND",
    "toWay": "WAY_06_AI_AGENT",
    "title": "Backend / Full-Stack chuyển sang Kỹ sư AI & Agentic AI",
    "sharedSubjectsNote": "CORE_BASE",
    "bridgeSubjectIds": [
      "SE313",
      "SE118",
      "SE365",
      "SE367",
      "SE373",
      "SE374"
    ],
    "summary": "Nắm vững chu trình học sâu, tích hợp ứng dụng AI, vòng lặp ReAct, đa tác nhân Multi-Agent và triển khai LLMOps."
  },
  {
    "id": "CROSS_06",
    "fromWay": "WAY_05_DATA",
    "toWay": "WAY_06_AI_AGENT",
    "title": "Kỹ sư Dữ liệu nâng cấp lên AI Phần mềm & Agentic AI",
    "sharedSubjectsNote": "CORE_BASE + SE313",
    "bridgeSubjectIds": [
      "SE118",
      "SE365",
      "SE367",
      "SE373",
      "SE374"
    ],
    "summary": "Tận dụng nền tảng xử lý dữ liệu và thuật toán để phát triển các mô hình học sâu, Multi-Agent và Agentic Workflows."
  },
  {
    "id": "CROSS_07",
    "fromWay": "WAY_02_FULLSTACK",
    "toWay": "WAY_03_MOBILE",
    "title": "Full-Stack mở rộng sang Kỹ sư Di động Đa thiết bị",
    "sharedSubjectsNote": "CORE_BASE + IT008, SE364, SE360",
    "bridgeSubjectIds": [
      "SE114",
      "SE215",
      "SE346",
      "SE407"
    ],
    "summary": "Chuyển giao tư duy Web sang ứng dụng di động bản địa, Flutter nâng cao, UI/UX di động và tích hợp thiết bị IoT."
  },
  {
    "id": "CROSS_08",
    "fromWay": "WAY_07_QA_SEC",
    "toWay": "WAY_04_DEVOPS",
    "title": "Kỹ sư QA & An toàn PM chuyển sang DevOps & SRE",
    "sharedSubjectsNote": "CORE_BASE + SE109, SE359, SE362",
    "bridgeSubjectIds": [
      "SE360",
      "SE361"
    ],
    "summary": "Tận dụng kinh nghiệm kiểm thử và an ninh để hoàn thiện kỹ năng Cloud-Native và Kiến trúc Microservices phân tán."
  }
];

  const PLAYBOOKS = [
  {
    "id": "IT001-PB01",
    "subjectId": "IT001",
    "title": "Mảng 2 Chiều & Ma Trận Chuẩn mang2chieu.cpp",
    "category": "Cốt lõi Lập trình",
    "filenameByLang": {
      "CPP": "mang2chieu.cpp",
      "PYTHON": "mang2chieu.py",
      "TS": "mang2chieu.ts"
    },
    "sourceCodeByLang": {
      "CPP": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\n// ============================================================================\n// TẦNG 1: KHAI BÁO HẰNG SỐ, KIỂU DỮ LIỆU & CẤU TRÚC (SETUP & TYPE DEFINITIONS)\n// ============================================================================\n// Lý do kỹ thuật: Cố định kích thước ma trận tối đa giúp trình biên dịch cấp phát\n// bộ nhớ tĩnh liên tục trong Stack, tránh phân mảnh bộ nhớ và tối ưu cache L1/L2 CPU.\nconst int MAX_ROWS = 4;\nconst int MAX_COLS = 4;\ntypedef int Array2d[MAX_ROWS][MAX_COLS];\n\n// ============================================================================\n// TẦNG 2: CHUỖI HÀM THAO TÁC TỪ CƠ BẢN ĐẾN BIẾN THỂ (PROGRESSIVE ACTION FUNCTIONS)\n// ============================================================================\n\n// 1. Xuất ma trận 2 chiều dạng bảng lưới căn chỉnh đẹp mắt\nvoid printArray2d(const Array2d arr, int rows, int cols) {\n    for (int i = 0; i < rows; ++i) {\n        for (int j = 0; j < cols; ++j) {\n            cout << setw(5) << arr[i][j] << \" \";\n        }\n        cout << \"\\n\";\n    }\n}\n\n// 2. Tìm phần tử lớn nhất (Max) và nhỏ nhất (Min) trên toàn bộ ma trận\nvoid findMaxMinIn2dArray(const Array2d arr, int rows, int cols, int& maxVal, int& minVal) {\n    maxVal = arr[0][0];\n    minVal = arr[0][0];\n    for (int i = 0; i < rows; ++i) {\n        for (int j = 0; j < cols; ++j) {\n            if (arr[i][j] > maxVal) maxVal = arr[i][j];\n            if (arr[i][j] < minVal) minVal = arr[i][j];\n        }\n    }\n}\n\n// 3. Tìm Max và Min trên một hàng chỉ định (rowIndex)\nvoid findMaxMinInRow(const Array2d arr, int rowIndex, int cols, int& maxVal, int& minVal) {\n    maxVal = arr[rowIndex][0];\n    minVal = arr[rowIndex][0];\n    for (int j = 1; j < cols; ++j) {\n        if (arr[rowIndex][j] > maxVal) maxVal = arr[rowIndex][j];\n        if (arr[rowIndex][j] < minVal) minVal = arr[rowIndex][j];\n    }\n}\n\n// 4. Tìm Max và Min trên một cột chỉ định (colIndex)\nvoid findMaxMinInColumn(const Array2d arr, int colIndex, int rows, int& maxVal, int& minVal) {\n    maxVal = arr[0][colIndex];\n    minVal = arr[0][colIndex];\n    for (int i = 1; i < rows; ++i) {\n        if (arr[i][colIndex] > maxVal) maxVal = arr[i][colIndex];\n        if (arr[i][colIndex] < minVal) minVal = arr[i][colIndex];\n    }\n}\n\n// 5. Tính tổng toàn bộ các phần tử trong ma trận\nint sumOf2dArray(const Array2d arr, int rows, int cols) {\n    int total = 0;\n    for (int i = 0; i < rows; ++i) {\n        for (int j = 0; j < cols; ++j) {\n            total += arr[i][j];\n        }\n    }\n    return total;\n}\n\n// 6. Tìm kiếm giá trị target trong ma trận, trả về tọa độ (foundRow, foundCol)\nbool searchIn2dArray(const Array2d arr, int rows, int cols, int target, int& foundRow, int& foundCol) {\n    for (int i = 0; i < rows; ++i) {\n        for (int j = 0; j < cols; ++j) {\n            if (arr[i][j] == target) {\n                foundRow = i;\n                foundCol = j;\n                return true;\n            }\n        }\n    }\n    foundRow = -1;\n    foundCol = -1;\n    return false;\n}\n\n// ============================================================================\n// TẦNG 3: CHÚ THÍCH KỸ THUẬT & ĐIỂM NEO TÙY BIẾN (INLINE NOTES & CUSTOM HOOK)\n// ============================================================================\n// Lưu ý kỹ thuật: Trong C/C++, mảng 2 chiều được trải phẳng trong bộ nhớ theo thứ tự dòng (Row-Major Order).\n// Địa chỉ ô nhớ: &arr[i][j] = BaseAddress + (i * MAX_COLS + j) * sizeof(int).\n// Do đó khi truyền tham số vào hàm, số cột MAX_COLS bắt buộc phải là hằng số cố định.\n\nvoid filterElements(const Array2d arr, int rows, int cols) {\n    cout << \"Cac phan tu thoa man dieu kien loc: \";\n    for (int i = 0; i < rows; ++i) {\n        for (int j = 0; j < cols; ++j) {\n            // Thay điều kiện ở đây để xuất/lọc các phần tử theo yêu cầu (Ví dụ: arr[i][j] % 2 == 0)\n            if (arr[i][j] % 2 == 0) {\n                cout << arr[i][j] << \" \";\n            }\n        }\n    }\n    cout << \"\\n\";\n}\n\n// ============================================================================\n// TẦNG 4: HÀM MAIN() KIỂM CHỨNG TOÀN DIỆN (SELF-CONTAINED VERIFICATION DRIVER)\n// ============================================================================\nint main() {\n    int rows = 3, cols = 3;\n    Array2d matrix = {\n        { 12,  5, 27 },\n        {  8, 44, 19 },\n        { 31,  2, 16 }\n    };\n\n    cout << \"=== Xuat Mang 2 Chieu ===\" << \"\\n\";\n    printArray2d(matrix, rows, cols);\n\n    int globalMax, globalMin;\n    findMaxMinIn2dArray(matrix, rows, cols, globalMax, globalMin);\n    cout << \"\\n=== Max Min Toan Bo Mang ===\" << \"\\n\";\n    cout << \"Max: \" << globalMax << \" | Min: \" << globalMin << \"\\n\";\n\n    int rowMax, rowMin;\n    findMaxMinInRow(matrix, 1, cols, rowMax, rowMin);\n    cout << \"\\n=== Max Min Hang 1 (Index 1) ===\" << \"\\n\";\n    cout << \"Hang 1 -> Max: \" << rowMax << \" | Min: \" << rowMin << \"\\n\";\n\n    int colMax, colMin;\n    findMaxMinInColumn(matrix, 0, rows, colMax, colMin);\n    cout << \"\\n=== Max Min Cot 0 (Index 0) ===\" << \"\\n\";\n    cout << \"Cot 0 -> Max: \" << colMax << \" | Min: \" << colMin << \"\\n\";\n\n    cout << \"\\n=== Tong Toan Bo Ma Tran ===\" << \"\\n\";\n    cout << \"Tong tat ca phan tu: \" << sumOf2dArray(matrix, rows, cols) << \"\\n\";\n\n    int fRow, fCol;\n    int target = 44;\n    cout << \"\\n=== Tim Kiem Phan Tu \" << target << \" ===\" << \"\\n\";\n    if (searchIn2dArray(matrix, rows, cols, target, fRow, fCol)) {\n        cout << \"Tim thay gia tri \" << target << \" tai toa do: [\" << fRow << \"][\" << fCol << \"]\\n\";\n    } else {\n        cout << \"Khong tim thay \" << target << \"\\n\";\n    }\n\n    cout << \"\\n=== Loc Phan Tu Theo Dieu Kien (So Chan) ===\" << \"\\n\";\n    filterElements(matrix, rows, cols);\n\n    return 0;\n}"
    },
    "keyTechnicalNotes": [
      "Mảng 2 chiều trong C/C++ lưu trữ theo thứ tự dòng liên tục trong RAM (Row-Major Order).",
      "Khi truyền tham số mảng 2 chiều vào hàm, bắt buộc số cột (MAX_COLS) phải là hằng số cố định tại compile-time.",
      "Điểm neo '// Thay điều kiện ở đây' cho phép người học tùy biến bộ lọc phần tử (chẵn/lẻ/nguyên tố) nhanh chóng.",
      "Tách nhỏ hàm xuất, tìm kiếm, tính tổng giúp code module hóa, tái sử dụng cao và dễ kiểm thử."
    ],
    "functionOutline": [
      {
        "functionName": "printArray2d",
        "purpose": "Xuất mảng 2 chiều dạng ma trận căn chỉnh đẹp mắt",
        "lineRange": [
          19,
          26
        ]
      },
      {
        "functionName": "findMaxMinIn2dArray",
        "purpose": "Tìm phần tử lớn nhất và nhỏ nhất trên toàn mảng",
        "lineRange": [
          29,
          38
        ]
      },
      {
        "functionName": "findMaxMinInRow",
        "purpose": "Tìm Max/Min trên một hàng chỉ định",
        "lineRange": [
          41,
          48
        ]
      },
      {
        "functionName": "findMaxMinInColumn",
        "purpose": "Tìm Max/Min trên một cột chỉ định",
        "lineRange": [
          51,
          58
        ]
      },
      {
        "functionName": "sumOf2dArray",
        "purpose": "Tính tổng tất cả phần tử trong mảng 2 chiều",
        "lineRange": [
          61,
          69
        ]
      },
      {
        "functionName": "searchIn2dArray",
        "purpose": "Tìm kiếm phần tử và trả về tọa độ [row][col]",
        "lineRange": [
          72,
          85
        ]
      },
      {
        "functionName": "filterElements",
        "purpose": "Điểm neo tùy biến lọc phần tử theo điều kiện",
        "lineRange": [
          94,
          105
        ]
      },
      {
        "functionName": "main",
        "purpose": "Hàm thực thi khởi tạo test case và kiểm chứng toàn diện",
        "lineRange": [
          110,
          152
        ]
      }
    ],
    "expectedConsoleOutput": "=== Xuat Mang 2 Chieu ===\n   12     5    27 \n    8    44    19 \n   31     2    16 \n\n=== Max Min Toan Bo Mang ===\nMax: 44 | Min: 2\n\n=== Max Min Hang 1 (Index 1) ===\nHang 1 -> Max: 44 | Min: 8\n\n=== Max Min Cot 0 (Index 0) ===\nCot 0 -> Max: 31 | Min: 8\n\n=== Tong Toan Bo Ma Tran ===\nTong tat ca phan tu: 164\n\n=== Tim Kiem Phan Tu 44 ===\nTim thay gia tri 44 tai toa do: [1][1]\n\n=== Loc Phan Tu Theo Dieu Kien (So Chan) ===\nCac phan tu thoa man dieu kien loc: 12 8 44 2 16 ",
    "miniChallengePrompt": "Viết thêm hàm 'int sumOfMainDiagonal(const Array2d arr, int n)' để tính tổng các phần tử trên đường chéo chính của ma trận vuông và gọi thử trong main()."
  },
  {
    "id": "IT002-PB01",
    "subjectId": "IT002",
    "title": "Kế Thừa & Đa Hình Ảo (Polymorphism & Virtual Destructors)",
    "category": "Hướng đối tượng Nâng cao",
    "filenameByLang": {
      "CPP": "oop_ke_thua_da_hinh.cpp",
      "TS": "oop_ke_thua_da_hinh.ts",
      "PYTHON": "oop_ke_thua_da_hinh.py"
    },
    "sourceCodeByLang": {
      "CPP": "#include <iostream>\n#include <vector>\n#include <string>\n#include <iomanip>\nusing namespace std;\n\n// ============================================================================\n// TẦNG 1: LỚP CƠ SỞ TRỪU TƯỢNG & ĐỊNH NGHĨA GIAO DIỆN (ABSTRACT BASE CLASS)\n// ============================================================================\n\nclass NhanVien {\nprotected:\n    string maNV;       // protected: cho phép lớp con truy cập trực tiếp nhưng bên ngoài không can thiệp được\n    string hoTen;\n    double luongCoBan;\n\npublic:\n    NhanVien(string ma, string ten, double luongCB)\n        : maNV(ma), hoTen(ten), luongCoBan(luongCB) {}\n\n    // Lưu ý quan trọng: Khi dùng đa hình qua con trỏ lớp cha (NhanVien*),\n    // BẮT BUỘC hàm hủy (Destructor) phải là virtual để tránh rò rỉ vùng nhớ (Memory Leak)\n    // khi xóa đối tượng thuộc lớp con qua con trỏ lớp cha.\n    virtual ~NhanVien() {}\n\n    // Hàm thuần ảo (Pure Virtual Function = 0): Biến NhanVien thành Abstract Class\n    // Bắt buộc mọi lớp con phải tự cài đặt công thức tính lương đặc thù của mình.\n    virtual double tinhLuong() const = 0;\n\n    // Hàm ảo (Virtual Function): Có thể dùng chung hoặc ghi đè (Override) ở lớp con\n    virtual void xuatThongTin() const {\n        cout << \"[\" << maNV << \"] \" << left << setw(16) << hoTen \n             << \" | Luong: \" << fixed << setprecision(0) << tinhLuong() << \" USD\" << endl;\n    }\n\n    double getLuongCoBan() const { return luongCoBan; }\n    string getMaNV() const { return maNV; }\n};\n\n// ============================================================================\n// TẦNG 2: CÁC LỚP DẪN XUẤT & CHUỖI HÀM XỬ LÝ ĐA HÌNH (DERIVED CLASSES & OPERATIONS)\n// ============================================================================\n\n// 1. Lớp Lập trình viên (Developer)\nclass LapTrinhVien : public NhanVien {\nprivate:\n    int soGioOT;\n    double tienOTMoiGio;\n\npublic:\n    LapTrinhVien(string ma, string ten, double luongCB, int gioOT, double giaOT)\n        : NhanVien(ma, ten, luongCB), soGioOT(gioOT), tienOTMoiGio(giaOT) {}\n\n    // Ghi đè (override) công thức tính lương: Lương cơ bản + Lương làm thêm giờ\n    double tinhLuong() const override {\n        return luongCoBan + (soGioOT * tienOTMoiGio);\n    }\n};\n\n// 2. Lớp Kiểm thử viên (QA Engineer)\nclass KiemThuVien : public NhanVien {\nprivate:\n    int soLoiPhatHien;\n    double thuongMoiLoi;\n\npublic:\n    KiemThuVien(string ma, string ten, double luongCB, int soBug, double thuongBug)\n        : NhanVien(ma, ten, luongCB), soLoiPhatHien(soBug), thuongMoiLoi(thuongBug) {}\n\n    // Ghi đè công thức tính lương: Lương cơ bản + Thưởng theo số lượng Bug tìm được\n    double tinhLuong() const override {\n        return luongCoBan + (soLoiPhatHien * thuongMoiLoi);\n    }\n};\n\n// 3. Xuất danh sách nhân viên đa hình (Dynamic Binding qua vtable)\nvoid xuatDanhSachNhanVien(const vector<NhanVien*>& ds) {\n    for (size_t i = 0; i < ds.size(); ++i) {\n        ds[i]->xuatThongTin(); // Tự động gọi đúng phương thức của lớp con nhờ vtable\n    }\n}\n\n// 4. Tính tổng quỹ lương công ty\ndouble tinhTongQuyLuong(const vector<NhanVien*>& ds) {\n    double tong = 0;\n    for (size_t i = 0; i < ds.size(); ++i) {\n        tong += ds[i]->tinhLuong();\n    }\n    return tong;\n}\n\n// 5. Tìm kiếm nhân viên có thu nhập cao nhất\nvoid timNhanVienLuongCaoNhat(const vector<NhanVien*>& ds) {\n    if (ds.empty()) return;\n    const NhanVien* maxNV = ds[0];\n    for (size_t i = 1; i < ds.size(); ++i) {\n        if (ds[i]->tinhLuong() > maxNV->tinhLuong()) {\n            maxNV = ds[i];\n        }\n    }\n    cout << \"Nhan vien thu nhap cao nhat: \";\n    maxNV->xuatThongTin();\n}\n\n// ============================================================================\n// TẦNG 3: CHÚ THÍCH KỸ THUẬT & ĐIỂM NEO TÙY BIẾN (INLINE NOTES & CUSTOM HOOK)\n// ============================================================================\n// Lưu ý kỹ thuật: Trình biên dịch C++ tạo ngầm một con trỏ vptr cho mỗi đối tượng\n// trỏ tới bảng phương thức ảo vtable. Việc gọi hàm ảo tiêu tốn thêm 1 bước tra cứu ô nhớ (Indirection Overhead).\n\nvoid locNhanVienTheoDieuKien(const vector<NhanVien*>& ds) {\n    for (size_t i = 0; i < ds.size(); ++i) {\n        // Thay điều kiện ở đây để lọc nhân viên theo yêu cầu (ví dụ: thu nhập > 2000 USD)\n        if (ds[i]->tinhLuong() > 2000.0) {\n            ds[i]->xuatThongTin();\n        }\n    }\n}\n\n// ============================================================================\n// TẦNG 4: HÀM MAIN() KIỂM CHỨNG TOÀN DIỆN (SELF-CONTAINED VERIFICATION DRIVER)\n// ============================================================================\nint main() {\n    vector<NhanVien*> congTy;\n    congTy.push_back(new LapTrinhVien(\"DEV01\", \"Nguyen Van A\", 1500, 20, 35));\n    congTy.push_back(new KiemThuVien(\"QA01\",  \"Tran Thi B\",   1200, 15, 25));\n    congTy.push_back(new LapTrinhVien(\"DEV02\", \"Le Van C\",     2000, 10, 40));\n\n    cout << \"=== Danh sach toan bo nhan vien ===\" << \"\\n\";\n    xuatDanhSachNhanVien(congTy);\n\n    cout << \"\\n=== Tong Quy Luong Cong Ty ===\" << \"\\n\";\n    cout << \"Tong chi phi: \" << fixed << setprecision(0) << tinhTongQuyLuong(congTy) << \" USD\\n\";\n\n    cout << \"\\n=== Nhan Vien Co Thu Nhap Cao Nhat ===\" << \"\\n\";\n    timNhanVienLuongCaoNhat(congTy);\n\n    cout << \"\\n=== Nhan vien co thu nhap tren 2000 USD ===\" << \"\\n\";\n    locNhanVienTheoDieuKien(congTy);\n\n    // Giải phóng bộ nhớ Heap an toàn chống memory leak\n    for (NhanVien* nv : congTy) {\n        delete nv;\n    }\n    congTy.clear();\n    return 0;\n}"
    },
    "keyTechnicalNotes": [
      "Hàm hủy ảo (virtual ~NhanVien()) là BẮT BUỘC khi xóa đối tượng lớp con qua con trỏ lớp cha, nếu không sẽ rò rỉ bộ nhớ lớp con.",
      "Hàm thuần ảo (pure virtual = 0) biến lớp thành trừu tượng, bắt buộc lớp con phải định nghĩa hành vi riêng.",
      "Dynamic Binding trong C++ được hiện thực qua bảng phương thức ảo vtable và con trỏ vptr gắn ngầm trong mỗi đối tượng.",
      "Tránh hiện tượng 'Object Slicing' bằng cách luôn lưu trữ con trỏ hoặc tham chiếu (NhanVien* hoặc NhanVien&) thay vì truyền giá trị trực tiếp."
    ],
    "functionOutline": [
      {
        "functionName": "NhanVien",
        "purpose": "Lớp cơ sở trừu tượng định nghĩa hợp đồng đa hình",
        "lineRange": [
          11,
          38
        ]
      },
      {
        "functionName": "LapTrinhVien",
        "purpose": "Lớp con Lập trình viên ghi đè tinhLuong() theo giờ làm thêm",
        "lineRange": [
          45,
          58
        ]
      },
      {
        "functionName": "KiemThuVien",
        "purpose": "Lớp con Kiểm thử viên ghi đè tinhLuong() theo số bug",
        "lineRange": [
          61,
          74
        ]
      },
      {
        "functionName": "xuatDanhSachNhanVien",
        "purpose": "Duyệt danh sách đa hình qua con trỏ cha",
        "lineRange": [
          77,
          81
        ]
      },
      {
        "functionName": "tinhTongQuyLuong",
        "purpose": "Tính tổng quỹ lương công ty bằng cách cộng dồn đa hình",
        "lineRange": [
          84,
          90
        ]
      },
      {
        "functionName": "timNhanVienLuongCaoNhat",
        "purpose": "Tìm kiếm nhân sự có mức thu nhập cao nhất",
        "lineRange": [
          93,
          103
        ]
      },
      {
        "functionName": "locNhanVienTheoDieuKien",
        "purpose": "Điểm neo tùy biến điều kiện lọc nhân sự",
        "lineRange": [
          111,
          118
        ]
      },
      {
        "functionName": "main",
        "purpose": "Khởi tạo dữ liệu mẫu, gọi kiểm chứng toàn bộ hàm và thu hồi bộ nhớ Heap",
        "lineRange": [
          123,
          147
        ]
      }
    ],
    "expectedConsoleOutput": "=== Danh sach toan bo nhan vien ===\n[DEV01] Nguyen Van A     | Luong: 2200 USD\n[QA01]  Tran Thi B       | Luong: 1575 USD\n[DEV02] Le Van C         | Luong: 2400 USD\n\n=== Tong Quy Luong Cong Ty ===\nTong chi phi: 6175 USD\n\n=== Nhan Vien Co Thu Nhap Cao Nhat ===\nNhan vien thu nhap cao nhat: [DEV02] Le Van C         | Luong: 2400 USD\n\n=== Nhan vien co thu nhap tren 2000 USD ===\n[DEV01] Nguyen Van A     | Luong: 2200 USD\n[DEV02] Le Van C         | Luong: 2400 USD",
    "miniChallengePrompt": "Tạo thêm một lớp dẫn xuất 'QuanLyDuAn' (Project Manager) kế thừa từ NhanVien, có thêm thuộc tính soDuAnThanhCong và công thức tính lương riêng, sau đó thêm 1 đối tượng Quản lý vào vector congTy."
  },
  {
    "id": "IT003-PB01",
    "subjectId": "IT003",
    "title": "Danh Sách Liên Kết Đơn & Đảo Ngược Tại Chỗ (Singly Linked List)",
    "category": "Cấu trúc Dữ liệu & Giải thuật",
    "filenameByLang": {
      "CPP": "danh_sach_lien_ket.cpp",
      "TS": "danh_sach_lien_ket.ts",
      "PYTHON": "danh_sach_lien_ket.py"
    },
    "sourceCodeByLang": {
      "CPP": "#include <iostream>\nusing namespace std;\n\n// ============================================================================\n// TẦNG 1: KHAI BÁO CẤU TRÚC NÚT (NODE DEFINITION & HEAP ALLOCATION)\n// ============================================================================\n// Cấu trúc một nút: chứa giá trị và con trỏ trỏ đến địa chỉ ô nhớ nút kế tiếp trong RAM.\nstruct Node {\n    int data;\n    Node* next;\n};\n\n// Hàm cấp phát bộ nhớ động tạo một nút mới trên Heap:\nNode* createNode(int value) {\n    Node* newNode = new Node;\n    newNode->data = value;\n    newNode->next = nullptr;\n    return newNode;\n}\n\n// ============================================================================\n// TẦNG 2: CHUỖI HÀM THAO TÁC CƠ BẢN TRÊN DANH SÁCH LIÊN KẾT ĐƠN\n// ============================================================================\n\n// 1. Chèn phần tử vào cuối danh sách liên kết\n// Lưu ý: Cần truyền tham chiếu con trỏ (Node*& head) để cập nhật con trỏ gốc khi danh sách đang rỗng.\nvoid insertAtTail(Node*& head, int value) {\n    Node* newNode = createNode(value);\n    if (head == nullptr) {\n        head = newNode;\n        return;\n    }\n    Node* temp = head;\n    while (temp->next != nullptr) {\n        temp = temp->next;\n    }\n    temp->next = newNode;\n}\n\n// 2. Chèn phần tử vào đầu danh sách (Độ phức tạp O(1))\nvoid insertAtHead(Node*& head, int value) {\n    Node* newNode = createNode(value);\n    newNode->next = head;\n    head = newNode;\n}\n\n// 3. Duyệt và in toàn bộ danh sách liên kết\nvoid printList(Node* head) {\n    Node* curr = head;\n    while (curr != nullptr) {\n        cout << curr->data << \" -> \";\n        curr = curr->next;\n    }\n    cout << \"NULL\\n\";\n}\n\n// 4. Phân tích: Tìm Max, Min và tính tổng các phần tử\nvoid analyzeList(Node* head) {\n    if (head == nullptr) return;\n    int maxVal = head->data;\n    int minVal = head->data;\n    int sum = 0;\n    for (Node* p = head; p != nullptr; p = p->next) {\n        if (p->data > maxVal) maxVal = p->data;\n        if (p->data < minVal) minVal = p->data;\n        sum += p->data;\n    }\n    cout << \"Max: \" << maxVal << \" | Min: \" << minVal << \" | Sum: \" << sum << \"\\n\";\n}\n\n// ============================================================================\n// TẦNG 3: GIẢI THUẬT ĐẢO NGƯỢC TẠI CHỖ & CHÚ THÍCH KỸ THUẬT\n// ============================================================================\n// Thuật toán kinh điển: Đảo ngược danh sách liên kết tại chỗ (In-Place Reversal).\n// Độ phức tạp thời gian: O(n), Bộ nhớ bổ sung: O(1).\nvoid reverseList(Node*& head) {\n    Node* prev = nullptr;\n    Node* curr = head;\n    Node* nextNode = nullptr;\n\n    while (curr != nullptr) {\n        nextNode = curr->next; // Giữ lại địa chỉ nút phía sau\n        curr->next = prev;     // Đảo chiều con trỏ quay ngược về nút trước\n        prev = curr;           // Dịch prev lên 1 bước\n        curr = nextNode;       // Dịch curr lên 1 bước\n    }\n    head = prev; // Cập nhật lại con trỏ đầu danh sách mới\n}\n\n// Thu hồi toàn bộ bộ nhớ Heap khi kết thúc chương trình\nvoid freeList(Node*& head) {\n    Node* curr = head;\n    while (curr != nullptr) {\n        Node* nextNode = curr->next;\n        delete curr;\n        curr = nextNode;\n    }\n    head = nullptr;\n}\n\n// ============================================================================\n// TẦNG 4: HÀM MAIN() KIỂM CHỨNG TOÀN DIỆN\n// ============================================================================\nint main() {\n    Node* head = nullptr;\n    insertAtTail(head, 10);\n    insertAtTail(head, 25);\n    insertAtTail(head, 5);\n    insertAtTail(head, 40);\n    insertAtHead(head, 99);\n\n    cout << \"=== Danh Sach Lien Ket Ban Dau ===\" << \"\\n\";\n    printList(head);\n\n    cout << \"\\n=== Thong Ke Max Min Tong ===\" << \"\\n\";\n    analyzeList(head);\n\n    cout << \"\\n=== Dao Nguoc Danh Sach Tai Cho (O(n), O(1) Memory) ===\" << \"\\n\";\n    reverseList(head);\n    printList(head);\n\n    // Dọn dẹp bộ nhớ\n    freeList(head);\n    return 0;\n}"
    },
    "keyTechnicalNotes": [
      "Mỗi phần tử trong danh sách liên kết được cấp phát rời rạc trên Heap, nối với nhau bằng con trỏ next.",
      "Khi hàm làm thay đổi địa chỉ của đầu danh sách (head), bắt buộc phải truyền tham chiếu con trỏ (Node*& head).",
      "Thuật toán đảo ngược tại chỗ (In-Place Reversal) sử dụng 3 con trỏ (prev, curr, nextNode) giúp đạt độ phức tạp O(n) và không tốn thêm bộ nhớ O(1).",
      "Luôn viết hàm giải phóng toàn bộ danh sách (freeList) trước khi thoát chương trình để tránh rò rỉ ô nhớ Heap."
    ],
    "functionOutline": [
      {
        "functionName": "createNode",
        "purpose": "Cấp phát động 1 nút mới trên Heap",
        "lineRange": [
          14,
          19
        ]
      },
      {
        "functionName": "insertAtTail",
        "purpose": "Chèn phần tử vào cuối danh sách liên kết",
        "lineRange": [
          27,
          38
        ]
      },
      {
        "functionName": "insertAtHead",
        "purpose": "Chèn phần tử vào đầu danh sách với thời gian O(1)",
        "lineRange": [
          41,
          45
        ]
      },
      {
        "functionName": "printList",
        "purpose": "Duyệt và in các phần tử dưới dạng đồ họa mũi tên",
        "lineRange": [
          48,
          55
        ]
      },
      {
        "functionName": "analyzeList",
        "purpose": "Thống kê Max, Min và Tổng trong 1 lượt duyệt duy nhất",
        "lineRange": [
          58,
          69
        ]
      },
      {
        "functionName": "reverseList",
        "purpose": "Đảo ngược liên kết các nút tại chỗ với O(1) Memory",
        "lineRange": [
          76,
          88
        ]
      },
      {
        "functionName": "freeList",
        "purpose": "Thu hồi an toàn toàn bộ vùng nhớ Heap",
        "lineRange": [
          91,
          99
        ]
      },
      {
        "functionName": "main",
        "purpose": "Khởi tạo danh sách mẫu, chạy chuỗi thao tác và in kết quả",
        "lineRange": [
          104,
          125
        ]
      }
    ],
    "expectedConsoleOutput": "=== Danh Sach Lien Ket Ban Dau ===\n99 -> 10 -> 25 -> 5 -> 40 -> NULL\n\n=== Thong Ke Max Min Tong ===\nMax: 99 | Min: 5 | Sum: 179\n\n=== Dao Nguoc Danh Sach Tai Cho (O(n), O(1) Memory) ===\n40 -> 5 -> 25 -> 10 -> 99 -> NULL",
    "miniChallengePrompt": "Cài đặt hàm 'bool deleteByValue(Node*& head, int target)' để tìm và xóa nút đầu tiên có giá trị bằng target, chú ý trường hợp target nằm ngay tại nút đầu (head)."
  },
  {
    "id": "IT007-PB01",
    "subjectId": "IT007",
    "title": "Đa Luồng, Race Condition & Đồng Bộ Hóa Mutex",
    "category": "Hệ điều hành & Hệ thống",
    "filenameByLang": {
      "CPP": "concurrency_mutex_threads.cpp",
      "TS": "concurrency_mutex_threads.ts",
      "PYTHON": "concurrency_mutex_threads.py"
    },
    "sourceCodeByLang": {
      "CPP": "#include <iostream>\n#include <thread>\n#include <vector>\n#include <mutex>\n#include <chrono>\nusing namespace std;\n\n// ============================================================================\n// TẦNG 1: KHAI BÁO TÀI NGUYÊN DÙNG CHUNG & MUTEX ĐỒNG BỘ\n// ============================================================================\n// Vấn đề: Khi nhiều luồng (threads) cùng truy cập đọc-ghi vào một ô nhớ chia sẻ\n// mà không có cơ chế khóa, sẽ xảy ra xung đột dữ liệu (Race Condition).\nconst int NUM_THREADS = 10;\nconst int ITERATIONS = 10000;\n\nint unsafeCounter = 0;   // Biến chia sẻ không an toàn\nint safeCounter = 0;     // Biến chia sẻ được bảo vệ bởi Mutex\nstd::mutex counterMutex; // Khóa tương hỗ (Mutual Exclusion)\n\n// ============================================================================\n// TẦNG 2: CÁC HÀM THỰC THI LUỒNG (THREAD WORKERS)\n// ============================================================================\n\n// 1. Luồng không an toàn (Dẫn tới Race Condition)\n// Thao tác counter++ thực chất gồm 3 bước Assembly: READ -> MODIFY -> WRITE.\n// Khi luồng bị OS ngắt giữa chừng, các luồng khác ghi đè dẫn đến mất mát cập nhật.\nvoid unsafeWorker() {\n    for (int i = 0; i < ITERATIONS; ++i) {\n        unsafeCounter++;\n    }\n}\n\n// 2. Luồng an toàn sử dụng std::lock_guard theo mẫu thiết kế RAII\nvoid safeWorker() {\n    for (int i = 0; i < ITERATIONS; ++i) {\n        // Tự động lock khi khởi tạo và unlock khi ra khỏi phạm vi khối lệnh {}\n        std::lock_guard<std::mutex> lock(counterMutex);\n        safeCounter++;\n    }\n}\n\n// ============================================================================\n// TẦNG 3: CHÚ THÍCH KỸ THUẬT & ĐIỂM NEO TÙY BIẾN\n// ============================================================================\n// Lưu ý kỹ thuật:\n// 1. Tránh gọi counterMutex.lock() và unlock() thủ công vì nếu giữa 2 lệnh có exception xảy ra,\n//    mutex sẽ bị kẹt vĩnh viễn gây Deadlock toàn hệ thống.\n// 2. Phạm vi của khóa càng hẹp thì thông lượng (Throughput) xử lý song song càng cao.\n\nvoid simulateTaskDelay() {\n    // Thay logic xử lý tác vụ thực tế ở đây (ví dụ: tính toán hash hoặc gửi request)\n    this_thread::sleep_for(chrono::microseconds(10));\n}\n\n// ============================================================================\n// TẦNG 4: HÀM MAIN() KIỂM CHỨNG & ĐỐI CHIẾU SONG SONG\n// ============================================================================\nint main() {\n    const int EXPECTED_TOTAL = NUM_THREADS * ITERATIONS; // 10 * 10000 = 100000\n\n    cout << \"=== THỬ NGHIỆM 1: ĐA LUỒNG GÂY RA RACE CONDITION ===\" << \"\\n\";\n    vector<thread> unsafeThreads;\n    for (int i = 0; i < NUM_THREADS; ++i) {\n        unsafeThreads.emplace_back(unsafeWorker);\n    }\n    for (auto& t : unsafeThreads) {\n        t.join(); // Đợi luồng hoàn tất\n    }\n    cout << \"Ky vong: \" << EXPECTED_TOTAL << \" | Thuc te: \" << unsafeCounter;\n    if (unsafeCounter < EXPECTED_TOTAL) {\n        cout << \" -> THẤT THOÁT DỮ LIỆU DO RACE CONDITION!\\n\";\n    } else {\n        cout << \" -> Khong phat hien xung dot (hiem gap).\\n\";\n    }\n\n    cout << \"\\n=== THỬ NGHIỆM 2: ĐỒNG BỘ HÓA BẰNG STD::MUTEX ===\" << \"\\n\";\n    vector<thread> safeThreads;\n    for (int i = 0; i < NUM_THREADS; ++i) {\n        safeThreads.emplace_back(safeWorker);\n    }\n    for (auto& t : safeThreads) {\n        t.join();\n    }\n    cout << \"Ky vong: \" << EXPECTED_TOTAL << \" | Thuc te: \" << safeCounter;\n    cout << \" -> CHÍNH XÁC TUYỆT ĐỐI NHỜ KHÓA MUTEX!\\n\";\n\n    return 0;\n}"
    },
    "keyTechnicalNotes": [
      "Race Condition xảy ra khi 2 hay nhiều luồng cùng ghi vào một vùng nhớ mà không có cơ chế đồng bộ hóa.",
      "Thao tác tăng biến counter++ không mang tính nguyên tử (non-atomic), bao gồm 3 lệnh máy tính: Load, Add, Store.",
      "std::lock_guard sử dụng mô hình RAII (Resource Acquisition Is Initialization), tự động unlock khi ra khỏi scope, chống deadlock.",
      "Khóa Mutex giúp dữ liệu toàn vẹn tuyệt đối nhưng làm tăng độ trễ (Lock Contention) nếu phạm vi khóa quá rộng."
    ],
    "functionOutline": [
      {
        "functionName": "unsafeWorker",
        "purpose": "Hàm luồng gây lỗi Race Condition khi không dùng khóa",
        "lineRange": [
          27,
          31
        ]
      },
      {
        "functionName": "safeWorker",
        "purpose": "Hàm luồng an toàn sử dụng std::lock_guard",
        "lineRange": [
          34,
          40
        ]
      },
      {
        "functionName": "main",
        "purpose": "Khởi tạo 10 luồng song song kiểm chứng 2 kịch bản có và không có Mutex",
        "lineRange": [
          58,
          88
        ]
      }
    ],
    "expectedConsoleOutput": "=== THỬ NGHIỆM 1: ĐA LUỒNG GÂY RA RACE CONDITION ===\nKy vong: 100000 | Thuc te: 87420 -> THẤT THOÁT DỮ LIỆU DO RACE CONDITION!\n\n=== THỬ NGHIỆM 2: ĐỒNG BỘ HÓA BẰNG STD::MUTEX ===\nKy vong: 100000 | Thuc te: 100000 -> CHÍNH XÁC TUYỆT ĐỐI NHỜ KHÓA MUTEX!",
    "miniChallengePrompt": "Thay thế std::mutex bằng std::atomic<int> trong C++11 để đo lường xem hiệu năng của Atomic Operations có nhanh hơn Mutex hay không."
  },
  {
    "id": "IT004-PB01",
    "subjectId": "IT004",
    "title": "Kịch Bản SQL Truy Vấn Phức Tạp, Ràng Buộc & ACID Transactions",
    "category": "Cơ sở Dữ liệu Quan hệ",
    "filenameByLang": {
      "SQL": "sql_queries_and_transactions.sql"
    },
    "sourceCodeByLang": {
      "SQL": "-- ============================================================================\n-- TẦNG 1: DDL KHỞI TẠO BẢNG, RÀNG BUỘC TOÀN VẸN & CHỈ MỤC (INDEXING)\n-- ============================================================================\n\n-- Bảng Phòng ban (Departments)\nCREATE TABLE departments (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(100) NOT NULL UNIQUE,\n    budget DECIMAL(15, 2) NOT NULL CHECK (budget >= 0)\n);\n\n-- Bảng Nhân viên (Employees) với ràng buộc khóa ngoại ON DELETE CASCADE\nCREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    full_name VARCHAR(150) NOT NULL,\n    email VARCHAR(150) NOT NULL UNIQUE,\n    dept_id INT NOT NULL,\n    hire_date DATE NOT NULL,\n    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE CASCADE\n);\n\n-- Bảng Lịch sử Lương (Salaries)\nCREATE TABLE salaries (\n    salary_id INT PRIMARY KEY,\n    emp_id INT NOT NULL,\n    salary_amount DECIMAL(12, 2) NOT NULL CHECK (salary_amount > 0),\n    effective_date DATE NOT NULL,\n    CONSTRAINT fk_emp FOREIGN KEY (emp_id) REFERENCES employees(emp_id) ON DELETE CASCADE\n);\n\n-- Tạo Index tăng tốc độ truy vấn theo dept_id và salary_amount\nCREATE INDEX idx_emp_dept ON employees(dept_id);\nCREATE INDEX idx_salary_amount ON salaries(salary_amount);\n\n-- ============================================================================\n-- TẦNG 2: DML DỮ LIỆU MẪU & CÁC TRUY VẤN NÂNG CAO (JOIN, GROUP BY, WINDOW FUNCTIONS)\n-- ============================================================================\n\n-- 1. Chèn dữ liệu mẫu\nINSERT INTO departments VALUES \n(1, 'Engineering', 500000.00),\n(2, 'Quality Assurance', 200000.00),\n(3, 'Product Design', 180000.00);\n\nINSERT INTO employees VALUES\n(101, 'Nguyen Van A', 'anv@se.uit.edu.vn', 1, '2023-01-15'),\n(102, 'Tran Thi B',   'btt@se.uit.edu.vn', 2, '2023-03-01'),\n(103, 'Le Van C',     'clv@se.uit.edu.vn', 1, '2023-06-10'),\n(104, 'Pham Thi D',   'dpt@se.uit.edu.vn', 3, '2024-01-05');\n\nINSERT INTO salaries VALUES\n(1, 101, 2500.00, '2024-01-01'),\n(2, 102, 1600.00, '2024-01-01'),\n(3, 103, 3100.00, '2024-01-01'),\n(4, 104, 1900.00, '2024-01-01');\n\n-- 2. Truy vấn JOIN nhiều bảng và tính tổng chi phí lương theo từng phòng ban\nSELECT \n    d.dept_name,\n    COUNT(e.emp_id) AS total_employees,\n    SUM(s.salary_amount) AS total_payroll,\n    ROUND(AVG(s.salary_amount), 2) AS avg_salary\nFROM departments d\nINNER JOIN employees e ON d.dept_id = e.dept_id\nINNER JOIN salaries s ON e.emp_id = s.emp_id\nGROUP BY d.dept_id, d.dept_name\nHAVING AVG(s.salary_amount) >= 1800.00\nORDER BY total_payroll DESC;\n\n-- 3. Truy vấn Window Function: Xếp hạng lương nhân viên trong từng phòng ban\nSELECT \n    e.emp_id,\n    e.full_name,\n    d.dept_name,\n    s.salary_amount,\n    DENSE_RANK() OVER (PARTITION BY e.dept_id ORDER BY s.salary_amount DESC) AS rank_in_dept\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nJOIN salaries s ON e.emp_id = s.emp_id;\n\n-- ============================================================================\n-- TẦNG 3: LƯU Ý KỸ THUẬT VỀ GIAO TÁC ACID & CẤP ĐỘ CÔ LẬP (ISOLATION LEVELS)\n-- ============================================================================\n-- Lưu ý kỹ thuật:\n-- 1. Thuộc tính ACID (Atomicity, Consistency, Isolation, Durability) đảm bảo\n--    giao tác chuyển tiền hoặc điều chỉnh ngân sách hoặc thành công toàn bộ hoặc hoàn nguyên.\n-- 2. Luôn khóa dòng (SELECT ... FOR UPDATE) trong các tác vụ kiểm tra số dư để chống Lost Update.\n\n-- ============================================================================\n-- TẦNG 4: KỊCH BẢN GIAO TÁC KIỂM SOÁT NGÂN SÁCH (ACID TRANSACTION DRIVER)\n-- ============================================================================\nBEGIN TRANSACTION;\n\n-- Giả lập: Chuyển 50,000 USD ngân sách từ Engineering (dept 1) sang QA (dept 2)\nUPDATE departments \nSET budget = budget - 50000.00 \nWHERE dept_id = 1 AND budget >= 50000.00;\n\n-- Kiểm tra nếu hàng bị ảnh hưởng = 1 (Đủ tiền) thì mới cộng cho phòng QA\nUPDATE departments \nSET budget = budget + 50000.00 \nWHERE dept_id = 2;\n\n-- Xác nhận giao tác thành công\nCOMMIT;\n\n-- Kiểm tra lại ngân sách sau chuyển tiền\nSELECT dept_id, dept_name, budget FROM departments WHERE dept_id IN (1, 2);"
    },
    "keyTechnicalNotes": [
      "Ràng buộc ON DELETE CASCADE tự động dọn dẹp các dòng con tham chiếu khi xóa dòng cha, duy trì toàn vẹn dữ liệu.",
      "Window Functions (DENSE_RANK) thực hiện tính toán trên tập con mà không làm gộp (collapse) các dòng như GROUP BY thông thường.",
      "Giao tác (Transaction) phải tuân thủ chuẩn ACID. Lệnh BEGIN TRANSACTION và COMMIT / ROLLBACK đảm bảo trạng thái hoặc tất cả hoặc không có gì.",
      "Cần đánh Index có chọn lọc trên các cột hay xuất hiện trong mệnh đề WHERE / JOIN để tránh Table Scan chậm chạp."
    ],
    "functionOutline": [
      {
        "functionName": "DDL_Schema",
        "purpose": "Tạo các bảng quan hệ với ràng buộc PK, FK, CHECK và INDEX",
        "lineRange": [
          1,
          33
        ]
      },
      {
        "functionName": "DML_Queries",
        "purpose": "Chèn dữ liệu và truy vấn thống kê nhiều bảng với JOIN và Window Function",
        "lineRange": [
          34,
          76
        ]
      },
      {
        "functionName": "ACID_Transaction",
        "purpose": "Khối điều chuyển ngân sách an toàn với kiểm tra số dư và COMMIT",
        "lineRange": [
          77,
          105
        ]
      }
    ],
    "expectedConsoleOutput": "dept_name          total_employees total_payroll avg_salary\n------------------------------------------------------------\nEngineering        2               5600.00       2800.00\nProduct Design     1               1900.00       1900.00\n\nemp_id  full_name     dept_name    salary_amount  rank_in_dept\n--------------------------------------------------------------\n103     Le Van C      Engineering  3100.00        1\n101     Nguyen Van A  Engineering  2500.00        2\n102     Tran Thi B    QA           1600.00        1\n104     Pham Thi D    Design       1900.00        1\n\n[Transaction Completed: 50,000 USD transferred from Dept 1 to Dept 2]\ndept_id  dept_name    budget\n-----------------------------\n1        Engineering  450000.00\n2        QA           250000.00",
    "miniChallengePrompt": "Viết thêm một câu lệnh truy vấn tìm ra nhân viên có mức lương cao thứ nhì trong toàn công ty sử dụng Window Function DENSE_RANK() hoặc Subquery."
  },
  {
    "id": "SE361-PB01",
    "subjectId": "SE361",
    "title": "Microservices Resilience & Circuit Breaker Pattern",
    "category": "Kiến trúc Microservices",
    "filenameByLang": {
      "TS": "circuit_breaker_resilience.ts",
      "GO": "circuit_breaker_resilience.go"
    },
    "sourceCodeByLang": {
      "TS": "/**\n * ============================================================================\n * TẦNG 1: TYPES & STATE MACHINE (CIRCUIT BREAKER STATES & METRICS)\n * ============================================================================\n * Circuit Breaker ngăn chặn sự sụp đổ dây chuyền (Cascading Failure)\n * khi một Microservice phụ thuộc gặp sự cố hoặc quá tải.\n */\nexport enum CircuitState {\n  CLOSED = 'CLOSED',       // Bình thường, mọi request được gửi đi\n  OPEN = 'OPEN',           // Dịch vụ đích đang lỗi, ngắt mạch ngay lập tức (Fast Fail)\n  HALF_OPEN = 'HALF_OPEN', // Thử nghiệm gửi một vài request để kiểm tra khả năng phục hồi\n}\n\nexport interface CircuitBreakerOptions {\n  failureThreshold: number; // Số lần lỗi liên tiếp để ngắt mạch (VD: 3 lần)\n  recoveryTimeMs: number;   // Thời gian chờ trước khi thử phục hồi (VD: 2000ms)\n  successThreshold: number; // Số lần thành công ở HALF_OPEN để đóng mạch hoàn toàn (VD: 2 lần)\n}\n\n// ============================================================================\n// TẦNG 2: LỚP ĐIỀU KHIỂN MẠCH & BẢO VỆ GỌI DỊCH VỤ (CIRCUIT BREAKER CONTROLLER)\n// ============================================================================\nexport class CircuitBreaker {\n  private state: CircuitState = CircuitState.CLOSED;\n  private consecutiveFailures = 0;\n  private consecutiveSuccesses = 0;\n  private lastFailureTime = 0;\n\n  constructor(\n    private serviceName: string,\n    private options: CircuitBreakerOptions = {\n      failureThreshold: 3,\n      recoveryTimeMs: 2000,\n      successThreshold: 2,\n    }\n  ) {}\n\n  public getState(): CircuitState {\n    if (this.state === CircuitState.OPEN) {\n      const now = Date.now();\n      if (now - this.lastFailureTime >= this.options.recoveryTimeMs) {\n        console.log(`[${this.serviceName}] ⏳ Hết thời gian chờ (${this.options.recoveryTimeMs}ms). Chuyển sang HALF_OPEN để thăm dò...`);\n        this.state = CircuitState.HALF_OPEN;\n        this.consecutiveSuccesses = 0;\n      }\n    }\n    return this.state;\n  }\n\n  public async execute<T>(action: () => Promise<T>, fallback: () => T): Promise<T> {\n    const currentState = this.getState();\n\n    // 1. Nếu mạch đang OPEN: Chặn ngay lập tức (Fast Fail), không gửi request ra mạng\n    if (currentState === CircuitState.OPEN) {\n      console.warn(`[${this.serviceName}] ⚡ FAST-FAIL: Mạch đang MỞ (OPEN). Sử dụng dữ liệu Fallback/Cache.`);\n      return fallback();\n    }\n\n    try {\n      const result = await action();\n      this.handleSuccess();\n      return result;\n    } catch (err: any) {\n      this.handleFailure(err);\n      return fallback();\n    }\n  }\n\n  private handleSuccess() {\n    this.consecutiveFailures = 0;\n    if (this.state === CircuitState.HALF_OPEN) {\n      this.consecutiveSuccesses++;\n      console.log(`[${this.serviceName}] ✅ Probe request thành công (${this.consecutiveSuccesses}/${this.options.successThreshold})`);\n      if (this.consecutiveSuccesses >= this.options.successThreshold) {\n        console.log(`[${this.serviceName}] 🟢 Dịch vụ đã phục hồi hoàn toàn! Đóng mạch (CLOSED).`);\n        this.state = CircuitState.CLOSED;\n      }\n    }\n  }\n\n  private handleFailure(error: any) {\n    this.consecutiveFailures++;\n    this.lastFailureTime = Date.now();\n    console.error(`[${this.serviceName}] ❌ Thất bại lần ${this.consecutiveFailures}: ${error.message}`);\n\n    if (this.state === CircuitState.HALF_OPEN || this.consecutiveFailures >= this.options.failureThreshold) {\n      console.warn(`[${this.serviceName}] 🔴 Ngưỡng lỗi vượt mức! NGẮT MẠCH (OPEN). Chặn mọi request tiếp theo.`);\n      this.state = CircuitState.OPEN;\n    }\n  }\n}\n\n// ============================================================================\n// TẦNG 3: CHÚ THÍCH KỸ THUẬT & ĐIỂM NEO TÙY BIẾN\n// ============================================================================\n// Lưu ý kỹ thuật:\n// 1. Phối hợp Circuit Breaker với Exponential Backoff và Jitter để tránh hiệu ứng thundering herd.\n// 2. Luôn chuẩn bị Fallback Response (cache dữ liệu cũ, degraded UI) để bảo đảm trải nghiệm người dùng không bị gián đoạn.\n\n// ============================================================================\n// TẦNG 4: HÀM MAIN() KIỂM CHỨNG KỊCH BẢN CHUYỂN ĐỔI TRẠNG THÁI\n// ============================================================================\nasync function runSimulation() {\n  const breaker = new CircuitBreaker('PaymentGatewayService', {\n    failureThreshold: 3,\n    recoveryTimeMs: 1500,\n    successThreshold: 2,\n  });\n\n  let shouldFail = false;\n  const mockApiCall = async () => {\n    if (shouldFail) {\n      throw new Error('503 Service Unavailable: Database Connection Timeout');\n    }\n    return 'Giao dịch thành công (HTTP 200 OK)';\n  };\n\n  const fallbackData = () => 'Thanh toán đang xử lý ngầm (Offline Queue Fallback)';\n\n  console.log('=== GIAI ĐOẠN 1: DỊCH VỤ HOẠT ĐỘNG BÌNH THƯỜNG ===');\n  for (let i = 1; i <= 2; i++) {\n    const res = await breaker.execute(mockApiCall, fallbackData);\n    console.log(`Call #${i}: ${res} | Trạng thái: ${breaker.getState()}`);\n  }\n\n  console.log('\\n=== GIAI ĐOẠN 2: DỊCH VỤ BỊ SẬP (3 LỖI LIÊN TIẾP KÍCH HOẠT OPEN) ===');\n  shouldFail = true;\n  for (let i = 3; i <= 6; i++) {\n    const res = await breaker.execute(mockApiCall, fallbackData);\n    console.log(`Call #${i}: ${res} | Trạng thái: ${breaker.getState()}`);\n  }\n\n  console.log('\\n=== GIAI ĐOẠN 3: CHỜ THỜI GIAN PHỤC HỒI & THĂM DÒ HALF_OPEN ===');\n  await new Promise((resolve) => setTimeout(resolve, 1600)); // Chờ 1.6s\n  shouldFail = false; // Dịch vụ đã sống lại\n\n  for (let i = 7; i <= 9; i++) {\n    const res = await breaker.execute(mockApiCall, fallbackData);\n    console.log(`Call #${i}: ${res} | Trạng thái: ${breaker.getState()}`);\n  }\n}\n\nrunSimulation();"
    },
    "keyTechnicalNotes": [
      "Circuit Breaker giải quyết vấn đề Cascading Failure trong hệ thống phân tán gồm hàng chục Microservices phụ thuộc nhau.",
      "Trạng thái OPEN áp dụng chiến lược Fast Fail, lập tức trả về lỗi hoặc Fallback mà không tốn tài nguyên mạng và thời gian timeout.",
      "Trạng thái HALF_OPEN là cơ chế thăm dò tự phục hồi (Self-Healing), chỉ cho phép một lượng nhỏ request đi qua để kiểm tra sức khỏe của dịch vụ đích.",
      "Cần kết hợp Circuit Breaker với Fallback Cache để cung cấp dữ liệu tạm thời cho người dùng khi backend gặp sự cố."
    ],
    "functionOutline": [
      {
        "functionName": "CircuitBreaker.constructor",
        "purpose": "Khởi tạo máy trạng thái và thiết lập các ngưỡng lỗi",
        "lineRange": [
          29,
          35
        ]
      },
      {
        "functionName": "CircuitBreaker.getState",
        "purpose": "Kiểm tra và tự động chuyển đổi trạng thái khi hết thời gian chờ hồi phục",
        "lineRange": [
          38,
          48
        ]
      },
      {
        "functionName": "CircuitBreaker.execute",
        "purpose": "Bọc hàm gọi API với cơ chế Fast-Fail và bảo vệ mạch",
        "lineRange": [
          50,
          67
        ]
      },
      {
        "functionName": "runSimulation",
        "purpose": "Mô phỏng 3 giai đoạn: Bình thường -> Sự cố 3 lần ngắt mạch -> Tự phục hồi sau 1.6s",
        "lineRange": [
          103,
          141
        ]
      }
    ],
    "expectedConsoleOutput": "=== GIAI ĐOẠN 1: DỊCH VỤ HOẠT ĐỘNG BÌNH THƯỜNG ===\nCall #1: Giao dịch thành công (HTTP 200 OK) | Trạng thái: CLOSED\nCall #2: Giao dịch thành công (HTTP 200 OK) | Trạng thái: CLOSED\n\n=== GIAI ĐOẠN 2: DỊCH VỤ BỊ SẬP (3 LỖI LIÊN TIẾP KÍCH HOẠT OPEN) ===\nCall #3: Thanh toán đang xử lý ngầm (Offline Queue Fallback) | Trạng thái: CLOSED\nCall #4: Thanh toán đang xử lý ngầm (Offline Queue Fallback) | Trạng thái: CLOSED\nCall #5: Thanh toán đang xử lý ngầm (Offline Queue Fallback) | Trạng thái: OPEN\nCall #6: Thanh toán đang xử lý ngầm (Offline Queue Fallback) | Trạng thái: OPEN\n\n=== GIAI ĐOẠN 3: CHỜ THỜI GIAN PHỤC HỒI & THĂM DÒ HALF_OPEN ===\nCall #7: Giao dịch thành công (HTTP 200 OK) | Trạng thái: HALF_OPEN\nCall #8: Giao dịch thành công (HTTP 200 OK) | Trạng thái: CLOSED\nCall #9: Giao dịch thành công (HTTP 200 OK) | Trạng thái: CLOSED",
    "miniChallengePrompt": "Bổ sung cơ chế Exponential Backoff: sau mỗi lần mạch chuyển sang OPEN thất bại, tăng gấp đôi thời gian recoveryTimeMs (ví dụ: 1.5s -> 3s -> 6s)."
  },
  {
    "id": "SE373-PB01",
    "subjectId": "SE373",
    "title": "Agentic AI ReAct Loop with Tool Calling & Memory",
    "category": "Agentic AI & LLMs",
    "filenameByLang": {
      "PYTHON": "agent_tool_calling_rag_loop.py",
      "TS": "agent_tool_calling_rag_loop.ts"
    },
    "sourceCodeByLang": {
      "PYTHON": "\"\"\"\n============================================================================\nTẦNG 1: ĐỊNH NGHĨA CẤU TRÚC TÁC NHÂN, CÔNG CỤ & BỘ NHỚ (AGENT SCHEMAS & MEMORY)\n============================================================================\nMô hình Agentic AI hoạt động theo vòng lặp suy luận ReAct:\n[User Goal] -> [Thought (Suy nghĩ)] -> [Action (Gọi Tool)] -> [Observation (Kết quả)] -> [Final Answer]\n\"\"\"\nfrom typing import Callable, Dict, List, Any\nimport json\n\nclass Tool:\n    def __init__(self, name: str, description: str, func: Callable):\n        self.name = name\n        self.description = description\n        self.func = func\n\n    def execute(self, **kwargs) -> str:\n        try:\n            return str(self.func(**kwargs))\n        except Exception as e:\n            return f\"Lỗi thực thi công cụ {self.name}: {str(e)}\"\n\nclass AgentMemory:\n    def __init__(self):\n        self.scratchpad: List[Dict[str, str]] = []\n\n    def log(self, role: str, content: str):\n        self.scratchpad.append({\"role\": role, \"content\": content})\n\n    def get_full_trace(self) -> str:\n        return \"\\n\".join([f\"[{step['role'].upper()}]: {step['content']}\" for step in self.scratchpad])\n\n# ============================================================================\n# TẦNG 2: KHO CÔNG CỤ NGHIỆP VỤ UIT & VÒNG LẶP SUY LUẬN REACT\n# ============================================================================\n\n# Mock Database môn học UIT\nUIT_SUBJECTS_DB = {\n    \"SE361\": {\"name\": \"Kiến trúc Microservices & Hệ thống Phân tán\", \"credits\": 4, \"prereq\": \"IT007\"},\n    \"SE373\": {\"name\": \"Kỹ nghệ Agentic AI & Vòng lặp ReAct\", \"credits\": 3, \"prereq\": \"SE118\"},\n    \"IT001\": {\"name\": \"Nhập môn lập trình\", \"credits\": 4, \"prereq\": \"None\"},\n    \"IT004\": {\"name\": \"Cơ sở dữ liệu\", \"credits\": 4, \"prereq\": \"IT001\"}\n}\n\ndef uit_curriculum_lookup(course_code: str) -> str:\n    \"\"\"Tra cứu thông tin môn học UIT theo mã môn.\"\"\"\n    code = course_code.strip().upper()\n    if code in UIT_SUBJECTS_DB:\n        info = UIT_SUBJECTS_DB[code]\n        return f\"Môn {code}: {info['name']}, Số tín chỉ: {info['credits']}, Tiên quyết: {info['prereq']}\"\n    return f\"Không tìm thấy môn học có mã {code} trong cơ sở dữ liệu UIT.\"\n\ndef calculate_total_credits(course_codes: str) -> str:\n    \"\"\"Tính tổng số tín chỉ của danh sách mã môn phân tách bởi dấu phẩy.\"\"\"\n    codes = [c.strip().upper() for c in course_codes.split(\",\")]\n    total = sum(UIT_SUBJECTS_DB.get(c, {}).get(\"credits\", 0) for c in codes)\n    return f\"Tổng số tín chỉ của {codes} là: {total} tín chỉ.\"\n\nclass ReActAgent:\n    def __init__(self, tools: List[Tool]):\n        self.tools = {t.name: t for t in tools}\n        self.memory = AgentMemory()\n\n    def run(self, user_goal: str, max_iterations: int = 5) -> str:\n        self.memory.log(\"goal\", user_goal)\n        print(f\"\\n🎯 [MỤC TIÊU CỦA AGENT]: {user_goal}\")\n\n        # Giả lập quá trình suy luận ReAct 3 bước tuần tự\n        simulation_steps = [\n            {\n                \"thought\": \"Người dùng muốn biết thông tin và tổng tín chỉ của 2 môn SE361 và SE373. Bước 1: Tra cứu môn SE361.\",\n                \"action\": \"uit_curriculum_lookup\",\n                \"args\": {\"course_code\": \"SE361\"}\n            },\n            {\n                \"thought\": \"Đã có thông tin SE361. Bước 2: Tra cứu tiếp môn SE373.\",\n                \"action\": \"uit_curriculum_lookup\",\n                \"args\": {\"course_code\": \"SE373\"}\n            },\n            {\n                \"thought\": \"Đã có đầy đủ thông tin 2 môn. Bước 3: Gọi công cụ tính tổng tín chỉ của SE361 và SE373.\",\n                \"action\": \"calculate_total_credits\",\n                \"args\": {\"course_codes\": \"SE361, SE373\"}\n            }\n        ]\n\n        for i, step in enumerate(simulation_steps):\n            print(f\"\\n--- [VÒNG LẶP REACT BƯỚC {i+1}] ---\")\n            print(f\"💭 THOUGHT: {step['thought']}\")\n            self.memory.log(\"thought\", step['thought'])\n\n            tool = self.tools.get(step['action'])\n            if not tool:\n                obs = f\"Công cụ {step['action']} không tồn tại.\"\n            else:\n                obs = tool.execute(**step['args'])\n\n            print(f\"🛠️ ACTION: {step['action']}({step['args']})\")\n            print(f\"👁️ OBSERVATION: {obs}\")\n            self.memory.log(\"action\", f\"{step['action']}({step['args']})\")\n            self.memory.log(\"observation\", obs)\n\n        final_answer = (\n            \"Kết luận từ Agent:\\n\"\n            \"- Môn SE361 (Kiến trúc Microservices): 4 tín chỉ, tiên quyết IT007.\\n\"\n            \"- Môn SE373 (Kỹ nghệ Agentic AI): 3 tín chỉ, tiên quyết SE118.\\n\"\n            \"- Tổng cộng bạn cần tích lũy: 7 tín chỉ.\"\n        )\n        self.memory.log(\"final_answer\", final_answer)\n        return final_answer\n\n# ============================================================================\n# TẦNG 3: CHÚ THÍCH KỸ THUẬT & PHÒNG CHỐNG LỖI VÒNG LẶP VÔ HẠN\n# ============================================================================\n# Lưu ý kỹ thuật:\n# 1. Luôn cài đặt max_iterations guard để tránh trường hợp LLM bị kẹt trong vòng lặp vô hạn (Infinite Loop).\n# 2. Tool call arguments phải được kiểm tra schema nghiêm ngặt để chống Command Injection.\n\n# ============================================================================\n# TẦNG 4: HÀM MAIN() CHẠY THỬ NGHIỆM TRỰC TIẾP\n# ============================================================================\nif __name__ == \"__main__\":\n    tools = [\n        Tool(\"uit_curriculum_lookup\", \"Tra cứu môn học\", uit_curriculum_lookup),\n        Tool(\"calculate_total_credits\", \"Tính tổng tín chỉ\", calculate_total_credits)\n    ]\n    agent = ReActAgent(tools)\n    answer = agent.run(\"Tra cứu môn SE361, SE373 và tính tổng tín chỉ cần học.\")\n    print(\"\\n=== KẾT QUẢ CUỐI CÙNG (FINAL ANSWER) ===\")\n    print(answer)"
    },
    "keyTechnicalNotes": [
      "Vòng lặp ReAct (Reasoning + Acting) kết hợp suy luận chuỗi ý nghĩ (Thought) với thao tác thực thi hành động (Action/Tool Calling).",
      "AgentMemory lưu trữ scratchpad giúp mô hình nắm bắt ngữ cảnh các bước trước đó để đưa ra quyết định kế tiếp mà không lặp lại sai lầm.",
      "Luôn có rào chắn max_iterations để ngăn ngừa trường hợp tác nhân AI rơi vào vòng lặp vô hạn (Infinite Loop).",
      "Mọi tham số gọi công cụ (Tool Call Arguments) cần được kiểm tra kiểu chặt chẽ nhằm phòng chống Prompt Injection."
    ],
    "functionOutline": [
      {
        "functionName": "Tool",
        "purpose": "Lớp đóng gói công cụ nghiệp vụ có thể gọi được bởi Agent",
        "lineRange": [
          11,
          21
        ]
      },
      {
        "functionName": "AgentMemory",
        "purpose": "Bộ nhớ ngắn hạn ghi nhận vết suy luận scratchpad của Agent",
        "lineRange": [
          23,
          28
        ]
      },
      {
        "functionName": "uit_curriculum_lookup",
        "purpose": "Công cụ tra cứu môn học trong cơ sở dữ liệu UIT",
        "lineRange": [
          45,
          50
        ]
      },
      {
        "functionName": "calculate_total_credits",
        "purpose": "Công cụ tính toán số tín chỉ tích lũy",
        "lineRange": [
          53,
          56
        ]
      },
      {
        "functionName": "ReActAgent.run",
        "purpose": "Vòng lặp điều phối suy luận Thought -> Action -> Observation -> Final Answer",
        "lineRange": [
          64,
          66
        ]
      }
    ],
    "expectedConsoleOutput": "🎯 [MỤC TIÊU CỦA AGENT]: Tra cứu môn SE361, SE373 và tính tổng tín chỉ cần học.\n\n--- [VÒNG LẶP REACT BƯỚC 1] ---\n💭 THOUGHT: Người dùng muốn biết thông tin và tổng tín chỉ của 2 môn SE361 và SE373. Bước 1: Tra cứu môn SE361.\n🛠️ ACTION: uit_curriculum_lookup({'course_code': 'SE361'})\n👁️ OBSERVATION: Môn SE361: Kiến trúc Microservices & Hệ thống Phân tán, Số tín chỉ: 4, Tiên quyết: IT007\n\n--- [VÒNG LẶP REACT BƯỚC 2] ---\n💭 THOUGHT: Đã có thông tin SE361. Bước 2: Tra cứu tiếp môn SE373.\n🛠️ ACTION: uit_curriculum_lookup({'course_code': 'SE373'})\n👁️ OBSERVATION: Môn SE373: Kỹ nghệ Agentic AI & Vòng lặp ReAct, Số tín chỉ: 3, Tiên quyết: SE118\n\n--- [VÒNG LẶP REACT BƯỚC 3] ---\n💭 THOUGHT: Đã có đầy đủ thông tin 2 môn. Bước 3: Gọi công cụ tính tổng tín chỉ của SE361 và SE373.\n🛠️ ACTION: calculate_total_credits({'course_codes': 'SE361, SE373'})\n👁️ OBSERVATION: Tổng số tín chỉ của ['SE361', 'SE373'] là: 7 tín chỉ.\n\n=== KẾT QUẢ CUỐI CÙNG (FINAL ANSWER) ===\nKết luận từ Agent:\n- Môn SE361 (Kiến trúc Microservices): 4 tín chỉ, tiên quyết IT007.\n- Môn SE373 (Kỹ nghệ Agentic AI): 3 tín chỉ, tiên quyết SE118.\n- Tổng cộng bạn cần tích lũy: 7 tín chỉ.",
    "miniChallengePrompt": "Thêm một công cụ mới 'check_prerequisites_chain(target_course)' để đệ quy kiểm tra toàn bộ cây môn học tiên quyết mà sinh viên cần hoàn thành trước khi được phép đăng ký môn đích."
  },
  {
    "id": "SE005-PB01",
    "subjectId": "SE005",
    "title": "Quy Trình Git Thực Chiến & Quản Lý Nhánh (Git Workflow)",
    "category": "Nhập môn Ngành KTPM",
    "filenameByLang": {
      "SH": "git_workflow_playbook.sh"
    },
    "sourceCodeByLang": {
      "SH": "#!/bin/bash\n# ============================================================================\n# TẦNG 1: THIẾT LẬP MÔI TRƯỜNG & KHAI BÁO BIẾN\n# ============================================================================\nREPO_DIR=\"./se_git_demo\"\nMAIN_BRANCH=\"main\"\nFEATURE_BRANCH=\"feature/login-module\"\n\n# ============================================================================\n# TẦNG 2: CHUỖI HÀM QUY TRÌNH GIT THỰC CHIẾN\n# ============================================================================\ninit_repository() {\n    rm -rf \"$REPO_DIR\" && mkdir -p \"$REPO_DIR\" && cd \"$REPO_DIR\" || exit 1\n    git init -b \"$MAIN_BRANCH\"\n    echo \"# SE Sanctuary Project\" > README.md\n    git add README.md\n    git commit -m \"feat: initial commit with README\"\n}\n\ncreate_feature_branch() {\n    git checkout -b \"$FEATURE_BRANCH\"\n    echo \"function login() { return true; }\" > auth.js\n    git add auth.js\n    git commit -m \"feat(auth): implement basic login function\"\n}\n\nmerge_to_main() {\n    git checkout \"$MAIN_BRANCH\"\n    git merge --no-ff \"$FEATURE_BRANCH\" -m \"merge: integrate login module into main\"\n}\n\n# ============================================================================\n# TẦNG 3: LƯU Ý KỸ THUẬT VỀ CONVENTIONAL COMMITS & REBASE\n# ============================================================================\n# Lưu ý: Luôn dùng rebase trước khi tạo Pull Request để giữ lịch sử Git tuyến tính.\n# Dùng cờ --no-ff để ghi nhận rõ vết tích nhánh feature đã từng tồn tại.\n\n# ============================================================================\n# TẦNG 4: CHẠY KIỂM CHỨNG QUY TRÌNH\n# ============================================================================\necho \"=== 1. KHỞI TẠO REPO ===\"\ninit_repository\necho \"=== 2. TẠO NHÁNH TÍNH NĂNG ===\"\ncreate_feature_branch\necho \"=== 3. HỢP NHẤT VÀO MAIN ===\"\nmerge_to_main\ngit log --oneline --graph --all\ncd .. && rm -rf \"$REPO_DIR\"\n"
    },
    "keyTechnicalNotes": [
      "Hiểu rõ chu kỳ commit, branch, merge và pull request theo chuẩn GitFlow.",
      "Quy tắc đặt tên commit theo chuẩn Conventional Commits (feat, fix, docs, refactor)."
    ],
    "functionOutline": [
      {
        "functionName": "init_repository",
        "purpose": "Khởi tạo Git repo và commit đầu tiên",
        "lineRange": [
          10,
          16
        ]
      },
      {
        "functionName": "create_feature_branch",
        "purpose": "Tạo nhánh tính năng và commit module auth",
        "lineRange": [
          18,
          24
        ]
      },
      {
        "functionName": "merge_to_main",
        "purpose": "Hợp nhất tính năng vào nhánh chính có gắn cờ --no-ff",
        "lineRange": [
          26,
          30
        ]
      }
    ],
    "expectedConsoleOutput": "=== 1. KHỞI TẠO REPO ===\n=== 2. TẠO NHÁNH TÍNH NĂNG ===\n=== 3. HỢP NHẤT VÀO MAIN ===\n*   merge: integrate login module into main\n|\\  \n| * feat(auth): implement basic login function\n|/  \n* feat: initial commit with README",
    "miniChallengePrompt": "Viết thêm hàm git_rebase_interactive mô phỏng việc gộp (squash) 3 commit nhỏ thành 1 commit duy nhất."
  },
  {
    "id": "IT012-PB01",
    "subjectId": "IT012",
    "title": "Thao Tác Bitwise, Little Endian & Giải Mã Chuẩn IEEE 754",
    "category": "Cấu trúc Máy tính",
    "filenameByLang": {
      "C": "bitwise_memory_layout.c"
    },
    "sourceCodeByLang": {
      "C": "#include <stdio.h>\n#include <stdint.h>\n\n// ============================================================================\n// TẦNG 1: KHAI BÁO KIỂU DỮ LIỆU & UNION BỘ NHỚ\n// ============================================================================\ntypedef union {\n    float f;\n    uint32_t u;\n    struct {\n        uint32_t mantissa : 23;\n        uint32_t exponent : 8;\n        uint32_t sign     : 1;\n    } parts;\n} FloatIEEE754;\n\n// ============================================================================\n// TẦNG 2: CHUỖI HÀM THAO TÁC BIT & KIỂM TRA BỘ NHỚ\n// ============================================================================\nvoid printBinary32(uint32_t n) {\n    for (int i = 31; i >= 0; --i) {\n        printf(\"%d\", (n >> i) & 1);\n        if (i % 8 == 0) printf(\" \");\n    }\n    printf(\"\\n\");\n}\n\nint checkLittleEndian() {\n    uint16_t x = 0x0001;\n    return *((uint8_t*)&x) == 1; // 1 nếu Byte thấp nằm ở địa chỉ thấp (Little Endian)\n}\n\n// ============================================================================\n// TẦNG 3: LƯU Ý KỸ THUẬT VỀ ENDIANNESS & DỊCH BIT\n// ============================================================================\n// Lưu ý: Kiến trúc x86_64 sử dụng Little Endian, trong khi Network Byte Order là Big Endian.\n\n// ============================================================================\n// TẦNG 4: HÀM MAIN() KIỂM CHỨNG\n// ============================================================================\nint main() {\n    printf(\"=== KIỂM TRA KIẾN TRÚC MÁY TÍNH ===\\n\");\n    printf(\"Endianness: %s\\n\", checkLittleEndian() ? \"Little Endian (x86_64)\" : \"Big Endian\");\n\n    FloatIEEE754 val;\n    val.f = -12.625f;\n    printf(\"\\n=== GIẢI MÃ SỐ THỰC IEEE 754: %f ===\\n\", val.f);\n    printf(\"Binary: \");\n    printBinary32(val.u);\n    printf(\"Sign: %u | Exponent: %u | Mantissa: 0x%X\\n\", val.parts.sign, val.parts.exponent, val.parts.mantissa);\n    return 0;\n}\n"
    },
    "keyTechnicalNotes": [
      "Kiến trúc x86_64 sử dụng Little Endian: Byte có trọng số nhỏ nhất được lưu tại địa chỉ ô nhớ thấp nhất.",
      "Chuẩn IEEE 754 số thực 32-bit gồm 1 bit dấu (Sign), 8 bit số mũ (Exponent) và 23 bit định trị (Mantissa)."
    ],
    "functionOutline": [
      {
        "functionName": "printBinary32",
        "purpose": "In 32-bit nhị phân có phân cách byte",
        "lineRange": [
          19,
          25
        ]
      },
      {
        "functionName": "checkLittleEndian",
        "purpose": "Kiểm tra thứ tự lưu trữ byte của CPU",
        "lineRange": [
          27,
          30
        ]
      },
      {
        "functionName": "main",
        "purpose": "Khởi tạo union và bóc tách số thực IEEE 754",
        "lineRange": [
          39,
          50
        ]
      }
    ],
    "expectedConsoleOutput": "=== KIỂM TRA KIẾN TRÚC MÁY TÍNH ===\nEndianness: Little Endian (x86_64)\n\n=== GIẢI MÃ SỐ THỰC IEEE 754: -12.625000 ===\nBinary: 11000001 01001010 00000000 00000000 \nSign: 1 | Exponent: 130 | Mantissa: 0x4A0000",
    "miniChallengePrompt": "Viết hàm đảo ngược thứ tự các byte trong một số nguyên 32-bit (chuyển đổi giữa Little-Endian và Big-Endian)."
  },
  {
    "id": "IT005-PB01",
    "subjectId": "IT005",
    "title": "Giao Thức Mạng, Phân Tích Gói Tin TCP & Giao Thức HTTP",
    "category": "Mạng Máy tính",
    "filenameByLang": {
      "CPP": "tcp_socket_client_server.cpp"
    },
    "sourceCodeByLang": {
      "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n// ============================================================================\n// TẦNG 1: ĐỊNH NGHĨA HEADER & PROTOCOL PACKET\n// ============================================================================\nstruct HttpRequest {\n    string method;\n    string path;\n    string protocol;\n};\n\n// ============================================================================\n// TẦNG 2: HÀM PHÂN TÍCH GÓI TIN & SIMULATOR SOCKET\n// ============================================================================\nHttpRequest parseSimpleHttp(const string& rawRequest) {\n    HttpRequest req;\n    size_t firstSpace = rawRequest.find(' ');\n    size_t secondSpace = rawRequest.find(' ', firstSpace + 1);\n    size_t lineEnd = rawRequest.find(\"\\r\\n\");\n\n    if (firstSpace != string::npos && secondSpace != string::npos) {\n        req.method = rawRequest.substr(0, firstSpace);\n        req.path = rawRequest.substr(firstSpace + 1, secondSpace - firstSpace - 1);\n        req.protocol = rawRequest.substr(secondSpace + 1, lineEnd - secondSpace - 1);\n    }\n    return req;\n}\n\nstring buildHttpResponse(int statusCode, const string& body) {\n    string res = \"HTTP/1.1 \" + to_string(statusCode) + \" OK\\r\\n\";\n    res += \"Content-Type: text/plain; charset=utf-8\\r\\n\";\n    res += \"Content-Length: \" + to_string(body.length()) + \"\\r\\n\\r\\n\";\n    res += body;\n    return res;\n}\n\n// ============================================================================\n// TẦNG 3: LƯU Ý KỸ THUẬT VỀ 3-WAY HANDSHAKE & TCP STREAM\n// ============================================================================\n// Lưu ý: TCP là luồng byte không có ranh giới gói (Stream-oriented), nên ứng dụng\n// phải tự xác định ranh giới thông điệp qua Content-Length hoặc ký tự ngắt \\r\\n\\r\\n.\n\n// ============================================================================\n// TẦNG 4: HÀM MAIN() KIỂM CHỨNG\n// ============================================================================\nint main() {\n    string sampleRequest = \"GET /api/curriculum/core HTTP/1.1\\r\\nHost: uit.edu.vn\\r\\n\\r\\n\";\n    cout << \"=== RAW HTTP REQUEST NHẬN TỪ CLIENT ===\" << endl;\n    cout << sampleRequest;\n\n    HttpRequest req = parseSimpleHttp(sampleRequest);\n    cout << \"=== ĐÃ PHÂN TÍCH GÓI TIN ===\" << endl;\n    cout << \"Method: \" << req.method << \" | Path: \" << req.path << \" | Protocol: \" << req.protocol << endl;\n\n    string response = buildHttpResponse(200, \"SE Sanctuary TCP Server OK\");\n    cout << \"\\n=== HTTP RESPONSE GỬI LẠI CLIENT ===\" << endl;\n    cout << response << endl;\n    return 0;\n}\n"
    },
    "keyTechnicalNotes": [
      "Mô hình TCP phân tầng đảm bảo truyền dữ liệu tin cậy thông qua bắt tay 3 bước (3-way handshake) và số thứ tự SEQ/ACK.",
      "Giao thức HTTP hoạt động trên tầng ứng dụng (Application Layer), cấu trúc theo dạng Request/Response với các header phân tách bằng CRLF."
    ],
    "functionOutline": [
      {
        "functionName": "parseSimpleHttp",
        "purpose": "Bóc tách Method, Path và Protocol từ chuỗi Request thô",
        "lineRange": [
          14,
          25
        ]
      },
      {
        "functionName": "buildHttpResponse",
        "purpose": "Đóng gói gói tin phản hồi HTTP với đầy đủ Status code và Content-Length",
        "lineRange": [
          27,
          33
        ]
      },
      {
        "functionName": "main",
        "purpose": "Mô phỏng chu trình Client gửi Request và Server trả Response",
        "lineRange": [
          42,
          57
        ]
      }
    ],
    "expectedConsoleOutput": "=== RAW HTTP REQUEST NHẬN TỪ CLIENT ===\nGET /api/curriculum/core HTTP/1.1\r\nHost: uit.edu.vn\r\n\r\n=== ĐÃ PHÂN TÍCH GÓI TIN ===\nMethod: GET | Path: /api/curriculum/core | Protocol: HTTP/1.1\n\n=== HTTP RESPONSE GỬI LẠI CLIENT ===\nHTTP/1.1 200 OK\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Length: 26\r\n\r\nSE Sanctuary TCP Server OK",
    "miniChallengePrompt": "Bổ sung tính năng phân tích Query Parameters trong Path (ví dụ: /search?category=backend&page=1 thành key-value map)."
  },
  {
    "id": "SE104-PB01",
    "subjectId": "SE104",
    "title": "Kiểm Thử Hướng Phát Triển (TDD) & Ranh Giới Nghiệp Vụ",
    "category": "Quy trình Phần mềm & Kiểm thử",
    "filenameByLang": {
      "TS": "unit_test_tdd_playbook.ts"
    },
    "sourceCodeByLang": {
      "TS": "// ============================================================================\n// TẦNG 1: KHAI BÁO KIỂU NGHIỆP VỤ & MINI TEST FRAMEWORK\n// ============================================================================\ninterface StudentCreditSummary {\n  studentId: string;\n  completedSubjectIds: string[];\n  totalCredits: number;\n  isEligibleForGraduation: boolean;\n}\n\n// Mini Test Assertion Runner\nfunction assertEqual<T>(actual: T, expected: T, testName: string) {\n  if (actual === expected) {\n    console.log(`✅ [PASS] ${testName}`);\n  } else {\n    console.error(`❌ [FAIL] ${testName} -> Kỳ vọng: ${expected}, Thực tế: ${actual}`);\n  }\n}\n\n// ============================================================================\n// TẦNG 2: NGHIỆP VỤ TDD ĐƯỢC PHÁT TRIỂN THEO CÁC TEST CASES\n// ============================================================================\nconst SUBJECT_CREDIT_MAP: Record<string, number> = {\n  IT001: 4, IT002: 4, IT003: 4, IT004: 4, IT005: 3,\n  IT007: 3, IT012: 3, SE005: 3, SE104: 3, SE113: 3, SE117: 3,\n};\n\nfunction calculateStudentProgress(studentId: string, completedIds: string[]): StudentCreditSummary {\n  let totalCredits = 0;\n  for (const id of completedIds) {\n    if (SUBJECT_CREDIT_MAP[id]) {\n      totalCredits += SUBJECT_CREDIT_MAP[id];\n    }\n  }\n  // Giả định điều kiện tốt nghiệp Core Base là hoàn thành đủ 37 tín chỉ của 11 môn\n  const isEligibleForGraduation = totalCredits >= 37;\n  return { studentId, completedSubjectIds: completedIds, totalCredits, isEligibleForGraduation };\n}\n\n// ============================================================================\n// TẦNG 3: LƯU Ý KỸ THUẬT VỀ TDD CYCLE (RED - GREEN - REFACTOR)\n// ============================================================================\n// Lưu ý: Viết test case trước để định hình Interface rõ ràng. Test bao quát:\n// 1. Happy Path, 2. Boundary Value (Đúng 37 tín chỉ), 3. Invalid Subject IDs.\n\n// ============================================================================\n// TẦNG 4: HÀM MAIN() CHẠY KIỂM CHỨNG TỰ ĐỘNG\n// ============================================================================\nfunction runTddSuite() {\n  console.log(\"=== CHẠY BỘ KIỂM CHỨNG TDD (SE104 / SE113) ===\");\n  \n  // Case 1: Sinh viên chưa học môn nào\n  const res1 = calculateStudentProgress(\"SE_001\", []);\n  assertEqual(res1.totalCredits, 0, \"Case 1: Sinh vien moi nhap hoc dat 0 tin chi\");\n  assertEqual(res1.isEligibleForGraduation, false, \"Case 1: Chua du dieu kien tot nghiep\");\n\n  // Case 2: Sinh viên hoàn thành 3 môn\n  const res2 = calculateStudentProgress(\"SE_002\", [\"IT001\", \"IT002\", \"IT003\"]);\n  assertEqual(res2.totalCredits, 12, \"Case 2: 3 mon IT001 + IT002 + IT003 = 12 tin chi\");\n\n  // Case 3: Sinh viên hoàn thành toàn bộ 11 môn CORE_BASE (37 tín chỉ)\n  const allCoreIds = [\"SE005\", \"IT001\", \"IT002\", \"SE117\", \"IT003\", \"IT012\", \"IT004\", \"IT007\", \"IT005\", \"SE104\", \"SE113\"];\n  const res3 = calculateStudentProgress(\"SE_003\", allCoreIds);\n  assertEqual(res3.totalCredits, 37, \"Case 3: Dat dung nguong 37 tin chi\");\n  assertEqual(res3.isEligibleForGraduation, true, \"Case 3: Du dieu kien hoan thanh Core Base\");\n}\n\nrunTddSuite();\n"
    },
    "keyTechnicalNotes": [
      "Phương pháp TDD (Test-Driven Development) tuân thủ nghiêm ngặt chu trình: Viết test lỗi (Red) -> Viết code vừa đủ chạy đúng (Green) -> Tối ưu hóa mã nguồn (Refactor).",
      "Luôn kiểm thử các giá trị biên (Boundary Value Analysis) như danh sách rỗng, vừa đủ ngưỡng điều kiện hoặc vượt ngưỡng."
    ],
    "functionOutline": [
      {
        "functionName": "assertEqual",
        "purpose": "Khung so khớp kết quả kiểm thử tự động",
        "lineRange": [
          13,
          20
        ]
      },
      {
        "functionName": "calculateStudentProgress",
        "purpose": "Hàm tính toán tín chỉ tích lũy và kiểm tra điều kiện hoàn thành Core Base",
        "lineRange": [
          29,
          39
        ]
      },
      {
        "functionName": "runTddSuite",
        "purpose": "Bộ kiểm thử tự động với 3 kịch bản: Rỗng, Trung gian và Hoàn tất 11 môn",
        "lineRange": [
          47,
          65
        ]
      }
    ],
    "expectedConsoleOutput": "=== CHẠY BỘ KIỂM CHỨNG TDD (SE104 / SE113) ===\n✅ [PASS] Case 1: Sinh vien moi nhap hoc dat 0 tin chi\n✅ [PASS] Case 1: Chua du dieu kien tot nghiep\n✅ [PASS] Case 2: 3 mon IT001 + IT002 + IT003 = 12 tin chi\n✅ [PASS] Case 3: Dat dung nguong 37 tin chi\n✅ [PASS] Case 3: Du dieu kien hoan thanh Core Base",
    "miniChallengePrompt": "Viết thêm một Test Case kiểm tra trường hợp danh sách truyền vào chứa các mã môn không hợp lệ (không tồn tại trong chương trình đào tạo)."
  }
];

  /**
   * Thuật toán tính toán Môn Cầu Nối và Môn Miễn Học Lại khi chuyển ngành (Zero-Overlap Career Bridge)
   * Phép tính tập hợp: Bridge(From -> To) = To.Specialized \ (CORE_BASE ∪ From.Specialized ∪ Completed)
   * 
   * @param {string|Object} currentWay - ID ngành hiện tại (VD: 'WAY_01_BACKEND') hoặc config object
   * @param {string|Object} targetWay - ID ngành mục tiêu (VD: 'WAY_02_FULLSTACK') hoặc config object
   * @param {string[]} [userCompletedIds=[]] - Danh sách các mã môn người học đã tích lũy
   * @returns {Object} CareerBridgePlan chứa sharedSubjectIds, bridgeSubjectIds và chi tiết từng môn
   */
  function resolveCareerBridge(currentWay, targetWay, userCompletedIds) {
    const completedList = Array.isArray(userCompletedIds) ? userCompletedIds : [];

    const current = typeof currentWay === 'string' ? CAREER_WAYS[currentWay] : currentWay;
    const target = typeof targetWay === 'string' ? CAREER_WAYS[targetWay] : targetWay;

    if (!current || !target) {
      throw new Error('[resolveCareerBridge] currentWay hoặc targetWay không hợp lệ.');
    }

    // Tập hợp toàn bộ môn học người học đã có / được bao phủ
    const coveredSet = new Set([
      ...(current.coreSubjectIds || CORE_BASE_SUBJECT_IDS),
      ...(current.specializedSubjectIds || []),
      ...completedList,
    ]);

    const sharedSubjectIds = [];
    const bridgeSubjectIds = [];

    const targetSpecialized = target.specializedSubjectIds || [];

    for (let i = 0; i < targetSpecialized.length; i++) {
      const subjId = targetSpecialized[i];
      if (coveredSet.has(subjId)) {
        sharedSubjectIds.push(subjId);
      } else {
        bridgeSubjectIds.push(subjId);
      }
    }

    // Map chi tiết thực thể môn học để UI có thể hiển thị trực tiếp mà không cần tra cứu phụ
    const sharedSubjectDetails = sharedSubjectIds.map(function(id) {
      return SUBJECTS[id] || { id: id, name: id, isCoreBase: false, credits: 3, prerequisites: [] };
    });

    const bridgeSubjectDetails = bridgeSubjectIds.map(function(id) {
      return SUBJECTS[id] || { id: id, name: id, isCoreBase: false, credits: 3, prerequisites: [] };
    });

    return {
      fromWay: current.id,
      fromWayName: current.name,
      toWay: target.id,
      toWayName: target.name,
      sharedSubjectIds: sharedSubjectIds,
      bridgeSubjectIds: bridgeSubjectIds,
      sharedSubjectDetails: sharedSubjectDetails,
      bridgeSubjectDetails: bridgeSubjectDetails,
      totalBridgeCredits: bridgeSubjectDetails.reduce(function(acc, s) { return acc + (s.credits || 3); }, 0),
    };
  }

  /**
   * Helper Tra Cứu Tiện Ích
   */
  function getSubject(subjectId) {
    return SUBJECTS[subjectId] || null;
  }

  function getCoreSubjects() {
    return CORE_BASE_SUBJECT_IDS.map(function(id) {
      return SUBJECTS[id];
    }).filter(Boolean);
  }

  function getSpecializedSubjects(wayId) {
    const way = CAREER_WAYS[wayId];
    if (!way) return [];
    return way.specializedSubjectIds.map(function(id) {
      return SUBJECTS[id];
    }).filter(Boolean);
  }

  function getCareerWay(wayId) {
    return CAREER_WAYS[wayId] || null;
  }

  function getAllCareerWays() {
    return Object.keys(CAREER_WAYS).map(function(k) {
      return CAREER_WAYS[k];
    });
  }

  function getPlaybook(playbookId) {
    for (let i = 0; i < PLAYBOOKS.length; i++) {
      if (PLAYBOOKS[i].id === playbookId) return PLAYBOOKS[i];
    }
    return null;
  }

  function getPlaybooksBySubject(subjectId) {
    return PLAYBOOKS.filter(function(pb) {
      return pb.subjectId === subjectId;
    });
  }

  function getLanguageCrossovers() {
    return LANGUAGE_CROSSOVERS;
  }

  function getPredefinedCareerCrossovers() {
    return CAREER_CROSSOVERS;
  }

  // Public Interface
  return {
    version: '2.0.0',
    CORE_BASE_SUBJECT_IDS: CORE_BASE_SUBJECT_IDS,
    SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGES,
    LANGUAGE_CROSSOVERS: LANGUAGE_CROSSOVERS,
    SUBJECTS: SUBJECTS,
    CAREER_WAYS: CAREER_WAYS,
    CAREER_CROSSOVERS: CAREER_CROSSOVERS,
    PLAYBOOKS: PLAYBOOKS,
    
    // Core Algorithms & APIs
    resolveCareerBridge: resolveCareerBridge,
    getSubject: getSubject,
    getCoreSubjects: getCoreSubjects,
    getSpecializedSubjects: getSpecializedSubjects,
    getCareerWay: getCareerWay,
    getAllCareerWays: getAllCareerWays,
    getPlaybook: getPlaybook,
    getPlaybooksBySubject: getPlaybooksBySubject,
    getLanguageCrossovers: getLanguageCrossovers,
    getPredefinedCareerCrossovers: getPredefinedCareerCrossovers
  };
});
