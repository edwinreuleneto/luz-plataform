"use client";

// External libs
import { useState } from "react";
import { useRouter } from "next/navigation";

// Services
import {
  useListClients,
  useCreateClient,
  type ClientListResponse,
} from "@/services/clients";

// Components
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Local
import ClientForm from "./_components/client-form";
import ClientTable from "./_components/client-table";

const ClientesPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"PF" | "PJ" | undefined>();
  const [newPersonType, setNewPersonType] = useState<"PF" | "PJ">("PF");

  const { data = {
    data: [],
    total: 0,
    page,
    pageSize: 20,
  }, isFetching: loading } = useListClients({
    page,
    search: search || undefined,
    personType: filterType,
  });

  const createClientMutation = useCreateClient();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Clientes"
        description="Listagem de clientes cadastrados"
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex gap-2">
            <SheetTrigger asChild>
              <Button
                size="lg"
                variant="default"
                onClick={() => setNewPersonType("PF")}
              >
                Adicionar cliente PF
              </Button>
            </SheetTrigger>
            <SheetTrigger asChild>
              <Button
                size="lg"
                variant="default"
                onClick={() => setNewPersonType("PJ")}
              >
                Adicionar cliente PJ
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent
            side="right"
            className="flex w-full flex-col p-0 sm:max-w-lg"
          >
            <SheetHeader className="px-6 py-4">
              <SheetTitle>
                {newPersonType === "PF"
                  ? "Adicionar cliente PF"
                  : "Adicionar cliente PJ"}
              </SheetTitle>
              <SheetDescription>Cadastro de cliente</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <ClientForm
                initialData={{ personType: newPersonType }}
                onSubmit={async (values) => {
                  const client = await createClientMutation.mutateAsync(values);
                  setOpen(false);
                  router.push(`/admin/clientes/${client.id}`);
                }}
                submitLabel="Salvar"
              />
            </div>
          </SheetContent>
        </Sheet>
      </PageHeader>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            setPage(1);
          }}
          className="w-full sm:w-64"
        />
        <Select
          value={filterType ?? "all"}
          onValueChange={(value) => {
            const type = value === "all" ? undefined : (value as "PF" | "PJ");
            setFilterType(type);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="PF">Pessoa Física</SelectItem>
            <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ClientTable
        state={data as ClientListResponse}
        loadPage={setPage}
        loading={loading}
      />
    </div>
  );
};

export default ClientesPage;
