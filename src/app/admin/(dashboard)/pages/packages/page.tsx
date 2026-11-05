"use client";

import { useEffect, useState } from "react";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { PackagesPageContent } from "@/lib/api/types";
import PackagesPageForm from "./PackagesPageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditPackagesPage() {
  const [content, setContent] = useState<PackagesPageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .getSingleton<PackagesPageContent>("pages/packages")
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!content) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Packages Page</AdminPageTitle>
      <PackagesPageForm initial={content} />
    </div>
  );
}
