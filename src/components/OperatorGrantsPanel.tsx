"use client";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api/client";
import { operatorGrantConfirmed, type OperatorGrant } from "../lib/operations";
import { canAdmin } from "../lib/access";
import { useAccessIdentity } from "./AccessGate";

export function OperatorGrantsPanel() {
  const identity = useAccessIdentity();
  return canAdmin(identity) ? <GrantsContent /> : null;
}
function GrantsContent() {
  const { getToken } = useAuth();
  const [items, setItems] = useState<OperatorGrant[]>([]);
  const [userId, setUserId] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const load = useCallback(async () => {
    setItems(await api.getOperators(getToken));
  }, [getToken]);
  useEffect(() => {
    let active = true;
    api.getOperators(getToken).then((value) => { if (active) setItems(value); }).catch(() => { if (active) setError("Betriebsfreigaben konnten nicht geladen werden."); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [getToken]);
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userId.trim() || busy) return;
    if (userId !== userId.trim() || /\s/.test(userId)) { setError("Die User ID muss ohne Leerzeichen eingegeben werden."); return; }
    setBusy(true); setError(null); setMessage(null);
    try {
      const subject = userId;
      await api.setOperator({ user_id: subject, enabled }, getToken);
      const verified = await api.getOperators(getToken);
      setItems(verified);
      if (!operatorGrantConfirmed(verified, subject, enabled)) throw new Error("Die Freigabe konnte nicht bestätigt werden.");
      setMessage(enabled ? "Betriebszugriff bestätigt." : "Betriebszugriff entzogen und bestätigt.");
      setUserId("");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Die Betriebsfreigabe konnte nicht gespeichert werden."); }
    finally { setBusy(false); }
  }
  return <section className="rounded-2xl border border-[#e4e1ec] bg-white p-5">
    <h2 className="font-black">Betriebszugriff verwalten</h2>
    <p className="mt-2 text-xs leading-5 text-[#858991]">Eine ausdrückliche Freigabe erlaubt ausschließlich Kunden-, Bestell- und Videoübersicht sowie Downloads. Sie gewährt keine globalen Adminrechte und keine Rollen-, System- oder Zahlungsverwaltung.</p>
    {error && <p role="alert" className="mt-4 text-sm text-[#9c3c3c]">{error}</p>}
    {message && <p role="status" className="mt-4 text-sm text-[#25805b]">{message}</p>}
    {loading ? <p className="mt-4 text-xs text-[#858991]">Freigaben werden geladen …</p> : <ul className="mt-4 space-y-2">{items.map((item) => <li key={item.user_id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#faf9fc] p-3 text-xs"><span className="break-all font-mono">{item.user_id}</span><span className="font-bold">{item.enabled ? "Freigegeben" : "Entzogen"}</span><button type="button" disabled={busy} onClick={() => { setUserId(item.user_id); setEnabled(!item.enabled); }} className="font-bold text-[#6555e8]">{item.enabled ? "Entzug vorbereiten" : "Freigabe vorbereiten"}</button></li>)}</ul>}
    <form onSubmit={save} className="mt-5 space-y-3">
      <label className="block text-xs font-bold" htmlFor="operator-user-id">Clerk User ID</label>
      <input id="operator-user-id" value={userId} onChange={(event) => setUserId(event.target.value)} required placeholder="user_…" className="w-full rounded-xl border border-[#dedbe7] px-3 py-3 font-mono text-sm" />
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} /> Betriebszugriff freigeben</label>
      <button type="submit" disabled={busy || !userId.trim()} className="w-full rounded-xl bg-[#6d5dfc] px-4 py-3 text-sm font-black text-white disabled:opacity-50">{busy ? "Speichere und prüfe …" : enabled ? "Betriebszugriff freigeben" : "Betriebszugriff entziehen"}</button>
    </form>
    <button type="button" onClick={() => void load().catch(() => setError("Freigaben konnten nicht aktualisiert werden."))} className="mt-3 text-xs font-bold text-[#6555e8]">Freigaben aktualisieren</button>
  </section>;
}
