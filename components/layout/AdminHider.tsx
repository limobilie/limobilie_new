"use client";

import { usePathname } from "next/navigation";

export default function AdminHider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Ne pas rendre les enfants (ex: Navbar, Footer) si on est sur la route /admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
