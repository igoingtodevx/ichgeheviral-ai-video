"use client";
import { createContext, useContext, type ReactNode } from "react";
import { SAFE_PUBLIC_CONFIG, type PublicConfig } from "../lib/business-config";

const BusinessContext = createContext<PublicConfig>(SAFE_PUBLIC_CONFIG);
export function BusinessConfigProvider({ value, children }: { value: PublicConfig; children: ReactNode }) {
  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
}
export const useBusinessConfig = () => useContext(BusinessContext);
