"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { Package } from "@/lib/api/types";
import PackageForm from "../PackageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function EditPackagePage() {
  const params = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApiClient
      .get<Package>("packages", params.id)
      .then(setPkg)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [params.id]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!pkg) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <AdminPageTitle className="mb-6">Edit Package</AdminPageTitle>
      <PackageForm initial={pkg} />
    </div>
  );
}
