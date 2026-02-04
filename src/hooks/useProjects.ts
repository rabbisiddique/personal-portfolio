"use client";

import { getProjectsAction } from "@/action/admin/projects.action";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Project } from "../../admin.types";

export function useProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const res = await getProjectsAction();
      console.log(res);

      if (res.success && res.data) {
        setProjects(res.data);
      } else {
        setProjects([]);
      }

      setIsLoading(false);
    };

    fetchProjects();

    // Set up realtime subscription
    const channel = supabase
      .channel("projects-changes")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "projects",
        },
        (payload) => {
          console.log("Change received!", payload);

          if (payload.eventType === "INSERT") {
            setProjects((current) => [payload.new as Project, ...current]);
          } else if (payload.eventType === "UPDATE") {
            setProjects((current) =>
              current.map((project) =>
                project.id === payload.new.id
                  ? (payload.new as Project)
                  : project,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setProjects((current) =>
              current.filter((project) => project.id !== payload.old.id),
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
    projects,
    isLoading,
  };
}
