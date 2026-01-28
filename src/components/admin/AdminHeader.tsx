"use client";
import { motion } from "framer-motion";
import { Command, Search } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-16 flex items-center justify-between px-6 lg:px-8 
      sticky top-0 z-40  backdrop-blur-xl 
      "
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />

      {/* Left side - can add logo or title here if needed */}
      <div className="relative z-10">
        {/* Empty for now, add your logo/title here if needed */}
      </div>

      <div className="flex items-center gap-3 relative z-10">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl
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
      </div>
    </motion.header>
  );
};

export default Header;
