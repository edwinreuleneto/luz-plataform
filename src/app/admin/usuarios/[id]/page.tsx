"use client";

// External libs
import { useParams } from "next/navigation";
import Link from "next/link";

// Services
import { useUser } from "@/services/users";

// Components
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import UserProfile from "./_components/user-profile";

const UsuarioViewPage = () => {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const { data: user } = useUser(userId);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-4">
      <PageHeader title={user.fullName} description="Detalhes do usuário">
        <Button asChild variant="outline">
          <Link href={`/admin/usuarios/${userId}/editar`}>Editar</Link>
        </Button>
      </PageHeader>
      <UserProfile user={user} />
    </div>
  );
};

export default UsuarioViewPage;
