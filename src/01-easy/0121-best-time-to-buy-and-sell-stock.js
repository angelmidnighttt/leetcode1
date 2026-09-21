'use strict';
/**
 * 121. Best Time to Buy and Sell Stock - Easy
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 *
 * Đề bài: prices[i] là giá cổ phiếu ngày i. Chọn 1 ngày mua và 1 ngày BÁN SAU ĐÓ
 * để lãi lớn nhất. Không lãi được thì trả 0.
 *
 * Ý tưởng: Duyệt một lượt, luôn nhớ giá thấp nhất đã gặp. Tại mỗi ngày, lãi nếu
 * bán hôm nay = giá hôm nay - giá thấp nhất trước đó. Lấy max của các giá trị đó.
 * (Đây cũng chính là bài toán "hiệu lớn nhất với chỉ số sau trừ chỉ số trước".)
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else if (price - minPrice > best) best = price - minPrice;
  }

  return best;
}
// <<< SOLUTION

test('121. Best Time to Buy and Sell Stock', maxProfit, [
  [[[7, 1, 5, 3, 6, 4]], 5],
  [[[7, 6, 4, 3, 1]], 0],
  [[[1, 2]], 1],
  [[[2]], 0],
  [[[]], 0],
  [[[3, 2, 6, 5, 0, 3]], 4],
]);

module.exports = { maxProfit };
