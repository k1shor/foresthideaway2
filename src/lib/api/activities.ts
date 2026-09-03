import { apiFetch } from "./config";
import type { Activity } from "./types";

export function getActivities() {
  return apiFetch<Activity[]>("/api/activities");
}

export function getActivityBySlug(slug: string) {
  return apiFetch<Activity>(`/api/activities/${slug}`);
}
