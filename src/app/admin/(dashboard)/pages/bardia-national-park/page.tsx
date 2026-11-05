"use client";

import { useEffect, useState } from "react";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { BardiaPageContent } from "@/lib/api/types";
import BardiaPageForm from "./BardiaPageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditBardiaPage() {
  const [content, setContent] = useState<BardiaPageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .getSingleton<BardiaPageContent>("pages/bardia-national-park")
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!content) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Bardia National Park Page</AdminPageTitle>
      <BardiaPageForm initial={content} />
    </div>
  );
}
