"use client";

import {
  createTimeLineExperienceAction,
  createTimeLineWorkAction,
  deleteTimeLineExperienceAction,
  deleteTimeLineWorkAction,
  updateTimeLineExperienceAction,
  updateTimeLineWorkAction,
} from "@/action/admin/timeline.action";
import { ProjectCardSkeleton } from "@/components/admin/loading/SkeletonProjectCard";
import SmartIcon from "@/components/admin/SmartIcon";
import TimelineExperienceForm from "@/components/admin/TimelineExperienceForm";
import TimelineWorkForm from "@/components/admin/TimelineWorkForm";
import Modal from "@/components/reuse/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTimeLine } from "@/hooks/useTimeLine";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Award,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clock,
  Edit3,
  GraduationCap,
  History,
  Plus,
  Save,
  Terminal,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { TimelineEntry, TimelineType } from "../../../../../admin.types";

const AdminTimelinePage: React.FC = () => {
  const { data, isLoading } = useTimeLine();
  const [activeTab, setActiveTab] = useState<TimelineType>("work");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineEntry | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const formId = "timeline-management-form";

  const handleOpenModal = (item?: TimelineEntry) => {
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

  const handleItemSubmit = async (
    values: Omit<TimelineEntry, "id"> & { id?: string },
  ) => {
    setIsUpdating(true);
    try {
      if (activeTab === "work") {
        if (editingItem) {
          // editingItem.id exists, so pass it
          const res = await updateTimeLineWorkAction(
            values as TimelineEntry,
            editingItem.id,
          );
          if (res.success && res.message) toast.success(res.message);
        } else {
          // New entry, no id needed
          const res = await createTimeLineWorkAction(values as TimelineEntry);
          if (res.success && res.message) toast.success(res.message);
        }
      } else {
        if (editingItem) {
          const res = await updateTimeLineExperienceAction(
            values as TimelineEntry,
            editingItem.id,
          );
          if (res.success && res.message) toast.success(res.message);
        } else {
          const res = await createTimeLineExperienceAction(
            values as TimelineEntry,
          );
          if (res.success && res.message) toast.success(res.message);
        }
      }
      setIsUpdating(false);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string, mode: "work" | "experience") => {
    try {
      if (mode === "work") {
        const res = await deleteTimeLineWorkAction(id);
        console.log(res);
        if (res.success && res.message) return toast.success(res.message);
      } else {
        const res = await deleteTimeLineExperienceAction(id);
        console.log(res);
        if (res.success && res.message) return toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="text-indigo-500 border-indigo-500/20 bg-indigo-500/5 mb-2"
          >
            Sector: Professional History
          </Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            Chronos Registry
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Map out your technical evolution and institutional milestones.
          </p>
        </div>
      </div>

      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-[1.25rem] w-fit shadow-inner border border-slate-200 dark:border-slate-700">
        {[
          { id: "work", label: "Career Path", icon: Briefcase },
          { id: "experience", label: "Academic Roadmap", icon: GraduationCap },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TimelineType)}
            className={`flex items-center gap-2.5 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xl" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"}`}
          >
            <tab.icon size={18} strokeWidth={2.5} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-1.5 h-6 rounded-full ${activeTab === "work" ? "bg-blue-500" : "bg-purple-500"}`}
              />
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {activeTab === "work"
                  ? "Career Sequence"
                  : "Institutional Roadmap"}
              </h2>
            </div>
            <Button
              variant="outline"
              onClick={() => handleOpenModal()}
              className="rounded-xl border-slate-200 dark:border-slate-800 h-12 px-6"
            >
              <Plus size={18} className="mr-2" /> Inject Entry
            </Button>
          </div>

          <div className="space-y-8 relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block" />

            {activeTab === "work" ? (
              <>
                {isLoading ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <ProjectCardSkeleton key={`skeleton-${index}`} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {isLoading ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {Array.from({ length: 6 }).map((_, index) => (
                            <ProjectCardSkeleton key={`skeleton-${index}`} />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {data.workRes.length === 0 ? (
                          <>
                            <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-24 text-center">
                              <History
                                size={48}
                                className="mx-auto text-slate-300 mb-4"
                              />
                              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-6">
                                No entries mapped in this sector.
                              </p>
                              <Button
                                onClick={() => handleOpenModal()}
                                className="rounded-xl"
                              >
                                Initialize First Node
                              </Button>
                            </div>
                          </>
                        ) : (
                          data.workRes.map((entry, index) => (
                            <motion.div
                              key={entry.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative group pl-0 md:pl-20"
                            >
                              <div
                                className="absolute left-5 top-10 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 z-10 hidden md:flex items-center justify-center shadow-lg group-hover:scale-125 transition-all duration-300"
                                style={{ backgroundColor: entry.accent }}
                              >
                                <ChevronRight
                                  size={10}
                                  className="text-white"
                                />
                              </div>

                              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group/card">
                                <div
                                  className="absolute top-0 right-0 w-48 h-48 opacity-[0.03] group-hover/card:opacity-[0.08] -mr-16 -mt-16 rounded-full transition-opacity duration-500"
                                  style={{ backgroundColor: entry.accent }}
                                />

                                <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
                                  <div className="flex gap-6 items-start">
                                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0 overflow-hidden p-3">
                                      <SmartIcon
                                        icon={entry.icon}
                                        className="w-full h-full text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-500"
                                      />
                                    </div>
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="outline"
                                          className="text-[9px] py-1 px-3 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-black tracking-[0.1em]"
                                        >
                                          <Clock
                                            size={12}
                                            className={
                                              activeTab === "work"
                                                ? "text-blue-500"
                                                : "text-purple-500"
                                            }
                                          />{" "}
                                          {entry.year}
                                        </Badge>
                                      </div>
                                      <div className="space-y-1">
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                                          {entry.title}
                                        </h3>
                                        <p className="text-lg font-bold text-slate-400 dark:text-slate-500 tracking-tight flex items-center gap-2">
                                          {activeTab != "work" ? (
                                            <Award
                                              size={18}
                                              className="text-purple-400"
                                            />
                                          ) : (
                                            <Terminal
                                              size={18}
                                              className="text-blue-400"
                                            />
                                          )}
                                          {entry.role}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 shrink-0 self-start lg:self-auto relative z-10">
                                    {" "}
                                    {/* ADD relative z-10 */}
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => {
                                        console.log(entry);
                                        handleOpenModal(entry);
                                      }}
                                      className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    >
                                      <Edit3 size={16} />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="w-11 h-11 rounded-xl text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20"
                                      onClick={() =>
                                        handleDelete(entry.id, activeTab)
                                      }
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </div>

                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-3xl font-medium text-sm">
                                  {entry.description}
                                </p>

                                {entry.achievements &&
                                  entry.achievements.length > 0 && (
                                    <div className="mb-8 space-y-3">
                                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <CheckCircle
                                          size={14}
                                          className="text-emerald-500"
                                        />{" "}
                                        Key Accomplishments
                                      </h4>
                                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {entry.achievements.map((item, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50"
                                          >
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                <div className="space-y-3">
                                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Terminal
                                      size={14}
                                      className={
                                        activeTab === "work"
                                          ? "text-blue-500"
                                          : "text-purple-500"
                                      }
                                    />{" "}
                                    {activeTab === "work"
                                      ? "Tech Stack"
                                      : "Acquired Proficiencies"}
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {entry.skills.map((skill) => (
                                      <span
                                        key={skill}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider shadow-sm transition-transform hover:-translate-y-0.5"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {data.experienceRes.length === 0 ? (
                  <>
                    <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-24 text-center">
                      <History
                        size={48}
                        className="mx-auto text-slate-300 mb-4"
                      />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-6">
                        No entries mapped in this sector.
                      </p>
                      <Button
                        onClick={() => handleOpenModal()}
                        className="rounded-xl"
                      >
                        Initialize First Node
                      </Button>
                    </div>
                  </>
                ) : (
                  data.experienceRes.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group pl-0 md:pl-20"
                    >
                      <div
                        className="absolute left-5 top-10 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 z-10 hidden md:flex items-center justify-center shadow-lg group-hover:scale-125 transition-all duration-300"
                        style={{ backgroundColor: entry.accent }}
                      >
                        <ChevronRight size={10} className="text-white" />
                      </div>

                      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group/card">
                        <div
                          className="absolute top-0 right-0 w-48 h-48 opacity-[0.03] group-hover/card:opacity-[0.08] -mr-16 -mt-16 rounded-full transition-opacity duration-500"
                          style={{ backgroundColor: entry.accent }}
                        />

                        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
                          <div className="flex gap-6 items-start">
                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0 overflow-hidden p-3">
                              <SmartIcon
                                icon={entry.icon}
                                className="w-full h-full text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-500"
                              />
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className="text-[9px] py-1 px-3 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-black tracking-[0.1em]"
                                >
                                  <Clock
                                    size={12}
                                    className={
                                      activeTab === "experience"
                                        ? "text-blue-500"
                                        : "text-purple-500"
                                    }
                                  />{" "}
                                  {entry.year}
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                                  {entry.title}
                                </h3>
                                <p className="text-lg font-bold text-slate-400 dark:text-slate-500 tracking-tight flex items-center gap-2">
                                  {activeTab === "experience" ? (
                                    <Award
                                      size={18}
                                      className="text-purple-400"
                                    />
                                  ) : (
                                    <Terminal
                                      size={18}
                                      className="text-blue-400"
                                    />
                                  )}
                                  {entry.role}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0 self-start lg:self-auto relative z-10">
                            {" "}
                            {/* ADD relative z-10 */}
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                console.log(entry);
                                handleOpenModal(entry);
                              }}
                              className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                              <Edit3 size={16} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-11 h-11 rounded-xl text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20"
                              onClick={() => handleDelete(entry.id, activeTab)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-3xl font-medium text-sm">
                          {entry.description}
                        </p>

                        {entry.achievements &&
                          entry.achievements.length > 0 && (
                            <div className="mb-8 space-y-3">
                              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-500"
                                />{" "}
                                Key Accomplishments
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {entry.achievements.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Terminal
                              size={14}
                              className={
                                activeTab === "experience"
                                  ? "text-blue-500"
                                  : "text-purple-500"
                              }
                            />{" "}
                            {activeTab === "experience"
                              ? "Tech Stack"
                              : "Acquired Proficiencies"}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {entry.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider shadow-sm transition-transform hover:-translate-y-0.5"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingItem
            ? `Update ${activeTab === "work" ? "Employment" : "Institutional"} Registry`
            : `Inject New ${activeTab === "work" ? "Career" : "Academic"} Node`
        }
        maxWidth="4xl"
      >
        {activeTab === "work" ? (
          <TimelineWorkForm
            formId={formId}
            initialData={editingItem}
            onSubmit={handleItemSubmit}
            footer={
              <div className="flex justify-end gap-3 w-full">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cnacel
                </Button>
                <Button
                  disabled={isUpdating}
                  form={formId}
                  type="submit"
                  className="rounded-xl px-10 h-12 shadow-xl shadow-blue-500/20"
                >
                  {isUpdating ? (
                    <Activity size={18} className="animate-spin mr-2" />
                  ) : (
                    <Save size={18} className="mr-2" />
                  )}
                  {editingItem ? "Update the work" : "Finalize the work"}
                </Button>
              </div>
            }
          />
        ) : (
          <TimelineExperienceForm
            formId={formId}
            initialData={editingItem}
            onSubmit={handleItemSubmit}
            footer={
              <div className="flex justify-end gap-3 w-full">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cnacel
                </Button>
                <Button
                  disabled={isUpdating}
                  form={formId}
                  type="submit"
                  className="rounded-xl px-10 h-12 shadow-xl shadow-blue-500/20"
                >
                  {isUpdating ? (
                    <Activity size={18} className="animate-spin mr-2" />
                  ) : (
                    <Save size={18} className="mr-2" />
                  )}
                  {editingItem
                    ? "Update the experience"
                    : "Finalize the experience"}
                </Button>
              </div>
            }
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminTimelinePage;
