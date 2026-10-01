"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { api, type PurchaseStatus } from "../../../lib/api/client";
import { isClerkConfigured } from "../../../lib/auth";
import { ProtectedUnavailable } from "../../../components/ProtectedUnavailable";

export default function CheckoutReturnPage() {
  return isClerkConfigured ? <Suspense fallback={<p className="p-8">Kaufstatus wird geladen …</p>}><PurchaseReturn /></Suspense> : <ProtectedUnavailable />;
}

function PurchaseReturn() {
  const requestId = useSearchParams().get("request_id");
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [purchase, setPurchase] = useState<PurchaseStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!requestId || !isLoaded || !isSignedIn) return;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;
    async function load() {
      try {
        const result = await api.getPurchase(requestId!, getToken);
        if (cancelled) return;
        setPurchase(result); setError(null);
        if (["draft", "checkout_created"].includes(result.status)) timeout = setTimeout(load, 5000);
      } catch (reason) { if (!cancelled) setError(reason instanceof Error ? reason.message : "Kaufstatus nicht verfügbar."); }
    }
    timeout = setTimeout(() => void load(), 0);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [requestId, getToken, isLoaded, isSignedIn]);
  const paid = purchase?.status === "paid" || purchase?.status === "paid_no_video";
  return <main className="min-h-screen bg-[#f7f7fb] px-5 py-16 text-[#101114]"><section className="mx-auto max-w-lg rounded-3xl border border-[#e4e1ec] bg-white p-8"><h1 className="text-3xl font-black">{paid ? "Kauf bestätigt" : "Kaufstatus prüfen"}</h1><p className="mt-4 text-sm leading-6 text-[#686c73]">{!requestId ? "Die Kaufreferenz fehlt. Es wurde kein Auftrag angelegt." : error || (purchase ? paid ? "Das Backend hat deinen Kauf bestätigt." : `Aktueller Status: ${purchase.status}. Ein Redirect ist kein Zahlungsnachweis.` : "Wir prüfen deine Kaufreferenz im Backend. Es wird keine Zahlung und keine Generierung ausgelöst.")}</p>{purchase?.video_job_id && <Link href={`/kundenbereich/produktion?job_id=${encodeURIComponent(purchase.video_job_id)}`} className="mt-7 inline-block rounded-xl bg-[#6d5dfc] px-5 py-3 text-sm font-black text-white">Zum Auftrag</Link>}{purchase?.add_course && <p className="mt-5 text-sm text-[#686c73]">Kursbereitstellung: {purchase.course_fulfillment || "noch nicht bestätigt"}</p>}<Link href="/kundenbereich" className="mt-6 block text-sm font-bold text-[#5d4de1]">Meine Reels →</Link></section></main>;
}
