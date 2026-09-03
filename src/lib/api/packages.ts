import { apiFetch } from "./config";
import type { Package } from "./types";

export function getPackages() {
  return apiFetch<Package[]>("/api/packages");
}

export function getPackageBySlug(slug: string) {
  return apiFetch<Package>(`/api/packages/${slug}`);
}
