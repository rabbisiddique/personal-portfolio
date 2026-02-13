import {
  Database,
  Globe,
  Layout,
  LayoutGrid,
  LucideIcon,
  Rocket,
  Server,
  Shield,
  Zap,
} from "lucide-react";
import { TechItem } from "../../admin.types";

const getIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

// Extended Category type for UI (combines TechCategory with UI metadata)
export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  accentColor: string;
  description: string;
  techs: TechItem[];
}

// Static category UI metadata (icons, subtitles, colors)
export const CATEGORY_METADATA = {
  frontend: {
    id: "frontend",
    title: "Frontend",
    subtitle: "Experience Layer",
    icon: Layout,
    colorClass: "blue",
    accentColor: "#3b82f6",
    description:
      "Architecting responsive, high-fidelity user experiences with modern reactive frameworks.",
  },
  backend: {
    id: "backend",
    title: "Backend",
    subtitle: "Engineered Logic",
    icon: Server,
    colorClass: "purple",
    accentColor: "#a855f7",
    description:
      "Designing resilient, secure, and distributed systems to handle high-concurrency workloads.",
  },
  database: {
    id: "database",
    title: "Data",
    subtitle: "Information Core",
    icon: Database,
    colorClass: "emerald",
    accentColor: "#10b981",
    description:
      "Optimizing data persistence with a focus on integrity, scalability, and query efficiency.",
  },
  devops: {
    id: "devops",
    title: "DevOps",
    subtitle: "System Lifecycle",
    icon: Rocket,
    colorClass: "orange",
    accentColor: "#f97316",
    description:
      "Automating the delivery pipeline to ensure high availability and continuous integration.",
  },
  stack: {
    id: "stack",
    title: "Stack",
    subtitle: "Mastery Matrix",
    icon: LayoutGrid,
    colorClass: "rose",
    accentColor: "#f43f5e",
    description:
      "A comprehensive visualization of all integrated technologies in the Nexus OS ecosystem.",
  },
} as const;

export const FEATURES = [
  {
    icon: Zap,
    title: "Turbo Optimization",
    desc: "Achieving sub-second performance with advanced caching architectures.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Zero Trust Security",
    desc: "Implementing hardened authentication and end-to-end data encryption.",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Global Distribution",
    desc: "Utilizing globally distributed edge nodes for low-latency delivery.",
    color: "emerald",
  },
] as const;

export const mergeCategoriesWithData = (dbTechs: TechItem[]): Category[] => {
  // Group techs by category
  const groupedTechs = dbTechs.reduce<Record<string, TechItem[]>>(
    (acc, tech) => {
      // Map database category names to metadata keys
      let category = tech.category?.toLowerCase()?.trim() || "stack";

      // Map category aliases
      if (category === "data") category = "database";
      // Add more mappings if needed:
      // if (category === "dev-ops") category = "devops";
      // if (category === "front-end") category = "frontend";
      // if (category === "back-end") category = "backend";

      if (!acc[category]) acc[category] = [];
      acc[category].push(tech);
      return acc;
    },
    {},
  );

  // Merge with static metadata
  return Object.keys(CATEGORY_METADATA).map((key) => {
    const meta = CATEGORY_METADATA[key as keyof typeof CATEGORY_METADATA];
    return {
      ...meta,
      techs: groupedTechs[key] || [],
    };
  });
};
