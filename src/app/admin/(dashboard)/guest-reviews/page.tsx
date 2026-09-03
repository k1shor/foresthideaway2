"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { GuestReview } from "@/lib/api/types";
import AdminTable from "@/components/admin/AdminTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function GuestReviewsListPage() {
  const router = useRouter();
  const { data: items, error, isLoading, mutate } = useSWR<GuestReview[]>(
    "guest-reviews",
    (resource: string) => adminApiClient.list<GuestReview>(resource)
  );
  const [pendingDelete, setPendingDelete] = useState<GuestReview | null>(null);

  async function handleDelete() {
    if (!pendingDelete) return;
    await adminApiClient.remove("guest-reviews", pendingDelete._id);
    setPendingDelete(null);
    mutate();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <AdminPageTitle>Guest Reviews</AdminPageTitle>
        <Link
          href="/admin/guest-reviews/new"
          className="bg-[#c8923a] text-white rounded-md px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap hover:bg-[#b5822f] transition-colors"
        >
          + New Review
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">Failed to load.</p>}

      {isLoading ? (
        <p className="text-sm text-neutral-500">Loading...</p>
      ) : (
        <AdminTable
          items={items ?? []}
          getId={(item) => item._id}
          columns={[
            { header: "Name", render: (item) => item.name },
            { header: "Trip", render: (item) => item.trip },
            { header: "Rating", render: (item) => item.rating },
            {
              header: "Published",
              render: (item) => (item.published ? "Yes" : "No"),
            },
            { header: "Order", render: (item) => item.order },
          ]}
          onEdit={(item) => router.push(`/admin/guest-reviews/${item._id}`)}
          onDelete={(item) => setPendingDelete(item)}
        />
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete review"
        message={`Delete review by "${pendingDelete?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
