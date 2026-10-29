import React from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Packages from "@/components/sections/Packages";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Stats from "@/components/sections/Stats";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import Appointment from "@/components/sections/Appointment";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { common, pages, sections } from "@/components/types";

export const metadata = {
  title: pages.home?.metadata?.title || "PranaRise - Yoga & Fitness Academy",
  description: pages.home?.metadata?.description || "Experience transformative yoga sessions, mindful fitness training, and holistic wellness at PranaRise - Yoga & Fitness Academy.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#071D32] font-sans text-[#DCE5EF]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Hero data={sections.hero} />
        <About data={sections.about} />
        <Services data={sections.services} />
        <Packages data={sections.packages} />
        <WhyChooseUs data={sections.why_choose_us} />
        <Stats data={sections.stats} />
        <Team data={sections.team} />
        <Gallery data={sections.gallery} />
        <Appointment data={sections.appointment} />
        <Testimonials data={sections.testimonials} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
