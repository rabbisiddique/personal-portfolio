"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { ExpertiseCard } from "./ExpertiseCard";

const expertise = [
  {
    icon: <Code2 className="w-10 h-10" />,
    title: "Full-Stack Development",
    description:
      "Crafting seamless, production-ready applications with modern tech stacks.",
    fullDescription:
      "I specialize in building complete web applications from frontend to backend. Using technologies like Next.js, React, TypeScript, and Node.js, I create scalable solutions that prioritize performance, maintainability, and user experience. Every project is approached with clean architecture principles and best practices.",
    stats: "Expert",
    iconBg: "bg-primary",
    accentColor: "bg-primary/20",
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Performance Optimization",
    description:
      "Lightning-fast applications that load instantly and run smoothly.",
    fullDescription:
      "Performance isn't an afterthought—it's a core principle. I optimize applications through code splitting, lazy loading, caching strategies, and efficient rendering. Whether it's reducing bundle sizes, minimizing API calls, or optimizing database queries, every millisecond counts.",
    stats: "Speed Focused",
    iconBg: "bg-accent",
    accentColor: "bg-accent/20",
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Security & Best Practices",
    description:
      "Building robust applications with security as a fundamental principle.",
    fullDescription:
      "Security is non-negotiable. I implement industry-standard practices including authentication, encryption, input validation, and secure API design. Regular code reviews, dependency audits, and staying updated with security vulnerabilities ensure your applications remain protected.",
    stats: "Security First",
    iconBg: "bg-secondary",
    accentColor: "bg-secondary/20",
  },
  {
    icon: <Rocket className="w-10 h-10" />,
    title: "Innovation Driven",
    description:
      "Always exploring cutting-edge tech to bring fresh perspectives and revolutionary solutions.",
    fullDescription:
      "Technology evolves rapidly, and I stay ahead of the curve. Whether it's Next.js 16, TypeScript enhancements, Web3 technologies, or emerging frameworks, I continuously learn and experiment. This mindset ensures your projects benefit from the latest best practices and technologies.",
    stats: "Always Learning",
    iconBg: "bg-primary/80",
    accentColor: "bg-primary/20",
  },
];

export const ExpertiseSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative  px-6 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl font-black mb-4 text-foreground">
            Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Specializing in modern web technologies with a focus on performance,
            security, and user experience.
          </p>
        </motion.div>

        {/* Cards */}
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
    </section>
  );
};
