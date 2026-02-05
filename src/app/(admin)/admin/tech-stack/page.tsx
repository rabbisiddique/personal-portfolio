"use client";
import {
  createTechAction,
  deleteTechAction,
  updateTechAction,
} from "@/action/admin/tech.action";
import { ProjectCardSkeleton } from "@/components/admin/loading/SkeletonProjectCard";
import { TechForm } from "@/components/admin/TechStackForm";
import Modal from "@/components/reuse/Modal";
import { useTech } from "@/hooks/useTech";
import { TechStackFormData } from "@/schemas/tech.schema";
import { handleErrorWithToast } from "@/utils/handleErrorWithToast";
import { AnimatePresence, motion } from "framer-motion";
import { Edit3, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { TechItem } from "../../../../../admin.types";
import { TECH_CATEGORIES } from "../../../../../constants";

const AdminTechStackPage: React.FC = () => {
  const { teches, isLoading } = useTech();
  console.log("tech", teches);

  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<TechItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredTechs = teches.filter((t) => {
    const category = t.category?.toLowerCase() ?? "";
    const title = t.title?.toLowerCase() ?? "";
    const searchTerm = search?.toLowerCase().trim() ?? "";

    const matchesSearch = !searchTerm || title.includes(searchTerm);
    const matchesCategory =
      activeTab === "all" || category === activeTab.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleSubmitForm = async (formData: TechStackFormData) => {
    setIsSubmitting(true);
    try {
      if (editingTech) {
        const res = await updateTechAction(formData, editingTech?.id);
        console.log(res);
        if (res.success && res.message) {
          toast.success(res.message);
        }
      } else {
        const res = await createTechAction(formData);
        console.log(res);
        if (res.success && res.message) {
          toast.success(res.message);
        }
      }
      setIsModalOpen(false);
    } catch (error: unknown) {
      handleErrorWithToast(error, "error in handleSumbitForm techStack");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (tech: TechItem) => {
    setEditingTech(tech);
    setIsModalOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    try {
      const res = await deleteTechAction(projectId);

      if (res.success && res.message) {
        toast.success(res.message);
      }
    } catch (error: unknown) {
      handleErrorWithToast(error, "Error deleting tech in frontend");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Technology Stack
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your skills and technologies
          </p>
        </div>
        <motion.button
          onClick={() => {
            setEditingTech(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} />
          Add Technology
        </motion.button>
      </div>

      {/* Filters Bar */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              key="all"
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              All
            </button>

            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {cat} {/* display capitalized */}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">
            Total Technologies
          </p>
          <p className="text-2xl font-bold text-foreground">{teches.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Categories</p>
          <p className="text-2xl font-bold text-foreground">{teches.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Filtered Results</p>
          <p className="text-2xl font-bold text-foreground">
            {filteredTechs.length}
          </p>
        </div>
      </div>

      {/* Technologies Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + search}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            // Show skeleton while loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : (
            <>
              {filteredTechs.length === 0 ? (
                <div className="bg-card border-2 border-dashed border-border rounded-2xl p-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No technologies found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {search
                      ? "Try adjusting your search terms"
                      : "Add your first technology to get started"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredTechs.map((tech, idx) => {
                    const category = teches.find((c) => c.id === tech.category);

                    return (
                      <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.03, duration: 0.3 }}
                        className={`relative bg-gradient-to-br from-card to-card/50 border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group overflow-hidden `}
                      >
                        {/* Background Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Status Badge */}
                        {tech.status && (
                          <div className="absolute top-3 right-3">
                            <div
                              className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold ${
                                tech.status === "Online"
                                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                  : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  tech.status === "Online"
                                    ? "bg-green-500 animate-pulse"
                                    : "bg-gray-400"
                                }`}
                              />
                              {tech.status}
                            </div>
                          </div>
                        )}

                        {/* Header with Icon */}
                        <div className="relative mb-5">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-muted to-muted/50 border border-border flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            {tech.icon ? (
                              <img
                                src={tech.icon}
                                className="w-10 h-10 object-contain"
                                alt={tech.title}
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg";
                                }}
                              />
                            ) : (
                              <Sparkles className="w-8 h-8 text-muted-foreground/30" />
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                            <button
                              onClick={() => handleEdit(tech)}
                              className="p-2 rounded-lg bg-background border border-border shadow-sm hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                              title="Edit technology"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(tech.id)}
                              className="p-2 rounded-lg bg-background border border-border shadow-sm hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                              title="Delete technology"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="relative space-y-4">
                          {/* Title and Category */}
                          <div>
                            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {tech.title}
                            </h3>
                            {tech.sub_title && (
                              <p className="text-xs font-medium text-muted-foreground/80 mb-1">
                                {tech.sub_title}
                              </p>
                            )}
                            {category && (
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                                {category.title}
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          {tech.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                              {tech.description}
                            </p>
                          )}

                          {/* Proficiency Bar */}
                          {tech.level !== null && tech.level !== undefined && (
                            <div className="space-y-2 pt-2 border-t border-border/50">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                  Proficiency
                                </span>
                                <span className="text-sm font-bold text-foreground">
                                  {tech.level}%
                                </span>
                              </div>
                              <div className="h-2.5 rounded-full bg-muted/50 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${tech.level}%` }}
                                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full relative overflow-hidden"
                                  transition={{
                                    duration: 1,
                                    ease: "easeOut",
                                    delay: idx * 0.05,
                                  }}
                                >
                                  {/* Shine effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                </motion.div>
                              </div>
                              <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                                <span>Beginner</span>
                                <span>Intermediate</span>
                                <span>Expert</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTech ? "Modify Project" : "New Project Registration"}
        maxWidth="4xl"
      >
        <TechForm
          editingTech={editingTech}
          onSubmit={handleSubmitForm}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTech(null);
          }}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default AdminTechStackPage;
