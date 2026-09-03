"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Footprints,
  Package,
  Newspaper,
  MessageSquareText,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/activities", label: "Activities", icon: Footprints },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/guest-reviews", label: "Guest Reviews", icon: MessageSquareText },
];

interface AdminSidebarProps {
  userEmail?: string;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileExpanded: boolean;
  onToggleMobileExpanded: () => void;
}

export default function AdminSidebar({
  userEmail,
  collapsed,
  onToggleCollapsed,
  mobileExpanded,
  onToggleMobileExpanded,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // Mobile visibility of labels/logo-text follows mobileExpanded; desktop follows collapsed.
  const labelClass = `${mobileExpanded ? "inline" : "hidden"} ${collapsed ? "md:hidden" : "md:inline"}`;
  const logoLabelClass = `${mobileExpanded ? "flex" : "hidden"} ${collapsed ? "md:hidden" : "md:flex"}`;
  const emailClass = `${mobileExpanded ? "block" : "hidden"} ${collapsed ? "md:hidden" : "md:block"}`;

  return (
    <>
      {/* Mobile-only spacer reserving the icon-rail width in flow, since the nav is `fixed`
          (out of flow) below md. On desktop the nav is `md:sticky` and reserves its own
          space, so this spacer must stay out of the layout there or it doubles up. */}
      <div className="shrink-0 w-16 md:hidden" />

      {/* Mobile backdrop — only when expanded to the full floating overlay */}
      {mobileExpanded && (
        <div
          onClick={onToggleMobileExpanded}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <nav
        className={`fixed md:sticky top-0 left-0 h-screen z-50 bg-[#1c2316] text-[#cfc4a8] flex flex-col p-3 gap-1 transition-all duration-300 ease-out ${
          mobileExpanded ? "w-64" : "w-16"
        } ${collapsed ? "md:w-[72px]" : "md:w-64"}`}
      >
        <div className="flex items-center justify-between mb-6 px-1">
          {/* Logo — desktop only, per request never shown on small screens */}
          <Link href="/admin" className="hidden md:flex items-center gap-2.5 min-w-0">
            <Image
              src="/logo-icon.png"
              alt=""
              width={716}
              height={522}
              className="h-8 w-auto object-contain shrink-0"
            />
            <span className={`${logoLabelClass} flex-col items-start min-w-0`}>
              <span className="font-serif text-base text-[#f5ede0] tracking-widest leading-none">
                FOREST
              </span>
              <span className="text-[8px] tracking-[0.35em] font-light text-[#d4a85a] mt-1">
                HIDEAWAY RESORT
              </span>
            </span>
          </Link>
          {/* Mobile expand/collapse toggle — lives on the rail itself */}
          <button
            onClick={onToggleMobileExpanded}
            aria-label={mobileExpanded ? "Collapse menu" : "Expand menu"}
            className="md:hidden text-[#cfc4a8] hover:text-white p-1 shrink-0"
          >
            <Menu size={18} />
          </button>
        </div>

        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => mobileExpanded && onToggleMobileExpanded()}
              title={collapsed && !mobileExpanded ? link.label : undefined}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[11px] tracking-[0.1em] uppercase font-light transition-colors ${
                !mobileExpanded ? "justify-center px-0" : ""
              } ${collapsed ? "md:justify-center md:px-0" : "md:justify-start"} ${
                active
                  ? "bg-[#c8923a]/[0.16] text-[#f0d9a8]"
                  : "text-[#cfc4a8] hover:bg-white/[0.04] hover:text-[#f5ede0]"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} className="shrink-0" />
              <span className={labelClass}>{link.label}</span>
            </Link>
          );
        })}

        <div className="flex-1" />

        {/* Collapse toggle — desktop only */}
        <button
          onClick={onToggleCollapsed}
          className={`hidden md:flex items-center gap-2.5 px-3 py-2 rounded-md text-[10px] tracking-[0.1em] uppercase font-light text-[#8a8163] hover:bg-white/[0.04] hover:text-[#f5ede0] transition-colors ${
            collapsed ? "justify-center px-0" : ""
          }`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>

        {userEmail && (
          <div className={`${emailClass} text-[11px] text-[#8a8163] border-t border-white/10 pt-3.5 mt-2 px-2 truncate`}>
            {userEmail}
          </div>
        )}
      </nav>
    </>
  );
}
