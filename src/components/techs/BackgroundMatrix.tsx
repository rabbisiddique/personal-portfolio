import { motion } from "framer-motion";
import React from "react";

const BackgroundMatrix: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* CSS Grid Matrix */}
      <div
        className="absolute inset-0 opacity-[0.03] grayscale transition-all duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating Light Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -60, 60, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full"
      />
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 60, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none" />
    </div>
  );
};

export default BackgroundMatrix;
