// Components
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ClientRows from "../client-rows";

// DTOs
import { type ClientTableProps } from "./client-table-props";

const ClientTable = ({ state, loadPage, loading }: ClientTableProps) => {
  const totalPages = Math.ceil(state.total / state.pageSize);
  return (
    <div className="space-y-4">
      <Table className="overflow-hidden rounded-lg">
        <TableHeader>
          <TableRow className="bg-muted/100 min-h-28">
            <TableHead className="py-4">Nome</TableHead>
            <TableHead className="py-4">Tipo</TableHead>
            <TableHead className="py-4">Documento</TableHead>
            <TableHead className="py-4">Email</TableHead>
            <TableHead className="py-4">Telefone</TableHead>
            <TableHead className="py-4"></TableHead>
          </TableRow>
        </TableHeader>
        <ClientRows clients={state.data} loading={loading} />
      </Table>
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
                  onClick={() => loadPage(Math.min(totalPages, state.page + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ClientTable;
