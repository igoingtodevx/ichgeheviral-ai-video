"use client";

import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TransformationShowcase } from "../components/TransformationShowcase";
import { WhyViral } from "../components/WhyViral";
import { HowItWorks } from "../components/HowItWorks";
import { PotentialCalculator } from "../components/PotentialCalculator";
import { NoCreditsSection } from "../components/NoCreditsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { FounderSection } from "../components/FounderSection";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#101114]">
      <div className="grid h-7 place-items-center bg-[#101114] text-[10px] font-black uppercase tracking-[0.16em] text-white">
        Virale KI-Building Videos auf Knopfdruck
      </div>

      <Navbar />

      <main>
        <Hero />
        <Pricing />
        <PotentialCalculator />
        <TestimonialsSection />
        <FounderSection />
        <TransformationShowcase />
        <WhyViral />
        <HowItWorks />
        <NoCreditsSection />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
