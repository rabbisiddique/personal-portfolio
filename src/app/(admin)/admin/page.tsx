"use client";
import { createHeroAction, updateHeroAction } from "@/action/admin/hero.action";
import SkeletonHero from "@/components/admin/SkeletonHero";
import Modal from "@/components/reuse/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHero } from "@/hooks/useHero";
import {
  HERO_DEFAULT_VALUES,
  HeroFormData,
  HeroSchema,
} from "@/schemas/hero.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Edit3, Eye, Image as ImageIcon, Plus, Type, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminHeroPage = () => {
  const form = useForm<HeroFormData>({
    resolver: zodResolver(HeroSchema),
    defaultValues: HERO_DEFAULT_VALUES,
    mode: "onChange",
  });
  const { hero, exists, isLoading } = useHero();
  console.log(hero);

  const [selectedHero, setSelectedHero] = useState<any>(null);
  const [heroes, setHeroes] = useState<HeroFormData[]>([]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (data: HeroFormData) => {
    setIsProcessing(true);

    try {
      if (selectedHero && selectedHero.id) {
        const res = await updateHeroAction(data, selectedHero.id);

        if (res.success) {
          toast.success(res.message);
          setIsModalOpen(false);
          setSelectedHero(null);
        } else {
          throw new Error(res.message);
        }
      } else {
        const res = await createHeroAction(data);

        if (res.success) {
          toast.success(res.message);
          setIsModalOpen(false);
        } else {
          throw new Error(res.message);
        }
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (isModalOpen && selectedHero) {
      const { id, created_at, ...heroData } = selectedHero;
      form.reset({
        ...heroData,
        roles: Array.isArray(selectedHero.roles) ? selectedHero.roles : [],
      });
    } else if (isModalOpen && !selectedHero) {
      form.reset(HERO_DEFAULT_VALUES);
    }
  }, [selectedHero, isModalOpen]);

  if (isLoading) {
    return <SkeletonHero />;
  }
  if (!hero) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hero Section</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your homepage hero content and settings
          </p>
        </div>
        <motion.button
          onClick={() => {
            // FIX: Set selectedHero to the existing hero when editing
            if (exists && heroes.length > 0) {
              setSelectedHero(heroes[0]);
            } else {
              setSelectedHero(null);
            }
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {exists ? (
            <>
              <Edit3 size={16} />
              Edit Content
            </>
          ) : (
            <>
              <Plus size={16} />
              Create Hero
            </>
          )}
        </motion.button>
      </div>

      {hero ? (
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-muted-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Live Preview
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                    Active
                  </span>
                  <motion.button
                    onClick={() => {
                      setSelectedHero(hero);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit3 size={14} />
                    Edit
                  </motion.button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border border-border rounded-lg p-8 bg-muted/30">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                      {hero.system_label}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                      {hero.first_name} {hero.last_name}
                    </h1>

                    <AnimatePresence mode="wait">
                      {hero.roles &&
                        Array.isArray(hero.roles) &&
                        hero.roles.length > 0 && (
                          <motion.p
                            key={hero.id + "-" + roleIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-xl font-medium text-primary"
                          >
                            {hero.roles[roleIndex % hero.roles.length]}
                          </motion.p>
                        )}
                    </AnimatePresence>

                    <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                      {hero.description}
                    </p>

                    <div className="pt-4">
                      <a
                        href={hero.primary_button_link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-foreground text-background rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        {hero.primary_button_text}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
                  <img
                    src={
                      hero.profile_image_url ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={`${hero.first_name} ${hero.last_name}`}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <User size={16} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Identity</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Full Name
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {hero.first_name} {hero.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Label</p>
                    <p className="text-sm font-medium text-foreground">
                      {hero.system_label || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Type size={16} className="text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Active Roles
                  </h3>
                </div>
                <div className="space-y-2">
                  {hero.roles && hero.roles.length > 0 ? (
                    hero.roles.map((role, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-muted/50 rounded-lg text-sm text-foreground"
                      >
                        {role}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No roles added
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon size={16} className="text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Visual Assets
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Background Text
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {hero.background_word_top || "—"} /{" "}
                      {hero.background_word_bottom || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Button Link
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {hero.primary_button_link || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Image Status
                    </p>
                    <p
                      className={
                        "text-sm font-medium " +
                        (hero.profile_image_url
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-muted-foreground")
                      }
                    >
                      {hero.profile_image_url ? "Active" : "No Image"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No heroes found</p>
          <motion.button
            onClick={() => {
              setSelectedHero(null);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
          >
            <Plus size={16} className="inline mr-2" />
            Create Your First Hero
          </motion.button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedHero(null);
        }}
        title={selectedHero ? "Edit Hero Section" : "Create Hero Section"}
        maxWidth="4xl"
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full max-h-[85vh]"
        >
          <div className="flex-1 overflow-y-auto px-1">
            <div className="space-y-6 pb-6">
              <div className="rounded-xl border p-6">
                <h3 className="flex items-center gap-2 font-bold mb-4">
                  <User size={16} /> Identity Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <Controller
                    name="first_name"
                    control={form.control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input {...field} placeholder="Enter first name" />
                        {form.formState.errors.first_name && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.first_name.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="last_name"
                    control={form.control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input {...field} placeholder="Enter last name" />
                        {form.formState.errors.last_name && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.last_name.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="system_label"
                    control={form.control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label>System Label</Label>
                        <Input
                          {...field}
                          placeholder="e.g., Developer, Designer"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-xl border p-6">
                <h3 className="flex items-center gap-2 font-bold mb-4">
                  <Type size={16} /> Roles & Description
                </h3>

                <div className="space-y-2 mb-4">
                  <Label>Roles</Label>
                  <div className="flex flex-wrap gap-2">
                    {(form.watch("roles") || []).map((role, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1"
                      >
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => {
                            const newRoles = [...(form.watch("roles") || [])];
                            newRoles[index] = e.target.value;
                            form.setValue("roles", newRoles);
                          }}
                          className="bg-transparent border-0 focus:outline-none w-32 text-sm"
                          placeholder="Role"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newRoles = (form.watch("roles") || []).filter(
                              (_, i) => i !== index,
                            );
                            form.setValue("roles", newRoles);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue("roles", [
                          ...(form.watch("roles") || []),
                          "",
                        ])
                      }
                      className="border-2 border-dashed rounded-full px-3 py-1 text-sm"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                <Controller
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Write a brief description..."
                        className="resize-none"
                      />
                      {form.formState.errors.description && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.description.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="rounded-xl border p-6">
                <h3 className="flex items-center gap-2 font-bold mb-4">
                  <ImageIcon size={16} /> Visuals & Call to Action
                </h3>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Controller
                      name="primary_button_text"
                      control={form.control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>Primary Button Text</Label>
                          <Input {...field} placeholder="Get Started" />
                          {form.formState.errors.primary_button_text && (
                            <p className="text-sm text-red-500">
                              {
                                form.formState.errors.primary_button_text
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      )}
                    />

                    <Controller
                      name="primary_button_link"
                      control={form.control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>Primary Button Link</Label>
                          <Input {...field} placeholder="https://example.com" />
                          {form.formState.errors.primary_button_link && (
                            <p className="text-sm text-red-500">
                              {
                                form.formState.errors.primary_button_link
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Controller
                      name="profile_image_url"
                      control={form.control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>Profile Image URL</Label>
                          <Input
                            {...field}
                            placeholder="https://example.com/image.jpg"
                          />
                          {form.formState.errors.profile_image_url && (
                            <p className="text-sm text-red-500">
                              {form.formState.errors.profile_image_url.message}
                            </p>
                          )}
                        </div>
                      )}
                    />

                    {form.watch("profile_image_url") && (
                      <div className="flex items-end">
                        <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                          <img
                            src={form.watch("profile_image_url")}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Controller
                      name="background_word_top"
                      control={form.control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>Background Word (Top)</Label>
                          <Input {...field} placeholder="CREATIVE" />
                        </div>
                      )}
                    />

                    <Controller
                      name="background_word_bottom"
                      control={form.control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>Background Word (Bottom)</Label>
                          <Input {...field} placeholder="DEVELOPER" />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t bg-background pt-4 pb-2 px-1">
            <Button
              type="button" // ✅ Change to button temporarily
              className="w-full"
              size="lg"
              disabled={isProcessing}
              onClick={() => {
                console.log("Manual submit triggered");
                console.log("Form values:", form.getValues());
                console.log("Form errors:", form.formState.errors);
                form.handleSubmit(onSubmit)();
              }}
            >
              {isProcessing
                ? "Processing..."
                : selectedHero
                  ? "Update Hero"
                  : "Create Hero"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminHeroPage;
