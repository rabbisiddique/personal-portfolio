"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Eye, Play } from "lucide-react";
import React from "react";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  index: number;
  isActive: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isDark,
  index,
  isActive,
}) => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center p-6 md:p-12 relative select-none overflow-hidden">
      {/* Ghost Background Digit - Increased visibility slightly */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        data-swiper-parallax="-30%"
      >
        <span
          className={`text-[35vw] font-black leading-none select-none font-space transition-colors duration-1000 ${
            isDark ? "text-white/[0.04]" : "text-black/[0.03]"
          }`}
        >
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="max-w-[1300px] w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 py-24">
        {/* Project Visual Engine */}
        <div className="relative group" data-swiper-parallax="-15%">
          <div
            className={`relative aspect-video overflow-hidden rounded-[2.5rem] transition-all duration-1000 shadow-2xl ${
              isDark
                ? "bg-zinc-950 border border-white/5"
                : "bg-white border border-black/5 shadow-black/5"
            }`}
          >
            <motion.img
              animate={{
                scale: isActive ? 1 : 1.1,
                filter: isActive
                  ? "saturate(1) brightness(1) blur(0px)"
                  : "saturate(0.5) brightness(0.4) blur(10px)",
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80`}
            />
          </div>
          {/* HUD Brackets */}
          <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-blue-500/30" />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-blue-500/30" />
        </div>

        {/* Project Intel Layer */}
        <motion.div
          className="flex flex-col items-start"
          data-swiper-parallax="-40%"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0.2, // Keep partially visible so user can see it coming
            x: isActive ? 0 : 30, // Reduced offset to prevent clipping
            scale: isActive ? 1 : 0.95,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-8 w-full">
            <div className="space-y-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-[2px] bg-blue-500" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.8em]">
                  {project.category}
                </span>
              </div>
              <h3
                className={`text-4xl md:text-7xl font-space font-black leading-[0.9] uppercase tracking-tighter ${isDark ? "text-white" : "text-black"}`}
              >
                {project.title.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {i % 2 !== 0 ? (
                      <span
                        className="text-transparent"
                        style={{
                          WebkitTextStroke: isDark
                            ? "1.5px #FFFFFF"
                            : "1.5px #000000",
                        }}
                      >
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </h3>
            </div>

            <p
              className={`text-lg font-medium max-w-lg leading-relaxed opacity-50 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
            >
              {project.description}
            </p>

            {/* Tactical Actions */}
            <div className="flex flex-wrap items-center gap-8 md:gap-10">
              <div className="flex gap-4">
                {[
                  { icon: Eye, link: project.links.demo, label: "PRVW" },
                  { icon: Code2, link: project.links.github, label: "CODE" },
                  { icon: Play, link: project.links.video, label: "DEMO" },
                ].map((action, i) => (
                  <motion.button
                    key={i}
                    whileHover={action.link ? { y: -4, scale: 1.1 } : {}}
                    whileTap={action.link ? { scale: 0.95 } : {}}
                    onClick={() =>
                      action.link && window.open(action.link, "_blank")
                    }
                    className={`group/btn relative w-12 h-12 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 ${
                      action.link
                        ? isDark
                          ? "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                          : "bg-white border-zinc-200 text-zinc-500 hover:border-blue-500 hover:text-blue-600 shadow-xl shadow-blue-500/5"
                        : "opacity-10 cursor-not-allowed grayscale"
                    }`}
                  >
                    <action.icon size={20} strokeWidth={2} />
                    <span className="absolute -bottom-6 text-[7px] font-black uppercase tracking-[0.3em] opacity-0 group-hover/btn:opacity-60 transition-opacity whitespace-nowrap">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div
                className={`hidden md:block h-12 w-[1px] ${isDark ? "bg-white/10" : "bg-black/10"}`}
              />

              <button
                onClick={() =>
                  project.links.demo &&
                  window.open(project.links.demo, "_blank")
                }
                className="flex items-center gap-4 group/uplink"
              >
                <span
                  className={`text-[9px] font-black uppercase tracking-[0.5em] transition-colors ${
                    isDark
                      ? "text-zinc-600 group-hover/uplink:text-white"
                      : "text-zinc-400 group-hover/uplink:text-black"
                  }`}
                >
                  Visit_Live
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-blue-500 transition-transform group-hover/uplink:translate-x-1 group-hover/uplink:-translate-y-1"
                />
              </button>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-x-3 gap-y-3 pt-8 border-t border-current/5 w-full">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? "bg-white/5 border-white/5 text-zinc-500 hover:border-blue-500/40 hover:text-blue-400"
                      : "bg-zinc-50 border-black/5 text-zinc-400 hover:border-blue-500/20 hover:text-blue-600 shadow-sm"
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  <span className="text-[10px] font-black uppercase tracking-tight">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCard;
