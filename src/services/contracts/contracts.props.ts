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
  fileId: string;
  clientId: string;
  file?: ContractFile;
}

export interface ContractQueryDto {
  clientId?: string;
}

export interface CreateContractDto {
  title: string;
  fileId: string;
  clientId: string;
}
