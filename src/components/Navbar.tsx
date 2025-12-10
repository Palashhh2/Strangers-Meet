"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname() || "/";

  const isAdmin = pathname.startsWith("/admin");
  const showHome = pathname !== "/";

  return (
    <header className="w-full px-6 py-4 border-b border-slate-200">
      <div className="flex items-center justify-between">
        {/* Logo - Left Extreme */}
        <Link href="/" className="text-lg font-bold text-brand-600 flex-shrink-0" style={{ color: '#4f46e5' }}>
          Strangers Meet
        </Link>

        {/* Nav - Center (always show a simple Admin entry when not on admin pages) */}
        <div className="flex items-center gap-6 flex-grow justify-center">
          <nav className="flex gap-6 items-center text-sm font-medium">
            {!isAdmin && (
              <Link href="/admin" className="px-2 py-1 rounded-md text-slate-700 hover:text-brand-600 transition">
                Admin
              </Link>
            )}

            {isAdmin ? (
              <>
                <Link href="/admin" className="px-2 py-1 rounded-md text-slate-700 hover:text-brand-600 transition">
                  Dashboard
                </Link>
                <Link href="/admin/applicants" className="px-2 py-1 rounded-md text-slate-700 hover:text-brand-600 transition">
                  Applicants
                </Link>
                <Link href="/admin/groups" className="px-2 py-1 rounded-md text-slate-700 hover:text-brand-600 transition">
                  Groups
                </Link>
              </>
            ) : (
              <>
                <Link href="/apply" className="px-2 py-1 rounded-md text-slate-700 hover:text-brand-600 transition">
                  Apply
                </Link>
                <Link href="/matches" className="px-2 py-1 rounded-md text-slate-700 hover:text-brand-600 transition">
                  Matches
                </Link>
                <Link href="/groups" className="px-2 py-1 rounded-md text-slate-700 hover:text-brand-600 transition">
                  Groups
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Home Button - Right Extreme */}
        {showHome && (
          <Button asChild variant="default" size="sm" className="flex-shrink-0" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', color: '#fff' }}>
            <Link href="/" aria-label="Return home" className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-white" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" />
              </svg>
              <span className="ml-2 hidden sm:inline">Home</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
