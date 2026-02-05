"use client";
import { uploadProjectImage } from "@/lib/uploadImage";
import { ProjectFormData, ProjectSchema } from "@/schemas/projects.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Activity,
  Edit,
  ExternalLink,
  Github,
  Plus,
  Save,
  Tag,
  Upload,
  X,
  Youtube,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Project } from "../../../admin.types";
import { PROJECT_CATEGORIES } from "../../../constants";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface ProjectFormProps {
  initialData?: Project | null;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [preview, setPreview] = useState<string>(initialData?.image_url || "");
  const [tags, setTags] = useState<string[]>(initialData?.tech_stack || []);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      project_title: initialData?.project_title || "",
      description: initialData?.description || "",
      image_url: initialData?.image_url || "",
      category: initialData?.category || PROJECT_CATEGORIES[0],
      tech_stack: initialData?.tech_stack || [],
      links: {
        live_link: initialData?.links.live_link || "",
        github_link: initialData?.links.github_link || "",
        video_link: initialData?.links.video_link || "",
      },
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);

      // 1. Upload to Supabase
      const imageUrl = await uploadProjectImage(file);

      // 2. Set preview + form value
      setPreview(imageUrl);
      form.setValue("image_url", imageUrl, { shouldValidate: true });

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue("tech_stack", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tagToRemove);
    setTags(newTags);
    form.setValue("tech_stack", newTags);
  };

  const handleFormSubmit = (data: ProjectFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Project Title */}
            <FormField
              control={form.control}
              name="project_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Project Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., E-commerce Dashboard"
                      {...field}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl text-sm transition-all outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white border-slate-200 dark:border-slate-700"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Category
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl text-sm transition-all outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      {PROJECT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Tech Stack */}
            <FormField
              control={form.control}
              name="tech_stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Tech Stack
                  </FormLabel>
                  <div className="space-y-3">
                    {/* Display Tags */}
                    {tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold border border-blue-100 dark:border-blue-500/20"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Add Tag Input */}
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        placeholder="Type and press Enter to add"
                        className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none dark:text-white"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="ghost"
                        size="icon"
                        className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      >
                        <Plus size={22} />
                      </Button>
                    </div>
                  </div>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
          </div>

          {/* Project Banner */}
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Project Banner
                  {isUploadingImage && (
                    <span className="ml-2 text-xs text-blue-500 font-normal">
                      Uploading...
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative group aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                      preview
                        ? "border-blue-400 bg-blue-50/5"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 hover:border-blue-400 dark:hover:border-blue-500/50"
                    }`}
                  >
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 backdrop-blur-sm">
                          <Upload size={32} className="mb-2" />
                          <span className="text-sm font-bold">
                            Change Banner
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors mb-4 mx-auto border border-slate-100 dark:border-slate-700">
                          <Upload size={28} />
                        </div>
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                          Upload high-res image
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Recommended: 1600x1000px
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium text-center" />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                Detailed Description
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Briefly explain the problem this project solves..."
                  {...field}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl text-sm transition-all outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 resize-none dark:text-white border-slate-200 dark:border-slate-700"
                />
              </FormControl>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Asset Linking */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/50">
          <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <Tag size={16} /> Asset Linking
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Live Link */}
            <FormField
              control={form.control}
              name="links.live_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    <ExternalLink size={12} /> Deployment
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://app.com"
                      {...field}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* GitHub Link */}
            <FormField
              control={form.control}
              name="links.github_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    <Github size={12} /> Source Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/user/repo"
                      {...field}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Video Link */}
            <FormField
              control={form.control}
              name="links.video_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    <Youtube size={12} /> Video Walkthrough
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/..."
                      {...field}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            onClick={onCancel}
            variant="ghost"
            className="px-6 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 shadow-xl shadow-blue-500/30 disabled:opacity-50 transition-all flex items-center gap-3 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Activity size={18} className="animate-spin" />
                processing...
              </>
            ) : !initialData ? (
              <>
                <Save size={18} />
                Finalize Project
              </>
            ) : (
              <>
                <Edit size={18} />
                Update Project
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
