// app/ClientLayoutWrapper.tsx
"use client";

import { ThemeProvider } from "@/components/theme-provider";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main>{children}</main>
    </ThemeProvider>
  );
}
