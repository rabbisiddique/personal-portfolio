// lib/uploadImage.ts
import { supabase } from "@/lib/supabase/client";

export type ImageCategory =
  | "projects"
  | "tech_icons"
  | "profile"
  | "blog"
  | "general";

interface UploadOptions {
  category: ImageCategory;
  file: File;
  customFileName?: string; // Optional: provide your own filename
}

export async function uploadImage({
  category,
  file,
  customFileName,
}: UploadOptions): Promise<string> {
  // Generate unique filename if not provided
  const fileExt = file.name.split(".").pop();
  const fileName =
    customFileName ||
    `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  // Create folder path based on category
  const folderMap: Record<ImageCategory, string> = {
    projects: "projects_images",
    tech_icons: "tech_icons",
    profile: "profile_images",
    blog: "blog_images",
    general: "general_images",
  };

  const filePath = `${folderMap[category]}/${fileName}`;

  // Upload file
  const { data, error } = await supabase.storage
    .from("projects_images") // Your main bucket name
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false, // Don't overwrite existing files
    });

  if (error) {
    console.error("Upload error:", error);
    throw new Error(`Failed to upload ${category} image`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("projects_images")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

// Delete image by URL
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathMatch = url.pathname.match(/projects_images\/(.+)$/);

    if (!pathMatch) {
      console.warn("Could not parse image path from URL");
      return;
    }

    const filePath = pathMatch[1];

    const { error } = await supabase.storage
      .from("projects_images")
      .remove([filePath]);

    if (error) {
      console.error("Delete error:", error);
      throw new Error("Failed to delete image");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

// Convenience functions for specific use cases
export const uploadProjectImage = (file: File) =>
  uploadImage({ category: "projects", file });

export const uploadTechIcon = (file: File) =>
  uploadImage({ category: "tech_icons", file });

export const uploadProfileImage = (file: File) =>
  uploadImage({ category: "profile", file });

export const uploadBlogImage = (file: File) =>
  uploadImage({ category: "blog", file });
