export type Theme = "dark" | "light";
export type PageId =
  | "home"
  | "skills"
  | "about"
  | "projects"
  | "experience"
  | "contact"
  | "ai-labs";

export interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}

export interface HeroData {
  first_name: string;
  last_name: string;
  system_label: string;
  connection_text: string;

  roles: string[];
  description: string;
  primary_buttonText: string;
  primaryButtonLink: string;

  profileImageUrl: string;
  backgroundWordTop: string;
  backgroundWordBottom: string;
}

export interface TechCategory {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  order: number;
  enabled: boolean;
}

export interface TechItem {
  id: string;
  title: string;
  sub_title: string;
  icon: string;
  category: string;
  description: string;
  level: number;
  type: string;
  status: "Online" | "Offline";
  // isVisible: boolean;
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  period: string;
  role: string;
  description: string;
  skills: string[];
  achievements: string[];
  icon: string;
  accent: string;
  order: number;
  status: "active" | "draft" | "archived";
}

export interface ProjectLinks {
  live_link?: string;
  github_link?: string;
  video_link?: string;
}

export interface Project {
  id: string;
  project_title: string;
  description: string;
  image_url: string;
  category: string;
  tech_stack: string[];
  links: ProjectLinks;
}

export type ViewMode = "grid" | "list";

export interface AboutData {
  hero: {
    first_name: string;
    last_name: string;
    role_title: string;
    operator_label: string;
    background_text: string;
    description: string;
  };
  systemStats: {
    id: string;
    label: string;
    value: string;
    icon: string;
    color: string;
  }[];
  personalInfo: {
    id: string;
    label: string;
    value: string;
    icon: string;
    highlight?: boolean;
  }[];
  expertise: {
    id: string;
    title: string;
    description: string;
    extra_description: string;
    icon: string;
    level: string;
  }[];
}

export interface LabMessage {
  id: string;
  role: "bot" | "user";
  chat_content: string;
  command: string[];
  time: string;
}

export interface LabExperiment {
  id: string; // UUID
  title: string; // Experiment title
  model?: "UI Ready" | "Planned" | "In Progress"; // Phase or model
  description: string; // Experiment description
  accent?: string; // Hex color code
  tags: string[]; // List of tags
  created_at?: string; // Optional timestamp
  updated_at?: string; // Optional timestamp
}

export interface ContactPageData {
  profile: {
    profileImage: string;
    profileName: string;
    profileTitle: string;
    profileStatus: string;
  };
  services: { id: string; label: string; icon: string; meta: string }[];
  contactNodes: {
    id: string;
    icon: string;
    label: string;
    value: string;
    link: string;
  }[];
  optional: { footerQuote: string; headerStatusText: string };
}
