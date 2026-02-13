import { LucideIcon } from "lucide-react";
import { TechItem } from "./admin.types";

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  accentColor: string;
  description: string;
  techs: TechItem[]; // Changed from Tech[] to TechItem[]
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  image: string;
  stats: { label: string; value: string }[];
  status: "Deployed" | "Active" | "Beta";
  links: {
    github?: string;
    demo?: string;
    video?: string;
  };
}

export interface ExperienceNode {
  id: string;
  year: string;
  title: string;
  period: string;
  role: string;
  description: string;
  skills: string[];
  achievements: string[];
  icon: LucideIcon;
  accent: string;
}

export interface LabExperiment {
  id: string;
  title: string;
  model: string;
  description: string;
  complexity: number;
  status: "Idle" | "Processing" | "Stable";
  accent: string;
  tags: string[];
}
