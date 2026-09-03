"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken, meRequest } from "./adminApiClient";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function validate() {
      const token = getToken();
      if (!token) {
        router.replace("/admin/login");
        return;
      }
      try {
        const me = await meRequest();
        if (!cancelled) {
          setUser(me);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          router.replace("/admin/login");
        }
      }
    }

    validate();
    return () => {
      cancelled = true;
    };
  }, [router]);

  function logout() {
    clearToken();
    router.replace("/admin/login");
  }

  return { user, loading, logout };
}
