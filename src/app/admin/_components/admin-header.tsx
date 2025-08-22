"use client";

// External libs
import Link from "next/link";
import { useRouter } from "next/navigation";

// Services
import { useAuth } from "@/app/services/auth";

// Utils/Helpers
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const AdminHeader = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <Link href="/admin" className="font-bold">
          Admin
        </Link>
      </div>
      <Button variant="outline" onClick={handleLogout}>
        Sair
      </Button>
    </header>
  );
};

export default AdminHeader;

