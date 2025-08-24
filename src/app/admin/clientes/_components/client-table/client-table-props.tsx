// Services
import { type ClientListResponse } from "@/app/services/clients";

// DTOs
export interface ClientTableProps {
  state: ClientListResponse;
  loadPage: (page: number) => void;
  loading: boolean;
}
