"use client";
import PagesLoading from "@/components/public/loading/PagesLoading";
import { useAiLabs } from "@/hooks/useAiLabs";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  Construction,
  Cpu,
  FileSearch,
  LucideIcon,
  Maximize2,
  MessageSquare,
  Send,
  Settings2,
  ShieldAlert,
  Sparkles,
  Terminal as TerminalIcon,
  User,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useRef } from "react";
import { LabExperiment } from "../../../../admin.types";

const ArchitecturalLabel = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 mb-6 opacity-40 group-hover:opacity-100 transition-all duration-500">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-blue-500 rounded-full" />
      <div className="w-8 h-[1px] bg-blue-500/50 mt-0.5" />
    </div>
    <span className="text-[9px] font-mono uppercase tracking-[0.3em] font-black">
      Core Module: {label}
    </span>
  </div>
);

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <section className="text-center space-y-10 max-w-5xl mx-auto pt-24 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-4 px-6 py-2 rounded-2xl border text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl backdrop-blur-xl ${
          isDark
            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
            : "bg-blue-50 border-blue-100 text-blue-600"
        }`}
      >
        <Sparkles size={16} className="animate-pulse" />
        Full-Stack Portfolio • Interface v1.0
      </motion.div>

      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-9xl font-heading font-bold tracking-tighter font-space uppercase leading-[0.85] relative"
        >
          AI<span className="text-blue-600">_</span>LABS
          <div className="absolute -top-4 -right-8 opacity-10">
            <Cpu size={120} />
          </div>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-8"
        >
          <p
            className={`text-2xl md:text-3xl font-medium leading-tight max-w-3xl opacity-60 tracking-tight ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          >
            A collection of full-stack systems I’ve engineered —
            production-ready, scalable, and interactive interfaces.
          </p>

          <div
            className={`flex flex-col md:flex-row items-center gap-6 px-10 py-5 rounded-[2.5rem] border backdrop-blur-3xl transition-all shadow-3xl ${
              isDark
                ? "bg-zinc-950/50 border-white/5"
                : "bg-white/80 border-black/5 shadow-blue-500/5"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
                <ShieldAlert size={24} />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 block mb-0.5">
                  Philosophy_Check
                </span>
                <p className="text-xs font-bold opacity-70">
                  No fluff. Just functional, reliable, and production-ready
                  systems.
                </p>
              </div>
            </div>
            <div
              className={`hidden md:block w-[1px] h-10 ${isDark ? "bg-white/10" : "bg-black/10"}`}
            />
            <p
              className={`text-xs font-medium max-w-sm text-left italic ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
            >
              Every project here is designed to solve real problems and
              demonstrate my end-to-end full-stack capabilities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ChatPreview = ({ theme }: { theme: "dark" | "light" }) => {
  const { data, isLoading } = useAiLabs();
  const isDark = theme === "dark";

  return (
    <div className="group max-w-5xl mx-auto">
      <ArchitecturalLabel label="AI Chat Interface" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-[3rem] border overflow-hidden shadow-2xl relative transition-all duration-700 ${
          isDark
            ? "bg-[#0a0a0c] border-white/10 shadow-black"
            : "bg-white border-zinc-200 shadow-blue-500/5"
        }`}
      >
        {/* Decorative Grid Background for Chat */}
        <div
          className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isDark ? "invert" : ""}`}
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Terminal Header */}
        <div
          className={`px-10 py-6 border-b flex items-center justify-between relative z-10 ${
            isDark
              ? "bg-zinc-900/80 border-white/10"
              : "bg-zinc-50 border-zinc-100"
          }`}
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 animate-pulse" />
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white relative z-10 shadow-2xl">
                <Bot size={24} />
              </div>
            </div>
            <div>
              <span className="text-lg font-black uppercase tracking-tighter block leading-none">
                Lab_Core_Assistant
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  Frequency: 5.8GHz • Secure
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isDark ? "bg-zinc-800 border-white/5" : "bg-white border-zinc-100"}`}
            >
              <Activity size={18} className="text-blue-500" />
            </div>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isDark ? "bg-zinc-800 border-white/5" : "bg-white border-zinc-100"}`}
            >
              <Settings2 size={18} className="opacity-40" />
            </div>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="p-10 space-y-8 h-[500px] overflow-y-auto no-scrollbar relative z-10 flex flex-col">
          {data?.chat?.messages.length === 0 ? (
            <p className="text-center font-light font-heading text-[20px] text-blue-300">
              No chat messages
            </p>
          ) : (
            <>
              {data?.chat?.messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${
                      msg.role === "user"
                        ? isDark
                          ? "bg-zinc-800 text-white"
                          : "bg-zinc-100 text-zinc-900"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={18} />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div
                      className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-xl ${
                        msg.role === "user"
                          ? isDark
                            ? "bg-white text-black"
                            : "bg-zinc-900 text-white"
                          : isDark
                            ? "bg-zinc-800/80 text-zinc-100 border border-white/10 backdrop-blur-xl"
                            : "bg-white text-zinc-800 border border-zinc-200 shadow-blue-500/5"
                      } ${msg.role === "user" ? "rounded-tr-none" : "rounded-tl-none"}`}
                    >
                      {msg.chat_content}
                    </div>
                    <div
                      className={`text-[9px] font-black uppercase tracking-widest opacity-30 ${msg.role === "user" ? "text-right" : "text-left"}`}
                    >
                      {msg.time} •{" "}
                      {msg.role === "bot" ? "SENT BY CORE" : "CLIENT UPLINK"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}

          {/* Typing Indicator / Empty State */}
          <div className="pt-8 flex flex-col items-center justify-center text-center space-y-6 opacity-30 mt-auto">
            <div className="flex gap-2">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay }}
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                />
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.5em]">
                Awaiting User Signal
              </p>
              <p className="text-[9px] font-medium italic">
                Backend disconnected • Interface staging only
              </p>
            </div>
          </div>
        </div>

        {/* Interaction Footer */}
        <div
          className={`p-10 border-t relative z-10 ${isDark ? "border-white/10 bg-zinc-900/30" : "border-zinc-100 bg-zinc-50/50"}`}
        >
          <div className="mb-10 space-y-4">
            <div className="flex items-center gap-3">
              <TerminalIcon size={14} className="text-blue-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] opacity-40 italic">
                Command_Macros
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {data?.chat.messages
                .flatMap((msg) => msg.command)
                .map((com, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-2xl border text-[11px] font-black tracking-tight transition-all uppercase ${
                      isDark
                        ? "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/5 shadow-2xl"
                        : "bg-white border-zinc-200 text-zinc-500 hover:text-blue-600 hover:border-blue-500/50 shadow-xl shadow-blue-500/5"
                    }`}
                  >
                    {com}
                  </motion.button>
                ))}
            </div>
          </div>

          <div
            className={`flex items-center gap-6 px-8 py-6 rounded-[2.5rem] border shadow-inner transition-all ${
              isDark
                ? "bg-[#050505] border-white/10"
                : "bg-white border-zinc-200"
            }`}
          >
            <input
              type="text"
              placeholder="Inject command to Lab Assistant..."
              className="flex-1 bg-transparent border-none outline-none text-base font-medium opacity-30 cursor-not-allowed"
              disabled
            />
            <button
              disabled
              className="w-14 h-14 rounded-2xl bg-current/5 flex items-center justify-center opacity-10 cursor-not-allowed"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface FeatureCardProps {
  experiment: LabExperiment;
  theme: "dark" | "light";
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  experiment,
  theme,
  index,
}) => {
  const isDark = theme === "dark";
  const cardRef = useRef<HTMLDivElement>(null);
  const statusLabel = experiment.model;

  // Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const icons: Record<string, LucideIcon> = {
    "lab-01": FileSearch,
    "lab-02": BarChart3,
    "lab-03": MessageSquare,
    "lab-04": Settings2,
  };

  const Icon = icons[experiment.id] || BrainCircuit;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group perspective-1000"
    >
      <ArchitecturalLabel label={`AIFeature_${experiment.id}`} />
      <motion.div
        style={{ rotateX, rotateY }}
        className={`relative p-12 h-full rounded-[3.5rem] border transition-all duration-700 flex flex-col overflow-hidden ${
          isDark
            ? "bg-zinc-950/40 border-white/5 hover:border-blue-500/40 hover:bg-zinc-900 shadow-2xl shadow-black/50"
            : "bg-white border-zinc-200 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10"
        }`}
      >
        {/* Animated Background Scanline */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          className="absolute inset-x-0 h-[2px] bg-blue-500/10 blur-[1px] pointer-events-none"
        />

        {/* Feature Header */}
        <div className="flex items-start justify-between mb-12">
          <div className="relative">
            <div
              className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${isDark ? "bg-blue-500" : "bg-blue-400"}`}
            />
            <div
              className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 relative z-10 ${
                isDark
                  ? "bg-zinc-800 text-blue-500 border border-white/5"
                  : "bg-blue-50 text-blue-600 border border-blue-100"
              }`}
            >
              <Icon size={40} />
            </div>
          </div>

          <div
            className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border shadow-2xl transition-all ${
              statusLabel === "UI Ready"
                ? isDark
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  : "bg-blue-50 border-blue-100 text-blue-600"
                : statusLabel === "In Progress"
                  ? isDark
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    : "bg-amber-50 border-amber-100 text-amber-600"
                  : isDark
                    ? "bg-zinc-800 border-zinc-700 text-zinc-500"
                    : "bg-zinc-100 border-zinc-200 text-zinc-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {statusLabel}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 opacity-30 font-mono text-[9px] mb-1">
              <span className="text-blue-500">ID:</span> 00{index + 1}{" "}
              <span className="text-blue-500">LOAD:</span> 0.04ms
            </div>
            <h3
              className={`text-4xl font-heading font-bold tracking-tighter uppercase font-space leading-[0.9] ${isDark ? "text-white" : "text-zinc-900"}`}
            >
              {experiment.title}
            </h3>
          </div>
          <p
            className={`text-lg leading-relaxed font-medium opacity-50 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          >
            {experiment.description}
          </p>
        </div>

        {/* Technical Data Tokens */}
        <div className="mt-12 pt-10 border-t border-current/5 flex flex-wrap gap-3">
          {experiment.tags.map((tag: string) => (
            <span
              key={tag}
              className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                isDark
                  ? "bg-white/5 text-zinc-500 group-hover:text-blue-400 group-hover:bg-blue-500/10"
                  : "bg-zinc-100 text-zinc-400 group-hover:text-blue-600 group-hover:bg-blue-50"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Unique Card Corner Detail */}
        <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 opacity-10 group-hover:opacity-50 transition-opacity ${isDark ? "border-white" : "border-blue-500"}`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const AILabsPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data, isLoading } = useAiLabs();
  if (isLoading) {
    return (
      <>
        <PagesLoading isDark="dark" />
      </>
    );
  }
  return (
    <div
      className={`relative min-h-screen pb-60 overflow-x-hidden ${
        isDark ? "bg-[#030303] text-white" : "bg-[#fafafa] text-zinc-900"
      }`}
    >
      <main className="relative z-10 max-w-7xl mx-auto px-10 space-y-64">
        <Hero />

        <div className="space-y-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-body uppercase font-bold tracking-tighter font-space leading-none">
                Neural Interface
              </h2>
              <p className="text-xs md:text-sm font-black uppercase tracking-widest opacity-50">
                Real-Time AI Chat • Full-Stack System Interaction
              </p>
            </div>

            <div className="hidden md:block h-[1px] flex-1 max-w-[400px] bg-blue-600/20 mx-10" />
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-blue-600/10 text-blue-500 border border-blue-500/20">
                <Maximize2 size={24} />
              </div>
            </div>
          </div>
          <ChatPreview theme={theme as "dark" | "light"} />
        </div>

        <section className="space-y-32">
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter uppercase font-space leading-none">
              Execution Blueprint
            </h2>
            <p className="text-[14px] font-black uppercase tracking-[0.8em] opacity-20">
              Strategy · Architecture · Execution
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* High Impact Features */}
            {data?.roadmap.experiments
              // .filter((e) => e.model === "UI Ready")
              .map((exp, idx) => (
                <FeatureCard
                  key={exp.id}
                  experiment={exp}
                  theme={theme as "dark" | "light"}
                  index={idx}
                />
              ))}
          </div>

          {/* Barrier Divider */}
          <div className="py-32 flex flex-col items-center gap-12">
            <div className="relative w-full flex items-center justify-center">
              <div
                className={`h-[1px] w-full ${isDark ? "bg-white/5" : "bg-black/5"}`}
              />
              <div
                className={`absolute px-10 py-4 rounded-3xl border border-dashed flex items-center gap-5 transition-all shadow-2xl ${
                  isDark
                    ? "bg-[#0a0a0c] border-blue-500/30"
                    : "bg-white border-blue-500/30"
                }`}
              >
                <Construction size={24} className="text-blue-500" />
                <span className="text-[12px] font-black uppercase tracking-[0.6em]">
                  System_Expansion_Underway
                </span>
              </div>
            </div>
            <p
              className={`text-[11px] font-black uppercase tracking-[1em] opacity-20 animate-pulse`}
            >
              Initializing_Phase_02_Weights...
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Strategic Roadmap Features */}
            {data?.roadmap.experiments
              .filter((e) => e.model === "Planned")
              .map((exp, idx) => (
                <FeatureCard
                  key={exp.id}
                  experiment={exp}
                  theme={theme as "dark" | "light"}
                  index={idx + 10}
                />
              ))}
          </div>
        </section>

        <footer className="pt-40 border-t border-current/5 text-center space-y-16">
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                label: "Core Stack",
                val: "Next.js · TypeScript · AI APIs",
                icon: Cpu,
              },
              {
                label: "Architecture",
                val: "Modular · Scalable · Performant",
                icon: Bot,
              },
              {
                label: "Deployment",
                val: "Edge-Optimized · Low Latency",
                icon: Zap,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-8 rounded-[2.5rem] border flex flex-col items-center gap-6 ${isDark ? "bg-zinc-900/40 border-white/5" : "bg-white border-zinc-200 shadow-sm"}`}
              >
                <div className="p-4 rounded-2xl bg-blue-600/10 text-blue-500">
                  <stat.icon size={28} />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-30 block">
                    {stat.label}
                  </span>
                  <span className="text-xl font-black">{stat.val}</span>
                </div>
              </div>
            ))}
          </div>

          <p
            className={`text-xl opacity-40 max-w-3xl mx-auto font-medium leading-relaxed italic ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
          >
            Building intelligent systems where design, performance, and
            scalability converge.
          </p>

          <div className="flex flex-col items-center gap-4 pt-10 opacity-20">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <div className="h-20 w-[1px] bg-gradient-to-b from-blue-500 to-transparent" />
          </div>
        </footer>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default AILabsPage;
