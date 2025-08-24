// DTOs
export interface Attachment {
  id: string;
  fileName: string;
  size: string;
  url: string;
}

export interface User {
  id: string;
  fullName: string;
  role: string;
  email: string;
  salaryExpectation?: string;
  about?: string;
  attachments?: Attachment[];
}
