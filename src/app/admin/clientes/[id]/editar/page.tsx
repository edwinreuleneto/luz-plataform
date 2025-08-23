"use client";

// External libs
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Services
import { getClient, updateClient, type Client } from "@/app/services/clients";

// Components
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

// Local
import ClientForm from "../_components/client-form";

const EditarClientePage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const clientId = params.id;
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!clientId) return;
    getClient(clientId)
      .then(setClient)
      .catch(console.error);
  }, [clientId]);

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
                await updateClient(clientId, values);
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
