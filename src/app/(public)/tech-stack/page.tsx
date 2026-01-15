"use client";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Layers,
  Rocket,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const TechStack = () => {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative py-32 px-6 z-10 overflow-hidden bg-background">
      {/* Particles.js Background */}
      <div id="tech-particles" className="absolute inset-0 opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div
              className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary"
              style={{
                boxShadow:
                  "inset 0 2px 8px rgba(255, 255, 255, 0.3), inset 0 -2px 8px rgba(0, 0, 0, 0.3), 0 0 40px rgba(139, 92, 246, 0.4)",
              }}
            >
              <Layers className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-primary">Tech Arsenal</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technologies powering lightning-fast, scalable, and
            beautiful applications
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-3"
          >
            {techCategories.map((category, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                whileHover={{ x: 10 }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeCategory === idx
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary"
                    : "bg-card/50 border border-border hover:border-primary/30"
                }`}
                style={{
                  boxShadow:
                    activeCategory === idx
                      ? "inset 0 2px 6px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(139, 92, 246, 0.2)"
                      : "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}
                    style={{
                      boxShadow:
                        "inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div
                      className={`font-bold text-sm ${
                        activeCategory === idx
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {category.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {category.count} tools
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Center - Tech Stack Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div
              className="relative h-[600px] rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border p-8"
              style={{
                boxShadow:
                  "inset 0 2px 12px rgba(0, 0, 0, 0.1), inset 0 -2px 12px rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Orbiting Tech Icons */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Center Core */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute"
                >
                  <div
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center"
                    style={{
                      boxShadow:
                        "inset 0 4px 12px rgba(255, 255, 255, 0.3), inset 0 -4px 12px rgba(0, 0, 0, 0.3), 0 0 60px rgba(139, 92, 246, 0.6)",
                    }}
                  >
                    <Code2 className="w-16 h-16 text-white" />
                  </div>
                </motion.div>

                {/* Orbiting Technologies */}
                {techCategories[activeCategory].technologies.map(
                  (tech, idx) => {
                    const angle =
                      (idx /
                        techCategories[activeCategory].technologies.length) *
                      2 *
                      Math.PI;
                    const radius = 180;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          x,
                          y,
                        }}
                        transition={{
                          delay: idx * 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                        whileHover={{ scale: 1.3, zIndex: 10 }}
                        className="absolute"
                      >
                        <div
                          className={`w-20 h-20 rounded-full bg-gradient-to-br ${tech.color} flex items-center justify-center cursor-pointer group`}
                          style={{
                            boxShadow:
                              "inset 0 2px 6px rgba(255, 255, 255, 0.4), inset 0 -2px 6px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <span className="text-white font-bold text-xs">
                            {tech.icon}
                          </span>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="px-3 py-1 bg-foreground text-background text-xs rounded-full font-medium">
                              {tech.name}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </motion.div>

          {/* Right - Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div
                className="p-8 rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border"
                style={{
                  boxShadow:
                    "inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 8px rgba(255, 255, 255, 0.05)",
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${techCategories[activeCategory].color}`}
                    style={{
                      boxShadow:
                        "inset 0 2px 6px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {React.createElement(techCategories[activeCategory].icon, {
                      className: "w-8 h-8 text-white",
                    })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-foreground mb-2">
                      {techCategories[activeCategory].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {techCategories[activeCategory].purpose}
                    </p>
                  </div>
                </div>
                <p className="text-foreground/80 italic border-l-4 border-primary pl-4">
                  {techCategories[activeCategory].oneLiner}
                </p>
              </div>

              {/* Technology Cards */}
              <div className="grid grid-cols-2 gap-4">
                {techCategories[activeCategory].technologies.map(
                  (tech, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      className="group relative overflow-hidden rounded-xl bg-card/70 backdrop-blur-sm border border-border hover:border-primary/50 p-4 cursor-pointer"
                      style={{
                        boxShadow:
                          "inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3`}
                          style={{
                            boxShadow:
                              "inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <span className="text-white font-bold text-sm">
                            {tech.icon}
                          </span>
                        </div>
                        <div className="font-bold text-foreground">
                          {tech.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tech.level}
                        </div>

                        {/* Skill Level Bar */}
                        <div
                          className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden"
                          style={{
                            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: tech.proficiency }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className={`h-full bg-gradient-to-r ${tech.color}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20"
                  style={{
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="text-2xl font-black text-primary">
                    {techCategories[activeCategory].technologies.length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Technologies
                  </div>
                </div>
                <div
                  className="text-center p-4 rounded-xl bg-secondary/10 border border-secondary/20"
                  style={{
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="text-2xl font-black text-secondary">Pro</div>
                  <div className="text-xs text-muted-foreground">
                    Proficiency
                  </div>
                </div>
                <div
                  className="text-center p-4 rounded-xl bg-accent/10 border border-accent/20"
                  style={{
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="text-2xl font-black text-accent">5+</div>
                  <div className="text-xs text-muted-foreground">Years Exp</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-foreground mb-2">
              Full Stack Capabilities
            </h3>
            <p className="text-muted-foreground">
              End-to-end development with modern technologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {fullStackCapabilities.map((capability, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border p-8"
                style={{
                  boxShadow:
                    "inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 8px rgba(255, 255, 255, 0.05), 0 8px 24px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div
                    className={`inline-block p-4 rounded-xl bg-gradient-to-br ${capability.color} mb-4`}
                    style={{
                      boxShadow:
                        "inset 0 2px 6px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <capability.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {capability.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {capability.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Data
const techCategories = [
  {
    icon: Code2,
    title: "Frontend",
    purpose: "UI & UX Excellence",
    color: "from-blue-500 to-cyan-600",
    count: 8,
    technologies: [
      {
        name: "React",
        icon: "⚛️",
        color: "from-blue-400 to-blue-600",
        level: "Expert",
        proficiency: "95%",
      },
      {
        name: "Next.js",
        icon: "▲",
        color: "from-slate-700 to-black",
        level: "Expert",
        proficiency: "92%",
      },
      {
        name: "TypeScript",
        icon: "TS",
        color: "from-blue-500 to-blue-700",
        level: "Advanced",
        proficiency: "88%",
      },
      {
        name: "Tailwind",
        icon: "TW",
        color: "from-cyan-400 to-blue-500",
        level: "Expert",
        proficiency: "95%",
      },
      {
        name: "HTML5",
        icon: "H",
        color: "from-orange-500 to-red-500",
        level: "Expert",
        proficiency: "100%",
      },
      {
        name: "CSS3",
        icon: "C",
        color: "from-blue-600 to-indigo-600",
        level: "Expert",
        proficiency: "95%",
      },
      {
        name: "Framer",
        icon: "F",
        color: "from-purple-500 to-pink-500",
        level: "Advanced",
        proficiency: "85%",
      },
      {
        name: "shadcn",
        icon: "UI",
        color: "from-slate-600 to-slate-800",
        level: "Expert",
        proficiency: "90%",
      },
    ],
    oneLiner:
      "Crafting pixel-perfect, performant interfaces with modern frameworks",
  },
  {
    icon: Terminal,
    title: "Backend",
    purpose: "Scalable Server Logic",
    color: "from-green-500 to-emerald-600",
    count: 5,
    technologies: [
      {
        name: "Node.js",
        icon: "N",
        color: "from-green-500 to-green-700",
        level: "Expert",
        proficiency: "90%",
      },
      {
        name: "Express",
        icon: "E",
        color: "from-gray-600 to-gray-800",
        level: "Advanced",
        proficiency: "85%",
      },
      {
        name: "GraphQL",
        icon: "GQL",
        color: "from-pink-500 to-purple-600",
        level: "Advanced",
        proficiency: "82%",
      },
      {
        name: "REST",
        icon: "API",
        color: "from-blue-500 to-indigo-600",
        level: "Expert",
        proficiency: "93%",
      },
      {
        name: "JWT",
        icon: "🔐",
        color: "from-orange-500 to-red-600",
        level: "Advanced",
        proficiency: "87%",
      },
    ],
    oneLiner: "Building secure, scalable APIs with modern authentication",
  },
  {
    icon: Database,
    title: "Database",
    purpose: "Data Management",
    color: "from-purple-500 to-indigo-600",
    count: 4,
    technologies: [
      {
        name: "PostgreSQL",
        icon: "PG",
        color: "from-blue-600 to-blue-800",
        level: "Advanced",
        proficiency: "85%",
      },
      {
        name: "MongoDB",
        icon: "M",
        color: "from-green-500 to-green-700",
        level: "Advanced",
        proficiency: "82%",
      },
      {
        name: "Prisma",
        icon: "P",
        color: "from-indigo-500 to-purple-600",
        level: "Advanced",
        proficiency: "88%",
      },
      {
        name: "Supabase",
        icon: "S",
        color: "from-emerald-500 to-teal-600",
        level: "Advanced",
        proficiency: "80%",
      },
    ],
    oneLiner: "Efficient data modeling with both SQL and NoSQL solutions",
  },
  {
    icon: Rocket,
    title: "DevOps",
    purpose: "Deployment & CI/CD",
    color: "from-orange-500 to-red-600",
    count: 4,
    technologies: [
      {
        name: "Git",
        icon: "G",
        color: "from-orange-600 to-red-600",
        level: "Expert",
        proficiency: "95%",
      },
      {
        name: "GitHub",
        icon: "GH",
        color: "from-slate-700 to-black",
        level: "Expert",
        proficiency: "92%",
      },
      {
        name: "Vercel",
        icon: "V",
        color: "from-black to-slate-900",
        level: "Advanced",
        proficiency: "90%",
      },
      {
        name: "Docker",
        icon: "🐳",
        color: "from-blue-500 to-blue-700",
        level: "Intermediate",
        proficiency: "75%",
      },
    ],
    oneLiner: "Streamlined deployments from development to production",
  },
];

const fullStackCapabilities = [
  {
    icon: Zap,
    title: "Lightning Performance",
    description:
      "Optimized for speed with lazy loading, code splitting, and efficient rendering",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Industry-standard security practices with authentication, encryption, and validation",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Built to scale globally with CDN integration and optimized delivery",
    color: "from-blue-500 to-purple-600",
  },
];

export default TechStack;
