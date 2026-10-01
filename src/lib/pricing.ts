/** Prices and packages come exclusively from the validated backend public config. */
export function formatPrice(value: number | null): string {
  if (value === null) return "Preis noch nicht freigegeben";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}
