"use client";
import { cardVariants, containerVariants } from "@/animations/stagger-cards";
import { ExpertiseSection } from "@/components/expertise/ExpertiseSection";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  Code2,
  ExternalLink,
  Flag,
  Languages,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
  Terminal,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    window.addEventListener("storage", checkDarkMode);

    // Load Particles.js library
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: isDark
                ? ["#60a5fa", "#a855f7", "#ec4899"]
                : ["#3b82f6", "#7c3aed", "#db2777"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.4,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.2,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 0.8,
                size_min: 0.5,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 180,
              color: isDark ? "#a855f7" : "#7c3aed",
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab",
              },
              onclick: {
                enable: false,
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 150,
                line_linked: {
                  opacity: 0.5,
                },
              },
            },
          },
          retina_detect: true,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener("storage", checkDarkMode);
    };
  }, [isDark]);

  const personalInfo = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: "Freelance",
      value: "Available",
      color: "from-green-400 to-emerald-600",
      highlight: true,
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Age",
      value: "19 Years",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Flag className="w-5 h-5" />,
      label: "Nationality",
      value: "Bangladeshi",
      color: "from-red-400 to-pink-600",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Chhatak, Sylhet",
      color: "from-purple-400 to-indigo-600",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+880 1705 928276",
      color: "from-cyan-400 to-blue-600",
      link: "tel:+8801705928276",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "rabbisiddique@gmail.com",
      color: "from-pink-400 to-rose-600",
      link: "mailto:rabbisiddique@gmail.com",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Skype",
      value: "rabbi siddique",
      color: "from-blue-400 to-purple-600",
    },
    {
      icon: <Languages className="w-5 h-5" />,
      label: "Languages",
      value: "Bangla • English • Hindi",
      color: "from-orange-400 to-yellow-600",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Particles.js Background */}
      <div
        id="particles-js"
        className="fixed inset-0 pointer-events-none z-0"
      ></div>

      {/* Gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.95, 1.2, 1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-start lg:items-center">
            {/* Left: Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-6 py-2 bg-primary/15 border border-primary/30 rounded-full"
                style={{
                  boxShadow:
                    "inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.05)",
                }}
              >
                <span className="text-primary font-semibold flex items-center gap-2 text-sm">
                  <Terminal className="w-4 h-4" />
                  Full-Stack Developer
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h1 className="text-6xl lg:text-7xl font-black leading-tight text-foreground">
                  Rabbi
                  <br />
                  <span className="text-primary">Siddique</span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg text-muted-foreground max-w-lg leading-relaxed"
              >
                A 19-year-old innovator from Bangladesh crafting cutting-edge
                digital experiences with modern technologies. Specialized in
                building scalable, performant web applications.
              </motion.p>

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 flex-wrap border-b border-border/50 pb-4"
              >
                {[
                  { id: "about", label: "About", icon: "📝" },
                  { id: "experience", label: "Experience", icon: "💼" },
                  { id: "skills", label: "Skills", icon: "⚡" },
                  { id: "projects", label: "Projects", icon: "🚀" },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 font-semibold text-sm transition-all relative ${
                      activeTab === tab.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-x-0 -bottom-4 h-1 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 space-y-3"
              >
                {activeTab === "about" && (
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      I'm a passionate full-stack developer who loves creating
                      beautiful, functional web experiences. With expertise in
                      modern JavaScript ecosystems, I build applications that
                      are not just visually stunning but also performant and
                      scalable.
                    </p>
                    <p>
                      Currently available for freelance projects and
                      collaborations.
                    </p>
                  </div>
                )}
                {activeTab === "experience" && (
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">5+ Years</strong> of
                      web development experience
                    </p>
                    <p>
                      Worked with startups, agencies, and enterprises on diverse
                      projects ranging from landing pages to complex SaaS
                      applications.
                    </p>
                  </div>
                )}
                {activeTab === "skills" && (
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Frontend:</strong>{" "}
                      React, Next.js, TypeScript, Tailwind CSS
                    </p>
                    <p>
                      <strong className="text-foreground">Backend:</strong>{" "}
                      Node.js, Database Design, APIs
                    </p>
                    <p>
                      <strong className="text-foreground">Tools:</strong> Git,
                      Docker, Performance Optimization
                    </p>
                  </div>
                )}
                {activeTab === "projects" && (
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">50+</strong>{" "}
                      successful projects delivered
                    </p>
                    <p>
                      From interactive dashboards to e-commerce platforms, each
                      project is built with attention to detail and best
                      practices.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                  style={{
                    boxShadow:
                      "inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-secondary/20 border border-secondary/30 text-foreground font-semibold rounded-lg hover:bg-secondary/30 transition-colors"
                  style={{
                    boxShadow:
                      "inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.05)",
                  }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: Enhanced Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              {/* Top 3 Cards Grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Projects Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-xl border border-primary/30 p-6"
                  style={{
                    boxShadow:
                      "inset 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 -2px 8px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <Sparkles className="w-6 h-6 text-primary mb-3" />
                    <div className="text-4xl font-black text-primary mb-1">
                      50+
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Projects
                    </p>
                  </div>
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 backdrop-blur-xl border border-secondary/30 p-6"
                  style={{
                    boxShadow:
                      "inset 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 -2px 8px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <TrendingUp className="w-6 h-6 text-secondary mb-3" />
                    <div className="text-4xl font-black text-secondary mb-1">
                      5+
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Years
                    </p>
                  </div>
                </motion.div>

                {/* Available Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-xl border border-accent/30 p-6"
                  style={{
                    boxShadow:
                      "inset 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 -2px 8px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <Award className="w-6 h-6 text-accent mb-3" />
                    <div className="text-4xl font-black text-accent mb-1">
                      ✓
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Available
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Large Feature Cards */}
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent backdrop-blur-xl border border-primary/20 p-8"
                style={{
                  boxShadow:
                    "inset 0 2px 12px rgba(0, 0, 0, 0.2), inset 0 -2px 12px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                <div className="relative space-y-4">
                  <div
                    className="inline-block p-3 rounded-xl bg-primary/20 backdrop-blur-sm"
                    style={{
                      boxShadow:
                        "inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Code2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Full-Stack Expertise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Building complete solutions from database architecture to
                    pixel-perfect UIs with modern technologies.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <span
                      className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full"
                      style={{
                        boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      Next.js
                    </span>
                    <span
                      className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full"
                      style={{
                        boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      TypeScript
                    </span>
                    <span
                      className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full"
                      style={{
                        boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      Node.js
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/15 via-accent/5 to-transparent backdrop-blur-xl border border-accent/20 p-8"
                style={{
                  boxShadow:
                    "inset 0 2px 12px rgba(0, 0, 0, 0.2), inset 0 -2px 12px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                <div className="relative space-y-4">
                  <div
                    className="inline-block p-3 rounded-xl bg-accent/20 backdrop-blur-sm"
                    style={{
                      boxShadow:
                        "inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Zap className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Performance Obsessed
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every millisecond counts. Optimizing for speed, efficiency,
                    and seamless user experiences.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <div
                      className="flex-1 h-2 bg-accent/20 rounded-full overflow-hidden"
                      style={{
                        boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full"
                      />
                    </div>
                    <span className="text-sm font-bold text-accent">92%</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <div>
        <ExpertiseSection />
      </div>

      {/* Personal Info Grid - Enhanced */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <h2 className="text-5xl font-black mb-4 text-foreground">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's connect and discuss your next project
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {personalInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link || "#"}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.04,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.97 }}
                className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border cursor-pointer ${
                  info.highlight
                    ? "bg-gradient-to-br from-green-500/15 to-green-500/5 border-green-500/30"
                    : "bg-card/50 border-border hover:border-primary/30"
                }`}
                style={{
                  boxShadow: info.highlight
                    ? "inset 0 2px 8px rgba(0,0,0,0.15), 0 10px 30px rgba(34,197,94,0.2)"
                    : "inset 0 2px 6px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.12)",
                }}
              >
                {/* Glow sweep */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
                />

                {/* Highlight pulse */}
                {info.highlight && (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full"
                    style={{ boxShadow: "0 0 14px rgba(34,197,94,0.9)" }}
                  />
                )}

                <div className="relative p-6">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`mb-4 inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${info.color}`}
                    style={{
                      boxShadow:
                        "inset 0 2px 4px rgba(255,255,255,0.35), 0 6px 16px rgba(0,0,0,0.25)",
                    }}
                  >
                    <div className="text-white">{info.icon}</div>
                  </motion.div>

                  {/* Text */}
                  <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                    {info.label}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-foreground text-sm break-words flex-1">
                      {info.value}
                    </p>

                    {info.link && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-20"></div>
    </div>
  );
}
