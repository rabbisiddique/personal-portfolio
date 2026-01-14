import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Optional shared elements for this section */}
      <main>{children}</main>
    </div>
  );
}
