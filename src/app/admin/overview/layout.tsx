import type { ReactNode } from "react";
import { AccessGate } from "../../../components/AccessGate";
export default function AdminOverviewLayout({ children }: { children: ReactNode }) {
  return <AccessGate mode="admin">{children}</AccessGate>;
}
