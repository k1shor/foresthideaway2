"use client";

import Link from "next/link";

interface AdminTopbarProps {
  onLogout: () => void;
}

export default function AdminTopbar({ onLogout }: AdminTopbarProps) {
  return (
    <header className="h-14 border-b border-[#e8d8c0] bg-[#faf6ef] flex items-center justify-end px-4 md:px-6 gap-4">
      <Link
        href="/"
        target="_blank"
        className="text-sm text-[#7a6852] hover:text-[#c8923a] transition-colors"
      >
        View Site ↗
      </Link>
      <button
        onClick={onLogout}
        className="text-sm text-[#8b5e3c] hover:text-[#c8923a] transition-colors"
      >
        Log out
      </button>
    </header>
  );
}
