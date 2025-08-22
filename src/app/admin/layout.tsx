"use client";

// External libs
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Domain Entities/DTOs/Interfaces
import type { ReactNode } from 'react';
import { useAuth } from '@/app/services/auth';

// Utils/Helpers
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b p-4">
        <Link href="/admin" className="font-bold">
          Admin
        </Link>
        <Button variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}

