"use client";

// External libs
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Services
import {
  createClient,
  listClients,
  type Client,
  type ClientListResponse,
} from "@/app/services/clients";

// Components
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

// Utils
import { maskCnpj, maskCpf, maskPhone } from "@/utils/masks";

// Local
import ClientForm from "./_components/client-form";

const ClientesPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<ClientListResponse>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] =
    useState<"PF" | "PJ" | undefined>();
  const [newPersonType, setNewPersonType] = useState<"PF" | "PJ">("PF");

  const loadClients = useCallback(
    async (
      page = 1,
      searchParam?: string,
      typeParam?: "PF" | "PJ"
    ) => {
      setLoading(true);
      try {
        const res = await listClients({
          page,
          search: (searchParam ?? search) || undefined,
          personType: typeParam ?? filterType,
        });
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [search, filterType]
  );

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const renderRows = (clients: Client[]) => {
    if (loading) {
      return (
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="odd:bg-muted/50">
              <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[180px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-12 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    }

    return (
      <TableBody>
        {clients.map((client) => (
          <TableRow
            key={client.id}
            className="odd:bg-muted/50 hover:bg-muted transition-colors"
          >
            <TableCell>{client.fullName ?? client.companyName}</TableCell>
            <TableCell className="text-muted-foreground">
              {client.personType}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {client.personType === "PF"
                ? client.cpf
                  ? maskCpf(client.cpf)
                  : "-"
                : client.cnpj
                  ? maskCnpj(client.cnpj)
                  : "-"}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {client.email ?? "-"}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {client.phone ? maskPhone(client.phone) : "-"}
            </TableCell>
            <TableCell className="text-right">
              <Button asChild variant="link" className="px-0">
                <Link href={`/admin/clientes/${client.id}`}>Visualizar</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {clients.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              Nenhum cliente encontrado
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    );
  };

  const renderTable = (
    state: ClientListResponse,
    loadPage: (page: number) => void
  ) => {
    const totalPages = Math.ceil(state.total / state.pageSize);
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              {renderRows(state.data)}
            </Table>
          </CardContent>
        </Card>
        {totalPages > 1 && (
          <div className="px-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => loadPage(Math.max(1, state.page - 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={state.page === i + 1}
                      onClick={() => loadPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      loadPage(Math.min(totalPages, state.page + 1))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Clientes" description="Listagem de clientes">
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex gap-2">
            <SheetTrigger asChild>
              <Button onClick={() => setNewPersonType("PF")}>Novo PF</Button>
            </SheetTrigger>
            <SheetTrigger asChild>
              <Button onClick={() => setNewPersonType("PJ")}>Novo PJ</Button>
            </SheetTrigger>
          </div>
          <SheetContent
            side="right"
            className="flex w-full flex-col p-0 sm:max-w-lg"
          >
            <SheetHeader className="px-6 py-4">
              <SheetTitle>
                {newPersonType === "PF" ? "Novo PF" : "Novo PJ"}
              </SheetTitle>
              <SheetDescription>Cadastro de cliente</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <ClientForm
                initialData={{ personType: newPersonType }}
                onSubmit={async (values) => {
                  const client = await createClient(values);
                  setOpen(false);
                  router.push(`/admin/clientes/${client.id}`);
                }}
                submitLabel="Salvar"
              />
            </div>
          </SheetContent>
        </Sheet>
      </PageHeader>
      <div className="flex flex-wrap items-end gap-2">
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            loadClients(1, value, filterType);
          }}
          className="w-full sm:max-w-xs"
        />
        <Select
          value={filterType ?? "all"}
          onValueChange={(value) => {
            const type = value === "all" ? undefined : (value as "PF" | "PJ");
            setFilterType(type);
            loadClients(1, search, type);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="PF">Pessoa Física</SelectItem>
            <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {renderTable(data, loadClients)}
    </div>
  );
};

export default ClientesPage;
