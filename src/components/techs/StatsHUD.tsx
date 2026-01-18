import { motion } from "framer-motion";
import { Cpu, Layers, Target } from "lucide-react";
import React from "react";

interface StatsHUDProps {
  techCount: number;
  avgLevel: number;
}

const StatsHUD: React.FC<StatsHUDProps> = ({ techCount, avgLevel }) => {
  const stats = [
    {
      icon: Cpu,
      label: "Neural Efficiency",
      value: "99.9%",
      detail: "Optimized",
    },
    {
      icon: Target,
      label: "Stack Velocity",
      value: `${avgLevel}%`,
      detail: "High Grade",
    },
    {
      icon: Layers,
      label: "Integrated Nodes",
      value: String(techCount),
      detail: "Active",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative p-12 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 hover:bg-white hover:border-white transition-all duration-700 overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-zinc-900 group-hover:bg-black flex items-center justify-center mb-8 transition-colors duration-500">
              <stat.icon
                size={32}
                className="text-white group-hover:text-white"
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-3 group-hover:text-black transition-colors">
              {stat.label}
            </span>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black text-white group-hover:text-black font-space tracking-tighter mb-2">
                {stat.value}
              </span>
              <span className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-zinc-900 text-zinc-500 group-hover:bg-black group-hover:text-white transition-colors">
                {stat.detail}
              </span>
            </div>
          </div>

          {/* Background Decorative HUD Element */}
          <div className="absolute top-4 right-4 text-[40px] font-black opacity-[0.02] group-hover:opacity-[0.05] group-hover:text-black transition-all">
            0{i + 1}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsHUD;
