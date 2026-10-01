"use client";

import React, { FormEvent, useEffect, useState } from "react";
import type { TokenProvider } from "../lib/api/client";
import { CheckCircle2, Loader2, Quote, Trash2 } from "lucide-react";
import {
  createTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  type TestimonialItem,
} from "../lib/testimonials";

export function AdminTestimonialsPanel({ getToken }: { getToken: TokenProvider }) {
  const requireToken = async () => {
    const token = await getToken();
    if (!token) throw new Error("Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.");
    return token;
  };
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [quote, setQuote] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      const page = await fetchTestimonials(24, 0);
      setItems(page.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Testimonials konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchTestimonials(24, 0)
      .then((page) => {
        if (mounted) setItems(page.items);
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Testimonials konnten nicht geladen werden.");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const publish = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    if (!quote.trim() || !authorName.trim()) {
      setError("Zitat und Name sind erforderlich.");
      return;
    }

    setBusy(true);
    try {
      await createTestimonial(await requireToken(), {
        quote: quote.trim(),
        author_name: authorName.trim(),
        author_role: authorRole.trim(),
        company: company.trim(),
      });
      setQuote("");
      setAuthorName("");
      setAuthorRole("");
      setCompany("");
      setMessage("Testimonial veröffentlicht. Es erscheint jetzt auf der Landingpage.");
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Testimonial konnte nicht veröffentlicht werden.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item: TestimonialItem) => {
    if (!window.confirm("Dieses Testimonial wirklich löschen?")) return;
    setDeletingId(item.id);
    setError(null);
    try {
      await deleteTestimonial(await requireToken(), item.id);
      setItems((current) => current.filter((candidate) => candidate.id !== item.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Testimonial konnte nicht gelöscht werden.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <section className="glass-panel rounded-3xl p-5 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-violet-500/30 bg-violet-500/15">
            <Quote className="h-5 w-5 text-violet-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Neue Kundenstimme</h2>
            <p className="mt-1 text-sm text-slate-400">
              Echte, freigegebene Aussagen eintragen. Sie erscheinen anschließend automatisch im öffentlichen Testimonials-Bereich.
            </p>
          </div>
        </div>

        <form onSubmit={publish} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold">Zitat</label>
            <textarea
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              maxLength={500}
              rows={5}
              placeholder="Die freigegebene Kundenstimme hier einfügen …"
              className="w-full resize-none rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-violet-500 focus:outline-none"
            />
            <div className="mt-1 text-right text-[11px] text-slate-500">{quote.length}/500</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold">Name</label>
              <input
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
                maxLength={120}
                placeholder="z. B. Max Mustermann"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Rolle <span className="font-normal text-slate-500">(optional)</span></label>
              <input
                value={authorRole}
                onChange={(event) => setAuthorRole(event.target.value)}
                maxLength={120}
                placeholder="z. B. Geschäftsführer"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Unternehmen <span className="font-normal text-slate-500">(optional)</span></label>
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                maxLength={120}
                placeholder="z. B. Poolbau Müller"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          {error && <div className="rounded-xl border border-rose-500/25 bg-rose-950/35 px-4 py-3 text-sm text-rose-200">{error}</div>}
          {message && (
            <div className="flex gap-2 rounded-xl border border-emerald-500/25 bg-emerald-950/35 px-4 py-3 text-sm text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={busy || !quote.trim() || !authorName.trim()}
            className="btn-electric flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? "Wird veröffentlicht …" : "Testimonial veröffentlichen"}
          </button>
        </form>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">Veröffentlichte Testimonials</h2>
            <p className="mt-1 text-sm text-slate-400">Neueste zuerst. Löschen wirkt sofort.</p>
          </div>
          <span className="text-xs font-mono text-slate-500">{items.length} geladen</span>
        </div>

        {loading ? (
          <div className="glass-panel flex items-center justify-center rounded-2xl p-8 text-sm text-slate-400">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Wird geladen …
          </div>
        ) : items.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center text-sm text-slate-400">
            Noch keine Kundenstimmen veröffentlicht.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="glass-panel rounded-2xl p-5">
                <Quote className="h-5 w-5 text-violet-300" />
                <blockquote className="mt-3 text-sm leading-6 text-white">“{item.quote}”</blockquote>
                <div className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">
                  <strong className="text-white">{item.author_name}</strong>
                  {(item.author_role || item.company) && ` · ${[item.author_role, item.company].filter(Boolean).join(" · ")}`}
                </div>
                <button
                  type="button"
                  onClick={() => remove(item)}
                  disabled={deletingId === item.id}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-rose-500/20 bg-rose-950/20 px-3 py-2 text-xs text-rose-200 hover:bg-rose-950/40 disabled:opacity-50"
                >
                  {deletingId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  Löschen
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
