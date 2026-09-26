"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { VideoShowcase } from "../components/VideoShowcase";
import { SocialProofFeed } from "../components/SocialProofFeed";
import { TransformationScrubber } from "../components/TransformationScrubber";
import { NoCreditsSection } from "../components/NoCreditsSection";
import { HowItWorks } from "../components/HowItWorks";
import { GeneratorShell } from "../components/GeneratorShell";
import { ValueComparison } from "../components/ValueComparison";
import { FounderSection } from "../components/FounderSection";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";
import { VideoModal } from "../components/VideoModal";
import { VideoShowcaseItem } from "../lib/types";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState("/media/videos/golden-pool-run1.mp4");
  const [modalTitle, setModalTitle] = useState("IchGeheViral — Beispiel-Reel (63s)");
  const [isFounderModal, setIsFounderModal] = useState(false);

  const handleOpenDemoVideo = () => {
    setModalVideoSrc("/media/videos/golden-pool-run1.mp4");
    setModalTitle("Pool-Transformation (63s Reel)");
    setIsFounderModal(false);
    setModalOpen(true);
  };

  const handleSelectShowcaseVideo = (item: VideoShowcaseItem) => {
    setModalVideoSrc(item.videoSrc);
    setModalTitle(`${item.title} (${item.duration})`);
    setIsFounderModal(false);
    setModalOpen(true);
  };

  const scrollToGenerator = () => {
    const el = document.getElementById("generator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#07060B] text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenVideo={handleOpenDemoVideo}
        onScrollToGenerator={scrollToGenerator}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Section 1: Hero Viewport + 3 High-Impact USPs */}
        <Hero
          onOpenVideo={handleOpenDemoVideo}
          onScrollToGenerator={scrollToGenerator}
        />

        {/* Section 2: Real Video Showcase Early & Strong */}
        <VideoShowcase onSelectVideo={handleSelectShowcaseVideo} />

        {/* Section 3: Live Social Proof (managed in /admin, renders when items exist) */}
        <SocialProofFeed />

        {/* Section 4: Viral Mechanics & Interactive 8-State Pipeline Proof */}
        <TransformationScrubber onOpenVideo={handleOpenDemoVideo} />

        {/* Section 5: "KEINE CREDITS" High-Contrast Visual Break */}
        <NoCreditsSection onScrollToGenerator={scrollToGenerator} />

        {/* Section 6: Radically Simplified 3-Step Flow */}
        <HowItWorks />

        {/* Section 7: Interactive Generator with Presets */}
        <GeneratorShell onOpenVideo={handleOpenDemoVideo} />

        {/* Section 8: Clear 2-Column Comparison (Generic AI vs IchGeheViral) */}
        <ValueComparison />

        {/* Section 9: Authentic Founder Note from Timo */}
        <FounderSection onScrollToGenerator={scrollToGenerator} />

        {/* Section 10: Buying-Oriented FAQ Accordion */}
        <FAQ />

        {/* Section 11: Final Conversion CTA */}
        <FinalCTA onScrollToGenerator={scrollToGenerator} />
      </main>

      {/* Section 12: Minimal Footer */}
      <Footer />

      {/* Modal for Cinematic Video Playback */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoSrc={modalVideoSrc}
        title={modalTitle}
        isFounderVideo={isFounderModal}
      />
    </div>
  );
}
