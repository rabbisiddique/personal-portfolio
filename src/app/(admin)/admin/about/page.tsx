"use client";
import {
  createExpertiseAction,
  createPersonalInfoAction,
  createStatAction,
  deleteExpertiseAction,
  deletePersonalInfoAction,
  deleteStatAction,
  updateExpertiseAction,
  updateHeroAction,
  updatePersonalInfoAction,
  updateStatAction,
} from "@/action/admin/about.action";
import SkeletonHero from "@/components/admin/SkeletonHero";
import Modal from "@/components/reuse/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAbout } from "@/hooks/useAbout";
import { supabase } from "@/lib/supabase/client";
import {
  ABOUT_DEFAULT_VALUES,
  AboutContentSchema,
  ExpertiseData,
  ExpertiseSchema,
  PersonalInfoData,
  PersonalInfoSchema,
  SystemStatData,
  SystemStatSchema,
} from "@/schemas/about.schema";
import { handleErrorWithToast } from "@/utils/handleErrorWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Activity, Camera, Edit3, Plus, Save, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { AboutData } from "../../../../../admin.types";

type EditingItem =
  | z.infer<typeof SystemStatSchema>
  | z.infer<typeof PersonalInfoSchema>
  | z.infer<typeof ExpertiseSchema>
  | NonNullable<AboutData["hero"]>
  | null;

