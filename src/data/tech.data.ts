import {
  Database,
  Globe,
  Layout,
  LayoutGrid,
  Rocket,
  Server,
  Shield,
  Zap,
} from "lucide-react";
import { Category, Feature } from "../../types";

const getIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

export const CATEGORIES: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "Experience Layer",
    icon: Layout,
    colorClass: "blue",
    accentColor: "#3b82f6",
    description:
      "Architecting responsive, high-fidelity user experiences with modern reactive frameworks.",
    techs: [
      {
        name: "React",
        icon: getIcon("react"),
        level: 98,
        category: "Core",
        description: "Expertise in Hooks, Context, and Performance.",
      },
      {
        name: "Next.js",
        icon: getIcon("nextdotjs"),
        level: 95,
        category: "Framework",
        description: "SSR, ISR, and App Router mastery.",
      },
      {
        name: "TypeScript",
        icon: getIcon("typescript"),
        level: 92,
        category: "Language",
        description: "Deeply typed systems for safety.",
      },
      {
        name: "Tailwind",
        icon: getIcon("tailwindcss"),
        level: 97,
        category: "Design",
        description: "Utility-first rapid prototyping.",
      },
      {
        name: "Framer",
        icon: getIcon("framer"),
        level: 85,
        category: "Motion",
        description: "Orchestrating complex UI animations.",
      },
      {
        name: "Three.js",
        icon: getIcon("threedotjs"),
        level: 75,
        category: "3D",
        description: "WebGL-based interactive scenes.",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Engineered Logic",
    icon: Server,
    colorClass: "purple",
    accentColor: "#a855f7",
    description:
      "Designing resilient, secure, and distributed systems to handle high-concurrency workloads.",
    techs: [
      {
        name: "Node.js",
        icon: getIcon("nodedotjs"),
        level: 94,
        category: "Runtime",
        description: "Asynchronous event-driven I/O.",
      },
      {
        name: "NestJS",
        icon: getIcon("nestjs"),
        level: 88,
        category: "Framework",
        description: "Modular server-side architecture.",
      },
      {
        name: "GraphQL",
        icon: getIcon("graphql"),
        level: 85,
        category: "API",
        description: "Efficient data-fetching patterns.",
      },
      {
        name: "Python",
        icon: getIcon("python"),
        level: 82,
        category: "Language",
        description: "Data processing and automation.",
      },
      {
        name: "Go",
        icon: getIcon("go"),
        level: 80,
        category: "Language",
        description: "High-performance microservices.",
      },
      {
        name: "Redis",
        icon: getIcon("redis"),
        level: 88,
        category: "Cache",
        description: "In-memory distributed storage.",
      },
    ],
  },
  {
    id: "database",
    title: "Data",
    subtitle: "Information Core",
    icon: Database,
    colorClass: "emerald",
    accentColor: "#10b981",
    description:
      "Optimizing data persistence with a focus on integrity, scalability, and query efficiency.",
    techs: [
      {
        name: "PostgreSQL",
        icon: getIcon("postgresql"),
        level: 90,
        category: "SQL",
        description: "Complex relational modeling.",
      },
      {
        name: "MongoDB",
        icon: getIcon("mongodb"),
        level: 86,
        category: "NoSQL",
        description: "Document-based flexible schemas.",
      },
      {
        name: "Supabase",
        icon: getIcon("supabase"),
        level: 95,
        category: "BaaS",
        description: "Postgres-powered serverless stack.",
      },
      {
        name: "Prisma",
        icon: getIcon("prisma"),
        level: 92,
        category: "ORM",
        description: "Type-safe database interaction.",
      },
      {
        name: "Firebase",
        icon: getIcon("firebase"),
        level: 84,
        category: "BaaS",
        description: "Real-time sync and authentication.",
      },
      {
        name: "Pinecone",
        icon: getIcon("pinecone"),
        level: 78,
        category: "Vector",
        description: "High-dimensional vector search.",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    subtitle: "System Lifecycle",
    icon: Rocket,
    colorClass: "orange",
    accentColor: "#f97316",
    description:
      "Automating the delivery pipeline to ensure high availability and continuous integration.",
    techs: [
      {
        name: "Docker",
        icon: getIcon("docker"),
        level: 88,
        category: "Containment",
        description: "Standardized shipping containers.",
      },
      {
        name: "Kubernetes",
        icon: getIcon("kubernetes"),
        level: 75,
        category: "Orchestration",
        description: "Automated scaling and management.",
      },
      {
        name: "GH Actions",
        icon: getIcon("githubactions"),
        level: 92,
        category: "CI/CD",
        description: "Automated workflow pipelines.",
      },
      {
        name: "AWS",
        icon: getIcon("amazonaws"),
        level: 80,
        category: "Cloud",
        description: "Elastic cloud infrastructure.",
      },
      {
        name: "Terraform",
        icon: getIcon("terraform"),
        level: 78,
        category: "IaC",
        description: "Infrastructure as code.",
      },
      {
        name: "Vercel",
        icon: getIcon("vercel"),
        level: 95,
        category: "Edge",
        description: "Front-end delivery & edge functions.",
      },
    ],
  },
  {
    id: "stack",
    title: "Stack",
    subtitle: "Mastery Matrix",
    icon: LayoutGrid,
    colorClass: "rose",
    accentColor: "#f43f5e",
    description:
      "A comprehensive visualization of all integrated technologies in the Nexus OS ecosystem.",
    techs: [],
  },
];

export const FEATURES: Feature[] = [
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
];
