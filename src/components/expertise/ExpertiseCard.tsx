import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { ExpandableContent } from "./ExpandableContent";

export const ExpertiseCard = ({
  item,
  isExpanded,
  onToggle,
}: {
  item: any;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <motion.div layout className="relative group">
      <div
        className={`rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 border backdrop-blur-xl ${
          isDark
            ? "bg-zinc-900/40 border-white/5 hover:bg-zinc-800/60 hover:border-white/20"
            : "bg-white/80 border-zinc-200 hover:bg-white hover:border-zinc-300 shadow-xl"
        }`}
      >
        <div className="space-y-6 flex-1">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center p-5 rounded-2xl text-white shadow-lg ${item.iconBg}`}
            style={{
              boxShadow:
                "inset 0 2px 6px rgba(255,255,255,.3), inset 0 -2px 6px rgba(0,0,0,.2)",
            }}
          >
            {item.icon}
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h3
                className={`text-3xl font-black tracking-tighter uppercase font-space transition-colors ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                {item.title}
              </h3>
              <span
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${item.accentColor} ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                {item.stats}
              </span>
            </div>

            <p
              className={`text-lg font-medium leading-relaxed transition-colors ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              {item.description}
            </p>

            <ExpandableContent isOpen={isExpanded}>
              <div
                className={`mt-6 pt-6 border-t transition-colors ${
                  isDark ? "border-white/10" : "border-zinc-100"
                }`}
              >
                <p
                  className={`text-base leading-relaxed italic ${
                    isDark ? "text-zinc-300" : "text-zinc-500"
                  }`}
                >
                  {item.fullDescription}
                </p>
              </div>
            </ExpandableContent>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onToggle}
          className={`mt-8 flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.3em] transition-colors ${
            isDark
              ? "text-zinc-400 hover:text-white"
              : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          {isExpanded ? "Close Spec" : "Open Specifications"}
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-500 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Glow Sweep */}
      <div
        className={`absolute inset-0 rounded-[2.5rem] pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-5 blur-3xl z-0 ${item.iconBg}`}
      />
    </motion.div>
  );
};
