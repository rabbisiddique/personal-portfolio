"use client";

import {
  createAiLabsChatAction,
  createAiLabsExperimentsAction,
  deleteAiLabsChatAction,
  deleteAiLabsExperimentsAction,
  updateAiLabsChatAction,
  updateAiLabsExperimentsAction,
} from "@/action/admin/aiLabs.action";
import AILabChatForm from "@/components/admin/AiLabChatForm";
import AILabExperimentForm from "@/components/admin/AILabExperimentForm";
import { ProjectCardSkeleton } from "@/components/admin/loading/SkeletonProjectCard";
import Modal from "@/components/reuse/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAiLabs } from "@/hooks/useAiLabs";
import {
  AILabChatFormData,
  AILabExperimentFormData,
} from "@/schemas/aiLabs.schema";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Beaker,
  Bot,
  Edit3,
  MessageSquare,
  Plus,
  Save,
  Trash2,
  User,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AdminAILabsPage: React.FC = () => {
  const { data, isLoading } = useAiLabs();

  const [activeTab, setActiveTab] = useState<"chat" | "roadmap">("chat");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"chat" | "experiment" | null>(
    null,
  );
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const formId = "ai-lab-management-form";

  const handleOpenModal = (type: "chat" | "experiment", item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

  const handleItemSubmit = async (
    values: AILabChatFormData | AILabExperimentFormData,
  ) => {
    setIsUpdating(true);
    try {
      if (modalType === "chat") {
        if (editingItem) {
          const res = await updateAiLabsChatAction(
            values as AILabChatFormData,
            editingItem.id,
          );
          if (res.success && res.message) toast.success(res.message);
        } else {
          const res = await createAiLabsChatAction(values as AILabChatFormData);
          if (res.success && res.message) toast.success(res.message);
        }
      } else if (modalType === "experiment") {
        if (editingItem) {
          const res = await updateAiLabsExperimentsAction(
            values as AILabExperimentFormData,
            editingItem.id,
          );
          if (res.success && res.message) toast.success(res.message);
        } else {
          const res = await createAiLabsExperimentsAction(
            values as AILabExperimentFormData,
          );
          if (res.success && res.message) toast.success(res.message);
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string, type: "chat" | "experiment") => {
    try {
      if (type === "chat") {
        const res = await deleteAiLabsChatAction(id);
        console.log(res);
        if (res.success && res.message) return toast.success(res.message);
      } else {
        const res = await deleteAiLabsExperimentsAction(id);
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
            className="text-blue-500 border-blue-500/20 bg-blue-500/5 mb-2"
          >
            Research Sector 7
          </Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            AI Labs
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Architect Neural Interface experiences and monitor research cycles.
          </p>
        </div>
      </div>

      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-[1.25rem] w-fit shadow-inner border border-slate-200 dark:border-slate-700">
        {[
          { id: "chat", label: "Neural Interface", icon: MessageSquare },
          { id: "roadmap", label: "Experimental Roadmap", icon: Beaker },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
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
          {activeTab === "chat" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Sequence Archive
                  </h2>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleOpenModal("chat")}
                  className="rounded-xl border-slate-200 dark:border-slate-800"
                >
                  <Plus size={18} className="mr-2" /> Inject Protocol
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                  // Show skeleton while loading
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <ProjectCardSkeleton key={`skeleton-${index}`} />
                    ))}
                  </div>
                ) : (
                  <>
                    {data?.chat?.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 flex gap-6 items-start transition-all hover:shadow-xl hover:-translate-y-1"
                      >
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 ${msg.role === "bot" ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20" : "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:border-slate-700"}`}
                        >
                          {msg.role === "bot" ? (
                            <Bot size={28} />
                          ) : (
                            <User size={28} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                                {msg.role === "bot"
                                  ? "Assistant Node"
                                  : "Client Signal"}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                                {msg.time}
                              </span>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleOpenModal("chat", msg)}
                              >
                                <Edit3 size={16} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-red-500"
                                onClick={() => handleDelete(msg.id, "chat")}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                          <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                            {msg?.title}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            {msg.chat_content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Active Experiments
                  </h2>
                </div>
                <Button
                  onClick={() => handleOpenModal("experiment")}
                  className="bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20 rounded-xl h-12 px-6"
                >
                  <Plus size={18} className="mr-2" /> Initialize Research
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {isLoading ? (
                  // Show skeleton while loading
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <ProjectCardSkeleton key={`skeleton-${index}`} />
                    ))}
                  </div>
                ) : (
                  <>
                    {data?.roadmap?.experiments.map((exp) => (
                      <div
                        key={exp.id}
                        className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
                      >
                        <div
                          className="absolute top-0 right-0 w-32 h-32 opacity-10 -mr-16 -mt-16 rounded-full"
                          style={{ backgroundColor: exp.accent }}
                        />
                        <div className="flex justify-between items-start mb-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="border-indigo-500/20 bg-indigo-500/5 text-indigo-500"
                              >
                                {exp.model}
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                              {exp.title}
                            </h3>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleOpenModal("experiment", exp)}
                            >
                              <Edit3 size={18} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-500"
                              onClick={() => handleDelete(exp.id, "experiment")}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 line-clamp-2">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingItem
            ? `Refine ${modalType === "chat" ? "Signal" : "Research"}`
            : `Deploy ${modalType === "chat" ? "Interface" : "Experiment"}`
        }
        maxWidth="2xl"
      >
        {modalType === "experiment" ? (
          <AILabExperimentForm
            formId={formId}
            initialData={editingItem}
            onSubmit={handleItemSubmit}
            footer={
              <div className="flex justify-end gap-3 w-full">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Abort Mission
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
                  {editingItem ? "Update Registry" : "Finilize the experiments"}
                </Button>
              </div>
            }
          />
        ) : (
          <AILabChatForm
            formId={formId}
            initialData={editingItem}
            onSubmit={handleItemSubmit}
            footer={
              <div className="flex justify-end gap-3 w-full">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Abort Mission
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
                  {editingItem ? "Update Registry" : "Finilize the chat"}
                </Button>
              </div>
            }
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminAILabsPage;
