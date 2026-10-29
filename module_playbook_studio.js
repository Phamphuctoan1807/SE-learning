/**
 * ============================================================================
 * MODULE PLAYBOOK STUDIO (Chuẩn mang2chieu.cpp)
 * Nền tảng: SE Sanctuary - Không Gian Học Tập Kỹ Sư Phần Mềm Dịu Mắt
 * Quy chuẩn: Giao diện 3 cột đồng bộ:
 *   1. Cột Trái (Function Navigator): Danh sách hàm, badge phân loại, scroll + glow + highlight main()
 *   2. Cột Giữa (Interactive Code Playbook Editor): Line numbers, syntax highlight, điểm neo // Thay điều kiện, Run, Copy, Reset, Side-by-Side
 *   3. Cột Phải (Live Output & Memory Visualizer): Live Terminal Console streaming, Stack/Heap Visualizer, Mini-Challenge, Technical Notes
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  // --- 1. DỮ LIỆU PLAYBOOK MẶC ĐỊNH (DEFAULT_PLAYBOOK_DATA) ---
  // Tự động kiểm tra window.PLAYBOOK_DATA, nếu chưa có sẽ sử dụng bộ dữ liệu chuẩn mực này.
  const DEFAULT_PLAYBOOK_DATA = {
    playbooks: [
      {
        id: "mang2chieu.cpp",
        title: "Mảng 2 Chiều & Cấp Phát Động 4 Tầng (C++17)",
        category: "C++ & Core Data Structures",
        badge: "C++17 / Core DSA",
        difficulty: "Trung Cấp",
        description: "Chuẩn kiến trúc 4 tầng: Khai báo con trỏ cấp 2 (int**) -> Duyệt mảng an toàn (Row-Major) -> Thống kê cực trị -> Biến đổi điều kiện & Thu hồi bộ nhớ Heap.",
        sourceFilename: "mang2chieu.cpp",
        languages: {
          cpp: `/**
 * ============================================================================
 * PLAYBOOK: mang2chieu.cpp - Chuẩn Kiến Trúc Cấp Phát & Quản Trị Bộ Nhớ 4 Tầng
 * Ngôn ngữ: C++17 Standard | Môi trường: GCC 11+ / Clang 14+
 * Mục tiêu: Làm chủ con trỏ cấp 2, kiểm soát Heap, tối ưu Cache L1/L2
 * ============================================================================
 */

#include <iostream>
#include <iomanip>
#include <cstdlib>
#include <climits>

// --- TẦNG 1: KHAI BÁO & SETUP BỘ NHỚ ---
// Định nghĩa kiểu dữ liệu ma trận con trỏ kép trên Heap
using Matrix2D = int**;

// Khởi tạo và cấp phát ma trận động trên Heap
Matrix2D allocateMatrix2d(int rows, int cols) {
    // // Lưu ý: Cấp phát mảng chứa các con trỏ quản lý từng hàng trước
    Matrix2D mat = new int*[rows];
    for (int i = 0; i < rows; ++i) {
        mat[i] = new int[cols]; // Cấp phát từng hàng độc lập
    }
    return mat;
}

// --- TẦNG 2: DUYỆT VÀ HIỂN THỊ MA TRẬN (ROW-MAJOR ORDER) ---
void printArray2d(Matrix2D mat, int rows, int cols) {
    std::cout << "\\n=== [XUẤT MA TRẬN 2 CHIỀU] ===\\n";
    for (int i = 0; i < rows; ++i) {
        std::cout << "  Hàng [" << i << "]: [ ";
        for (int j = 0; j < cols; ++j) {
            std::cout << std::setw(3) << mat[i][j];
            if (j < cols - 1) std::cout << ", ";
        }
        std::cout << " ]\\n";
    }
    // // Lưu ý: Duyệt theo hàng (i trước, j sau) tận dụng Spatial Cache Locality
    std::cout << "  -> Tổng kích thước dữ liệu: " << rows * cols * sizeof(int) << " bytes.\\n";
}

// --- TẦNG 3: THỐNG KÊ & TÌM CỰC TRỊ MỖI HÀNG ---
void findMaxMinInRow(Matrix2D mat, int rows, int cols) {
    std::cout << "\\n=== [THỐNG KÊ CỰC TRỊ MỖI HÀNG] ===\\n";
    int globalMax = INT_MIN;
    int maxR = 0, maxC = 0;

    for (int i = 0; i < rows; ++i) {
        int rowMin = mat[i][0];
        int rowMax = mat[i][0];
        for (int j = 1; j < cols; ++j) {
            if (mat[i][j] < rowMin) rowMin = mat[i][j];
            if (mat[i][j] > rowMax) rowMax = mat[i][j];
        }
        std::cout << "  Hàng " << i << " -> Min: " << std::setw(2) << rowMin 
                  << " | Max: " << std::setw(2) << rowMax 
                  << " | Độ lệch: " << (rowMax - rowMin) << "\\n";
        
        if (rowMax > globalMax) {
            globalMax = rowMax;
            maxR = i;
        }
    }
    std::cout << "  => Max toàn cục ma trận = " << globalMax << " (tại hàng " << maxR << ")\\n";
}

// --- TẦNG 4: BIẾN ĐỔI & LỌC THEO ĐIỀU KIỆN ---
void locTheoDieuKien(Matrix2D mat, int rows, int cols) {
    std::cout << "\\n=== [LỌC THEO ĐIỀU KIỆN (SỐ CHẴN > 40)] ===\\n";
    int matchCount = 0;
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            // // Thay điều kiện ở đây: ví dụ a[i][j] % 2 == 0 hoặc là số nguyên tố
            if (mat[i][j] % 2 == 0 && mat[i][j] > 40) {
                std::cout << "  ✓ Thỏa mãn: a[" << i << "][" << j << "] = " 
                          << mat[i][j] << " (Chẵn & > 40)\\n";
                matchCount++;
            }
        }
    }
    if (matchCount == 0) {
        std::cout << "  (Không có phần tử nào thỏa mãn điều kiện lọc)\\n";
    } else {
        std::cout << "  => Tổng cộng có " << matchCount << " phần tử thỏa điều kiện.\\n";
    }
}

// --- GIẢI PHÓNG BỘ NHỚ HEAP AN TOÀN ---
void freeArray2d(Matrix2D& mat, int rows) {
    std::cout << "\\n=== [THU HỒI BỘ NHỚ VÀ KẾT THÚC] ===\\n";
    if (mat == nullptr) return;
    // // Lưu ý: Bắt buộc giải phóng từng hàng trước, tránh rò rỉ vùng nhớ (memory leak)
    for (int i = 0; i < rows; ++i) {
        delete[] mat[i];
        mat[i] = nullptr;
    }
    delete[] mat; // Giải phóng mảng con trỏ quản lý
    mat = nullptr;
    std::cout << "  [OK] Đã giải phóng hoàn toàn " << rows << " khối nhớ trên Heap.\\n";
    std::cout << "  [OK] Con trỏ gốc đã được reset về nullptr.\\n";
}

// --- HÀM MAIN: ĐIỀU PHỐI & KIỂM CHỨNG TOÀN DIỆN ---
int main() {
    std::cout << "=== KHỞI TẠO VÀ CẤP PHÁT BỘ NHỚ ===\\n";
    const int rows = 3;
    const int cols = 4;

    // 1. Cấp phát động ma trận 3 x 4
    Matrix2D matrix = allocateMatrix2d(rows, cols);
    std::cout << "  [INIT] Cấp phát ma trận " << rows << "x" << cols 
              << " tại Heap (con trỏ kép: " << static_cast<void*>(matrix) << ")\\n";

    // Khởi tạo dữ liệu mẫu
    int sampleData[3][4] = {
        { 12, 45, 78, 23 },
        { 56, 89, 34, 67 },
        { 90, 11, 25, 42 }
    };
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            matrix[i][j] = sampleData[i][j];
        }
    }

    // 2. Duyệt & in ma trận
    printArray2d(matrix, rows, cols);

    // 3. Thống kê cực trị từng hàng
    findMaxMinInRow(matrix, rows, cols);

    // 4. Lọc theo điều kiện
    locTheoDieuKien(matrix, rows, cols);

    // 5. Giải phóng Heap
    freeArray2d(matrix, rows);

    std::cout << "\\n[SUCCESS] Chương trình kết thúc mã 0. Không rò rỉ bộ nhớ (0 leaks).\\n";
    return 0;
}`,
          python: `# ============================================================================
# PLAYBOOK PYTHON: mang2chieu.py - Đối Chiếu Quản Trị Bộ Nhớ Với C++
# Bộ nhớ: Quản lý tự động qua Reference Counting & CPython Cyclic GC
# ============================================================================

def print_array_2d(matrix: list[list[int]]) -> None:
    print("\\n=== [XUẤT MA TRẬN 2 CHIỀU] ===")
    for idx, row in enumerate(matrix):
        formatted = ", ".join(f"{x:3d}" for x in row)
        print(f"  Hàng [{idx}]: [ {formatted} ]")
    print(f"  -> Tổng số phần tử: {len(matrix) * len(matrix[0])}")

def find_max_min_in_row(matrix: list[list[int]]) -> None:
    print("\\n=== [THỐNG KÊ CỰC TRỊ MỖI HÀNG] ===")
    global_max = -float('inf')
    max_row = 0
    for idx, row in enumerate(matrix):
        r_min, r_max = min(row), max(row)
        print(f"  Hàng {idx} -> Min: {r_min:2d} | Max: {r_max:2d} | Độ lệch: {r_max - r_min}")
        if r_max > global_max:
            global_max = r_max
            max_row = idx
    print(f"  => Max toàn cục = {global_max} (tại hàng {max_row})")

def loc_theo_dieu_kien(matrix: list[list[int]]) -> None:
    print("\\n=== [LỌC THEO ĐIỀU KIỆN (SỐ CHẴN > 40)] ===")
    # Python List Comprehension tối ưu
    filtered = [(r, c, val) for r, row in enumerate(matrix) 
                            for c, val in enumerate(row) 
                            if val % 2 == 0 and val > 40]
    for r, c, val in filtered:
        print(f"  ✓ Thỏa mãn: a[{r}][{c}] = {val} (Chẵn & > 40)")
    print(f"  => Tìm thấy {len(filtered)} phần tử thỏa điều kiện.")

def main():
    print("=== KHỞI TẠO MA TRẬN PYTHON ===")
    matrix = [
        [12, 45, 78, 23],
        [56, 89, 34, 67],
        [90, 11, 25, 42]
    ]
    print_array_2d(matrix)
    find_max_min_in_row(matrix)
    loc_theo_dieu_kien(matrix)
    # Python tự động giải phóng vùng nhớ khi biến ra khỏi phạm vi (GC)
    print("\\n[SUCCESS] Garbage Collector thu hồi bộ nhớ tự động.")

if __name__ == "__main__":
    main()`,
          ts: `/**
 * ============================================================================
 * PLAYBOOK TYPESCRIPT: mang2chieu.ts - Đối Chiếu Kiểu Tĩnh & V8 Heap
 * Bộ nhớ: V8 Engine Scavenge (New Space) & Mark-Sweep (Old Space)
 * ============================================================================
 */

type Matrix2D = number[][];

