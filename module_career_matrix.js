/**
 * ============================================================================
 * SE SANCTUARY — MODULE CAREER MATRIX & BRIDGE CALCULATOR (ZERO-OVERLAP ENGINE)
 * ============================================================================
 * 
 * Chức năng:
 * 1. Khám phá 11 Hướng đi nghề nghiệp UIT (WAY_01 đến WAY_11) với thẻ chi tiết,
 *    danh mục 11 môn CORE_BASE dùng chung và chuỗi môn chuyên ngành theo thứ tự.
 * 2. Bộ công cụ tính điểm giao chuyển ngành (Interactive Career Bridge Calculator):
 *    Chọn "Từ Ngành Hiện Tại" -> "Sang Ngành Mục Tiêu", kích hoạt thuật toán
 *    resolveCareerBridge để tách biệt Môn Đã Tích Lũy (Shared) & Môn Cầu Nối (Bridge).
 * 3. Bản đồ Điểm giao đa ngôn ngữ (Language Crossover & Side-by-Side Mental Model):
 *    Lộ trình L1 -> L2 -> L3 -> L4, 8 Điểm giao kinh điển (CROSS_01..08) và
 *    bảng Playbook đối chiếu song song cách tư duy giữa các ngôn ngữ.
 * 
 * Tương thích: SE Sanctuary Organic Editorial Design System (4 themes).
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. KHO DỮ LIỆU CHUẨN: 11 MÔN CORE_BASE (SINGLE SOURCE OF TRUTH)
     ========================================================================== */
  const CORE_BASE_SUBJECTS = [
    {
      id: 'SE005',
      code: 'SE005',
      name: 'Nhập môn Kỹ thuật Phần mềm',
      credits: 3,
      semester: 'Học kỳ 1',
      desc: 'Tư duy kỹ sư phần mềm, quy trình SDLC, Git workflow, quản lý phiên bản và đạo đức nghề nghiệp.',
      tags: ['Git/GitHub', 'SDLC', 'Software Ethics'],
      playbookKey: 'git_workflow_playbook'
    },
    {
      id: 'IT001',
      code: 'IT001',
      name: 'Nhập môn Lập trình',
      credits: 4,
      semester: 'Học kỳ 1',
      desc: 'Tư duy thuật toán, biến, rẽ nhánh, vòng lặp, mảng 1D, mảng 2D (chuẩn mang2chieu.cpp), hàm và modular code.',
      tags: ['Algorithm', '2D-Array', 'C++ Basics'],
      playbookKey: 'mang2chieu.cpp'
    },
    {
      id: 'IT002',
      code: 'IT002',
      name: 'Lập trình Hướng đối tượng (OOP)',
      credits: 4,
      semester: 'Học kỳ 2',
      desc: '4 trụ cột OOP, Con trỏ & Vùng nhớ, Abstract Class, Virtual Function, Vtable, Đa hình động và thiết kế lớp.',
      tags: ['OOP', 'Polymorphism', 'Virtual Table'],
      playbookKey: 'oop_ke_thua_da_hinh.cpp'
    },
    {
      id: 'SE117',
      code: 'SE117',
      name: 'Kỹ thuật Lập trình',
      credits: 3,
      semester: 'Học kỳ 2',
      desc: 'Quản trị bộ nhớ Heap/Stack, đệ quy, kỹ thuật tối ưu hóa mã nguồn, con trỏ hàm và xử lý file nhị phân.',
      tags: ['Heap/Stack', 'Recursion', 'Memory Tuning'],
      playbookKey: 'memory_pointer_playbook'
    },
    {
      id: 'IT003',
      code: 'IT003',
      name: 'Cấu trúc Dữ liệu & Giải thuật',
      credits: 4,
      semester: 'Học kỳ 3',
      desc: 'Danh sách liên kết, Stack, Queue, Cây nhị phân tìm kiếm (BST), Bảng băm (Hash Table), Đồ thị và giải thuật sắp xếp O(n log n).',
      tags: ['Linked List', 'BST', 'Sorting', 'Hash Table'],
      playbookKey: 'danh_sach_lien_ket.cpp'
    },
    {
      id: 'IT012',
      code: 'IT012',
      name: 'Tổ chức & Cấu trúc Máy tính II',
      credits: 3,
      semester: 'Học kỳ 3',
      desc: 'Kiến trúc CPU, tập lệnh Assembly, thanh ghi, ALU, hệ thống Cache, bitwise logic và mô phỏng thực thi lệnh phần cứng.',
      tags: ['Assembly', 'CPU/ALU', 'Cache Architecture'],
      playbookKey: 'bitwise_memory_layout.c'
    },
    {
      id: 'IT004',
      code: 'IT004',
      name: 'Cơ sở Dữ liệu',
      credits: 4,
      semester: 'Học kỳ 4',
      desc: 'Mô hình thực thể ERD, quan hệ bảng, chuẩn hóa 1NF-BCNF, SQL nâng cao, Indexing B-Tree và giao dịch ACID.',
      tags: ['SQL', 'Normalization', 'ACID', 'Indexing'],
      playbookKey: 'sql_queries_and_transactions.sql'
    },
    {
      id: 'IT007',
      code: 'IT007',
      name: 'Hệ điều hành',
      credits: 4,
      semester: 'Học kỳ 4',
      desc: 'Quản trị Process/Thread, Race Condition, Khóa Mutex/Semaphore, Deadlock, Bộ nhớ ảo Paging và File System.',
      tags: ['Multithreading', 'Mutex', 'Virtual Memory'],
      playbookKey: 'concurrency_mutex_threads.cpp'
    },
    {
      id: 'IT005',
      code: 'IT005',
      name: 'Nhập môn Mạng Máy tính',
      credits: 4,
      semester: 'Học kỳ 4',
      desc: 'Mô hình OSI/TCP-IP, Subnetting IPv4/v6, Socket Programming TCP/UDP, phân tích gói tin HTTP/DNS và an toàn mạng.',
      tags: ['TCP/IP', 'Socket', 'HTTP Protocol'],
      playbookKey: 'tcp_socket_client_server.cpp'
    },
    {
      id: 'SE104',
      code: 'SE104',
      name: 'Nhập môn Công nghệ Phần mềm',
      credits: 4,
      semester: 'Học kỳ 5',
      desc: 'Quy trình sản xuất phần mềm hiện đại, đặc tả yêu cầu SRS, biểu đồ UML, mô hình hóa hệ thống và đồ án chuyên ngành.',
      tags: ['Software Engineering', 'UML', 'SRS Spec'],
      playbookKey: 'software_engineering_flow.md'
    },
    {
      id: 'SE113',
      code: 'SE113',
      name: 'Kiểm chứng Phần mềm',
      credits: 3,
      semester: 'Học kỳ 5',
      desc: 'Chiến lược kiểm thử chất lượng cao: TDD, Unit Test, Boundary Value Analysis, Mocking, Coverage và kiểm thử tích hợp.',
      tags: ['TDD', 'Unit Testing', 'Quality Assurance'],
      playbookKey: 'unit_test_tdd_playbook.ts'
    }
  ];

  /* ==========================================================================
     2. BẢN ĐỒ MÔN HỌC CHUYÊN NGÀNH DUY NHẤT (ALL SPECIALIZED SUBJECTS MAP)
     ========================================================================== */
  const SPECIALIZED_SUBJECTS_CATALOG = {
    // Backend & Systems
    SE100: { code: 'SE100', name: 'Thực hành Kiến trúc Phần mềm', credits: 3, role: 'Nền tảng tổ chức code theo Layered Architecture, Repository Pattern và Dependency Injection.' },
    SE310: { code: 'SE310', name: 'Công nghệ .NET', credits: 3, role: 'Phát triển Enterprise Backend với C# .NET, Entity Framework Core, Web API và bảo mật Identity.' },
    SE330: { code: 'SE330', name: 'Lập trình Ứng dụng với Java', credits: 3, role: 'Xây dựng dịch vụ doanh nghiệp với Spring Boot, Hibernate ORM và hệ sinh thái JVM.' },
    SE334: { code: 'SE334', name: 'Lập trình Web Nâng cao', credits: 3, role: 'Thiết kế RESTful API chuẩn, Rate Limiting, Caching với Redis và Authentication OAuth2/JWT.' },
    SE332: { code: 'SE332', name: 'Hệ Quản trị CSDL Nâng cao', credits: 4, role: 'Phân vùng dữ liệu (Partitioning/Sharding), Replica, B-Tree Tuning và NoSQL phân tán.' },
    SE361: { code: 'SE361', name: 'Kiến trúc Microservices', credits: 4, role: 'Phân rã hệ thống, API Gateway, giao tiếp gRPC, Event-Driven với Apache Kafka và SAGA.' },
    SE356: { code: 'SE356', name: 'Kiến trúc Phần mềm Chuyên sâu', credits: 4, role: 'Làm chủ Clean Architecture, Hexagonal, Domain-Driven Design (DDD) và CQRS/Event Sourcing.' },
    SE406: { code: 'SE406', name: 'Mẫu Thiết kế Nâng cao (Design Patterns)', credits: 3, role: 'Làm chủ 23 mẫu thiết kế GoF và các mẫu phục hồi phân tán (Circuit Breaker, Bulkhead).' },

    // Full-Stack & Frontend
    IT008: { code: 'IT008', name: 'Lập trình Trực quan', credits: 3, role: 'Cung cấp nền tảng tương tác đồ họa, Event Dispatching và mô hình Component UI.' },
    SE347: { code: 'SE347', name: 'Công nghệ Web Hiện đại', credits: 4, role: 'Thành thạo SPA frameworks (React/Next.js/Vue), Virtual DOM, SSR và State Management.' },
    SE364: { code: 'SE364', name: 'Thiết kế Giao diện & Trải nghiệm (UI/UX)', credits: 3, role: 'Nguyên lý thiết kế Design System, Figma wireframing, Accessibility (WCAG) và User Journey.' },
    SE360: { code: 'SE360', name: 'Điện toán Đám mây & Serverless', credits: 4, role: 'Triển khai hạ tầng AWS/GCP, Container Docker, Serverless Cloud Functions và CI/CD.' },
    SE368: { code: 'SE368', name: 'Kỹ thuật Phát triển Hướng Trải nghiệm (Vibe Coding)', credits: 3, role: 'Tận dụng AI coding assistants, rapid prototyping, tương tác hiện đại và full-stack delivery.' },

    // Mobile
    SE114: { code: 'SE114', name: 'Lập trình Ứng dụng Di động Cơ bản', credits: 4, role: 'Vòng đời ứng dụng Mobile (Activity/Lifecycle), UI widgets, SQLite/Room và REST client.' },
    SE215: { code: 'SE215', name: 'Thiết kế Kiến trúc Di động Hiện đại', credits: 3, role: 'Kiến trúc MVVM/MVI, State Management (Riverpod/Bloc) và kiến trúc Clean trên Mobile.' },
    SE346: { code: 'SE346', name: 'Lập trình Di động Nâng cao', credits: 4, role: 'Native modules (Kotlin/Swift), Background tasks, Push notification, Camera và Geofencing.' },
    SE407: { code: 'SE407', name: 'Tối ưu Hiệu năng & Bảo mật Di động', credits: 3, role: 'Memory profiling, giảm GPU overdraw, Code obfuscation (ProGuard) và mã hóa cục bộ.' },

    // DevOps & SRE
    SE109: { code: 'SE109', name: 'Quản trị Linux & Bash Scripting', credits: 3, role: 'Quản trị hệ điều hành máy chủ Linux, tự động hóa tác vụ bằng Bash, SSH và Networking.' },
    SE359: { code: 'SE359', name: 'Kỹ thuật DevOps & Tự động hóa CI/CD', credits: 4, role: 'Xây dựng pipeline CI/CD với GitHub Actions, GitLab CI, đóng gói Docker và quản lý Artifact.' },
    SE362: { code: 'SE362', name: 'An toàn & Bảo mật Phần mềm (DevSecOps)', credits: 3, role: 'Tích hợp quét mã SAST/DAST, bảo mật Secrets (HashiCorp Vault) và tuân thủ OWASP.' },

    // Data & Big Data
    SE313: { code: 'SE313', name: 'Thuật toán Xử lý Dữ liệu Thông minh', credits: 3, role: 'Giải thuật tối ưu hóa, khai phá quy luật, đồ thị dữ liệu và tìm kiếm tương đồng vector.' },
    SE363: { code: 'SE363', name: 'Công nghệ Dữ liệu Lớn (Big Data)', credits: 4, role: 'Xử lý luồng dữ liệu phân tán quy mô Terabyte với Apache Spark, Hadoop HDFS và Kafka.' },

    // AI & Agentic Systems
    SE118: { code: 'SE118', name: 'Tích hợp Trí tuệ Nhân tạo vào Phần mềm', credits: 4, role: 'Tích hợp LLM APIs (Gemini/OpenAI/Claude), Prompt Engineering, Function Calling và RAG.' },
    SE365: { code: 'SE365', name: 'Học Sâu & Thị giác Máy tính / NLP', credits: 4, role: 'Nền tảng mạng nơ-ron sâu (CNN, RNN, Transformers), Fine-tuning và Vector Embeddings.' },
    SE367: { code: 'SE367', name: 'Hệ thống Đa Tác tử (Multi-Agent Systems)', credits: 4, role: 'Thiết kế hệ bầy đàn đa agent tương tác, giao thức FIPA, đàm phán và giải quyết xung đột.' },
    SE373: { code: 'SE373', name: 'Kỹ thuật Xây dựng Agentic AI', credits: 4, role: 'Làm chủ vòng lặp ReAct, Tool-calling tự động, bộ nhớ dài hạn và giao thức Model Context (MCP).' },
    SE374: { code: 'SE374', name: 'Đánh giá & Giám sát Hệ thống AI Tự chủ', credits: 3, role: 'Đo lường độ ảo giác (Hallucination), xây dựng rào chắn AI Guardrails và kiểm thử RAG.' },

    // QA & AppSec
    SE214: { code: 'SE214', name: 'Kiểm thử Tự động & Quản lý Chất lượng', credits: 4, role: 'Viết kịch bản kiểm thử E2E với Playwright, Selenium, Page Object Model và BDD Cucumber.' },

    // UI/UX & Spatial XR
    SE352: { code: 'SE352', name: 'Lập trình Thực tế Ảo & Tăng cường (VR/AR)', credits: 4, role: 'Phát triển trải nghiệm không gian 3D tương tác với WebXR, Three.js và Unity XR.' },

    // BA, PM & Enterprise Architect
    SE357: { code: 'SE357', name: 'Phân tích Yêu cầu Phần mềm Chuyên sâu', credits: 4, role: 'Kỹ thuật khai thác yêu cầu khách hàng, mô hình hóa quy trình kinh doanh BPMN 2.0.' },
    SE358: { code: 'SE358', name: 'Quản trị Dự án Phần mềm Chuẩn Agile/Scrum', credits: 4, role: 'Vận hành Sprint, Backlog Grooming, Jira/Confluence, quản trị rủi ro và đo lường Velocity.' },
    SS004: { code: 'SS004', name: 'Kỹ năng Giao tiếp & Đàm phán Kỹ thuật', credits: 3, role: 'Thuyết phục khách hàng, giải quyết xung đột kiến trúc và giao tiếp đa phòng ban.' },

    // Game Dev
    SE102: { code: 'SE102', name: 'Nhập môn Phát triển Game & Toán học Game', credits: 3, role: 'Toán học vector, biến đổi ma trận 2D/3D, lượng giác và vòng lặp Game Loop căn bản.' },
    SE115: { code: 'SE115', name: 'Lập trình Game 2D với Unity & C#', credits: 4, role: 'Vật lý 2D Rigidbody, Animator State Machine, Prefabs, Audio và UI Game.' },
    SE116: { code: 'SE116', name: 'Cấu trúc Dữ liệu Chuyên sâu cho Game', credits: 3, role: 'Phân chia không gian (Quadtree/Octree), thuật toán tìm đường A* và Object Pooling.' },
    SE220: { code: 'SE220', name: 'Kiến trúc Hệ thống Trò chơi (Game Engine)', credits: 4, role: 'Làm chủ kiến trúc Entity Component System (ECS), Game State Machine và Memory Optimization.' },
    MM225: { code: 'MM225', name: 'Đồ họa Máy tính & Shader Programming', credits: 4, role: 'Lập trình Vertex/Fragment Shaders (HLSL/GLSL), mô hình chiếu sáng PBR và Post-processing.' },
    SE314: { code: 'SE314', name: 'Lập trình Game 3D Đa nền tảng', credits: 4, role: 'Hệ thống điều hướng NavMesh 3D, Inverse Kinematics, Particle System và Cinematic Camera.' },
    SE315: { code: 'SE315', name: 'Lập trình Máy chủ Mạng cho Game Online', credits: 4, role: 'Truyền thông UDP/TCP, đồng bộ hóa vị trí, Client-side Prediction và Lag Compensation.' },

    // Quantum Computing
    SE120: { code: 'SE120', name: 'Cơ sở Toán học cho Điện toán Lượng tử', credits: 3, role: 'Không gian Hilbert, ma trận Hermite, tích Tensor, số phức và ký hiệu Dirac Ket/Bra.' },
    SE366: { code: 'SE366', name: 'Lập trình Mạch Lượng tử với Qiskit & Cirq', credits: 4, role: 'Khởi tạo Qubit, các cổng lượng tử đơn/đa qubit (Hadamard, CNOT) và đo xác suất trạng thái.' },
    SE375: { code: 'SE375', name: 'Thuật toán Lượng tử (Grover, Shor, VQE)', credits: 4, role: 'Làm chủ thuật toán tìm kiếm Grover O(sqrt(N)), biến đổi Fourier lượng tử QFT và VQE.' },
    SE400: { code: 'SE400', name: 'Học Máy Lượng tử & Ứng dụng Tối ưu Hóa', credits: 4, role: 'Quantum Neural Networks (QNN), mạch lượng tử có tham số hóa PQC và giải bài toán NP-hard.' }
  };

  /* ==========================================================================
     3. 11 HƯỚNG ĐI NGHỀ NGHIỆP UIT (11 CAREER WAYS CONFIGURATION)
     ========================================================================== */
  const CAREER_WAYS = [
    {
      id: 'WAY_01_BACKEND',
      number: 'Way 01',
      icon: '⚙️',
      title: 'Kỹ sư Backend & Kiến trúc Hệ thống',
      englishTitle: 'Backend & Systems Architect',
      category: 'Systems & Cloud',
      salaryRange: '$900 - $3,200',
      badgeClass: 'badge-backend',
      tagline: 'Xây dựng hạ tầng máy chủ phân tán tải cao, thiết kế API mở rộng và an toàn dữ liệu.',
      description: 'Chuyên gia thiết kế xương sống cho các hệ sinh thái phần mềm lớn. Thành thạo phân tầng ứng dụng, cơ sở dữ liệu phân tán, thông điệp bất đồng bộ và kiến trúc Microservices chịu tải hàng triệu requests.',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['SE100', 'SE310', 'SE334', 'SE332', 'SE361', 'SE356', 'SE406'],
      representativePlaybooks: [
        'rest_api_pagination_auth.cs',
        'design_patterns_in_one_file.cpp',
        'microservices_grpc_event.go'
      ]
    },
    {
      id: 'WAY_02_FULLSTACK',
      number: 'Way 02',
      icon: '🌐',
      title: 'Kỹ sư Full-Stack Web & Product',
      englishTitle: 'Full-Stack & Product Engineer',
      category: 'Web & Products',
      salaryRange: '$850 - $2,800',
      badgeClass: 'badge-fullstack',
      tagline: 'Làm chủ toàn diện từ giao diện người dùng mượt mà đến backend đám mây linh hoạt.',
      description: 'Kỹ sư toàn năng có khả năng độc lập triển khai sản phẩm số hoàn chỉnh. Kết hợp thế mạnh trải nghiệm người dùng hiện đại với API vững chắc và tự động hóa quy trình phát hành.',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['IT008', 'SE100', 'SE347', 'SE364', 'SE310', 'SE360', 'SE368'],
      representativePlaybooks: [
        'fullstack_state_and_api.tsx',
        'cloud_serverless_deploy.ts'
      ]
    },
    {
      id: 'WAY_03_MOBILE',
      number: 'Way 03',
      icon: '📱',
      title: 'Kỹ sư Di động & Đa Thiết bị',
      englishTitle: 'Mobile & Multi-Device Engineer',
      category: 'Client & Mobile',
      salaryRange: '$800 - $2,600',
      badgeClass: 'badge-mobile',
      tagline: 'Phát triển ứng dụng Android, iOS và Flutter với trải nghiệm Offline-First siêu mượt.',
      description: 'Xây dựng ứng dụng di động chất lượng cao, tối ưu hóa mức tiêu thụ pin, kết nối phần cứng (GPS, Camera, Biometric) và đảm bảo trải nghiệm người dùng phản hồi ngay tức khắc.',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['IT008', 'SE114', 'SE215', 'SE346', 'SE364', 'SE360', 'SE407'],
      representativePlaybooks: [
        'mobile_offline_sync_storage.dart',
        'native_camera_sensor_kotlin.kt'
      ]
    },
    {
      id: 'WAY_04_DEVOPS',
      number: 'Way 04',
      icon: '☁️',
      title: 'Kỹ sư DevOps, Cloud & SRE',
      englishTitle: 'DevOps & Site Reliability Engineer',
      category: 'Infrastructure & Sec',
      salaryRange: '$1,000 - $3,500',
      badgeClass: 'badge-devops',
      tagline: 'Tự động hóa CI/CD, làm chủ Kubernetes, hạ tầng như mã (IaC) và giám sát hệ thống 99.99%.',
      description: 'Cầu nối quan trọng giữa phát triển và vận hành. Thiết lập hệ thống triển khai không gián đoạn (Zero-Downtime), tự phục hồi sự cố, co giãn theo nhu cầu và phòng chống rủi ro bảo mật.',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['SE109', 'SE359', 'SE360', 'SE361', 'SE362'],
      representativePlaybooks: [
        'ci_cd_docker_k8s_playbook.yaml',
        'linux_monitoring_automation.sh'
      ]
    },
    {
      id: 'WAY_05_DATA',
      number: 'Way 05',
      icon: '📊',
      title: 'Kỹ sư Dữ liệu & Hệ thống Big Data',
      englishTitle: 'Data & Big Data Platform Engineer',
      category: 'Data & AI',
      salaryRange: '$1,000 - $3,200',
      badgeClass: 'badge-data',
      tagline: 'Xây dựng Data Pipeline, Data Lakehouse và xử lý luồng sự kiện thời gian thực quy mô Terabyte.',
      description: 'Kiến trúc sư cho các luồng dữ liệu khổng lồ. Tối ưu hóa truy vấn phân tán, chuẩn hóa dữ liệu lớn để phục vụ phân tích nghiệp vụ chuyên sâu và nuôi dưỡng các mô hình học máy.',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['SE332', 'SE313', 'SE363', 'SE360', 'SE361'],
      representativePlaybooks: [
        'db_indexing_partition_tuning.sql',
        'spark_streaming_pipeline.py'
      ]
    },
    {
      id: 'WAY_06_AI_AGENT',
      number: 'Way 06',
      icon: '🤖',
      title: 'Kỹ sư AI Phần mềm & Agentic AI',
      englishTitle: 'AI Software & Agentic Systems Engineer',
      category: 'Data & AI',
      salaryRange: '$1,200 - $4,000',
      badgeClass: 'badge-ai',
      tagline: 'Biến mô hình ngôn ngữ lớn (LLM) thành hệ thống AI tự chủ giải quyết tác vụ phức tạp.',
      description: 'Lực lượng tiên phong của kỷ nguyên AI. Làm chủ kỹ thuật kết nối công cụ (Tool-Calling), vòng lặp suy luận ReAct, quản trị bộ nhớ tác tử, RAG và phối hợp mạng lưới đa tác tử (Swarm).',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['SE313', 'SE118', 'SE365', 'SE367', 'SE373', 'SE374'],
      representativePlaybooks: [
        'agent_tool_calling_rag_loop.py',
        'eval_rag_pipeline_metrics.py'
      ]
    },
    {
      id: 'WAY_07_QA_SEC',
      number: 'Way 07',
      icon: '🛡️',
      title: 'Kỹ sư QA Automation & An toàn Phần mềm',
      englishTitle: 'QA Automation & AppSec Engineer',
      category: 'Infrastructure & Sec',
      salaryRange: '$800 - $2,500',
      badgeClass: 'badge-qasec',
      tagline: 'Bảo vệ chất lượng sản phẩm toàn diện bằng tự động hóa kiểm thử và kiểm toán bảo mật ứng dụng.',
      description: 'Lá chắn tin cậy của phần mềm. Xây dựng bộ khung kiểm thử hồi quy tự động, dò quét lỗ hổng theo chuẩn OWASP và thiết lập tư duy an toàn bảo mật ngay từ dòng code đầu tiên (Shift-Left).',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['SE109', 'SE214', 'SE359', 'SE362'],
      representativePlaybooks: [
        'e2e_automation_playwright.ts',
        'owasp_sqli_xss_defense.py'
      ]
    },
    {
      id: 'WAY_08_UIUX_XR',
      number: 'Way 08',
      icon: '🎨',
      title: 'Kỹ sư Giao diện, UI/UX & Không gian XR',
      englishTitle: 'UI/UX & Spatial XR Engineer',
      category: 'Client & Mobile',
      salaryRange: '$850 - $2,700',
      badgeClass: 'badge-uiux',
      tagline: 'Thiết kế giao diện tương tác cuốn hút, web 3D và thế giới thực tế ảo/tăng cường (VR/AR).',
      description: 'Sự giao thoa giữa nghệ thuật thị giác và lập trình phần mềm. Làm chủ nguyên lý tâm lý học tương tác người-máy (HCI), công nghệ WebGL/Three.js và điện toán không gian (Spatial Computing).',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['IT008', 'SE215', 'SE364', 'SE347', 'SE352', 'SE368'],
      representativePlaybooks: [
        'threejs_interactive_scene.ts',
        'spatial_gesture_ar.js'
      ]
    },
    {
      id: 'WAY_09_BA_PM_ARCH',
      number: 'Way 09',
      icon: '👔',
      title: 'Kỹ sư BA, Quản trị Dự án & Giải pháp',
      englishTitle: 'BA, Agile PM & Solution Architect',
      category: 'Management & Strategy',
      salaryRange: '$900 - $3,000',
      badgeClass: 'badge-bapm',
      tagline: 'Định hình chiến lược giải pháp, dẫn dắt đội ngũ kỹ thuật và tối ưu giá trị sản phẩm số.',
      description: 'Người phiên dịch hoàn hảo giữa nghiệp vụ doanh nghiệp và công nghệ. Khai thác yêu cầu chuyên sâu, quản trị tiến độ dự án bằng Agile/Scrum và hoạch định kiến trúc tổng thể của sản phẩm.',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['SE357', 'SE215', 'SE358', 'SE214', 'SE356', 'SS004'],
      representativePlaybooks: [
        'bpmn_and_user_story_spec.md',
        'system_c4_model_spec.dsl'
      ]
    },
    {
      id: 'WAY_10_GAME',
      number: 'Way 10',
      icon: '🎮',
      title: 'Kỹ sư Phát triển Game Chuyên nghiệp',
      englishTitle: 'Game Engine & Gameplay Engineer',
      category: 'Creative & Engines',
      salaryRange: '$900 - $3,300',
      badgeClass: 'badge-game',
      tagline: 'Thổi hồn vào thế giới ảo: Mô phỏng vật lý chân thực, đồ họa 3D thời gian thực và mạng đa người chơi.',
      description: 'Lĩnh vực lập trình đòi hỏi tối ưu hiệu năng khắc nghiệt nhất. Làm chủ vòng lặp dựng hình 60-120fps, viết Shaders, cấu trúc dữ liệu không gian và kiến trúc máy chủ game đồng bộ tốc độ cao.',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['SE102', 'SE115', 'SE116', 'SE220', 'MM225', 'SE314', 'SE315'],
      representativePlaybooks: [
        'unity_physics_entity_controller.cs',
        'custom_shader_lighting.hlsl'
      ]
    },
    {
      id: 'WAY_11_QUANTUM',
      number: 'Way 11',
      icon: '⚛️',
      title: 'Kỹ sư Phần mềm & Học máy Lượng tử',
      englishTitle: 'Quantum Computing & QML Engineer',
      category: 'Advanced Research',
      salaryRange: '$1,500 - $4,500',
      badgeClass: 'badge-quantum',
      tagline: 'Tiên phong làm chủ siêu điện toán tương lai: Cổng lượng tử, thuật toán Grover và Quantum AI.',
      description: 'Đỉnh cao của khoa học máy tính hiện đại. Ứng dụng các quy luật vật lý lượng tử (chồng chập, rối lượng tử) để giải quyết các bài toán tối ưu hóa siêu phức tạp mà siêu máy tính cổ điển bó tay.',
      coreSubjectIds: CORE_BASE_SUBJECTS.map(s => s.id),
      specializedSubjectIds: ['SE120', 'SE366', 'SE375', 'SE400'],
      representativePlaybooks: [
        'quantum_circuit_grover_qiskit.py',
        'vqe_molecular_hamiltonian.py'
      ]
    }
  ];

  /* ==========================================================================
     4. 8 ĐIỂM GIAO KINH ĐIỂN (CLASSIC CROSSOVERS PRESETS)
     ========================================================================== */
  const CLASSIC_CROSSOVERS = [
    {
      id: 'CROSS_01',
      fromWay: 'WAY_01_BACKEND',
      toWay: 'WAY_02_FULLSTACK',
      fromLabel: 'Way 01 (Backend)',
      toLabel: 'Way 02 (Full-Stack)',
      savingsRate: '68%',
      bridgeCount: 5,
      summary: 'Mở rộng từ Backend sang giao diện người dùng hiện đại, UI/UX và đám mây.',
      sharedExplanation: 'Đã hoàn thành 11 môn CORE_BASE và các môn chung SE100, SE310 (.NET / Java Web). Bạn chỉ cần bổ sung mảng Frontend và Trải nghiệm sản phẩm.'
    },
    {
      id: 'CROSS_02',
      fromWay: 'WAY_02_FULLSTACK',
      toWay: 'WAY_01_BACKEND',
      fromLabel: 'Way 02 (Full-Stack)',
      toLabel: 'Way 01 (Backend)',
      savingsRate: '68%',
      bridgeCount: 5,
      summary: 'Nâng cấp từ Full-Stack thành chuyên gia Backend chuyên sâu, Microservices & CSDL lớn.',
      sharedExplanation: 'Tận dụng trọn vẹn kiến trúc đa tầng SE100 và công nghệ backend SE310 đã học để tiến thẳng vào chuyên sâu phân tán.'
    },
    {
      id: 'CROSS_03',
      fromWay: 'WAY_01_BACKEND',
      toWay: 'WAY_04_DEVOPS',
      fromLabel: 'Way 01 (Backend)',
      toLabel: 'Way 04 (DevOps/SRE)',
      savingsRate: '75%',
      bridgeCount: 4,
      summary: 'Chuyển đổi từ viết logic nghiệp vụ sang tự động hóa hạ tầng đám mây và Kubernetes.',
      sharedExplanation: 'Kiến thức về Microservices (SE361) và Socket/OS trong CORE_BASE là nền tảng hoàn hảo để tiếp cận Linux, CI/CD và Cloud.'
    },
    {
      id: 'CROSS_04',
      fromWay: 'WAY_01_BACKEND',
      toWay: 'WAY_05_DATA',
      fromLabel: 'Way 01 (Backend)',
      toLabel: 'Way 05 (Data/BigData)',
      savingsRate: '81%',
      bridgeCount: 3,
      summary: 'Từ tối ưu hóa ứng dụng sang làm chủ kho dữ liệu phân tán và Big Data pipelines.',
      sharedExplanation: 'Hệ quản trị CSDL nâng cao (SE332) và Microservices (SE361) đã được học ở Backend, giúp bạn chỉ cần bổ sung 3 môn dữ liệu lớn.'
    },
    {
      id: 'CROSS_05',
      fromWay: 'WAY_01_BACKEND',
      toWay: 'WAY_06_AI_AGENT',
      fromLabel: 'Way 01 (Backend)',
      toLabel: 'Way 06 (AI Agent)',
      savingsRate: '68%',
      bridgeCount: 5,
      summary: 'Nâng tầm hệ thống backend truyền thống thành hệ thống AI tự chủ có khả năng Tool-Calling.',
      sharedExplanation: 'Tư duy API và bất đồng bộ ở Backend giúp người học dễ dàng tích hợp các Agent Loop và xử lý luồng suy luận của LLM.'
    },
    {
      id: 'CROSS_06',
      fromWay: 'WAY_05_DATA',
      toWay: 'WAY_06_AI_AGENT',
      fromLabel: 'Way 05 (Data)',
      toLabel: 'Way 06 (AI Agent)',
      savingsRate: '75%',
      bridgeCount: 4,
      summary: 'Tận dụng thuật toán dữ liệu thông minh để xây dựng mạng lưới Agentic AI đa tác tử.',
      sharedExplanation: 'Môn Thuật toán thông minh (SE313) đã có sẵn trong nhánh Data, cung cấp nền tảng vững chắc cho Deep Learning và Agentic Systems.'
    },
    {
      id: 'CROSS_07',
      fromWay: 'WAY_02_FULLSTACK',
      toWay: 'WAY_03_MOBILE',
      fromLabel: 'Way 02 (Full-Stack)',
      toLabel: 'Way 03 (Mobile)',
      savingsRate: '75%',
      bridgeCount: 4,
      summary: 'Mở rộng khả năng từ lập trình Web sang ứng dụng di động bản địa và đa nền tảng.',
      sharedExplanation: 'Đã hoàn thành Lập trình trực quan (IT008), UI/UX (SE364) và Cloud Backend (SE360), dễ dàng hấp thụ kiến thức kiến trúc Mobile.'
    },
    {
      id: 'CROSS_08',
      fromWay: 'WAY_07_QA_SEC',
      toWay: 'WAY_04_DEVOPS',
      fromLabel: 'Way 07 (QA/AppSec)',
      toLabel: 'Way 04 (DevOps)',
      savingsRate: '87%',
      bridgeCount: 2,
      summary: 'Bước chuyển ngoạn mục từ An toàn & Kiểm thử sang làm chủ toàn bộ vòng đời DevOps.',
      sharedExplanation: 'Đã nắm vững Linux (SE109), CI/CD Testing (SE359) và DevSecOps (SE362). Chỉ cần bổ sung Cloud (SE360) và Microservices (SE361) là đủ chuẩn!'
    }
  ];

  /* ==========================================================================
     5. LỘ TRÌNH ĐA NGÔN NGỮ (LANGUAGE CROSSOVER PATHWAY & COMPARISONS)
     ========================================================================== */
  const LANGUAGE_CROSSOVERS = [
    {
      id: 'START_L1',
      code: 'START_L1',
      stage: 'Bắt đầu tại IT001 (NMLT)',
      title: 'Khởi đầu vững chắc với C++ hoặc Python/TypeScript',
      fromLang: 'Newbie',
      toLang: 'C++ / Python / TS',
      icon: '🌱',
      mentalShift: 'Hình thành tư duy giải thuật, kỷ luật kiểu dữ liệu và hiểu cách máy tính lưu trữ mảng trên thanh RAM.',
      playbookKey: 'mang2chieu.cpp',
      whyCrucial: 'C++ giúp người học nhìn thấu bản chất số byte của biến; Python/TS giúp nhanh chóng kiểm chứng ý tưởng giải thuật.',
      focusSkills: ['Biến & Kiểu dữ liệu', 'Vòng lặp & Rẽ nhánh', 'Mảng 2 chiều', 'Hàm & Tái sử dụng']
    },
    {
      id: 'LANG_XOVER_1',
      code: 'LANG_XOVER_1',
      stage: 'Sau IT002 (OOP) & SE117',
      title: 'Thấu hiểu Vùng nhớ RAM & Con trỏ với C/C++ hoặc Rust',
      fromLang: 'Python / JS',
      toLang: 'C/C++ hoặc Rust',
      icon: '🧠',
      mentalShift: 'Chuyển từ tư duy "biến tự giải phóng" sang trực tiếp quản trị vùng nhớ Stack vs Heap và con trỏ vật lý.',
      playbookKey: 'memory_pointer_playbook',
      whyCrucial: 'Không một kỹ sư giỏi nào có thể tối ưu hệ thống lớn nếu không hiểu rõ con trỏ, tham chiếu và cơ chế rò rỉ vùng nhớ.',
      focusSkills: ['Heap vs Stack', 'Pointer & Reference', 'Virtual Table (Vtable)', 'RAII & Ownership']
    },
    {
      id: 'LANG_XOVER_2',
      code: 'LANG_XOVER_2',
      stage: 'Sau IT004 (CSDL)',
      title: 'Làm chủ OOP Doanh nghiệp & CSDL với C# .NET hoặc Java',
      fromLang: 'C/C++',
      toLang: 'C# .NET / Java Spring',
      icon: '🏢',
      mentalShift: 'Chuyển từ lập trình cấp thấp sang mô hình hóa đối tượng lớn, kiến trúc N tầng và cơ chế giao dịch ACID.',
      playbookKey: 'db_oop_playbook',
      whyCrucial: 'Hơn 70% hệ thống ngân hàng, thương mại điện tử lớn trên thế giới vận hành trên nền tảng C# và Java.',
      focusSkills: ['ORM (EF Core / Hibernate)', 'ACID Transactions', 'Repository Pattern', 'Dependency Injection']
    },
    {
      id: 'LANG_XOVER_3',
      code: 'LANG_XOVER_3',
      stage: 'Trước SE347 (Web) & SE114 (Mobile)',
      title: 'Bất đồng bộ & Trải nghiệm Người dùng với Modern TypeScript',
      fromLang: 'Java / C#',
      toLang: 'TypeScript / Modern JS',
      icon: '⚡',
      mentalShift: 'Chuyển từ mô hình đa luồng đồng bộ (Multi-threaded) sang luồng đơn phi phong tỏa dựa trên Event Loop.',
      playbookKey: 'async_dom_playbook',
      whyCrucial: 'TypeScript mang lại sự an toàn kiểu dữ liệu cho môi trường web năng động, đảm bảo ứng dụng không lỗi lúc runtime.',
      focusSkills: ['Event Loop', 'Promises & async/await', 'Component State', 'Type Narrowing']
    },
    {
      id: 'LANG_XOVER_4',
      code: 'LANG_XOVER_4',
      stage: 'Trước SE361 (Microservices) & SE118 (AI)',
      title: 'Đột phá Hiệu năng cao với Go hoặc AI Pipelines với Python',
      fromLang: 'TypeScript',
      toLang: 'Go (Backend) / Python (AI)',
      icon: '🚀',
      mentalShift: 'Tiếp cận xử lý đồng thời cực nhẹ với Goroutines/Channels hoặc xây dựng chuỗi Agentic suy luận với LLMs.',
      playbookKey: 'concurrency_ai_playbook',
      whyCrucial: 'Go thống trị hạ tầng đám mây (Docker, K8s) và Python là ngôn ngữ mẹ đẻ của toàn bộ kỷ nguyên Trí tuệ Nhân tạo.',
      focusSkills: ['Goroutines & CSP Channels', 'gRPC Microservices', 'Vector Embeddings', 'Agentic Tool-Calling']
    }
  ];

  /* ==========================================================================
     6. PLAYBOOK ĐỐI CHIẾU TƯ DUY SONG SONG (SIDE-BY-SIDE MENTAL MODEL PLAYBOOK)
     ========================================================================== */
  const SIDE_BY_SIDE_PLAYBOOKS = {
    matrix: {
      title: 'Thao Tác Mảng 2 Chiều & Ma Trận',
      category: 'Tổ chức Dữ liệu Cơ bản',
      description: 'So sánh cách các ngôn ngữ cấp phát bộ nhớ cho mảng 2 chiều và duyệt phần tử theo hàng/cột.',
      comparisons: [
        {
          lang: 'C++ (mang2chieu.cpp)',
          paradigm: 'Bộ nhớ tĩnh / Mảng phẳng liền kề',
          notes: 'Mảng C++ cố định số cột trong tham số hàm để trình biên dịch tính toán offset: `offset = i * MAX_COLS + j`.',
          codeSnippet: `// C++: Mảng 2 chiều kích thước cố định
const int MAX_ROWS = 4;
const int MAX_COLS = 3;
typedef int Array2d[MAX_ROWS][MAX_COLS];

void inMang(const Array2d a, int r, int c) {
    for (int i = 0; i < r; ++i) {
        for (int j = 0; j < c; ++j) {
            cout << a[i][j] << " ";
        }
        cout << "\\n";
    }
}`
        },
        {
          lang: 'Python (mang2chieu.py)',
          paradigm: 'Danh sách lồng danh sách (List of References)',
          notes: 'Trong Python, mỗi hàng là một đối tượng List độc lập được trỏ bởi một List cha. Không đảm bảo bộ nhớ liền kề.',
          codeSnippet: `# Python: List comprehension động
def in_mang_2d(matrix: list[list[int]]) -> None:
    for row in matrix:
        print(" ".join(f"{val:2d}" for val in row))

# Khởi tạo ma trận 4x3 toàn 0
matrix = [[0 for _ in range(3)] for _ in range(4)]
matrix[0][1] = 99`
        },
        {
          lang: 'TypeScript (mang2chieu.ts)',
          paradigm: 'V8 Array Heap & Type Safe',
          notes: 'TypeScript kiểm tra kiểu `number[][]` lúc biên dịch; khi thực thi V8 Engine tối ưu hóa nếu mảng không bị lỗ rỗng.',
          codeSnippet: `// TypeScript: Type safe 2D array
type Matrix2D = number[][];

function printMatrix(m: Matrix2D): void {
  for (let r = 0; r < m.length; r++) {
    console.log(m[r].map(v => v.toString().padStart(3)).join(' '));
  }
}`
        }
      ]
    },
    memory: {
      title: 'Quản Lý Vùng Nhớ, Con Trỏ & Thu Gom Rác',
      category: 'Bản chất Vùng Nhớ',
      description: 'Đối chiếu tư duy quản lý vùng nhớ thủ công (C++), an toàn mượn dữ liệu (Rust) và thu gom tự động (GC trong Java/TS).',
      comparisons: [
        {
          lang: 'C++ (Thủ công & RAII)',
          paradigm: 'Manual Heap Allocation',
          notes: 'Lập trình viên trực tiếp gọi `new` và `delete`. Quên giải phóng gây Memory Leak; xóa 2 lần gây Crash.',
          codeSnippet: `int* p = new int(42);
cout << "Dia chi RAM: " << p << " | Gia tri: " << *p << endl;
// Bắt buộc phải giải phóng khi dùng xong:
delete p;
p = nullptr; // Chống Dangling Pointer`
        },
        {
          lang: 'Rust (Ownership & Borrowing)',
          paradigm: 'Compile-Time Safety (Không cần GC)',
          notes: 'Trình biên dịch Rust kiểm tra thời gian sống (Lifetimes). Khi biến ra khỏi phạm vi (Scope), bộ nhớ tự động được giải phóng an toàn 100%.',
          codeSnippet: `{
    let b = Box::new(42); // Cấp phát Heap an toàn
    println!("Gia tri: {}", b);
} // b tự động drop tại đây, không bao giờ rò rỉ!`
        },
        {
          lang: 'Java / C# (Managed Heap & GC)',
          paradigm: 'Garbage Collection',
          notes: 'Bộ thu gom rác tự động quét định kỳ các đối tượng không còn tham chiếu để thu hồi. Đổi lại có thể phát sinh độ trễ GC Pause.',
          codeSnippet: `Integer num = Integer.valueOf(42);
// Không cần giải phóng thủ công.
// Garbage Collector sẽ tự động dọn dẹp khi biến mất tham chiếu.`
        }
      ]
    },
    concurrency: {
      title: 'Xử Lý Bất Đồng Bộ & Xử Lý Đồng Thời',
      category: 'Kiến trúc Concurrency',
      description: 'So sánh luồng OS (C++), Event Loop (TS), Goroutines (Go) và Task Async (C#).',
      comparisons: [
        {
          lang: 'Go (Goroutines & Channels)',
          paradigm: 'CSP Concurrency (~2KB/goroutine)',
          notes: 'Triết lý Go: "Đừng giao tiếp bằng cách chia sẻ bộ nhớ; hãy chia sẻ bộ nhớ bằng cách giao tiếp qua Channel".',
          codeSnippet: `func worker(ch chan string) {
    ch <- "Hoan thanh tac vu"
}

func main() {
    ch := make(chan string)
    go worker(ch) // Chạy nhẹ tênh trên hàng triệu routine
    msg := <-ch
    fmt.Println(msg)
}`
        },
        {
          lang: 'TypeScript (Event Loop & Async/Await)',
          paradigm: 'Single-Threaded Non-Blocking',
          notes: 'Không cần khóa Mutex vì chỉ chạy trên một luồng chính; tác vụ I/O được đẩy vào Web API / Libuv và gọi lại qua Microtask Queue.',
          codeSnippet: `async function fetchData(url: string): Promise<Data> {
  const res = await fetch(url);
  const data = await res.json();
  return data;
} // Không block giao diện người dùng`
        },
        {
          lang: 'C++ (std::thread & std::mutex)',
          paradigm: 'OS Kernel Threads & Locks',
          notes: 'Luồng thật của hệ điều hành. Phải cẩn trọng dùng `std::lock_guard` để tránh lỗi Race Condition giữa các luồng.',
          codeSnippet: `std::mutex mtx;
int counter = 0;

void tangGiaTri() {
    std::lock_guard<std::mutex> lock(mtx);
    counter++; // An toàn tuyệt đối không bị race condition
}`
        }
      ]
    }
  };

  /* ==========================================================================
     7. THUẬT TOÁN TÍNH ĐIỂM GIAO CHUYỂN NGÀNH (ZERO-OVERLAP RESOLVER)
     ========================================================================== */
  function resolveCareerBridge(fromWayId, toWayId, userCompletedIds = []) {
    const fromWay = CAREER_WAYS.find(w => w.id === fromWayId) || CAREER_WAYS[0];
    const toWay = CAREER_WAYS.find(w => w.id === toWayId) || CAREER_WAYS[1];

    const coreIds = CORE_BASE_SUBJECTS.map(s => s.id);
    const fromSpecializedIds = fromWay.specializedSubjectIds || [];

    // Tập hợp tất cả các môn người học đã tích lũy từ ngành cũ + các môn người dùng đánh dấu xong
    const coveredSet = new Set([
      ...coreIds,
      ...fromSpecializedIds,
      ...userCompletedIds
    ]);

    const sharedSpecializedIds = [];
    const bridgeSubjectIds = [];

    // Quét các môn chuyên ngành của ngành mục tiêu
    for (const subjId of toWay.specializedSubjectIds) {
      if (coveredSet.has(subjId)) {
        sharedSpecializedIds.push(subjId);
      } else {
        bridgeSubjectIds.push(subjId);
      }
    }

    const totalTargetSubjects = coreIds.length + toWay.specializedSubjectIds.length;
    const totalSharedSubjects = coreIds.length + sharedSpecializedIds.length;
    const matchPercentage = Math.min(100, Math.round((totalSharedSubjects / totalTargetSubjects) * 100));

    // Tính toán số tín chỉ
    const bridgeCredits = bridgeSubjectIds.reduce((sum, id) => {
      const s = SPECIALIZED_SUBJECTS_CATALOG[id];
      return sum + (s ? s.credits : 3);
    }, 0);

    const savedCredits = totalSharedSubjects * 3.6; // Ước tính trung bình mỗi môn 3.6 tín chỉ
    const estimatedMonthsSaved = Math.max(3, Math.round((totalSharedSubjects / 5) * 4.5));

    return {
      fromWay: fromWay.id,
      toWay: toWay.id,
      fromWayObj: fromWay,
      toWayObj: toWay,
      coreSharedIds: coreIds,
      sharedSpecializedIds,
      allSharedIds: [...coreIds, ...sharedSpecializedIds],
      bridgeSubjectIds,
      matchPercentage,
      totalSharedCount: totalSharedSubjects,
      bridgeCount: bridgeSubjectIds.length,
      totalTargetCount: totalTargetSubjects,
      bridgeCredits,
      savedCredits: Math.round(savedCredits),
      estimatedMonthsSaved
    };
  }

  /* ==========================================================================
     8. EXPORT TO GLOBAL PLAYBOOK_DATA (GRACEFUL INTEGRATION)
     ========================================================================== */
  window.PLAYBOOK_DATA = window.PLAYBOOK_DATA || {};
  window.PLAYBOOK_DATA.coreBaseSubjects = CORE_BASE_SUBJECTS;
  window.PLAYBOOK_DATA.specializedCatalog = SPECIALIZED_SUBJECTS_CATALOG;
  window.PLAYBOOK_DATA.careerWays = CAREER_WAYS;
  window.PLAYBOOK_DATA.classicCrossovers = CLASSIC_CROSSOVERS;
  window.PLAYBOOK_DATA.languageCrossovers = LANGUAGE_CROSSOVERS;
  window.PLAYBOOK_DATA.sideBySidePlaybooks = SIDE_BY_SIDE_PLAYBOOKS;
  window.PLAYBOOK_DATA.resolveCareerBridge = resolveCareerBridge;

  /* ==========================================================================
     9. UI COMPONENT STATE & STORAGE
     ========================================================================== */
  const STORAGE_KEY = 'se_career_matrix_state_v1';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Cannot load career matrix state', e);
    }
    return {
      activeTab: 'explorer', // 'explorer' | 'calculator' | 'languages'
      fromWayId: 'WAY_01_BACKEND',
      toWayId: 'WAY_02_FULLSTACK',
      activeFilterCategory: 'ALL',
      searchQuery: '',
      activePlaybookTopic: 'matrix',
      customCompletedIds: []
    };
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Cannot save career matrix state', e);
    }
  }

  /* ==========================================================================
     10. CSS STYLES FOR CAREER MATRIX (SELF-CONTAINED & THEME-COMPLIANT)
     ========================================================================== */
  const STYLES = `
    .cm-root {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 4px 0 40px;
      font-family: var(--font-sans);
      color: var(--text-primary);
    }

    /* Hero Banner */
    .cm-hero {
      position: relative;
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-lg);
      padding: 32px;
      box-shadow: var(--shadow-soft);
      overflow: hidden;
      backdrop-filter: blur(12px);
    }
    .cm-hero::after {
      content: '';
      position: absolute;
      top: -40px;
      right: -40px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, var(--accent-primary-bg) 0%, transparent 70%);
      pointer-events: none;
      border-radius: 50%;
    }
    .cm-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 14px;
      background: var(--accent-primary-bg);
      color: var(--accent-primary);
      border-radius: var(--radius-pill);
      font-size: 12.5px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .cm-hero-title {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text-primary);
      margin-bottom: 8px;
      line-height: 1.25;
    }
    .cm-hero-subtitle {
      font-size: 15px;
      color: var(--text-secondary);
      max-width: 820px;
      line-height: 1.6;
    }

    /* Tab Bar Navigation */
    .cm-nav-tabs {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px;
      background: var(--bg-elevated);
      border-radius: var(--radius-pill);
      border: 1px solid var(--border-subtle);
      width: fit-content;
      max-width: 100%;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .cm-nav-tabs::-webkit-scrollbar { display: none; }
    .cm-tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: var(--radius-pill);
      border: none;
      background: transparent;
      color: var(--text-secondary);
      font-size: 14.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 220ms var(--ease-spring);
      white-space: nowrap;
    }
    .cm-tab-btn:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.4);
    }
    .cm-tab-btn.active {
      background: var(--accent-primary);
      color: var(--accent-primary-fg);
      box-shadow: var(--shadow-pill);
    }

    /* Tab Content Containers */
    .cm-tab-pane {
      display: none;
      animation: cmFadeSlide 280ms var(--ease-spring) forwards;
    }
    .cm-tab-pane.active {
      display: block;
    }

    @keyframes cmFadeSlide {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Filters Bar */
    .cm-filter-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 24px;
    }
    .cm-filter-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .cm-filter-pill {
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: 13px;
      font-weight: 600;
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 180ms ease;
    }
    .cm-filter-pill:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }
    .cm-filter-pill.active {
      background: var(--accent-primary-bg);
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }
    .cm-search-input-wrap {
      position: relative;
      min-width: 260px;
    }
    .cm-search-input {
      width: 100%;
      padding: 8px 14px 8px 36px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      color: var(--text-primary);
      font-size: 13.5px;
      outline: none;
      transition: border-color 200ms ease;
    }
    .cm-search-input:focus {
      border-color: var(--accent-primary);
      box-shadow: var(--focus-ring);
    }
    .cm-search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      color: var(--text-muted);
      pointer-events: none;
    }

    /* 11 Ways Explorer Cards Grid */
    .cm-ways-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }
    .cm-way-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 24px;
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 240ms var(--ease-spring), box-shadow 240ms var(--ease-spring), border-color 240ms ease;
      position: relative;
    }
    .cm-way-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
      border-color: var(--accent-primary);
    }
    .cm-way-card-header {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 14px;
    }
    .cm-way-card-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-sm);
      background: var(--bg-elevated);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
      border: 1px solid var(--border-subtle);
    }
    .cm-way-card-meta {
      flex: 1;
    }
    .cm-way-card-num {
      font-size: 11px;
      font-weight: 700;
      color: var(--accent-primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .cm-way-card-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-primary);
      margin-top: 2px;
      line-height: 1.35;
    }
    .cm-way-card-sub {
      font-size: 12.5px;
      color: var(--text-muted);
    }
    .cm-way-card-tagline {
      font-size: 13.5px;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 16px;
      font-style: italic;
    }
    .cm-way-card-sec-label {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-muted);
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .cm-badges-flow {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;
    }
    .cm-subject-chip {
      font-size: 12px;
      padding: 3px 9px;
      border-radius: 6px;
      background: var(--bg-elevated);
      color: var(--text-primary);
      font-family: var(--font-mono);
      border: 1px solid var(--border-subtle);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      cursor: default;
      transition: all 160ms ease;
    }
    .cm-subject-chip:hover {
      border-color: var(--accent-primary);
      background: var(--accent-primary-bg);
      color: var(--accent-primary);
    }
    .cm-subject-chip.core-chip {
      background: rgba(138, 115, 103, 0.08);
      color: var(--text-secondary);
    }
    .cm-subject-chip.spec-chip {
      border-color: rgba(196, 116, 87, 0.3);
      font-weight: 600;
    }
    .cm-core-pill-toggle {
      font-size: 11px;
      color: var(--accent-primary);
      background: transparent;
      border: none;
      cursor: pointer;
      font-weight: 600;
      text-decoration: underline;
    }
    .cm-way-card-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 14px;
      padding-top: 14px;
      border-top: 1px solid var(--border-subtle);
    }
    .cm-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 180ms ease;
      text-align: center;
    }
    .cm-btn-primary {
      background: var(--accent-primary);
      color: var(--accent-primary-fg);
      box-shadow: var(--shadow-pill);
    }
    .cm-btn-primary:hover {
      background: var(--accent-primary-hover);
      transform: translateY(-1px);
    }
    .cm-btn-secondary {
      background: var(--bg-elevated);
      color: var(--text-primary);
      border-color: var(--border-subtle);
    }
    .cm-btn-secondary:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }

    /* Calculator View Styles */
    .cm-calc-hero-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 16px;
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-lg);
      padding: 24px;
      box-shadow: var(--shadow-soft);
      margin-bottom: 24px;
    }
    @media (max-width: 768px) {
      .cm-calc-hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
    .cm-calc-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .cm-calc-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .cm-calc-select {
      width: 100%;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-strong);
      background: var(--bg-elevated);
      color: var(--text-primary);
      font-size: 15px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
    }
    .cm-calc-select:focus {
      border-color: var(--accent-primary);
      box-shadow: var(--focus-ring);
    }
    .cm-calc-swap-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--bg-elevated);
      border: 1px solid var(--border-strong);
      color: var(--accent-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      transition: all 200ms var(--ease-spring);
    }
    .cm-calc-swap-btn:hover {
      transform: rotate(180deg) scale(1.1);
      background: var(--accent-primary);
      color: var(--accent-primary-fg);
    }

    /* Quick Presets Dải nút chuyển đổi kinh điển */
    .cm-presets-wrapper {
      margin-bottom: 24px;
    }
    .cm-presets-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .cm-presets-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 6px;
      scrollbar-width: thin;
    }
    .cm-preset-btn {
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      color: var(--text-secondary);
      font-size: 12.5px;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: all 180ms ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .cm-preset-btn:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      background: var(--accent-primary-bg);
    }
    .cm-preset-badge {
      padding: 2px 6px;
      border-radius: var(--radius-pill);
      font-size: 11px;
      background: var(--status-success-bg);
      color: var(--status-success);
      font-weight: 700;
    }

    /* Calculator Results Hero Metrics */
    .cm-metric-hero {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 20px 24px;
      box-shadow: var(--shadow-soft);
      margin-bottom: 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .cm-progress-col {
      flex: 1;
      min-width: 260px;
    }
    .cm-progress-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 8px;
    }
    .cm-progress-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-primary);
    }
    .cm-progress-pct {
      font-size: 24px;
      font-weight: 800;
      color: var(--accent-primary);
      font-family: var(--font-mono);
    }
    .cm-progress-track {
      height: 10px;
      background: var(--bg-elevated);
      border-radius: var(--radius-pill);
      overflow: hidden;
      border: 1px solid var(--border-subtle);
    }
    .cm-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--status-success) 0%, var(--accent-primary) 100%);
      border-radius: var(--radius-pill);
      transition: width 600ms var(--ease-smooth);
    }
    .cm-stats-group {
      display: flex;
      gap: 24px;
    }
    .cm-stat-item {
      display: flex;
      flex-direction: column;
    }
    .cm-stat-val {
      font-size: 22px;
      font-weight: 800;
      font-family: var(--font-mono);
      line-height: 1.2;
    }
    .cm-stat-val.shared { color: var(--status-success); }
    .cm-stat-val.bridge { color: var(--status-warning); }
    .cm-stat-val.saved { color: var(--accent-primary); }
    .cm-stat-lbl {
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* Dual Column Comparison (Shared vs Bridge) */
    .cm-dual-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }
    @media (max-width: 900px) {
      .cm-dual-columns {
        grid-template-columns: 1fr;
      }
    }
    .cm-col-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 24px;
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .cm-col-box.shared-col {
      border-top: 4px solid var(--status-success);
    }
    .cm-col-box.bridge-col {
      border-top: 4px solid var(--status-warning);
    }
    .cm-col-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 12px;
    }
    .cm-col-title {
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cm-col-badge {
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 700;
    }
    .cm-col-badge.shared {
      background: var(--status-success-bg);
      color: var(--status-success);
    }
    .cm-col-badge.bridge {
      background: var(--status-warning-bg);
      color: var(--status-warning);
    }
    .cm-col-notice {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      background: var(--bg-elevated);
    }

    /* Subject Item Cards */
    .cm-subject-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .cm-subject-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 14px;
      border-radius: var(--radius-sm);
      background: var(--bg-canvas);
      border: 1px solid var(--border-subtle);
      transition: all 180ms ease;
    }
    .cm-subject-item:hover {
      border-color: var(--accent-primary);
      transform: translateX(2px);
    }
    .cm-subj-status-icon {
      font-size: 16px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .cm-subj-status-icon.done { color: var(--status-success); }
    .cm-subj-status-icon.todo { color: var(--status-warning); }
    .cm-subj-content {
      flex: 1;
    }
    .cm-subj-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
    }
    .cm-subj-code {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 13.5px;
      color: var(--text-primary);
    }
    .cm-subj-credits {
      font-size: 11.5px;
      padding: 1px 6px;
      border-radius: 4px;
      background: var(--bg-elevated);
      color: var(--text-muted);
    }
    .cm-subj-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .cm-subj-role {
      font-size: 12.5px;
      color: var(--text-secondary);
      margin-top: 4px;
      line-height: 1.45;
    }

    /* Language Crossover View */
    .cm-lang-stepper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .cm-lang-step-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 20px;
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
      transition: all 200ms ease;
    }
    .cm-lang-step-card:hover {
      border-color: var(--accent-primary);
      transform: translateY(-2px);
    }
    .cm-lang-step-stage {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--accent-primary);
      letter-spacing: 0.5px;
    }
    .cm-lang-step-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.35;
    }
    .cm-lang-step-desc {
      font-size: 12.5px;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .cm-lang-step-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: auto;
    }
    .cm-lang-skill-pill {
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 4px;
      background: var(--bg-elevated);
      color: var(--text-muted);
    }

    /* Side-by-Side Playbook Viewer */
    .cm-sbs-panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 28px;
      box-shadow: var(--shadow-soft);
      margin-bottom: 24px;
    }
    .cm-sbs-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
    }
    .cm-sbs-title-group h3 {
      font-size: 19px;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 4px;
    }
    .cm-sbs-title-group p {
      font-size: 13.5px;
      color: var(--text-secondary);
    }
    .cm-sbs-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-elevated);
      padding: 4px;
      border-radius: var(--radius-pill);
    }
    .cm-sbs-tab-btn {
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: 12.5px;
      font-weight: 600;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 160ms ease;
    }
    .cm-sbs-tab-btn.active {
      background: var(--accent-primary);
      color: var(--accent-primary-fg);
    }
    .cm-sbs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
    }
    .cm-sbs-card {
      background: var(--bg-canvas);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .cm-sbs-card-head {
      padding: 12px 16px;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .cm-sbs-lang-name {
      font-weight: 700;
      font-size: 14px;
      color: var(--text-primary);
    }
    .cm-sbs-paradigm {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--accent-primary-bg);
      color: var(--accent-primary);
      font-weight: 600;
    }
    .cm-sbs-card-notes {
      padding: 10px 16px;
      font-size: 12px;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(255, 255, 255, 0.2);
      line-height: 1.45;
    }
    .cm-sbs-code-block {
      padding: 14px 16px;
      font-family: var(--font-mono);
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--text-primary);
      background: rgba(0, 0, 0, 0.03);
      overflow-x: auto;
      margin: 0;
      flex: 1;
      white-space: pre;
    }
    [data-theme="espresso"] .cm-sbs-code-block {
      background: rgba(0, 0, 0, 0.35);
    }

    /* Modal for Core Base Subjects Detail */
    .cm-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 200ms ease;
    }
    .cm-modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .cm-modal-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-lg);
      max-width: 720px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 28px;
      box-shadow: var(--shadow-hover);
      transform: scale(0.95);
      transition: transform 200ms var(--ease-spring);
    }
    .cm-modal-overlay.open .cm-modal-card {
      transform: scale(1);
    }
    .cm-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 12px;
    }
    .cm-modal-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-primary);
    }
    .cm-modal-close-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      color: var(--text-muted);
      cursor: pointer;
    }
    .cm-modal-close-btn:hover { color: var(--text-primary); }
  `;

  function injectStyles() {
    if (document.getElementById('cm-matrix-styles')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'cm-matrix-styles';
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);
  }

  /* ==========================================================================
     11. VIEW RENDERERS (EXPLORER, CALCULATOR, LANGUAGES)
     ========================================================================== */

  // Helper escape
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 1. Render Tab Explorer (11 Ways Cards)
  function renderExplorerTab(state) {
    let ways = CAREER_WAYS;

    // Filter by Category
    if (state.activeFilterCategory && state.activeFilterCategory !== 'ALL') {
      ways = ways.filter(w => w.category === state.activeFilterCategory);
    }

    // Filter by Search Query
    if (state.searchQuery && state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      ways = ways.filter(w =>
        w.title.toLowerCase().includes(q) ||
        w.englishTitle.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.tagline.toLowerCase().includes(q) ||
        w.specializedSubjectIds.some(id => {
          const s = SPECIALIZED_SUBJECTS_CATALOG[id];
          return id.toLowerCase().includes(q) || (s && s.name.toLowerCase().includes(q));
        })
      );
    }

    const categories = [
      { id: 'ALL', label: 'Tất cả 11 Ngành' },
      { id: 'Systems & Cloud', label: 'Hệ thống & Cloud' },
      { id: 'Web & Products', label: 'Web & Sản phẩm' },
      { id: 'Client & Mobile', label: 'Di động & UI/UX' },
      { id: 'Data & AI', label: 'Dữ liệu & AI Agent' },
      { id: 'Infrastructure & Sec', label: 'DevOps & AppSec' },
      { id: 'Creative & Engines', label: 'Game Development' },
      { id: 'Advanced Research', label: 'Điện toán Lượng tử' }
    ];

    const filterPillsHtml = categories.map(cat => `
      <button type="button" 
              class="cm-filter-pill ${state.activeFilterCategory === cat.id ? 'active' : ''}" 
              data-cm-category="${cat.id}">
        ${escapeHtml(cat.label)}
      </button>
    `).join('');

    const cardsHtml = ways.map(way => {
      // Specialized chips
      const specChips = way.specializedSubjectIds.map(id => {
        const s = SPECIALIZED_SUBJECTS_CATALOG[id] || { code: id, name: id, credits: 3 };
        return `
          <span class="cm-subject-chip spec-chip" title="${escapeHtml(s.name)} (${s.credits} TC) - ${escapeHtml(s.role || '')}">
            <strong>${escapeHtml(s.code)}</strong> ${escapeHtml(s.name)}
          </span>
        `;
      }).join('');

      return `
        <div class="cm-way-card" data-way-id="${way.id}">
          <div>
            <div class="cm-way-card-header">
              <div class="cm-way-card-icon">${way.icon}</div>
              <div class="cm-way-card-meta">
                <div class="cm-way-card-num">${way.number} · ${escapeHtml(way.category)}</div>
                <h3 class="cm-way-card-title">${escapeHtml(way.title)}</h3>
                <div class="cm-way-card-sub">${escapeHtml(way.englishTitle)} · ${escapeHtml(way.salaryRange)}</div>
              </div>
            </div>

            <p class="cm-way-card-tagline">"${escapeHtml(way.tagline)}"</p>
            <p style="font-size:13px; color:var(--text-secondary); line-height:1.55; margin-bottom:16px;">
              ${escapeHtml(way.description)}
            </p>

            <!-- Khối 11 môn CORE_BASE -->
            <div class="cm-way-card-sec-label">
              <span>Trục Cốt Lõi: 11 Môn CORE_BASE (40 TC)</span>
              <button type="button" class="cm-core-pill-toggle" data-cm-open-core-modal>Chi tiết 11 môn</button>
            </div>
            <div class="cm-badges-flow">
              <span class="cm-subject-chip core-chip">✓ SE005</span>
              <span class="cm-subject-chip core-chip">✓ IT001</span>
              <span class="cm-subject-chip core-chip">✓ IT002</span>
              <span class="cm-subject-chip core-chip">✓ SE117</span>
              <span class="cm-subject-chip core-chip">✓ IT003</span>
              <span class="cm-subject-chip core-chip">✓ IT012</span>
              <span class="cm-subject-chip core-chip">✓ IT004</span>
              <span class="cm-subject-chip core-chip">✓ IT007</span>
              <span class="cm-subject-chip core-chip">✓ IT005</span>
              <span class="cm-subject-chip core-chip">✓ SE104</span>
              <span class="cm-subject-chip core-chip">✓ SE113</span>
            </div>

            <!-- Khối Chuyên ngành riêng -->
            <div class="cm-way-card-sec-label">
              <span>Môn Chuyên Ngành Riêng (${way.specializedSubjectIds.length} Môn)</span>
              <span style="font-size:11px; color:var(--accent-primary); font-weight:700;">Chuỗi tiên quyết</span>
            </div>
            <div class="cm-badges-flow">
              ${specChips}
            </div>
          </div>

          <!-- Nút hành động chân thẻ -->
          <div class="cm-way-card-actions">
            <button type="button" class="cm-btn cm-btn-primary" data-cm-set-from-way="${way.id}">
              🎯 Chọn Làm Ngành Hiện Tại
            </button>
            <button type="button" class="cm-btn cm-btn-secondary" data-cm-bridge-to-way="${way.id}">
              ⚡ Chuyển Sang Ngành Này
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="cm-filter-bar">
        <div class="cm-filter-pills">${filterPillsHtml}</div>
        <div class="cm-search-input-wrap">
          <span class="cm-search-icon">🔍</span>
          <input type="text" 
                 class="cm-search-input" 
                 id="cmExplorerSearch"
                 placeholder="Tìm ngành, môn học, mã môn..." 
                 value="${escapeHtml(state.searchQuery || '')}" />
        </div>
      </div>
      <div class="cm-ways-grid">
        ${cardsHtml || '<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-muted);">Không tìm thấy hướng đi nghề nghiệp phù hợp với từ khóa.</div>'}
      </div>
    `;
  }

  // 2. Render Tab Calculator (Bộ tính điểm giao)
  function renderCalculatorTab(state) {
    const fromWayId = state.fromWayId || 'WAY_01_BACKEND';
    const toWayId = state.toWayId || 'WAY_02_FULLSTACK';

    const bridgeResult = resolveCareerBridge(fromWayId, toWayId, state.customCompletedIds || []);

    // Quick presets HTML
    const presetsHtml = CLASSIC_CROSSOVERS.map(cr => `
      <button type="button" 
              class="cm-preset-btn ${cr.fromWay === fromWayId && cr.toWay === toWayId ? 'active' : ''}"
              data-cm-apply-preset="${cr.id}"
              data-from="${cr.fromWay}"
              data-to="${cr.toWay}">
        <span>${escapeHtml(cr.fromLabel)} ➔ ${escapeHtml(cr.toLabel)}</span>
        <span class="cm-preset-badge">Tiết kiệm ${cr.savingsRate}</span>
      </button>
    `).join('');

    // Select options HTML
    const fromOptionsHtml = CAREER_WAYS.map(w => `
      <option value="${w.id}" ${w.id === fromWayId ? 'selected' : ''}>
        ${w.number}: ${w.icon} ${w.title}
      </option>
    `).join('');

    const toOptionsHtml = CAREER_WAYS.map(w => `
      <option value="${w.id}" ${w.id === toWayId ? 'selected' : ''}>
        ${w.number}: ${w.icon} ${w.title}
      </option>
    `).join('');

    // Shared list HTML
    const sharedSubjectsHtml = bridgeResult.allSharedIds.map(id => {
      let subj = CORE_BASE_SUBJECTS.find(s => s.id === id);
      let isCore = true;
      if (!subj) {
        subj = SPECIALIZED_SUBJECTS_CATALOG[id] || { code: id, name: id, credits: 3, role: 'Đã hoàn thành ở ngành cũ.' };
        isCore = false;
      }
      return `
        <div class="cm-subject-item">
          <div class="cm-subj-status-icon done">✓</div>
          <div class="cm-subj-content">
            <div class="cm-subj-top">
              <span class="cm-subj-code">${escapeHtml(subj.code)}</span>
              <span class="cm-subj-credits">${subj.credits} TC</span>
              ${isCore ? '<span class="cm-subj-credits" style="background:var(--accent-primary-bg); color:var(--accent-primary);">CORE_BASE</span>' : '<span class="cm-subj-credits" style="background:var(--status-success-bg); color:var(--status-success);">Môn Chuyên Ngành Cũ</span>'}
            </div>
            <div class="cm-subj-name">${escapeHtml(subj.name)}</div>
            <div class="cm-subj-role">
              ${isCore ? 'Môn nền tảng dùng chung 100% — Miễn học lại, giúp tiết kiệm thời gian tối đa.' : (subj.role || 'Kiến thức đã tích lũy từ ngành hiện tại, được công nhận tương đương.')}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bridge list HTML
    const bridgeSubjectsHtml = bridgeResult.bridgeSubjectIds.length > 0
      ? bridgeResult.bridgeSubjectIds.map((id, index) => {
          const subj = SPECIALIZED_SUBJECTS_CATALOG[id] || { code: id, name: id, credits: 3, role: 'Môn học cốt lõi cho vị trí công việc mới.' };
          return `
            <div class="cm-subject-item" style="border-left: 3px solid var(--status-warning);">
              <div class="cm-subj-status-icon todo">⚡</div>
              <div class="cm-subj-content">
                <div class="cm-subj-top">
                  <span class="cm-subj-code" style="color:var(--status-warning);">${escapeHtml(subj.code)}</span>
                  <span class="cm-subj-credits">${subj.credits} TC</span>
                  <span class="cm-subj-credits" style="background:var(--status-warning-bg); color:var(--status-warning); font-weight:700;">Bước ${index + 1}</span>
                </div>
                <div class="cm-subj-name">${escapeHtml(subj.name)}</div>
                <div class="cm-subj-role">${escapeHtml(subj.role || '')}</div>
              </div>
            </div>
          `;
        }).join('')
      : `
        <div style="padding:24px; text-align:center; color:var(--status-success); background:var(--bg-canvas); border-radius:var(--radius-sm);">
          🎉 Tuyệt vời! Bạn đã hoàn thành toàn bộ các môn học của hướng đi này. Không cần học bổ sung môn nào!
        </div>
      `;

    return `
      <!-- Selector Box -->
      <div class="cm-calc-hero-grid">
        <div class="cm-calc-box">
          <label class="cm-calc-label">1. Từ Ngành Hiện Tại (From Way):</label>
          <select class="cm-calc-select" id="cmFromWaySelect">
            ${fromOptionsHtml}
          </select>
        </div>

        <div style="display:flex; justify-content:center;">
          <button type="button" class="cm-calc-swap-btn" id="cmSwapWaysBtn" title="Hoán đổi 2 ngành">
            ⇄
          </button>
        </div>

        <div class="cm-calc-box">
          <label class="cm-calc-label">2. Sang Ngành Mục Tiêu (To Way):</label>
          <select class="cm-calc-select" id="cmToWaySelect">
            ${toOptionsHtml}
          </select>
        </div>
      </div>

      <!-- Presets Dải chuyển đổi kinh điển -->
      <div class="cm-presets-wrapper">
        <div class="cm-presets-title">
          <span>⚡ 8 Cặp Điểm Giao Cầu Nối Kinh Điển (Chọn Nhanh):</span>
        </div>
        <div class="cm-presets-scroll">
          ${presetsHtml}
        </div>
      </div>

      <!-- Metric Hero Banner -->
      <div class="cm-metric-hero">
        <div class="cm-progress-col">
          <div class="cm-progress-header">
            <span class="cm-progress-title">Tỷ lệ tương thích kiến thức nền tảng:</span>
            <span class="cm-progress-pct">${bridgeResult.matchPercentage}%</span>
          </div>
          <div class="cm-progress-track">
            <div class="cm-progress-fill" style="width: ${bridgeResult.matchPercentage}%;"></div>
          </div>
          <div style="font-size:12.5px; color:var(--text-secondary); margin-top:8px;">
            Bạn đã sở hữu <strong>${bridgeResult.totalSharedCount} môn</strong>, chỉ cần bổ sung <strong>${bridgeResult.bridgeCount} môn (${bridgeResult.bridgeCredits} tín chỉ)</strong> để đạt chuẩn vị trí mới!
          </div>
        </div>

        <div class="cm-stats-group">
          <div class="cm-stat-item">
            <span class="cm-stat-val shared">${bridgeResult.totalSharedCount}</span>
            <span class="cm-stat-lbl">Môn Đã Tích Lũy</span>
          </div>
          <div class="cm-stat-item">
            <span class="cm-stat-val bridge">${bridgeResult.bridgeCount}</span>
            <span class="cm-stat-lbl">Môn Cầu Nối Cần Học</span>
          </div>
          <div class="cm-stat-item">
            <span class="cm-stat-val saved">~${bridgeResult.estimatedMonthsSaved} Tháng</span>
            <span class="cm-stat-lbl">Thời Gian Tiết Kiệm</span>
          </div>
        </div>
      </div>

      <!-- Dual Columns: Shared vs Bridge -->
      <div class="cm-dual-columns">
        <!-- Cột Môn đã có sẵn (Shared) -->
        <div class="cm-col-box shared-col">
          <div class="cm-col-header">
            <div class="cm-col-title">
              <span style="color:var(--status-success);">✓</span>
              <span>Môn Đã Có Sẵn / Miễn Học Lại (${bridgeResult.totalSharedCount})</span>
            </div>
            <span class="cm-col-badge shared">ĐÃ HOÀN THÀNH</span>
          </div>

          <div class="cm-col-notice">
            💡 <strong>Quy tắc Zero-Overlap:</strong> Tất cả 11 môn CORE_BASE và các môn chuyên ngành giao nhau giữa 2 hướng đi được tự động công nhận. Bạn không bao giờ phải học lại kiến thức đã vững vàng!
          </div>

          <div class="cm-subject-list">
            ${sharedSubjectsHtml}
          </div>
        </div>

        <!-- Cột Môn cầu nối (Bridge) -->
        <div class="cm-col-box bridge-col">
          <div class="cm-col-header">
            <div class="cm-col-title">
              <span style="color:var(--status-warning);">⚡</span>
              <span>Môn Cầu Nối Cần Bổ Sung (${bridgeResult.bridgeCount} Môn · ${bridgeResult.bridgeCredits} TC)</span>
            </div>
            <span class="cm-col-badge bridge">CẦN HỌC THÊM</span>
          </div>

          <div class="cm-col-notice">
            🎯 <strong>Lộ trình học theo thứ tự tiên quyết:</strong> Học tuần tự từ Bước 1 đến Bước ${bridgeResult.bridgeCount} để đảm bảo lượng kiến thức gối đầu chặt chẽ, tiếp thu nhanh nhất.
          </div>

          <div class="cm-subject-list">
            ${bridgeSubjectsHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 3. Render Tab Languages (Crossover & Side-by-Side Engine)
  function renderLanguagesTab(state) {
    const activeTopic = state.activePlaybookTopic || 'matrix';
    const playbook = SIDE_BY_SIDE_PLAYBOOKS[activeTopic] || SIDE_BY_SIDE_PLAYBOOKS.matrix;

    // Stepper HTML
    const stepsHtml = LANGUAGE_CROSSOVERS.map(step => `
      <div class="cm-lang-step-card">
        <div class="cm-lang-step-stage">${escapeHtml(step.code)} · ${escapeHtml(step.stage)}</div>
        <div style="font-size:24px;">${step.icon}</div>
        <h4 class="cm-lang-step-title">${escapeHtml(step.title)}</h4>
        <p class="cm-lang-step-desc">${escapeHtml(step.mentalShift)}</p>
        <div class="cm-lang-step-chips">
          ${step.focusSkills.map(s => `<span class="cm-lang-skill-pill">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // Code comparison cards
    const comparisonCardsHtml = playbook.comparisons.map(comp => `
      <div class="cm-sbs-card">
        <div class="cm-sbs-card-head">
          <span class="cm-sbs-lang-name">${escapeHtml(comp.lang)}</span>
          <span class="cm-sbs-paradigm">${escapeHtml(comp.paradigm)}</span>
        </div>
        <div class="cm-sbs-card-notes">
          💡 ${escapeHtml(comp.notes)}
        </div>
        <pre class="cm-sbs-code-block"><code>${escapeHtml(comp.codeSnippet)}</code></pre>
      </div>
    `).join('');

    return `
      <!-- Stepper Roadmap L1 -> L4 -->
      <div style="margin-bottom:20px;">
        <h3 style="font-size:18px; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          🌐 Lộ Trình Chuyển Giao Đa Ngôn Ngữ ($L_1 \\rightarrow L_2 \\rightarrow L_3 \\rightarrow L_4$)
        </h3>
        <p style="font-size:13.5px; color:var(--text-secondary); max-width:820px; line-height:1.5;">
          Tại SE Sanctuary, ngôn ngữ lập trình không phải là rào cản mà là công cụ mở rộng tư duy. Sau khi làm chủ L1 ở môn cơ sở, các điểm giao (LANG_XOVER) giúp bạn nâng cấp tư duy từ quản lý RAM đến hệ thống phân tán.
        </p>
      </div>

      <div class="cm-lang-stepper">
        ${stepsHtml}
      </div>

      <!-- Side-by-Side Mental Model Playbook -->
      <div class="cm-sbs-panel">
        <div class="cm-sbs-header">
          <div class="cm-sbs-title-group">
            <h3>📖 Side-by-Side Playbook: Đối Chiếu Cách Tư Duy Giữa Các Ngôn Ngữ</h3>
            <p>${escapeHtml(playbook.description)}</p>
          </div>
          <div class="cm-sbs-tabs">
            <button type="button" 
                    class="cm-sbs-tab-btn ${activeTopic === 'matrix' ? 'active' : ''}" 
                    data-cm-topic="matrix">
              Mảng 2 Chiều
            </button>
            <button type="button" 
                    class="cm-sbs-tab-btn ${activeTopic === 'memory' ? 'active' : ''}" 
                    data-cm-topic="memory">
              Bộ Nhớ & Con Trỏ
            </button>
            <button type="button" 
                    class="cm-sbs-tab-btn ${activeTopic === 'concurrency' ? 'active' : ''}" 
                    data-cm-topic="concurrency">
              Xử Lý Bất Đồng Bộ
            </button>
          </div>
        </div>

        <div class="cm-sbs-grid">
          ${comparisonCardsHtml}
        </div>
      </div>
    `;
  }

  // 4. Render Core Base Modal
  function renderCoreModal() {
    const listHtml = CORE_BASE_SUBJECTS.map((s, i) => `
      <div style="display:flex; align-items:flex-start; gap:12px; padding:12px 0; border-bottom:1px solid var(--border-subtle);">
        <span style="font-family:var(--font-mono); font-weight:700; color:var(--accent-primary); width:70px; flex-shrink:0;">${s.code}</span>
        <div style="flex:1;">
          <div style="display:flex; align-items:center; gap:8px;">
            <strong style="font-size:14px; color:var(--text-primary);">${s.name}</strong>
            <span style="font-size:11px; padding:1px 6px; border-radius:4px; background:var(--bg-elevated); color:var(--text-muted);">${s.credits} TC · ${s.semester}</span>
          </div>
          <p style="font-size:12.5px; color:var(--text-secondary); margin-top:3px; line-height:1.45;">${s.desc}</p>
          <div style="display:flex; gap:4px; margin-top:6px;">
            ${s.tags.map(t => `<span style="font-size:10.5px; padding:1px 6px; border-radius:4px; background:var(--bg-elevated); color:var(--text-muted); font-family:var(--font-mono);">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="cm-modal-overlay" id="cmCoreModal">
        <div class="cm-modal-card">
          <div class="cm-modal-header">
            <div>
              <h3 class="cm-modal-title">Trục Cốt Lõi Bắt Buộc — 11 Môn CORE_BASE UIT (40 Tín Chỉ)</h3>
              <p style="font-size:12.5px; color:var(--text-muted); margin-top:2px;">11 môn nền tảng dùng chung 100% cho mọi hướng đi nghề nghiệp tại UIT.</p>
            </div>
            <button type="button" class="cm-modal-close-btn" id="cmCloseModalBtn">✕</button>
          </div>
          <div style="display:flex; flex-direction:column;">
            ${listHtml}
          </div>
          <div style="margin-top:20px; text-align:right;">
            <button type="button" class="cm-btn cm-btn-primary" id="cmCloseModalBtn2">Đã Hiểu</button>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     12. MAIN EXPORT FUNCTION: window.renderCareerMatrixView
     ========================================================================== */
  window.renderCareerMatrixView = function (container) {
    if (!container) {
      console.error('renderCareerMatrixView: container element is required');
      return;
    }

    injectStyles();
    const state = loadState();

    function updateView() {
      container.innerHTML = `
        <div class="cm-root">
          <!-- Hero Header -->
          <div class="cm-hero">
            <span class="cm-hero-badge">⚡ Zero-Overlap Career Engine</span>
            <h1 class="cm-hero-title">🚀 11 Hướng Đi Nghề Nghiệp & Điểm Giao Cầu Nối</h1>
            <p class="cm-hero-subtitle">
              Hệ thống ma trận nghề nghiệp chuẩn Kỹ thuật Phần mềm UIT: 11 môn cốt lõi dùng chung (CORE_BASE),
              bộ công cụ tính toán môn cầu nối thời gian thực khi chuyển ngành, và bản đồ dịch chuyển tư duy đa ngôn ngữ.
            </p>
          </div>

          <!-- Navigation Pill Tabs -->
          <div class="cm-nav-tabs" role="tablist">
            <button type="button" 
                    class="cm-tab-btn ${state.activeTab === 'explorer' ? 'active' : ''}" 
                    data-cm-tab="explorer">
              🧭 1. Khám Phá 11 Hướng Đi (Ways Explorer)
            </button>
            <button type="button" 
                    class="cm-tab-btn ${state.activeTab === 'calculator' ? 'active' : ''}" 
                    data-cm-tab="calculator">
              ⚡ 2. Bộ Tính Điểm Giao Chuyển Ngành (Bridge Calculator)
            </button>
            <button type="button" 
                    class="cm-tab-btn ${state.activeTab === 'languages' ? 'active' : ''}" 
                    data-cm-tab="languages">
              🌐 3. Bản Đồ Đa Ngôn Ngữ & Playbook Đối Chiếu (L1 ➔ L4)
            </button>
          </div>

          <!-- Tab Panes -->
          <div class="cm-tab-pane ${state.activeTab === 'explorer' ? 'active' : ''}" id="cmTabExplorer">
            ${renderExplorerTab(state)}
          </div>

          <div class="cm-tab-pane ${state.activeTab === 'calculator' ? 'active' : ''}" id="cmTabCalculator">
            ${renderCalculatorTab(state)}
          </div>

          <div class="cm-tab-pane ${state.activeTab === 'languages' ? 'active' : ''}" id="cmTabLanguages">
            ${renderLanguagesTab(state)}
          </div>

          <!-- Modal for Core Base Subjects -->
          ${renderCoreModal()}
        </div>
      `;

      attachEvents();
    }

    function attachEvents() {
      // 1. Tab switching
      container.querySelectorAll('[data-cm-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.activeTab = btn.getAttribute('data-cm-tab');
          saveState(state);
          updateView();
        });
      });

      // 2. Category filters
      container.querySelectorAll('[data-cm-category]').forEach(pill => {
        pill.addEventListener('click', () => {
          state.activeFilterCategory = pill.getAttribute('data-cm-category');
          saveState(state);
          updateView();
        });
      });

      // 3. Search input
      const searchInp = container.querySelector('#cmExplorerSearch');
      if (searchInp) {
        searchInp.addEventListener('input', e => {
          state.searchQuery = e.target.value;
          saveState(state);
          // Re-render only explorer tab content to avoid losing focus
          const explorerPane = container.querySelector('#cmTabExplorer');
          if (explorerPane) {
            explorerPane.innerHTML = renderExplorerTab(state);
            attachExplorerEvents();
          }
        });
      }

      // 4. Explorer card buttons
      attachExplorerEvents();

      // 5. Calculator selections
      const fromSel = container.querySelector('#cmFromWaySelect');
      const toSel = container.querySelector('#cmToWaySelect');
      const swapBtn = container.querySelector('#cmSwapWaysBtn');

      if (fromSel && toSel) {
        fromSel.addEventListener('change', e => {
          state.fromWayId = e.target.value;
          saveState(state);
          updateView();
        });
        toSel.addEventListener('change', e => {
          state.toWayId = e.target.value;
          saveState(state);
          updateView();
        });
      }

      if (swapBtn && fromSel && toSel) {
        swapBtn.addEventListener('click', () => {
          const temp = state.fromWayId;
          state.fromWayId = state.toWayId;
          state.toWayId = temp;
          saveState(state);
          updateView();
        });
      }

      // 6. Presets buttons
      container.querySelectorAll('[data-cm-apply-preset]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.fromWayId = btn.getAttribute('data-from');
          state.toWayId = btn.getAttribute('data-to');
          saveState(state);
          updateView();
        });
      });

      // 7. Language Playbook topic switching
      container.querySelectorAll('[data-cm-topic]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.activePlaybookTopic = btn.getAttribute('data-cm-topic');
          saveState(state);
          updateView();
        });
      });

      // 8. Core Base Modal
      const modal = container.querySelector('#cmCoreModal');
      const openModalBtns = container.querySelectorAll('[data-cm-open-core-modal]');
      const closeBtn1 = container.querySelector('#cmCloseModalBtn');
      const closeBtn2 = container.querySelector('#cmCloseModalBtn2');

      if (modal) {
        openModalBtns.forEach(b => {
          b.addEventListener('click', () => modal.classList.add('open'));
        });
        if (closeBtn1) closeBtn1.addEventListener('click', () => modal.classList.remove('open'));
        if (closeBtn2) closeBtn2.addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', e => {
          if (e.target === modal) modal.classList.remove('open');
        });
      }
    }

    function attachExplorerEvents() {
      // Set as From Way
      container.querySelectorAll('[data-cm-set-from-way]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.fromWayId = btn.getAttribute('data-cm-set-from-way');
          state.activeTab = 'calculator';
          saveState(state);
          updateView();
        });
      });

      // Bridge to Way
      container.querySelectorAll('[data-cm-bridge-to-way]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.toWayId = btn.getAttribute('data-cm-bridge-to-way');
          state.activeTab = 'calculator';
          saveState(state);
          updateView();
        });
      });
    }

    // Initial render
    updateView();
  };

  console.log('✅ [module_career_matrix.js] Loaded successfully. Career Ways & Bridge Engine ready.');
})();
