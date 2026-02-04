import { z } from "zod";
const optionalUrl = z
  .string()
  .trim()
  .refine(
    (val) => val === "" || /^https?:\/\//.test(val),
    "Must be a valid URL",
  );
export const ProjectSchema = z.object({
  project_title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Project title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  image_url: z.string().min(1, "Image is required"),

  category: z.string().min(1, "Category is required"),

  tech_stack: z
    .array(z.string().min(1))
    .min(1, "At least one technology is required")
    .max(20, "Maximum 20 technologies allowed"),

  links: z.object({
    live_link: optionalUrl,
    github_link: optionalUrl,
    video_link: optionalUrl,
  }),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;
