"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { AboutData } from "../../admin.types";

export function useAbout() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .single();

      if (!error && data) {
        setAboutData({
          hero: data.hero,
          systemStats: data.system_stats,
          personalInfo: data.personal_info,
          expertise: data.expertise,
        });
      } else {
        setAboutData(null);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchAbout();

    const channel = supabase
      .channel("about_content_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "about_content",
        },
        (payload) => {
          if (
            payload.eventType === "UPDATE" ||
            payload.eventType === "INSERT"
          ) {
            const newData = payload.new;
            setAboutData({
              hero: newData.hero,
              systemStats: newData.system_stats || [],
              personalInfo: newData.personal_info || [],
              expertise: newData.expertise || [],
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Real-time Supabase subscription
  // useEffect(() => {}, [setAboutData]);

  return { aboutData, isLoading, setAboutData };
}
