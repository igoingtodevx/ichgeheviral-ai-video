import type { ReactNode } from "react";
import { AccessGate } from "../../components/AccessGate";
export default function OperationsLayout({ children }: { children: ReactNode }) {
  return <AccessGate mode="operations">{children}</AccessGate>;
}
