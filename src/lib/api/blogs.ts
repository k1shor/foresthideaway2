import { apiFetch } from "./config";
import type { Blog } from "./types";

export function getBlogs() {
  return apiFetch<Blog[]>("/api/blogs");
}

export function getBlogBySlug(slug: string) {
  return apiFetch<Blog>(`/api/blogs/${slug}`);
}
