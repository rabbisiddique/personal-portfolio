"use client";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects.data";
import { useProject } from "@/hooks/useProjects";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/parallax";
import {
  Autoplay,
  EffectCreative,
  Keyboard,
  Mousewheel,
  Navigation,
  Parallax,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function ProjectsPage() {
  const { projects, isLoading } = useProject();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const isBeginning = activeIndex === 0;
  const isEnd = activeIndex === projects.length - 1;

  return (
    <div
      className={`relative min-h-screen w-full h-screen overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#030303] text-white" : "bg-[#fafafa] text-zinc-900"
      }`}
    >
      {/* Background Matrix HUD */}
      <div className="fixed inset-0 solid-grid opacity-[0.03] pointer-events-none z-0" />

      {/* Precision Header Overlay */}
      <div className="absolute top-10 left-0 right-0 z-[50] flex flex-col items-center justify-center pointer-events-none px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="text-center space-y-2"
        >
          <h1
            className={`text-3xl md:text-5xl font-black tracking-tight uppercase leading-none ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            SYSTEMS{" "}
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: isDark
                  ? "1.5px rgba(255,255,255,0.8)"
                  : "1.5px rgba(0,0,0,0.8)",
              }}
            >
              I’VE ENGINEERED
            </span>
          </h1>

          <p className="text-xs md:text-sm font-semibold opacity-70 uppercase tracking-widest">
            Full-Stack Systems • Scalable Infrastructure • Production-Ready
            Execution
          </p>
        </motion.div>
      </div>

      {/* Return Navigation */}
      <div className="fixed top-8 left-8 z-[110]">
        <button
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
            isDark
              ? "bg-zinc-950 border-white/5 text-zinc-500 hover:text-white hover:border-blue-500"
              : "bg-white border-zinc-100 text-zinc-400 hover:text-black hover:border-blue-500 shadow-xl"
          }`}
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Main Kinetic Swiper */}
      <Swiper
        modules={[
          Navigation,
          Mousewheel,
          Parallax,
          Keyboard,
          EffectCreative,
          Autoplay,
        ]}
        parallax={true}
        mousewheel={true}
        keyboard={true}
        speed={1400}
        autoplay={{ delay: 10000, disableOnInteraction: true }}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
            opacity: 0,
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        navigation={{ prevEl, nextEl }}
        onSlideChange={(swiper) => {
          console.log("Active slide:", swiper.activeIndex);
          setActiveIndex(swiper.activeIndex);
        }}
        className="h-full w-full z-10"
      >
        {projects.map((project, idx) => (
          <SwiperSlide key={project.id} className="w-full h-full">
            {({ isActive }) => (
              <ProjectCard
                project={project}
                index={idx}
                isDark={isDark}
                isActive={isActive}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tactical Center Navigation Dock */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3 md:gap-6 w-full max-w-fit px-6">
        {/* Previous Button */}
        <button
          ref={(node) => setPrevEl(node)}
          disabled={isBeginning}
          className={`group relative w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${
            isBeginning
              ? "opacity-20 cursor-not-allowed scale-90"
              : isDark
                ? "bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 hover:from-zinc-700/90 hover:to-zinc-800/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95"
                : "bg-gradient-to-br from-white/95 to-white/90 hover:from-white hover:to-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.2)] hover:scale-105 active:scale-95"
          } backdrop-blur-xl border ${isDark ? "border-white/10 hover:border-blue-400/50" : "border-zinc-200/50 hover:border-blue-400/60"}`}
        >
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/10 group-hover:to-blue-600/10 transition-all duration-500`}
          />
          <ChevronLeft
            size={24}
            strokeWidth={2.5}
            className={`relative z-10 transition-all duration-500 ${
              isBeginning
                ? isDark
                  ? "text-white/20"
                  : "text-black/20"
                : isDark
                  ? "text-white/50 group-hover:text-blue-400 group-hover:-translate-x-0.5"
                  : "text-black/40 group-hover:text-blue-500 group-hover:-translate-x-0.5"
            }`}
          />
        </button>

        {/* Gorgeous Circular Progress Indicator */}
        <div
          className={`relative px-6 md:px-8 py-4 md:py-5 rounded-[2.5rem] flex items-center gap-3 backdrop-blur-2xl transition-all duration-700 overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-zinc-900/60 to-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]"
              : "bg-gradient-to-br from-white/80 to-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.8)]"
          } border ${isDark ? "border-white/10" : "border-white/60"}`}
        >
          {/* Ambient animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-blue-500/0"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Circular dots progress */}
          <div className="relative flex items-center gap-2 md:gap-2.5">
            {Array.from({ length: PROJECTS.length }).map((_, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                {/* Dot */}
                <motion.div
                  className={`rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-3 h-3 md:w-3.5 md:h-3.5"
                      : "w-2 h-2 md:w-2.5 md:h-2.5"
                  }`}
                  animate={{
                    background:
                      index <= activeIndex
                        ? isDark
                          ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"
                          : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                        : isDark
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)",
                    scale: index === activeIndex ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    background: { duration: 0.5 },
                    scale: { duration: 0.6, repeat: Infinity, repeatDelay: 1 },
                  }}
                >
                  {/* Active dot glow */}
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.div>

                {/* Connection line */}
                {index < PROJECTS.length - 1 && (
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 left-full w-2 md:w-2.5 h-[2px] ${
                      index < activeIndex
                        ? "bg-gradient-to-r from-blue-500 to-blue-400"
                        : isDark
                          ? "bg-white/10"
                          : "bg-black/10"
                    } transition-all duration-500`}
                  >
                    {index < activeIndex && (
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-300 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Fraction indicator with animation */}
          <div className="relative flex items-center gap-1.5 ml-2 md:ml-3">
            <motion.span
              key={activeIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`text-lg md:text-xl font-black tabular-nums bg-gradient-to-br ${
                isDark
                  ? "from-blue-400 to-blue-500 text-transparent"
                  : "from-blue-500 to-blue-600 text-transparent"
              } bg-clip-text`}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
            <span
              className={`text-xs md:text-sm font-bold ${isDark ? "text-white/20" : "text-black/20"}`}
            >
              /
            </span>
            <span
              className={`text-xs md:text-sm font-bold tabular-nums ${isDark ? "text-white/30" : "text-black/30"}`}
            >
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Next Button */}
        <button
          ref={(node) => setNextEl(node)}
          disabled={isEnd}
          className={`group relative w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${
            isEnd
              ? "opacity-20 cursor-not-allowed scale-90"
              : isDark
                ? "bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 hover:from-zinc-700/90 hover:to-zinc-800/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95"
                : "bg-gradient-to-br from-white/95 to-white/90 hover:from-white hover:to-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.2)] hover:scale-105 active:scale-95"
          } backdrop-blur-xl border ${isDark ? "border-white/10 hover:border-blue-400/50" : "border-zinc-200/50 hover:border-blue-400/60"}`}
        >
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/10 group-hover:to-blue-600/10 transition-all duration-500`}
          />
          <ChevronRight
            size={24}
            strokeWidth={2.5}
            className={`relative z-10 transition-all duration-500 ${
              isEnd
                ? isDark
                  ? "text-white/20"
                  : "text-black/20"
                : isDark
                  ? "text-white/50 group-hover:text-blue-400 group-hover:translate-x-0.5"
                  : "text-black/40 group-hover:text-blue-500 group-hover:translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Frame Border Layer */}
      <div className="fixed inset-0 border-[10px] md:border-[20px] border-black pointer-events-none z-[120] opacity-0 lg:opacity-100 mix-blend-difference" />
    </div>
  );
}
