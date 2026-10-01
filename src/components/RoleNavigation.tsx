"use client";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { api, type MeResponse } from "../lib/api/client";
import { privilegedLinks } from "../lib/access";
import { isClerkConfigured } from "../lib/auth";

export function RoleNavigation({ className = "flex flex-wrap items-center gap-2" }: { className?: string }) {
  return isClerkConfigured ? <AuthenticatedRoleNavigation className={className} /> : null;
}
function AuthenticatedRoleNavigation({ className }: { className: string }) {
  const { getToken, isLoaded, isSignedIn, userId, sessionId } = useAuth();
  const subject = `${userId ?? ""}:${sessionId ?? ""}`;
  const [result, setResult] = useState<{ subject: string; identity: MeResponse } | null>(null);
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let active = true;
    api.getMe(getToken).then((identity) => { if (active) setResult(identity.user_id === userId ? { subject, identity } : null); }).catch(() => { if (active) setResult(null); });
    return () => { active = false; };
  }, [getToken, isLoaded, isSignedIn, subject, userId]);
  const identity = isSignedIn && result?.subject === subject ? result.identity : null;
  const links = privilegedLinks(identity);
  if (links.length === 0) return null;
  return <nav aria-label="Berechtigte Bereiche" className={className}>{links.map((link) => <Link key={link.href} href={link.href} className="inline-flex rounded-xl px-3 py-2 text-xs font-black text-[#6555e8] hover:bg-[#f0edff]">{link.label}</Link>)}</nav>;
}
