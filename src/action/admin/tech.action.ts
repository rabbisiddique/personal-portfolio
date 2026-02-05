"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { TechStackFormData } from "@/schemas/tech.schema";
import { getErrorMessageServer } from "@/utils/getErrorMessageServer";

export const createTechAction = async (teches: TechStackFormData) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("tech_stack")
      .insert(teches)
      .select();
    if (error) throw error;

    return {
      success: true,
      data,
      message: "Tech created!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(
        error,
        "Failed to create tech in server action",
      ),
    };
  }
};

export const updateTechAction = async (
  teches: TechStackFormData,
  techId: string,
) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("tech_stack")
      .update(teches)
      .eq("id", techId);

    if (error) throw error;

    return {
      success: true,
      message: "Tech updated!",
      data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update tech in server"),
    };
  }
};

export const deleteTechAction = async (techId: string) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("tech_stack")
      .delete()
      .eq("id", techId);

    if (error) throw error;

    return {
      success: true,
      message: "Tech deleted!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to delete tech in server"),
    };
  }
};

export const getTechAction = async () => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase.from("tech_stack").select("*");

    if (error) {
      return {
        success: false,
        message: error.message,
        status: 400,
      };
    }

    return {
      success: true,
      message: "Tech fetched!",
      status: 200,
      data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to fetch teches"),
    };
  }
};
