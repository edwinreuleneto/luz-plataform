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
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClientDto {
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
}

export type UpdateClientDto = Partial<CreateClientDto>;

export interface ClientQueryDto {
  page?: number;
  pageSize?: number;
  search?: string;
  personType?: "PF" | "PJ";
}

export interface ClientListResponse {
  data: Client[];
  total: number;
  page: number;
  pageSize: number;
}
