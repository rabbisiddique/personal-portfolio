"use client";
import { PROJECTS } from "@/data/projects.data";
import { motion } from "framer-motion";
import { ChevronRight, Github, Globe, Layout } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Project } from "../../../../types";

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * 5, y: y * -5 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setRotate({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: 1000,
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      className="group relative h-full"
    >
      {/* UNIQUE NEON TRACE BORDER EFFECT */}
      <div
        className={`absolute -inset-[2px] rounded-[2rem] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden ${
          isDark ? "bg-zinc-800" : "bg-zinc-200"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#3b82f6_100%)]"
        />
      </div>

      <div
        className={`relative h-full flex flex-col rounded-[2rem] z-10 border transition-all duration-500 overflow-hidden backdrop-blur-3xl ${
          isDark
            ? "bg-zinc-950/90 border-white/5 group-hover:bg-zinc-900"
            : "bg-white border-black/5 shadow-xl group-hover:shadow-blue-500/10"
        }`}
      >
        {/* Visual Header (Compact) */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
          />

          {/* Badge Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/80">
              {project.category}
            </div>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/10 ${
                project.status === "Deployed"
                  ? "bg-emerald-500/20 text-emerald-500"
                  : "bg-blue-500/20 text-blue-500"
              }`}
            >
              <Layout size={14} />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-5">
            <h3 className="text-xl font-black text-white tracking-tighter uppercase font-space">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Section (Dense & Readable) */}
        <div className="p-6 flex-1 flex flex-col space-y-6">
          <p
            className={`text-xs font-medium leading-relaxed opacity-60 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          >
            {project.description}
          </p>

          {/* Minimal Tech Tokens */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-wider border transition-colors ${
                  isDark
                    ? "bg-white/5 border-white/5 text-zinc-500 group-hover:text-blue-400"
                    : "bg-zinc-100 border-black/5 text-zinc-500 group-hover:text-blue-600"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex gap-2">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={project.links.github || "#"}
                className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                  isDark
                    ? "bg-zinc-800 border-white/10 text-white"
                    : "bg-zinc-50 border-black/5 text-zinc-900"
                }`}
              >
                <Github size={16} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={project.links.demo || "#"}
                className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                  isDark
                    ? "bg-zinc-800 border-white/10 text-white"
                    : "bg-zinc-50 border-black/5 text-zinc-900"
                }`}
              >
                <Globe size={16} />
              </motion.a>
            </div>

            <motion.a
              whileHover={{ x: 5 }}
              href={project.links.demo || "#"}
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-500"
            >
              Deep View <ChevronRight size={12} />
            </motion.a>
          </div>
        </div>

        {/* Unique Scanline Pattern (Static but aesthetic) */}
        <div
          className={`absolute bottom-0 right-0 w-16 h-16 opacity-10 pointer-events-none transition-opacity group-hover:opacity-30 ${isDark ? "invert" : ""}`}
          style={{
            backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)",
            backgroundSize: "4px 4px",
          }}
        />
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen selection:bg-blue-600 selection:text-white pb-32 overflow-x-hidden ${
        isDark ? "bg-[#030303] text-white" : "bg-[#fafafa] text-zinc-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-[120] px-8 py-6 flex justify-between items-center backdrop-blur-3xl border-b transition-all ${
          isDark ? "bg-black/40 border-white/5" : "bg-white/60 border-black/5"
        }`}
      >
        <motion.button
          onClick={() => router.push("/experience")}
          whileHover={{ x: -8 }}
          className={`flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] ${
            isDark
              ? "text-zinc-500 hover:text-white"
              : "text-zinc-400 hover:text-black"
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-current/5 flex items-center justify-center">
            <ChevronRight size={14} className="rotate-180" />
          </div>
          System_Exit
        </motion.button>

        <div className="flex items-center gap-6">
          <div
            className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
              isDark
                ? "bg-zinc-900/50 border-white/10"
                : "bg-zinc-100 border-black/5"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
              Stream: Active
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20">
        {/* Title Section (More compact) */}
        <section className="mb-20 space-y-8">
          <div className="flex items-center gap-6">
            <div className="h-[2px] w-12 bg-blue-600" />
            <span className="text-[11px] font-black uppercase tracking-[1em] text-blue-500">
              Project_Feed
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none font-space uppercase">
              WORK
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: `1px ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
                }}
              >
                _ARCHIVE
              </span>
            </h1>
            <p
              className={`text-sm md:text-base font-medium opacity-50 max-w-xl ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
            >
              High-performance digital products engineered for scalability and
              deep interaction.
            </p>
          </div>
        </section>

        {/* Project Grid (Responsive & Attractive) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </main>

      {/* SATELLITE QUICK NAV (Optional Footer Element) */}
      <div className="mt-32 max-w-7xl mx-auto px-8">
        <div
          className={`p-10 rounded-[2.5rem] border backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-10 ${
            isDark
              ? "bg-zinc-950/40 border-white/5"
              : "bg-white border-black/5 shadow-sm"
          }`}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">
              Next_Initiative
            </span>
            <h4 className="text-3xl font-black uppercase tracking-tighter">
              Have a vision?
            </h4>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.5em] shadow-xl shadow-blue-500/20"
          >
            Start Uplink
          </motion.button>
        </div>
      </div>

      {/* Return Button */}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
