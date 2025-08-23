"use client";

// External libs
import { useEffect, useState } from "react";
import Link from "next/link";

// Services
import { listClients, type Client } from "@/app/services/clients";

// Components
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const ClientesPage = () => {
  const [pfClients, setPfClients] = useState<Client[]>([]);
  const [pjClients, setPjClients] = useState<Client[]>([]);

  useEffect(() => {
    listClients({ personType: "PF" })
      .then(setPfClients)
      .catch(console.error);
    listClients({ personType: "PJ" })
      .then(setPjClients)
      .catch(console.error);
  }, []);

  const renderRows = (clients: Client[]) => (
    <TableBody>
      {clients.map((client) => (
        <TableRow
          key={client.id}
          className="odd:bg-muted/50 hover:bg-muted transition-colors"
        >
          <TableCell>{client.fullName ?? client.companyName}</TableCell>
          <TableCell className="text-muted-foreground">
            {client.email ?? "-"}
          </TableCell>
          <TableCell className="text-right">
            <Button asChild variant="link" className="px-0">
              <Link href={`/admin/clientes/${client.id}`}>Visualizar</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  const renderTable = (clients: Client[]) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          {renderRows(clients)}
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Clientes" description="Listagem de clientes">
        <Button asChild>
          <Link href="/admin/clientes/novo">Novo</Link>
        </Button>
      </PageHeader>
      <Tabs defaultValue="pf" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pf">Pessoa Física</TabsTrigger>
          <TabsTrigger value="pj">Pessoa Jurídica</TabsTrigger>
        </TabsList>
        <TabsContent value="pf">{renderTable(pfClients)}</TabsContent>
        <TabsContent value="pj">{renderTable(pjClients)}</TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientesPage;
