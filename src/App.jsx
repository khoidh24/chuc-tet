import { ArcElement, Chart, Legend, PieController, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useMemo, useRef, useState } from "react";
import { prizeLabels, PRIZES } from "./enums/prize";
import Modal from "./Modal";

// Đăng ký các thành phần cần thiết
Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

const LuckyWheel = () => {
  const canvasRef = useRef();
  const chartRef = useRef(null); // Lưu trữ `myChart` trong ref
  const spinningRef = useRef(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prize, setPrize] = useState();

  const data = useMemo(() => [16, 16, 16, 16, 16, 16], []);
  const pieColors = useMemo(
    () => ["#CD1928", "#FEF9C6", "#CD1928", "#FEF9C6", "#CD1928", "#FEF9C6"],
    []
  );

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: prizeLabels,
        datasets: [
          {
            backgroundColor: pieColors,
            data: data,
          },
        ],
      },
      options: {
        hover: { mode: null },
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          tooltip: false,
          legend: {
            display: false,
          },
          datalabels: {
            offset: -20,
            anchor: "center",
            align: "end",
            clamp: true,
            color: "#000",
            formatter: (_, context) =>
              context.chart.data.labels[context.dataIndex],
            font: {
              size: 24,
              weight: "bold",
            },
          },
        },
      },
    });

    chartRef.current = myChart;

    return () => {
      myChart.destroy();
    };
  }, [data, pieColors]);

  const weightedRandom = () => {
    const totalWeight = PRIZES.reduce((acc, prize) => acc + prize.percent, 0);
    const random = Math.random() * totalWeight;
    let cumulative = 0;

    for (const prize of PRIZES) {
      cumulative += prize.percent;
      if (random <= cumulative) {
        return prize;
      }
    }
  };

  const handleSpin = () => {
    if (spinningRef.current) return;

    spinningRef.current = true;
    const selectedPrize = weightedRandom();
    const randomDeg = Math.floor(
      Math.random() * (selectedPrize.maxDeg - selectedPrize.minDeg + 1) +
        selectedPrize.minDeg
    );
    const fullRotations = 40 * 360; // Số vòng quay hoàn chỉnh
    const targetRotation = fullRotations + randomDeg;

    let currentRotation = 0;

    const easeOut = (t, b, c, d) => -c * (t /= d) * (t - 2) + b;

    const duration = 3000; // Tổng thời gian quay (ms)
    const startTime = performance.now();

    const rotate = (timestamp) => {
      const elapsed = timestamp - startTime;
      if (elapsed < duration) {
        const easedRotation = easeOut(elapsed, 0, targetRotation, duration);
        currentRotation = easedRotation % 360;
        chartRef.current.options.rotation = currentRotation;
        chartRef.current.update();
        requestAnimationFrame(rotate);
      } else {
        chartRef.current.options.rotation = targetRotation % 360;
        chartRef.current.update();
        setPrize(selectedPrize);
        console.log(selectedPrize);
        spinningRef.current = false;
        setIsModalVisible(true);
      }
    };
    console.log("clicked");
    requestAnimationFrame(rotate);
  };

  return (
    <>
      <div className="container mx-auto w-full xl:max-w-md lg:max-w-md flex justify-center items-center h-screen flex-col overflow-hidden gap-4 bg-[#A70706] relative">
        <h1 className="text-4xl font-bold text-[#FEF9C6] z-10 bg-[#CD1928] p-2 rounded-lg">
          Lì xì quay số
        </h1>
        <div className="w-[80%] relative">
          <img src="/ring.gif" className="absolute inset-0 rotate-90" />
          <canvas ref={canvasRef}></canvas>
          <button
            onClick={handleSpin}
            disabled={spinningRef.current}
            className="bg-[#CD1928] outline:none ring-0 focus:outline-none focus:ring-0 w-[86px] h-[86px] z-20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold border-2 border-white"
          >
            Quay!
          </button>
        </div>
        <p className="text-white mx-4 text-center">
          {spinningRef.current
            ? "Để xem chúng ta sẽ trúng gì nào..."
            : "Ấn vào nút quay chính giữa vòng quay để nhận lì xì nhé!"}
        </p>
        <img src="/tet-tree.webp" className="w-full absolute top-[-50px]" />
        <img src="/footer2.gif" className="absolute bottom-12" />
        <p className="text-xs absolute bottom-2 text-white mx-4 text-center">
          App này được làm bởi Khôi Dương (khoidh24) ✨
        </p>
        <Modal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          prize={prize?.result}
          description={prize?.description}
        />
      </div>
    </>
  );
};

export default LuckyWheel;
