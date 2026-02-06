import { z } from "zod";

export const AILabExperimentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description is required"),
  model: z.string(),
  accent: z.string(),
  tags: z.array(z.string()),
});

export type AILabExperimentFormData = z.infer<typeof AILabExperimentSchema>;

export const ChatRoleEnum = z.enum(["user", "bot"]);

export const AILabChatSchema = z.object({
  command: z.array(z.string()),
  role: ChatRoleEnum,
  chat_content: z.string().min(1, "Message is required"),
  time: z.string(),
});

export type AILabChatFormData = z.infer<typeof AILabChatSchema>;
