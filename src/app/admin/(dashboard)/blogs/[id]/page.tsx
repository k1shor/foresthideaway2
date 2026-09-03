"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { Blog } from "@/lib/api/types";
import BlogForm from "../BlogForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .get<Blog>("blogs", params.id)
      .then(setBlog)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [params.id]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!blog) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Edit Blog</AdminPageTitle>
      <BlogForm initial={blog} />
    </div>
  );
}
