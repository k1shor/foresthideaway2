"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { GuestReview } from "@/lib/api/types";
import GuestReviewForm from "../GuestReviewForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditGuestReviewPage() {
  const params = useParams<{ id: string }>();
  const [review, setReview] = useState<GuestReview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .get<GuestReview>("guest-reviews", params.id)
      .then(setReview)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [params.id]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!review) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Edit Guest Review</AdminPageTitle>
      <GuestReviewForm initial={review} />
    </div>
  );
}
