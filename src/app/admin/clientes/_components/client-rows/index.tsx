// External libs
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

// Utils
import { maskCnpj, maskCpf, maskPhone } from "@/utils/masks";

// DTOs
import { type ClientRowsProps } from "./client-rows-props";

const ClientRows = ({ clients, loading }: ClientRowsProps) => {
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
              <Skeleton className="ml-auto h-4 w-12" />
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
          className="odd:bg-muted/50 transition-colors hover:bg-muted"
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
          <TableCell colSpan={6} className="text-center text-muted-foreground">
            Nenhum cliente encontrado
          </TableCell>
        </TableRow>
      ) : null}
    </TableBody>
  );
};

export default ClientRows;
