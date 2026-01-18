"use client";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const HeroPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      rotate: scrollY * 0.08,
      transition: { duration: 0 },
    });
  }, [scrollY, controls]);

  return (
    <section
      className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden font-space transition-colors duration-700 ${
        isDark ? "bg-[#020202] text-white" : "bg-[#fafafa] text-zinc-900"
      }`}
    >
      {/* Background Architecture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Matrix Overlay */}
        <div
          className={`absolute inset-0 opacity-[0.1] ${isDark ? "invert" : ""}`}
          style={{
            backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Rotating Geometric SVG */}
        <motion.div
          className="absolute left-[5%] top-[15%] w-[45vw] h-[45vw] opacity-[0.05]"
          animate={controls}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {[...Array(6)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${50 + i * 20},${100 + i * 25} L${100 + i * 25},${50 + i * 20} L${150 + i * 20},${100 + i * 25} L${100 + i * 25},${150 + i * 20} Z`}
                stroke={isDark ? "white" : "black"}
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Neural Glows */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className={`absolute -top-20 -right-20 w-[60vw] h-[60vw] blur-[150px] rounded-full ${isDark ? "bg-blue-600/20" : "bg-blue-400/10"}`}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div className="flex items-center gap-6">
            <div
              className={`p-4 rounded-2xl shadow-2xl ${isDark ? "bg-white text-black" : "bg-black text-white"}`}
            >
              <Terminal size={24} strokeWidth={3} className="animate-pulse" />
            </div>
            <div className="h-[1px] w-12 bg-current opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-40">
              System_Uplink_v3
            </span>
          </div>

          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-[11px] font-black uppercase tracking-[0.6em]"
            >
              Establishing Connection...
            </motion.p>
            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-[-0.04em]">
              RABBI
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: `1.5px ${isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"}`,
                }}
              >
                SIDDIQUE
              </span>
            </h1>
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              I'm a <br className="md:hidden" />
              <span className="text-blue-500">
                <TypeAnimation
                  sequence={[
                    "Full-Stack Architect",
                    2000,
                    "UX Engineer",
                    2000,
                    "System Specialist",
                    2000,
                    "Node Expert",
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  wrapper="span"
                  cursor={true}
                />
              </span>
            </h2>
          </div>

          <p className="text-lg md:text-xl font-medium max-w-lg opacity-50 leading-relaxed">
            Architecting thoughtful, high-performance web products by merging
            robust server-side logic with immersive interface design.
          </p>

          <div className="flex flex-wrap gap-8 pt-6">
            <motion.button
              onClick={() => router.push("/about")}
              whileHover={{
                scale: 1.05,
                x: 10,
                boxShadow: isDark
                  ? "0 0 40px rgba(59,130,246,0.2)"
                  : "0 20px 40px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-12 py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-6 transition-all shadow-2xl ${isDark ? "bg-white text-black" : "bg-black text-white"}`}
            >
              Access Terminal <ArrowRight size={18} strokeWidth={3} />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side: Layered Depth Profile */}
        <div className="relative flex items-center justify-center h-full min-h-[500px]">
          {/* Background Layer 1: Massive Text */}
          <motion.div
            className={`absolute top-[10%] left-0 font-black leading-none opacity-[0.04] pointer-events-none select-none z-0 ${isDark ? "text-white" : "text-black"}`}
            style={{ fontSize: "10vw" }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            FULLSTACK
          </motion.div>

          {/* Profile Representation Layer (Placeholder Circle for now, can be Image) */}
          <div className="relative z-10 w-full flex justify-center">
            <div className="relative group">
              <div
                className={`absolute -inset-8 blur-3xl rounded-full opacity-20 transition-all group-hover:opacity-40 ${isDark ? "bg-blue-600" : "bg-blue-400"}`}
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className={`w-64 h-64 md:w-96 md:h-96 rounded-[4rem] overflow-hidden border-2 shadow-3xl relative z-10 ${
                  isDark
                    ? "bg-zinc-900 border-white/10"
                    : "bg-white border-zinc-200"
                }`}
              >
                <img
                  src="https://picsum.photos/800/800?grayscale"
                  alt="Operator"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale"
                />
              </motion.div>
            </div>
          </div>

          {/* Foreground Layer 2: Massive Text Overlay */}
          <motion.div
            className={`absolute bottom-[15%] right-0 font-black leading-none opacity-[0.04] pointer-events-none select-none z-20 ${isDark ? "text-white" : "text-black"}`}
            style={{ fontSize: "10vw" }}
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            ENGINEER
          </motion.div>

          {/* Kinetic HUD Details */}
        </div>
      </div>

      {/* Aesthetic Bottom Border */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 transition-all ${isDark ? "bg-white/5" : "bg-black/5"}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "circOut" }}
          className="h-full bg-blue-500/30"
        />
      </div>
    </section>
  );
};

export default HeroPage;
