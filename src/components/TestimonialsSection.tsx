"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { fetchTestimonials, type TestimonialItem } from "../lib/testimonials";

const FORMAT_EXAMPLES = [
  {
    label: "Formatbeispiel 01",
    title: "Vom Grundstück zum Rohbau",
    copy: "Ein klarer visueller Einstieg und sichtbarer Baufortschritt in einem zusammenhängenden Short-Form-Format.",
    imageSrc: "/media/studio-seeds/marketing-demo-05.jpg",
  },
  {
    label: "Formatbeispiel 02",
    title: "Architektur nimmt Gestalt an",
    copy: "Jede Szene baut auf der vorherigen auf und führt die Aufmerksamkeit bis zum fertigen Gebäude.",
    imageSrc: "/media/studio-seeds/marketing-demo-23.jpg",
  },
  {
    label: "Formatbeispiel 03",
    title: "Das fertige KI-Building",
    copy: "Ein verständliches Finale, das den Aufbau auflöst und als vertikales Video direkt veröffentlichbar ist.",
    imageSrc: "/media/studio-seeds/marketing-demo-27.jpg",
  },
];

export function TestimonialsSection() {
  const [items, setItems] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    fetchTestimonials(6, 0)
      .then((page) => setItems(page.items))
      .catch(() => undefined);
  }, []);

  return (
    <section id="testimonials" className="scroll-mt-28 bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            {items.length > 0 ? "Kundenstimmen" : "Kundenstimmen & Formatbeispiele"}
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Ergebnisse, die für sich sprechen.
          </h2>
        </div>

        {items.length > 0 ? (
          <div className={`mt-12 grid gap-5 ${items.length === 1 ? "mx-auto max-w-2xl" : "md:grid-cols-2 lg:grid-cols-3"}`}>
            {items.map((item) => (
              <article
                key={item.id}
                className="flex min-h-[260px] flex-col rounded-[24px] border border-[#e6e4ef] bg-white p-6 shadow-[0_18px_50px_rgba(54,39,27,.08)] sm:p-7"
              >
                <Quote className="h-8 w-8 text-[#6d5dfc]" aria-hidden="true" />
                <blockquote className="mt-6 flex-1 text-lg font-bold leading-8 tracking-[-0.02em] text-[#101114]">
                  “{item.quote}”
                </blockquote>
                <footer className="mt-7 border-t border-[#eceaf2] pt-4">
                  <div className="text-sm font-black text-[#101114]">{item.author_name}</div>
                  {(item.author_role || item.company) && (
                    <div className="mt-1 text-xs font-semibold text-[#686c73]">
                      {[item.author_role, item.company].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FORMAT_EXAMPLES.map((example) => (
              <article
                key={example.label}
                className="overflow-hidden rounded-[24px] border border-[#e6e4ef] bg-white shadow-[0_18px_50px_rgba(54,39,27,.08)]"
              >
                <div className="relative aspect-[4/3] bg-[#111]">
                  <Image
                    src={example.imageSrc}
                    alt={example.title}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#5947e8]">
                    {example.label}
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-black tracking-[-0.03em] text-[#101114]">{example.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#686c73]">{example.copy}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
