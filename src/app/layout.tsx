// app/layout.tsx
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} ${inter.variable} ${roboto.variable}`}
    >
      <body
        className="
          antialiased
          bg-background-light dark:bg-background-dark
          text-foreground-light dark:text-foreground-dark
          font-body
        "
        suppressHydrationWarning
      >
        {/* Everything client-side goes inside here */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