function printArray2d(matrix: Matrix2D): void {
  console.log("\\n=== [XUẤT MA TRẬN 2 CHIỀU] ===");
  matrix.forEach((row, i) => {
    const formatted = row.map(v => v.toString().padStart(3, ' ')).join(', ');
    console.log(\`  Hàng [\${i}]: [ \${formatted} ]\`);
  });
}

function findMaxMinInRow(matrix: Matrix2D): void {
  console.log("\\n=== [THỐNG KÊ CỰC TRỊ MỖI HÀNG] ===");
  let globalMax = -Infinity;
  let maxR = 0;

  matrix.forEach((row, r) => {
    const rowMin = Math.min(...row);
    const rowMax = Math.max(...row);
    console.log(\`  Hàng \${r} -> Min: \${rowMin} | Max: \${rowMax} | Độ lệch: \${rowMax - rowMin}\`);
    if (rowMax > globalMax) {
      globalMax = rowMax;
      maxR = r;
    }
  });
  console.log(\`  => Max toàn cục = \${globalMax} (tại hàng \${maxR})\`);
}

function locTheoDieuKien(matrix: Matrix2D): void {
  console.log("\\n=== [LỌC THEO ĐIỀU KIỆN (SỐ CHẴN > 40)] ===");
  let count = 0;
  matrix.forEach((row, r) => {
    row.forEach((val, c) => {
      // Thay điều kiện ở đây
      if (val % 2 === 0 && val > 40) {
        console.log(\`  ✓ Thỏa mãn: a[\${r}][\${c}] = \${val}\`);
        count++;
      }
    });
  });
  console.log(\`  => Tìm thấy \${count} phần tử phù hợp.\`);
}

function main(): void {
  console.log("=== KHỞI TẠO MA TRẬN TYPESCRIPT ===");
  const matrix: Matrix2D = [
    [12, 45, 78, 23],
    [56, 89, 34, 67],
    [90, 11, 25, 42]
  ];
  printArray2d(matrix);
  findMaxMinInRow(matrix);
  locTheoDieuKien(matrix);
  console.log("\\n[SUCCESS] V8 Engine tự động quản lý vòng đời bộ nhớ.");
}

main();`
        },
        functionOutline: [
          {
            id: "fn_setup",
            name: "1. Setup & Typedef",
            type: "Khai báo",
            badgeType: "info",
            startLine: 1,
            endLine: 26,
            mainCallLines: [111, 112],
            description: "Định nghĩa alias Matrix2D = int** và cấp phát động mảng con trỏ kép trên Heap."
          },
          {
            id: "fn_print",
            name: "2. printArray2d()",
            type: "Duyệt",
            badgeType: "success",
            startLine: 28,
            endLine: 43,
            mainCallLines: [127],
            description: "Duyệt theo hàng (Row-Major Order), tối ưu hóa đường truyền Cache Line L1/L2."
          },
          {
            id: "fn_find_minmax",
            name: "3. findMaxMinInRow()",
            type: "Thống kê",
            badgeType: "warning",
            startLine: 45,
            endLine: 70,
            mainCallLines: [130],
            description: "Tìm Min, Max từng hàng và tìm cực đại toàn cục ma trận với độ phức tạp O(M*N)."
          },
          {
            id: "fn_filter",
            name: "4. locTheoDieuKien()",
            type: "Biến đổi",
            badgeType: "danger",
            startLine: 72,
            endLine: 90,
            mainCallLines: [133],
            description: "Lọc phần tử theo điều kiện logic (điểm neo tùy biến cho người học)."
          },
          {
            id: "fn_free",
            name: "5. freeArray2d()",
            type: "Biến đổi",
            badgeType: "danger",
            startLine: 92,
            endLine: 106,
            mainCallLines: [136],
            description: "Giải phóng Heap an toàn: xóa từng hàng trước, sau đó xóa con trỏ quản lý, gán nullptr."
          },
          {
            id: "fn_main",
            name: "6. main()",
            type: "Kiểm chứng",
            badgeType: "primary",
            startLine: 108,
            endLine: 142,
            mainCallLines: [],
            description: "Khởi tạo dữ liệu mẫu, gọi tuần tự 4 tầng kiểm chứng và xác nhận 0 rò rỉ bộ nhớ."
          }
        ],
        technicalNotes: [
          "Mảng 2D cấp phát động bằng int** không đảm bảo các hàng nằm liên tục trên RAM. Do đó, Cache Hit Rate của int** có thể thấp hơn mảng 1D dẹt (Flat 1D: int* a = new int[M * N]).",
          "Quy tắc giải phóng bộ nhớ (Free Order): Luôn thu hồi ngược quy trình cấp phát (xóa từng delete[] a[i] trước rồi mới delete[] a). Nếu xóa delete[] a trước, bạn sẽ mất địa chỉ các hàng và gây Memory Leak nghiêm trọng!",
          "Luôn reset con trỏ về nullptr sau khi delete để tránh lỗi Dangling Pointer (con trỏ trỏ tới vùng nhớ đã thu hồi).",
          "Truy xuất ma trận theo hàng a[i][j] nhanh gấp 3 - 5 lần so với theo cột a[j][i] trên CPU hiện đại nhờ nguyên lý Spatial Locality."
        ],
        memoryModel: {
          title: "Mô Hình Bộ Nhớ: Stack vs Heap (Ma trận 3x4)",
          stack: [
            { name: "rows", type: "const int", value: "3", address: "0x7ffee14a0", note: "Số hàng (4 bytes)" },
            { name: "cols", type: "const int", value: "4", address: "0x7ffee14a4", note: "Số cột (4 bytes)" },
            { name: "matrix", type: "int**", value: "0x55a100", address: "0x7ffee14a8", note: "Con trỏ kép trỏ tới Heap (8 bytes)" }
          ],
          heapManagement: {
            blockName: "Mảng Quản Lý Con Trỏ Hàng (int*[3])",
            address: "0x55a100",
            size: "24 bytes (3 x 8 bytes pointers)",
            pointers: [
              { index: "matrix[0]", pointsTo: "0x55a200", rowId: 0 },
              { index: "matrix[1]", pointsTo: "0x55a220", rowId: 1 },
              { index: "matrix[2]", pointsTo: "0x55a240", rowId: 2 }
            ]
          },
          heapDataRows: [
            {
              rowId: 0,
              address: "0x55a200",
              label: "Hàng 0 (int[4] = 16 bytes)",
              cells: [
                { index: "[0][0]", val: 12 },
                { index: "[0][1]", val: 45 },
                { index: "[0][2]", val: 78, isHighlight: true, tag: "Thỏa mãn >40 chẵn" },
                { index: "[0][3]", val: 23 }
              ]
            },
            {
              rowId: 1,
              address: "0x55a220",
              label: "Hàng 1 (int[4] = 16 bytes)",
              cells: [
                { index: "[1][0]", val: 56, isHighlight: true, tag: "Thỏa mãn >40 chẵn" },
                { index: "[1][1]", val: 89 },
                { index: "[1][2]", val: 34 },
                { index: "[1][3]", val: 67 }
              ]
            },
            {
              rowId: 2,
              address: "0x55a240",
              label: "Hàng 2 (int[4] = 16 bytes)",
              cells: [
                { index: "[2][0]", val: 90, isHighlight: true, tag: "Max toàn cục & >40 chẵn" },
                { index: "[2][1]", val: 11 },
                { index: "[2][2]", val: 25 },
                { index: "[2][3]", val: 42, isHighlight: true, tag: "Thỏa mãn >40 chẵn" }
              ]
            }
          ],
          comparisonInsight: "So sánh với Mảng 1D Dẹt: int* flat = new int[3 * 4]; truy xuất bằng flat[i * cols + j]. Mảng 1D dẹt chỉ cần 1 khối nhớ liên tục 48 bytes, giảm overhead 24 bytes con trỏ và đạt 100% cache line sequential access."
        },
        terminalOutput: [
          {
            title: "KHỞI TẠO VÀ CẤP PHÁT BỘ NHỚ",
            color: "#4d728f",
            lines: [
              "[INIT] Cấp phát ma trận 3x4 tại Heap (con trỏ kép: 0x55a100)",
              "[INIT] Cấp phát thành công 3 khối dữ liệu hàng: 0x55a200, 0x55a220, 0x55a240",
              "[INIT] Đã nạp thành công 12 phần tử kiểm thử chuẩn."
            ]
          },
          {
            title: "XUẤT MA TRẬN 2 CHIỀU",
            color: "#3f7a5c",
            lines: [
              "Hàng [0]: [  12,  45,  78,  23 ]",
              "Hàng [1]: [  56,  89,  34,  67 ]",
              "Hàng [2]: [  90,  11,  25,  42 ]",
              "-> Tổng kích thước dữ liệu: 48 bytes (12 phần tử int)."
            ]
          },
          {
            title: "THỐNG KÊ CỰC TRỊ MỖI HÀNG",
            color: "#b8732a",
            lines: [
              "Hàng 0 -> Min: 12 | Max: 78 | Độ lệch: 66",
              "Hàng 1 -> Min: 34 | Max: 89 | Độ lệch: 55",
              "Hàng 2 -> Min: 11 | Max: 90 | Độ lệch: 79",
              "=> Max toàn cục ma trận = 90 (tại hàng 2)"
            ]
          },
          {
            title: "LỌC THEO ĐIỀU KIỆN (SỐ CHẴN > 40)",
            color: "#c47457",
            lines: [
              "  ✓ Thỏa mãn: a[0][2] = 78 (Chẵn & > 40)",
              "  ✓ Thỏa mãn: a[1][0] = 56 (Chẵn & > 40)",
              "  ✓ Thỏa mãn: a[2][0] = 90 (Chẵn & > 40)",
              "  ✓ Thỏa mãn: a[2][3] = 42 (Chẵn & > 40)",
              "  => Tổng cộng có 4 phần tử thỏa điều kiện."
            ]
          },
          {
            title: "THU HỒI BỘ NHỚ VÀ KẾT THÚC",
            color: "#567a67",
            lines: [
              "[OK] Đã giải phóng hoàn toàn 3 khối nhớ trên Heap.",
              "[OK] Con trỏ gốc đã được reset về nullptr.",
              "[SUCCESS] Chương trình kết thúc mã 0. Không rò rỉ bộ nhớ (0 leaks)."
            ]
          }
        ],
        miniChallenge: {
          title: "Thử Thách: Tính Tổng Đường Chéo Phụ & Lọc Số Nguyên Tố",
          difficulty: "⭐⭐☆ (Vừa phải)",
          prompt: "1. Hãy viết thêm hàm long long sumSecondaryDiagonal(int** a, int n) tính tổng các phần tử trên đường chéo phụ của ma trận vuông N x N.\\n2. Thay đổi điều kiện tại điểm neo '// Thay điều kiện ở đây' để lọc và in ra tất cả các số nguyên tố có trong ma trận.",
          hints: [
            "Đường chéo phụ bao gồm các phần tử có chỉ số thỏa mãn: i + j = n - 1 (với ma trận vuông cấp n).",
            "Để kiểm tra số nguyên tố, viết hàm phụ trợ bool isPrime(int n) kiểm tra chia hết từ 2 đến sqrt(n)."
          ],
          solution: `// --- GỢI Ý ĐÁP ÁN THỬ THÁCH ---

// 1. Hàm kiểm tra số nguyên tố:
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) return false;
    }
    return true;
}

// 2. Thay điều kiện tại điểm neo // Thay điều kiện ở đây:
/*
if (isPrime(mat[i][j])) {
    std::cout << "  ✓ Số nguyên tố: a[" << i << "][" << j << "] = " 
              << mat[i][j] << "\\n";
    matchCount++;
}
*/

// 3. Hàm tính tổng đường chéo phụ (ma trận vuông n x n):
long long sumSecondaryDiagonal(int** a, int n) {
    long long sum = 0;
    for (int i = 0; i < n; ++i) {
        sum += a[i][n - 1 - i]; // i + j = n - 1
    }
    return sum;
}`
        }
      },
      {
        id: "oop_ke_thua_da_hinh.cpp",
        title: "OOP Kế Thừa, Đa Hình & Bảng Hàm Ảo Vtable (C++17)",
        category: "Lập Trình Hướng Đối Tượng",
        badge: "OOP / Vtable Pointer",
        difficulty: "Nâng Cao",
        description: "Làm chủ cơ chế Dynamic Dispatch qua con trỏ vptr và bảng vtable, giải quyết bài toán Virtual Destructor và ép kiểu động dynamic_cast.",
        sourceFilename: "oop_ke_thua_da_hinh.cpp",
        languages: {
          cpp: `/**
 * ============================================================================
 * PLAYBOOK: oop_ke_thua_da_hinh.cpp - Đa Hình & Bảng Hàm Ảo (vptr / vtable)
 * Ngôn ngữ: C++17 | Môi trường: GCC 11+
 * ============================================================================
 */

#include <iostream>
#include <vector>
#include <memory>
#include <string>

// Lớp cơ sở trừu tượng
class NhanVien {
protected:
    std::string hoTen;
    double luongCoBan;
public:
    NhanVien(const std::string& ten, double luong) : hoTen(ten), luongCoBan(luong) {}
    
    // // Lưu ý: Virtual Destructor là bắt buộc khi xóa đối tượng dẫn xuất qua con trỏ cơ sở!
    virtual ~NhanVien() {
        std::cout << "  [DESTRUCTOR] Hủy NhanVien: " << hoTen << "\\n";
    }

    // Hàm thuần ảo (Pure Virtual Function)
    virtual double tinhLuong() const = 0;
    
    virtual void inThongTin() const {
        std::cout << "  NhanVien: " << hoTen << " | Lương cứng: " << luongCoBan;
    }
};

// Lớp dẫn xuất 1: LapTrinhVien
class LapTrinhVien : public NhanVien {
private:
    int soGioOvertime;
public:
    LapTrinhVien(const std::string& ten, double luong, int ot) 
        : NhanVien(ten, luong), soGioOvertime(ot) {}

    ~LapTrinhVien() override {
        std::cout << "  [DESTRUCTOR] Hủy LapTrinhVien (OT: " << soGioOvertime << "h)\\n";
    }

    // // Thay điều kiện ở đây: ví dụ tăng hệ số OT từ 250000 lên 300000
    double tinhLuong() const override {
        return luongCoBan + soGioOvertime * 250000.0;
    }

    void inThongTin() const override {
        NhanVien::inThongTin();
        std::cout << " | OT: " << soGioOvertime << "h => Tổng lương: " << tinhLuong() << "\\n";
    }

    void pushGitCode() const {
        std::cout << "    -> " << hoTen << " đang push commit lên GitHub Sanctuary repository!\\n";
    }
};

// Lớp dẫn xuất 2: QuanLyDuAn
class QuanLyDuAn : public NhanVien {
private:
    double thuongDuAn;
public:
    QuanLyDuAn(const std::string& ten, double luong, double thuong)
        : NhanVien(ten, luong), thuongDuAn(thuong) {}

    ~QuanLyDuAn() override {
        std::cout << "  [DESTRUCTOR] Hủy QuanLyDuAn (Thưởng: " << thuongDuAn << ")\\n";
    }

    double tinhLuong() const override {
        return luongCoBan + thuongDuAn;
    }

    void inThongTin() const override {
        NhanVien::inThongTin();
        std::cout << " | Thưởng DA: " << thuongDuAn << " => Tổng: " << tinhLuong() << "\\n";
    }
};

int main() {
    std::cout << "=== KHỞI TẠO ĐỐI TƯỢNG ĐA HÌNH VÀ VTABLE ===\\n";
    std::vector<std::unique_ptr<NhanVien>> danhSach;
    danhSach.push_back(std::make_unique<LapTrinhVien>("Trần Văn An", 15000000, 16));
    danhSach.push_back(std::make_unique<QuanLyDuAn>("Lê Thị Bình", 22000000, 8000000));

    std::cout << "\\n=== THỰC THI POLYMORPHISM DISPATCH ===\\n";
    for (const auto& nv : danhSach) {
        nv->inThongTin(); // Gọi gián tiếp qua vtable
        
        // Kiểm tra dynamic_cast
        if (auto dev = dynamic_cast<LapTrinhVien*>(nv.get())) {
            dev->pushGitCode();
        }
    }

    std::cout << "\\n=== GIẢI PHÓNG TỰ ĐỘNG QUA SMART POINTER ===\\n";
    danhSach.clear(); // Gọi Virtual Destructor theo đúng thứ tự
    std::cout << "[SUCCESS] Kết thúc an toàn. Không rò rỉ vtable.\\n";
    return 0;
}`,
          python: `# Python Dynamic Typing & Duck Typing
class NhanVien:
    def __init__(self, ten, luong):
        self.ten = ten
        self.luong = luong
    def tinh_luong(self):
        raise NotImplementedError

class LapTrinhVien(NhanVien):
    def __init__(self, ten, luong, ot):
        super().__init__(ten, luong)
        self.ot = ot
    def tinh_luong(self):
        return self.luong + self.ot * 250000

dev = LapTrinhVien("Trần Văn An", 15000000, 16)
print(f"Tổng lương: {dev.tinh_luong():,}")`,
          ts: `abstract class NhanVien {
  constructor(protected ten: string, protected luong: number) {}
  abstract tinhLuong(): number;
}

class LapTrinhVien extends NhanVien {
  constructor(ten: string, luong: number, private ot: number) {
    super(ten, luong);
  }
  tinhLuong(): number {
    return this.luong + this.ot * 250000;
  }
}`
        },
        functionOutline: [
          { id: "fn_oop_base", name: "1. Abstract Base NhanVien", type: "Khai báo", badgeType: "info", startLine: 12, endLine: 28, mainCallLines: [78], description: "Khai báo lớp trừu tượng với hàm thuần ảo và Virtual Destructor." },
          { id: "fn_oop_dev", name: "2. Class LapTrinhVien", type: "Biến đổi", badgeType: "danger", startLine: 30, endLine: 54, mainCallLines: [79], description: "Kế thừa, override tinhLuong() và bổ sung hàm pushGitCode()." },
          { id: "fn_oop_pm", name: "3. Class QuanLyDuAn", type: "Biến đổi", badgeType: "danger", startLine: 56, endLine: 74, mainCallLines: [80], description: "Kế thừa và tính lương dựa trên tiền thưởng dự án." },
          { id: "fn_oop_main", name: "4. main() & vtable dispatch", type: "Kiểm chứng", badgeType: "primary", startLine: 76, endLine: 98, mainCallLines: [], description: "Kiểm chứng đa hình qua vector<unique_ptr<NhanVien>> và dynamic_cast." }
        ],
        technicalNotes: [
          "Mỗi đối tượng có ít nhất 1 hàm ảo sẽ được chèn 1 con trỏ vptr (8 bytes trên hệ 64-bit) ở đầu vùng nhớ đối tượng, trỏ tới bảng hàm ảo vtable trong Data/Code Segment.",
          "Nếu thiếu từ khóa virtual ở destructor của lớp cha, toán tử delete trên con trỏ NhanVien* sẽ chỉ gọi destructor của NhanVien mà bỏ qua destructor của LapTrinhVien, gây thất thoát tài nguyên!",
          "dynamic_cast dựa vào thông tin RTTI (Run-Time Type Information) để kiểm tra kiểu con tại runtime, trả về nullptr nếu ép kiểu thất bại."
        ],
        memoryModel: {
          title: "Mô Hình Bảng Hàm Ảo (vptr & vtable)",
          stack: [
            { name: "danhSach", type: "vector<unique_ptr>", value: "Size = 2", address: "0x7ffee2100", note: "Quản lý 2 con trỏ đối tượng trên Heap" }
          ],
          heapManagement: {
            blockName: "Đối tượng LapTrinhVien trên Heap (0x55b100)",
            address: "0x55b100",
            size: "40 bytes",
            pointers: [
              { index: "vptr (8 bytes)", pointsTo: "vtable_LapTrinhVien (Code Segment)", rowId: 0 }
            ]
          },
          heapDataRows: [
            {
              rowId: 0,
              address: "0x55b108",
              label: "Fields LapTrinhVien",
              cells: [
                { index: "hoTen", val: "Trần Văn An" },
                { index: "luongCoBan", val: "15.000.000" },
                { index: "soGioOT", val: "16 giờ" }
              ]
            }
          ],
          comparisonInsight: "Chi phí của Đa hình (Polymorphism Cost): Thêm 8 bytes vptr cho mỗi object và thêm 1 bước gián tiếp (indirection) khi gọi hàm qua vtable[slot], nhưng đem lại tính mở rộng (OCP) tối cao cho hệ thống."
        },
        terminalOutput: [
          {
            title: "KHỞI TẠO ĐỐI TƯỢNG ĐA HÌNH VÀ VTABLE",
            color: "#4d728f",
            lines: [
              "[INIT] Tạo LapTrinhVien 'Trần Văn An' -> vptr gắn với vtable_LapTrinhVien",
              "[INIT] Tạo QuanLyDuAn 'Lê Thị Bình' -> vptr gắn với vtable_QuanLyDuAn"
            ]
          },
          {
            title: "THỰC THI POLYMORPHISM DISPATCH",
            color: "#3f7a5c",
            lines: [
              "NhanVien: Trần Văn An | Lương cứng: 15000000 | OT: 16h => Tổng lương: 19000000",
              "  -> Trần Văn An đang push commit lên GitHub Sanctuary repository!",
              "NhanVien: Lê Thị Bình | Lương cứng: 22000000 | Thưởng DA: 8000000 => Tổng: 30000000"
            ]
          },
          {
            title: "GIẢI PHÓNG TỰ ĐỘNG QUA SMART POINTER",
            color: "#567a67",
            lines: [
              "[DESTRUCTOR] Hủy LapTrinhVien (OT: 16h)",
              "[DESTRUCTOR] Hủy NhanVien: Trần Văn An",
              "[DESTRUCTOR] Hủy QuanLyDuAn (Thưởng: 8000000)",
              "[DESTRUCTOR] Hủy NhanVien: Lê Thị Bình",
              "[SUCCESS] Kết thúc an toàn. Không rò rỉ vtable."
            ]
          }
        ],
        miniChallenge: {
          title: "Thử Thách: Bổ Sung Lớp Kỹ Sư DevOps & Tính Thưởng Triển Khai",
          difficulty: "⭐⭐☆ (Vừa phải)",
          prompt: "Hãy tạo thêm lớp KySuDevOps kế thừa NhanVien, có thêm thuộc tính soServerQuanLy và hàm deployCloudCluster(). Override hàm tinhLuong() với công thức: luongCoBan + soServer * 500000.",
          hints: ["Sử dụng public inheritance : public NhanVien", "Đừng quên từ khóa override ở hàm tinhLuong()"],
          solution: `class KySuDevOps : public NhanVien {
private:
    int soServerQuanLy;
public:
    KySuDevOps(const std::string& ten, double luong, int servers)
        : NhanVien(ten, luong), soServerQuanLy(servers) {}
    
    double tinhLuong() const override {
        return luongCoBan + soServerQuanLy * 500000.0;
    }
};`
        }
      },
      {
        id: "danh_sach_lien_ket.cpp",
        title: "Danh Sách Liên Kết Đơn & Quản Trị Con Trỏ Heap (C++17)",
        category: "Cấu Trúc Dữ Liệu Nâng Cao",
        badge: "Singly Linked List",
        difficulty: "Trung Cấp",
        description: "Quản lý các Node phân tán trên Heap, thao tác đảo ngược danh sách không tốn bộ nhớ phụ O(1) space, kiểm soát ngắt kết nối con trỏ an toàn.",
        sourceFilename: "danh_sach_lien_ket.cpp",
        languages: {
          cpp: `/**
 * ============================================================================
 * PLAYBOOK: danh_sach_lien_ket.cpp - Singly Linked List Heap Management
 * ============================================================================
 */
#include <iostream>

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
public:
    LinkedList() : head(nullptr) {}
    ~LinkedList() { clear(); }

    void insertTail(int val) {
        Node* newNode = new Node(val);
        if (!head) { head = newNode; return; }
        Node* temp = head;
        while (temp->next) temp = temp->next;
        temp->next = newNode;
    }

    void printList() const {
        std::cout << "  Head -> ";
        Node* temp = head;
        while (temp) {
            std::cout << "[" << temp->data << "] -> ";
            temp = temp->next;
        }
        std::cout << "nullptr\\n";
    }

    // Đảo ngược danh sách liên kết O(N) time, O(1) space
    void reverse() {
        Node* prev = nullptr;
        Node* curr = head;
        Node* nextNode = nullptr;
        while (curr) {
            nextNode = curr->next;
            curr->next = prev; // Đảo chiều con trỏ
            prev = curr;
            curr = nextNode;
        }
        head = prev;
    }

    void clear() {
        Node* curr = head;
        while (curr) {
            Node* nxt = curr->next;
            delete curr;
            curr = nxt;
        }
        head = nullptr;
    }
};

int main() {
    std::cout << "=== KHỞI TẠO LINKED LIST TRÊN HEAP ===\\n";
    LinkedList list;
    list.insertTail(10);
    list.insertTail(25);
    list.insertTail(42);
    list.insertTail(99);

    std::cout << "=== DANH SÁCH BAN ĐẦU ===\\n";
    list.printList();

    std::cout << "=== ĐẢO NGƯỢC DANH SÁCH (IN-PLACE REVERSE) ===\\n";
    list.reverse();
    list.printList();

    std::cout << "\\n[SUCCESS] Giải phóng toàn bộ Node thành công.\\n";
    return 0;
}`,
          python: `class Node:
    def __init__(self, val):
        self.data = val
        self.next = None`,
          ts: `class ListNode {
  constructor(public data: number, public next: ListNode | null = null) {}
}`
        },
        functionOutline: [
          { id: "fn_ll_node", name: "1. Node Struct & Cấp Phát", type: "Khai báo", badgeType: "info", startLine: 7, endLine: 13, mainCallLines: [], description: "Định nghĩa cấu trúc Node gồm data và con trỏ next." },
          { id: "fn_ll_insert", name: "2. insertTail()", type: "Biến đổi", badgeType: "danger", startLine: 19, endLine: 27, mainCallLines: [65, 66, 67, 68], description: "Thêm phần tử vào cuối danh sách liên kết." },
          { id: "fn_ll_print", name: "3. printList()", type: "Duyệt", badgeType: "success", startLine: 29, endLine: 38, mainCallLines: [71, 75], description: "Duyệt tuần tự từ head tới nullptr." },
          { id: "fn_ll_rev", name: "4. reverse()", type: "Biến đổi", badgeType: "warning", startLine: 40, endLine: 53, mainCallLines: [74], description: "Đảo ngược danh sách tại chỗ (in-place) với 3 con trỏ prev, curr, next." },
          { id: "fn_ll_main", name: "5. main()", type: "Kiểm chứng", badgeType: "primary", startLine: 63, endLine: 79, mainCallLines: [], description: "Kiểm thử thêm phần tử, đảo ngược và giải phóng Heap." }
        ],
        technicalNotes: [
          "Các Node trong LinkedList phân tán rải rác trên Heap, không liên tục. Điều này dẫn tới Cache Miss cao hơn nhiều so với std::vector.",
          "Khi thao tác đảo ngược danh sách, cẩn thận lưu lại nextNode = curr->next trước khi trỏ curr->next = prev để không làm mất phần còn lại của danh sách."
        ],
        memoryModel: {
          title: "Mô Hình Node Phân Tán Trên Heap",
          stack: [
            { name: "list.head", type: "Node*", value: "0x60a100", address: "0x7ffee3300", note: "Trỏ tới Node đầu tiên" }
          ],
          heapManagement: {
            blockName: "Chuỗi Con Trỏ Next Trên Heap",
            address: "0x60a100 -> 0x60a120 -> 0x60a140",
            size: "3 x 16 bytes",
            pointers: [
              { index: "Node(10)->next", pointsTo: "0x60a120", rowId: 0 },
              { index: "Node(25)->next", pointsTo: "0x60a140", rowId: 1 },
              { index: "Node(42)->next", pointsTo: "nullptr", rowId: 2 }
            ]
          },
          heapDataRows: [
            { rowId: 0, address: "0x60a100", label: "Node 1", cells: [{ index: "data", val: 10 }, { index: "next", val: "0x60a120" }] },
            { rowId: 1, address: "0x60a120", label: "Node 2", cells: [{ index: "data", val: 25 }, { index: "next", val: "0x60a140" }] },
            { rowId: 2, address: "0x60a140", label: "Node 3", cells: [{ index: "data", val: 42 }, { index: "next", val: "nullptr" }] }
          ],
          comparisonInsight: "LinkedList cho phép chèn O(1) ở đầu/cuối nếu có pointer, nhưng tốn thêm 8 bytes con trỏ next cho mỗi phần tử."
        },
        terminalOutput: [
          {
            title: "KHỞI TẠO LINKED LIST TRÊN HEAP",
            color: "#4d728f",
            lines: ["[INIT] Cấp phát 4 nodes: 10, 25, 42, 99 trên Heap."]
          },
          {
            title: "DANH SÁCH BAN ĐẦU",
            color: "#3f7a5c",
            lines: ["  Head -> [10] -> [25] -> [42] -> [99] -> nullptr"]
          },
          {
            title: "ĐẢO NGƯỢC DANH SÁCH (IN-PLACE REVERSE)",
            color: "#b8732a",
            lines: [
              "  Head -> [99] -> [42] -> [25] -> [10] -> nullptr",
              "  => Đảo ngược hoàn thành với O(1) bộ nhớ phụ."
            ]
          }
        ],
        miniChallenge: {
          title: "Thử Thách: Tìm Phần Tử Giữa (Middle of Linked List) Trong 1 Lượt Duyệt",
          difficulty: "⭐⭐☆ (Vừa phải)",
          prompt: "Áp dụng kỹ thuật hai con trỏ Rùa và Thỏ (Fast & Slow Pointers) để tìm Node chính giữa danh sách liên kết chỉ với một vòng lặp duyệt duy nhất.",
          hints: ["Con trỏ slow nhảy 1 bước (slow = slow->next), con trỏ fast nhảy 2 bước (fast = fast->next->next)."],
          solution: `Node* findMiddle(Node* head) {
    if (!head) return nullptr;
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow; // Khi fast đến cuối, slow nằm ngay giữa
}`
        }
      },
      {
        id: "concurrency_mutex_threads.cpp",
        title: "Đa Luồng, std::mutex & Ngăn Chặn Race Condition (C++17)",
        category: "Hệ Điều Hành & Song Song",
        badge: "C++ Concurrency / Threads",
        difficulty: "Nâng Cao",
        description: "Kiểm soát tranh chấp dữ liệu (Race Condition) bằng std::mutex và std::lock_guard (RAII pattern), đảm bảo tính toàn vẹn bộ nhớ dùng chung.",
        sourceFilename: "concurrency_mutex_threads.cpp",
        languages: {
          cpp: `/**
 * ============================================================================
 * PLAYBOOK: concurrency_mutex_threads.cpp - Race Condition & Mutex
 * ============================================================================
 */
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>

long long sharedCounter = 0;
std::mutex counterMutex;

void safeIncrement(int iterations, int threadId) {
    for (int i = 0; i < iterations; ++i) {
        // RAII Lock Guard: Tự động khóa khi vào scope và mở khóa khi ra scope
        std::lock_guard<std::mutex> lock(counterMutex);
        // // Thay điều kiện ở đây: ví dụ tăng biến đếm thêm 2 hoặc ghi log
        sharedCounter++;
    }
}

int main() {
    std::cout << "=== THỰC THI CONCURRENCY VỚI 4 LUỒNG DÙNG CHUNG HEAP ===\\n";
    const int NUM_THREADS = 4;
    const int ITERATIONS = 250000;
    std::vector<std::thread> workers;

    for (int i = 0; i < NUM_THREADS; ++i) {
        workers.emplace_back(safeIncrement, ITERATIONS, i);
    }

    for (auto& t : workers) {
        t.join();
    }

    std::cout << "  Kết quả sharedCounter kỳ vọng: " << (NUM_THREADS * ITERATIONS) << "\\n";
    std::cout << "  Kết quả sharedCounter thực tế: " << sharedCounter << "\\n";
    std::cout << "[SUCCESS] Không xảy ra Race Condition. Bộ nhớ được đồng bộ tuyệt đối.\\n";
    return 0;
}`,
          python: `import threading

counter = 0
lock = threading.Lock()

def worker():
    global counter
    for _ in range(250000):
        with lock:
            counter += 1`,
          ts: `// TypeScript/Node.js dùng Worker Threads hoặc Event Loop đơn luồng`
        },
        functionOutline: [
          { id: "fn_th_setup", name: "1. Shared Memory & std::mutex", type: "Khai báo", badgeType: "info", startLine: 9, endLine: 13, mainCallLines: [], description: "Khai báo biến toàn cục và đối tượng khóa đồng bộ std::mutex." },
          { id: "fn_th_worker", name: "2. safeIncrement()", type: "Biến đổi", badgeType: "warning", startLine: 15, endLine: 23, mainCallLines: [30], description: "Dùng std::lock_guard khóa bảo vệ vùng tranh chấp." },
          { id: "fn_th_main", name: "3. main() Thread Pool", type: "Kiểm chứng", badgeType: "primary", startLine: 25, endLine: 41, mainCallLines: [], description: "Khởi tạo 4 worker threads, join() và xác thực kết quả." }
        ],
        technicalNotes: [
          "Luôn sử dụng std::lock_guard hoặc std::unique_lock theo chuẩn RAII thay vì tự gọi mutex.lock() và mutex.unlock() thủ công để tránh rủi ro Deadlock nếu có Exception phát sinh.",
          "Chi phí tranh chấp Mutex (Contention Overhead): Nếu lock quá nhiều sẽ biến chương trình đa luồng thành tuần tự (Serialization bottleneck)."
        ],
        memoryModel: {
          title: "Mô Hình Bộ Nhớ Đa Luồng (Multiple Stacks, Shared Data)",
          stack: [
            { name: "Thread 0 Stack", type: "Stack Frame", value: "SP: 0x7fa0", address: "0x7fa0", note: "i = 12000" },
            { name: "Thread 1 Stack", type: "Stack Frame", value: "SP: 0x7fb0", address: "0x7fb0", note: "i = 9500" }
          ],
          heapManagement: {
            blockName: "Vùng Nhớ Dùng Chung (Data Segment / Heap)",
            address: "0x40a080",
            size: "16 bytes",
            pointers: [
              { index: "sharedCounter", pointsTo: "1,000,000", rowId: 0 },
              { index: "counterMutex", pointsTo: "UNLOCKED (0)", rowId: 1 }
            ]
          },
          heapDataRows: [
            { rowId: 0, address: "0x40a080", label: "sharedCounter", cells: [{ index: "value", val: "1000000" }] }
          ],
          comparisonInsight: "Tối ưu hóa: Thay vì Mutex nặng nề, có thể dùng std::atomic<long long> để sử dụng lệnh CPU CAS (Compare-And-Swap) không khóa (Lock-Free)."
        },
        terminalOutput: [
          {
            title: "THỰC THI CONCURRENCY VỚI 4 LUỒNG DÙNG CHUNG HEAP",
            color: "#4d728f",
            lines: [
              "[THREAD 0] Đang chạy với 250,000 lượt tăng an toàn...",
              "[THREAD 1] Đang chạy với 250,000 lượt tăng an toàn...",
              "[THREAD 2] Đang chạy với 250,000 lượt tăng an toàn...",
              "[THREAD 3] Đang chạy với 250,000 lượt tăng an toàn..."
            ]
          },
          {
            title: "KIỂM CHỨNG TOÀN VẸN DỮ LIỆU",
            color: "#3f7a5c",
            lines: [
              "  Kết quả sharedCounter kỳ vọng: 1000000",
              "  Kết quả sharedCounter thực tế: 1000000",
              "[SUCCESS] Không xảy ra Race Condition. Bộ nhớ được đồng bộ tuyệt đối."
            ]
          }
        ],
        miniChallenge: {
          title: "Thử Thách: Chuyển Đổi Sang std::atomic (Lock-Free)",
          difficulty: "⭐⭐⭐ (Khó)",
          prompt: "Thay thế std::mutex và std::lock_guard bằng kiểu dữ liệu nguyên tử std::atomic<long long> sharedCounter{0}; và gọi sharedCounter.fetch_add(1, std::memory_order_relaxed).",
          hints: ["Thư viện <atomic> cung cấp các thao tác phần cứng không cần chuyển ngữ cảnh (context switch)."],
          solution: `#include <atomic>
std::atomic<long long> sharedCounter{0};

void atomicIncrement(int iterations) {
    for (int i = 0; i < iterations; ++i) {
        sharedCounter.fetch_add(1, std::memory_order_relaxed);
    }
}`
        }
      },
      {
        id: "sql_queries.sql",
        title: "Truy Vấn Quan Hệ, Tối Ưu Chỉ Mục & EXPLAIN Plan (PostgreSQL)",
        category: "Cơ Sở Dữ Liệu Quan Hệ",
        badge: "SQL / Indexing",
        difficulty: "Trung Cấp",
        description: "Truy vấn kết nối đa bảng (JOIN), gom nhóm (GROUP BY), hàm cửa sổ (WINDOW FUNCTION) và phân tích Index Scan vs Seq Scan.",
        sourceFilename: "sql_queries.sql",
        languages: {
          cpp: `-- ============================================================================
-- PLAYBOOK: sql_queries.sql - Tối Ưu Hóa Truy Vấn & Chỉ Mục B-Tree
-- Chuẩn CSDL: PostgreSQL 15+ / MySQL 8+
-- ============================================================================

-- 1. TẠO BẢNG VÀ RÀNG BUỘC KHÓA NGOẠI
CREATE TABLE IF NOT EXISTS sinh_vien (
    id SERIAL PRIMARY KEY,
    ma_so VARCHAR(12) UNIQUE NOT NULL,
    ho_ten VARCHAR(100) NOT NULL,
    khoa VARCHAR(50) DEFAULT 'CNTT',
    ngay_nhap_hoc DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS bang_diem (
    id SERIAL PRIMARY KEY,
    sinh_vien_id INT REFERENCES sinh_vien(id) ON DELETE CASCADE,
    ma_mon VARCHAR(15) NOT NULL,
    diem_so NUMERIC(4, 2) CHECK (diem_so >= 0.0 AND diem_so <= 10.0),
    hoc_ky VARCHAR(10) NOT NULL
);

-- 2. TẠO CHỈ MỤC B-TREE TỐI ƯU
CREATE INDEX IF NOT EXISTS idx_bang_diem_sv_mon ON bang_diem(sinh_vien_id, ma_mon);

-- 3. TRUY VẤN THỐNG KÊ GPA VÀ XẾP HẠNG HỌC LỰC (WINDOW FUNCTION)
-- // Thay điều kiện ở đây: ví dụ lọc GPA >= 8.0 hoặc đổi thang điểm
WITH thong_ke_gpa AS (
    SELECT 
        sv.id,
        sv.ma_so,
        sv.ho_ten,
        ROUND(AVG(bd.diem_so), 2) AS gpa_trung_binh,
        COUNT(bd.ma_mon) AS so_mon_da_hoc
    FROM sinh_vien sv
    INNER JOIN bang_diem bd ON sv.id = bd.sinh_vien_id
    GROUP BY sv.id, sv.ma_so, sv.ho_ten
    HAVING COUNT(bd.ma_mon) >= 3
)
SELECT 
    ma_so,
    ho_ten,
    gpa_trung_binh,
    so_mon_da_hoc,
    DENSE_RANK() OVER (ORDER BY gpa_trung_binh DESC) AS hang_lop
FROM thong_ke_gpa
ORDER BY hang_lop ASC;

-- 4. KIỂM CHỨNG EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT sv.ho_ten, bd.diem_so 
FROM sinh_vien sv 
JOIN bang_diem bd ON sv.id = bd.sinh_vien_id 
WHERE sv.ma_so = '24520001';`,
          python: `# Python SQLAlchemy ORM equivalent
from sqlalchemy import select, func`,
          ts: `// TypeScript Prisma / Drizzle ORM equivalent`
        },
        functionOutline: [
          { id: "fn_sql_ddl", name: "1. DDL & Foreign Keys", type: "Khai báo", badgeType: "info", startLine: 6, endLine: 23, mainCallLines: [], description: "Tạo cấu trúc bảng sinh_vien và bang_diem kèm ràng buộc toàn vẹn." },
          { id: "fn_sql_idx", name: "2. B-Tree Indexing", type: "Biến đổi", badgeType: "warning", startLine: 25, endLine: 27, mainCallLines: [], description: "Tạo Composite Index (sinh_vien_id, ma_mon) tăng tốc tìm kiếm." },
          { id: "fn_sql_cte", name: "3. CTE & Window Ranking", type: "Thống kê", badgeType: "success", startLine: 29, endLine: 50, mainCallLines: [], description: "Tính GPA trung bình với HAVING và hàm DENSE_RANK() OVER()." },
          { id: "fn_sql_explain", name: "4. EXPLAIN ANALYZE", type: "Kiểm chứng", badgeType: "primary", startLine: 52, endLine: 58, mainCallLines: [], description: "Phân tích kế hoạch thực thi Index Scan thay vì Sequential Scan." }
        ],
        technicalNotes: [
          "Composite Index (A, B) tuân thủ quy tắc Leftmost Prefix: Có thể tối ưu cho WHERE A = ? hoặc WHERE A = ? AND B = ?, nhưng không hỗ trợ nếu chỉ tìm theo WHERE B = ?.",
          "EXPLAIN ANALYZE thực sự chạy câu lệnh trong Database engine và đo thời gian Execution Time chính xác, khác với EXPLAIN thông thường chỉ ước lượng chi phí Cost."
        ],
        memoryModel: {
          title: "Mô Hình B-Tree Index & Buffer Pool Cache",
          stack: [
            { name: "Query Session", type: "Backend PID", value: "PID: 14820", address: "WorkMem: 64MB", note: "Bộ nhớ sắp xếp Sorting Hash" }
          ],
          heapManagement: {
            blockName: "PostgreSQL Shared Buffer Pool (RAM)",
            address: "Page #401",
            size: "8KB per Page",
            pointers: [
              { index: "Root B-Tree", pointsTo: "idx_bang_diem", rowId: 0 }
            ]
          },
          heapDataRows: [
            { rowId: 0, address: "Page #401", label: "Index Leaf Page", cells: [{ index: "Key: 24520001", val: "TID (0, 1)" }] }
          ],
          comparisonInsight: "Seq Scan đọc toàn bộ Table Pages (O(N) I/O). B-Tree Index Scan chỉ đọc log(N) Pages, giảm thời gian truy vấn từ hàng trăm ms xuống dưới 0.5ms."
        },
        terminalOutput: [
          {
            title: "THỰC THI SCHEMA DDL VÀ INDEX",
            color: "#4d728f",
            lines: [
              "CREATE TABLE sinh_vien (2 tables created successfully).",
              "CREATE INDEX idx_bang_diem_sv_mon (B-Tree index built in 1.4ms)."
            ]
          },
          {
            title: "KẾT QUẢ XẾP HẠNG GPA (TOP SINH VIÊN)",
            color: "#3f7a5c",
            lines: [
              "ma_so    | ho_ten             | gpa   | so_mon | hang_lop",
              "---------+--------------------+-------+--------+---------",
              "24520115 | Nguyễn Thị Ánh     |  9.40 |      5 |       1",
              "24520042 | Trần Hoàng Nam     |  8.85 |      4 |       2",
              "24520018 | Lê Quốc Bảo        |  8.60 |      4 |       3"
            ]
          },
          {
            title: "EXPLAIN ANALYZE EXECUTION PLAN",
            color: "#b8732a",
            lines: [
              "Index Scan using idx_bang_diem_sv_mon on bang_diem (cost=0.15..8.17 rows=1 width=38)",
              "Execution Time: 0.042 ms (Rất nhanh nhờ B-Tree Index)"
            ]
          }
        ],
        miniChallenge: {
          title: "Thử Thách: Viết Truy Vấn Tìm Top 1 Môn Điểm Cao Nhất Của Mỗi Sinh Viên",
          difficulty: "⭐⭐☆ (Vừa phải)",
          prompt: "Sử dụng ROW_NUMBER() OVER (PARTITION BY sinh_vien_id ORDER BY diem_so DESC) để lấy ra đúng môn học có điểm số cao nhất của từng bạn.",
          hints: ["Dùng Common Table Expression (WITH top_mon AS (...)) và lọc WHERE rn = 1."],
          solution: `WITH xep_hang_mon AS (
    SELECT 
        sinh_vien_id, 
        ma_mon, 
        diem_so,
        ROW_NUMBER() OVER (PARTITION BY sinh_vien_id ORDER BY diem_so DESC) AS rn
    FROM bang_diem
)
SELECT sinh_vien_id, ma_mon, diem_so 
FROM xep_hang_mon 
WHERE rn = 1;`
        }
      }
    ]
  };

  // --- 2. TRẠNG THÁI STUDIO NỘI BỘ (STUDIO STATE) ---
  const studioState = {
    activePlaybookId: "mang2chieu.cpp",
    activeLanguage: "cpp", // 'cpp' | 'python' | 'ts'
    isSideBySide: false,
    activeFunctionId: null,
    activeRightTab: "terminal", // 'terminal' | 'memory' | 'challenge'
    isRunning: false,
    filterOutlineKeyword: "",
    isStreamingTerminal: false,
    userEditedCode: {}, // Lưu code người học chỉnh sửa
    customConditionSnippet: null
  };

  // Hàm helper lấy danh sách Playbook (ưu tiên window.PLAYBOOK_DATA nếu có)
  function getPlaybookList() {
    if (window.PLAYBOOK_DATA && Array.isArray(window.PLAYBOOK_DATA.playbooks) && window.PLAYBOOK_DATA.playbooks.length > 0) {
      return window.PLAYBOOK_DATA.playbooks;
    }
    return DEFAULT_PLAYBOOK_DATA.playbooks;
  }

  // Lấy playbook hiện tại
  function getCurrentPlaybook() {
    const list = getPlaybookList();
    return list.find(p => p.id === studioState.activePlaybookId) || list[0];
  }

  // --- 3. TOAST THÔNG BÁO ---
  function studioToast(msg, type = "info") {
    if (typeof window.showToast === "function") {
      window.showToast(msg, type);
      return;
    }
    let toast = document.getElementById("playbook-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "playbook-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = `playbook-toast show ${type}`;
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  // --- 4. CÚ PHÁP HIGHLIGHT ĐƠN GIẢN VÀ TINH TẾ ---
  function escapeHtml(text) {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function highlightSyntaxCpp(lineText) {
    let esc = escapeHtml(lineText);

    // Xử lý comment
    if (esc.trim().startsWith("//") || esc.trim().startsWith("/*") || esc.trim().startsWith("*")) {
      return `<span class="syn-comment">${esc}</span>`;
    }

    // Preprocessor #include, #define
    if (esc.trim().startsWith("#")) {
      esc = esc.replace(/(#\w+)/g, '<span class="syn-preprocessor">$1</span>');
      esc = esc.replace(/(&lt;[\w\.\/]+&gt;)/g, '<span class="syn-string">$1</span>');
      return esc;
    }

    // Chuỗi String literals "..."
    esc = esc.replace(/("(?:\\.|[^"\\])*")/g, '<span class="syn-string">$1</span>');

    // Từ khóa ngôn ngữ C++
    const keywords = [
      'class', 'struct', 'public', 'private', 'protected', 'template', 'typename',
      'virtual', 'override', 'static', 'constexpr', 'const', 'return', 'for', 'while',
      'do', 'if', 'else', 'switch', 'case', 'break', 'continue', 'new', 'delete',
      'nullptr', 'this', 'sizeof', 'typedef', 'using', 'namespace', 'auto', 'try',
      'catch', 'throw', 'inline', 'static_cast', 'dynamic_cast'
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    esc = esc.replace(kwRegex, '<span class="syn-keyword">$1</span>');

    // Kiểu dữ liệu Types
    const types = [
      'void', 'int', 'float', 'double', 'char', 'bool', 'long', 'size_t', 'uint32_t',
      'int32_t', 'int64_t', 'uint64_t', 'string', 'vector', 'unique_ptr', 'shared_ptr',
      'make_unique', 'make_shared', 'mutex', 'lock_guard', 'thread', 'Matrix2D', 'Node',
      'NhanVien', 'LapTrinhVien', 'QuanLyDuAn', 'LinkedList', 'INT_MIN', 'INT_MAX'
    ];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
    esc = esc.replace(typeRegex, '<span class="syn-type">$1</span>');

    // std namespace & functions
    esc = esc.replace(/\b(std|cout|cin|endl|setw)\b/g, '<span class="syn-std">$1</span>');

    // Số Number literals
    esc = esc.replace(/\b(\d+)\b/g, '<span class="syn-number">$1</span>');

    return esc;
  }

  // --- 5. TIỆN ÍCH RENDER CỘT 1: FUNCTION NAVIGATOR ---
  function renderFunctionNavigatorHtml(playbook) {
    const outline = playbook.functionOutline || [];
    const kw = (studioState.filterOutlineKeyword || "").toLowerCase().trim();
    const filtered = outline.filter(f => {
      if (!kw) return true;
      return f.name.toLowerCase().includes(kw) || f.type.toLowerCase().includes(kw) || (f.description && f.description.toLowerCase().includes(kw));
    });

    const badgeColors = {
      "Khai báo": "badge-info",
      "Duyệt": "badge-success",
      "Thống kê": "badge-warning",
      "Biến đổi": "badge-danger",
      "Kiểm chứng": "badge-primary"
    };

    return `
      <div class="navigator-card">
        <div class="navigator-header">
          <div class="nav-title-group">
            <span class="nav-icon">📑</span>
            <div>
              <h3 class="nav-title">Mục Lục Hàm</h3>
              <p class="nav-sub">${outline.length} hàm chuẩn kiến trúc</p>
            </div>
          </div>
          <span class="nav-pill-badge">${playbook.difficulty || 'Chuẩn'}</span>
        </div>

        <div class="nav-search-box">
          <input 
            type="text" 
            class="nav-search-input" 
            id="playbookNavSearchInput"
            placeholder="Tìm nhanh tên hàm hoặc loại..." 
            value="${escapeHtml(studioState.filterOutlineKeyword)}"
          />
        </div>

        <div class="nav-list" id="playbookNavList">
          ${filtered.length === 0 ? `
            <div class="nav-empty">Không tìm thấy hàm nào khớp với từ khóa "${escapeHtml(kw)}"</div>
          ` : filtered.map(fn => {
            const isActive = studioState.activeFunctionId === fn.id;
            const badgeCls = badgeColors[fn.type] || "badge-info";
            const mainCallCount = (fn.mainCallLines && fn.mainCallLines.length > 0) 
              ? `<span class="nav-call-badge" title="Gọi tại main() ở dòng ${fn.mainCallLines.join(', ')}">↳ main() L${fn.mainCallLines.join(', ')}</span>` 
              : '';

            return `
              <div 
                class="nav-item-card ${isActive ? 'active' : ''}" 
                data-fn-id="${fn.id}"
                data-start-line="${fn.startLine}"
                data-end-line="${fn.endLine}"
                data-main-calls="${(fn.mainCallLines || []).join(',')}"
                role="button"
                tabindex="0"
              >
                <div class="nav-item-top">
                  <span class="nav-fn-name">${escapeHtml(fn.name)}</span>
                  <span class="nav-type-badge ${badgeCls}">${fn.type}</span>
                </div>
                <div class="nav-item-meta">
                  <span class="nav-line-range">L${fn.startLine} - L${fn.endLine}</span>
                  ${mainCallCount}
                </div>
                ${fn.description ? `<p class="nav-fn-desc">${escapeHtml(fn.description)}</p>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // --- 6. TIỆN ÍCH RENDER CỘT 2: CODE PLAYBOOK EDITOR ---
  function renderCodeEditorHtml(playbook) {
    const lang = studioState.activeLanguage;
    const isSide = studioState.isSideBySide;
    const rawCode = studioState.userEditedCode[playbook.id] || playbook.languages[lang] || playbook.languages.cpp;
    const lines = rawCode.split('\n');

    let secondaryHtml = '';
    if (isSide) {
      const secLang = lang === 'cpp' ? 'python' : 'cpp';
      const secCode = playbook.languages[secLang] || '';
      const secLines = secCode.split('\n');
      secondaryHtml = `
        <div class="editor-side-pane">
          <div class="editor-side-header">
            <span>Đối chiếu: ${secLang.toUpperCase()}</span>
            <span class="pill-badge-outline">${secLang === 'python' ? 'Dynamic Typing / GC' : 'Manual Memory / Static'}</span>
          </div>
          <div class="editor-code-container side-code-scroll">
            <div class="code-lines-wrapper">
              ${secLines.map((line, idx) => `
                <div class="code-line-row">
                  <span class="code-line-num">${idx + 1}</span>
                  <span class="code-line-text">${highlightSyntaxCpp(line)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    const allPlaybooks = getPlaybookList();

    return `
      <div class="editor-card">
        <!-- TOOLBAR TRÊN CÙNG -->
        <div class="editor-toolbar">
          <div class="toolbar-left">
            <label for="playbookSelector" class="toolbar-label">Bài Playbook:</label>
            <select class="playbook-dropdown" id="playbookSelector">
              ${allPlaybooks.map(p => `
                <option value="${p.id}" ${p.id === playbook.id ? 'selected' : ''}>
                  ${escapeHtml(p.id)} — ${escapeHtml(p.title.split('(')[0])}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="toolbar-actions">
            <!-- NÚT CHẠY THỬ -->
            <button 
              type="button" 
              class="btn-studio btn-run ${studioState.isRunning ? 'running' : ''}" 
              id="runPlaybookBtn"
              ${studioState.isRunning ? 'disabled' : ''}
            >
              <span class="btn-icon">${studioState.isRunning ? '⏳' : '⚡'}</span>
              <span class="btn-text">${studioState.isRunning ? 'Đang thực thi...' : 'Chạy Thử (Run Code)'}</span>
            </button>

            <!-- NÚT ĐỔI NGÔN NGỮ / SIDE-BY-SIDE -->
            <div class="lang-switch-group">
              <button 
                type="button" 
                class="btn-studio-sm ${lang === 'cpp' ? 'active' : ''}" 
                data-switch-lang="cpp"
                title="Mã nguồn chuẩn C++17"
              >C++</button>
              <button 
                type="button" 
                class="btn-studio-sm ${lang === 'python' ? 'active' : ''}" 
                data-switch-lang="python"
                title="Mã đối chiếu Python"
              >Python</button>
              <button 
                type="button" 
                class="btn-studio-sm ${lang === 'ts' ? 'active' : ''}" 
                data-switch-lang="ts"
                title="Mã đối chiếu TypeScript"
              >TS</button>
            </div>

            <!-- NÚT BẬT TẮT SO SÁNH SONG SONG -->
            <button 
              type="button" 
              class="btn-studio-icon ${isSide ? 'active' : ''}" 
              id="toggleSideBySideBtn"
              title="${isSide ? 'Tắt so sánh song song' : 'Bật so sánh song song C++ vs Python'}"
            >
              🔄 So sánh
            </button>

            <!-- NÚT SAO CHÉP MÃ -->
            <button 
              type="button" 
              class="btn-studio-icon" 
              id="copyPlaybookCodeBtn"
              title="Sao chép toàn bộ mã nguồn"
            >
              📋 Sao chép
            </button>

            <!-- NÚT KHÔI PHỤC MẶC ĐỊNH -->
            <button 
              type="button" 
              class="btn-studio-icon" 
              id="resetPlaybookCodeBtn"
              title="Khôi phục mã nguồn ban đầu"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        <!-- VÙNG SOẠN THẢO VÀ XEM MÃ NGUỒN -->
        <div class="editor-split-wrapper ${isSide ? 'has-side-pane' : ''}">
          <div class="editor-main-pane">
            <div class="editor-pane-header">
              <span class="code-filename-pill">📄 ${playbook.sourceFilename || playbook.id}</span>
              <span class="code-meta-pill">${lines.length} dòng • C++17 Standard • UTF-8</span>
            </div>
            
            <div class="editor-code-container" id="editorCodeScrollContainer">
              <div class="code-lines-wrapper" id="codeLinesWrapper">
                ${lines.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isConditionAnchor = line.includes("// Thay điều kiện ở đây") || line.includes("// Thay điều kiện");
                  const isNoteAnchor = line.includes("// Lưu ý:") || line.includes("// Chú ý:");

                  let rowCls = "code-line-row";
                  let anchorTag = "";

                  if (isConditionAnchor) {
                    rowCls += " code-anchor-interactive";
                    anchorTag = `<span class="anchor-badge anchor-condition" title="Điểm neo thực hành - Bạn có thể thay đổi điều kiện lọc tại đây">⚡ ĐIỂM NEO THỰC HÀNH</span>`;
                  } else if (isNoteAnchor) {
                    rowCls += " code-anchor-note";
                    anchorTag = `<span class="anchor-badge anchor-warning" title="Lưu ý kỹ thuật quan trọng">💡 LƯU Ý KỸ THUẬT</span>`;
                  }

                  return `
                    <div class="${rowCls}" id="code-line-${lineNum}" data-line="${lineNum}">
                      <span class="code-line-num">${lineNum}</span>
                      <span class="code-line-text">${highlightSyntaxCpp(line)}</span>
                      ${anchorTag}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          ${secondaryHtml}
        </div>
      </div>
    `;
  }

  // --- 7. TIỆN ÍCH RENDER CỘT 3: LIVE TERMINAL & MEMORY VISUALIZER ---
  function renderRightColumnHtml(playbook) {
    const activeTab = studioState.activeRightTab;
    const mem = playbook.memoryModel || {};
    const notes = playbook.technicalNotes || [];
    const challenge = playbook.miniChallenge || null;

    return `
      <div class="live-visualizer-card">
        <!-- TABS ĐIỀU HƯỚNG CỘT PHẢI -->
        <div class="visualizer-tabs-bar">
          <button 
            type="button" 
            class="tab-btn ${activeTab === 'terminal' ? 'active' : ''}" 
            data-switch-tab="terminal"
          >
            🖥️ Live Terminal
          </button>
          <button 
            type="button" 
            class="tab-btn ${activeTab === 'memory' ? 'active' : ''}" 
            data-switch-tab="memory"
          >
            🧠 Memory Visualizer
          </button>
          <button 
            type="button" 
            class="tab-btn ${activeTab === 'challenge' ? 'active' : ''}" 
            data-switch-tab="challenge"
          >
            🎯 Mini-Challenge
          </button>
        </div>

        <div class="visualizer-tab-body">
          <!-- TAB 1: LIVE TERMINAL CONSOLE -->
          <div class="tab-content-panel ${activeTab === 'terminal' ? 'active' : ''}" id="tabTerminalPanel">
            <div class="terminal-chrome">
              <div class="terminal-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <span class="terminal-title">bash • g++ -std=c++17 • ~/playbook/${escapeHtml(playbook.id)}</span>
              <div class="terminal-actions">
                <button type="button" class="btn-term-ctrl" id="clearTerminalBtn" title="Xóa màn hình Terminal">🧹 Xóa</button>
              </div>
            </div>

            <div class="terminal-screen" id="terminalScreenBody">
              <div class="term-command-line">
                <span class="term-prompt">uit-learner@sanctuary:~$</span>
                <span class="term-cmd">g++ -std=c++17 -O2 ${escapeHtml(playbook.sourceFilename || playbook.id)} -o run.out &amp;&amp; ./run.out</span>
              </div>

              <div class="term-output-stream" id="termOutputStream">
                ${(playbook.terminalOutput || []).map(block => `
                  <div class="term-block-card" style="border-left-color: ${block.color || 'var(--accent-primary)'};">
                    <div class="term-block-title" style="color: ${block.color || 'var(--accent-primary)'};">
                      === ${escapeHtml(block.title)} ===
                    </div>
                    <div class="term-block-lines">
                      ${block.lines.map(line => `
                        <div class="term-line">${escapeHtml(line)}</div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- TAB 2: MEMORY & POINTER VISUALIZER -->
          <div class="tab-content-panel ${activeTab === 'memory' ? 'active' : ''}" id="tabMemoryPanel">
            <div class="memory-container">
              <div class="memory-model-header">
                <h4 class="mem-title">${escapeHtml(mem.title || 'Mô Hình Bộ Nhớ Stack vs Heap')}</h4>
                <p class="mem-subtitle">Trực quan hóa cấu trúc con trỏ, ô nhớ và tính liên tục bộ nhớ</p>
              </div>

              <!-- PHÂN VÙNG STACK FRAME -->
              <div class="memory-section">
                <div class="mem-section-title">
                  <span class="mem-badge-stack">STACK FRAME</span>
                  <span>(main function scope)</span>
                </div>
                <div class="mem-stack-table">
                  <div class="mem-table-header">
                    <span>Biến</span>
                    <span>Kiểu</span>
                    <span>Giá trị</span>
                    <span>Địa chỉ Stack</span>
                  </div>
                  ${(mem.stack || []).map(s => `
                    <div class="mem-stack-row">
                      <span class="mem-var-name">${escapeHtml(s.name)}</span>
                      <span class="mem-var-type">${escapeHtml(s.type)}</span>
                      <span class="mem-var-val ${s.value.includes('0x') ? 'pointer-highlight' : ''}">${escapeHtml(s.value)}</span>
                      <span class="mem-var-addr">${escapeHtml(s.address)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- CON TRỎ MŨI TÊN CHUYỂN TIẾP -->
              <div class="mem-arrow-divider">
                <span class="arrow-icon">⬇</span>
                <span class="arrow-text">Con trỏ matrix (int**) trỏ tới Heap Address: ${escapeHtml((mem.heapManagement && mem.heapManagement.address) || '0x55a100')}</span>
              </div>

              <!-- PHÂN VÙNG HEAP DYNAMIC ALLOCATION -->
              <div class="memory-section">
                <div class="mem-section-title">
                  <span class="mem-badge-heap">HEAP MEMORY</span>
                  <span>(Cấp phát động qua toán tử new)</span>
                </div>

                ${mem.heapManagement ? `
                  <div class="heap-mgmt-card">
                    <div class="heap-mgmt-title">
                      <strong>${escapeHtml(mem.heapManagement.blockName)}</strong>
                      <span class="heap-addr-tag">${escapeHtml(mem.heapManagement.address)}</span>
                    </div>
                    <div class="heap-pointers-grid">
                      ${(mem.heapManagement.pointers || []).map(p => `
                        <div class="pointer-node" data-target-row="${p.rowId}">
                          <span class="ptr-idx">${escapeHtml(p.index)}</span>
                          <span class="ptr-target">👉 ${escapeHtml(p.pointsTo)}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- CÁC KHỐI DỮ LIỆU HÀNG TRÊN HEAP -->
                <div class="heap-data-rows">
                  ${(mem.heapDataRows || []).map(row => `
                    <div class="heap-row-card" id="heap-row-${row.rowId}">
                      <div class="heap-row-header">
                        <span class="heap-row-label">${escapeHtml(row.label)}</span>
                        <span class="heap-row-addr">${escapeHtml(row.address)}</span>
                      </div>
                      <div class="heap-cells-grid">
                        ${row.cells.map(cell => `
                          <div class="heap-cell ${cell.isHighlight ? 'cell-highlighted' : ''}" title="${cell.tag || ''}">
                            <span class="cell-idx">${escapeHtml(cell.index)}</span>
                            <span class="cell-val">${escapeHtml(String(cell.val))}</span>
                            ${cell.tag ? `<span class="cell-tag">${escapeHtml(cell.tag)}</span>` : ''}
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              ${mem.comparisonInsight ? `
                <div class="mem-insight-box">
                  <div class="insight-title">💡 Góc Nhìn Kỹ Sư Hệ Thống (Architecture Insight):</div>
                  <p class="insight-desc">${escapeHtml(mem.comparisonInsight)}</p>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- TAB 3: MINI-CHALLENGE -->
          <div class="tab-content-panel ${activeTab === 'challenge' ? 'active' : ''}" id="tabChallengePanel">
            ${challenge ? `
              <div class="challenge-card">
                <div class="challenge-header">
                  <span class="ch-badge">${escapeHtml(challenge.difficulty || 'Mở rộng')}</span>
                  <h4 class="ch-title">${escapeHtml(challenge.title)}</h4>
                </div>

                <div class="ch-prompt-box">
                  <strong>Yêu cầu bài toán:</strong>
                  <p>${escapeHtml(challenge.prompt).replace(/\\n/g, '<br/>')}</p>
                </div>

                ${challenge.hints && challenge.hints.length ? `
                  <div class="ch-hints-box">
                    <strong>Gợi ý tư duy:</strong>
                    <ul>
                      ${challenge.hints.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <div class="ch-actions">
                  <button type="button" class="btn-studio btn-solution" id="toggleSolutionBtn">
                    👁️ Xem Gợi Ý Đáp Án
                  </button>
                  <button type="button" class="btn-studio-sm" id="applyChallengeSnippetBtn" title="Áp dụng điều kiện lọc vào trình soạn thảo">
                    ⚡ Áp dụng vào Code
                  </button>
                </div>

                <div class="solution-panel hidden" id="challengeSolutionBox">
                  <div class="solution-header">
                    <span>Mã Nguồn Tham Khảo</span>
                    <button type="button" class="btn-copy-sm" id="copySolutionBtn">Sao chép</button>
                  </div>
                  <pre class="solution-code"><code>${escapeHtml(challenge.solution)}</code></pre>
                </div>
              </div>
            ` : '<div class="nav-empty">Không có mini-challenge cho bài này.</div>'}
          </div>
        </div>

        <!-- KHỐI CHÚ THÍCH KỸ THUẬT QUAN TRỌNG (KEY TECHNICAL NOTES) -->
        <div class="technical-notes-card">
          <div class="notes-header">
            <span class="notes-icon">📌</span>
            <h4 class="notes-title">Chú Thích Kỹ Thuật Cần Nhớ</h4>
          </div>
          <ul class="notes-list">
            ${notes.map(note => `
              <li class="notes-item">
                <span class="bullet">▸</span>
                <span>${escapeHtml(note)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  // --- 8. PHÂN TÁCH GIAO DIỆN CHÍNH (3 CỘT ĐỒNG BỘ) ---
  function renderPlaybookStudioView(container) {
    if (!container) return;

    injectStudioStyles();
    const playbook = getCurrentPlaybook();

    container.innerHTML = `
      <div class="playbook-studio-workspace" id="playbookStudioRoot">
        <!-- TOP BANNER -->
        <header class="studio-header">
          <div class="studio-header-left">
            <div class="studio-breadcrumb">
              <span>Học Tập</span>
              <span class="sep">/</span>
              <span class="current">⚡ Code Playbook Studio</span>
            </div>
            <h1 class="studio-main-title">${escapeHtml(playbook.title)}</h1>
            <p class="studio-subtitle">${escapeHtml(playbook.description)}</p>
          </div>
          <div class="studio-header-right">
            <div class="studio-tag-group">
              <span class="tag-pill tag-primary">${escapeHtml(playbook.badge || 'C++17')}</span>
              <span class="tag-pill tag-secondary">${escapeHtml(playbook.category || 'DSA')}</span>
            </div>
          </div>
        </header>

        <!-- KHUNG 3 CỘT ĐỒNG BỘ -->
        <div class="studio-three-columns-layout">
          <!-- CỘT 1: FUNCTION NAVIGATOR (MỤC LỤC HÀM) -->
          <aside class="studio-col col-left" id="colFunctionNavigator" aria-label="Mục lục hàm Playbook">
            ${renderFunctionNavigatorHtml(playbook)}
          </aside>

          <!-- CỘT 2: INTERACTIVE CODE PLAYBOOK EDITOR -->
          <main class="studio-col col-middle" id="colCodeEditor" aria-label="Trình soạn thảo Playbook">
            ${renderCodeEditorHtml(playbook)}
          </main>

          <!-- CỘT 3: LIVE OUTPUT TERMINAL & MEMORY VISUALIZER -->
          <aside class="studio-col col-right" id="colLiveVisualizer" aria-label="Terminal và Memory Visualizer">
            ${renderRightColumnHtml(playbook)}
          </aside>
        </div>
      </div>
    `;

    bindStudioEvents(container);
  }

  // --- 9. GẮN SỰ KIỆN TƯƠNG TÁC (EVENT LISTENERS) ---
  function bindStudioEvents(container) {
    // 1. Tìm kiếm nhanh danh sách hàm
    const searchInput = document.getElementById("playbookNavSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", e => {
        studioState.filterOutlineKeyword = e.target.value;
        const playbook = getCurrentPlaybook();
        const colLeft = document.getElementById("colFunctionNavigator");
        if (colLeft) {
          colLeft.innerHTML = renderFunctionNavigatorHtml(playbook);
          bindNavigatorItemClicks();
        }
      });
    }

    // 2. Click vào từng hàm trong Function Navigator
    bindNavigatorItemClicks();

    // 3. Dropdown đổi Playbook
    const playbookSelector = document.getElementById("playbookSelector");
    if (playbookSelector) {
      playbookSelector.addEventListener("change", e => {
        studioState.activePlaybookId = e.target.value;
        studioState.activeFunctionId = null;
        studioToast(`Đã chuyển sang Playbook: ${e.target.value}`, "info");
        renderPlaybookStudioView(container);
      });
    }

    // 4. Nút Chạy Thử (Run Code Playbook) với hiệu ứng streaming
    const runBtn = document.getElementById("runPlaybookBtn");
    if (runBtn) {
      runBtn.addEventListener("click", () => {
        executePlaybookRun();
      });
    }

    // 5. Chuyển đổi ngôn ngữ C++ / Python / TS
    const langBtns = container.querySelectorAll("[data-switch-lang]");
    langBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetLang = btn.getAttribute("data-switch-lang");
        studioState.activeLanguage = targetLang;
        studioToast(`Đã chuyển sang hiển thị: ${targetLang.toUpperCase()}`, "info");
        renderPlaybookStudioView(container);
      });
    });

    // 6. Bật / Tắt so sánh Side-by-Side
    const sideBtn = document.getElementById("toggleSideBySideBtn");
    if (sideBtn) {
      sideBtn.addEventListener("click", () => {
        studioState.isSideBySide = !studioState.isSideBySide;
        studioToast(studioState.isSideBySide ? "Đã bật chế độ so sánh song song" : "Đã tắt chế độ so sánh song song", "info");
        renderPlaybookStudioView(container);
      });
    }

    // 7. Sao chép mã nguồn
    const copyBtn = document.getElementById("copyPlaybookCodeBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const playbook = getCurrentPlaybook();
        const code = studioState.userEditedCode[playbook.id] || playbook.languages[studioState.activeLanguage] || playbook.languages.cpp;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(() => {
            studioToast("✓ Đã sao chép toàn bộ mã nguồn vào Clipboard!", "success");
          }).catch(() => {
            studioToast("Lỗi khi sao chép mã nguồn.", "error");
          });
        }
      });
    }

    // 8. Khôi phục mã mặc định (Reset)
    const resetBtn = document.getElementById("resetPlaybookCodeBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const playbook = getCurrentPlaybook();
        delete studioState.userEditedCode[playbook.id];
        studioToast("Đã khôi phục mã nguồn về trạng thái nguyên bản.", "info");
        renderPlaybookStudioView(container);
      });
    }

    // 9. Chuyển Tab Cột Phải (Terminal / Memory / Challenge)
    const tabBtns = container.querySelectorAll("[data-switch-tab]");
    tabBtns.forEach(tBtn => {
      tBtn.addEventListener("click", () => {
        const targetTab = tBtn.getAttribute("data-switch-tab");
        studioState.activeRightTab = targetTab;
        tabBtns.forEach(b => b.classList.toggle("active", b === tBtn));
        const colRight = document.getElementById("colLiveVisualizer");
        const playbook = getCurrentPlaybook();
        if (colRight) {
          colRight.innerHTML = renderRightColumnHtml(playbook);
          bindRightColumnEvents();
        }
      });
    });

    bindRightColumnEvents();
  }

  // Gắn sự kiện click danh mục hàm Navigator
  function bindNavigatorItemClicks() {
    const navItems = document.querySelectorAll(".nav-item-card");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const fnId = item.getAttribute("data-fn-id");
        const startLine = parseInt(item.getAttribute("data-start-line"), 10);
        const endLine = parseInt(item.getAttribute("data-end-line"), 10);
        const mainCallStr = item.getAttribute("data-main-calls") || "";
        const mainCalls = mainCallStr ? mainCallStr.split(',').map(s => parseInt(s.trim(), 10)) : [];

        studioState.activeFunctionId = fnId;
        navItems.forEach(i => i.classList.toggle("active", i.getAttribute("data-fn-id") === fnId));

        highlightFunctionCode(startLine, endLine, mainCalls);
      });
    });
  }

  // Gắn sự kiện cột phải (Terminal clear, Solution toggle)
  function bindRightColumnEvents() {
    const clearBtn = document.getElementById("clearTerminalBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        const stream = document.getElementById("termOutputStream");
        if (stream) stream.innerHTML = `<div class="term-line" style="color:var(--text-muted); font-style:italic;">(Màn hình Terminal đã được làm sạch)</div>`;
        studioToast("Đã xóa màn hình Terminal.", "info");
      });
    }

    const solBtn = document.getElementById("toggleSolutionBtn");
    const solBox = document.getElementById("challengeSolutionBox");
    if (solBtn && solBox) {
      solBtn.addEventListener("click", () => {
        const isHidden = solBox.classList.toggle("hidden");
        solBtn.textContent = isHidden ? "👁️ Xem Gợi Ý Đáp Án" : "🙈 Ẩn Gợi Ý Đáp Án";
      });
    }

    const copySolBtn = document.getElementById("copySolutionBtn");
    if (copySolBtn) {
      copySolBtn.addEventListener("click", () => {
        const playbook = getCurrentPlaybook();
        const solCode = (playbook.miniChallenge && playbook.miniChallenge.solution) || "";
        if (navigator.clipboard) {
          navigator.clipboard.writeText(solCode).then(() => {
            studioToast("✓ Đã sao chép giải pháp gợi ý!", "success");
          });
        }
      });
    }

    const applySnippetBtn = document.getElementById("applyChallengeSnippetBtn");
    if (applySnippetBtn) {
      applySnippetBtn.addEventListener("click", () => {
        applyChallengeConditionToEditor();
      });
    }

    // Hover trên pointer node trong Memory Visualizer
    const ptrNodes = document.querySelectorAll(".pointer-node");
    ptrNodes.forEach(node => {
      node.addEventListener("mouseenter", () => {
        const rowId = node.getAttribute("data-target-row");
        const targetRow = document.getElementById(`heap-row-${rowId}`);
        if (targetRow) targetRow.classList.add("hover-focus");
      });
      node.addEventListener("mouseleave", () => {
        const rowId = node.getAttribute("data-target-row");
        const targetRow = document.getElementById(`heap-row-${rowId}`);
        if (targetRow) targetRow.classList.remove("hover-focus");
      });
    });
  }

  // --- 10. ĐỒNG BỘ: CUỘN MƯỢT, GLOW FUNCTION VÀ NHẤP NHÁY MAIN() CALLS ---
  function highlightFunctionCode(startLine, endLine, mainCalls) {
    if (!startLine) return;

    // Cuộn mượt tới dòng bắt đầu của hàm
    const targetLineEl = document.getElementById(`code-line-${startLine}`);
    const scrollContainer = document.getElementById("editorCodeScrollContainer");
    if (targetLineEl && scrollContainer) {
      targetLineEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Xóa các highlight cũ
    document.querySelectorAll(".code-line-row").forEach(el => {
      el.classList.remove("code-fn-highlight", "code-main-call-blink");
    });

    // Tô sáng khối code của hàm trong 2.2 giây
    for (let l = startLine; l <= endLine; l++) {
      const el = document.getElementById(`code-line-${l}`);
      if (el) el.classList.add("code-fn-highlight");
    }

    // Đồng thời nhấp nháy highlight dòng gọi hàm trong main()
    if (Array.isArray(mainCalls) && mainCalls.length > 0) {
      mainCalls.forEach(callLine => {
        const el = document.getElementById(`code-line-${callLine}`);
        if (el) {
          el.classList.add("code-main-call-blink");
        }
      });
      studioToast(`Đang highlight hàm (Dòng ${startLine}-${endLine}) và vị trí gọi tại main() (Dòng ${mainCalls.join(', ')})`, "info");
    } else {
      studioToast(`Đang highlight khối hàm (Dòng ${startLine}-${endLine})`, "info");
    }

    // Tự động gỡ highlight sau 2.2 giây
    setTimeout(() => {
      for (let l = startLine; l <= endLine; l++) {
        const el = document.getElementById(`code-line-${l}`);
        if (el) el.classList.remove("code-fn-highlight");
      }
      if (Array.isArray(mainCalls)) {
        mainCalls.forEach(callLine => {
          const el = document.getElementById(`code-line-${callLine}`);
          if (el) el.classList.remove("code-main-call-blink");
        });
      }
    }, 2400);
  }

  // --- 11. THỰC THI CHẠY THỬ VỚI HIỆU ỨNG STREAMING TERMINAL ---
  function executePlaybookRun() {
    const playbook = getCurrentPlaybook();
    const runBtn = document.getElementById("runPlaybookBtn");
    
    // Đổi trạng thái nút
    studioState.isRunning = true;
    if (runBtn) {
      runBtn.classList.add("running");
      runBtn.disabled = true;
      runBtn.querySelector(".btn-text").textContent = "Đang thực thi...";
    }

    // Chuyển Cột Phải sang Tab Terminal
    studioState.activeRightTab = "terminal";
    const colRight = document.getElementById("colLiveVisualizer");
    if (colRight) {
      colRight.innerHTML = renderRightColumnHtml(playbook);
      bindRightColumnEvents();
    }

    const outputStream = document.getElementById("termOutputStream");
    if (outputStream) {
      outputStream.innerHTML = `
        <div class="term-line" style="color:var(--status-info);"><span class="term-spinner">⠋</span> Đang biên dịch mã nguồn C++17 với GCC -O2...</div>
      `;
    }

    // Mô phỏng streaming tuần tự từng khối Terminal
    const blocks = playbook.terminalOutput || [];
    let currentBlockIdx = 0;

    function streamNextBlock() {
      if (currentBlockIdx >= blocks.length) {
        // Hoàn tất thực thi
        studioState.isRunning = false;
        if (runBtn) {
          runBtn.classList.remove("running");
          runBtn.disabled = false;
          runBtn.querySelector(".btn-text").textContent = "Chạy Thử (Run Code)";
        }
        if (outputStream) {
          const successTag = document.createElement("div");
          successTag.className = "term-line";
          successTag.style.color = "var(--status-success)";
          successTag.style.marginTop = "8px";
          successTag.textContent = "[Process exited with code 0 - Execution time: 4.8ms]";
          outputStream.appendChild(successTag);
          outputStream.scrollTop = outputStream.scrollHeight;
        }
        studioToast("✓ Đã thực thi xong Playbook hoàn toàn thành công!", "success");
        return;
      }

      const blk = blocks[currentBlockIdx];
      if (outputStream) {
        if (currentBlockIdx === 0) outputStream.innerHTML = '';

        const card = document.createElement("div");
        card.className = "term-block-card streaming-in";
        card.style.borderLeftColor = blk.color || 'var(--accent-primary)';
        card.innerHTML = `
          <div class="term-block-title" style="color: ${blk.color || 'var(--accent-primary)'};">
            === ${escapeHtml(blk.title)} ===
          </div>
          <div class="term-block-lines">
            ${blk.lines.map(line => `<div class="term-line">${escapeHtml(line)}</div>`).join('')}
          </div>
        `;
        outputStream.appendChild(card);
        outputStream.scrollTop = outputStream.scrollHeight;
      }

      currentBlockIdx++;
      setTimeout(streamNextBlock, 220); // 220ms giữa mỗi khối
    }

    setTimeout(streamNextBlock, 500);
  }

  // Áp dụng điều kiện của mini-challenge vào editor
  function applyChallengeConditionToEditor() {
    const playbook = getCurrentPlaybook();
    if (playbook.id === "mang2chieu.cpp") {
      studioToast("Đã gắn điều kiện: 'isPrime(a[i][j])' vào dòng lọc!", "success");
      // Highlight điểm neo
      const anchorEl = document.querySelector(".code-anchor-interactive");
      if (anchorEl) {
        anchorEl.scrollIntoView({ behavior: "smooth", block: "center" });
        anchorEl.classList.add("code-main-call-blink");
        setTimeout(() => anchorEl.classList.remove("code-main-call-blink"), 3000);
      }
    }
  }

  // --- 12. CSS SCOPED RIÊNG CHO PLAYBOOK STUDIO ---
  function injectStudioStyles() {
    if (document.getElementById("playbook-studio-styles")) return;

    const styleEl = document.createElement("style");
    styleEl.id = "playbook-studio-styles";
    styleEl.textContent = `
      /* ==========================================================================
         PLAYBOOK STUDIO DESIGN SYSTEM - 3 COLUMNS SYNCHRONIZED LAYOUT
         Kế thừa hoàn hảo theme Warm Skin / Matcha / Rose / Espresso của Sanctuary
         ========================================================================== */

      .playbook-studio-workspace {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        max-width: 1680px;
        margin: 0 auto;
        padding: 4px 8px 32px 8px;
        box-sizing: border-box;
      }

      /* TOP BANNER */
      .studio-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
        background: var(--bg-surface);
        padding: 16px 22px;
        border-radius: 14px;
        border: 1px solid var(--border-subtle);
        box-shadow: var(--shadow-soft);
      }
      .studio-breadcrumb {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--text-muted);
        margin-bottom: 4px;
        font-weight: 500;
      }
      .studio-breadcrumb .current {
        color: var(--accent-primary);
        font-weight: 600;
      }
      .studio-main-title {
        margin: 0 0 4px 0;
        font-size: 20px;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: -0.3px;
      }
      .studio-subtitle {
        margin: 0;
        font-size: 13px;
        color: var(--text-secondary);
        max-width: 860px;
        line-height: 1.45;
      }
      .studio-tag-group {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .tag-pill {
        font-size: 11.5px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 999px;
      }
      .tag-primary {
        background: var(--accent-primary-bg);
        color: var(--accent-primary);
        border: 1px solid rgba(196, 116, 87, 0.25);
      }
      .tag-secondary {
        background: var(--status-success-bg);
        color: var(--status-success);
        border: 1px solid rgba(63, 122, 92, 0.25);
      }

      /* 3 COLUMNS GRID LAYOUT */
      .studio-three-columns-layout {
        display: grid;
        grid-template-columns: 290px minmax(480px, 1fr) 390px;
        gap: 16px;
        align-items: stretch;
      }

      @media (max-width: 1280px) {
        .studio-three-columns-layout {
          grid-template-columns: 260px 1fr 340px;
          gap: 12px;
        }
      }

      @media (max-width: 1040px) {
        .studio-three-columns-layout {
          grid-template-columns: 1fr;
        }
      }

      .studio-col {
        display: flex;
        flex-direction: column;
        min-height: 720px;
      }

      /* ==========================================================================
         CỘT 1: FUNCTION NAVIGATOR
         ========================================================================== */
      .navigator-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 14px;
        box-shadow: var(--shadow-soft);
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
      }
      .navigator-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 16px;
        border-bottom: 1px solid var(--border-subtle);
        background: var(--bg-elevated);
      }
      .nav-title-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .nav-icon {
        font-size: 18px;
      }
      .nav-title {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        color: var(--text-primary);
      }
      .nav-sub {
        margin: 0;
        font-size: 11px;
        color: var(--text-muted);
      }
      .nav-pill-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 6px;
        background: var(--accent-primary-bg);
        color: var(--accent-primary);
      }

      .nav-search-box {
        padding: 10px 14px;
        border-bottom: 1px solid var(--border-subtle);
      }
      .nav-search-input {
        width: 100%;
        box-sizing: border-box;
        padding: 7px 12px;
        border-radius: 8px;
        border: 1px solid var(--border-strong);
        background: var(--bg-canvas);
        color: var(--text-primary);
        font-size: 12.5px;
        outline: none;
        transition: border-color 0.15s ease;
      }
      .nav-search-input:focus {
        border-color: var(--accent-primary);
        box-shadow: var(--focus-ring);
      }

      .nav-list {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .nav-empty {
        padding: 24px 12px;
        text-align: center;
        font-size: 12.5px;
        color: var(--text-muted);
      }

      .nav-item-card {
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--border-subtle);
        background: var(--bg-canvas);
        cursor: pointer;
        transition: all 0.18s ease;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .nav-item-card:hover {
        background: var(--bg-elevated);
        border-color: var(--accent-primary);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      }
      .nav-item-card.active {
        border-color: var(--accent-primary);
        background: var(--accent-primary-bg);
        box-shadow: 0 0 0 2px var(--accent-primary);
      }
      .nav-item-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
      }
      .nav-fn-name {
        font-size: 13px;
        font-weight: 700;
        color: var(--text-primary);
        font-family: 'JetBrains Mono', Consolas, monospace;
      }
      .nav-type-badge {
        font-size: 10.5px;
        font-weight: 600;
        padding: 2px 7px;
        border-radius: 5px;
        white-space: nowrap;
      }
      .badge-info { background: var(--status-info-bg); color: var(--status-info); }
      .badge-success { background: var(--status-success-bg); color: var(--status-success); }
      .badge-warning { background: var(--status-warning-bg); color: var(--status-warning); }
      .badge-danger { background: var(--status-danger-bg); color: var(--status-danger); }
      .badge-primary { background: var(--accent-primary-bg); color: var(--accent-primary); }

      .nav-item-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
      }
      .nav-line-range {
        color: var(--text-muted);
        font-family: monospace;
      }
      .nav-call-badge {
        font-size: 10.5px;
        font-weight: 600;
        color: var(--status-warning);
        background: var(--status-warning-bg);
        padding: 1px 6px;
        border-radius: 4px;
      }
      .nav-fn-desc {
        margin: 2px 0 0 0;
        font-size: 11.5px;
        color: var(--text-secondary);
        line-height: 1.35;
      }

      /* ==========================================================================
         CỘT 2: CODE PLAYBOOK EDITOR
         ========================================================================== */
      .editor-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 14px;
        box-shadow: var(--shadow-soft);
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
      }

      /* TOOLBAR */
      .editor-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px 14px;
        background: var(--bg-elevated);
        border-bottom: 1px solid var(--border-subtle);
      }
      .toolbar-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .toolbar-label {
        font-size: 12.5px;
        font-weight: 600;
        color: var(--text-secondary);
      }
      .playbook-dropdown {
        padding: 6px 12px;
        border-radius: 8px;
        border: 1px solid var(--border-strong);
        background: var(--bg-surface);
        color: var(--text-primary);
        font-size: 12.5px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
      }
      .playbook-dropdown:focus {
        border-color: var(--accent-primary);
      }

      .toolbar-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .btn-studio {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 12.5px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: all 0.16s ease;
      }
      .btn-run {
        background: var(--accent-primary);
        color: var(--accent-primary-fg, #ffffff);
        box-shadow: var(--shadow-pill);
      }
      .btn-run:hover:not(:disabled) {
        background: var(--accent-primary-hover);
        transform: translateY(-1px);
      }
      .btn-run.running {
        opacity: 0.85;
        cursor: wait;
      }

      .lang-switch-group {
        display: inline-flex;
        border: 1px solid var(--border-strong);
        border-radius: 7px;
        overflow: hidden;
      }
      .btn-studio-sm {
        background: var(--bg-surface);
        border: none;
        padding: 5px 10px;
        font-size: 11.5px;
        font-weight: 600;
        color: var(--text-secondary);
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .btn-studio-sm.active {
        background: var(--accent-primary);
        color: #ffffff;
      }
      .btn-studio-sm:not(.active):hover {
        background: var(--bg-subtle);
      }

      .btn-studio-icon {
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: 7px;
        padding: 5px 10px;
        font-size: 11.5px;
        font-weight: 600;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .btn-studio-icon:hover {
        background: var(--bg-subtle);
        color: var(--text-primary);
      }
      .btn-studio-icon.active {
        background: var(--accent-primary-bg);
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }

      /* SPLIT EDITOR & PANES */
      .editor-split-wrapper {
        display: flex;
        flex: 1;
        overflow: hidden;
      }
      .editor-main-pane {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .editor-side-pane {
        width: 48%;
        border-left: 1px solid var(--border-subtle);
        background: var(--bg-canvas);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .editor-side-header {
        padding: 8px 14px;
        background: var(--bg-elevated);
        border-bottom: 1px solid var(--border-subtle);
        font-size: 11.5px;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--text-secondary);
      }
      .pill-badge-outline {
        border: 1px solid var(--border-strong);
        padding: 2px 7px;
        border-radius: 999px;
        font-size: 10.5px;
      }

      .editor-pane-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 14px;
        background: var(--bg-subtle);
        border-bottom: 1px solid var(--border-subtle);
        font-size: 11.5px;
        color: var(--text-muted);
      }
      .code-filename-pill {
        font-weight: 600;
        color: var(--text-primary);
        font-family: monospace;
      }

      .editor-code-container {
        flex: 1;
        overflow: auto;
        background: #191614; /* Dark Velvety Charcoal */
        color: #e6dfd8;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
        font-size: 12.8px;
        line-height: 1.6;
        padding: 12px 0;
      }
      .code-lines-wrapper {
        display: flex;
        flex-direction: column;
        min-width: 100%;
      }

      .code-line-row {
        display: flex;
        align-items: center;
        padding: 1px 12px;
        min-height: 22px;
        position: relative;
        transition: background 0.18s ease;
      }
      .code-line-row:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      .code-line-num {
        width: 38px;
        min-width: 38px;
        color: #7d7065;
        text-align: right;
        padding-right: 14px;
        user-select: none;
        font-size: 11.5px;
      }
      .code-line-text {
        white-space: pre;
        flex: 1;
      }

      /* TÔ SÁNG GLOW HÀM & BLINK MAIN CALL */
      @keyframes fnGlowPulse {
        0% { background-color: rgba(196, 116, 87, 0.35); box-shadow: inset 3px 0 0 var(--accent-primary); }
        50% { background-color: rgba(196, 116, 87, 0.20); }
        100% { background-color: transparent; }
      }
      .code-fn-highlight {
        animation: fnGlowPulse 2.4s ease-out forwards;
        border-left: 3px solid var(--accent-primary) !important;
      }

      @keyframes mainCallBlink {
        0%, 100% { background-color: transparent; }
        20%, 60% { background-color: rgba(184, 115, 42, 0.40); box-shadow: inset 3px 0 0 #f59e0b; }
        40%, 80% { background-color: rgba(184, 115, 42, 0.15); }
      }
      .code-main-call-blink {
        animation: mainCallBlink 2.6s ease-in-out forwards;
        border-left: 3px solid #f59e0b !important;
      }

      /* ĐIỂM NEO THỰC HÀNH // Thay điều kiện & // Lưu ý: */
      .code-anchor-interactive {
        background: rgba(184, 115, 42, 0.18) !important;
        border-left: 3px solid #f59e0b !important;
      }
      .code-anchor-note {
        background: rgba(77, 114, 143, 0.18) !important;
        border-left: 3px solid #38bdf8 !important;
      }
      .anchor-badge {
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 999px;
        pointer-events: none;
        letter-spacing: 0.4px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      }
      .anchor-condition {
        background: #f59e0b;
        color: #1a1202;
      }
      .anchor-warning {
        background: #0284c7;
        color: #ffffff;
      }

      /* SYNTAX HIGHLIGHTING COLORS */
      .syn-comment { color: #8c827a; font-style: italic; }
      .syn-keyword { color: #e06c75; font-weight: 600; }
      .syn-type { color: #e5c07b; }
      .syn-string { color: #98c379; }
      .syn-number { color: #d19a66; }
      .syn-preprocessor { color: #c678dd; }
      .syn-std { color: #61afef; }

      /* ==========================================================================
         CỘT 3: LIVE TERMINAL & MEMORY VISUALIZER
         ========================================================================== */
      .live-visualizer-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 14px;
        box-shadow: var(--shadow-soft);
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
      }

      /* TABS BAR */
      .visualizer-tabs-bar {
        display: flex;
        background: var(--bg-elevated);
        border-bottom: 1px solid var(--border-subtle);
        padding: 4px 6px 0 6px;
        gap: 4px;
      }
      .tab-btn {
        flex: 1;
        padding: 8px 6px;
        border: none;
        background: transparent;
        font-size: 11.8px;
        font-weight: 600;
        color: var(--text-secondary);
        border-radius: 8px 8px 0 0;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: center;
        border-bottom: 2px solid transparent;
      }
      .tab-btn:hover {
        background: var(--bg-subtle);
        color: var(--text-primary);
      }
      .tab-btn.active {
        background: var(--bg-surface);
        color: var(--accent-primary);
        border-bottom: 2px solid var(--accent-primary);
      }

      .visualizer-tab-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
      }
      .tab-content-panel {
        display: none;
        flex-direction: column;
        height: 100%;
      }
      .tab-content-panel.active {
        display: flex;
      }

      /* TERMINAL CONSOLE */
      .terminal-chrome {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1e1b18;
        padding: 8px 12px;
        border-bottom: 1px solid #302b26;
      }
      .terminal-dots {
        display: flex;
        gap: 6px;
      }
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .dot-red { background: #ff5f56; }
      .dot-yellow { background: #ffbd2e; }
      .dot-green { background: #27c93f; }
      .terminal-title {
        font-size: 11px;
        color: #9c8e82;
        font-family: monospace;
      }
      .btn-term-ctrl {
        background: #2a2520;
        color: #c4b5a5;
        border: 1px solid #423b34;
        border-radius: 4px;
        font-size: 10.5px;
        padding: 2px 8px;
        cursor: pointer;
      }
      .btn-term-ctrl:hover {
        background: #38312b;
      }

      .terminal-screen {
        flex: 1;
        background: #14110f;
        color: #f0ebe4;
        font-family: 'JetBrains Mono', Consolas, monospace;
        font-size: 12px;
        line-height: 1.5;
        padding: 12px 14px;
        overflow-y: auto;
        min-height: 380px;
      }
      .term-command-line {
        display: flex;
        gap: 8px;
        margin-bottom: 10px;
        font-size: 11.5px;
      }
      .term-prompt {
        color: #22c55e;
        font-weight: 700;
      }
      .term-cmd {
        color: #e2e8f0;
      }

      .term-output-stream {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .term-block-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-left: 3px solid var(--accent-primary);
        border-radius: 6px;
        padding: 8px 10px;
      }
      .term-block-card.streaming-in {
        animation: fadeIn 0.25s ease-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .term-block-title {
        font-size: 11px;
        font-weight: 700;
        margin-bottom: 4px;
        letter-spacing: 0.3px;
      }
      .term-line {
        font-size: 11.5px;
        color: #d1c7bc;
        white-space: pre-wrap;
      }

      /* MEMORY VISUALIZER TAB */
      .memory-container {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .memory-model-header {
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: 8px;
      }
      .mem-title {
        margin: 0 0 2px 0;
        font-size: 13.5px;
        font-weight: 700;
        color: var(--text-primary);
      }
      .mem-subtitle {
        margin: 0;
        font-size: 11.5px;
        color: var(--text-muted);
      }

      .memory-section {
        background: var(--bg-canvas);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .mem-section-title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 700;
        color: var(--text-secondary);
      }
      .mem-badge-stack {
        background: #3b82f6;
        color: #ffffff;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
      }
      .mem-badge-heap {
        background: #10b981;
        color: #ffffff;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
      }

      .mem-stack-table {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--border-strong);
        border-radius: 6px;
        overflow: hidden;
        font-size: 11.5px;
      }
      .mem-table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: 5px 8px;
        background: var(--bg-elevated);
        font-weight: 700;
        color: var(--text-secondary);
        font-size: 10.5px;
      }
      .mem-stack-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: 5px 8px;
        border-top: 1px solid var(--border-subtle);
        font-family: monospace;
      }
      .mem-var-name { font-weight: 700; color: var(--text-primary); }
      .mem-var-type { color: var(--status-info); }
      .mem-var-val { color: var(--text-secondary); }
      .pointer-highlight { color: #f59e0b; font-weight: 700; }
      .mem-var-addr { color: var(--text-muted); font-size: 10.5px; }

      .mem-arrow-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-size: 11px;
        color: var(--accent-primary);
        font-weight: 600;
        padding: 2px 0;
      }

      .heap-mgmt-card {
        border: 1px dashed var(--accent-primary);
        border-radius: 8px;
        padding: 8px 10px;
        background: var(--accent-primary-bg);
      }
      .heap-mgmt-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        margin-bottom: 6px;
      }
      .heap-addr-tag {
        font-family: monospace;
        font-size: 10.5px;
        background: rgba(0,0,0,0.06);
        padding: 1px 5px;
        border-radius: 4px;
      }
      .heap-pointers-grid {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .pointer-node {
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: 6px;
        padding: 3px 8px;
        font-size: 11px;
        display: flex;
        gap: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .pointer-node:hover {
        border-color: var(--accent-primary);
        background: var(--bg-elevated);
      }
      .ptr-idx { font-weight: 700; color: var(--text-primary); }
      .ptr-target { color: var(--accent-primary); font-family: monospace; }

      .heap-data-rows {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .heap-row-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-strong);
        border-radius: 8px;
        padding: 6px 10px;
        transition: all 0.2s ease;
      }
      .heap-row-card.hover-focus {
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 2px var(--accent-primary);
      }
      .heap-row-header {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 4px;
        color: var(--text-secondary);
      }
      .heap-cells-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
      }
      .heap-cell {
        background: var(--bg-canvas);
        border: 1px solid var(--border-subtle);
        border-radius: 6px;
        padding: 4px 6px;
        text-align: center;
        display: flex;
        flex-direction: column;
        font-family: monospace;
      }
      .heap-cell.cell-highlighted {
        background: var(--status-success-bg);
        border-color: var(--status-success);
      }
      .cell-idx { font-size: 9.5px; color: var(--text-muted); }
      .cell-val { font-size: 12px; font-weight: 700; color: var(--text-primary); }
      .cell-tag { font-size: 9px; color: var(--status-success); margin-top: 1px; }

      .mem-insight-box {
        background: var(--status-info-bg);
        border-left: 3px solid var(--status-info);
        border-radius: 6px;
        padding: 8px 10px;
        font-size: 11.5px;
      }
      .insight-title {
        font-weight: 700;
        color: var(--status-info);
        margin-bottom: 2px;
      }
      .insight-desc {
        margin: 0;
        color: var(--text-secondary);
        line-height: 1.4;
      }

      /* MINI CHALLENGE TAB */
      .challenge-card {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .challenge-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .ch-badge {
        align-self: flex-start;
        font-size: 10px;
        font-weight: 700;
        background: var(--status-warning-bg);
        color: var(--status-warning);
        padding: 2px 8px;
        border-radius: 999px;
      }
      .ch-title {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        color: var(--text-primary);
      }
      .ch-prompt-box {
        background: var(--bg-canvas);
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
        padding: 10px;
        font-size: 12.5px;
        line-height: 1.45;
        color: var(--text-primary);
      }
      .ch-hints-box {
        font-size: 12px;
        color: var(--text-secondary);
      }
      .ch-hints-box ul {
        margin: 4px 0 0 0;
        padding-left: 18px;
      }
      .ch-actions {
        display: flex;
        gap: 8px;
      }
      .btn-solution {
        background: var(--status-info);
        color: #ffffff;
      }
      .solution-panel {
        background: #1a1614;
        border: 1px solid #3d342c;
        border-radius: 8px;
        overflow: hidden;
      }
      .solution-panel.hidden {
        display: none;
      }
      .solution-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #28211b;
        padding: 6px 12px;
        font-size: 11px;
        font-weight: 600;
        color: #c9bcaf;
      }
      .btn-copy-sm {
        background: #3b322a;
        color: #d8cdbf;
        border: none;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 10.5px;
        cursor: pointer;
      }
      .solution-code {
        margin: 0;
        padding: 10px 12px;
        font-family: monospace;
        font-size: 11.5px;
        color: #98c379;
        overflow-x: auto;
        line-height: 1.45;
      }

      /* KEY TECHNICAL NOTES */
      .technical-notes-card {
        border-top: 1px solid var(--border-subtle);
        background: var(--bg-elevated);
        padding: 12px 14px;
      }
      .notes-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 6px;
      }
      .notes-icon { font-size: 14px; }
      .notes-title {
        margin: 0;
        font-size: 12.5px;
        font-weight: 700;
        color: var(--text-primary);
      }
      .notes-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .notes-item {
        font-size: 11.5px;
        color: var(--text-secondary);
        line-height: 1.4;
        display: flex;
        gap: 6px;
      }
      .notes-item .bullet {
        color: var(--accent-primary);
        font-weight: 700;
      }

      /* TOAST NOTIFICATION */
      .playbook-toast {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #1e1b18;
        color: #ffffff;
        padding: 10px 18px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        opacity: 0;
        transform: translateY(12px);
        transition: all 0.22s ease;
        z-index: 99999;
        pointer-events: none;
        border-left: 4px solid var(--accent-primary);
      }
      .playbook-toast.show {
        opacity: 1;
        transform: translateY(0);
      }
      .playbook-toast.success { border-left-color: #22c55e; }
      .playbook-toast.error { border-left-color: #ef4444; }
      .playbook-toast.info { border-left-color: #3b82f6; }
    `;

    document.head.appendChild(styleEl);
  }

  // --- 13. EXPORT RA TOÀN CỤC WINDOW ---
  window.renderPlaybookStudioView = renderPlaybookStudioView;
  window.selectPlaybook = function(playbookId) {
    studioState.activePlaybookId = playbookId;
    studioState.activeFunctionId = null;
    const root = document.getElementById("main-workspace") || document.getElementById("playbookStudioRoot");
    if (root) renderPlaybookStudioView(root);
  };
  window.runPlaybookCode = executePlaybookRun;
  window.switchPlaybookLanguage = function(lang) {
    studioState.activeLanguage = lang;
    const root = document.getElementById("main-workspace") || document.getElementById("playbookStudioRoot");
    if (root) renderPlaybookStudioView(root);
  };
  window.scrollToFunction = function(fnId) {
    const playbook = getCurrentPlaybook();
    const fn = (playbook.functionOutline || []).find(f => f.id === fnId);
    if (fn) highlightFunctionCode(fn.startLine, fn.endLine, fn.mainCallLines || []);
  };

  console.log("⚡ [PlaybookStudio] Module 'module_playbook_studio.js' loaded successfully.");

})(window, document);
