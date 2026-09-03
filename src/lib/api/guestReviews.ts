import { apiFetch } from "./config";
import type { GuestReview } from "./types";

export function getGuestReviews() {
  return apiFetch<GuestReview[]>("/api/guest-reviews");
}
