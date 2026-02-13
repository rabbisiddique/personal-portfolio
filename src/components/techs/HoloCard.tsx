"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useRef, useState } from "react";
import { TechItem } from "../../../admin.types";

interface HoloCardProps {
  tech: TechItem;
  index: number;
  accentColor: string;
}

const HoloCard: React.FC<HoloCardProps> = ({ tech, index, accentColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Parallax Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [12, -12]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-12, 12]),
    springConfig,
  );
  const floatX = useSpring(
    useTransform(x, [-0.5, 0.5], [-25, 25]),
    springConfig,
  );
  const floatY = useSpring(
    useTransform(y, [-0.5, 0.5], [-25, 25]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      style={{ perspective: 1000 }}
      className="relative group h-[380px] w-full cursor-none select-none"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className={`relative h-full w-full rounded-[2.5rem] border backdrop-blur-2xl overflow-hidden transition-all duration-700 ${
          isDark
            ? `bg-zinc-900/40 border-white/5 ${isHovered ? "bg-zinc-800/60 border-white/20" : ""}`
            : `bg-white/70 border-zinc-200 shadow-xl ${isHovered ? "bg-white/90 border-zinc-300" : ""}`
        }`}
      >
        {/* Content HUD Layout */}
        <div className="relative h-full p-10 flex flex-col items-center justify-between z-10">
          {/* Top Row: Mastery Display */}
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 transition-colors ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
              >
                Status
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  className={`text-xs font-bold transition-colors ${isDark ? "text-white/80" : "text-zinc-600"}`}
                >
                  Online
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 transition-colors ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
              >
                Competency
              </span>
              <span
                className={`text-2xl font-black tabular-nums transition-all ${isDark ? "text-white" : "text-zinc-900"}`}
                style={{
                  textShadow: isHovered ? `0 0 15px ${accentColor}80` : "none",
                }}
              >
                {tech.level}
                <span className="text-sm opacity-40">%</span>
              </span>
            </div>
          </div>

          {/* Center: The Core Icon with deep parallax */}
          <motion.div
            style={{ x: floatX, y: floatY }}
            className="relative flex items-center justify-center w-32 h-32"
          >
            <img
              src={tech.icon}
              alt={tech.title}
              className={`w-28 h-28 object-contain transition-all duration-700 ${
                isDark
                  ? "drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
              } group-hover:scale-110`}
            />

            <motion.div
              animate={{
                scale: isHovered ? [1, 1.3, 1] : 1,
                opacity: isHovered ? [0.1, 0.3, 0.1] : 0,
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-[-60px] rounded-full blur-3xl z-0"
              style={{
                background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
              }}
            />
          </motion.div>

          {/* Bottom Row: Identification */}
          <div className="w-full text-center space-y-1">
            <h4
              className={`text-3xl font-black tracking-tighter uppercase font-space transition-colors 
                ${isDark ? "text-white" : "text-zinc-900"}`}
            >
              {tech.title}
            </h4>
            <div className="flex items-center justify-center gap-3">
              <div
                className={`h-[1px] w-8 transition-colors ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
              />
              <span
                className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors
                   ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
              >
                {tech.type}
              </span>
              <div
                className={`h-[1px] w-8 transition-colors ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
              />
            </div>
          </div>
        </div>

        {/* Reveal Overlay - Tech Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 backdrop-blur-md p-10 flex flex-col items-center 
            justify-center text-center z-20 transition-colors duration-700 ${
              isDark ? "bg-black/80" : "bg-white/95"
            }`}
        >
          <span
            className={`text-[10px] font-black uppercase tracking-[0.6em] mb-6 transition-colors ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
          >
            Specifications
          </span>
          <p
            className={`text-lg font-medium leading-relaxed px-4 transition-colors ${isDark ? "text-zinc-200" : "text-zinc-700"}`}
          >
            {tech.description}
          </p>
          <div
            className={`mt-10 w-full h-[4px] rounded-full overflow-hidden transition-colors ${isDark ? "bg-zinc-800/50" : "bg-zinc-100"}`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isHovered ? `${tech.level}%` : 0 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full shadow-sm"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </motion.div>

        {/* Scanline / Sweep effect */}
        <div
          className={`absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat transition-opacity duration-700 ${!isDark ? "opacity-[0.01]" : ""}`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
            backgroundSize: "100% 2px, 3px 100%",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HoloCard;
