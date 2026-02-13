"use client";

import PagesLoading from "@/components/public/loading/PagesLoading";
import BackgroundMatrix from "@/components/techs/BackgroundMatrix";
import HoloCard from "@/components/techs/HoloCard";
import LogoGrid from "@/components/techs/LogoGrid";
import SectionHeader from "@/components/techs/SectionHeader";
import Sidebar from "@/components/techs/Sidebar";
import StatsHUD from "@/components/techs/StatsHUD";
import { mergeCategoriesWithData } from "@/data/tech.data";
import { useTech } from "@/hooks/useTech";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { TechItem } from "../../../../admin.types";

const TechStack = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { teches, isLoading } = useTech();
  console.log("mainpage", teches);

  // Merge DB data with static category metadata
  const categories = useMemo(() => {
    if (!teches || teches.length === 0) return [];
    return mergeCategoriesWithData(teches);
  }, [teches]);

  const currentCategory = useMemo(
    () => categories[activeTab] || categories[0],
    [activeTab, categories],
  );

  // Aggregate all techs for the 'Stack' view
  const allTechs = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== "stack")
      .flatMap((cat) => cat.techs);
  }, [categories]);

  const isStackView = currentCategory?.id === "stack";

  if (isLoading) {
    return <PagesLoading isDark="dark" />;
  }

  return (
    <div
      className={`relative min-h-screen flex flex-col lg:flex-row overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#050505] text-white" : "bg-[#f5f5f7] text-zinc-900"
      }`}
    >
      {/* Visual Ambiance Layer */}
      <BackgroundMatrix />

      {/* Texture Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] ${
          theme === "light" ? "invert" : ""
        }`}
      />

      {/* 1. The Command Sidebar */}
      <Sidebar
        categories={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentDescription={currentCategory?.description || ""}
      />

      {/* 2. Main Content Viewport */}
      <main className="flex-1 relative w-full overflow-x-hidden overflow-y-auto lg:h-screen custom-scrollbar scroll-smooth">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:px-20 lg:py-24">
          {/* Section Heading */}
          <SectionHeader
            subtitle="Teches Infrastructure"
            title={currentCategory?.title || ""}
            suffix={isStackView ? "Wall" : "Matrix"}
          />

          {/* Content Area */}
          <div className="mt-16 min-h-[60vh]">
            <AnimatePresence mode="wait">
              {isStackView ? (
                <motion.div
                  key="stack-grid"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                >
                  <LogoGrid
                    techs={allTechs}
                    accentColor={currentCategory?.accentColor}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={`${activeTab}-${theme}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-32"
                >
                  {currentCategory?.techs.map((tech: TechItem, i: number) => (
                    <HoloCard
                      key={tech.id}
                      tech={tech}
                      index={i}
                      accentColor={currentCategory.accentColor}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats & Metadata Footer */}
          <div className="mt-12">
            <StatsHUD
              techCount={
                isStackView
                  ? allTechs.length
                  : currentCategory?.techs.length || 0
              }
              avgLevel={
                currentCategory?.techs.length
                  ? Math.round(
                      currentCategory.techs.reduce(
                        (a, b) => a + (b.level || 0),
                        0,
                      ) / currentCategory.techs.length,
                    )
                  : 0
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechStack;
