// DTOs
export interface ContractFile {
  id: string;
  name: string;
  extension: string;
  url?: string;
}

export interface Contract {
  id: string;
  title: string;
  clientId?: string;
  file?: ContractFile;
}

export interface CreateContractDto {
  title: string;
  organizationId: string;
  clientId?: string;
}

export interface ContractQueryDto {
  clientId?: string;
}
