"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import {
  ArrowUp,
  Briefcase,
  Code2,
  FolderKanban,
  Home,
  Mail,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import SettingsModal from "../SettingsModal";

/**
 * Magnetic component that pulls children toward the cursor
 */
const Magnetic: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Limits the pull distance
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const Tooltip: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute right-full mr-5 px-3 py-1.5 bg-zinc-900/90 backdrop-blur-xl border
             border-white/10 rounded-lg text-white text-[11px] font-semibold uppercase tracking-wider
              shadow-2xl pointer-events-none z-[60] flex items-center gap-2 w-[max-content] whitespace-nowrap"
          >
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
            {label}
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[4px] border-t-transparent border-l-[4px] border-l-zinc-900 border-b-[4px] border-b-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScrollProgressButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);

  return (
    <motion.div style={{ opacity, scale }} className="relative group">
      <Tooltip label="Back to Top">
        <Magnetic>
          <div onClick={onClick} className="cursor-pointer">
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-200
          dark:bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-white/20
          transition-all shadow-2xl group/up relative overflow-hidden"
            >
              {/* SVG Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 p-1 pointer-events-none"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray="0 1"
                  style={{ pathLength }}
                  className="text-indigo-500"
                />
              </svg>

              <ArrowUp
                className="w-4 h-4 z-10 dark:text-zinc-400 text-gray-500
          dark:group-hover/up:text-white group-hover/up:text-black
          transition-transform duration-300 group-hover/up:-translate-y-1"
              />
            </button>
          </div>
        </Magnetic>
      </Tooltip>
    </motion.div>
  );
};

const FloatingSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "About", href: "/about" },
    { icon: Code2, label: "Stack", href: "/tech-stack" },
    { icon: FolderKanban, label: "Projects", href: "/projects" },
    {
      icon: Sparkles,
      label: "AI Labs",
      href: "/ai-labs",
      isHighlight: true,
    },
    { icon: Briefcase, label: "Work", href: "/experience" },
    { icon: Mail, label: "Mail", href: "/contact" },
    { icon: Settings, label: "Settings", action: "modal" },
  ];

  // Fix: Added explicit 'Variants' type to prevent TypeScript from inferring 'type' as a generic string.
  const containerVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  // Fix: Added explicit 'Variants' type for consistency and type safety.
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: 20 },
    visible: { opacity: 1, scale: 1, x: 0 },
  };

  return (
    <>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[50] flex flex-col items-center gap-6">
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative group p-1.5"
        >
          {/* Main Container Styling */}
          <div
            className="absolute inset-0 bg-zinc-200 group-hover:bg-zinc-200 dark:bg-zinc-950/40 backdrop-blur-3xl rounded-[2rem] border border-white/10
           shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-700 dark:group-hover:bg-zinc-900/50 group-hover:border-white/20
            group-hover:shadow-indigo-500/10"
          />

          {/* Layered Inner Shine */}
          <div className="absolute inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] opacity-20 pointer-events-none" />

          <div className="relative flex flex-col gap-1 z-10">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isModal = item.action === "modal";

              return (
                <motion.div key={index} variants={itemVariants}>
                  <Tooltip label={item.label}>
                    <Magnetic>
                      {isModal ? (
                        <button
                          type="button"
                          onClick={() => setIsSettingsOpen(true)}
                          className="relative w-12 h-12 flex items-center justify-center rounded-2xl
                 transition-all duration-300 hover:bg-white/5 active:scale-90"
                        >
                          <Icon
                            className="w-[1.2rem] h-[1.2rem] text-zinc-500
                   dark:group-hover/btn:text-white group-hover/btn:text-black"
                            strokeWidth={1.5}
                          />
                        </button>
                      ) : (
                        <Link href={item.href || "/"}>
                          <button
                            className={`relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${
                              isActive
                                ? "text-white"
                                : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
                            }`}
                          >
                            <AnimatePresence mode="wait">
                              {isActive && (
                                <motion.div
                                  layoutId="active-pill"
                                  className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.4),inset_0_0_10px_rgba(255,255,255,0.2)]"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{
                                    type: "spring",
                                    bounce: 0.4,
                                    duration: 0.6,
                                  }}
                                />
                              )}
                            </AnimatePresence>

                            {/* Animated dot for active/highlights */}
                            {item.isHighlight && !isActive && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                              />
                            )}

                            <Icon
                              className="relative z-10 w-[1.2rem] h-[1.2rem]"
                              strokeWidth={isActive ? 2.2 : 1.5}
                            />

                            {/* Hover underline indicator */}
                            {!isActive && (
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white/20 rounded-full transition-all duration-300 group-hover:w-4" />
                            )}
                          </button>
                        </Link>
                      )}
                    </Magnetic>
                  </Tooltip>
                </motion.div>
              );
            })}
          </div>
        </motion.nav>

        <ScrollProgressButton
          onClick={() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }}
        />
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default FloatingSidebar;
