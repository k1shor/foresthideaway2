"use client";

import { useEffect, useState } from "react";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { ContactPageContent } from "@/lib/api/types";
import ContactPageForm from "./ContactPageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditContactPage() {
  const [content, setContent] = useState<ContactPageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .getSingleton<ContactPageContent>("pages/contact")
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!content) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Contact Page</AdminPageTitle>
      <ContactPageForm initial={content} />
    </div>
  );
}
