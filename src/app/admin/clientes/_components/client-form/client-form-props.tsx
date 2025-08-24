// External libs
import { z } from "zod";

// DTOs
export const clientFormSchema = z
  .object({
    personType: z.enum(["PF", "PJ"]),
    fullName: z.string().optional(),
    companyName: z.string().optional(),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    notes: z.string().optional(),
    logoFileId: z.string().uuid().optional(),
  })
  .refine(
    (data) =>
      (data.personType === "PF" && data.fullName) ||
      (data.personType === "PJ" && data.companyName),
    {
      message: "Nome é obrigatório",
      path: ["fullName"],
    },
  );

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

export interface ClientFormProps {
  initialData?: Partial<ClientFormSchema>;
  onSubmit: (values: ClientFormSchema) => Promise<void>;
  submitLabel?: string;
}
