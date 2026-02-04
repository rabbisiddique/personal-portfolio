import { supabase } from "@/lib/supabase/client";

export async function uploadProjectImage(file: File): Promise<string> {
  const filePath = `projects_images/${file.name}`;

  // Upload file
  const { data, error } = await supabase.storage
    .from("projects_images")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("projects_images")
    .getPublicUrl(filePath); // pass the file path

  return urlData.publicUrl; // ✅ access via data.publicUrl
}
