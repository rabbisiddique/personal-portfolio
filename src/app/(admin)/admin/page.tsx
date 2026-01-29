"use client";
import Modal from "@/components/reuse/Modal";
import Toast from "@/components/reuse/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  Edit3,
  Eye,
  Image as ImageIcon,
  Save,
  Type,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { HeroData } from "../../../../admin.types";
import { MOCK_HERO_DATA } from "../../../../constants";
const AdminHeroPage: React.FC = () => {
  const [data, setData] = useState<HeroData>(MOCK_HERO_DATA);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Rotating roles animation for preview
  useEffect(() => {
    if (data.summary.roles.length === 0) return;
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % data.summary.roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [data.summary.roles.length]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsModalOpen(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  const addRole = () => {
    setData({
      ...data,
      summary: { ...data.summary, roles: [...data.summary.roles, "New Role"] },
    });
  };

  const removeRole = (index: number) => {
    const newRoles = data.summary.roles.filter((_, i) => i !== index);
    setData({
      ...data,
      summary: { ...data.summary, roles: newRoles },
    });
    if (roleIndex >= newRoles.length) setRoleIndex(0);
  };

  const updateRole = (index: number, value: string) => {
    const newRoles = [...data.summary.roles];
    newRoles[index] = value;
    setData({
      ...data,
      summary: { ...data.summary, roles: newRoles },
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hero Section</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your homepage hero content and settings
          </p>
        </div>
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit3 size={16} />
          Edit Content
        </motion.button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Card */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">
                Live Preview
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
              Active
            </span>
          </div>

          <div className="space-y-6">
            {/* Hero Preview */}
            <div className="border border-border rounded-lg p-8 bg-muted/30">
              <div className="space-y-4">
                {/* Badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                  {data.identity.systemLabel}
                </span>

                {/* Name */}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {data.identity.firstName} {data.identity.lastName}
                </h1>

                {/* Rotating Role */}
                <AnimatePresence mode="wait">
                  {data.summary.roles.length > 0 && (
                    <motion.p
                      key={roleIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-medium text-primary"
                    >
                      {data.summary.roles[roleIndex]}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {data.summary.description}
                </p>

                {/* CTA Button */}
                <div className="pt-4">
                  <button className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
                    {data.cta.primaryButtonText}
                  </button>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
              <img
                src={data.visuals.profileImageUrl}
                alt={data.visuals.profileImageAlt}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          {/* Identity Info */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <User size={16} className="text-primary" />
              <h3 className="font-semibold text-foreground">Identity</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                <p className="text-sm font-medium text-foreground">
                  {data.identity.firstName} {data.identity.lastName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Label</p>
                <p className="text-sm font-medium text-foreground">
                  {data.identity.systemLabel}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <p className="text-sm font-medium text-foreground">
                  {data.identity.connectionText}
                </p>
              </div>
            </div>
          </div>

          {/* Roles Info */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Type size={16} className="text-primary" />
              <h3 className="font-semibold text-foreground">Active Roles</h3>
            </div>
            <div className="space-y-2">
              {data.summary.roles.map((role, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-muted/50 rounded-lg text-sm text-foreground"
                >
                  {role}
                </div>
              ))}
              {data.summary.roles.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  No roles added
                </p>
              )}
            </div>
          </div>

          {/* Visual Info */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon size={16} className="text-primary" />
              <h3 className="font-semibold text-foreground">Visual Assets</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Background Text
                </p>
                <p className="text-sm font-medium text-foreground">
                  {data.visuals.backgroundWordTop} /{" "}
                  {data.visuals.backgroundWordBottom}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Image Status
                </p>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Hero Section"
        maxWidth="4xl"
      >
        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Scrollable form content */}
          <div className="flex-1 overflow-y-auto px-1">
            <form className="space-y-6 pb-6" onSubmit={handleUpdate}>
              {/* Identity Section */}
              <div className="bg-muted/30 rounded-xl p-6 border border-border">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  Identity Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={data.identity.firstName}
                      onChange={(e) =>
                        setData({
                          ...data,
                          identity: {
                            ...data.identity,
                            firstName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={data.identity.lastName}
                      onChange={(e) =>
                        setData({
                          ...data,
                          identity: {
                            ...data.identity,
                            lastName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="systemLabel">System Label</Label>
                    <Input
                      id="systemLabel"
                      type="text"
                      value={data.identity.systemLabel}
                      onChange={(e) =>
                        setData({
                          ...data,
                          identity: {
                            ...data.identity,
                            systemLabel: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="connectionText">Connection Text</Label>
                    <Input
                      id="connectionText"
                      type="text"
                      value={data.identity.connectionText}
                      onChange={(e) =>
                        setData({
                          ...data,
                          identity: {
                            ...data.identity,
                            connectionText: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Roles Section */}
              <div className="bg-muted/30 rounded-xl p-6 border border-border">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Type size={16} className="text-primary" />
                  Roles & Description
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Rotating Roles</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {data.summary.roles.map((role, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg group"
                        >
                          <input
                            type="text"
                            value={role}
                            onChange={(e) => updateRole(idx, e.target.value)}
                            className="bg-transparent text-xs font-medium outline-none w-28 text-foreground"
                          />
                          <button
                            type="button"
                            onClick={() => removeRole(idx)}
                            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addRole}
                        className="px-3 py-1.5 border border-dashed border-border rounded-lg text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                      >
                        + Add Role
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.summary.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          summary: {
                            ...data.summary,
                            description: e.target.value,
                          },
                        })
                      }
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Visual & CTA Section */}
              <div className="bg-muted/30 rounded-xl p-6 border border-border">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <ImageIcon size={16} className="text-primary" />
                  Visual Assets & CTA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryButton">Primary Button Text</Label>
                    <Input
                      id="primaryButton"
                      type="text"
                      value={data.cta.primaryButtonText}
                      onChange={(e) =>
                        setData({
                          ...data,
                          cta: {
                            ...data.cta,
                            primaryButtonText: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Image</Label>
                    <div className="space-y-3">
                      {/* Image Preview */}
                      {data.visuals.profileImageUrl && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                          <img
                            src={data.visuals.profileImageUrl}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setData({
                                ...data,
                                visuals: {
                                  ...data.visuals,
                                  profileImageUrl: "",
                                },
                              })
                            }
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-destructive/90"
                          >
                            ×
                          </button>
                        </div>
                      )}

                      {/* File Input */}
                      <div className="flex gap-2">
                        <Input
                          id="profileImage"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setData({
                                  ...data,
                                  visuals: {
                                    ...data.visuals,
                                    profileImageUrl: reader.result as string,
                                  },
                                });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="flex-1"
                        />
                      </div>

                      {/* Or URL Input */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or paste URL
                          </span>
                        </div>
                      </div>

                      <Input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        value={data.visuals.profileImageUrl}
                        onChange={(e) =>
                          setData({
                            ...data,
                            visuals: {
                              ...data.visuals,
                              profileImageUrl: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bgTop">Background Text (Top)</Label>
                    <Input
                      id="bgTop"
                      type="text"
                      value={data.visuals.backgroundWordTop}
                      onChange={(e) =>
                        setData({
                          ...data,
                          visuals: {
                            ...data.visuals,
                            backgroundWordTop: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bgBottom">Background Text (Bottom)</Label>
                    <Input
                      id="bgBottom"
                      type="text"
                      value={data.visuals.backgroundWordBottom}
                      onChange={(e) =>
                        setData({
                          ...data,
                          visuals: {
                            ...data.visuals,
                            backgroundWordBottom: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Sticky Footer - Form Actions */}
          <div className="flex-shrink-0 flex justify-between items-center pt-4 pb-2 px-1 border-t border-border bg-background">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertCircle size={16} />
              <span className="text-xs">
                Changes will be visible immediately
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                onClick={handleUpdate}
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
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Success Toast */}
      {showToast && (
        <Toast
          type="success"
          title="Changes saved"
          description="Hero section updated successfully"
          duration={3000} // auto hides after 3s
        />
      )}
    </div>
  );
};

export default AdminHeroPage;
