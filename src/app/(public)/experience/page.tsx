"use client";
import { EDUCATION_ROADMAP, EXPERIENCE_ROADMAP } from "@/data/experience.data";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ChevronLeft,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ExperienceNode } from "../../../../types";

const TimelineCard = ({
  exp,
  isDark,
  idx,
}: {
  exp: ExperienceNode;
  isDark: boolean;
  idx: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col md:flex-row gap-12 group ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Neural Node Connector */}
      <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 z-20">
        <div
          className={`relative w-6 h-6 rounded-full border-4 transition-all duration-500 ${
            isHovered
              ? "scale-125 shadow-[0_0_30px_rgba(59,130,246,0.8)]"
              : "shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          } ${isDark ? "bg-black border-blue-500" : "bg-white border-blue-500"}`}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-[-8px] rounded-full border border-blue-500/30"
          />
        </div>
      </div>

      {/* Main Dossier Card */}
      <div className="w-full md:w-1/2 pl-12 md:pl-0">
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className={`relative p-1 overflow-hidden rounded-[2.5rem] transition-all duration-500 ${
            isHovered ? "shadow-2xl" : ""
          }`}
        >
          {/* Animated Border Gradient */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
              isDark
                ? "bg-gradient-to-br from-blue-500 via-purple-500 to-transparent"
                : "bg-gradient-to-br from-blue-400 via-blue-200 to-transparent"
            }`}
          />

          <div
            className={`relative p-8 md:p-10 rounded-[2.4rem] backdrop-blur-3xl border flex flex-col h-full z-10 transition-colors duration-500 ${
              isDark
                ? "bg-zinc-900/90 border-white/5"
                : "bg-white/90 border-zinc-200"
            }`}
          >
            {/* HUD Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                    isDark ? "bg-zinc-800" : "bg-blue-50"
                  }`}
                >
                  <exp.icon size={26} style={{ color: exp.accent }} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">
                    Access_Granted
                  </div>
                  <div className="text-sm font-bold font-mono">{exp.year}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div
                  className={`w-2 h-2 rounded-full mb-2 animate-pulse`}
                  style={{ backgroundColor: exp.accent }}
                />
                <span className="text-[8px] font-mono opacity-30">
                  REF_ID: {exp.id}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-3xl font-black tracking-tighter uppercase font-space leading-none">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-6 bg-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                    {exp.role}
                  </span>
                </div>
              </div>

              <p
                className={`text-base font-medium leading-relaxed opacity-60 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
              >
                {exp.description}
              </p>

              {/* Skill Matrix */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-30 text-current">
                    Skill_Injections
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all hover:scale-110 ${
                        isDark
                          ? "bg-white/5 border-white/10 text-zinc-300 hover:border-blue-500/50 hover:text-white"
                          : "bg-zinc-50 border-black/5 text-zinc-600 hover:border-blue-500/30"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Corner Ornaments */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/20 rounded-tr-[2.4rem] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-500/20 rounded-bl-[2.4rem] pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Achievements Side (Technical Logs) */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-center pl-12 md:pl-20 ${idx % 2 === 0 ? "" : "md:items-end"}`}
      >
        <div
          className={`max-w-md space-y-8 ${idx % 2 === 0 ? "text-left" : "md:text-right"}`}
        >
          <div
            className={`flex items-center gap-4 ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
              <Cpu size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
              Operational_Success
            </span>
          </div>

          <div className="space-y-6">
            {exp.achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex gap-4 group/ach ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              >
                <div className="shrink-0 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/ach:scale-150 transition-transform" />
                </div>
                <p
                  className={`text-sm font-medium leading-relaxed opacity-60 group-hover/ach:opacity-100 transition-opacity ${
                    isDark ? "text-zinc-300" : "text-zinc-700"
                  }`}
                >
                  {ach}
                </p>
              </motion.div>
            ))}
          </div>

          <div
            className={`pt-8 border-t border-current/10 flex items-center gap-4 ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full border-2 ${isDark ? "bg-zinc-800 border-zinc-900" : "bg-zinc-100 border-white"}`}
                />
              ))}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">
              Verified_Cycle
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperiencePage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen pb-32 overflow-x-hidden ${
        isDark ? "bg-[#050505] text-white" : "bg-[#fafafa] text-zinc-900"
      }`}
    >
      {/* Immersive Background Architecture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dynamic Grid */}
        <div
          className={`absolute inset-0 opacity-[0.05] ${isDark ? "" : "invert"}`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating Light Blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-purple-600/10 blur-[150px] rounded-full"
        />
      </div>

      <header
        className={`sticky top-0 z-[120] px-8 py-6 flex justify-between items-center backdrop-blur-3xl border-b transition-all ${
          isDark ? "bg-black/40 border-white/5" : "bg-white/60 border-zinc-200"
        }`}
      >
        <motion.button
          whileHover={{ x: -6 }}
          className={`flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] transition-colors ${
            isDark
              ? "text-zinc-500 hover:text-white"
              : "text-zinc-400 hover:text-black"
          }`}
        >
          <ChevronLeft size={18} strokeWidth={3} />
          SYS_EXIT
        </motion.button>
        <div className="flex items-center gap-6">
          <div
            className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
              isDark
                ? "bg-zinc-900 border-white/10"
                : "bg-zinc-100 border-black/5"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
              Pathway_Syncing
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-32">
        {/* Cinematic Page Title */}
        <section className="mb-40 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-16 h-[2px] bg-blue-600" />
            <span className="text-[12px] font-black uppercase tracking-[1em] text-blue-500">
              Archives_01
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase font-space"
          >
            NEURAL
            <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: `2px ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
              }}
            >
              ROADMAP
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-xl md:text-2xl font-medium max-w-2xl opacity-50 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          >
            A chronological telemetry of my growth, from structural UI design to
            distributed backend logic.
          </motion.p>
        </section>

        {/* The Experience Stream */}
        <section className="space-y-32 mb-60">
          <div className="flex items-center justify-between mb-24">
            <div className="flex items-center gap-8">
              <div className="p-4 rounded-2xl bg-blue-500 text-white shadow-xl shadow-blue-500/20">
                <Layers size={24} />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tight font-space">
                Technical Mastery
              </h2>
            </div>
            <div className="hidden md:block h-[1px] flex-1 max-w-[400px] mx-12 bg-current opacity-10" />
          </div>

          <div className="relative">
            {/* Dynamic Stream Cable */}
            <div
              className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 opacity-20 overflow-hidden ${
                isDark
                  ? "bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
                  : "bg-blue-500"
              }`}
            >
              <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="w-full h-1/4 bg-white/40 blur-sm"
              />
            </div>

            <div className="space-y-48">
              {EXPERIENCE_ROADMAP.map((exp, idx) => (
                <TimelineCard
                  key={exp.id}
                  exp={exp}
                  isDark={isDark}
                  idx={idx}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Academic Foundation Section */}
        <section className="space-y-32 mb-60">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
            <div className="flex items-center gap-8">
              <div className="p-4 rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tight font-space">
                Core Logic
              </h2>
            </div>
            <p className="text-sm font-mono opacity-30 max-w-sm">
              Foundation phase focusing on sciences and analytical reasoning.
            </p>
          </div>

          <div className="relative">
            <div
              className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 opacity-10 ${isDark ? "bg-white" : "bg-black"}`}
            />
            <div className="space-y-48">
              {EDUCATION_ROADMAP.map((edu, idx) => (
                <TimelineCard
                  key={edu.id}
                  exp={edu}
                  isDark={isDark}
                  idx={idx}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Future Projection HUD */}
        <section className="mt-60 mb-20 relative p-12 md:p-24 rounded-[4rem] border overflow-hidden text-center space-y-12 transition-all hover:border-blue-500/30 group">
          <div
            className={`absolute inset-0 z-0 transition-opacity duration-1000 opacity-20 group-hover:opacity-40 ${
              isDark
                ? "bg-gradient-to-b from-blue-600/10 to-transparent"
                : "bg-blue-50"
            }`}
          />

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 relative z-10"
          >
            <Sparkles size={16} className="text-blue-500 animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">
              Upcoming_Execution
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase relative z-10 font-space">
            Projected_Growth
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto opacity-50 relative z-10 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          >
            Initializing research into low-level systems architecture,
            high-concurrency data streaming, and autonomous AI agent deployment.
          </p>

          <div className="grid md:grid-cols-2 gap-8 pt-12 relative z-10 max-w-4xl mx-auto">
            {[
              {
                title: "Rust_Core",
                icon: Code2,
                meta: "Memory Safety",
                color: "text-orange-500",
              },
              {
                title: "Neural_Ops",
                icon: Zap,
                meta: "Edge Inference",
                color: "text-purple-500",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`p-10 rounded-[3rem] border backdrop-blur-3xl flex flex-col items-center gap-6 ${
                  isDark
                    ? "bg-zinc-950/80 border-white/5"
                    : "bg-white border-black/5 shadow-xl"
                }`}
              >
                <div className={`p-5 rounded-2xl bg-current/10 ${item.color}`}>
                  <item.icon size={32} />
                </div>
                <div>
                  <h5 className="text-2xl font-black uppercase tracking-tight">
                    {item.title}
                  </h5>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
                    {item.meta}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-60 border-t border-current/5 py-32 text-center relative overflow-hidden">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -10 }}
          className={`relative z-10 flex flex-col items-center gap-6 text-[10px] font-black uppercase tracking-[1.5em] transition-all opacity-40 hover:opacity-100`}
        >
          {/* Fix: Using 'ArrowRight' which is imported, with -rotate-45 to point it up-right */}
          <ArrowRight
            size={24}
            className="-rotate-45 mb-2 text-blue-500"
            strokeWidth={3}
          />
          BACK_TO_TOP
        </motion.button>
        {/* Footer UI Fluff */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </footer>

      <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { rotate: 0deg; } to { rotate: 360deg; } }
      `}</style>
    </div>
  );
};

export default ExperiencePage;
