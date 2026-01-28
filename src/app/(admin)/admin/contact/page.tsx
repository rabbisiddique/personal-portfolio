"use client";
import Modal from "@/components/reuse/Modal";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  Briefcase,
  Camera,
  CheckCircle,
  Code2,
  Edit3,
  Github,
  Image as ImageIcon,
  Mail,
  Phone,
  Plus,
  Quote,
  Save,
  Share2,
  Trash2,
  User,
  type LucideIcon,
} from "lucide-react";
import React, { useState } from "react";
import { ContactPageData } from "../../../../../admin.types";
import { MOCK_CONTACT_DATA } from "../../../../../constants";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  BrainCircuit,
  Camera,
  Code2,
  Github,
  Mail,
  Phone,
  Share2,
  User,
};

const getIconComponent = (name: string): LucideIcon => {
  return iconMap[name] || Briefcase;
};

const AdminContactPage: React.FC = () => {
  const [data, setData] = useState<ContactPageData>(MOCK_CONTACT_DATA);
  const [activeTab, setActiveTab] = useState<"profile" | "services" | "links">(
    "profile",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"service" | "link" | null>(null);
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

  const handleDelete = (id: string, type: "service" | "link") => {
    if (type === "service") {
      setData({
        ...data,
        services: data.services.filter((s) => s.id !== id),
      });
    } else {
      setData({
        ...data,
        contactNodes: data.contactNodes.filter((n) => n.id !== id),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Contact Information
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your profile, services, and contact methods
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border border-border rounded-xl p-1 shadow-sm inline-flex">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "services", label: "Services", icon: Briefcase },
          { id: "links", label: "Contact Links", icon: Share2 },
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
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Information Card */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Image */}
                  <div className="space-y-4">
                    <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border group relative">
                      <img
                        src={data.profile.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                        <Camera className="text-white" size={32} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-2">
                        Image URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={data.profile.profileImage}
                          onChange={(e) =>
                            setData({
                              ...data,
                              profile: {
                                ...data.profile,
                                profileImage: e.target.value,
                              },
                            })
                          }
                          className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="https://..."
                        />
                        <button className="p-2.5 rounded-lg border border-border bg-muted hover:bg-background text-primary transition-colors">
                          <ImageIcon size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Fields */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={data.profile.profileName}
                          onChange={(e) =>
                            setData({
                              ...data,
                              profile: {
                                ...data.profile,
                                profileName: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-2">
                          Professional Title
                        </label>
                        <input
                          type="text"
                          value={data.profile.profileTitle}
                          onChange={(e) =>
                            setData({
                              ...data,
                              profile: {
                                ...data.profile,
                                profileTitle: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-2">
                        Status Message
                      </label>
                      <input
                        type="text"
                        value={data.profile.profileStatus}
                        onChange={(e) =>
                          setData({
                            ...data,
                            profile: {
                              ...data.profile,
                              profileStatus: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-2">
                        Header Status Text
                      </label>
                      <input
                        type="text"
                        value={data.optional.headerStatusText}
                        onChange={(e) =>
                          setData({
                            ...data,
                            optional: {
                              ...data.optional,
                              headerStatusText: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Quote Card */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Quote size={16} className="text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Footer Quote
                  </h2>
                </div>
                <textarea
                  value={data.optional.footerQuote}
                  onChange={(e) =>
                    setData({
                      ...data,
                      optional: {
                        ...data.optional,
                        footerQuote: e.target.value,
                      },
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Enter an inspirational quote or message..."
                />
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

          {/* Services Tab */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Services Offered
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage the services you provide
                  </p>
                </div>
                <motion.button
                  onClick={() => {
                    setEditingItem(null);
                    setModalType("service");
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Add Service
                </motion.button>
              </div>

              {data.services.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <p className="text-muted-foreground">No services added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center text-primary flex-shrink-0">
                          {React.createElement(getIconComponent(service.icon), {
                            size: 24,
                          })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-foreground">
                            {service.label}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.meta}
                          </p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setEditingItem(service);
                              setModalType("service");
                              setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id, "service")}
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
          )}

          {/* Links Tab */}
          {activeTab === "links" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Contact Links
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your contact methods and social links
                  </p>
                </div>
                <motion.button
                  onClick={() => {
                    setEditingItem(null);
                    setModalType("link");
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Add Link
                </motion.button>
              </div>

              {data.contactNodes.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <p className="text-muted-foreground">
                    No contact links added yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.contactNodes.map((node) => (
                    <div
                      key={node.id}
                      className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-lg bg-muted border border-border flex items-center justify-center text-primary flex-shrink-0">
                          {React.createElement(getIconComponent(node.icon), {
                            size: 28,
                          })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">
                            {node.label}
                          </p>
                          <p className="text-lg font-semibold text-foreground truncate">
                            {node.value}
                          </p>
                          <a
                            href={node.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline truncate block"
                          >
                            {node.link}
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(node);
                              setModalType("link");
                              setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(node.id, "link")}
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
          )}
        </motion.div>
      </AnimatePresence>

      {/* Service Modal */}
      <Modal
        isOpen={isModalOpen && modalType === "service"}
        onClose={() => {
          setIsModalOpen(false);
          setModalType(null);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Service" : "Add New Service"}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Service Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Service Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.label}
                    placeholder="e.g., Web Development"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.icon}
                    placeholder="e.g., Briefcase, Camera"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Description
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.meta}
                  placeholder="Brief description of the service"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
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
                  {editingItem ? "Update Service" : "Add Service"}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Link Modal */}
      <Modal
        isOpen={isModalOpen && modalType === "link"}
        onClose={() => {
          setIsModalOpen(false);
          setModalType(null);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Contact Link" : "Add New Contact Link"}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Link Information
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
                    placeholder="e.g., Email, LinkedIn"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.icon}
                    placeholder="e.g., Mail, Phone"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Display Value
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.value}
                  placeholder="e.g., email@example.com, +1 234 567 8900"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Link URL
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.link}
                  placeholder="mailto:email@example.com, tel:+1234567890, https://..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
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
                  {editingItem ? "Update Link" : "Add Link"}
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
                Your {modalType === "service" ? "service" : "contact link"} has
                been updated
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminContactPage;
