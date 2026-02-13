"use client";

import { getTechAction } from "@/action/admin/tech.action";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { TechItem } from "../../admin.types";

export function useTech() {
  const [teches, setTeches] = useState<TechItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Separate effect for initial fetch
  useEffect(() => {
    const fetchTeches = async () => {
      setIsLoading(true);

      const res = await getTechAction();
      console.log("Fetching techs:", res);

      if (res.data && res.data) {
        setTeches(res.data);
      } else {
        setTeches([]);
      }

      setIsLoading(false);
    };
    fetchTeches();
  }, []);

  // Separate effect for realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("tech_stack_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tech_stack",
        },
        (payload) => {
          console.log("Realtime change received!", payload);

          if (payload.eventType === "INSERT") {
            setTeches((current) => [...current, payload.new as TechItem]);
          } else if (payload.eventType === "UPDATE") {
            setTeches((current) =>
              current.map((tech) =>
                tech.id === (payload.new as TechItem).id
                  ? (payload.new as TechItem)
                  : tech,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setTeches((current) =>
              current.filter(
                (tech) => tech.id !== (payload.old as TechItem).id,
              ),
            );
          }
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      console.log("Unsubscribing from tech_stack channel");
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array - only subscribe once

  return {
    teches,
    isLoading,
  };
}
