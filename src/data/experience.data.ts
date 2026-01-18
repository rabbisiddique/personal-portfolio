import { GraduationCap, Layout, Server } from "lucide-react";
import { ExperienceNode } from "../../types";

export const EXPERIENCE_ROADMAP: ExperienceNode[] = [
  {
    id: "exp-02",
    year: "2025",
    title: "Backend Core Integration",
    period: "Jan 2025 — Present",
    role: "Full-Stack Convergence",
    description:
      "Mastering the engine behind the interface. Shifted focus to server-side architecture, data persistence, and secure API design.",
    skills: ["Node.js", "PostgreSQL", "Supabase", "Auth Systems", "API Design"],
    achievements: [
      "Built resilient server architectures with NestJS",
      "Optimized relational databases for sub-50ms query times",
      "Implemented secure JWT and OAuth2 authentication flows",
    ],
    icon: Server,
    accent: "#a855f7",
  },
  {
    id: "exp-01",
    year: "2024",
    title: "Frontend Matrix Evolution",
    period: "Jan 2024 — Dec 2024",
    role: "Interface Specialist",
    description:
      "The beginning of the technical journey. Dedicated a full year to mastering the visual layer and user interaction logic.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "UI/UX"],
    achievements: [
      "Mastered reactive state management with Redux/Zustand",
      "Developed high-fidelity, accessible UI component libraries",
      "Engineered complex motion systems for immersive storytelling",
    ],
    icon: Layout,
    accent: "#3b82f6",
  },
];

export const EDUCATION_ROADMAP: ExperienceNode[] = [
  {
    id: "edu-01",
    year: "Graduated",
    title: "Higher Secondary Certificate",
    period: "Completed",
    role: "Academic Foundation",
    description:
      "Formal education phase focusing on analytical thinking, mathematics, and fundamental sciences, providing the logical groundwork for engineering.",
    skills: [
      "Mathematics",
      "Physics",
      "Analytical Thinking",
      "Self-Discipline",
    ],
    achievements: [
      "Successfully cleared HSC with a focus on Science/Mathematics",
      "Developed strong problem-solving foundations",
      "Transitioned into independent technical research",
    ],
    icon: GraduationCap,
    accent: "#94a3b8",
  },
];
