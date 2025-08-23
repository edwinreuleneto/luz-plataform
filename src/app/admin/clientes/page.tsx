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
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Clientes",
};

const pfClients = ["João Silva", "Maria Souza", "Carlos Pereira"];
const pjClients = ["Empresa Alpha", "Corp Beta", "Tech Gamma"];

const ClientesPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader title="Clientes" description="Listagem de clientes" />
      <Tabs defaultValue="pf" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pf">Pessoa Física</TabsTrigger>
          <TabsTrigger value="pj">Pessoa Jurídica</TabsTrigger>
        </TabsList>
        <TabsContent value="pf">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pfClients.map((name) => (
                    <TableRow
                      key={name}
                      className="odd:bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <TableCell>{name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pj">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pjClients.map((name) => (
                    <TableRow
                      key={name}
                      className="odd:bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <TableCell>{name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientesPage;

