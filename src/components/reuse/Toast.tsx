"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ToastProps {
  type?: "success" | "error";
  title: string;
  description?: string;
  duration?: number; // auto hide in ms
  onClose?: () => void; // optional callback
}

const Toast: React.FC<ToastProps> = ({
  type = "success",
  title,
  description,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  // Call onClose only after exit animation
  const handleAnimationComplete = (definition: string) => {
    if (definition === "exit" && onClose) {
      onClose();
    }
  };

  const bgColor = type === "success" ? "bg-emerald-500/10" : "bg-red-500/10";
  const iconColor =
    type === "success"
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-red-600 dark:text-red-400";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed bottom-6 right-6 z-[10000] max-w-sm shadow-lg border border-border rounded-lg p-4 flex items-center gap-3 bg-card"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor}`}
          >
            <CheckCircle size={20} className={iconColor} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
