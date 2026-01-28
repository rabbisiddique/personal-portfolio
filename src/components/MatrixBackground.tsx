"use client";

import React, { useEffect, useRef } from "react";

const MatrixBackground: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const charSize = 16;
    const columns = Math.floor(width / charSize);
    const drops: number[] = new Array(columns).fill(1);

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";

    const draw = () => {
      // Transparency creates the trail effect
      ctx.fillStyle =
        theme === "dark" ? "rgba(2, 6, 23, 0.1)" : "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Gradient-like effect for dark/light
      ctx.fillStyle = theme === "dark" ? "#3b82f6" : "#6366f1";
      ctx.font = `${charSize}px monospace`;
      ctx.shadowBlur = theme === "dark" ? 10 : 0;
      ctx.shadowColor = theme === "dark" ? "#3b82f6" : "transparent";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        // Randomly make some characters brighter
        if (Math.random() > 0.95) {
          ctx.fillStyle = theme === "dark" ? "#ffffff" : "#4f46e5";
        } else {
          ctx.fillStyle = theme === "dark" ? "#3b82f6" : "#6366f1";
        }

        ctx.fillText(text, i * charSize, drops[i] * charSize);

        if (drops[i] * charSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1] z-0"
    />
  );
};

export default MatrixBackground;
