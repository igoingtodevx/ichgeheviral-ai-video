"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TransformationScrubber } from "../components/TransformationScrubber";
import { HowItWorks } from "../components/HowItWorks";
import { FounderSection } from "../components/FounderSection";
import { VideoShowcase } from "../components/VideoShowcase";
import { GeneratorShell } from "../components/GeneratorShell";
import { ValueComparison } from "../components/ValueComparison";
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

  const handleOpenFounderVideo = () => {
    setModalVideoSrc("");
    setModalTitle("Kurz erklärt von Timo");
    setIsFounderModal(true);
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
        {/* Section 1: Hero Viewport */}
        <Hero
          onOpenVideo={handleOpenDemoVideo}
          onScrollToGenerator={scrollToGenerator}
        />

        {/* Section 2: Product Proof & Interactive 8-State Scrubber */}
        <TransformationScrubber onOpenVideo={handleOpenDemoVideo} />

        {/* Section 3: How It Works (3 Steps) */}
        <HowItWorks />

        {/* Section 4: Founder Video Section (Timo) */}
        <FounderSection
          onScrollToGenerator={scrollToGenerator}
          onOpenFounderModal={handleOpenFounderVideo}
        />

        {/* Section 5: Real Video Showcase & Contact Sheet */}
        <VideoShowcase onSelectVideo={handleSelectShowcaseVideo} />

        {/* Interactive Product Interaction: Generator Shell */}
        <GeneratorShell onOpenVideo={handleOpenDemoVideo} />

        {/* Section 6: Why This Instead of Manual Editing */}
        <ValueComparison />

        {/* Section 8: FAQ Accordion */}
        <FAQ />

        {/* Section 7: Final Conversion CTA */}
        <FinalCTA onScrollToGenerator={scrollToGenerator} />
      </main>

      {/* Section 9: Minimal Footer */}
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
