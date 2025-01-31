const betterLuckNextTime = Number(
  import.meta.env.VITE_APP_BETTER_LUCK_NEXT_TIME
);
const tenK = Number(import.meta.env.VITE_APP_10K);
const twentyK = Number(import.meta.env.VITE_APP_20K);
const fiftyK = Number(import.meta.env.VITE_APP_50K);
const oneHundredK = Number(import.meta.env.VITE_APP_100K);
const twoHundredK = Number(import.meta.env.VITE_APP_200K);
const fiveK = Number(import.meta.env.VITE_APP_5K);
const fiveHundredK = Number(import.meta.env.VITE_APP_500K);

const PRIZES = [
  {
    minDeg: 0,
    maxDeg: 45,
    percent: fiveK,
    result: "Waoooo! Bạn đã trúng 5.000vnđ 🎉",
    description:
      "Một khởi đầu may mắn! Năm nay chắc chắn sẽ có nhiều điều bất ngờ 🥳",
  },
  {
    minDeg: 46,
    maxDeg: 90,
    percent: oneHundredK,
    result: "Waoooo! Bạn đã trúng 100.000vnđ 🎉",
    description: "Không thể tin được! Số bạn năm nay chắc hẳn rất tốt 🥰",
  },
  {
    minDeg: 91,
    maxDeg: 135,
    percent: tenK,
    result: "Waoooo! Bạn đã trúng 10.000vnđ 🎉",
    description:
      "Tuy là quà nhỏ nhất nhưng nó mang ý nghĩa tấm lòng nhiều nhất ❤️",
  },
  {
    minDeg: 136,
    maxDeg: 180,
    percent: twoHundredK,
    result: "Waoooo! Bạn đã trúng 200.000vnđ 🎉",
    description: "Không còn gì để nói! Năm nay chắc chắn là dành cho bạn ✨",
  },
  {
    minDeg: 181,
    maxDeg: 225,
    percent: twentyK,
    result: "Waoooo! Bạn đã trúng 20.000vnđ 🎉",
    description:
      "Có vẻ như hôm nay là ngày may mắn của bạn, chắc hẳn cả năm cũng sẽ may mắn như vậy rồi 😊",
  },
  {
    minDeg: 226,
    maxDeg: 270,
    percent: fiftyK,
    result: "Waoooo! Bạn đã trúng 50.000vnđ 🎉",
    description: "Bạn rất chi là may mắn luôn! Cả năm phát tài rồi đó 🤩",
  },

  {
    minDeg: 271,
    maxDeg: 315,
    percent: betterLuckNextTime,
    result: "Ôi tiếc quá, bạn không trúng thưởng 🥲",
    description:
      "Không sao cả, năm sau có khi bạn sẽ là người đầu tiên giật giải lớn nhất đó 😍",
  },
  {
    minDeg: 316,
    maxDeg: 360,
    percent: fiveHundredK,
    result: "Waoooo! Bạn đã trúng 500.000vnđ 🎉",
    description: "Chúc mừng! Một bước đột phá! Đây là năm của bạn rồi 🌟",
  },
];

const prizeLabels = ["100K", "5K", "500K", "Hụt", "50K", "20K", "200K", "10K"];

export { PRIZES, prizeLabels };
