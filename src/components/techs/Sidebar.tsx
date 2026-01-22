import { AnimatePresence, motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { Category } from "../../../types";

interface SidebarProps {
  categories: Category[];
  activeTab: number;
  onTabChange: (idx: number) => void;
  currentDescription: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeTab,
  onTabChange,
  currentDescription,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`w-full lg:w-[450px] lg:h-screen lg:sticky lg:top-0 border-r p-12 flex flex-col justify-between z-30
         backdrop-blur-3xl shadow-2xl transition-all duration-700  ${
           isDark
             ? "bg-zinc-950/80 border-white/5"
             : "bg-white/70 border-zinc-200"
         }`}
    >
      <div className="relative">
        {/* Logo Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-5 mb-24"
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-700 ${
              isDark ? "bg-white text-black" : "bg-zinc-900 text-white"
            }`}
          >
            <Terminal size={28} strokeWidth={2.5} />
          </div>
          <div>
            <span
              className={`block text-[10px] font-black uppercase tracking-[0.5em] leading-none mb-2 transition-colors ${
                isDark ? "text-white/40" : "text-zinc-400"
              }`}
            >
              System Core
            </span>
            <span
              className={`text-2xl font-black tracking-tighter uppercase font-space transition-colors ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Teches.o
            </span>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="space-y-6">
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => onTabChange(idx)}
              className="group relative flex flex-col w-full py-4 text-left transition-all active:scale-95"
            >
              <div className="flex items-center gap-4 mb-2">
                <span
                  className={`text-6xl md:text-5xl font-black tracking-tighter leading-none
                     transition-all duration-700 font-space ${
                       activeTab === idx
                         ? isDark
                           ? "text-white"
                           : "text-zinc-900"
                         : isDark
                           ? "text-zinc-800 group-hover:text-zinc-600"
                           : "text-zinc-200 group-hover:text-zinc-400"
                     }`}
                >
                  {cat.title}
                </span>
              </div>

              <div className="flex items-center gap-4 overflow-hidden">
                <AnimatePresence>
                  {activeTab === idx && (
                    <motion.div
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      exit={{ x: -100 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-8 h-[2px] rounded-full"
                        style={{ backgroundColor: cat.accentColor }}
                      />
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.4em]"
                        style={{ color: cat.accentColor }}
                      >
                        Stream Active
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Footer Area */}
      <div
        className={`mt-12 pt-12 border-t transition-colors duration-700 ${
          isDark ? "border-white/5" : "border-zinc-200"
        }`}
      ></div>

      {/* Background UI Fluff */}
    </div>
  );
};

export default Sidebar;
