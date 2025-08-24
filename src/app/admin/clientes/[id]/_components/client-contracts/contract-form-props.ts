// External libs
import { z } from "zod";

// DTOs
export const contractFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  fileId: z.string().min(1, "Arquivo é obrigatório"),
});

export type ContractFormSchema = z.infer<typeof contractFormSchema>;

export interface ContractFormProps {
  onSubmit: (values: ContractFormSchema) => Promise<void>;
  loading?: boolean;
}
