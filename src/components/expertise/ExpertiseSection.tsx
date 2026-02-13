import { useAbout } from "@/hooks/useAbout";
import { ExpertiseData } from "@/schemas/about.schema";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ExpertiseCard } from "./ExpertiseCard";


export const ExpertiseSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const { aboutData } = useAbout();
  return (
    <div className="space-y-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-6"
      >
        <div
          className={`h-[1px] w-24 ${theme === "dark" ? "bg-white/10" : "bg-zinc-200"}`}
        />
        <h3
          className={`text-[10px] font-black uppercase tracking-[0.8em] ${
            theme === "dark" ? "text-zinc-500" : "text-zinc-400"
          }`}
        >
          Specialization_Matrix
        </h3>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {aboutData?.expertise.map((item: ExpertiseData, index) => (
          <ExpertiseCard
            key={index}
            item={item}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
};
