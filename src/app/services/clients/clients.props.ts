// DTOs
export interface Client {
  id: string;
  organizationId: string;
  personType: "PF" | "PJ";
  fullName?: string;
  companyName?: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  phone?: string;
  website?: string;
  notes?: string;
  logoFileId?: string;
  docMainFileId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClientDto {
  organizationId: string;
  personType: "PF" | "PJ";
  fullName?: string;
  companyName?: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  phone?: string;
  website?: string;
  notes?: string;
  logoFileId?: string;
  docMainFileId?: string;
}

export type UpdateClientDto = Partial<CreateClientDto>;

export interface ClientQueryDto {
  page?: number;
  pageSize?: number;
  search?: string;
  personType?: "PF" | "PJ";
}
