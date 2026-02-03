"use server";

import { createServerSupabase } from "@/lib/supabase/server";

export const LoginAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: true,
      message: "Login Successful",
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
