"use client";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Download, Film, LoaderCircle, RefreshCw, Search, ShoppingBag, Users, X } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { api } from "../../lib/api/client";
import { canAdmin } from "../../lib/access";
import { filterOperations, type OperationsCustomer, type OperationsJob, type OperationsOrder, type OperationsOverview } from "../../lib/operations";
import { formatDateTime, STATUS_LABELS } from "../../lib/jobs";
import { useAccessIdentity } from "../../components/AccessGate";
import { ThemeToggle } from "../../components/ThemeToggle";

type Tab = "customers" | "orders" | "jobs";
type Selection = { kind: Tab; id: string } | null;
const CARD = "rounded-2xl border border-[#e4e1ec] bg-white";
const CONTROL = "min-h-11 rounded-xl border border-[#dedbe7] bg-white px-3 py-2 text-sm text-[#101114]";

export default function OperationsPage() {
  const { getToken } = useAuth();
  const identity = useAccessIdentity();
  const [overview, setOverview] = useState<OperationsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("jobs");
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Selection>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setOverview(await api.getOperationsOverview(getToken)); }
    catch (reason) { setOverview(null); setError(reason instanceof Error ? reason.message : "Betriebsdaten konnten nicht geladen werden."); }
    finally { setLoading(false); }
  }, [getToken]);
  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);
  async function download(job: OperationsJob) {
    if (downloading || job.status !== "completed") return;
    setDownloading(job.id); setError(null);
    try {
      const target = await api.operationsDownloadTarget(job.id, getToken);
      const link = document.createElement("a");
      link.href = target.url;
      link.download = `${job.id}.mp4`;
      if (!target.temporary) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
      document.body.append(link); link.click(); link.remove();
      if (target.temporary) window.setTimeout(() => URL.revokeObjectURL(target.url), 60000);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Das Video ist derzeit nicht verfügbar."); }
    finally { setDownloading(null); }
  }
  const filters = { query, customer, status: tab === "customers" ? "" : status };
  const customers = filterOperations(overview?.customers ?? [], filters);
  const orders = filterOperations(overview?.orders ?? [], filters);
  const jobs = filterOperations(overview?.jobs ?? [], filters);
  const statuses = Array.from(new Set(tab === "jobs" ? overview?.jobs.map((j) => j.status) : overview?.orders.map((o) => o.status))).sort();
  const chosenCustomer = selected?.kind === "customers" ? overview?.customers.find((c) => c.id === selected.id) : undefined;
  const chosenOrder = selected?.kind === "orders" ? overview?.orders.find((o) => o.request_id === selected.id) : undefined;
  const chosenJob = selected?.kind === "jobs" ? overview?.jobs.find((j) => j.id === selected.id) : undefined;
  const customerName = (id: string | null) => overview?.customers.find((c) => c.id === id)?.name || id || "Ohne Zuordnung";
  function selectTab(value: Tab) { setTab(value); setStatus(""); setSelected(null); }
  const summary = overview?.summary;
  const metrics = [[summary?.customers, "Kunden", Users], [summary?.orders, "Bestellungen", ShoppingBag], [summary?.jobs, "Videoaufträge", Film], [summary?.completed, "Fertige Videos", Film]] as const;

  return <main className="min-h-screen bg-[#f7f7fb] px-4 py-8 text-[#101114] sm:px-6 lg:px-10 lg:py-12">
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col justify-between gap-5 border-b border-[#e4e1ec] pb-7 sm:flex-row sm:items-end">
        <div><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]"><Film className="h-4 w-4" /> Betrieb</div><h1 className="mt-3 text-4xl font-black tracking-[-0.055em] sm:text-5xl">Kunden & Aufträge</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73]">Bestellungen verfolgen, Produktionsstatus prüfen und fertige Videos herunterladen. Ausschließlich echte Betriebsdaten.</p></div>
        <nav aria-label="Betriebsnavigation" className="flex flex-wrap items-center gap-2"><Link href="/kundenbereich" className={`${CONTROL} inline-flex items-center font-bold`}>Mein Studio</Link>{canAdmin(identity) && <Link href="/admin/overview" className={`${CONTROL} inline-flex items-center font-bold`}>Administration</Link>}<ThemeToggle /><button type="button" disabled={loading} onClick={() => void load()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#6d5dfc] px-4 py-3 text-sm font-black text-white disabled:opacity-50"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Aktualisieren</button></nav>
      </header>
      {error && <div role="alert" className="mt-6 rounded-2xl border border-[#f0caca] bg-[#fff5f5] p-4 text-sm font-semibold text-[#9c3c3c]">{error}</div>}
      {loading && !overview && <div role="status" className="flex items-center justify-center gap-3 py-20 text-sm font-bold text-[#686c73]"><LoaderCircle className="h-5 w-5 animate-spin" /> Betriebsdaten werden geladen …</div>}
      {overview && <>
        <section aria-label="Betriebsübersicht" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{metrics.map(([count, label, Icon]) => <div key={label} className={`${CARD} p-5`}><Icon className="h-5 w-5 text-[#6d5dfc]" /><div className="mt-4 text-2xl font-black">{count}</div><div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8a8e94]">{label}</div></div>)}</section>
        <section className="mt-8">
          <nav aria-label="Betriebsbereiche" className="flex flex-wrap gap-2">{([["customers", "Kunden"], ["orders", "Bestellungen"], ["jobs", "Videoaufträge"]] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={tab === value} onClick={() => selectTab(value)} className={`min-h-11 rounded-xl px-5 py-3 text-sm font-black ${tab === value ? "bg-[#6d5dfc] text-white" : "border border-[#e4e1ec] bg-white text-[#686c73]"}`}>{label}</button>)}</nav>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_220px_220px]">
            <label className="relative"><span className="sr-only">Betriebsdaten durchsuchen</span><Search className="absolute left-3 top-3.5 h-4 w-4 text-[#858991]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, Auftrag oder Bestellnummer suchen …" className={`${CONTROL} w-full pl-10`} /></label>
            <label><span className="sr-only">Nach Kunde filtern</span><select value={customer} onChange={(e) => setCustomer(e.target.value)} className={`${CONTROL} w-full`}><option value="">Alle Kunden</option>{overview.customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
            <label><span className="sr-only">Nach Status filtern</span><select disabled={tab === "customers"} value={status} onChange={(e) => setStatus(e.target.value)} className={`${CONTROL} w-full disabled:opacity-50`}><option value="">Alle Status</option>{statuses.map((s) => <option key={s} value={s}>{tab === "jobs" ? STATUS_LABELS[s as OperationsJob["status"]] || s : s}</option>)}</select></label>
          </div>
          <div className={`mt-5 grid items-start gap-5 ${selected ? "xl:grid-cols-[minmax(0,1fr)_360px]" : ""}`}>
            <div className={`${CARD} min-w-0 overflow-hidden`}>
              <div className="border-b border-[#eeeaf4] px-5 py-4"><h2 className="font-black">{tab === "customers" ? "Kunden" : tab === "orders" ? "Bestellungen" : "Videoaufträge"}</h2><p className="mt-1 text-xs text-[#858991]">{(tab === "customers" ? customers : tab === "orders" ? orders : jobs).length} Treffer · zum Öffnen Details wählen</p></div>
              {(tab === "customers" ? customers : tab === "orders" ? orders : jobs).length === 0 && <p className="p-6 text-sm text-[#858991]">Keine Einträge für diese Auswahl.</p>}
              <ul className="divide-y divide-[#f0edf5]">
                {tab === "customers" && customers.map((c) => <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 p-5"><div className="min-w-0"><h3 className="break-words font-bold">{c.name}</h3><p className="mt-1 break-all font-mono text-xs text-[#858991]">{c.id}</p><p className="mt-2 text-xs text-[#686c73]">Erstellt {formatDateTime(c.created_at)}</p></div><DetailButton onClick={() => setSelected({ kind: "customers", id: c.id })} label={`Details zu ${c.name}`} /></li>)}
                {tab === "orders" && orders.map((o) => <li key={o.request_id} className="flex flex-wrap items-center justify-between gap-3 p-5"><div className="min-w-0"><h3 className="break-words font-bold">{customerName(o.account_id)}</h3><p className="mt-1 break-all font-mono text-xs text-[#858991]">{o.order_id || o.request_id}</p><p className="mt-2 text-sm text-[#686c73]">{o.package} {o.add_course ? "· mit Kurs" : ""} · {o.status}</p><p className="mt-1 text-xs text-[#858991]">{formatDateTime(o.created_at)}</p></div><DetailButton onClick={() => setSelected({ kind: "orders", id: o.request_id })} label={`Details zur Bestellung ${o.request_id}`} /></li>)}
                {tab === "jobs" && jobs.map((j) => <li key={j.id} className="flex flex-wrap items-start justify-between gap-3 p-5"><div className="min-w-0 flex-1"><h3 className="break-words font-bold">{j.concept || "Videoauftrag"}</h3><p className="mt-1 break-all font-mono text-xs text-[#858991]">{j.id}</p><p className="mt-2 text-sm text-[#686c73]">{customerName(j.account_id)}</p><div className="mt-3 inline-flex rounded-full bg-[#f0edff] px-3 py-1 text-xs font-bold text-[#5140d8]">{STATUS_LABELS[j.status]}</div><p className="mt-2 text-xs text-[#858991]">{formatDateTime(j.updated_at)}</p></div><div className="flex flex-wrap gap-2"><DetailButton onClick={() => setSelected({ kind: "jobs", id: j.id })} label={`Details zum Videoauftrag ${j.id}`} />{j.status === "completed" && <DownloadButton busy={downloading !== null} onClick={() => void download(j)} />}</div></li>)}
              </ul>
            </div>
            {selected && (chosenCustomer || chosenOrder || chosenJob) && <aside aria-label="Auftragsdetails" className={`${CARD} min-w-0 p-5 xl:sticky xl:top-6`}>
              <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-black">{chosenCustomer ? "Kundendetails" : chosenOrder ? "Bestelldetails" : "Videodetails"}</h2><button type="button" aria-label="Details schließen" onClick={() => setSelected(null)} className="grid h-11 w-11 place-items-center rounded-xl border border-[#e4e1ec]"><X className="h-4 w-4" /></button></div>
              {chosenCustomer && <CustomerDetails customer={chosenCustomer} overview={overview} onShowOrders={() => { setCustomer(chosenCustomer.id); setQuery(""); selectTab("orders"); }} />}
              {chosenOrder && <OrderDetails order={chosenOrder} customerName={customerName(chosenOrder.account_id)} onJob={(id) => { setTab("jobs"); setStatus(""); setQuery(""); setCustomer(chosenOrder.account_id || ""); setSelected({ kind: "jobs", id }); }} hasJob={overview.jobs.some((j) => j.id === chosenOrder.video_job_id)} />}
              {chosenJob && <JobDetails job={chosenJob} customerName={customerName(chosenJob.account_id)} onDownload={() => void download(chosenJob)} downloading={downloading !== null} />}
            </aside>}
          </div>
        </section>
      </>}
    </div>
  </main>;
}
function DetailButton({ onClick, label }: { onClick: () => void; label: string }) { return <button type="button" aria-label={label} onClick={onClick} className="min-h-11 rounded-xl border border-[#dedbe7] px-4 py-2 text-xs font-black text-[#5140d8] hover:bg-[#f7f5ff]">Details</button>; }
function DownloadButton({ busy, onClick }: { busy: boolean; onClick: () => void }) { return <button type="button" disabled={busy} onClick={onClick} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#6d5dfc] px-4 py-2 text-xs font-black text-white disabled:opacity-50"><Download className="h-4 w-4" />{busy ? "Bitte warten …" : "Video herunterladen"}</button>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <div className="mt-4"><dt className="text-xs font-bold uppercase tracking-wider text-[#858991]">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-sm font-semibold text-[#4f555d]">{children ?? "—"}</dd></div>; }
function CustomerDetails({ customer: c, overview, onShowOrders }: { customer: OperationsCustomer; overview: OperationsOverview; onShowOrders: () => void }) { return <><dl><Field label="Name">{c.name}</Field><Field label="Kundennummer">{c.id}</Field><Field label="Erstellt">{formatDateTime(c.created_at)}</Field><Field label="Bestellungen">{overview.orders.filter((o) => o.account_id === c.id).length}</Field><Field label="Videoaufträge">{overview.jobs.filter((j) => j.account_id === c.id).length}</Field></dl><button type="button" onClick={onShowOrders} className="mt-5 min-h-11 rounded-xl bg-[#6d5dfc] px-4 py-3 text-sm font-black text-white">Bestellungen anzeigen</button></>; }
function OrderDetails({ order: o, customerName, onJob, hasJob }: { order: OperationsOrder; customerName: string; onJob: (id: string) => void; hasJob: boolean }) { return <><dl><Field label="Kunde">{customerName}</Field><Field label="Anfragenummer">{o.request_id}</Field><Field label="Bestellnummer">{o.order_id}</Field><Field label="Paket">{o.package}{o.add_course ? " · mit Marketing-Kurs" : ""}</Field><Field label="Status">{o.status}</Field><Field label="Videoauftrag">{o.video_job_id}</Field><Field label="Erstellt">{formatDateTime(o.created_at)}</Field><Field label="Aktualisiert">{formatDateTime(o.updated_at)}</Field></dl>{o.video_job_id && hasJob && <button type="button" onClick={() => onJob(o.video_job_id!)} className="mt-5 min-h-11 rounded-xl bg-[#6d5dfc] px-4 py-3 text-sm font-black text-white">Videoauftrag öffnen</button>}</>; }
function JobDetails({ job: j, customerName, onDownload, downloading }: { job: OperationsJob; customerName: string; onDownload: () => void; downloading: boolean }) {
  const percent = j.progress?.percent;
  const progress = typeof percent === "number" ? Math.max(0, Math.min(100, percent)) : null;
  return <><dl><Field label="Kunde">{customerName}</Field><Field label="Auftragsnummer">{j.id}</Field><Field label="Konzept">{j.concept}</Field><Field label="Status">{STATUS_LABELS[j.status]}</Field><Field label="Fortschritt">{progress === null ? "Noch nicht verfügbar" : `${progress}%`}</Field><Field label="Modus">{j.execution_mode}</Field><Field label="Erstellt">{formatDateTime(j.created_at)}</Field><Field label="Aktualisiert">{formatDateTime(j.updated_at)}</Field></dl>{progress !== null && <div role="progressbar" aria-label="Produktionsfortschritt" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="mt-4 h-2 overflow-hidden rounded-full bg-[#ece8ff]"><div className="h-full rounded-full bg-[#6d5dfc]" style={{ width: `${progress}%` }} /></div>}<div className="mt-5">{j.status === "completed" ? <DownloadButton busy={downloading} onClick={onDownload} /> : <p className="text-xs leading-5 text-[#858991]">Ein Download steht nach Abschluss der Produktion zur Verfügung.</p>}</div></>;
}
