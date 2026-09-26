"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { VideoShowcase } from "../components/VideoShowcase";
import { SocialProofFeed } from "../components/SocialProofFeed";
import { TransformationScrubber } from "../components/TransformationScrubber";
import { NoCreditsSection } from "../components/NoCreditsSection";
import { RevenueCalculator } from "../components/RevenueCalculator";
import { HowItWorks } from "../components/HowItWorks";
import { GeneratorShell } from "../components/GeneratorShell";
import { ValueComparison } from "../components/ValueComparison";
import { FounderSection } from "../components/FounderSection";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
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
    <div className="site-shell relative min-h-screen flex flex-col text-slate-100 font-sans">
      <Navbar
        onOpenVideo={handleOpenDemoVideo}
        onScrollToGenerator={scrollToGenerator}
      />

      <main className="flex-1">
        <Hero
          onOpenVideo={handleOpenDemoVideo}
          onScrollToGenerator={scrollToGenerator}
        />

        <VideoShowcase onSelectVideo={handleSelectShowcaseVideo} />

        <SocialProofFeed />

        <TransformationScrubber onOpenVideo={handleOpenDemoVideo} />

        <NoCreditsSection onScrollToGenerator={scrollToGenerator} />

        <RevenueCalculator />

        <HowItWorks />

        <GeneratorShell onOpenVideo={handleOpenDemoVideo} />

        <ValueComparison />

        <FounderSection onScrollToGenerator={scrollToGenerator} />

        <FAQ />

        <FinalCTA onScrollToGenerator={scrollToGenerator} />
      </main>

      <Footer />

      <ThemeSwitcher />

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
