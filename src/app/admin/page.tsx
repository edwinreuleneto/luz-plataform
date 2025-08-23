// NextJS core
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

// Components
import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader title="Dashboard" description="Visão geral" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Processos</CardTitle>
            <CardDescription>Em andamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Novidades</CardTitle>
            <CardDescription>Atualizações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;

