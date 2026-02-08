"use client";

import { getTimeLineData } from "@/action/admin/timeline.action";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { TimelineEntry } from "../../admin.types";

type TimelineData = {
  workRes: TimelineEntry[];
  experienceRes: TimelineEntry[];
};

export function useTimeLine() {
  const [data, setData] = useState<TimelineData>({
    workRes: [],
    experienceRes: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getTimeLineData();
        if (res.data) {
          setData(res?.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Chat channel
    const chatChannel = supabase
      .channel("time-line-work-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "time_line_work" },
        (payload) => {
          console.log(payload);

          setData((current) => {
            const msg = payload.new as TimelineEntry;
            switch (payload.eventType) {
              case "INSERT":
                return {
                  ...current,
                  workRes: [...current.workRes, msg],
                };
              case "UPDATE":
                return {
                  ...current,
                  workRes: current.workRes.map((m) =>
                    m.id === msg.id ? msg : m,
                  ),
                };
              case "DELETE":
                return {
                  ...current,
                  workRes: current.workRes.filter(
                    (m) => m.id !== (payload.old as TimelineEntry).id,
                  ),
                };
              default:
                return current;
            }
          });
        },
      )
      .subscribe();

    // Experience channel
    const expChannel = supabase
      .channel("time-line-ex-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "time_line_experience" },
        (payload) => {
          console.log(payload);

          setData((current) => {
            const msg = payload.new as TimelineEntry;
            switch (payload.eventType) {
              case "INSERT":
                return {
                  ...current,
                  experienceRes: [...current.experienceRes, msg],
                };
              case "UPDATE":
                return {
                  ...current,
                  experienceRes: current.experienceRes.map((m) =>
                    m.id === msg.id ? msg : m,
                  ),
                };
              case "DELETE":
                return {
                  ...current,
                  experienceRes: current.experienceRes.filter(
                    (m) => m.id !== (payload.old as TimelineEntry).id,
                  ),
                };
              default:
                return current;
            }
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatChannel);
      supabase.removeChannel(expChannel);
    };
  }, []);

  return { data, isLoading };
}
