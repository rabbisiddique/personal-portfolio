import { Project } from "../../types";

export const PROJECTS: Project[] = [
  {
    id: "nexus-v1",
    title: "Nexus Core v1",
    category: "Infrastucture",
    description:
      "A high-performance system monitoring dashboard with real-time biometric synchronization and neural processing simulation.",
    techStack: ["React", "TypeScript", "Framer Motion", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Stability", value: "99.9%" },
      { label: "Throughput", value: "2.4 GB/s" },
    ],
    status: "Deployed",
    links: { github: "#", demo: "#" },
  },
  {
    id: "synapse-ai",
    title: "Synapse AI",
    category: "Neural Net",
    description:
      "Decentralized AI inference engine capable of processing vector embeddings at sub-10ms latency across edge nodes.",
    techStack: ["Python", "Next.js", "Pinecone", "NestJS"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Inference", value: "8.2ms" },
      { label: "Accuracy", value: "94.5%" },
    ],
    status: "Active",
    links: { github: "#" },
  },
  {
    id: "matrix-db",
    title: "Matrix DB",
    category: "Persistence",
    description:
      "High-concurrency document storage solution optimized for distributed blockchain data verification and real-time state sync.",
    techStack: ["Go", "PostgreSQL", "Redis", "Docker"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Conn Count", value: "250k+" },
      { label: "Sync Latency", value: "1.2ms" },
    ],
    status: "Beta",
    links: { demo: "#" },
  },
];
