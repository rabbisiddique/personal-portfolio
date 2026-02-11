"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { uploadTechIcon } from "@/lib/uploadTechIcon";
import { uploadIcon } from "@/lib/uploadImage";
import { TechStackFormData, TechStackFormSchema } from "@/schemas/tech.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Activity,
  Image as ImageIcon,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TechItem } from "../../../admin.types";
import { TECH_CATEGORIES } from "../../../constants";

interface TechFormProps {
  editingTech?: TechItem | null;
  onSubmit: (data: TechStackFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function TechForm({
  editingTech,
  onSubmit,
  onCancel,
  isSubmitting,
}: TechFormProps) {
  const [iconPreview, setIconPreview] = useState<string | null>(
    editingTech?.icon || null,
  );
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TechStackFormData>({
    resolver: zodResolver(TechStackFormSchema),
    defaultValues: {
      title: editingTech?.title || "",
      icon: editingTech?.icon || "",
      category: editingTech?.category || TECH_CATEGORIES[0],
      description: editingTech?.description || "",
      level: editingTech?.level ?? 80,
      type: editingTech?.type || "",
      status: editingTech?.status || "Online",
      sub_title: editingTech?.sub_title || "",
    },
  });

  // Watch for icon URL changes to update preview
  const iconUrl = form.watch("icon");

  useEffect(() => {
    if (iconUrl && iconUrl.startsWith("http")) {
      setIconPreview(iconUrl);
    }
  }, [iconUrl]);

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    try {
      setIsUploadingIcon(true);

      // Upload to Supabase
      const uploadedUrl = await uploadIcon(file);

      // Update form and preview
      form.setValue("icon", uploadedUrl, { shouldValidate: true });
      setIconPreview(uploadedUrl);

      toast.success("Icon uploaded successfully");
    } catch (error) {
      console.error("Icon upload error:", error);
      toast.error("Failed to upload icon");
    } finally {
      setIsUploadingIcon(false);
    }
  };

  const handleRemoveIcon = () => {
    form.setValue("icon", "");
    setIconPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (data: TechStackFormData) => {
    await onSubmit(data);
    form.reset();
    setIconPreview(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Icon Upload Section */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <ImageIcon size={16} />
            Technology Icon
          </h3>

          <div className="flex items-start gap-6">
            {/* Icon Preview */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-background flex items-center justify-center overflow-hidden">
                {iconPreview ? (
                  <img
                    src={iconPreview}
                    alt="Icon preview"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <ImageIcon size={32} className="text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-muted-foreground">
                      Icon URL or Upload
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="https://... or upload below"
                          {...field}
                          value={field.value || ""}
                          className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm"
                        />
                      </FormControl>
                      {iconPreview && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveIcon}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload Button */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingIcon}
                  className="flex items-center gap-2"
                >
                  {isUploadingIcon ? (
                    <>
                      <Activity size={14} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={14} />
                      Upload Icon
                    </>
                  )}
                </Button>
                <span className="text-xs text-muted-foreground">
                  SVG, PNG, JPG (max 2MB)
                </span>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleIconUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-muted/30 rounded-xl p-6 border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Technology Name */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    Technology Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., React, Node.js"
                      {...field}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    Category *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <SelectTrigger className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      {TECH_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subtitle */}
            <FormField
              control={form.control}
              name="sub_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    Subtitle
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Frontend Framework"
                      {...field}
                      value={field.value || ""}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Proficiency Level with Visual Indicator */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    Proficiency Level: {field.value}%
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer 
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                        [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || "Online"}
                  >
                    <SelectTrigger className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      <SelectItem value="Online">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Online – Currently using
                        </span>
                      </SelectItem>
                      <SelectItem value="Offline">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-400" />
                          Offline – Not actively using
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    Type
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., core, language, framework"
                      {...field}
                      value={field.value || ""}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-muted/30 rounded-xl p-6 border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">
            Description
          </h3>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your experience with this technology, key projects where you used it, and your proficiency level..."
                    rows={5}
                    {...field}
                    value={field.value || ""}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm resize-none"
                  />
                </FormControl>
                <div className="flex justify-between items-center mt-2">
                  <FormMessage />
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} characters
                  </span>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isUploadingIcon}
            className="px-6 py-2.5 text-sm font-medium flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Activity size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                {editingTech ? "Update Technology" : "Add Technology"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
