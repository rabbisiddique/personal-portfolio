import { motion } from "framer-motion";
import { Code2, Rocket, Shield, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ExpertiseCard } from "./ExpertiseCard";

const expertise = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Full-Stack Dev",
    description:
      "Crafting seamless, production-ready applications with modern tech stacks.",
    fullDescription:
      "I specialize in building complete web applications from frontend to backend. Using technologies like Next.js, React, TypeScript, and Node.js, I create scalable solutions that prioritize performance, maintainability, and user experience.",
    stats: "Expert Grade",
    iconBg: "bg-blue-600",
    accentColor: "bg-blue-500/20",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Optimization",
    description:
      "Lightning-fast applications that load instantly and run smoothly.",
    fullDescription:
      "Performance isn't an afterthought—it's a core principle. I optimize applications through code splitting, lazy loading, caching strategies, and efficient rendering.",
    stats: "Turbo Mode",
    iconBg: "bg-amber-500",
    accentColor: "bg-amber-500/20",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Security Core",
    description:
      "Building robust applications with security as a fundamental principle.",
    fullDescription:
      "Security is non-negotiable. I implement industry-standard practices including authentication, encryption, input validation, and secure API design.",
    stats: "Level A",
    iconBg: "bg-purple-600",
    accentColor: "bg-purple-500/20",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Innovation",
    description:
      "Always exploring cutting-edge tech to bring revolutionary solutions.",
    fullDescription:
      "Technology evolves rapidly, and I stay ahead of the curve. Whether it's Next.js enhancements, Web3, or AI integration, I continuously learn and experiment.",
    stats: "Pioneer",
    iconBg: "bg-rose-500",
    accentColor: "bg-rose-500/20",
  },
];

export const ExpertiseSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { theme } = useTheme();
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
        {expertise.map((item, index) => (
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
