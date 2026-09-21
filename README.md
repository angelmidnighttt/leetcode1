# LeetCode bằng JavaScript / Node.js

89 bài từ dễ đến khó, **mỗi bài một file tự chạy được**, gồm: đề bài tiếng Việt,
ý tưởng, độ phức tạp, lời giải có chú thích và bộ test sẵn.

```
30 bài Easy  |  44 bài Medium  |  15 bài Hard  |  500 assertions, tất cả xanh
```

## Bắt đầu

Không cần cài gì cả (chỉ cần Node >= 16, bạn đang dùng v24).

```bash
node src/01-easy/0001-two-sum.js     # chạy 1 bài
npm test                             # chạy tất cả
npm test -- 01-easy                  # chạy 1 nhóm
npm test -- 0020                     # chạy 1 bài theo số hiệu
npm run list                         # xem danh sách toàn bộ bài
```

## Cách luyện

Đọc lời giải rồi gật gù là **không học được gì**. Quy trình nên theo:

1. Mở file bài, đọc phần **Đề bài** và **Ý tưởng** — rồi dừng lại, đừng đọc code.
2. Sinh bản đề trống để tự code:

   ```bash
   npm run practice -- 0001
   ```

   File `practice/0001-two-sum.js` sẽ có khung hàm rỗng và **giữ nguyên bộ test**.
3. Tự viết lời giải, chạy `node practice/0001-two-sum.js` cho tới khi PASS.
4. Mở file gốc trong `src/` so sánh với cách của mình.
5. Vài ngày sau làm lại bài đó từ đầu. Nhớ được lần hai mới là thật sự hiểu.

Mỗi file có cặp mốc `// >>> SOLUTION` và `// <<< SOLUTION` — đó là phần mà script
`practice` thay bằng khung rỗng.

## Cấu trúc

```
src/01-easy/      30 bài
src/02-medium/    44 bài
src/03-hard/      15 bài
lib/test.js       test runner nhỏ gọn (test + suite)
lib/ds.js         ListNode, TreeNode và hàm dựng/đọc từ mảng
practice/         nơi bạn tự code, sinh bằng npm run practice
scripts/          run-all, practice, list
```

Bài về linked list / cây nhị phân dùng chung `lib/ds.js` nên bạn viết test bằng
mảng thường (`[1,2,3]` hoặc `[3,9,20,null,null,15,7]` đúng định dạng LeetCode)
thay vì phải dựng node bằng tay.

---

## Lộ trình gợi ý

Làm **theo kỹ thuật, không theo số thứ tự**. Mỗi nhóm dưới đây dạy một mẫu tư duy;
làm hết một nhóm rồi mới sang nhóm sau thì các bài sau sẽ nhẹ đi rất nhiều.

### Giai đoạn 1 — Nền tảng (30 bài Easy)

| Kỹ thuật | Bài |
|---|---|
| Hash map / đếm tần suất | 1, 217, 242, 383, 169, 268, 136 |
| Hai con trỏ | 125, 344, 283, 26, 88, 392 |
| Xử lý chuỗi | 13, 14, 9 |
| Stack | 20 |
| Tìm kiếm nhị phân | 704 |
| Linked list | 206, 21, 141 |
| Cây nhị phân (DFS đệ quy) | 104, 100, 226, 110, 543, 572, 235 |
| DP nhập môn | 70, 121 |

> Ba bài phải thuộc nằm lòng vì được dùng lại khắp nơi: **206** (đảo linked list),
> **141** (rùa và thỏ), **704** (binary search).

### Giai đoạn 2 — Kỹ thuật chính (44 bài Medium)

| Kỹ thuật | Bài |
|---|---|
| Cửa sổ trượt | 3, 424 |
| Hai con trỏ nâng cao | 11, 15 |
| Mảng & hash nâng cao | 49, 238, 128, 347 |
| Ma trận | 48, 54, 73 |
| Tìm kiếm nhị phân | 33 |
| Stack đơn điệu | 155, 739 |
| Linked list | 19, 143 |
| Cây nhị phân | 98, 102 |
| Quay lui (backtracking) | 17, 78, 39, 46, 79 |
| Đồ thị (DFS/BFS/tô-pô) | 200, 133, 207, 417 |
| DP 1 chiều | 53, 55, 62, 91, 139, 152, 198, 300, 322 |
| DP 2 chiều | 1143 |
| Khoảng (intervals) | 56, 435 |
| Thiết kế cấu trúc | 146, 155, 208 |
| Nở từ tâm / chia để trị | 5, 647, 215 |

> Thứ tự trong cột "Bài" đã sắp theo độ khó tăng dần trong từng nhóm — cứ làm từ trái sang.

### Giai đoạn 3 — Hard (15 bài)

Chỉ nên vào khi đã qua Giai đoạn 2. Hầu hết bài Hard là **ghép 2–3 kỹ thuật Medium**
đã học, chứ không phải thuật toán mới.

| Nền tảng cần có trước | Bài Hard |
|---|---|
| Stack đơn điệu (739) | 42, 84, 239 |
| Cửa sổ trượt (3, 424) | 76 |
| Linked list (206, 21) | 23, 25 |
| Cây (543, 297 cần 102) | 124, 297 |
| Quay lui (46, 79) + Trie (208) | 51, 212 |
| DP 2 chiều (1143) | 72, 10 |
| Binary search (33) | 4 |
| Heap (tự cài) | 295 |
| DFS + ghi nhớ (417) | 329 |

## Bảng tra nhanh độ phức tạp

Nhìn ràng buộc `n` trong đề là đoán được lời giải mong đợi:

| n tối đa | Độ phức tạp cần đạt | Hướng đi thường gặp |
|---|---|---|
| ≤ 12 | O(n!) | Sinh hoán vị |
| ≤ 20 | O(2^n) | Quay lui, DP bitmask |
| ≤ 500 | O(n^3) | DP 3 vòng lặp |
| ≤ 5.000 | O(n^2) | DP 2 chiều, nở từ tâm |
| ≤ 10^6 | O(n log n) | Sắp xếp, heap, binary search |
| ≤ 10^8 | O(n) hoặc O(log n) | Hai con trỏ, cửa sổ trượt, hash, tham lam |

## Ghi chú khi viết JS trên LeetCode

- `array.shift()` là **O(n)**, không phải O(1). Với BFS dữ liệu lớn hãy dùng con trỏ
  `head` như trong bài 102, 200, 239.
- `Map` **giữ nguyên thứ tự chèn** — đó là lý do bài 146 (LRU Cache) làm được O(1)
  mà không cần tự cài danh sách liên kết đôi.
- JS không có heap sẵn. Lớp `Heap` dùng lại được nằm trong `src/03-hard/0295-*.js`.
- `sort()` mặc định so sánh theo **chuỗi**: `[10, 9].sort()` ra `[10, 9]`.
  Luôn viết `sort((a, b) => a - b)` với số.
- JS phân biệt `0` và `-0` khi dùng `deepStrictEqual` (gặp ở bài 238).
- Số nguyên vượt `2^53` sẽ mất chính xác; dùng `BigInt` nếu đề cần.
