"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { AlertCircle, BarChart3, Film, LoaderCircle, RefreshCw, Shield, Users, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProtectedUnavailable } from "../../../components/ProtectedUnavailable";
import { api, type AdminOverview } from "../../../lib/api/client";
import { isClerkConfigured } from "../../../lib/auth";
import { formatDateTime, STATUS_LABELS } from "../../../lib/jobs";

type Role = "owner" | "admin" | "customer";

export default function AdminOverviewPage() {
  return isClerkConfigured ? <AdminOverviewContent /> : <ProtectedUnavailable admin />;
}

function AdminOverviewContent() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountId, setAccountId] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<Role>("customer");

  const load = useCallback(async () => {
    try {
      setOverview(await api.getAdminOverview(getToken));
      setError(null);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Die Admin-Daten konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const initialLoad = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(initialLoad);
  }, [isLoaded, isSignedIn, load]);

  async function addMembership(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accountId || !userId.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await api.addMembership({ account_id: accountId, user_id: userId.trim(), role }, getToken);
      setUserId("");
      await load();
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Die Mitgliedschaft konnte nicht gespeichert werden.");
    } finally {
      setBusy(false);
    }
  }

  if (!isLoaded || !isSignedIn || loading) {
    return <div className="flex min-h-screen items-center justify-center gap-3 text-sm font-bold text-[#686c73]"><LoaderCircle className="h-5 w-5 animate-spin text-[#6d5dfc]" /> Admin-Daten werden geladen …</div>;
  }

  if (!overview) {
    return <main className="mx-auto max-w-3xl px-5 py-16"><div className="rounded-2xl border border-[#f0caca] bg-[#fff5f5] p-5 text-sm font-semibold text-[#9c3c3c]">{error || "Keine Admin-Daten verfügbar."}</div></main>;
  }

  const summary = overview.summary;
  const metrics: Array<[string, string, LucideIcon]> = [[String(summary.accounts), "Accounts", Users], [String(summary.jobs), "Aufträge", Film], [String(summary.completed), "Fertig", BarChart3], [`$${Number(summary.cost_usd || 0).toFixed(4)}`, "Erfasste Paid-Kosten", BarChart3]];
  return (
    <main className="min-h-screen bg-[#f7f7fb] px-4 py-8 text-[#101114] sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-[#e4e1ec] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]"><Shield className="h-4 w-4" /> Timo Control</div>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] sm:text-5xl">Accounts & Produktion</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73]">Echte Account-Zuordnung, Rollen, Aufträge und Usage-Events aus dem Backend. Keine Demo-Daten.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin" className="inline-flex items-center rounded-xl border border-[#dedbe7] bg-white px-4 py-3 text-sm font-black">Testimonials</Link>
            <button type="button" onClick={() => void load()} className="inline-flex items-center gap-2 rounded-xl bg-[#6d5dfc] px-4 py-3 text-sm font-black text-white"><RefreshCw className="h-4 w-4" /> Aktualisieren</button>
          </div>
        </header>

        {error && <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#f0caca] bg-[#fff5f5] p-4 text-sm font-semibold text-[#9c3c3c]"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}

        <section className="mt-8 grid gap-3 sm:grid-cols-4">
          {metrics.map(([value, label, Icon]) => <div key={label} className="rounded-2xl border border-[#e4e1ec] bg-white p-5"><Icon className="h-5 w-5 text-[#6d5dfc]" /><div className="mt-4 text-2xl font-black">{value}</div><div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8a8e94]">{label}</div></div>)}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-[#e4e1ec] bg-white"><div className="border-b border-[#eeeaf4] px-5 py-4"><h2 className="font-black">Accounts</h2><p className="mt-1 text-xs text-[#858991]">{overview.accounts.length} Accounts · keine Besitzer werden automatisch entfernt.</p></div>{overview.accounts.length === 0 ? <p className="p-5 text-sm text-[#858991]">Noch kein Account angelegt.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-[#faf9fc] text-xs uppercase tracking-wider text-[#8a8e94]"><tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">ID</th><th className="px-5 py-3">Erstellt</th></tr></thead><tbody>{overview.accounts.map((account) => <tr key={account.id} className="border-t border-[#f0edf5]"><td className="px-5 py-3 font-bold">{account.name}</td><td className="px-5 py-3 font-mono text-xs text-[#686c73]">{account.id}</td><td className="px-5 py-3 text-[#686c73]">{formatDateTime(account.created_at)}</td></tr>)}</tbody></table></div>}</section>
            <section className="overflow-hidden rounded-2xl border border-[#e4e1ec] bg-white"><div className="border-b border-[#eeeaf4] px-5 py-4"><h2 className="font-black">Mitgliedschaften</h2><p className="mt-1 text-xs text-[#858991]">Rollen: owner, admin, customer.</p></div>{overview.memberships.length === 0 ? <p className="p-5 text-sm text-[#858991]">Noch keine Mitgliedschaften.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-[#faf9fc] text-xs uppercase tracking-wider text-[#8a8e94]"><tr><th className="px-5 py-3">Account</th><th className="px-5 py-3">Clerk User</th><th className="px-5 py-3">Rolle</th></tr></thead><tbody>{overview.memberships.map((membership) => <tr key={`${membership.account_id}-${membership.user_id}`} className="border-t border-[#f0edf5]"><td className="px-5 py-3 font-mono text-xs">{membership.account_id}</td><td className="px-5 py-3 font-mono text-xs">{membership.user_id}</td><td className="px-5 py-3"><span className="rounded-full bg-[#f0edff] px-2.5 py-1 text-xs font-black text-[#5140d8]">{membership.role}</span></td></tr>)}</tbody></table></div>}</section>
            <section className="overflow-hidden rounded-2xl border border-[#e4e1ec] bg-white"><div className="border-b border-[#eeeaf4] px-5 py-4"><h2 className="font-black">Aufträge</h2><p className="mt-1 text-xs text-[#858991]">Status und Kosten aus der Job-Tabelle.</p></div>{overview.jobs.length === 0 ? <p className="p-5 text-sm text-[#858991]">Noch keine Aufträge.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-[#faf9fc] text-xs uppercase tracking-wider text-[#8a8e94]"><tr><th className="px-5 py-3">Konzept</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Modus</th><th className="px-5 py-3">Kosten</th><th className="px-5 py-3">Erstellt</th></tr></thead><tbody>{overview.jobs.map((job) => <tr key={job.id} className="border-t border-[#f0edf5]"><td className="max-w-[260px] truncate px-5 py-3 font-bold">{job.concept}</td><td className="px-5 py-3">{STATUS_LABELS[job.status]}</td><td className="px-5 py-3 text-xs font-mono">{job.execution_mode || "legacy"}</td><td className="px-5 py-3">{job.cost == null ? "—" : `$${Number(job.cost).toFixed(4)}`}</td><td className="px-5 py-3 text-[#686c73]">{formatDateTime(job.created_at)}</td></tr>)}</tbody></table></div>}</section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#e4e1ec] bg-white p-5"><h2 className="font-black">Rolle vergeben</h2><p className="mt-2 text-xs leading-5 text-[#858991]">Nur ein globaler Admin darf Memberships ändern. Die vorhandene Account-Ownership bleibt erhalten.</p><form onSubmit={addMembership} className="mt-5 space-y-3"><label className="block text-xs font-black uppercase tracking-wider text-[#8a8e94]">Account</label><select value={accountId} onChange={(event) => setAccountId(event.target.value)} className="w-full rounded-xl border border-[#dedbe7] bg-white px-3 py-3 text-sm font-semibold"><option value="">Account wählen …</option>{overview.accounts.map((account) => <option key={account.id} value={account.id}>{account.name} · {account.id}</option>)}</select><label className="block text-xs font-black uppercase tracking-wider text-[#8a8e94]">Clerk User ID</label><input value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="user_…" className="w-full rounded-xl border border-[#dedbe7] px-3 py-3 text-sm font-mono" /><label className="block text-xs font-black uppercase tracking-wider text-[#8a8e94]">Rolle</label><select value={role} onChange={(event) => setRole(event.target.value as Role)} className="w-full rounded-xl border border-[#dedbe7] bg-white px-3 py-3 text-sm font-semibold"><option value="customer">customer</option><option value="admin">admin</option><option value="owner">owner</option></select><button type="submit" disabled={busy || !accountId || !userId.trim()} className="w-full rounded-xl bg-[#6d5dfc] px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Speichere …" : "Membership speichern"}</button></form></section>
            <section className="rounded-2xl border border-[#e4e1ec] bg-white p-5"><h2 className="font-black">Usage-Events</h2><p className="mt-2 text-xs leading-5 text-[#858991]">Append-only Kostensignale; unbekannte Kosten bleiben unbekannt.</p>{overview.usage.length === 0 ? <p className="mt-5 text-sm text-[#858991]">Noch keine Events.</p> : <ul className="mt-5 space-y-3">{overview.usage.slice(0, 12).map((event) => <li key={String(event.id)} className="rounded-xl bg-[#faf9fc] p-3 text-xs"><div className="font-bold">{String(event.kind)} · {String(event.execution_mode)}</div><div className="mt-1 text-[#686c73]">{event.cost_usd == null ? "Kosten unbekannt" : `$${Number(event.cost_usd).toFixed(4)}`} · {formatDateTime(typeof event.created_at === "string" ? event.created_at : null)}</div></li>)}</ul>}</section>
          </aside>
        </section>
      </div>
    </main>
  );
}
