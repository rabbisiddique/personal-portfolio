"use client";

import { getTechAction } from "@/action/admin/tech.action";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { TechItem } from "../../admin.types";

export function useTech() {
  const [teches, setTeches] = useState<TechItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeches = async () => {
      setIsLoading(true);

      const res = await getTechAction();
      console.log(res);

      if (res.data && res.data) {
        setTeches(res.data);
      } else {
        setTeches([]);
      }

      setIsLoading(false);
    };

    fetchTeches();

    // Set up realtime subscription
    const channel = supabase
      .channel("tech_stack_changes")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "tech_stack",
        },
        (payload) => {
          console.log("Change received!", payload);

          if (payload.eventType === "INSERT") {
            setTeches((current) => [payload.new as TechItem, ...current]);
          } else if (payload.eventType === "UPDATE") {
            setTeches((current) =>
              current.map((tech) =>
                tech.id === payload.new.id ? (payload.new as TechItem) : tech,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setTeches((current) =>
              current.filter((tech) => tech.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    teches,
    isLoading,
  };
}
