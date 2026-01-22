// app/ClientLayoutWrapper.tsx
"use client";

import FloatingSidebar from "@/components/public/FloatingSidebar";
import PageTransition from "@/components/public/PageTransition";
import { ThemeProvider } from "@/components/theme-provider";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="relative">
        <FloatingSidebar />
      </div>

      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
}
