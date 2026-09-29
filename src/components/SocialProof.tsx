"use client";

import React, { useEffect, useState } from "react";
import { SHOWCASE_VIDEOS } from "../lib/constants";
import { fetchSocialProof, socialProofMediaUrl, type SocialProofItem } from "../lib/socialProof";

function ExampleFallback() {
  return (
    <section className="bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Fertige Poolbau-Beispiele
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Zwei fertige Poolbau-Reels.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Zwei fertige Beispiele zeigen, wie sich eine Veränderung Schritt für Schritt
            in ein zusammenhängendes Reel verwandelt — ohne erfundene Kundenstatistiken.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SHOWCASE_VIDEOS.map((video) => (
            <article
              key={video.id}
              className="overflow-hidden rounded-[22px] border border-[#e6e4ef] bg-white shadow-[0_18px_50px_rgba(54,39,27,.08)]"
            >
              <div className="aspect-[9/16] overflow-hidden bg-[#111]">
                <video
                  src={video.videoSrc}
                  poster={video.posterSrc}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-[#101114]">{video.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#686c73]">
                  {video.duration} · {video.stateCount} Poolbau-Szenen
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SocialProof() {
  const [items, setItems] = useState<SocialProofItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSocialProof(6, 0)
      .then((page) => setItems(page.items))
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || items.length === 0) return <ExampleFallback />;

  return (
    <section className="bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Erstellte Beispiele
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            So kann eine Transformation aussehen.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Ausgewählte Beispiel-Reels aus der aktuell verfügbaren Poolbau-Kategorie.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[22px] border border-[#e6e4ef] bg-white shadow-[0_18px_50px_rgba(54,39,27,.08)]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#111]">
                {item.kind === "video" ? (
                  <video
                    src={socialProofMediaUrl(item)}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={socialProofMediaUrl(item)}
                    alt={item.title || "Beispiel-Reel"}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              {(item.title || item.caption) && (
                <div className="p-5">
                  {item.title && <h3 className="text-lg font-extrabold text-[#101114]">{item.title}</h3>}
                  {item.caption && <p className="mt-2 text-sm leading-6 text-[#686c73]">{item.caption}</p>}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
