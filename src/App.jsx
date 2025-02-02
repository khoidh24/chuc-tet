import { lazy, Suspense, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
const LuckyWheel = lazy(() => import("./components/LuckyWheel"));

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

  return (
    <Suspense fallback={<LoadingScreen />}>
      <LuckyWheel />
    </Suspense>
  );
};

export default App;