const AdminAboutPage: React.FC = () => {
  const form = useForm<AboutData>({
    resolver: zodResolver(AboutContentSchema),
    defaultValues: ABOUT_DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const { aboutData, isLoading, setAboutData } = useAbout();
  const [activeModal, setActiveModal] = useState<
    "hero" | "stats" | "info" | "expertise" | null
  >(null);
  const [editingItem, setEditingItem] = useState<EditingItem>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Stats form with Zod
  const statsForm = useForm<z.infer<typeof SystemStatSchema>>({
    resolver: zodResolver(SystemStatSchema),
    defaultValues: {
      id: "",
      label: "",
      value: "",
      icon: "",
      color: "#000000",
    },
  });

  // Personal Info form with Zod
  const infoForm = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      id: "",
      label: "",
      value: "",
      icon: "",
      highlight: false,
    },
  });

  // Expertise form with Zod
  const expertiseForm = useForm<z.infer<typeof ExpertiseSchema>>({
    resolver: zodResolver(ExpertiseSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      extra_description: "", // This is fine even if optional
      icon: "",
      level: "",
    },
  });

  // Hero Submit Handler
  const handleHeroSubmit = async (formData: AboutData) => {
    setIsUpdating(true);

    try {
      // Only send the hero data, not the entire form
      const res = await updateHeroAction(formData.hero);

      if (!res.success) throw new Error(res.error);
      if (res.data) {
        setAboutData(res?.data);
      }
      toast.success("Hero updated successfully");

      setActiveModal(null);
      setEditingItem(null);
    } catch (err) {
      console.error("💥 Error:", err);
      const error = err as Error;
      toast.error(error.message || "Failed to update hero");
    } finally {
      setIsUpdating(false);
    }
  };

  // Stats CRUD Handlers
  const handleStatsSubmit = async (
    formData: z.infer<typeof SystemStatSchema>,
  ) => {
    setIsUpdating(true);

    try {
      let res;

      if (editingItem) {
        // Update existing stat
        res = await updateStatAction(formData);
        if (!res.success) throw new Error(res.error);
        toast.success("Stat updated successfully");
      } else {
        // Create new stat
        const { id, ...statWithoutId } = formData;
        res = await createStatAction(statWithoutId);
        if (!res.success) throw new Error(res.error);
        toast.success("Stat added successfully");
      }
      if (res.data) {
        setAboutData(res?.data);
      }
      setActiveModal(null);
      setEditingItem(null);
      statsForm.reset({
        id: "",
        label: "",
        value: "",
        icon: "",
        color: "#000000",
      });
    } catch (error: unknown) {
      handleErrorWithToast(error, "Error saving stat");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteStat = async (id: string) => {
    try {
      const res = await deleteStatAction(id);
      if (!res.success) throw new Error(res.error);

      setAboutData(res.data);
      toast.success("Stat deleted successfully");
    } catch (error: unknown) {
      handleErrorWithToast(error, "Error deleting the stat");
    }
  };

  // Personal Info CRUD Handlers
  const handleInfoSubmit = async (
    formData: z.infer<typeof PersonalInfoSchema>,
  ) => {
    setIsUpdating(true);

    try {
      let res;

      if (editingItem) {
        // Update existing info
        res = await updatePersonalInfoAction(formData);
        if (!res.success) throw new Error(res.error);
        toast.success("Info updated successfully");
      } else {
        // Create new info
        const { id, ...infoWithoutId } = formData;
        res = await createPersonalInfoAction(infoWithoutId);
        if (!res.success) throw new Error(res.error);
        toast.success("Info added successfully");
      }

      setAboutData(res.data);
      setActiveModal(null);
      setEditingItem(null);
      infoForm.reset({
        id: "",
        label: "",
        value: "",
        icon: "",
        highlight: false,
      });
    } catch (error: unknown) {
      handleErrorWithToast(error, "Falid to handleInfoSubmit");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteInfo = async (id: string) => {
    try {
      const res = await deletePersonalInfoAction(id);
      if (!res.success) throw new Error(res.error);

      setAboutData(res.data);
      toast.success("Info deleted successfully");
    } catch (error: unknown) {
      handleErrorWithToast(error, "Error deleting Info");
    }
  };

  // Expertise CRUD Handlers
  const handleExpertiseSubmit = async (
    formData: z.infer<typeof ExpertiseSchema>,
  ) => {
    setIsUpdating(true);

    try {
      let res;

      if (editingItem) {
        // Update existing expertise
        res = await updateExpertiseAction(formData);
        if (!res.success) throw new Error(res.error);
        toast.success("Skill updated successfully");
      } else {
        // Create new expertise
        const { id, ...expertiseWithoutId } = formData;
        res = await createExpertiseAction(expertiseWithoutId);
        if (!res.success) throw new Error(res.error);
        toast.success("Skill added successfully");
      }

      setAboutData(res.data);
      setActiveModal(null);
      setEditingItem(null);
      expertiseForm.reset({
        id: "",
        title: "",
        description: "",
        extra_description: "",
        icon: "",
        level: "",
      });
    } catch (error: unknown) {
      handleErrorWithToast(error, "Error saving expertise");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteExpertise = async (id: string) => {
    try {
      const res = await deleteExpertiseAction(id);
      if (!res.success) throw new Error(res.error);

      setAboutData(res.data);
      toast.success("Skill deleted successfully");
    } catch (error: unknown) {
      handleErrorWithToast(error, "Error deleting expertise");
    }
  };

  // Load data into forms when editing
  useEffect(() => {
    if (activeModal === "hero") {
      if (aboutData?.hero) {
        form.reset({
          hero: {
            ...aboutData.hero,
            operator_label: aboutData.hero.operator_label || "",
          },
          systemStats: (aboutData.systemStats || []).map(
            (stat: SystemStatData) => ({
              ...stat,
              color: stat.color || "#000000",
              id: stat.id || crypto.randomUUID(),
              icon: stat.icon || "",
              label: stat.label || "",
              value: stat.value || "",
            }),
          ),
          personalInfo: (aboutData.personalInfo || []).map(
            (info: PersonalInfoData) => ({
              ...info,
              id: info.id || crypto.randomUUID(),
              icon: info.icon || "",
              label: info.label || "",
              value: info.value || "",
              highlight: info.highlight || false,
            }),
          ),
          expertise: (aboutData.expertise || []).map((exp: ExpertiseData) => ({
            ...exp,
            id: exp.id || crypto.randomUUID(),
            title: exp.title || "",
            description: exp.description || "",
            extra_description: exp.extra_description || "",
            icon: exp.icon || "",
            level: exp.level || "",
          })),
        });
      } else {
        form.reset({
          hero: {
            first_name: "",
            last_name: "",
            role_title: "",
            description: "",
            operator_label: "",
            background_text: "",
          },
          systemStats: [],
          personalInfo: [],
          expertise: [],
        });
      }
    }

    if (activeModal === "stats" && editingItem) {
      // Check for unique properties of SystemStatSchema
      if (
        "color" in editingItem &&
        "label" in editingItem &&
        !("highlight" in editingItem) &&
        !("title" in editingItem)
      ) {
        statsForm.reset({
          id: editingItem.id || "",
          label: editingItem.label || "",
          value: editingItem.value || "",
          icon: editingItem.icon || "",
          color: editingItem.color || "#000000",
        });
      }
    } else if (activeModal === "stats") {
      statsForm.reset({
        id: "",
        label: "",
        value: "",
        icon: "",
        color: "#000000",
      });
    }

    if (activeModal === "info" && editingItem) {
      // Check for unique properties of PersonalInfoSchema
      if (
        "highlight" in editingItem &&
        "label" in editingItem &&
        !("color" in editingItem) &&
        !("title" in editingItem)
      ) {
        infoForm.reset({
          id: editingItem.id || "",
          label: editingItem.label || "",
          value: editingItem.value || "",
          icon: editingItem.icon || "",
          highlight: editingItem.highlight || false,
        });
      }
    } else if (activeModal === "info") {
      infoForm.reset({
        id: "",
        label: "",
        value: "",
        icon: "",
        highlight: false,
      });
    }

    if (activeModal === "expertise" && editingItem) {
      // Check for unique properties of ExpertiseSchema
      if (
        "title" in editingItem &&
        "description" in editingItem &&
        "level" in editingItem
      ) {
        expertiseForm.reset({
          id: editingItem.id || "",
          title: editingItem.title || "",
          description: editingItem.description || "",
          extra_description:
            "extra_description" in editingItem
              ? editingItem.extra_description || ""
              : "",
          icon: editingItem.icon || "",
          level: editingItem.level || "",
        });
      }
    } else if (activeModal === "expertise") {
      expertiseForm.reset({
        id: "",
        title: "",
        description: "",
        extra_description: "",
        icon: "",
        level: "",
      });
    }
  }, [
    activeModal,
    editingItem,
    aboutData,
    form,
    statsForm,
    infoForm,
    expertiseForm,
  ]);
  // Real-time Supabase subscription
  useEffect(() => {
    const channel = supabase
      .channel("about_content_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "about_content",
        },
        (payload) => {
          if (
            payload.eventType === "UPDATE" ||
            payload.eventType === "INSERT"
          ) {
            const newData = payload.new;
            setAboutData({
              hero: newData.hero,
              systemStats: newData.system_stats || [],
              personalInfo: newData.personal_info || [],
              expertise: newData.expertise || [],
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setAboutData]);

  if (isLoading) {
    return <SkeletonHero />;
  }

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
              setEditingItem(aboutData?.hero || null);
              setActiveModal("hero");
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-muted rounded-lg transition-colors"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  First Name
                </label>
                <p className="text-base font-semibold text-foreground">
                  {aboutData?.hero?.first_name}
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Last Name
                </label>
                <p className="text-base font-semibold text-foreground">
                  {aboutData?.hero?.last_name}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-2">
                Role/Title
              </label>
              <p className="text-base font-semibold text-foreground">
                {aboutData?.hero?.role_title}
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-2">
                Bio/Description
              </label>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {aboutData?.hero?.description}
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

        {!aboutData?.systemStats || aboutData.systemStats.length === 0 ? (
          <div className="border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">No statistics added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aboutData.systemStats.map((stat: SystemStatData) => (
              <div
                key={stat.id}
                className="bg-muted/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">
                      {stat.icon?.substring(0, 2) || "ST"}
                    </span>
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
                      onClick={() => handleDeleteStat(stat.id)}
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

        {!aboutData?.personalInfo || aboutData.personalInfo.length === 0 ? (
          <div className="border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">
              No personal information added yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutData.personalInfo.map((info: PersonalInfoData) => (
              <div
                key={info.id}
                className="bg-muted/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">
                      {info.icon?.substring(0, 2) || "IN"}
                    </span>
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
                      onClick={() => handleDeleteInfo(info.id)}
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

        {!aboutData?.expertise || aboutData.expertise.length === 0 ? (
          <div className="border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">No skills added yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {aboutData.expertise.map((item: ExpertiseData) => (
              <div
                key={item.id}
                className="bg-muted/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">
                      {item.icon?.substring(0, 2) || "SK"}
                    </span>
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
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.extra_description}
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
                          onClick={() => handleDeleteExpertise(item.id)}
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
                          {item.level}
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
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(handleHeroSubmit)}
        >
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="hero.first_name"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input {...field} placeholder="Enter first name" />
                      {form.formState.errors.hero?.first_name && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.hero?.first_name.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="hero.last_name"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input {...field} placeholder="Enter last name" />
                      {form.formState.errors.hero?.last_name && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.hero?.last_name.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <Controller
                name="hero.role_title"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Role Title</Label>
                    <Input {...field} placeholder="Enter role title" />
                    {form.formState.errors.hero?.role_title && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.hero?.role_title.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="hero.operator_label"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Operator</Label>
                    <Input {...field} placeholder="Enter operator title" />
                    {form.formState.errors.hero?.operator_label && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.hero?.operator_label.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="hero.background_text"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Background Text</Label>
                    <Input {...field} placeholder="Background Text" />
                    {form.formState.errors.hero?.background_text && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.hero?.background_text.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="hero.description"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea rows={4} {...field} />
                    {form.formState.errors.hero?.description && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.hero?.description.message}
                      </p>
                    )}
                  </div>
                )}
              />
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
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Update Profile"}
            </Button>
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
        <form
          className="space-y-6"
          onSubmit={statsForm.handleSubmit(handleStatsSubmit)}
        >
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Statistic Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="label"
                  control={statsForm.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input
                        {...field}
                        placeholder="e.g., Projects Completed"
                      />
                      {statsForm.formState.errors.label && (
                        <p className="text-sm text-red-500">
                          {statsForm.formState.errors.label.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="value"
                  control={statsForm.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input {...field} placeholder="e.g., 50+" />
                      {statsForm.formState.errors.value && (
                        <p className="text-sm text-red-500">
                          {statsForm.formState.errors.value.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="icon"
                  control={statsForm.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Icon Name</Label>
                      <Input {...field} placeholder="e.g., Award, Activity" />
                      {statsForm.formState.errors.icon && (
                        <p className="text-sm text-red-500">
                          {statsForm.formState.errors.icon.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="color"
                  control={statsForm.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <Input type="color" {...field} />
                      {statsForm.formState.errors.color && (
                        <p className="text-sm text-red-500">
                          {statsForm.formState.errors.color.message}
                        </p>
                      )}
                    </div>
                  )}
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
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Activity size={16} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {editingItem ? "Update Stat" : "Add Stat"}
                </>
              )}
            </Button>
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
        <form
          className="space-y-6"
          onSubmit={infoForm.handleSubmit(handleInfoSubmit)}
        >
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Information Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="label"
                  control={infoForm.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input {...field} placeholder="e.g., Location, Email" />
                      {infoForm.formState.errors.label && (
                        <p className="text-sm text-red-500">
                          {infoForm.formState.errors.label.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="value"
                  control={infoForm.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        {...field}
                        placeholder="e.g., New York, email@example.com"
                      />
                      {infoForm.formState.errors.value && (
                        <p className="text-sm text-red-500">
                          {infoForm.formState.errors.value.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <Controller
                name="icon"
                control={infoForm.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Icon Name</Label>
                    <Input {...field} placeholder="e.g., MapPin, Mail" />
                    {infoForm.formState.errors.icon && (
                      <p className="text-sm text-red-500">
                        {infoForm.formState.errors.icon.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="highlight"
                control={infoForm.control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="highlight"
                      checked={field.value}
                      onChange={field.onChange}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <label
                      htmlFor="highlight"
                      className="text-sm font-medium text-foreground"
                    >
                      Highlight this field (use primary color)
                    </label>
                  </div>
                )}
              />
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
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Activity size={16} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {editingItem ? "Update Info" : "Add Info"}
                </>
              )}
            </Button>
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
        <form
          className="space-y-6"
          onSubmit={expertiseForm.handleSubmit(handleExpertiseSubmit)}
        >
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Skill Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="title"
                  control={expertiseForm.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Skill Name</Label>
                      <Input
                        {...field}
                        placeholder="e.g., Frontend Development"
                      />
                      {expertiseForm.formState.errors.title && (
                        <p className="text-sm text-red-500">
                          {expertiseForm.formState.errors.title.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="level"
                  control={expertiseForm.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Proficiency Level (%)</Label>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter your level"
                      />
                      {expertiseForm.formState.errors.level && (
                        <p className="text-sm text-red-500">
                          {expertiseForm.formState.errors.level.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <Controller
                name="icon"
                control={expertiseForm.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Icon Name</Label>
                    <Input {...field} placeholder="e.g., Code, Palette" />
                    {expertiseForm.formState.errors.icon && (
                      <p className="text-sm text-red-500">
                        {expertiseForm.formState.errors.icon.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="description"
                control={expertiseForm.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      {...field}
                      placeholder="Describe your expertise in this area..."
                      rows={3}
                    />
                    {expertiseForm.formState.errors.description && (
                      <p className="text-sm text-red-500">
                        {expertiseForm.formState.errors.description.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="extra_description"
                control={expertiseForm.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Extra Description</Label>
                    <Textarea
                      {...field}
                      placeholder="Extra_description your expertise in this area..."
                      rows={3}
                    />
                    {expertiseForm.formState.errors.description && (
                      <p className="text-sm text-red-500">
                        {expertiseForm.formState.errors.description.message}
                      </p>
                    )}
                  </div>
                )}
              />
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
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Activity size={16} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {editingItem ? "Update Skill" : "Add Skill"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAboutPage;
