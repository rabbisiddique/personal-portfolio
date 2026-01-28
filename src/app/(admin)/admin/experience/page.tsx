"use client";
import Modal from "@/components/reuse/Modal";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code,
  Cpu,
  Edit3,
  GraduationCap,
  LucideIcon,
  Plus,
  Save,
  Tag,
  Trash2,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { TimelineEntry } from "../../../../../admin.types";
import {
  MOCK_EDUCATION_LIST,
  MOCK_EXPERIENCE_LIST,
} from "../../../../../constants";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  GraduationCap,
  Cpu,
  Zap,
  Code,
};

const getIconComponent = (name: string): LucideIcon => {
  return iconMap[name] || Briefcase;
};

const AdminExperiencePage: React.FC = () => {
  const [experience, setExperience] =
    useState<TimelineEntry[]>(MOCK_EXPERIENCE_LIST);
  const [education, setEducation] =
    useState<TimelineEntry[]>(MOCK_EDUCATION_LIST);
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{
    item: TimelineEntry | null;
    type: "work" | "education";
  }>({ item: null, type: "work" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsModalOpen(false);
      setEditingItem({ item: null, type: activeTab });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  const moveItem = (
    list: TimelineEntry[],
    index: number,
    direction: "up" | "down",
    setList: React.Dispatch<React.SetStateAction<TimelineEntry[]>>,
  ) => {
    const newList = [...list];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return;
    [newList[index], newList[targetIndex]] = [
      newList[targetIndex],
      newList[index],
    ];
    setList(newList);
  };

  const handleDelete = (id: string, type: "work" | "education") => {
    if (type === "work") {
      setExperience(experience.filter((item) => item.id !== id));
    } else {
      setEducation(education.filter((item) => item.id !== id));
    }
  };

  const currentList = activeTab === "work" ? experience : education;
  const setCurrentList = activeTab === "work" ? setExperience : setEducation;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Experience & Education
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your professional and academic background
          </p>
        </div>
        <motion.button
          onClick={() => {
            setEditingItem({ item: null, type: activeTab });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} />
          Add {activeTab === "work" ? "Experience" : "Education"}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="bg-card border border-border rounded-xl p-1 shadow-sm inline-flex">
        {[
          { id: "work", label: "Work Experience", icon: Briefcase },
          { id: "education", label: "Education", icon: GraduationCap },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "work" | "education")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Total Entries</p>
          <p className="text-2xl font-bold text-foreground">
            {currentList.length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Active Positions</p>
          <p className="text-2xl font-bold text-foreground">
            {currentList.filter((item) => item.status === "active").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Total Skills</p>
          <p className="text-2xl font-bold text-foreground">
            {new Set(currentList.flatMap((item) => item.skills)).size}
          </p>
        </div>
      </div>

      {/* Timeline Entries */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {currentList.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <p className="text-muted-foreground">
                No {activeTab === "work" ? "experience" : "education"} entries
                yet
              </p>
            </div>
          ) : (
            currentList.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex gap-6">
                  {/* Order Controls */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        moveItem(currentList, idx, "up", setCurrentList)
                      }
                      disabled={idx === 0}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp size={18} />
                    </button>
                    <button
                      onClick={() =>
                        moveItem(currentList, idx, "down", setCurrentList)
                      }
                      disabled={idx === currentList.length - 1}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center bg-muted border border-border flex-shrink-0"
                    style={{
                      borderColor: item.accent + "40",
                      color: item.accent,
                    }}
                  >
                    {React.createElement(getIconComponent(item.icon), {
                      size: 28,
                      strokeWidth: 1.8,
                    })}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {item.role}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground font-medium whitespace-nowrap">
                          {item.period}
                        </span>
                        {item.status === "active" && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                              Active
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1 rounded-md bg-muted border border-border text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setEditingItem({ item, type: activeTab });
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, activeTab)}
                      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem({ item: null, type: activeTab });
        }}
        title={
          editingItem.item
            ? `Edit ${activeTab === "work" ? "Experience" : "Education"}`
            : `Add ${activeTab === "work" ? "Experience" : "Education"}`
        }
        maxWidth="2xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  {activeTab === "work"
                    ? "Company / Organization"
                    : "Institution"}
                </label>
                <input
                  type="text"
                  defaultValue={editingItem.item?.title}
                  placeholder={
                    activeTab === "work"
                      ? "e.g., Tech Corp"
                      : "e.g., University Name"
                  }
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  {activeTab === "work"
                    ? "Position / Role"
                    : "Degree / Program"}
                </label>
                <input
                  type="text"
                  defaultValue={editingItem.item?.role}
                  placeholder={
                    activeTab === "work"
                      ? "e.g., Senior Developer"
                      : "e.g., Bachelor of Science"
                  }
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Timeline & Visual */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Timeline & Visual
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Time Period
                </label>
                <input
                  type="text"
                  defaultValue={editingItem.item?.period}
                  placeholder="Jan 2024 - Present"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Icon Name
                </label>
                <input
                  type="text"
                  defaultValue={editingItem.item?.icon}
                  placeholder="Briefcase, GraduationCap, Code"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Accent Color
                </label>
                <input
                  type="color"
                  defaultValue={editingItem.item?.accent || "#3b82f6"}
                  className="w-full h-10 rounded-lg cursor-pointer border border-border bg-background"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Description
            </h3>
            <textarea
              defaultValue={editingItem.item?.description}
              placeholder="Describe your responsibilities, achievements, or what you learned..."
              rows={4}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
            />
          </div>

          {/* Skills */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={16} className="text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Skills & Technologies
              </h3>
            </div>
            <input
              type="text"
              defaultValue={editingItem.item?.skills.join(", ")}
              placeholder="React, Node.js, TypeScript (comma-separated)"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Separate skills with commas
            </p>
          </div>

          {/* Status */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">Status</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  defaultChecked={editingItem.item?.status === "active"}
                  className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span className="text-sm text-foreground">
                  Currently Active
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="past"
                  defaultChecked={editingItem.item?.status !== "active"}
                  className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span className="text-sm text-foreground">Past Position</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem({ item: null, type: activeTab });
              }}
              className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <Activity size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {editingItem.item ? "Update Entry" : "Add Entry"}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-[10000] bg-card border border-border rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle
                size={20}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {editingItem.item ? "Entry updated" : "Entry added"}
              </p>
              <p className="text-xs text-muted-foreground">
                Changes saved successfully
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminExperiencePage;
