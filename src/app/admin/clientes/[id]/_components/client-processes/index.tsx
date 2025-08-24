// Components
import { Card, CardContent } from "@/components/ui/card";

// DTOs
import type { ClientProcessesProps } from "./client-processes-props";

const ClientProcesses = ({}: ClientProcessesProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <p>Nenhum processo vinculado</p>
      </CardContent>
    </Card>
  );
};

export default ClientProcesses;

