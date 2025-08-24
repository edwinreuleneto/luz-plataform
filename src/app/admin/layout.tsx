"use client";

// External libs
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

// Services
import { useAuth } from "@/services/auth";

// Components
import AdminHeader from "./_components/admin-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
