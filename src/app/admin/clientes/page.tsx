// NextJS core
import type { Metadata } from "next";

// External libs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Clientes",
};

const pfClients = ["João Silva", "Maria Souza", "Carlos Pereira"];
const pjClients = ["Empresa Alpha", "Corp Beta", "Tech Gamma"];

const ClientesPage = () => {
  return (
    <div>
      <PageHeader title="Clientes" description="Listagem de clientes" />
      <Tabs defaultValue="pf">
        <TabsList>
          <TabsTrigger value="pf">Pessoa Física</TabsTrigger>
          <TabsTrigger value="pj">Pessoa Jurídica</TabsTrigger>
        </TabsList>
        <TabsContent value="pf">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pfClients.map((name) => (
                <TableRow key={name} className="odd:bg-muted/50">
                  <TableCell>{name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="pj">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pjClients.map((name) => (
                <TableRow key={name} className="odd:bg-muted/50">
                  <TableCell>{name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientesPage;

