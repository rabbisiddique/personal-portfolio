"use client";
import Modal from "@/components/reuse/Modal";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bot,
  CheckCircle,
  Edit3,
  MessageSquare,
  Plus,
  Save,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { AILabsData } from "../../../../../admin.types";
import { MOCK_AI_LABS_DATA } from "../../../../../constants";

const AdminAILabsPage: React.FC = () => {
  const [data, setData] = useState<AILabsData>(MOCK_AI_LABS_DATA);
  const [activeTab, setActiveTab] = useState<"hero" | "chat" | "roadmap">(
    "hero",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"message" | "experiment" | null>(
    null,
  );
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsModalOpen(false);
      setModalType(null);
      setEditingItem(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  const handleDelete = (id: string, type: "message" | "experiment") => {
    if (type === "message") {
      setData({
        ...data,
        chat: {
          ...data.chat,
          messages: data.chat.messages.filter((m) => m.id !== id),
        },
      });
    } else {
      setData({
        ...data,
        roadmap: {
          ...data.roadmap,
          experiments: data.roadmap.experiments.filter((e) => e.id !== id),
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Labs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your AI experiments and chat interface
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border border-border rounded-xl p-1 shadow-sm inline-flex">
        {[
          { id: "hero", label: "Hero Section", icon: Sparkles },
          { id: "chat", label: "Chat Interface", icon: MessageSquare },
          { id: "roadmap", label: "Experiments", icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
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

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Hero Section Content
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2">
                      Page Title
                    </label>
                    <input
                      type="text"
                      value={data.hero.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2">
                      Subtitle
                    </label>
                    <textarea
                      value={data.hero.subtitle}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, subtitle: e.target.value },
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2">
                      Philosophy Quote
                    </label>
                    <textarea
                      value={data.hero.philosophyQuote}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: {
                            ...data.hero,
                            philosophyQuote: e.target.value,
                          },
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="space-y-6">
              {/* Chat Settings */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Chat Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2">
                      Chat Title
                    </label>
                    <input
                      type="text"
                      value={data.chat.chatTitle}
                      onChange={(e) =>
                        setData({
                          ...data,
                          chat: { ...data.chat, chatTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2">
                      Status Message
                    </label>
                    <input
                      type="text"
                      value={data.chat.chatStatus}
                      onChange={(e) =>
                        setData({
                          ...data,
                          chat: { ...data.chat, chatStatus: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Chat Messages
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage pre-configured chat examples
                    </p>
                  </div>
                  <motion.button
                    onClick={() => {
                      setEditingItem(null);
                      setModalType("message");
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={16} />
                    Add Message
                  </motion.button>
                </div>

                {data.chat.messages.length === 0 ? (
                  <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <p className="text-muted-foreground">
                      No messages added yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.chat.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              msg.role === "bot"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            {msg.role === "bot" ? (
                              <Bot size={20} />
                            ) : (
                              <User size={20} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-semibold text-foreground">
                                {msg.role === "bot" ? "AI Assistant" : "User"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {msg.time}
                              </span>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">
                              {msg.content}
                            </p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingItem(msg);
                                setModalType("message");
                                setIsModalOpen(true);
                              }}
                              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(msg.id, "message")}
                              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Experiments Tab */}
          {activeTab === "roadmap" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Research Experiments
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your AI research and development projects
                  </p>
                </div>
                <motion.button
                  onClick={() => {
                    setEditingItem(null);
                    setModalType("experiment");
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Add Experiment
                </motion.button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Experiments
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {data.roadmap.experiments.length}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1">Active</p>
                  <p className="text-2xl font-bold text-foreground">
                    {
                      data.roadmap.experiments.filter(
                        (e) => e.status === "Active",
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1">
                    Avg. Complexity
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(
                      data.roadmap.experiments.reduce(
                        (acc, e) => acc + e.complexity,
                        0,
                      ) / data.roadmap.experiments.length,
                    )}
                    %
                  </p>
                </div>
              </div>

              {/* Experiments Grid */}
              {data.roadmap.experiments.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <p className="text-muted-foreground">
                    No experiments added yet
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {data.roadmap.experiments.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="text-xs px-2.5 py-1 rounded-md font-medium"
                              style={{
                                backgroundColor: exp.accent + "20",
                                color: exp.accent,
                              }}
                            >
                              {exp.model}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  exp.status === "Active"
                                    ? "bg-emerald-500"
                                    : "bg-amber-500"
                                }`}
                              />
                              <span className="text-xs text-muted-foreground">
                                {exp.status}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {exp.title}
                          </h3>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setEditingItem(exp);
                              setModalType("experiment");
                              setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(exp.id, "experiment")}
                            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground font-medium">
                            Complexity
                          </span>
                          <span className="text-foreground font-semibold">
                            {exp.complexity}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${exp.complexity}%` }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: exp.accent }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-md bg-muted border border-border text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Message Modal */}
      <Modal
        isOpen={isModalOpen && modalType === "message"}
        onClose={() => {
          setIsModalOpen(false);
          setModalType(null);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Message" : "Add New Message"}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Message Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Role
                  </label>
                  <select
                    defaultValue={editingItem?.role || "user"}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="user">User</option>
                    <option value="bot">AI Assistant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Timestamp
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.time || "12:00 PM"}
                    placeholder="e.g., 12:00 PM"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Message Content
                </label>
                <textarea
                  defaultValue={editingItem?.content}
                  placeholder="Enter message content..."
                  rows={4}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setModalType(null);
                setEditingItem(null);
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
                  {editingItem ? "Update Message" : "Add Message"}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Experiment Modal */}
      <Modal
        isOpen={isModalOpen && modalType === "experiment"}
        onClose={() => {
          setIsModalOpen(false);
          setModalType(null);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Experiment" : "Add New Experiment"}
        maxWidth="2xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Experiment Title
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.title}
                    placeholder="e.g., GPT-4 Integration"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Model/Phase
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.model}
                    placeholder="e.g., UI Ready, Planned"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Complexity (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={editingItem?.complexity || 50}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Status
                  </label>
                  <select
                    defaultValue={editingItem?.status || "Active"}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Stable">Stable</option>
                    <option value="Idle">Idle</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Accent Color
                </label>
                <input
                  type="color"
                  defaultValue={editingItem?.accent || "#3b82f6"}
                  className="w-full h-10 rounded-lg cursor-pointer border border-border bg-background"
                />
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Description
            </h3>
            <textarea
              defaultValue={editingItem?.description}
              placeholder="Describe the experiment goals and methodology..."
              rows={4}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
            />
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">Tags</h3>
            <input
              type="text"
              defaultValue={editingItem?.tags?.join(", ")}
              placeholder="AI, ML, Research (comma-separated)"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Separate tags with commas
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setModalType(null);
                setEditingItem(null);
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
                  {editingItem ? "Update Experiment" : "Add Experiment"}
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
                Changes saved
              </p>
              <p className="text-xs text-muted-foreground">
                Your {modalType === "message" ? "message" : "experiment"} has
                been updated
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAILabsPage;
