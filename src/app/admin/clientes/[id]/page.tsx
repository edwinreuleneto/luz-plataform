"use client";

// External libs
import { useParams } from "next/navigation";
import Link from "next/link";

// Services
import { useClient } from "@/services/clients";
import { useListContracts } from "@/services/contracts";

// Components
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientProfile from "./_components/client-profile";
import ClientContracts from "./_components/client-contracts";
import ClientProcesses from "./_components/client-processes";
import ClientDocuments from "./_components/client-documents";

const ClienteViewPage = () => {
  const params = useParams<{ id: string }>();
  const clientId = params.id;

  const { data: client } = useClient(clientId);
  const { data: contracts = [] } = useListContracts({ clientId });

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
      <Tabs defaultValue="profile" className="w-full space-y-4">
        <TabsList className="w-full">
          <TabsTrigger className="px-4 !shadow-none" value="profile">
            Perfil do cliente
          </TabsTrigger>
          <TabsTrigger className="px-4 !shadow-none" value="contracts">
            Contratos
          </TabsTrigger>
          <TabsTrigger className="px-4 !shadow-none" value="processes">
            Processos
          </TabsTrigger>
          <TabsTrigger className="px-4 !shadow-none" value="documents">
            Documentos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ClientProfile client={client} />
        </TabsContent>
        <TabsContent value="contracts">
          <ClientContracts contracts={contracts} />
        </TabsContent>
        <TabsContent value="processes">
          <ClientProcesses />
        </TabsContent>
        <TabsContent value="documents">
          <ClientDocuments />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClienteViewPage;
