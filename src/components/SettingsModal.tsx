"use client";

import { motion } from "framer-motion";
import { Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme || "dark";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <DialogTitle className="text-2xl">Theme Settings</DialogTitle>
              <DialogDescription>
                Choose your preferred appearance
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-6">
          {/* Dark Mode */}
          <motion.button
            onClick={() => setTheme("dark")}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
              currentTheme === "dark"
                ? "ring-4 ring-primary shadow-xl shadow-primary/30"
                : "ring-2 ring-border hover:ring-primary/50"
            }`}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Animated stars */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full"
              />
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-12 right-12 w-1.5 h-1.5 bg-white rounded-full"
              />

              {/* Icon */}
              <motion.div
                animate={currentTheme === "dark" ? { rotate: [0, 360] } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl w-fit shadow-xl"
              >
                <Moon size={28} className="text-white" strokeWidth={2} />
              </motion.div>

              {/* Color preview */}
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-lg bg-gray-950 border-2 border-white/10 shadow-lg" />
                <div className="w-10 h-10 rounded-lg bg-slate-800 border-2 border-white/10 shadow-lg" />
                <div className="w-10 h-10 rounded-lg bg-indigo-500 border-2 border-white/10 shadow-lg" />
              </div>
            </div>

            {/* Label */}
            <div className="px-4 py-3 bg-gray-900/80 backdrop-blur-md border-t border-white/5">
              <p
                className={`font-bold ${
                  currentTheme === "dark" ? "text-primary" : "text-white"
                }`}
              >
                Dark Mode
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Easy on the eyes</p>
            </div>

            {/* Selection indicator */}
            {currentTheme === "dark" && (
              <motion.div
                layoutId="themeSelector"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>

          {/* Light Mode */}
          <motion.button
            onClick={() => setTheme("light")}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
              currentTheme === "light"
                ? "ring-4 ring-amber-500 shadow-xl shadow-amber-500/30"
                : "ring-2 ring-border hover:ring-amber-500/50"
            }`}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Animated rays */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-24 bg-gradient-to-b from-amber-400 to-transparent"
                      style={{
                        transform: `rotate(${i * 45}deg)`,
                        transformOrigin: "center 48px",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Icon */}
              <motion.div
                animate={
                  currentTheme === "light"
                    ? {
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
                className="relative p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl w-fit shadow-xl"
              >
                <Sun size={28} className="text-white" strokeWidth={2} />
              </motion.div>

              {/* Color preview */}
              <div className="flex gap-2 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 shadow-lg" />
                <div className="w-10 h-10 rounded-lg bg-gray-100 border-2 border-gray-200 shadow-lg" />
                <div className="w-10 h-10 rounded-lg bg-amber-500 border-2 border-gray-200 shadow-lg" />
              </div>
            </div>

            {/* Label */}
            <div className="px-4 py-3 bg-white/80 backdrop-blur-md border-t border-gray-200">
              <p
                className={`font-bold ${
                  currentTheme === "light" ? "text-amber-600" : "text-gray-900"
                }`}
              >
                Light Mode
              </p>
              <p className="text-xs text-gray-600 mt-0.5">Bright and clear</p>
            </div>

            {/* Selection indicator */}
            {currentTheme === "light" && (
              <motion.div
                layoutId="themeSelector"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        </div>

        {/* Info box */}
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 mt-2">
          <p className="text-sm text-muted-foreground">
            💡 Your theme preference is saved automatically
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
