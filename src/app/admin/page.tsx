import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundImage: "url('/admin-bg-pattern.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin">Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-foreground mb-8 text-4xl font-bold">
          Admin Dashboard
        </h1>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Photos Widget */}
          <div className="bg-background/90 hover:shadow-3xl border-muted rounded-xl border p-6 shadow-2xl backdrop-blur-md transition-shadow duration-300">
            <h2 className="text-foreground mb-4 text-2xl font-semibold">
              Photo Management
            </h2>
            <p className="text-muted-foreground mb-6">
              Manage and organize your photo library.
            </p>
            <Link
              href="/admin/photos"
              className="bg-blue-600 text-background hover:bg-blue-700 inline-block rounded-lg px-6 py-2 transition-colors duration-300"
            >
              Go to Photos
            </Link>
          </div>

          {/* Placeholder Widget for "N Views" */}
          <div className="bg-background/90 hover:shadow-3xl border-muted rounded-xl border p-6 shadow-2xl backdrop-blur-md transition-shadow duration-300">
            <h2 className="text-foreground mb-4 text-2xl font-semibold">
              N Views
            </h2>
            <p className="text-muted-foreground mb-6">
              Track and analyze views for your content.
            </p>
            <button
              disabled
              className="bg-muted text-muted-foreground inline-block cursor-not-allowed rounded-lg px-6 py-2"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
