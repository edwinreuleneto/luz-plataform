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

export interface S3UploadResponse {
  key: string;
  url: string;
  eTag: string;
}

export interface CreateContractDto {
  title: string;
  organizationId: string;
  clientId?: string;
  file: S3UploadResponse & {
    name: string;
    extension: string;
  };
}

export interface LinkContractDto {
  name: string;
  fileId: string;
  clientId: string;
}

export interface ContractQueryDto {
  clientId?: string;
}
