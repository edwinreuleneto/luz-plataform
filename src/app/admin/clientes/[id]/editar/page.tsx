"use client";

// External libs
import { useParams, useRouter } from "next/navigation";

// Services
import { useClient, useUpdateClient } from "@/services/clients";

// Components
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

// Local
import ClientForm from "../_components/client-form";

const EditarClientePage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const clientId = params.id;
  const { data: client } = useClient(clientId);
  const updateClientMutation = useUpdateClient(clientId);

  if (!client) {
    return null;
  }
  const name = client.fullName ?? client.companyName ?? "Cliente";
  const { organizationId, ...formData } = client;
  void organizationId;

  return (
    <div className="space-y-4">
      <PageHeader title={name} description="Editar cliente" />
      <Card>
        <CardContent className="pt-6">
          <ClientForm
            initialData={formData}
            onSubmit={async (values) => {
              await updateClientMutation.mutateAsync(values);
              router.push(`/admin/clientes/${clientId}`);
            }}
            submitLabel="Salvar"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditarClientePage;
