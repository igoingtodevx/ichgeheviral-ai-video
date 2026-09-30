export const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
export const isClerkConfigured = Boolean(CLERK_PUBLISHABLE_KEY);
