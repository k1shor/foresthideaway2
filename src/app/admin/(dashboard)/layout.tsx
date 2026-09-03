"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/lib/admin/useAdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

const COLLAPSE_KEY = "admin_sidebar_collapsed";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, logout } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(COLLAPSE_KEY) === "1") setCollapsed(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      return next;
    });
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ef] text-sm text-[#7a6852]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#faf6ef]">
      <AdminSidebar
        userEmail={user.email}
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
        mobileExpanded={mobileExpanded}
        onToggleMobileExpanded={() => setMobileExpanded((prev) => !prev)}
      />
      <div className="flex-1 min-w-0">
        <AdminTopbar onLogout={logout} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
