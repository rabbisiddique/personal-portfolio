import {
  AboutData,
  AILabsData,
  ContactPageData,
  HeroData,
  Project,
  TechCategory,
  TechItem,
  TimelineEntry,
} from "./admin.types";

export const MOCK_HERO_DATA: HeroData = {
  identity: {
    firstName: "Xylon",
    lastName: "Prime",
    systemLabel: "System_Uplink_v3",
    connectionText: "Establishing Connection...",
  },
  summary: {
    roles: [
      "Neural Architect",
      "Full-Stack Engineer",
      "Creative Technologist",
      "Systems Thinker",
    ],
    description:
      "Architecting digital ecosystems where performance meets aesthetic precision. My technical philosophy is rooted in the synthesis of complex algorithmic logic and intuitive, motion-driven human interfaces.",
  },
  cta: {
    primaryButtonText: "Initialize Archive",
    primaryButtonLink: "projects",
  },
  visuals: {
    profileImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    profileImageAlt:
      "Artistic portrait of the operator in high-contrast cinematic lighting",
    backgroundWordTop: "SYSTEM",
    backgroundWordBottom: "ARCHITECT",
  },
  config: {
    theme: "dark",
  },
};

export const MOCK_TECH_CATEGORIES: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend Core",
    description: "Visual interface systems",
    accentColor: "#3b82f6",
    order: 1,
    enabled: true,
  },
  {
    id: "backend",
    title: "Backend Core",
    description: "Logic processing units",
    accentColor: "#9333ea",
    order: 2,
    enabled: true,
  },
  {
    id: "devops",
    title: "Infra Nodes",
    description: "Deployment & Stability",
    accentColor: "#f59e0b",
    order: 3,
    enabled: true,
  },
  {
    id: "data",
    title: "Data Matrix",
    description: "Information storage",
    accentColor: "#ec4899",
    order: 4,
    enabled: true,
  },
  {
    id: "stack",
    title: "Full Matrix",
    description: "Comprehensive Overview",
    accentColor: "#22c55e",
    order: 5,
    enabled: true,
  },
];

export const MOCK_TECHS: TechItem[] = [
  {
    id: "t1",
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "frontend",
    description: "Component-driven UI matrix",
    level: 92,
    status: "Online",
    isVisible: true,
  },
  {
    id: "t2",
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "backend",
    description: "Server-side runtime logic",
    level: 88,
    status: "Online",
    isVisible: true,
  },
  {
    id: "t3",
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "devops",
    description: "Containerization protocols",
    level: 82,
    status: "Online",
    isVisible: true,
  },
  {
    id: "t4",
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "frontend",
    description: "Typed JavaScript synthesis",
    level: 96,
    status: "Online",
    isVisible: true,
  },
  {
    id: "t5",
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "backend",
    description: "Multi-purpose logic script",
    level: 85,
    status: "Online",
    isVisible: true,
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    project_title: "Nebula Dashboard",
    description:
      "A comprehensive analytics dashboard for cloud infrastructure monitoring with real-time alerts.",
    image_url: "https://picsum.photos/seed/nebula/800/600",
    category: "SaaS",
    tech_stack: ["React", "TypeScript", "D3.js", "Tailwind"],
    links: {
      live_link: "https://example.com",
      github_link: "https://github.com/example/nebula",
    },
  },
  {
    id: "2",
    project_title: "CryptoFlow",
    description:
      "Decentralized exchange platform supporting multi-chain swaps and liquidity mining protocols.",
    image_url: "https://picsum.photos/seed/crypto/800/600",
    category: "Web3",
    tech_stack: ["Next.js", "Solidity", "Ethers.js"],
    links: {
      live_link: "https://example.com",
      github_link: "https://github.com/example/cryptoflow",
      video_link: "https://youtube.com/watch?v=example",
    },
  },
  {
    id: "3",
    project_title: "ZenSpace App",
    description:
      "Mental wellness application featuring guided meditation, sleep tracking, and personalized coaching.",
    image_url: "https://picsum.photos/seed/zen/800/600",
    category: "Mobile",
    tech_stack: ["React Native", "Firebase", "Redux"],
    links: {
      github_link: "https://github.com/example/zenspace",
    },
  },
];

export const PROJECT_CATEGORIES = [
  // Core Web
  "Frontend",
  "Backend",
  "Full Stack",
  "Web Application",
  "Landing Page",

  // Product & Platforms
  "SaaS",
  "Startup MVP",
  "Enterprise Application",
  "Internal Tool",
  "Admin Dashboard",

  // Domains
  "E-commerce",
  "Fintech",
  "EdTech",
  "HealthTech",
  "PropTech",
  "GovTech",
  "TravelTech",
  "LegalTech",
  "HRTech",

  // Emerging Tech
  "AI / ML",
  "Web3",
  "Blockchain",
  "AR / VR",

  // Mobile & Desktop
  "Mobile App",
  "Cross-Platform App",
  "Desktop App",
  "PWA",

  // Data & Infra
  "Data Visualization",
  "Analytics",
  "DevOps",
  "API / Microservices",

  // UX / Design
  "UI / UX",
  "Design System",
  "Animation / Motion",

  // Media & Content
  "CMS",
  "Blog Platform",
  "Portfolio Website",
  "Marketing Website",

  // Experiments
  "Open Source",
  "Side Project",
  "Hackathon Project",
  "Experimental",
];

