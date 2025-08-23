// NextJS core
import type { Metadata } from "next";

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
  title: "Usuários",
};

const users = [
  { name: "Ana Lima", email: "ana@example.com" },
  { name: "Bruno Rocha", email: "bruno@example.com" },
  { name: "Clara Alves", email: "clara@example.com" },
];

const UsuariosPage = () => {
  return (
    <div>
      <PageHeader title="Usuários" description="Lista de usuários" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email} className="odd:bg-muted/50">
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsuariosPage;

