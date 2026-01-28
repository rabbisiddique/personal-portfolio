"use client";
import Icon from "@/components/reuse/icon/Icon";
import Modal from "@/components/reuse/Modal";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Camera,
  CheckCircle,
  Edit3,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { AboutData } from "../../../../../admin.types";
import { MOCK_ABOUT_DATA } from "../../../../../constants";

const AdminAboutPage: React.FC = () => {
  const [data, setData] = useState<AboutData>(MOCK_ABOUT_DATA);
  const [activeModal, setActiveModal] = useState<
    "hero" | "stats" | "info" | "expertise" | null
  >(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setActiveModal(null);
      setEditingItem(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  const handleDelete = (id: string, type: "stats" | "info" | "expertise") => {
    if (type === "stats") {
      setData({
        ...data,
        systemStats: data.systemStats.filter((s) => s.id !== id),
      });
    } else if (type === "info") {
      setData({
        ...data,
        personalInfo: data.personalInfo.filter((i) => i.id !== id),
      });
    } else {
      setData({
        ...data,
        expertise: data.expertise.filter((e) => e.id !== id),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">About Page</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your profile, stats, and expertise
          </p>
        </div>
      </div>

      {/* Hero Section Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Profile Information
          </h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setActiveModal("hero");
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-muted rounded-lg transition-colors"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border group relative">
              <img
                src="https://picsum.photos/seed/xylon/800/800"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                <Camera className="text-white" size={32} />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  First Name
                </label>
                <p className="text-base font-semibold text-foreground">
                  {data.hero.firstName}
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Last Name
                </label>
                <p className="text-base font-semibold text-foreground">
                  {data.hero.lastName}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-2">
                Role/Title
              </label>
              <p className="text-base font-semibold text-foreground">
                {data.hero.roleTitle}
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-2">
                Bio/Description
              </label>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.hero.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Statistics
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Quick stats and achievements
            </p>
          </div>
          <motion.button
            onClick={() => {
              setEditingItem(null);
              setActiveModal("stats");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} />
            Add Stat
          </motion.button>
        </div>

        {data.systemStats.length === 0 ? (
          <div className="border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">No statistics added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.systemStats.map((stat) => (
              <div
                key={stat.id}
                className="bg-muted/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center">
                    <Icon name={stat.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingItem(stat);
                        setActiveModal("stats");
                      }}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(stat.id, "stats")}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personal Info Section */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Personal Information
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Contact details and personal data
            </p>
          </div>
          <motion.button
            onClick={() => {
              setEditingItem(null);
              setActiveModal("info");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} />
            Add Info
          </motion.button>
        </div>

        {data.personalInfo.length === 0 ? (
          <div className="border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">
              No personal information added yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.personalInfo.map((info) => (
              <div
                key={info.id}
                className="bg-muted/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0">
                    <Icon name={info.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      {info.label}
                    </p>
                    <p
                      className={`text-base font-semibold ${
                        info.highlight ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {info.value}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingItem(info);
                        setActiveModal("info");
                      }}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(info.id, "info")}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expertise Section */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Skills & Expertise
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Your professional skills and proficiency levels
            </p>
          </div>
          <motion.button
            onClick={() => {
              setEditingItem(null);
              setActiveModal("expertise");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} />
            Add Skill
          </motion.button>
        </div>

        {data.expertise.length === 0 ? (
          <div className="border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">No skills added yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.expertise.map((item) => (
              <div
                key={item.id}
                className="bg-muted/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setActiveModal("expertise");
                          }}
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, "expertise")}
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground font-medium">
                          Proficiency
                        </span>
                        <span className="text-foreground font-semibold">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.level}%` }}
                          className="h-full bg-primary rounded-full"
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hero Modal */}
      <Modal
        isOpen={activeModal === "hero"}
        onClose={() => {
          setActiveModal(null);
          setEditingItem(null);
        }}
        title="Edit Profile Information"
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
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={data.hero.firstName}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={data.hero.lastName}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  defaultValue={data.hero.roleTitle}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Biography
                </label>
                <textarea
                  defaultValue={data.hero.description}
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
                setActiveModal(null);
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Stats Modal */}
      <Modal
        isOpen={activeModal === "stats"}
        onClose={() => {
          setActiveModal(null);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Statistic" : "Add New Statistic"}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Statistic Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.label}
                    placeholder="e.g., Projects Completed"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Value
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.value}
                    placeholder="e.g., 50+"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Icon Name
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.icon}
                  placeholder="e.g., Award, Activity"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
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
                  {editingItem ? "Update Stat" : "Add Stat"}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Personal Info Modal */}
      <Modal
        isOpen={activeModal === "info"}
        onClose={() => {
          setActiveModal(null);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Information" : "Add New Information"}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Information Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.label}
                    placeholder="e.g., Location, Email"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Value
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.value}
                    placeholder="e.g., New York, email@example.com"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Icon Name
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.icon}
                  placeholder="e.g., MapPin, Mail"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="highlight"
                  defaultChecked={editingItem?.highlight}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                />
                <label
                  htmlFor="highlight"
                  className="text-sm font-medium text-foreground"
                >
                  Highlight this field (use primary color)
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
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
                  {editingItem ? "Update Info" : "Add Info"}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Expertise Modal */}
      <Modal
        isOpen={activeModal === "expertise"}
        onClose={() => {
          setActiveModal(null);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Skill" : "Add New Skill"}
        maxWidth="2xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Skill Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.title}
                    placeholder="e.g., Frontend Development"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Proficiency Level (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={editingItem?.level || 80}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Icon Name
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.icon}
                  placeholder="e.g., Code, Palette"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={editingItem?.description}
                  placeholder="Describe your expertise in this area..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
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
                  {editingItem ? "Update Skill" : "Add Skill"}
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
                Your about page has been updated
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAboutPage;
