"use client";

// External libs
import { useEffect, useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Local
import ClientForm from "./_components/client-form";

const ClientesPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pfData, setPfData] = useState<ClientListResponse>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
  });
  const [pjData, setPjData] = useState<ClientListResponse>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
  });

  const loadPfClients = async (page = 1) => {
    try {
      const res = await listClients({ personType: "PF", page });
      setPfData(res);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPjClients = async (page = 1) => {
    try {
      const res = await listClients({ personType: "PJ", page });
      setPjData(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPfClients();
    loadPjClients();
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
      {clients.length === 0 ? (
        <TableRow>
          <TableCell colSpan={3} className="text-center text-muted-foreground">
            Nenhum cliente encontrado
          </TableCell>
        </TableRow>
      ) : null}
    </TableBody>
  );

  const renderTable = (
    state: ClientListResponse,
    loadPage: (page: number) => void
  ) => {
    const totalPages = Math.ceil(state.total / state.pageSize);
    return (
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
            {renderRows(state.data)}
          </Table>
        </CardContent>
        {totalPages > 1 && (
          <div className="p-4">
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
                    onClick={() => loadPage(Math.min(totalPages, state.page + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-4">
        <PageHeader title="Clientes" description="Listagem de clientes">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button>Novo</Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full flex-col sm:max-w-xl p-0"
            >
              <SheetHeader className="px-6 py-4">
                <SheetTitle>Novo Cliente</SheetTitle>
                <SheetDescription>Cadastro de cliente</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                <ClientForm
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
        <Tabs defaultValue="pf" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pf">Pessoa Física</TabsTrigger>
            <TabsTrigger value="pj">Pessoa Jurídica</TabsTrigger>
          </TabsList>
          <TabsContent value="pf">{renderTable(pfData, loadPfClients)}</TabsContent>
          <TabsContent value="pj">{renderTable(pjData, loadPjClients)}</TabsContent>
        </Tabs>
      </div>
    );
  };

export default ClientesPage;
