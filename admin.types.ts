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
  identity: {
    firstName: string;
    lastName: string;
    systemLabel: string;
    connectionText: string;
  };
  summary: {
    roles: string[];
    description: string;
  };
  cta: {
    primaryButtonText: string;
    primaryButtonLink: string;
  };
  visuals: {
    profileImageUrl: string;
    profileImageAlt: string;
    backgroundWordTop: string;
    backgroundWordBottom: string;
  };
  config: {
    theme: Theme;
  };
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
  name: string;
  icon: string;
  category: string;
  description: string;
  level: number;
  status: "Online" | "Offline";
  isVisible: boolean;
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

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  techStack: string[];
  links: {
    demo?: string;
    github?: string;
    video?: string;
  };
}

export interface AboutData {
  hero: {
    firstName: string;
    lastName: string;
    roleTitle: string;
    operatorLabel: string;
    tagline: string;
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
    icon: string;
    level: number;
  }[];
  systemLabels: {
    biometricTitle: string;
    expertiseTitle: string;
    footerLabel: string;
  };
}

export interface LabMessage {
  id: string;
  role: "bot" | "user";
  content: string;
  time: string;
}

export interface LabExperiment {
  id: string;
  title: string;
  model: "UI Ready" | "Planned" | "In Progress";
  description: string;
  complexity: number;
  status: "Stable" | "Idle" | "Active";
  accent: string;
  tags: string[];
}

export interface AILabsData {
  hero: { title: string; subtitle: string; philosophyQuote: string };
  chat: {
    chatTitle: string;
    chatStatus: string;
    messages: LabMessage[];
    examplePrompts: string[];
  };
  roadmap: { roadmapTitle: string; experiments: LabExperiment[] };
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
