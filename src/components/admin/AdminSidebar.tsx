"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronLeft, LogOut, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

interface AdminSidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  collapsible?: boolean;
}

import { supabase } from "@/lib/supabase/client";
import {
  BarChart3,
  Folder,
  Home,
  MessageSquare,
  ShoppingCart,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

export const NAV_ITEMS = [
  {
    id: "/admin",
    label: "Dashboard",
    icon: <Home size={18} />,
  },
  {
    id: "/admin/about",
    label: "About",
    icon: <BarChart3 size={18} />,
  },
  {
    id: "/admin/projects",
    label: "Projects",
    icon: <ShoppingCart size={18} />,
  },
  {
    id: "/admin/tech-stack",
    label: "Tech Stack",
    icon: <MessageSquare size={18} />,
  },
  {
    id: "/admin/ai-labs",
    label: "AI Labs",
    icon: <Folder size={18} />,
  },
  {
    id: "/admin/experience",
    label: "Experience",
    icon: <Users size={18} />,
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen = true,
  setSidebarOpen,
  collapsible = true,
}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      }
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const sidebarVariants: Variants = {
    open: { width: "16rem", transition: { duration: 0.3, ease: "easeInOut" } },
    collapsed: {
      width: "5rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    open: { opacity: 1, display: "block" },
    collapsed: { opacity: 0, transitionEnd: { display: "none" } },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen?.(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? "collapsed" : "open"}
        variants={sidebarVariants}
        className={`
          bg-background/95 backdrop-blur-xl border-r border-border 
          flex flex-col h-screen sticky top-0 z-50
          transition-all duration-300
          ${sidebarOpen ? "fixed lg:sticky" : "hidden lg:flex"}
        `}
      >
        {/* Subtle gradient overlay - adapts to theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 flex items-center gap-3 relative z-10"
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 
            rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap
              className="text-primary-foreground fill-primary-foreground"
              size={22}
            />
          </motion.div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="open"
                exit="collapsed"
              >
                <h1 className="text-lg font-bold tracking-tight">Siddique</h1>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">
                  Admin Studio
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapse Toggle */}
          {collapsible && (
            <motion.button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex ml-auto p-1.5 rounded-lg text-muted-foreground 
              hover:text-foreground hover:bg-muted/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft size={16} />
              </motion.div>
            </motion.button>
          )}
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto relative z-10">
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
              >
                <Link
                  href={item.id}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium 
                  transition-all group relative overflow-hidden
                  ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                  }`}
                  onClick={() => setSidebarOpen?.(false)}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <motion.span
                    className={`transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.span>

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        variants={contentVariants}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        className="flex-1"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && !isCollapsed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t border-border relative z-10"
        >
          {/* User Profile */}
          <motion.div
            className={`flex items-center gap-3 p-3 mb-3 rounded-xl 
            bg-muted/30 border border-border/50 ${
              isCollapsed ? "justify-center" : ""
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src="https://picsum.photos/seed/admin/100"
              className="w-9 h-9 rounded-full border-2 border-primary/20 shadow-sm"
              alt="Admin"
              whileHover={{ scale: 1.1 }}
            />

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  className="flex-1 overflow-hidden"
                >
                  <p className="text-xs font-semibold truncate">
                    Alex Sterling
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Senior Architect
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl 
            text-sm font-medium text-muted-foreground 
            hover:text-destructive hover:bg-destructive/10 
            transition-all group ${isCollapsed ? "justify-center" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
          >
            <motion.div whileHover={{ rotate: -10 }}>
              <LogOut size={18} />
            </motion.div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  variants={contentVariants}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
