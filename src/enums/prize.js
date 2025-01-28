const PRIZES = [
  {
    minDeg: 0,
    maxDeg: 30,
    value: 2,
    percent: 60,
    result: "Ôi tiếc quá, bạn không trúng thưởng 🥲",
    description:
      "Không sao cả, năm sau có khi bạn sẽ là người đầu tiên giật giải lớn nhất đó 😍",
  },
  {
    minDeg: 31,
    maxDeg: 90,
    value: 1,
    percent: 20,
    result: "Waoooo! Bạn đã trúng 10.000vnđ 🎉",
    description:
      "Tuy là quà nhỏ nhất nhưng nó mang ý nghĩa tấm lòng nhiều nhất ❤️",
  },
  {
    minDeg: 91,
    maxDeg: 150,
    value: 6,
    percent: 10,
    result: "Waoooo! Bạn đã trúng 20.000vnđ 🎉",
    description:
      "Có vẻ như hôm nay là ngày may mắn của bạn, chắc hẳn cả năm cũng sẽ may mắn như vậy rồi 😊",
  },
  {
    minDeg: 151,
    maxDeg: 210,
    value: 5,
    percent: 8,
    result: "Waoooo! Bạn đã trúng 50.000vnđ 🎉",
    description: "Bạn rất chi là may mắn luôn! Cả năm phát tài rồi đó 🤩",
  },
  {
    minDeg: 211,
    maxDeg: 270,
    value: 4,
    percent: 1,
    result: "Waoooo! Bạn đã trúng 100.000vnđ 🎉",
    description: "Không thể tin được! Số bạn năm nay chắc hẳn rất tốt 🥰",
  },
  {
    minDeg: 271,
    maxDeg: 330,
    value: 3,
    percent: 1,
    result: "Waoooo! Bạn đã trúng 200.000vnđ 🎉",
    description: "Không còn gì để nói! Năm nay chắc chắn là dành cho bạn ✨",
  },
  {
    minDeg: 331,
    maxDeg: 360,
    value: 2,
    percent: 60,
    result: "Ôi tiếc quá, bạn không trúng thưởng 🥲",
    description:
      "Không sao cả, năm có khi bạn sẽ là người đầu tiên giật giải lớn nhất đó 😍",
  },
];

const prizeLabels = ["10K", "Hụt", "200K", "100K", "50K", "20K"];

export { PRIZES, prizeLabels };
