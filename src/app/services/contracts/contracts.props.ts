// DTOs
export interface Contract {
  id: string;
  title: string;
  clientId?: string;
}

export interface ContractQueryDto {
  clientId?: string;
}
