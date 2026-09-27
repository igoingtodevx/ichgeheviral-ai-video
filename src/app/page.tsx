"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TransformationShowcase } from "../components/TransformationShowcase";
import { WhyViral } from "../components/WhyViral";
import { HowItWorks } from "../components/HowItWorks";
import { NoCreditsSection } from "../components/NoCreditsSection";
import { SocialProof } from "../components/SocialProof";
import { FounderSection } from "../components/FounderSection";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";
import { VideoModal } from "../components/VideoModal";
import { SHOWCASE_VIDEOS } from "../lib/constants";

export default function LandingPage() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-[#101114]">
      <div className="grid h-7 place-items-center bg-[#101114] text-[10px] font-black uppercase tracking-[0.16em] text-white">
        KI-VIDEOS FÜR MAXIMALES VIRALPOTENZIAL
      </div>

      <Navbar />

      <main>
        <Hero onOpenVideo={() => setVideoSrc(SHOWCASE_VIDEOS[0].videoSrc)} />
        <TransformationShowcase onOpenVideo={setVideoSrc} />
        <WhyViral />
        <HowItWorks />
        <NoCreditsSection />
        <SocialProof />
        <FounderSection />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />

      {videoSrc && <VideoModal src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
}
