import { useCallback, useEffect, useRef } from "react";

const Fireworks = () => {
  const canvasRef = useRef(null);
  const fireworksRef = useRef([]);
  const lastLaunchRef = useRef(0);

  const createParticles = (x, y) => {
    const particles = [];
    const colors = ["#FEF9C6"];

    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const speed = 2 + Math.random() * 2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return particles;
  };

  const createExplosion = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (let i = 0; i < 3; i++) {
      const x = Math.random() * canvas.width;
      const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.2;

      const firework = {
        x,
        y,
        particles: createParticles(x, y),
      };

      fireworksRef.current.push(firework);
    }
  }, [canvasRef]);

  const animate = useCallback(
    (timestamp) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastLaunchRef.current > 1000) {
        createExplosion();
        lastLaunchRef.current = timestamp;
      }

      fireworksRef.current = fireworksRef.current.filter((firework) => {
        firework.particles = firework.particles.filter((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.02; // Giảm trọng lực để pháo hoa bay xa hơn
          particle.alpha -= 0.003;

          if (particle.alpha <= 0) return false;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2); // Tăng kích thước hạt
          ctx.fillStyle = `rgba(${hexToRgb(particle.color)},${particle.alpha})`;
          ctx.fill();
          return true;
        });

        return firework.particles.length > 0;
      });

      requestAnimationFrame(animate);
    },
    [canvasRef, createExplosion]
  );

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "255,255,255";
    return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
      result[3],
      16
    )}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [animate, canvasRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default Fireworks;
