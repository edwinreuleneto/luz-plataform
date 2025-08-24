// Components
import { Card, CardContent } from "@/components/ui/card";

// DTOs
import type { ClientDocumentsProps } from "./client-documents-props";

const ClientDocuments = ({}: ClientDocumentsProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <p>Nenhum documento vinculado</p>
      </CardContent>
    </Card>
  );
};

export default ClientDocuments;

