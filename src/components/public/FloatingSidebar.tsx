"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Briefcase,
  Code2,
  Download,
  FolderKanban,
  Home,
  Mail,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SettingsModal from "../SettingsModal";

const FloatingSidebar = () => {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { icon: Settings, label: "Settings", action: "modal" },

    { icon: Home, label: "Home", href: "/" },

    { icon: User, label: "About Me", href: "/about" },

    { icon: Code2, label: "Tech Stack", href: "/tech" },

    { icon: FolderKanban, label: "Projects", href: "/projects" },

    { icon: Sparkles, label: "AI Features", href: "/ai-features" },

    { icon: Briefcase, label: "Experience", href: "/experience" },

    { icon: Mail, label: "Contact", href: "/contact" },

    {
      icon: Download,
      label: "Download Resume",
      href: "/download-resume",
    },
  ];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemClick = (item: any) => {
    if (item.action === "modal") {
      setIsSettingsOpen(true);
    }
  };

  return (
    <>
      <TooltipProvider delayDuration={100}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-card/80 backdrop-blur-md rounded-3xl p-2.5 shadow-xl border border-border/50">
            <div className="flex flex-col gap-1.5">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const isHighlight = item.isHighlight;
                const isModal = item.action === "modal";

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      {isModal ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleItemClick(item)}
                          className={`relative h-11 w-11 rounded-xl transition-all duration-200 hover:bg-muted text-muted-foreground hover:text-foreground`}
                        >
                          <Icon
                            size={18}
                            className="relative z-10"
                            strokeWidth={2}
                          />
                        </Button>
                      ) : (
                        <Link href={item.href!} passHref>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`relative h-11 w-11 rounded-xl transition-all duration-200
                              ${
                                isActive || isHighlight
                                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
                              }
                            `}
                          >
                            <AnimatePresence mode="wait">
                              {isActive && !isHighlight && (
                                <motion.div
                                  layoutId="activeIndicator"
                                  className="absolute inset-0 bg-primary rounded-xl"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                  }}
                                />
                              )}
                            </AnimatePresence>
                            <Icon
                              size={18}
                              className="relative z-10"
                              strokeWidth={2}
                            />
                          </Button>
                        </Link>
                      )}
                    </TooltipTrigger>

                    <TooltipContent
                      side="left"
                      className="bg-popover text-popover-foreground border-border font-medium text-sm"
                      sideOffset={8}
                    >
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Scroll to top button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={scrollToTop}
                  className="h-11 w-11 rounded-xl bg-card/80 backdrop-blur-md border border-border/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  <ArrowUp size={18} strokeWidth={2} />
                </Button>
              </TooltipTrigger>

              <TooltipContent
                side="left"
                className="bg-popover text-popover-foreground border-border font-medium text-sm"
                sideOffset={8}
              >
                <p>Scroll to Top</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </motion.div>
      </TooltipProvider>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default FloatingSidebar;
