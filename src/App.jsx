import { ArcElement, Chart, Legend, PieController, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useMemo, useRef, useState } from "react";
import { prizeLabels, PRIZES } from "./enums/prize";
import Modal from "./Modal";
import { Volume2, VolumeX } from "lucide-react";

// Đăng ký các thành phần cần thiết
Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

const LuckyWheel = () => {
  const canvasRef = useRef();
  const chartRef = useRef(null); // Lưu trữ `myChart` trong ref
  const audioRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prize, setPrize] = useState();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

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
    if (spinning) return;

    setSpinning(true);
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
        setSpinning(false);
        setIsModalVisible(true);
      }
    };
    console.log("clicked");
    requestAnimationFrame(rotate);
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <>
      <audio ref={audioRef} autoPlay loop>
        <source src="/audio/bg.mp3" type="audio/mp3" />
      </audio>
      <div className="container mx-auto w-full xl:max-w-md lg:max-w-md flex justify-center items-center h-screen flex-col overflow-hidden gap-4 bg-[#A70706] relative">
        <button
          onClick={toggleAudio}
          className="absolute top-4 left-4 bg-[#CD1928] p-2 rounded-full shadow-md z-50 outline-none ring-0 focus:outline-none focus:ring-0"
        >
          {isAudioPlaying ? (
            <Volume2 size={24} color="#FEF9C6]" />
          ) : (
            <VolumeX size={24} color="#FEF9C6" />
          )}
        </button>
        <h1 className="text-4xl font-bold text-[#FEF9C6] z-10 bg-[#CD1928] p-2 rounded-lg">
          Lì xì quay số
        </h1>
        <div className="w-[80%] relative z-50">
          <img src="/ring.gif" className="absolute inset-0 rotate-90" />
          <canvas ref={canvasRef}></canvas>
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="bg-[#CD1928] outline:none ring-0 focus:outline-none focus:ring-0 w-[86px] h-[86px] z-[60] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold border-2 border-white text-xl"
          >
            QUAY!
          </button>
        </div>
        <p className="text-white mx-4 text-center z-10">
          {prize
            ? prize?.result
            : spinning
            ? "Để xem chúng ta sẽ trúng gì nào..."
            : "Ấn vào nút quay để nhận lì xì nhé!"}
        </p>
        <img src="/tet-tree.webp" className="w-full absolute top-[-50px]" />
        <img src="/footer.gif" className="absolute bottom-12" />
        <div className="text-xs absolute bottom-2 text-white mx-4 text-center z-10">
          <p>App này được làm bởi Hoàng Khôi (khoidh24) ✨</p>
          <p>App độc quyền không sao chép. Chúc mọi người năm mới vui vẻ 😊</p>
        </div>

        <Modal
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setPrize(null);
          }}
          prize={prize?.result}
          description={prize?.description}
        />
      </div>
    </>
  );
};

export default LuckyWheel;
