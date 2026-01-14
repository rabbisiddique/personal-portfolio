"use client";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const roles = [
  { text: "Full-Stack Developer", icon: "💻" },
  { text: "Web Designer", icon: "🖌️" },
  { text: "Frontend Developer", icon: "⚡" },
];

// Create sequences for TypeAnimation
const textSequence = roles.flatMap((role) => [role.text, 1500]);
const iconSequence = roles.flatMap((role) => [role.icon, 1500]);

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      rotate: scrollY * 0.1,
      transition: { duration: 0 },
    });
  }, [scrollY, controls]);

  return (
    <section
      id="home"
      className="min-h-screen w-full bg-background text-foreground overflow-x-hidden relative m-0 p-0"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden m-0 p-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat  dark:opacity-[0.4] m-0 p-0"
          style={{ backgroundImage: "url('/portfolio-background.jpg')" }}
        />

        {/* Animated Geometric Overlay */}
        <motion.div
          className="absolute left-0 top-1/4 w-96 h-96"
          animate={controls}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-20">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="100%" stopColor="#ff8c42" />
              </linearGradient>
            </defs>
            {[...Array(6)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${50 + i * 15},${100 + i * 20} L${100 + i * 20},${
                  50 + i * 15
                } L${150 + i * 15},${100 + i * 20} L${100 + i * 20},${
                  150 + i * 15
                } Z`}
                stroke="url(#lineGrad)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </svg>
        </motion.div>

        <motion.div
          className="absolute right-1/4 bottom-0 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-12 md:py-16">
        <div className="w-full max-w-7xl grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-end pb-8 md:pb-12"
          >
            <motion.p
              className="text-muted-foreground text-lg mb-4 tracking-wider font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              HELLO
            </motion.p>

            <h1 className="text-6xl font-heading font-semibold tracking-tight text-gray-400 dark:text-white">
              I'm Rabbi Siddique
            </h1>

            <motion.div
              className="relative inline-block mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h2
                className="text-[35px] font-body md:text-5xl lg:text-6xl xl:text-5xl font-bold leading-tight relative overflow-visible"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                I'm a{" "}
                <span className="relative whitespace-nowrap">
                  {/* TypeAnimation text (cursor visible) */}
                  <TypeAnimation
                    sequence={[
                      "FullStack Developer",
                      1500,
                      "Web Designer",
                      1500,
                      "Frontend Developer",
                      1500,
                    ]}
                    speed={70}
                    deletionSpeed={50}
                    repeat={Infinity}
                    cursor={true}
                    wrapper="span"
                    className="text-primary relative z-10 [&>span:first-child]:text-2xl md:[&>span:first-child]:text-4xl lg:[&>span:first-child]:text-5xl xl:[&>span:first-child]:text-4xl"
                    style={{
                      display: "inline-block",
                    }}
                  />

                  {/* Gradient overlay with transition */}
                  <motion.span
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent pointer-events-none z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  ></motion.span>
                </span>
              </motion.h2>
            </motion.div>

            <motion.p
              className="text-muted-foreground font-heading text-base font-light md:text-lg mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              I build thoughtful, scalable web products—combining strong
              frontend, reliable backends, and practical AI.
            </motion.p>

            <motion.button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-3 text-base md:text-lg font-semibold shadow-lg hover:shadow-primary/50 transition-all w-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          <motion.div
            className="relative flex items-end justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full flex items-end justify-center md:justify-end">
              {/* Floating Text Elements - Top (Behind head) */}
              <motion.div
                className="
    absolute top-28
    left-[70px] right-0
    text-center
    font-semibold
    text-[100px]
    text-white dark:text-foreground/20
    leading-[0.9]
    select-none
    pointer-events-none
    z-10
    font-heading
  "
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div>FULLSTACK</div>
                <div>ENGINEER</div>
              </motion.div>

              {/* Profile Image - Above text */}
              <div className="relative z-20">
                <img
                  src="/banner-user-image-one.webp"
                  alt="Profile"
                  className="h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]
               w-auto object-contain object-bottom"
                />
              </div>

              {/* Floating Text Elements - Bottom (Over lower body) */}
              <motion.div
                className="
    absolute bottom-32 md:bottom-40 lg:bottom-16
    left-[70px] right-0
    text-[64px] md:text-[90px] lg:text-[120px]
    font-extrabold
    select-none
    leading-[0.85]
    dark:text-foreground/20
    text-center
    pointer-events-none
    z-30

    text-white
  "
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div>FRONTEND</div>
                <div>ENGINEER</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
