"use client";

import { useEffect, useState } from "react";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { HomePageContent } from "@/lib/api/types";
import HomePageForm from "./HomePageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditHomePage() {
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .getSingleton<HomePageContent>("pages/home")
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!content) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Home Page</AdminPageTitle>
      <HomePageForm initial={content} />
    </div>
  );
}
