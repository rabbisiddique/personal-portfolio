"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import {
  AboutData,
  ExpertiseData,
  ExpertiseSchema,
  HeroData,
  PersonalInfoData,
  PersonalInfoSchema,
  SystemStatData,
  SystemStatSchema,
} from "@/schemas/about.schema";
import { getErrorMessageServer } from "@/utils/getErrorMessageServer";
import { transformAboutData } from "@/utils/transformAboutData";
import { z } from "zod";

// Fix the ActionResponse type
type ActionResponse =
  | { success: true; data: AboutData }
  | { success: false; error: string };

const ABOUT_ID: string = "25eee460-0961-4234-8130-1761901045eb";

export async function updateHeroAction(
  hero: HeroData,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const { data, error } = await supabase
      .from("about_content")
      .update({ hero })
      .eq("id", ABOUT_ID)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: transformAboutData(data) };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update hero data"),
    };
  }
}

export const getAboutDataAction = async (): Promise<ActionResponse> => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: transformAboutData(data) };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to fetch about data"),
    };
  }
};

// ============================================
// STATS ACTIONS
// ============================================

export async function createStatAction(
  statData: Omit<z.infer<typeof SystemStatSchema>, "id">,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();
  try {
    const validatedData = SystemStatSchema.omit({ id: true }).parse(statData);

    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) {
      throw new Error("Please create hero section first");
    }

    const newStat: SystemStatData = {
      id: crypto.randomUUID(),
      ...validatedData,
    };

    const updatedStats = [...(existingData.system_stats || []), newStat];

    const { data, error } = await supabase
      .from("about_content")
      .update({ system_stats: updatedStats })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to create stat"),
    };
  }
}

export async function updateStatAction(
  statData: z.infer<typeof SystemStatSchema>,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const validatedData = SystemStatSchema.parse(statData);

    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) throw fetchError;

    const updatedStats = existingData.system_stats.map(
      (stat: SystemStatData) =>
        stat.id === validatedData.id ? validatedData : stat,
    );

    const { data, error } = await supabase
      .from("about_content")
      .update({ system_stats: updatedStats })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update stat"),
    };
  }
}

export async function deleteStatAction(
  statId: string,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) throw fetchError;

    const updatedStats = existingData.system_stats.filter(
      (stat: SystemStatData) => stat.id !== statId,
    );

    const { data, error } = await supabase
      .from("about_content")
      .update({ system_stats: updatedStats })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to delete stat"),
    };
  }
}

// ============================================
// PERSONAL INFO ACTIONS
// ============================================

export async function createPersonalInfoAction(
  infoData: Omit<z.infer<typeof PersonalInfoSchema>, "id">,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const validatedData = PersonalInfoSchema.omit({ id: true }).parse(infoData);

    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) {
      throw new Error("Please create hero section first");
    }

    const newInfo: PersonalInfoData = {
      id: crypto.randomUUID(),
      ...validatedData,
    };

    const updatedInfo = [...(existingData.personal_info || []), newInfo];

    const { data, error } = await supabase
      .from("about_content")
      .update({ personal_info: updatedInfo })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to create personal info"),
    };
  }
}

export async function updatePersonalInfoAction(
  infoData: z.infer<typeof PersonalInfoSchema>,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const validatedData = PersonalInfoSchema.parse(infoData);

    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) throw fetchError;

    const updatedInfo = existingData.personal_info.map(
      (info: PersonalInfoData) =>
        info.id === validatedData.id ? validatedData : info,
    );

    const { data, error } = await supabase
      .from("about_content")
      .update({ personal_info: updatedInfo })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update personal info"),
    };
  }
}

export async function deletePersonalInfoAction(
  infoId: string,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) throw fetchError;

    const updatedInfo = existingData.personal_info.filter(
      (info: PersonalInfoData) => info.id !== infoId,
    );

    const { data, error } = await supabase
      .from("about_content")
      .update({ personal_info: updatedInfo })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to delete personalInfo"),
    };
  }
}

// ============================================
// EXPERTISE ACTIONS
// ============================================

export async function createExpertiseAction(
  expertiseData: Omit<z.infer<typeof ExpertiseSchema>, "id">,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const validatedData = ExpertiseSchema.omit({ id: true }).parse(
      expertiseData,
    );

    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) {
      throw new Error("Please create hero section first");
    }

    const newExpertise: ExpertiseData = {
      id: crypto.randomUUID(),
      ...validatedData,
    };

    const updatedExpertise = [...(existingData.expertise || []), newExpertise];

    const { data, error } = await supabase
      .from("about_content")
      .update({ expertise: updatedExpertise })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to create expertise"),
    };
  }
}

export async function updateExpertiseAction(
  expertiseData: z.infer<typeof ExpertiseSchema>,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const validatedData = ExpertiseSchema.parse(expertiseData);

    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) throw fetchError;

    const updatedExpertise = existingData.expertise.map((exp: ExpertiseData) =>
      exp.id === validatedData.id ? validatedData : exp,
    );

    const { data, error } = await supabase
      .from("about_content")
      .update({ expertise: updatedExpertise })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update Expertise"),
    };
  }
}

export async function deleteExpertiseAction(
  expertiseId: string,
): Promise<ActionResponse> {
  const supabase = await createServerSupabase();

  try {
    const { data: existingData, error: fetchError } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (fetchError) throw fetchError;

    const updatedExpertise = existingData.expertise.filter(
      (exp: ExpertiseData) => exp.id !== expertiseId,
    );

    const { data, error } = await supabase
      .from("about_content")
      .update({ expertise: updatedExpertise })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: transformAboutData(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to delete expertise"),
    };
  }
}
