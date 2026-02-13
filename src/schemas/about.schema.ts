import { z } from "zod";

export const HeroSchema = z.object({
  first_name: z.string().min(1, { message: "first_name is required" }),
  last_name: z.string().min(1, { message: "last_name is required" }),
  role_title: z.string().min(1, { message: "role_title is required" }),
  operator_label: z.string().min(1, { message: "operator_label is required" }),
  background_text: z
    .string()
    .min(1, { message: "background_text is required" }),
  description: z.string().min(1, { message: "description is required" }),
});

export const SystemStatSchema = z.object({
  id: z.string(),
  label: z.string().min(1, { message: "label is required" }),
  value: z.string().min(1, { message: "value is required" }),
  icon: z.string().min(1, { message: "icon is required" }),
  color: z.string(),
});

export const PersonalInfoSchema = z.object({
  id: z.string(),
  label: z.string().min(1, { message: "label is required" }),
  value: z.string().min(1, { message: "value is required" }),
  icon: z.string().min(1, { message: "icon is required" }),
  color: z.string(),
  highlight: z.boolean().optional(),
});

export const ExpertiseSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "title is required" }),
  description: z.string().min(1, { message: "description is required" }),
  icon: z.string().min(1, { message: "icon is required" }),
  color: z.string(),
  accent_color: z.string(),
  level: z.string().min(1, "Level is required"), // Keep as string or change to number
  extra_description: z.string(), // Remove .optional() or .default()
});

export const AboutContentSchema = z.object({
  hero: HeroSchema,
  systemStats: z.array(SystemStatSchema),
  personalInfo: z.array(PersonalInfoSchema),
  expertise: z.array(ExpertiseSchema),
});

export const ABOUT_DEFAULT_VALUES: AboutData = {
  hero: {
    first_name: "",
    last_name: "",
    role_title: "",
    operator_label: "",
    background_text: "",
    description: "",
  },

  systemStats: [], // Should be array
  personalInfo: [], // Should be array
  expertise: [], // Should be array
};

export type HeroData = z.infer<typeof HeroSchema>;
export type SystemStatData = z.infer<typeof SystemStatSchema>;
export type PersonalInfoData = z.infer<typeof PersonalInfoSchema>;
export type ExpertiseData = z.infer<typeof ExpertiseSchema>;

export type AboutData = z.infer<typeof AboutContentSchema>;
