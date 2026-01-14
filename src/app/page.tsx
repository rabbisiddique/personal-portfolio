import HeroSection from "@/components/public/Hero";

export default function HomePage() {
  return (
    <div className="relative">
      <main className="m-0 p-0">
        {/* Home Section */}
        <section id="hero" className="m-0 p-0">
          <HeroSection />
        </section>
        <section id="about" className="m-0 p-0">
          {/* <AboutSection /> */}
        </section>

        {/* Add more sections with matching IDs */}
      </main>
    </div>
  );
}
