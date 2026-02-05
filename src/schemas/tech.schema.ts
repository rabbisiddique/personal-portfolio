// schemas/tech.schema.ts
import { z } from "zod";

const StatusEnum = z.enum(["Online", "Offline"]);

// Form schema (what the user fills out)
export const TechStackFormSchema = z.object({
  title: z.string().min(1, "Technology name is required"),
  icon: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal(""))
    .nullable()
    .optional(),
  category: z.string().min(1, "Category is required").nullable(),
  description: z.string().min(1, "Description is required!"),
  level: z
    .number()
    .int()
    .min(0, "Level must be at least 0")
    .max(100, "Level cannot exceed 100"),
  type: z.string().nullable().optional(),
  status: StatusEnum.nullable(),
  // is_visible: z.boolean(),
  sub_title: z.string().nullable().optional(),
});

export type TechStackFormData = z.infer<typeof TechStackFormSchema>;

// Full database schema (includes auto-generated fields)
export const TechStackSchema = TechStackFormSchema.extend({
  id: z.string().uuid(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type TechStackItem = z.infer<typeof TechStackSchema>;

// Helper type for database insert (without id and timestamps)
export type TechStackInsert = Omit<
  TechStackItem,
  "id" | "created_at" | "updated_at"
>;

// Helper type for database update (all fields optional except id)
export type TechStackUpdate = Partial<TechStackInsert> & { id: string };
