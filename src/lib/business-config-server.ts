import "server-only";
import { cache } from "react";
import { fetchPublicConfig } from "./business-config";

// The backend is the sole launch authority. Read at request time, never bake it into a bundle.
export const loadPublicConfig = cache(() => fetchPublicConfig(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || ""));
