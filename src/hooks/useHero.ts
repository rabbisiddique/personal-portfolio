"use client";

import { getHeroAction } from "@/action/admin/hero.action";
import { supabase } from "@/lib/supabase/client";
import { HeroFormData } from "@/schemas/hero.schema";
import { useEffect, useState } from "react";

export function useHero() {
  const [hero, setHero] = useState<HeroFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchHero = async () => {
      setIsLoading(true);
      const res = await getHeroAction();
      console.log(res);

      if (!isMounted) return;

      if (res.success && res.data) {
        setHero(res.data);
        setExists(true);
      } else {
        setHero(null);
        setExists(false);
      }

      setIsLoading(false);
    };

    fetchHero();

    // 🔁 Real-time sync (UPDATE only)
    const channel = supabase
      .channel("hero_page_updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "hero_page",
        },
        (payload) => {
          setHero(payload.new as HeroFormData);
          setExists(true);
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    hero,
    isLoading,
    exists,
  };
}
