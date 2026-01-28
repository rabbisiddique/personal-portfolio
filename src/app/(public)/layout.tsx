"use client";

import FloatingSidebar from "@/components/public/FloatingSidebar";
import PageTransition from "@/components/public/PageTransition";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark relative">
      <FloatingSidebar />
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
