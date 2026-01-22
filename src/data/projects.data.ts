import { Project } from "../../types";

export const PROJECTS: Project[] = [
  {
    id: "nexus-v1",
    title: "NEXUS CORE_SYSTEM",
    category: "Infrastructure",
    description:
      "A high-performance biometric dashboard featuring real-time neural processing simulation for decentralized edge networks.",
    techStack: ["React", "WebGL", "Framer", "Rust"],
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Sync_Rate", value: "0.02ms" },
      { label: "Throughput", value: "4.2 TB/s" },
    ],
    status: "Deployed",
    links: { github: "https://github.com", demo: "https://demo.com" },
  },
  {
    id: "synapse-ai",
    title: "SYNAPSE NEURAL_HUB",
    category: "AI Laboratory",
    description:
      "Advanced inference engine processing vector embeddings across globally distributed nodes with zero-trust verification.",
    techStack: ["Next.js", "PyTorch", "Pinecone", "GRPC"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Inference", value: "12.4ms" },
      { label: "Confidence", value: "98.2%" },
    ],
    status: "Active",
    links: { github: "https://github.com" },
  },
  {
    id: "matrix-db",
    title: "MATRIX VAULT_V2",
    category: "Security",
    description:
      "Encrypted document storage architecture utilizing sharded blockchain states for immutable audit trails.",
    techStack: ["Go", "Solidity", "IPFS", "Docker"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Encryption", value: "AES-512" },
    ],
    status: "Beta",
    links: { demo: "https://demo.com", github: "https://github.com" },
  },
  {
    id: "mongo-db",
    title: "MONGO VAULT_V2",
    category: "Security",
    description:
      "Encrypted document storage architecture utilizing sharded blockchain states for immutable audit trails.",
    techStack: ["Go", "Solidity", "IPFS", "Docker"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Encryption", value: "AES-512" },
    ],
    status: "Beta",
    links: { demo: "https://demo.com", github: "https://github.com" },
  },
];
