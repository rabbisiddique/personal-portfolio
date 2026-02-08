"use client";

import {
  TimelineExperienceFormData,
  TimelineExperienceSchema,
} from "@/schemas/timeline.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  ImageIcon,
  Info,
} from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
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

interface TimelineExperienceFormProps {
  initialData?: Partial<TimelineExperienceFormData> | null;
  onSubmit: (values: TimelineExperienceFormData) => void;
  formId: string;
  footer: React.ReactNode;
}

const TimelineExperienceForm: React.FC<TimelineExperienceFormProps> = ({
  initialData,
  onSubmit,
  formId,
  footer,
}) => {
  const form = useForm<TimelineExperienceFormData>({
    resolver: zodResolver(TimelineExperienceSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      role: initialData?.role ?? "",
      year: initialData?.year ?? "",
      description: initialData?.description ?? "",
      skills: initialData?.skills ?? [],
      achievements: initialData?.achievements ?? [],
      icon: initialData?.icon ?? "GraduationCap",
      accent: initialData?.accent ?? "#8b5cf6",
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
          {/* Institution Section */}

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
            <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.25em] flex items-center gap-2">
              <GraduationCap size={14} /> Institutional Registry
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution / Entity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Stanford University"
                        {...field}
                      />
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
                    <FormLabel>Degree / Certification</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. B.Sc. Computer Science"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Timeline & Aesthetics */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
              <Calendar size={14} /> Milestone Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2018 - 2022" {...field} />
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
                    <FormLabel>Visual Marker (Icon)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="GraduationCap, Award, Book"
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
                    <FormLabel>Node Accent</FormLabel>
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

          {/* Narrative Scope */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
              <BookOpen size={14} /> Knowledge Narrative
            </h3>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Describe your studies, specialized focus, or institutional impact..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acquired Skills</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add skills..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="achievements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acquired achievements</FormLabel>
                <FormControl>
                  <TagsInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Add achievements..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {footer}
      </form>
    </Form>
  );
};

export default TimelineExperienceForm;
