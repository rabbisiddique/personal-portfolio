// import { Code2, Cpu, Database, Layers, Lock, Zap } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function AboutPage() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [visible, setVisible] = useState({});

//   useEffect(() => {
//     const sections = [
//       "intro",
//       "capabilities",
//       "stack",
//       "mindset",
//       "growth",
//       "beyond",
//       "cta",
//     ];
//     sections.forEach((section, index) => {
//       setTimeout(() => {
//         setVisible((prev) => ({ ...prev, [section]: true }));
//       }, index * 100);
//     });
//   }, []);

//   const capabilities = [
//     {
//       icon: <Code2 className="w-5 h-5" />,
//       title: "Frontend Engineering",
//       desc: "Building responsive, performant UIs with modern frameworks",
//     },
//     {
//       icon: <Layers className="w-5 h-5" />,
//       title: "Backend Development",
//       desc: "Scalable server architecture and business logic",
//     },
//     {
//       icon: <Cpu className="w-5 h-5" />,
//       title: "API Design",
//       desc: "RESTful and GraphQL APIs with clean documentation",
//     },
//     {
//       icon: <Database className="w-5 h-5" />,
//       title: "Database Modeling",
//       desc: "Efficient schema design and query optimization",
//     },
//     {
//       icon: <Lock className="w-5 h-5" />,
//       title: "Authentication & Security",
//       desc: "OAuth, JWT, and secure access patterns",
//     },
//     {
//       icon: <Zap className="w-5 h-5" />,
//       title: "AI-Powered Features",
//       desc: "Integrating LLMs and intelligent automation",
//     },
//   ];

//   const techStack = {
//     Frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
//     Backend: ["Node.js", "Python", "Express", "FastAPI"],
//     Database: ["PostgreSQL", "MongoDB", "Redis"],
//     "Tooling / DevOps": ["Docker", "Git", "AWS", "Vercel"],
//   };

