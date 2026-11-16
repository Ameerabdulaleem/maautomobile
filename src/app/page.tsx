import Contact from "@/components/Contact";
import Footer, { CallToAction } from "@/components/Footer";
import Hero from "@/components/Hero";
import Marketplace from "@/components/Marketplace";
import Navbar from "@/components/Navbar";
import BrandCarousel from "@/components/BrandCarousel";
import Faq from "@/components/Faq";
import Process from "@/components/Process";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Founder, Services, WhyUs } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <BrandCarousel />
        <Services />
        <Process />
        <Marketplace />
        <WhyUs />
        <Founder />
        <Faq />
        <Contact />
        <CallToAction />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
