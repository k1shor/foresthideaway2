"use client";

import { useEffect, useState } from "react";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { BlogsPageContent } from "@/lib/api/types";
import BlogsPageForm from "./BlogsPageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditBlogsPage() {
  const [content, setContent] = useState<BlogsPageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .getSingleton<BlogsPageContent>("pages/blogs")
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!content) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Blogs Page</AdminPageTitle>
      <BlogsPageForm initial={content} />
    </div>
  );
}
