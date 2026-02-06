"use client";

import { getAiLabsData } from "@/action/admin/aiLabs.action";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { LabExperiment, LabMessage } from "../../admin.types";

type AiLabsData = {
  chat: { messages: LabMessage[] };
  roadmap: { experiments: LabExperiment[] };
};

export function useAiLabs() {
  const [data, setData] = useState<AiLabsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAiLabsData();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Chat channel
    const chatChannel = supabase
      .channel("ai-labs-chat-channel") // unique name
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ai_lab_chats" },
        (payload) => {
          console.log(payload);

          setData((current) => {
            if (!current) return current;
            const msg = payload.new as LabMessage;
            switch (payload.eventType) {
              case "INSERT":
                return {
                  ...current,
                  chat: { messages: [msg, ...current.chat.messages] },
                };
              case "UPDATE":
                return {
                  ...current,
                  chat: {
                    messages: current.chat.messages.map((m) =>
                      m.id === msg.id ? msg : m,
                    ),
                  },
                };
              case "DELETE":
                return {
                  ...current,
                  chat: {
                    messages: current.chat.messages.filter(
                      (m) => m.id !== (payload.old as LabMessage).id,
                    ),
                  },
                };
              default:
                return current;
            }
          });
        },
      )
      .subscribe();

    // Experiment channel
    const expChannel = supabase
      .channel("ai-labs-exp-channel") // unique name
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ai_lab_experiments" },
        (payload) => {
          setData((current) => {
            if (!current) return current;
            const exp = payload.new as LabExperiment;
            switch (payload.eventType) {
              case "INSERT":
                return {
                  ...current,
                  roadmap: {
                    experiments: [exp, ...current.roadmap.experiments],
                  },
                };
              case "UPDATE":
                return {
                  ...current,
                  roadmap: {
                    experiments: current.roadmap.experiments.map((e) =>
                      e.id === exp.id ? exp : e,
                    ),
                  },
                };
              case "DELETE":
                return {
                  ...current,
                  roadmap: {
                    experiments: current.roadmap.experiments.filter(
                      (e) => e.id !== (payload.old as LabExperiment).id,
                    ),
                  },
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
