// DTOs
export interface ContractFile {
  id: string;
  name: string;
  extension: string;
  baseUrl: string;
  folder: string;
  file: string;
  url: string;
  size: number;
  contentType: string;
  eTag: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  id: string;
  label?: string;
  documentType?: string;
  file: ContractFile;
}

export interface ContractQueryDto {
  clientId: string;
}

export interface CreateContractDto {
  title: string;
  fileId: string;
  clientId: string;
}