//   const journey = [
//     {
//       phase: "Learning",
//       focus: "Computer science fundamentals and modern web architecture",
//     },
//     {
//       phase: "Building",
//       focus: "Full-stack applications from concept to production",
//     },
//     {
//       phase: "Optimizing",
//       focus: "Performance tuning, scaling, and maintainable systems",
//     },
//   ];

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${
//         darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
//       }`}
//     >
//       {/* Toggle for demo */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className={`fixed top-6 right-6 px-4 py-2 rounded-lg text-sm transition-colors ${
//           darkMode
//             ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
//             : "bg-white text-slate-600 hover:bg-slate-100"
//         }`}
//       >
//         {darkMode ? "☀️ Light" : "🌙 Dark"}
//       </button>

//       <div className="max-w-5xl mx-auto px-6 py-24">
//         {/* 1. About Overview */}
//         <section
//           className={`mb-32 transition-all duration-700 ${
//             visible.intro
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4"
//           }`}
//         >
//           <h2
//             className={`text-sm font-medium mb-6 tracking-wider uppercase ${
//               darkMode ? "text-slate-500" : "text-slate-500"
//             }`}
//           >
//             About Me
//           </h2>
//           <div className="max-w-3xl space-y-6 text-lg leading-relaxed">
//             <p className={darkMode ? "text-slate-300" : "text-slate-700"}>
//               I build complete software systems from database to user interface.
//               My focus is on writing clean, maintainable code that scales with
//               business needs.
//             </p>
//             <p className={darkMode ? "text-slate-300" : "text-slate-700"}>
//               I approach engineering with a preference for simplicity and
//               performance. Every technical decision is made with long-term
//               maintainability in mind.
//             </p>
//             <p className={darkMode ? "text-slate-300" : "text-slate-700"}>
//               Whether architecting backend services or crafting frontend
//               experiences, I ensure systems are reliable, secure, and ready for
//               production.
//             </p>
//           </div>
//         </section>

//         {/* 2. What I Do */}
//         <section
//           className={`mb-32 transition-all duration-700 delay-100 ${
//             visible.capabilities
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4"
//           }`}
//         >
//           <h2
//             className={`text-sm font-medium mb-10 tracking-wider uppercase ${
//               darkMode ? "text-slate-500" : "text-slate-500"
//             }`}
//           >
//             What I Do
//           </h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             {capabilities.map((cap, i) => (
//               <div
//                 key={i}
//                 className={`p-6 rounded-lg border transition-all duration-300 hover:translate-y-[-2px] ${
//                   darkMode
//                     ? "bg-slate-900 border-slate-800 hover:border-slate-700"
//                     : "bg-white border-slate-200 hover:border-slate-300"
//                 }`}
//               >
//                 <div
//                   className={`mb-4 ${
//                     darkMode ? "text-blue-400" : "text-blue-600"
//                   }`}
//                 >
//                   {cap.icon}
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2">{cap.title}</h3>
//                 <p
//                   className={`text-sm ${
//                     darkMode ? "text-slate-400" : "text-slate-600"
//                   }`}
//                 >
//                   {cap.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 3. Tech Stack */}
//         <section
//           className={`mb-32 transition-all duration-700 delay-200 ${
//             visible.stack
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4"
//           }`}
//         >
//           <h2
//             className={`text-sm font-medium mb-10 tracking-wider uppercase ${
//               darkMode ? "text-slate-500" : "text-slate-500"
//             }`}
//           >
//             Tech Stack
//           </h2>
//           <div className="space-y-8">
//             {Object.entries(techStack).map(([category, techs]) => (
//               <div key={category}>
//                 <h3
//                   className={`text-sm font-medium mb-4 ${
//                     darkMode ? "text-slate-400" : "text-slate-600"
//                   }`}
//                 >
//                   {category}
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {techs.map((tech) => (
//                     <span
//                       key={tech}
//                       className={`px-4 py-2 rounded-full text-sm transition-colors ${
//                         darkMode
//                           ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
//                           : "bg-slate-200 text-slate-700 hover:bg-slate-300"
//                       }`}
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 4. Engineering Mindset */}
//         <section
//           className={`mb-32 transition-all duration-700 delay-300 ${
//             visible.mindset
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4"
//           }`}
//         >
//           <div
//             className={`p-10 rounded-lg border-l-4 ${
//               darkMode
//                 ? "bg-slate-900 border-blue-500"
//                 : "bg-slate-100 border-blue-600"
//             }`}
//           >
//             <p className="text-xl leading-relaxed mb-4">
//               "Simplicity over complexity. Performance first. Every system
//               should be maintainable and ready to scale."
//             </p>
//             <p
//               className={`text-sm ${
//                 darkMode ? "text-slate-400" : "text-slate-600"
//               }`}
//             >
//               Engineering Philosophy
//             </p>
//           </div>
//         </section>

//         {/* 5. Experience & Growth */}
//         <section
//           className={`mb-32 transition-all duration-700 delay-400 ${
//             visible.growth
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4"
//           }`}
//         >
//           <h2
//             className={`text-sm font-medium mb-10 tracking-wider uppercase ${
//               darkMode ? "text-slate-500" : "text-slate-500"
//             }`}
//           >
//             Experience & Growth
//           </h2>
//           <div className="space-y-8">
//             {journey.map((item, i) => (
//               <div key={i} className="flex gap-6">
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`w-3 h-3 rounded-full ${
//                       darkMode ? "bg-blue-500" : "bg-blue-600"
//                     }`}
//                   ></div>
//                   {i !== journey.length - 1 && (
//                     <div
//                       className={`w-px flex-1 mt-2 ${
//                         darkMode ? "bg-slate-800" : "bg-slate-300"
//                       }`}
//                     ></div>
//                   )}
//                 </div>
//                 <div className="pb-8">
//                   <h3 className="font-semibold text-lg mb-2">{item.phase}</h3>
//                   <p
//                     className={`${
//                       darkMode ? "text-slate-400" : "text-slate-600"
//                     }`}
//                   >
//                     {item.focus}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 6. Beyond Code */}
//         <section
//           className={`mb-32 transition-all duration-700 delay-500 ${
//             visible.beyond
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4"
//           }`}
//         >
//           <h2
//             className={`text-sm font-medium mb-6 tracking-wider uppercase ${
//               darkMode ? "text-slate-500" : "text-slate-500"
//             }`}
//           >
//             Beyond Code
//           </h2>
//           <div
//             className={`max-w-3xl text-lg leading-relaxed ${
//               darkMode ? "text-slate-300" : "text-slate-700"
//             }`}
//           >
//             <p>
//               Continuous learning drives me. I stay curious about emerging
//               technologies, especially in systems architecture and AI
//               integration. Problem-solving is what I do best, whether debugging
//               complex issues or designing new solutions from scratch.
//             </p>
//           </div>
//         </section>

//         {/* 7. Soft CTA */}
//         <section
//           className={`transition-all duration-700 delay-600 ${
//             visible.cta
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4"
//           }`}
//         >
//           <div className="flex gap-6">
//             <a
//               href="#projects"
//               className={`text-sm font-medium transition-colors ${
//                 darkMode
//                   ? "text-slate-400 hover:text-slate-200"
//                   : "text-slate-600 hover:text-slate-900"
//               }`}
//             >
//               View Projects →
//             </a>
//             <a
//               href="#contact"
//               className={`text-sm font-medium transition-colors ${
//                 darkMode
//                   ? "text-slate-400 hover:text-slate-200"
//                   : "text-slate-600 hover:text-slate-900"
//               }`}
//             >
//               Contact Me →
//             </a>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
