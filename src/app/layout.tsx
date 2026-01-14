import FloatingSidebar from "@/components/public/FloatingSidebar";
import PageTransition from "@/components/public/PageTransition";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatePresence } from "framer-motion";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Rabbi Siddique Portfolio",
  description:
    "FullStack developer portfolio built with Next.js, Tailwind, and shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} ${inter.variable} ${roboto.variable} `}
      suppressHydrationWarning
    >
      <ThemeProvider attribute="class" defaultTheme="dark">
        <body
          className="
          antialiased
          bg-background-light dark:bg-background-dark
          text-foreground-light dark:text-foreground-dark
          font-body
        "
        >
          <div className="relative">
            {" "}
            <FloatingSidebar />
          </div>
          <AnimatePresence mode="wait">
            <PageTransition>{children}</PageTransition>
          </AnimatePresence>
        </body>
      </ThemeProvider>
    </html>
  );
}
