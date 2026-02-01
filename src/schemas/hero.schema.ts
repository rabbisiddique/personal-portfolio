import { z } from "zod";

// ============= REUSABLE VALIDATORS =============
const optionalUrlSchema = z
  .string()
  .refine((val) => val === "" || z.string().url().safeParse(val).success, {
    message: "Must be a valid URL",
  });

const requiredString = (fieldName: string, maxLength = 100) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .max(maxLength, `${fieldName} must be under ${maxLength} characters`);

// ============= SCHEMA =============
export const HeroSchema = z.object({
  id: z.any().optional(), // ✅ Quick fix
  created_at: z.any().optional(), //
  first_name: requiredString("First name", 50),
  last_name: requiredString("Last name", 50),
  system_label: z.string().max(100), // Remove .default()
  roles: z.array(z.string()),
  description: z.string().min(10).max(500),
  primary_button_text: requiredString("Button text", 30),
  primary_button_link: optionalUrlSchema,
  profile_image_url: optionalUrlSchema,
  background_word_top: z.string().max(50),
  background_word_bottom: z.string().max(50),
});

export type HeroFormData = z.infer<typeof HeroSchema>;

// ============= DEFAULT VALUES (Must match all required fields) =============
export const HERO_DEFAULT_VALUES: HeroFormData = {
  first_name: "",
  last_name: "",
  system_label: "",
  roles: [],
  description: "",
  primary_button_text: "",
  primary_button_link: "",
  profile_image_url: "",
  background_word_top: "",
  background_word_bottom: "",
  // id and created_at are optional, so we don't need them
};
