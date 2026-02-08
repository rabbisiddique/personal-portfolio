"use client";

import {
  TimelineWorkFormData,
  TimelineWorkSchema,
} from "@/schemas/timeline.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Calendar,
  ImageIcon,
  Info,
  Tag,
  Target,
} from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { TimelineEntry } from "../../../admin.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import SmartIcon from "./SmartIcon";
import { TagsInput } from "./TagInput";

interface TimelineWorkFormProps {
  initialData?: Partial<TimelineEntry> | null;
  onSubmit: (values: Omit<TimelineEntry, "id"> & { id?: string }) => void; // id is optional
  formId: string;
  footer: React.ReactNode;
}
const TimelineWorkForm: React.FC<TimelineWorkFormProps> = ({
  initialData,
  onSubmit,
  formId,
  footer,
}) => {
  const form = useForm<TimelineWorkFormData>({
    resolver: zodResolver(TimelineWorkSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      role: initialData?.role ?? "",
      year: initialData?.year ?? "",
      description: initialData?.description ?? "",
      skills: initialData?.skills ?? [],
      achievements: initialData?.achievements ?? [],
      icon: initialData?.icon ?? "Briefcase",
      accent: initialData?.accent ?? "#3b82f6",
    },
  });

  const currentIcon = useWatch({ control: form.control, name: "icon" });

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 space-y-8">
          {/* Identity Section */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Icon Preview */}
            <div className="md:col-span-1 space-y-4">
              <FormLabel>Institutional Marker</FormLabel>
              <div
                className={`aspect-square rounded-[2rem] border-4 border-dashed flex flex-col items-center justify-center transition-all duration-500 overflow-hidden relative ${currentIcon ? "border-purple-500/30 bg-purple-50/5" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"}`}
              >
                {currentIcon ? (
                  <div className="w-full h-full p-8 flex items-center justify-center">
                    <SmartIcon
                      icon={currentIcon}
                      className="w-full h-full text-purple-500"
                    />
                  </div>
                ) : (
                  <div className="text-center text-slate-400 px-4">
                    <ImageIcon size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-[9px] font-black uppercase tracking-[0.2em]">
                      Icon Preview
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-[9px]">Icon Name</FormLabel>
                  <Info size={10} className="text-slate-400 cursor-help" />
                </div>
                <Input
                  placeholder="e.g. GraduationCap, BookOpen, Award"
                  {...form.register("icon")}
                  className="h-9 px-3 text-[10px] font-mono"
                />
                <p className="text-[8px] text-slate-400 mt-1">
                  Visit{" "}
                  <a
                    href="https://lucide.dev"
                    target="_blank"
                    className="text-purple-500 hover:underline"
                  >
                    lucide.dev
                  </a>{" "}
                  for icon names
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.25em] flex items-center gap-2">
              <Briefcase size={14} /> Employment Registry
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company / Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Google, Tech Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position / Role</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Senior Frontend Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Logistics Section */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
              <Calendar size={14} /> Chronological Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jan 2022 - Present" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Identifier</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Briefcase, Code, Terminal"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Accent</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
                        {...field}
                        className="h-11 p-1 cursor-pointer"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Technical Scope */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
              <Tag size={14} /> Technical Scope
            </h3>

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <TagsInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add skills..."
                />
              )}
            />
          </div>

          {/* Narrative & Impact */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
              <Target size={14} /> Experience Narrative
            </h3>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibility Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Describe your high-level contributions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <TagsInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add achievements..."
                />
              )}
            />
            <FormMessage />
          </div>
        </div>
        {footer}
      </form>
    </Form>
  );
};

export default TimelineWorkForm;
