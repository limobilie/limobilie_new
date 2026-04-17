import { ReactNode } from "react";

export const metadata = {
  title: "Administration | Limobilié",
  description: "Espace d'administration",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full bg-slate-50 fixed inset-0 z-[1000]">
      {children}
    </div>
  );
}
