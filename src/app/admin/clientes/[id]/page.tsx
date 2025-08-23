"use client";

// External libs
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Services
import { getClient, type Client } from "@/app/services/clients";
import { listContracts, type Contract } from "@/app/services/contracts";

// Components
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClienteViewPage = () => {
  const params = useParams<{ id: string }>();
  const clientId = params.id;

  const [client, setClient] = useState<Client | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    if (!clientId) return;
    getClient(clientId)
      .then(setClient)
      .catch(console.error);
    listContracts({ clientId })
      .then(setContracts)
      .catch(console.error);
  }, [clientId]);

  if (!client) {
    return null;
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title={client.fullName ?? client.companyName ?? "Cliente"}
        description="Detalhes do cliente"
      >
        <Button asChild variant="outline">
          <Link href={`/admin/clientes/${clientId}/editar`}>Editar</Link>
        </Button>
      </PageHeader>
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardContent className="space-y-2 p-4">
              <p>
                <strong>Email:</strong> {client.email ?? "-"}
              </p>
              <p>
                <strong>Telefone:</strong> {client.phone ?? "-"}
              </p>
              <p>
                <strong>Website:</strong> {client.website ?? "-"}
              </p>
              <p>
                <strong>Notas:</strong> {client.notes ?? "-"}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contracts">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id} className="odd:bg-muted/50">
                      <TableCell>{contract.title}</TableCell>
                    </TableRow>
                  ))}
                  {contracts.length === 0 ? (
                    <TableRow>
                      <TableCell>Nenhum contrato vinculado</TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClienteViewPage;
