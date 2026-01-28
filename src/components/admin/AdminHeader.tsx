"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Command, Menu, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = ({ setSidebarOpen, pathname }: any) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications] = useState(3);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = () => {
    if (pathname === "/" || pathname === "/admin") return "Dashboard";
    const title = pathname.replace(/^\/admin\/?/, "").replace(/\//g, " / ");
    return title || "Dashboard";
  };

  const pageTitle = getPageTitle();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-16 flex items-center justify-between px-6 lg:px-8 
      sticky top-0 z-40 bg-background/80 backdrop-blur-xl 
      border-b border-border"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />

      <div className="flex items-center gap-6 relative z-10">
        {/* Mobile menu */}
        <motion.button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground 
          hover:text-foreground hover:bg-muted/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={20} />
        </motion.button>

        {/* Page title */}
        <div className="flex flex-col">
          <motion.span
            className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {pathname === "/" || pathname === "/admin" ? "Overview" : "Section"}
          </motion.span>
          <motion.h1
            className="text-lg lg:text-xl font-bold capitalize mt-0.5"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {pageTitle}
          </motion.h1>
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        {/* Time */}
        <motion.div
          className="hidden xl:flex flex-col items-end text-right mr-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs font-semibold text-foreground">
            {time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            {time.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className={`hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl
          border transition-all duration-200
          ${
            searchFocused
              ? "bg-background border-primary/50 ring-2 ring-primary/10 w-72"
              : "bg-muted/30 border-border w-64"
          }`}
        >
          <motion.div
            animate={{ scale: searchFocused ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Search
              size={16}
              className={`transition-colors duration-200 ${
                searchFocused ? "text-primary" : "text-muted-foreground"
              }`}
            />
          </motion.div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm font-medium border-none outline-none flex-1 
            placeholder:text-muted-foreground/50"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-muted/50 border border-border/50">
            <Command size={10} className="text-muted-foreground" />
            <span className="text-[10px] font-semibold text-muted-foreground">
              K
            </span>
          </div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.28 }}
        >
          <ThemeToggle />
        </motion.div>

        {/* Notifications */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative p-2.5 rounded-xl text-muted-foreground 
          hover:text-foreground hover:bg-muted/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell size={20} />
          <AnimatePresence>
            {notifications > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1
                bg-primary text-background rounded-full
                flex items-center justify-center text-[10px] font-bold
                shadow-sm"
              >
                {notifications > 9 ? "9+" : notifications}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Create button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl
          bg-primary hover:bg-primary/90 text-primary-foreground
          font-semibold text-sm transition-all shadow-sm hover:shadow-md"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>New</span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
