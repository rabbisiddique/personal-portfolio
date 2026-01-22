import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React from "react";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  suffix?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  subtitle,
  title,
  suffix,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`relative border-b pb-12 transition-colors duration-700 ${
        isDark ? "border-white/5" : "border-zinc-200"
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`h-[1px] w-12 transition-colors ${isDark ? "bg-white/20" : "bg-zinc-300"}`}
        />
        <span
          className={`text-[10px] font-black uppercase tracking-[0.8em] transition-colors ${
            isDark ? "text-white/40" : "text-zinc-400"
          }`}
        >
          {subtitle}
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2
          className={`text-7xl md:text-6xl font-black tracking-tighter font-space leading-[0.8] transition-colors ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          {title}{" "}
          <span
            className={`italic transition-colors ${isDark ? "text-zinc-800" : "text-primary"}`}
          >
            {suffix}
          </span>
        </h2>

        <div
          className={`flex items-center gap-6 px-8 py-4 rounded-full border backdrop-blur-xl transition-all duration-700 ${
            isDark
              ? "bg-zinc-900/40 border-white/5"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <div className="flex flex-col">
            <span
              className={`text-[8px] font-black uppercase tracking-widest mb-1 transition-colors ${
                isDark ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              Processing Mode
            </span>
            <span
              className={`text-xs w-full font-bold uppercase tracking-wider transition-colors ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Quantum Optimized
            </span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
          />
        </div>
      </div>

      {/* Ornamental UI line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-1000 ${
          isDark
            ? "bg-gradient-to-r from-white/20 via-white/5 to-transparent"
            : "bg-gradient-to-r from-zinc-200 via-zinc-100 to-transparent"
        }`}
      />
    </div>
  );
};

export default SectionHeader;
