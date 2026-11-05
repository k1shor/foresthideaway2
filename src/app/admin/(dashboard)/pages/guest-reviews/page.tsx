"use client";

import { useEffect, useState } from "react";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { GuestReviewsPageContent } from "@/lib/api/types";
import GuestReviewsPageForm from "./GuestReviewsPageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditGuestReviewsPage() {
  const [content, setContent] = useState<GuestReviewsPageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .getSingleton<GuestReviewsPageContent>("pages/guest-reviews")
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!content) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Guest Reviews Page</AdminPageTitle>
      <GuestReviewsPageForm initial={content} />
    </div>
  );
}
