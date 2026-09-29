"use client";

import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { fetchTestimonials, type TestimonialItem } from "../lib/testimonials";

export function TestimonialsSection() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchTestimonials(6, 0)
      .then((page) => setItems(page.items))
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, []);

  // Do not invent customer statements. The section becomes visible as soon as
  // the owner publishes the first approved testimonial in the admin tab.
  if (!loaded || items.length === 0) return null;

  return (
    <section id="testimonials" className="bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Kundenstimmen
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Wenn aus einem Projekt eine Geschichte wird.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Stimmen von Menschen, die ihre Veränderung als klares, zusammenhängendes Reel zeigen.
          </p>
        </div>

        <div
          className={`mt-12 grid gap-5 ${
            items.length === 1
              ? "mx-auto max-w-2xl grid-cols-1"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
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
      </div>
    </section>
  );
}
