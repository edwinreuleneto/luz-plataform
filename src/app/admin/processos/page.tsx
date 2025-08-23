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
  title: "Processos",
};

const pfProcessos = ["Processo 001", "Processo 002", "Processo 003"];
const pjProcessos = ["Processo A", "Processo B", "Processo C"];

const ProcessosPage = () => {
  return (
    <div>
      <PageHeader title="Processos" description="Listagem de processos" />
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
              {pfProcessos.map((name) => (
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
              {pjProcessos.map((name) => (
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

export default ProcessosPage;

