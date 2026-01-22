"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Database } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(false);
  const [showHUD, setShowHUD] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, resolvedTheme } = useTheme();

  // Prevent flash during hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === "system"
      ? resolvedTheme
      : theme
    : "dark";

  const columnCount = 12;
  const duration = 1.2;
  const columns = Array.from({ length: columnCount });
  const nexusEase: [number, number, number, number] = [0.65, 0, 0.35, 1];

  // Reset and manage HUD timing on route change
  useEffect(() => {
    setShowContent(false);
    setShowHUD(false);

    // Show HUD at peak coverage (50% of animation)
    const showTimer = setTimeout(() => {
      setShowHUD(true);
    }, duration * 500);

    // Hide HUD before shutters clear (75% of animation)
    const hideTimer = setTimeout(() => {
      setShowHUD(false);
    }, duration * 750);

    // Show content when transition completes
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, duration * 1000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(contentTimer);
    };
  }, [pathname, duration]);

  return (
    <div
      className={`relative w-full min-h-screen ${currentTheme === "dark" ? "bg-[#050505]" : "bg-[#ffffff]"}`}
    >
      {/* Background Wireframe */}
      <AnimatePresence>
        {showHUD && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage:
                currentTheme === "dark"
                  ? `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`
                  : `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <div key={pathname}>
          {/* Shutter System (COVER FIRST) */}
          <div className="fixed inset-0 z-[500] pointer-events-none flex">
            {columns.map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: i % 2 === 0 ? "100%" : "-100%",
                }}
                animate={{
                  y:
                    i % 2 === 0
                      ? ["100%", "0%", "-100%"]
                      : ["-100%", "0%", "100%"],
                }}
                transition={{
                  duration: duration,
                  delay: i * 0.04,
                  times: [0, 0.5, 1],
                  ease: nexusEase,
                }}
                style={{ width: `${100 / columnCount}%` }}
                className={`relative h-full ${currentTheme === "dark" ? "bg-[#050505]" : "bg-[#ffffff]"} ${currentTheme === "dark" ? "border-white/[0.03]" : "border-black/[0.03]"} border-x`}
              >
                {/* Leading Edge Glow */}
                <div
                  className={`absolute left-0 right-0 h-[250px] z-10 backdrop-blur-xl bg-gradient-to-b from-blue-500/20 via-blue-500/5
                     to-transparent shadow-[0_0_40px_rgba(59,130,246,0.4)] ${
                       i % 2 === 0 ? "top-0 rotate-180" : "bottom-0"
                     }`}
                />

                {/* Sector ID Metadata */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 font-mono font-bold text-[8px] tracking-tighter uppercase whitespace-nowrap opacity-20 ${currentTheme === "dark" ? "text-blue-500" : "text-blue-600"} ${
                    i % 2 === 0 ? "top-24" : "bottom-24"
                  }`}
                >
                  SEC_0x{i.toString(16).toUpperCase()}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central Tactical HUD */}
          <AnimatePresence>
            {showHUD && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-0 z-[600] flex flex-col items-center justify-center pointer-events-none"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`w-28 h-28 border border-dashed rounded-full ${currentTheme === "dark" ? "border-blue-500/30" : "border-blue-600/30"}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database
                      className={
                        currentTheme === "dark"
                          ? "text-blue-500"
                          : "text-blue-600"
                      }
                      size={32}
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 140 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`h-[1px] mt-10 ${currentTheme === "dark" ? "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]" : "bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]"}`}
                />

                <div className="mt-6 flex flex-col items-center gap-1">
                  <span
                    className={`text-[11px] font-black uppercase tracking-[1em] ml-4 ${currentTheme === "dark" ? "text-blue-500" : "text-blue-600"}`}
                  >
                    HOLD_BREATH
                  </span>
                  <span
                    className={`text-[8px] font-mono opacity-30 ${currentTheme === "dark" ? "text-white" : "text-black"}`}
                  >
                    SYNCING_RESOURCES...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Page Content (LOCKED until panels finish) */}
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="w-full min-h-screen relative z-10"
            >
              {children}
            </motion.div>
          )}
        </div>
      </AnimatePresence>

      {/* Luminance Pulse */}
      <AnimatePresence>
        {showHUD && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[100] pointer-events-none mix-blend-overlay ${currentTheme === "dark" ? "bg-white" : "bg-black"}`}
          />
        )}
      </AnimatePresence>

      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[999] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default PageTransition;
