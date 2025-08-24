// Components
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Services
import { type Contract } from "@/services/contracts/contracts.props";

// DTOs
interface ClientContractsProps {
  contracts: Contract[];
}

const ClientContracts = ({ contracts }: ClientContractsProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id} className="odd:bg-muted/50">
                <TableCell>{contract.title}</TableCell>
              </TableRow>
            ))}
            {contracts.length === 0 ? (
              <TableRow>
                <TableCell>Nenhum contrato vinculado</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientContracts;

