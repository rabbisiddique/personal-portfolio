"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Beaker, Plus, Tag as TagIcon, X } from "lucide-react";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "../ui/input";

import {
  AILabExperimentFormData,
  AILabExperimentSchema,
} from "@/schemas/aiLabs.schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface AILabExperimentFormProps {
  initialData?: Partial<AILabExperimentFormData> | null;
  onSubmit: (values: AILabExperimentFormData) => void;
  formId: string;
  footer: string;
}

const AILabExperimentForm: React.FC<AILabExperimentFormProps> = ({
  initialData,
  onSubmit,
  formId,
  footer,
}) => {
  const [tagInput, setTagInput] = useState("");

  const form = useForm<AILabExperimentFormData>({
    resolver: zodResolver(AILabExperimentSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      model: initialData?.model || "",
      accent: initialData?.accent || "#3b82f6",
      tags: initialData?.tags || [],
    },
  });

  const currentTags = useWatch({ control: form.control, name: "tags" }) || [];

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !currentTags.includes(trimmed)) {
      form.setValue("tags", [...currentTags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
    );
  };

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.25em] flex items-center gap-2">
            <Beaker size={14} /> Research Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiment Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Visual Synthesis" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.title?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Core Model / Version</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. VSE-v4" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Narrative</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Experiment objectives and methodology..."
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="accent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector Accent Color</FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      {...field}
                      className="h-11 p-1 bg-white dark:bg-slate-900 cursor-pointer"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <FormLabel>Research Nodes (Tags)</FormLabel>
            <div className="flex flex-wrap gap-2 mb-3 min-h-[44px] p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
              {currentTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-2 py-1.5 px-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-none group transition-all"
                >
                  <TagIcon size={12} className="text-slate-400" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
              {currentTags.length === 0 && (
                <span className="text-xs text-slate-400 italic">
                  No nodes defined...
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add research node..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button
                type="button"
                variant="secondary"
                onClick={addTag}
                className="rounded-xl h-11 px-4"
              >
                <Plus size={20} />
              </Button>
            </div>
          </div>
        </div>
        {footer}
      </form>
    </Form>
  );
};

export default AILabExperimentForm;
