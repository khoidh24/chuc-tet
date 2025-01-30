import { useEffect, useState } from "react";
import LuckyWheel from "./components/LuckyWheel";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const assets = [
      "/ring.gif",
      "/tet-tree.webp",
      "/firework.gif",
      "/footer.gif",
      "/flower.png",
      "lanterns-overlay.gif",
      "/audio/bg.mp3",
    ];

    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      setProgress(Math.floor((loadedCount / assets.length) * 100));

      if (loadedCount === assets.length) {
        setTimeout(() => setLoading(false), 500); // Thêm delay nhẹ cho hiệu ứng mượt
      }
    };

    assets.forEach((src) => {
      if (src.endsWith(".mp3")) {
        const audio = new Audio(src);
        audio.oncanplaythrough = updateProgress;
      } else {
        const img = new Image();
        img.src = src;
        img.onload = updateProgress;
      }
    });
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  if (loading) return <LoadingScreen progress={progress} />;

  return (
    <>
      <LuckyWheel />
    </>
  );
};

export default App;
