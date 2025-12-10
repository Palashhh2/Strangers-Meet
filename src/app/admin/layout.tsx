import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ backgroundImage: "url('/bg-admin.svg')" }} className="min-h-screen bg-slate-50 bg-no-repeat bg-fixed bg-cover p-6 max-w-5xl mx-auto">
      <div>{children}</div>
    </main>
  );
}
