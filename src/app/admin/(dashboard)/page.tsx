"use client";

import useSWR from "swr";
import Link from "next/link";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { Activity, Package, Blog, GuestReview } from "@/lib/api/types";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

interface CollectionDef {
  key: string;
  href: string;
  label: string;
  singular: string;
}

const collections: CollectionDef[] = [
  { key: "activities", href: "/admin/activities", label: "Activities", singular: "Activity" },
  { key: "packages", href: "/admin/packages", label: "Packages", singular: "Package" },
  { key: "blogs", href: "/admin/blogs", label: "Blogs", singular: "Blog" },
  { key: "guest-reviews", href: "/admin/guest-reviews", label: "Guest Reviews", singular: "Review" },
];

interface RecentItem {
  id: string;
  title: string;
  img?: string;
  published: boolean;
  updatedAt: string;
  singular: string;
  editHref: string;
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function AdminDashboardPage() {
  const { data: activities, isLoading: l1 } = useSWR<Activity[]>("activities", (r: string) => adminApiClient.list<Activity>(r));
  const { data: packages, isLoading: l2 } = useSWR<Package[]>("packages", (r: string) => adminApiClient.list<Package>(r));
  const { data: blogs, isLoading: l3 } = useSWR<Blog[]>("blogs", (r: string) => adminApiClient.list<Blog>(r));
  const { data: reviews, isLoading: l4 } = useSWR<GuestReview[]>("guest-reviews", (r: string) => adminApiClient.list<GuestReview>(r));

  const loading = l1 || l2 || l3 || l4;

  const counts: Record<string, { total: number; published: number }> = {
    activities: { total: activities?.length ?? 0, published: activities?.filter((a) => a.published).length ?? 0 },
    packages: { total: packages?.length ?? 0, published: packages?.filter((p) => p.published).length ?? 0 },
    blogs: { total: blogs?.length ?? 0, published: blogs?.filter((b) => b.published).length ?? 0 },
    "guest-reviews": { total: reviews?.length ?? 0, published: reviews?.filter((r) => r.published).length ?? 0 },
  };

  const recent: RecentItem[] = !loading
    ? [
        ...(activities ?? []).map((a) => ({
          id: a._id,
          title: a.title,
          img: a.img,
          published: a.published,
          updatedAt: a.updatedAt,
          singular: "Activity",
          editHref: `/admin/activities/${a._id}`,
        })),
        ...(packages ?? []).map((p) => ({
          id: p._id,
          title: p.name,
          img: p.img,
          published: p.published,
          updatedAt: p.updatedAt,
          singular: "Package",
          editHref: `/admin/packages/${p._id}`,
        })),
        ...(blogs ?? []).map((b) => ({
          id: b._id,
          title: b.title,
          img: b.img,
          published: b.published,
          updatedAt: b.updatedAt,
          singular: "Blog",
          editHref: `/admin/blogs/${b._id}`,
        })),
        ...(reviews ?? []).map((r) => ({
          id: r._id,
          title: r.name,
          published: r.published,
          updatedAt: r.updatedAt,
          singular: "Review",
          editHref: `/admin/guest-reviews/${r._id}`,
        })),
      ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 6)
    : [];

  return (
    <div>
      <AdminPageTitle className="mb-6">Dashboard</AdminPageTitle>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {collections.map((c) => {
          const stat = counts[c.key];
          return (
            <Link
              key={c.href}
              href={c.href}
              className="bg-white border border-[#e8d8c0] rounded-lg p-6 hover:border-[#c8923a] transition-colors"
            >
              <div className="text-[10px] tracking-[0.14em] uppercase text-[#a89877] mb-3">
                {c.label}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl text-[#4a3a28] tabular-nums">
                  {loading ? "–" : stat?.total ?? 0}
                </span>
                <span className="text-[13px] text-[#a89877]">total</span>
              </div>
              {!loading && stat && stat.total > stat.published && (
                <div className="text-[11px] text-[#b5762a] mt-1.5">
                  {stat.total - stat.published} unpublished
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div>
        <h2 className="text-[11px] tracking-[0.14em] uppercase text-[#a89877] mb-3">
          Recently Updated
        </h2>
        <div className="bg-white border border-[#e8d8c0] rounded-lg divide-y divide-[#e8d8c0]">
          {loading && (
            <div className="px-4 py-6 text-center text-sm text-[#a89877]">Loading...</div>
          )}
          {!loading && recent.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-[#a89877]">No content yet.</div>
          )}
          {!loading &&
            recent.map((item) => (
              <Link
                key={`${item.singular}-${item.id}`}
                href={item.editHref}
                className="flex items-center gap-3.5 px-4 py-3 hover:bg-[#faf6ef] transition-colors"
              >
                <div className="w-9 h-9 rounded-md shrink-0 overflow-hidden bg-gradient-to-br from-[#c8923a] to-[#8b5e3c]">
                  {item.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.img} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] text-[#4a3a28] font-medium truncate">{item.title}</div>
                  <div className="text-[11px] text-[#a89877] mt-0.5">{item.singular}</div>
                </div>
                {!item.published && (
                  <span className="text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 rounded-full font-semibold whitespace-nowrap bg-[#e8d8c0]/60 text-[#a89877]">
                    Draft
                  </span>
                )}
                <span className="text-[11px] text-[#a89877] whitespace-nowrap">
                  {timeAgo(item.updatedAt)}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
