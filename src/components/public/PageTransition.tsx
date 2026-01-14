"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(false);

  // Reset content visibility on route change
  useEffect(() => {
    setShowContent(false);
  }, [pathname]);

  const panels = [
    { delay: 0, direction: "bottom", color: "bg-black" },
    { delay: 0.08, direction: "top", color: "bg-black" },
    { delay: 0.16, direction: "bottom", color: "bg-black" },
    { delay: 0.24, direction: "top", color: "bg-black" },
    { delay: 0.32, direction: "bottom", color: "bg-black" },
    { delay: 0.4, direction: "top", color: "bg-black" },
  ];

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        {/* Panels (COVER FIRST) */}
        <div className="fixed inset-0 z-50 pointer-events-none">
          {panels.map((panel, index) => (
            <motion.div
              key={index}
              initial={{
                y: panel.direction === "bottom" ? "100%" : "-100%",
              }}
              animate={{
                y:
                  panel.direction === "bottom"
                    ? ["100%", "0%", "-100%"]
                    : ["-100%", "0%", "100%"],
              }}
              transition={{
                duration: 1.1,
                delay: panel.delay,
                times: [0, 0.35, 1],
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={() => {
                if (index === panels.length - 1) {
                  setShowContent(true);
                }
              }}
              style={{
                left: `${(index / panels.length) * 100}%`,
                width: `${100 / panels.length}%`,
              }}
              className={`absolute inset-y-0 ${panel.color}`}
            />
          ))}
        </div>

        {/* Page content (LOCKED until panels finish) */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
