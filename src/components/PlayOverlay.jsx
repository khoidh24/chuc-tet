/* eslint-disable react/prop-types */

import { useState } from "react";

const PlayOverlay = ({ audioRef }) => {
  const [visible, setVisible] = useState(true);
  const handleCloseOverlay = () => {
    audioRef.current.play();
    setVisible(false);
  };

  return (
    visible && (
      <div
        className="absolute inset-0 w-full h-full text-white flex flex-col items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 1000,
        }}
        onClick={handleCloseOverlay}
      >
        <p>Chạm vào màn hình để tiếp tục</p>
      </div>
    )
  );
};

export default PlayOverlay;