export const MOCK_ABOUT_DATA: AboutData = {
  hero: {
    firstName: "Xylon",
    lastName: "Prime",
    roleTitle: "Neural Architect",
    operatorLabel: "OPERATOR_01",
    tagline: "Synthesizing imagination with algorithmic precision.",
    description:
      "Multi-disciplinary developer specializing in high-performance web systems and AI-driven interfaces.",
  },
  systemStats: [
    {
      id: "s1",
      label: "Uptime",
      value: "99.99%",
      icon: "Activity",
      color: "cyan",
    },
    {
      id: "s2",
      label: "Efficiency",
      value: "1.4ms",
      icon: "Zap",
      color: "indigo",
    },
  ],
  personalInfo: [
    {
      id: "b1",
      label: "Origin",
      value: "Tokyo_Sector_04",
      icon: "MapPin",
      highlight: true,
    },
    { id: "b2", label: "Protocol", value: "admin@xylon.prime", icon: "Mail" },
  ],
  expertise: [
    {
      id: "e1",
      title: "Neural Systems",
      description: "Architecting deep learning feedback loops.",
      icon: "Brain",
      level: 94,
    },
    {
      id: "e2",
      title: "Visual Logic",
      description: "Advanced UI component synchronization.",
      icon: "Layers",
      level: 98,
    },
  ],
  systemLabels: {
    biometricTitle: "Operator Identity",
    expertiseTitle: "Technical Calibration",
    footerLabel: "XYLON_CORE_v8",
  },
};

export const MOCK_EXPERIENCE_LIST: TimelineEntry[] = [
  {
    id: "exp1",
    year: "2023",
    period: "Jan 2023 - Present",
    title: "Hyperion Labs",
    role: "Lead Neural Architect",
    description:
      "Overseeing the integration of generative AI nodes into enterprise CRM systems.",
    skills: ["React", "OpenAI SDK", "Next.js"],
    achievements: [
      "Increased system throughput by 45%",
      "Architected private LLM bridge",
    ],
    icon: "Briefcase",
    accent: "#06b6d4",
    order: 1,
    status: "active",
  },
  {
    id: "exp2",
    year: "2021",
    period: "June 2021 - Dec 2022",
    title: "Void Digital",
    role: "Senior System Engineer",
    description:
      "Developed scalable micro-frontend architectures for high-traffic e-commerce platforms.",
    skills: ["TypeScript", "Kubernetes", "Svelte"],
    achievements: ["Reduced bundle size by 60%"],
    icon: "Cpu",
    accent: "#8b5cf6",
    order: 2,
    status: "active",
  },
];

export const MOCK_EDUCATION_LIST: TimelineEntry[] = [
  {
    id: "edu1",
    year: "2019",
    period: "2015 - 2019",
    title: "Imperial Academy of Logic",
    role: "B.Sc. Cybernetic Engineering",
    description: "First Class Honours in Advanced System Theory.",
    skills: ["C++", "Control Theory", "Physics"],
    achievements: ["Excellence in Innovation Award"],
    icon: "GraduationCap",
    accent: "#ec4899",
    order: 1,
    status: "active",
  },
];

export const MOCK_AI_LABS_DATA: AILabsData = {
  hero: {
    title: "NEURAL_LABS_07",
    subtitle:
      "Pushing the boundaries of autonomous logic and synthetic creativity.",
    philosophyQuote:
      "In the depth of the machine, we find the reflection of our own untapped potential.",
  },
  chat: {
    chatTitle: "Aura_Unit_04",
    chatStatus: "Sync: 124ms • Encryption: RSA-4096",
    messages: [
      {
        id: "m1",
        role: "bot",
        content:
          "Core initialization complete. System status: Optimized. Awaiting research directives.",
        time: "10:00",
      },
      {
        id: "m2",
        role: "user",
        content: "Simulate recursive entropy in the latent space.",
        time: "10:02",
      },
    ],
    examplePrompts: [
      "Trajectory Analysis",
      "Entropy Simulation",
      "Neural Weight Decay",
    ],
  },
  roadmap: {
    roadmapTitle: "Development Matrix",
    experiments: [
      {
        id: "exp1",
        title: "Synapse Synthesis",
        model: "UI Ready",
        description: "Real-time generation of neural pathway visualizations.",
        complexity: 88,
        status: "Active",
        accent: "#06b6d4",
        tags: ["Visual", "AI"],
      },
      {
        id: "exp2",
        title: "Logic Refactor",
        model: "In Progress",
        description:
          "Autonomous code optimization through self-correction protocols.",
        complexity: 94,
        status: "Active",
        accent: "#a855f7",
        tags: ["Code", "Logic"],
      },
    ],
  },
};

export const MOCK_CONTACT_DATA: ContactPageData = {
  profile: {
    profileImage: "https://picsum.photos/seed/prime/400/400",
    profileName: "Xylon Prime",
    profileTitle: "Nexus Administrator",
    profileStatus: "Link Active",
  },
  services: [
    {
      id: "s1",
      label: "Full-Stack System Sync",
      icon: "Code2",
      meta: "High-end ecosystem development",
    },
    {
      id: "s2",
      label: "Neural Interface Design",
      icon: "BrainCircuit",
      meta: "Advanced dashboard architecture",
    },
  ],
  contactNodes: [
    {
      id: "c1",
      icon: "Mail",
      label: "Comms Channel",
      value: "admin@xylon.prime",
      link: "mailto:admin@xylon.prime",
    },
    {
      id: "c2",
      icon: "Github",
      label: "Code Archive",
      value: "@xylon_prime",
      link: "https://github.com",
    },
  ],
  optional: {
    footerQuote: "Transmission complete. Connection remains secure.",
    headerStatusText: "Frequency: 8.4GHz • Global Node",
  },
};
