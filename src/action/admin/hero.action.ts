"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { HeroData } from "../../admin.types";

export const createHeroAction = async (heroData: HeroData) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("hero_page")
      .insert([heroData])
      .select();
    if (error) {
      return {
        success: false,
        message: error.message,
        status: 400,
      };
    }

    return {
      success: true,
      message: "Hero Saved!",
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "Inter Server Error",
      status: 500,
    };
  }
};

export const updateHeroAction = async (heroData: HeroData, heroId: string) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("hero_page")
      .update(heroData)
      .eq("id", heroId);

    if (error) {
      return {
        success: false,
        message: error.message,
        status: 400,
      };
    }

    return {
      success: true,
      message: "Hero Updated!",
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "Inter Server Error",
      status: 500,
    };
  }
};

export const getHeroAction = async () => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("hero_page")
      .select("*")
      .single();

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
  } catch (error) {
    return {
      success: false,
      message: "Inter Server Error",
      status: 500,
    };
  }
};
