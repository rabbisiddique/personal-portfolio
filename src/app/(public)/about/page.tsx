"use client";
import SmartIcon from "@/components/admin/SmartIcon";
import { ExpertiseSection } from "@/components/expertise/ExpertiseSection";
import PagesLoading from "@/components/public/loading/PagesLoading";
import { useAbout } from "@/hooks/useAbout";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Sparkles, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = () => {
  const { aboutData, isLoading } = useAbout();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useRouter();

  if (isLoading) {
    return <PagesLoading isDark="dark" />;
  }

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden font-space ${isDark ? "bg-[#020202] text-white" : "bg-[#fafafa] text-zinc-900"}`}
    >
      {/* Dynamic Grid Mapping Background */}

      <div className="relative z-10">
        {/* Hero Section: High Density */}
        <section className="relative min-h-[90vh] flex items-center pt-20 pb-40 px-8 overflow-hidden">
          {/* Background Watermark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
          >
            <h2 className="text-[30vw] font-black leading-none text-center">
              {aboutData?.hero.background_text}
            </h2>
          </motion.div>

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_400px] gap-20 items-center">
            <div className="relative">
              {/* HUD Coordinates */}

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`p-4 rounded-2xl shadow-2xl ${isDark ? "bg-white text-black" : "bg-black text-white"}`}
                  >
                    <Cpu size={28} className="animate-[pulse_4s_infinite]" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">
                      {aboutData?.hero.operator_label}
                    </div>
                    <div className="text-xl font-bold uppercase tracking-tighter italic">
                      {aboutData?.hero.role_title}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <h1
                    className={`text-[120px] lg:text-[180px] font-black leading-[0.8] tracking-[-0.05em] ${isDark ? "text-white" : "text-black"}`}
                  >
                    {aboutData?.hero.first_name}

                    <br />
                    <span
                      className="text-transparent"
                      style={{
                        WebkitTextStroke: `2px ${isDark ? "#fff" : "#000"}`,
                        opacity: 0.2,
                      }}
                    >
                      {aboutData?.hero.last_name}
                    </span>
                  </h1>
                </div>

                <p
                  className={`text-2xl lg:text-3xl font-medium leading-relaxed max-w-2xl transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  {aboutData?.hero.description}

                  {/* Bridging the gap between{" "}
                  <span className={isDark ? "text-white" : "text-black"}>
                    Complex Infrastructure
                  </span>{" "}
                  and{" "}
                  <span className={isDark ? "text-white" : "text-black"}>
                    Human-Centric Design
                  </span>
                  . Currently engineering performant systems from the digital
                  heart of Bangladesh. */}
                </p>

                <div className="flex flex-wrap gap-6 pt-6">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.5em] flex items-center gap-4 transition-all shadow-xl ${isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}
                    onClick={() => navigate.push("/contact")}
                  >
                    Let’s Talk <ArrowRight size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                    }}
                    className={`px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.5em] border transition-all ${isDark ? "border-white/10 text-white" : "border-black/10 text-black"}`}
                    onClick={() => navigate.push("/projects")}
                  >
                    View Projects
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Data Visualization Module */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Spinning Radial HUD */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-[600px] h-[600px] border border-dashed border-current rounded-full"
                />
              </div>

              <div className="space-y-6 relative z-10">
                {aboutData?.systemStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className={`p-8 rounded-3xl border backdrop-blur-2xl flex items-center justify-between group transition-all ${isDark ? "bg-zinc-900/40 border-white/5 hover:bg-zinc-800/60" : "bg-white border-black/5 shadow-xl hover:shadow-2xl"}`}
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className={`p-4 rounded-xl bg-current/10 `}
                        style={{ backgroundColor: stat.color }}
                      >
                        <SmartIcon icon={stat.icon} className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          {stat.label}
                        </div>
                        <div className="text-2xl font-black">{stat.value}</div>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrendingUp size={16} />
                    </div>
                  </motion.div>
                ))}

                <div
                  className={`p-10 rounded-[3rem] border backdrop-blur-3xl overflow-hidden relative ${isDark ? "bg-blue-600/10 border-blue-500/30" : "bg-blue-50 border-blue-200"}`}
                >
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <Sparkles className="text-blue-500 mb-2" size={32} />
                    <div className="text-6xl font-black tracking-tighter italic">
                      12+
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">
                      Project Nodes Built
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                </div>
                {/* Main Identity Badge */}
              </div>
            </motion.div>
          </div>
        </section>

        {/* System Specifications Section */}
        <section className="px-8 py-40 border-t border-b border-white/5 relative bg-white/[0.01] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <ExpertiseSection />
          </div>
          {/* Decorative Glitch lines */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        </section>

        {/* Biometric Data Grid */}
        <section className="max-w-7xl mx-auto px-8 py-40 space-y-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
                Identity Snapshot
              </h2>
              <p className="text-xl opacity-40 uppercase tracking-[0.2em] font-black">
                Get In Touch
              </p>
            </div>
            <div
              className={`h-[2px] flex-1 max-w-[400px] hidden md:block ${isDark ? "bg-white/10" : "bg-black/5"}`}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData?.personalInfo?.length === 0 ? (
              <p>No personal info available.</p>
            ) : (
              aboutData?.personalInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative p-10 rounded-[3rem] border transition-all group overflow-hidden ${isDark ? "bg-zinc-950/40 border-white/5 hover:border-white/20" : "bg-white border-black/5 shadow-lg"}`}
                >
                  {/* Parallax Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                      background: info.color.includes(",")
                        ? `linear-gradient(to right, ${info.color})`
                        : info.color,
                    }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center 
             mb-8 shadow-2xl 
             group-hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                  >
                    <SmartIcon icon={info.icon} className="w-5 h-5" size={20} />
                  </motion.div>

                  <div className="space-y-1 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
                      {info.label}
                    </span>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-black tracking-tight">
                        {info.value}
                      </p>
                      {info.highlight && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Scanline Effect on Hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-gradient-to-b from-transparent via-white/20 to-transparent h-[200%] -translate-y-full group-hover:translate-y-full transition-transform duration-[2s] ease-linear" />
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center pt-20"
          >
            <div
              className={`h-24 w-[1px] mb-12 ${isDark ? "bg-white/10" : "bg-black/10"}`}
            />
            <div className="text-[10px] font-black uppercase tracking-[1em] opacity-20">
              EndOfBuffer
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
