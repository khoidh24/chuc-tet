import { useEffect } from "react";
import LuckyWheel from "./components/LuckyWheel";

const App = () => {
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

  useEffect(() => {
    const preventSwipe = (event) => {
      event.preventDefault();
    };

    document.addEventListener("touchmove", preventSwipe, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventSwipe);
    };
  }, []);

  return (
    <>
      <LuckyWheel />
    </>
  );
};

export default App;
