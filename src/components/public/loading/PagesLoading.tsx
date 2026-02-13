import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const PagesLoading = ({ isDark }: { isDark: "dark" | "light" }) => {
  return (
    <>
      <section
        className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden font-space transition-colors duration-700 ${
          isDark ? "bg-[#020202] text-white" : "bg-[#fafafa] text-zinc-900"
        }`}
      >
        {/* Loading Content - Centered */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center">
          {/* Animated Terminal Icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`p-6 rounded-2xl ${
              isDark ? "bg-white/10" : "bg-black/10"
            }`}
          >
            <Terminal size={48} strokeWidth={2} />
          </motion.div>

          {/* Loading Text with Typing Effect */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <motion.div
              className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>Initializing Portfolio</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.div>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    isDark ? "bg-white" : "bg-black"
                  }`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Loading Bar */}
            <div
              className={`w-64 h-1 rounded-full overflow-hidden ${
                isDark ? "bg-white/10" : "bg-black/10"
              }`}
            >
              <motion.div
                className="h-full bg-blue-500"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* System Status */}
            <motion.p
              className="text-[10px] font-mono opacity-40 uppercase tracking-wider mt-4"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              System Status: Online
            </motion.p>
          </div>
        </div>

        {/* Aesthetic Bottom Border */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 transition-all ${isDark ? "bg-white/5" : "bg-black/5"}`}
        >
          <motion.div
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-blue-500/30"
          />
        </div>
      </section>
    </>
  );
};

export default PagesLoading;
