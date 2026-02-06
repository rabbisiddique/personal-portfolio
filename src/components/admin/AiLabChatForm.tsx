"use client";
import { AILabChatFormData, AILabChatSchema } from "@/schemas/aiLabs.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Plus, TagIcon, X } from "lucide-react";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form"; // Remove Form from here
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Form, // Import Form from your ui components
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

interface AILabChatFormProps {
  initialData?: Partial<AILabChatFormData> | null;
  onSubmit: (values: AILabChatFormData) => void;
  formId: string;
  footer: string;
}

const AILabChatForm: React.FC<AILabChatFormProps> = ({
  initialData,
  onSubmit,
  formId,
  footer,
}) => {
  const [tagInput, setTagInput] = useState("");

  const form = useForm<AILabChatFormData>({
    resolver: zodResolver(AILabChatSchema),
    defaultValues: {
      role: initialData?.role ?? "bot",
      chat_content: initialData?.chat_content ?? "",
      time: initialData?.time ?? "",
      command: initialData?.command ?? [],
    },
  });

  const currentTags =
    useWatch({ control: form.control, name: "command" }) || [];

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !currentTags.includes(trimmed)) {
      form.setValue("command", [...currentTags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    form.setValue(
      "command",
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
          <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.25em] flex items-center gap-2">
            <MessageSquare size={14} /> Protocol Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 12:00" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.time?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Node Origin</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      <SelectItem value="bot">AI Subsystem (Bot)</SelectItem>
                      <SelectItem value="user">
                        External Terminal (User){" "}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="chat_content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmitted Payload</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Protocol message..."
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.chat_content?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <FormLabel>Classification Tags</FormLabel>
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
                  No tags assigned...
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag..."
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

export default AILabChatForm;
