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
import ClientProfileSkeleton from "./_components/client-profile/skeleton";
import ClientContracts from "./_components/client-contracts";
import ClientProcesses from "./_components/client-processes";
import ClientDocuments from "./_components/client-documents";

const ClienteViewPage = () => {
  const params = useParams<{ id: string }>();
  const clientId = params.id;

  const { data: client, isLoading: clientLoading } = useClient(clientId);
  const { data: contracts = [] } = useListContracts({ clientId });

  return (
    <div className="space-y-4">
      <PageHeader
        title={client?.fullName ?? client?.companyName ?? "Cliente"}
        description="Detalhes do cliente"
      >
        {client ? (
          <Button asChild variant="outline">
            <Link href={`/admin/clientes/${clientId}/editar`}>Editar</Link>
          </Button>
        ) : null}
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
          {clientLoading || !client ? (
            <ClientProfileSkeleton />
          ) : (
            <ClientProfile client={client} />
          )}
        </TabsContent>
        <TabsContent value="contracts">
          {client ? (
            <ClientContracts
              contracts={contracts}
              clientId={clientId}
              organizationId={client.organizationId}
            />
          ) : null}
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
