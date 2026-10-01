// A tab-local lookup reference, never proof of payment or authorization.
const PENDING_PURCHASE_KEY = "igv.pendingPurchaseRequest";
const SAFE_REQUEST_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;

export function rememberPurchase(storage: Pick<Storage, "setItem">, requestId: string): void {
  if (!SAFE_REQUEST_ID.test(requestId)) return;
  try { storage.setItem(PENDING_PURCHASE_KEY, requestId); } catch { /* Checkout still works when browser storage is disabled. */ }
}

export function pendingPurchaseId(storage: Pick<Storage, "getItem">): string | null {
  try {
    const requestId = storage.getItem(PENDING_PURCHASE_KEY);
    return requestId && SAFE_REQUEST_ID.test(requestId) ? requestId : null;
  } catch { return null; }
}
