"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Footprints,
  Package,
  Newspaper,
  MessageSquareText,
  Home,
  Users,
  TreePine,
  Phone,
  LayoutTemplate,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  type LucideIcon,
} from "lucide-react";

interface LeafLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface GroupLink {
  key: string;
  label: string;
  children: LeafLink[];
}

type NavItem = LeafLink | GroupLink;

function isGroup(item: NavItem): item is GroupLink {
  return "children" in item;
}

const links: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    key: "activities",
    label: "Activities",
    children: [
      { href: "/admin/activities", label: "List", icon: Footprints },
      { href: "/admin/pages/activities", label: "Page", icon: LayoutTemplate },
    ],
  },
  {
    key: "packages",
    label: "Packages",
    children: [
      { href: "/admin/packages", label: "List", icon: Package },
      { href: "/admin/pages/packages", label: "Page", icon: LayoutTemplate },
    ],
  },
  {
    key: "blogs",
    label: "Blogs",
    children: [
      { href: "/admin/blogs", label: "List", icon: Newspaper },
      { href: "/admin/pages/blogs", label: "Page", icon: LayoutTemplate },
    ],
  },
  {
    key: "guestReviews",
    label: "Guest Reviews",
    children: [
      { href: "/admin/guest-reviews", label: "List", icon: MessageSquareText },
      { href: "/admin/pages/guest-reviews", label: "Page", icon: LayoutTemplate },
    ],
  },
  { href: "/admin/pages/home", label: "Home Page", icon: Home },
  { href: "/admin/pages/about", label: "About Us Page", icon: Users },
  { href: "/admin/pages/bardia-national-park", label: "Bardia National Park Page", icon: TreePine },
  { href: "/admin/pages/contact", label: "Contact Page", icon: Phone },
];

const GROUP_KEYS = links.filter(isGroup).map((g) => g.key);

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

  // All groups start expanded; collapsing one is a per-group manual choice.
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(GROUP_KEYS.map((k) => [k, true]))
  );

  // If the current route is a child of a group the user previously collapsed,
  // force that group back open so the active link is never hidden.
  useEffect(() => {
    for (const item of links) {
      if (!isGroup(item)) continue;
      if (item.children.some((c) => pathname.startsWith(c.href))) {
        setExpandedGroups((prev) => (prev[item.key] ? prev : { ...prev, [item.key]: true }));
      }
    }
  }, [pathname]);

  function toggleGroup(key: string) {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // Mobile visibility of labels/logo-text follows mobileExpanded; desktop follows collapsed.
  const labelClass = `${mobileExpanded ? "inline" : "hidden"} ${collapsed ? "md:hidden" : "md:inline"}`;
  const logoLabelClass = `${mobileExpanded ? "flex" : "hidden"} ${collapsed ? "md:hidden" : "md:flex"}`;
  const emailClass = `${mobileExpanded ? "block" : "hidden"} ${collapsed ? "md:hidden" : "md:block"}`;
  // The whole group header row (text + chevron) only makes sense when labels are visible —
  // in icon-only rail mode (mobile collapsed or desktop collapsed) there's no room for it,
  // so the group flattens to just its children's icons, same as any standalone link.
  const groupHeaderClass = `${mobileExpanded ? "flex" : "hidden"} ${collapsed ? "md:hidden" : "md:flex"}`;

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

        {links.map((item) => {
          if (isGroup(item)) {
            const groupActive = item.children.some((c) => pathname.startsWith(c.href));
            const expanded = expandedGroups[item.key];
            return (
              <div key={item.key}>
                {/* Group header — hidden entirely in icon-only rail mode, where the
                    group just flattens to its children's icons (see groupHeaderClass). */}
                <button
                  type="button"
                  onClick={() => toggleGroup(item.key)}
                  aria-expanded={expanded}
                  className={`${groupHeaderClass} w-full items-center justify-between gap-2.5 px-3 py-2.5 rounded-md text-[11px] tracking-[0.1em] uppercase font-light transition-colors ${
                    groupActive ? "text-[#f0d9a8]" : "text-[#cfc4a8] hover:bg-white/[0.04] hover:text-[#f5ede0]"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className={`shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                {item.children.map((child) => {
                  const active = pathname.startsWith(child.href);
                  const Icon = child.icon;
                  // Visible when: in icon-only rail mode (flattened, always shown), OR
                  // in full-width mode with this group expanded. Mirrors labelClass's
                  // own mobile/desktop split so both breakpoints stay independently correct.
                  const childVisibleClass = `${
                    !mobileExpanded || expanded ? "flex" : "hidden"
                  } ${collapsed || expanded ? "md:flex" : "md:hidden"}`;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => mobileExpanded && onToggleMobileExpanded()}
                      title={collapsed && !mobileExpanded ? `${item.label} ${child.label}` : undefined}
                      className={`${childVisibleClass} items-center gap-2.5 px-3 py-2.5 rounded-md text-[11px] tracking-[0.1em] uppercase font-light transition-colors ${
                        !mobileExpanded ? "justify-center px-0" : "pl-8"
                      } ${collapsed ? "md:justify-center md:px-0" : "md:pl-8 md:justify-start"} ${
                        active
                          ? "bg-[#c8923a]/[0.16] text-[#f0d9a8]"
                          : "text-[#cfc4a8] hover:bg-white/[0.04] hover:text-[#f5ede0]"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.75} className="shrink-0" />
                      <span className={labelClass}>{child.label}</span>
                    </Link>
                  );
                })}
              </div>
            );
          }

          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobileExpanded && onToggleMobileExpanded()}
              title={collapsed && !mobileExpanded ? item.label : undefined}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[11px] tracking-[0.1em] uppercase font-light transition-colors ${
                !mobileExpanded ? "justify-center px-0" : ""
              } ${collapsed ? "md:justify-center md:px-0" : "md:justify-start"} ${
                active
                  ? "bg-[#c8923a]/[0.16] text-[#f0d9a8]"
                  : "text-[#cfc4a8] hover:bg-white/[0.04] hover:text-[#f5ede0]"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} className="shrink-0" />
              <span className={labelClass}>{item.label}</span>
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
