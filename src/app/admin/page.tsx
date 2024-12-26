import { redirect } from "next/navigation";
import { env } from "@/env";
import AdminPanel from "@/components/admin/AdminPannel";

export default function AdminPage() {
  // Server-side check to ensure this page is only accessible in development
  if (env.NODE_ENV !== "development") {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Photo Admin Panel</h1>
      <AdminPanel />
    </div>
  );
}
