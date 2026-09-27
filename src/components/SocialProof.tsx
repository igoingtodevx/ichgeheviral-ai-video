"use client";

import React, { useEffect, useState } from "react";
import { fetchSocialProof, socialProofMediaUrl, type SocialProofItem } from "../lib/socialProof";

export function SocialProof() {
  const [items, setItems] = useState<SocialProofItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSocialProof(6, 0)
      .then((page) => setItems(page.items))
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, []);

  if (loaded && items.length === 0) return null;

  return (
    <section className="bg-[#f7f7f5] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">
            Echte Ergebnisse
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Nicht unsere Meinung. Die Ergebnisse.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Echte veröffentlichte Kundenresultate — keine Mockups, keine erfundenen Zahlen.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[22px] border border-[#e7e3df] bg-white shadow-[0_18px_50px_rgba(54,39,27,.08)]"
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
                    alt={item.title || "Kundenergebnis"}
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
