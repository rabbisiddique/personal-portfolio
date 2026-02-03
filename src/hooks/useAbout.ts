"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { AboutData } from "../../admin.types";

export function useAbout() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAbout = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .single();

      if (!isMounted) return;

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

    return () => {
      isMounted = false;
    };
  }, []);

  return { aboutData, isLoading, setAboutData };
}
