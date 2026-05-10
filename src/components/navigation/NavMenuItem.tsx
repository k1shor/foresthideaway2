'use client';

import Link from 'next/link';
import { useState } from 'react';

export type SubmenuItem = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  submenu?: SubmenuItem[];
};

type NavMenuItemProps = {
  item: NavItem;
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function NavMenuItem({ item, mobile = false, onNavigate }: NavMenuItemProps) {
  const [open, setOpen] = useState(false);

  /* ── No submenu: plain link ── */
  if (!item.submenu || item.submenu.length === 0) {
    return (
      <Link
        href={item.href || '/'}
        onClick={onNavigate}
        className="hover:opacity-75 transition-opacity whitespace-nowrap"
      >
        {item.label}
      </Link>
    );
  }

  /* ── Mobile: label link + chevron toggle ── */
  if (mobile) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* Label navigates to the parent page */}
          {item.href ? (
            <Link
              href={item.href}
              onClick={onNavigate}
              className="uppercase tracking-[0.18em] hover:opacity-75 transition-opacity"
            >
              {item.label}
            </Link>
          ) : (
            <span className="uppercase tracking-[0.18em]">{item.label}</span>
          )}
          {/* Separate chevron button toggles sub-items */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="ml-3 hover:opacity-75 transition-opacity"
            aria-expanded={open}
            aria-label={`Toggle ${item.label} submenu`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {open && (
          <div className="ml-3 pl-3 border-l border-current/30 flex flex-col gap-2 text-[11px] tracking-[0.12em]">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.label}
                href={subItem.href}
                onClick={onNavigate}
                className="hover:opacity-75 transition-opacity"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── Desktop: label is a link, hover reveals dropdown ── */
  return (
    <div className="relative group">
      {/* Clicking the label navigates to the parent page */}
      {item.href ? (
        <Link
          href={item.href}
          className="uppercase hover:opacity-75 transition-opacity whitespace-nowrap"
        >
          {item.label}
        </Link>
      ) : (
        <span className="uppercase whitespace-nowrap cursor-default">{item.label}</span>
      )}

      {/* Dropdown: appears on group hover */}
      <div className="absolute left-0 top-full pt-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
        <div className="min-w-60 bg-[#faf6ef] text-[#1e1a14] border border-[#e8d8c0] p-4 space-y-3 shadow-lg">
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.label}
              href={subItem.href}
              className="block text-[11px] tracking-[0.12em] uppercase text-[#4a3a28] hover:text-[#c8923a] transition-colors duration-200"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
