import type { ReactNode } from "react";
import { StudioShell } from "../../components/StudioShell";
import { ProtectedUnavailable } from "../../components/ProtectedUnavailable";
import { isClerkConfigured } from "../../lib/auth";

export default function KundenbereichLayout({ children }: { children: ReactNode }) {
  return isClerkConfigured ? <StudioShell>{children}</StudioShell> : <ProtectedUnavailable />;
}
