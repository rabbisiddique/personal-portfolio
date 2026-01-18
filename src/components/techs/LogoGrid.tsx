"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tech } from "../../../types";

interface LogoGridProps {
  techs: Tech[];
  accentColor: string;
}

const LogoGrid: React.FC<LogoGridProps> = ({ techs, accentColor }) => {
  const [isScanning, setIsScanning] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative min-h-[500px]">
      {/* Scanning Beam Animation */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-[2px] z-50 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              boxShadow: `0 0 20px ${accentColor}, 0 0 40px ${accentColor}`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6 pb-40">
        {techs.map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            initial={{ opacity: 0, scale: 0.5, rotateX: 45, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            transition={{
              delay: i * 0.03,
              type: "spring",
              stiffness: 150,
              damping: 15,
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative aspect-square w-full perspective-1000"
          >
            {/* Cell Background */}
            <div
              className={`absolute inset-0 rounded-[2rem] border transition-all duration-500 backdrop-blur-md overflow-hidden ${
                isDark
                  ? "bg-zinc-900/60 border-white/5 group-hover:bg-zinc-800/90 group-hover:border-white/20"
                  : "bg-white/80 border-zinc-200 group-hover:bg-white group-hover:border-zinc-300 shadow-sm group-hover:shadow-xl"
              }`}
            />

            {/* Content Container */}
            <div className="relative h-full w-full flex flex-col items-center justify-center p-4 md:p-6 z-10">
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ delay: i * 0.03 + 0.2, duration: 0.5 }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-1/2 h-1/2 md:w-3/5 md:h-3/5 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>

              {/* Label */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <span
                  className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 text-center pointer-events-none px-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {tech.name}
                </span>
              </div>
            </div>

            {/* Mastery Level Indicator */}
            <div className="absolute top-4 right-5 z-20">
              <div
                className={`text-[8px] font-black tabular-nums transition-colors ${
                  isDark ? "text-zinc-700" : "text-zinc-300"
                } group-hover:text-current`}
                style={{ color: tech.level > 90 ? accentColor : undefined }}
              >
                {tech.level}%
              </div>
            </div>

            {/* Hover Glow */}
            <div
              className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-[0.15] blur-2xl pointer-events-none transition-opacity duration-500 z-0"
              style={{ backgroundColor: accentColor }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LogoGrid;
