"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Play, TrendingUp } from "lucide-react";
import {
  fetchSocialProof,
  hasSocialProofApi,
  socialProofMediaUrl,
  SocialProofItem,
} from "../lib/socialProof";

const PAGE_SIZE = 6;

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

export function SocialProofFeed() {
  const [items, setItems] = useState<SocialProofItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(hasSocialProofApi);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (!hasSocialProofApi) {
      return;
    }
    fetchSocialProof(PAGE_SIZE, 0)
      .then((page) => {
        setItems(page.items);
        setHasMore(page.has_more);
      })
      .catch(() => {
        // Social proof is non-critical: a backend hiccup must never break the landing page.
      })
      .finally(() => setLoading(false));
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const page = await fetchSocialProof(PAGE_SIZE, items.length);
      setItems((current) => [...current, ...page.items]);
      setHasMore(page.has_more);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading || items.length === 0) return null;

  return (
    <section
      id="ergebnisse"
      className="relative py-20 lg:py-28 border-y border-white/[0.06] bg-[#080611] overflow-hidden"
    >
      <div className="absolute inset-0 radial-glow-section pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-emerald-950/40 border border-emerald-500/25 text-xs font-mono text-emerald-300 mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ECHTE ERGEBNISSE AUS DER PRAXIS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Nicht unsere Meinung. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Die Ergebnisse.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Veröffentlichte Kundenstimmen, Aufrufzahlen und echte Clips direkt aus dem System.
            Die neuesten Ergebnisse stehen immer zuerst.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const mediaUrl = socialProofMediaUrl(item);
            return (
              <article
                key={item.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/[0.09] hover:border-violet-500/30 transition-colors"
              >
                <div className="relative bg-black/50 aspect-[4/5] overflow-hidden">
                  {item.kind === "video" ? (
                    <>
                      <video
                        src={mediaUrl}
                        muted
                        loop
                        playsInline
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                      <div className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/65 border border-white/10 px-2.5 py-1 text-[10px] font-mono text-white flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" />
                        CLIP
                      </div>
                    </>
                  ) : (
                    <img
                      src={mediaUrl}
                      alt={item.title || "Aktuelles Kundenergebnis"}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {(item.title || item.caption) && (
                  <div className="p-4 sm:p-5">
                    {item.title && (
                      <h3 className="text-base font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                    )}
                    {item.caption && (
                      <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                    <div className="mt-3 text-[10px] uppercase tracking-wider font-mono text-slate-500">
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-sm font-semibold text-slate-200 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
              Mehr Ergebnisse anzeigen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
