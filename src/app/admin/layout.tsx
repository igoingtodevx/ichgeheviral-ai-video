import type { ReactNode } from "react";
import { AccessGate } from "../../components/AccessGate";
// Content management (testimonials/social proof) is open to approved operators;
// system administration under /admin/overview adds its own global-admin gate.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AccessGate mode="operations">{children}</AccessGate>;
}
