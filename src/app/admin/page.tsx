"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  LockKeyhole,
  LogOut,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import {
  checkSocialProofAdmin,
  createSocialProof,
  deleteSocialProof,
  fetchSocialProof,
  hasSocialProofApi,
  socialProofMediaUrl,
  SocialProofItem,
} from "../../lib/socialProof";

const TOKEN_KEY = "igv-social-proof-admin";
const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Datei konnte nicht gelesen werden."));
    reader.onload = () => {
      const value = String(reader.result || "");
      resolve(value.includes(",") ? value.split(",", 2)[1] : value);
    };
    reader.readAsDataURL(file);
  });
}

function validateVideoDuration(file: File): Promise<void> {
  if (!file.type.startsWith("video/")) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    const finish = () => URL.revokeObjectURL(url);
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const duration = Number(video.duration);
      finish();
      if (!Number.isFinite(duration)) {
        reject(new Error("Videolänge konnte nicht gelesen werden."));
      } else if (duration > 10.5) {
        reject(new Error("Der Clip darf maximal 10 Sekunden lang sein."));
      } else {
        resolve();
      }
    };
    video.onerror = () => {
      finish();
      reject(new Error("Das Videoformat konnte nicht gelesen werden."));
    };
    video.src = url;
  });
}

export default function SocialProofAdminPage() {
  const [token, setToken] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [items, setItems] = useState<SocialProofItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const loadItems = async () => {
    const page = await fetchSocialProof(24, 0);
    setItems(page.items);
  };

  useEffect(() => {
    const saved = window.sessionStorage.getItem(TOKEN_KEY) || "";
    if (!saved || !hasSocialProofApi) {
      setChecking(false);
      return;
    }
    checkSocialProofAdmin(saved)
      .then(async () => {
        setToken(saved);
        setAuthenticated(true);
        await loadItems();
      })
      .catch(() => window.sessionStorage.removeItem(TOKEN_KEY))
      .finally(() => setChecking(false));
  }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await checkSocialProofAdmin(passwordInput);
      window.sessionStorage.setItem(TOKEN_KEY, passwordInput);
      setToken(passwordInput);
      setAuthenticated(true);
      setPasswordInput("");
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anmeldung fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthenticated(false);
    setItems([]);
  };

  const publish = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    if (!file) {
      setError("Bitte zuerst einen Screenshot oder Clip auswählen.");
      return;
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      setError("Erlaubt sind JPG, PNG, WEBP, GIF, MP4, WEBM oder MOV.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Die Datei darf maximal 20 MB groß sein.");
      return;
    }

    setBusy(true);
    try {
      await validateVideoDuration(file);
      const data_base64 = await fileToBase64(file);
      await createSocialProof(token, {
        filename: file.name,
        mime_type: file.type,
        title: title.trim(),
        caption: caption.trim(),
        data_base64,
      });
      setFile(null);
      setTitle("");
      setCaption("");
      setMessage("Veröffentlicht. Der neue Eintrag steht jetzt ganz oben auf der Landingpage.");
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item: SocialProofItem) => {
    if (!window.confirm("Diesen Eintrag wirklich löschen?")) return;
    setDeletingId(item.id);
    setError(null);
    try {
      await deleteSocialProof(token, item.id);
      setItems((current) => current.filter((candidate) => candidate.id !== item.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Löschen fehlgeschlagen.");
    } finally {
      setDeletingId(null);
    }
  };

  if (checking) {
    return (
      <main className="min-h-screen bg-[#07060B] text-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
      </main>
    );
  }

  if (!hasSocialProofApi) {
    return (
      <main className="min-h-screen bg-[#07060B] text-white flex items-center justify-center px-6">
        <div className="glass-panel max-w-md rounded-2xl p-7 text-center">
          <h1 className="text-xl font-bold">Backend noch nicht verbunden</h1>
          <p className="mt-2 text-sm text-slate-300">
            NEXT_PUBLIC_API_URL muss für diese Seite gesetzt sein.
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#07060B] text-white flex items-center justify-center px-5 radial-glow-hero">
        <form onSubmit={login} className="glass-panel w-full max-w-md rounded-3xl p-7 sm:p-9">
          <div className="w-11 h-11 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mb-5">
            <LockKeyhole className="w-5 h-5 text-violet-300" />
          </div>
          <h1 className="text-2xl font-extrabold">Social Proof verwalten</h1>
          <p className="mt-2 text-sm text-slate-300">
            Admin-Passwort eingeben. Es wird nur für diese Browser-Sitzung gespeichert.
          </p>
          <input
            type="password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            placeholder="Admin-Passwort"
            autoFocus
            className="mt-6 w-full rounded-xl bg-black/50 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500"
          />
          {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
          <button
            type="submit"
            disabled={busy || !passwordInput}
            className="btn-electric mt-5 w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-50"
          >
            {busy ? "Prüfe..." : "Einloggen"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07060B] text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
        <header className="flex items-start justify-between gap-5 mb-10">
          <div>
            <div className="text-xs font-mono text-violet-300 uppercase tracking-wider mb-2">
              IchGeheViral Admin
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Social Proof
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Screenshot oder kurzen Clip hochladen → veröffentlichen → fertig.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="shrink-0 flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" />
            Abmelden
          </button>
        </header>

        <section className="glass-panel rounded-3xl p-5 sm:p-8">
          <h2 className="text-xl font-bold">Neuen Eintrag veröffentlichen</h2>
          <p className="mt-1 text-sm text-slate-400">
            Bilder bis 20 MB · Clips maximal 10 Sekunden · MP4 empfohlen
          </p>

          <form onSubmit={publish} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block cursor-pointer rounded-2xl border border-dashed border-white/15 bg-black/25 hover:border-violet-500/50 transition-colors overflow-hidden min-h-72">
                {previewUrl && file ? (
                  <div className="relative h-72 bg-black">
                    {file.type.startsWith("video/") ? (
                      <video src={previewUrl} controls className="w-full h-full object-contain" />
                    ) : (
                      <img src={previewUrl} alt="Vorschau" className="w-full h-full object-contain" />
                    )}
                  </div>
                ) : (
                  <div className="h-72 flex flex-col items-center justify-center text-center px-6">
                    <Upload className="w-8 h-8 text-violet-300 mb-3" />
                    <div className="font-semibold">Screenshot oder Clip auswählen</div>
                    <div className="mt-1 text-xs text-slate-400">Tippen / klicken zum Auswählen</div>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                  onChange={(event) => setFile(event.target.files?.[0] || null)}
                />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Überschrift <span className="text-slate-500 font-normal">(optional)</span></label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={90}
                  placeholder="z.B. 127.000 Aufrufe nach 18 Stunden"
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Kurzer Text <span className="text-slate-500 font-normal">(optional)</span></label>
                <textarea
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  maxLength={280}
                  rows={5}
                  placeholder="z.B. Erstes Video des Kunden – direkt organisch angelaufen."
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm resize-none focus:outline-none focus:border-violet-500"
                />
              </div>

              {error && <div className="rounded-xl bg-rose-950/35 border border-rose-500/25 px-4 py-3 text-sm text-rose-200">{error}</div>}
              {message && (
                <div className="rounded-xl bg-emerald-950/35 border border-emerald-500/25 px-4 py-3 text-sm text-emerald-200 flex gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={busy || !file}
                className="btn-electric w-full rounded-xl py-3.5 text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {busy ? "Wird hochgeladen..." : "Jetzt veröffentlichen"}
              </button>
            </div>
          </form>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Veröffentlichte Einträge</h2>
              <p className="text-sm text-slate-400 mt-1">Neueste zuerst. Löschen wirkt sofort.</p>
            </div>
            <span className="text-xs font-mono text-slate-500">{items.length} geladen</span>
          </div>

          {items.length === 0 ? (
            <div className="glass-panel rounded-2xl p-8 text-center text-sm text-slate-400">
              Noch nichts veröffentlicht.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <article key={item.id} className="glass-panel rounded-2xl overflow-hidden">
                  <div className="aspect-[4/3] bg-black/50 relative">
                    {item.kind === "video" ? (
                      <video
                        src={socialProofMediaUrl(item)}
                        muted
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={socialProofMediaUrl(item)}
                        alt={item.title || "Social Proof"}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-2 left-2 bg-black/70 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-mono flex items-center gap-1">
                      {item.kind === "video" ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      {item.kind === "video" ? "CLIP" : "BILD"}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-sm line-clamp-2">
                      {item.title || "Ohne Überschrift"}
                    </div>
                    {item.caption && <p className="mt-1 text-xs text-slate-400 line-clamp-2">{item.caption}</p>}
                    <button
                      type="button"
                      onClick={() => remove(item)}
                      disabled={deletingId === item.id}
                      className="mt-4 w-full rounded-lg border border-rose-500/20 bg-rose-950/20 hover:bg-rose-950/40 px-3 py-2 text-xs text-rose-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {deletingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Löschen
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
