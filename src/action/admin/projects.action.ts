"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { ProjectFormData } from "@/schemas/projects.schema";
import { getErrorMessageServer } from "@/utils/getErrorMessageServer";

export const createProjectAction = async (projects: ProjectFormData) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert(projects)
      .select();
    if (error) throw error;

    return {
      success: true,
      data,
      message: "Project created!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to create project"),
    };
  }
};

export const updateProjectAction = async (
  projects: ProjectFormData,
  projectId: string,
) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("projects")
      .update(projects)
      .eq("id", projectId);

    if (error) throw error;

    return {
      success: true,
      message: "Project updated!",
      data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update project"),
    };
  }
};

export const deleteProjectAction = async (projectId: string) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) throw error;

    return {
      success: true,
      message: "Project deleted!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to delete project"),
    };
  }
};

export const getProjectsAction = async () => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      return {
        success: false,
        message: error.message,
        status: 400,
      };
    }

    return {
      success: true,
      message: "Hero fetched!",
      status: 200,
      data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to fetch projects"),
    };
  }
};
