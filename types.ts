import { LucideIcon } from "lucide-react";

export interface Tech {
  name: string;
  icon: string;
  level: number;
  category: string;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  techs: Tech[];
  description: string;
  colorClass: string;
  accentColor: string;
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
