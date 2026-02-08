"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { getErrorMessageServer } from "@/utils/getErrorMessageServer";
import { TimelineEntry } from "../../../admin.types";

export const createTimeLineWorkAction = async (timelines: TimelineEntry) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("time_line_work")
      .insert([timelines])
      .select();

    if (error) throw error;
    return {
      success: true,
      message: "TimeLine work created!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const updateTimeLineWorkAction = async (
  timelines: TimelineEntry,
  lineId: string,
) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("time_line_work")
      .update(timelines)
      .eq("id", lineId);

    if (error) throw error;
    return {
      success: true,
      message: "Time line work updated!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update time line work"),
    };
  }
};

export const deleteTimeLineWorkAction = async (lineId: string) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("time_line_work")
      .delete()
      .eq("id", lineId);

    if (error) throw error;
    return {
      success: true,
      message: "Time line work deleted!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to delete time line work"),
    };
  }
};

// ai Experiments

export const createTimeLineExperienceAction = async (
  experiences: TimelineEntry,
) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("time_line_experience")
      .insert([experiences])
      .select();

    if (error) throw error;
    return {
      success: true,
      message: "Experience created!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(
        error,
        "Failed to create Time line experience",
      ),
    };
  }
};

export const updateTimeLineExperienceAction = async (
  experiences: TimelineEntry,
  exId: string,
) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("time_line_experience")
      .update(experiences)
      .eq("id", exId);

    if (error) throw error;
    return {
      success: true,
      message: "Experience updated!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update experience"),
    };
  }
};

export const deleteTimeLineExperienceAction = async (exId: string) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("time_line_experience")
      .delete()
      .eq("id", exId);

    if (error) throw error;
    return {
      success: true,
      message: "Experience deleted!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to delete experience"),
    };
  }
};

export async function getTimeLineData() {
  const supabase = await createServerSupabase();

  const [workRes, experienceRes] = await Promise.all([
    supabase
      .from("time_line_work")
      .select("*")
      .order("created_at", { ascending: true }),
    supabase
      .from("time_line_experience")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  if (workRes.error) throw workRes.error;
  if (experienceRes.error) throw experienceRes.error;

  return {
    data: {
      workRes: workRes.data || [], // only the rows
      experienceRes: experienceRes.data || [],
    },
  };
}
