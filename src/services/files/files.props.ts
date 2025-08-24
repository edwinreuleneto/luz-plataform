// DTOs
export interface FileUploadResponse {
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
