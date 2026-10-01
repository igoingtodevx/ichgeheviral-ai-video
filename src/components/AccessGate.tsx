"use client";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LoaderCircle, Shield } from "lucide-react";
import { api, type MeResponse } from "../lib/api/client";
import { canAdmin, canOperate } from "../lib/access";
import { isClerkConfigured } from "../lib/auth";
import { ProtectedUnavailable } from "./ProtectedUnavailable";

const IdentityContext = createContext<MeResponse | null>(null);
export const useAccessIdentity = () => useContext(IdentityContext);

export function AccessGate({ mode, children }: { mode: "admin" | "operations"; children: ReactNode }) {
  return isClerkConfigured ? <VerifiedAccess mode={mode}>{children}</VerifiedAccess> : <ProtectedUnavailable admin />;
}
function VerifiedAccess({ mode, children }: { mode: "admin" | "operations"; children: ReactNode }) {
  const { getToken, isLoaded, isSignedIn, userId, sessionId } = useAuth();
  const [result, setResult] = useState<{ subject: string; identity: MeResponse | null; error: string | null } | null>(null);
  const subject = `${userId ?? ""}:${sessionId ?? ""}`;
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let active = true;
    api.getMe(getToken).then((identity) => {
      if (active) setResult(identity.user_id === userId
        ? { subject, identity, error: null }
        : { subject, identity: null, error: "Berechtigung konnte nicht bestätigt werden." });
    }).catch(() => {
      if (active) setResult({ subject, identity: null, error: "Berechtigung konnte nicht bestätigt werden." });
    });
    return () => { active = false; };
  }, [getToken, isLoaded, isSignedIn, subject, userId]);
  if (!isLoaded || (isSignedIn && result?.subject !== subject)) return <div role="status" className="flex min-h-[65vh] items-center justify-center gap-3 text-sm font-bold text-[#686c73]"><LoaderCircle className="h-5 w-5 animate-spin" /> Berechtigung wird geprüft …</div>;
  const identity = isSignedIn && result?.subject === subject ? result.identity : null;
  return <IdentityBoundary mode={mode} identity={identity} error={result?.error} signedIn={!!isSignedIn}>{children}</IdentityBoundary>;
}
/** Only verified identities enter this boundary. Unauthorized children never mount. */
export function IdentityBoundary({ mode, identity, error, signedIn, children }: { mode: "admin" | "operations"; identity: MeResponse | null; error?: string | null; signedIn: boolean; children: ReactNode }) {
  const allowed = mode === "admin" ? canAdmin(identity) : canOperate(identity);
  if (!allowed) return <main className="mx-auto max-w-3xl px-5 py-20 text-[#101114]"><Shield className="h-8 w-8 text-[#6d5dfc]" /><h1 className="mt-4 text-3xl font-black">Kein Zugriff</h1><p className="mt-3 text-sm text-[#686c73]">{error || (mode === "admin" ? "Dieser Bereich ist ausschließlich für den globalen Administrator freigegeben." : "Dieser Bereich benötigt eine ausdrückliche Betriebsfreigabe.")}</p><Link href={signedIn ? "/kundenbereich" : "/sign-in"} className="mt-6 inline-flex rounded-xl bg-[#6d5dfc] px-5 py-3 text-sm font-black text-white">{signedIn ? "Zum Kundenbereich" : "Anmelden"}</Link></main>;
  return <IdentityContext.Provider value={identity}>{children}</IdentityContext.Provider>;
}
