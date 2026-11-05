"use client";

import { useEffect, useState } from "react";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { ActivitiesPageContent } from "@/lib/api/types";
import ActivitiesPageForm from "./ActivitiesPageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditActivitiesPage() {
  const [content, setContent] = useState<ActivitiesPageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .getSingleton<ActivitiesPageContent>("pages/activities")
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!content) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Activities Page</AdminPageTitle>
      <ActivitiesPageForm initial={content} />
    </div>
  );
}
