"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { Activity } from "@/lib/api/types";
import ActivityForm from "../ActivityForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditActivityPage() {
  const params = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .get<Activity>("activities", params.id)
      .then(setActivity)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [params.id]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!activity) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Edit Activity</AdminPageTitle>
      <ActivityForm initial={activity} />
    </div>
  );
}
