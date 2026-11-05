"use client";

import { useEffect, useState } from "react";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { AboutPageContent } from "@/lib/api/types";
import AboutPageForm from "./AboutPageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditAboutPage() {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .getSingleton<AboutPageContent>("pages/about")
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!content) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">About Us Page</AdminPageTitle>
      <AboutPageForm initial={content} />
    </div>
  );
}
