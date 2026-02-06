"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import {
  AILabChatFormData,
  AILabExperimentFormData,
} from "@/schemas/aiLabs.schema";
import { getErrorMessageServer } from "@/utils/getErrorMessageServer";

export const createAiLabsChatAction = async (chats: AILabChatFormData) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("ai_lab_chats")
      .insert([chats])
      .select();

    if (error) throw error;
    return {
      success: true,
      message: "Chat bubles created!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const updateAiLabsChatAction = async (
  chats: AILabChatFormData,
  chatId: string,
) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("ai_lab_chats")
      .update(chats)
      .eq("id", chatId);

    if (error) throw error;
    return {
      success: true,
      message: "Chat bubles updated!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update aiLabs chat"),
    };
  }
};

export const deleteAiLabsChatAction = async (chatId: string) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("ai_lab_chats")
      .delete()
      .eq("id", chatId);

    if (error) throw error;
    return {
      success: true,
      message: "Chat bubles deleted!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update aiLabs chat"),
    };
  }
};

// ai Experiments

export const createAiLabsExperimentsAction = async (
  experiments: AILabExperimentFormData,
) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("ai_lab_experiments")
      .insert([experiments])
      .select();

    if (error) throw error;
    return {
      success: true,
      message: "Experiments created!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(
        error,
        "Failed to create aiLabs experiments",
      ),
    };
  }
};

export const updateAiLabsExperimentsAction = async (
  expriments: AILabExperimentFormData,
  chatId: string,
) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("ai_lab_experiments")
      .update(expriments)
      .eq("id", chatId);

    if (error) throw error;
    return {
      success: true,
      message: "Experiments updated!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to update experiments"),
    };
  }
};

export const deleteAiLabsExperimentsAction = async (chatId: string) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("ai_lab_experiments")
      .delete()
      .eq("id", chatId);

    if (error) throw error;
    return {
      success: true,
      message: "Experiments deleted!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessageServer(error, "Failed to delete experiments"),
    };
  }
};

export async function getAiLabsData() {
  const supabase = await createServerSupabase();

  const [chatRes, roadmapRes] = await Promise.all([
    supabase
      .from("ai_lab_chats")
      .select("*")
      .order("created_at", { ascending: true }),
    supabase
      .from("ai_lab_experiments")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  if (chatRes.error) throw chatRes.error;
  if (roadmapRes.error) throw roadmapRes.error;

  return {
    chat: {
      messages: chatRes.data ?? [],
    },
    roadmap: {
      experiments: roadmapRes.data ?? [],
    },
  };
}
