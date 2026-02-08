import z from "zod";

// TIMELINE SCHEMAS
export const TimelineWorkSchema = z.object({
  title: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Position is required"),
  year: z.string().min(1, "Year is required"),
  description: z.string().min(10, "Description is required"),
  skills: z.array(z.string()).min(1, "At least one skills required"),
  achievements: z
    .array(z.string())
    .min(1, "At least one achievements required"),
  icon: z.string().min(1, "Icon identifier required"),
  accent: z.string(),
});

export type TimelineWorkFormData = z.infer<typeof TimelineWorkSchema>;

export const TimelineExperienceSchema = z.object({
  title: z.string().min(1, "Institution name is required"),
  role: z.string().min(1, "Degree or Program is required"),
  year: z.string().min(1, "Year is required"),
  description: z.string().min(10, "Description is required"),
  skills: z.array(z.string()).min(1, "At least one skills required"),
  achievements: z
    .array(z.string())
    .min(1, "At least one achievements required"),

  icon: z.string().min(1, "Icon identifier required"),
  accent: z.string(),
});

export type TimelineExperienceFormData = z.infer<
  typeof TimelineExperienceSchema
>;
