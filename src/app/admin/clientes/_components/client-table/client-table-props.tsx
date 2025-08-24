// Services
import { type ClientListResponse } from "@/services/clients";

// DTOs
export interface ClientTableProps {
  state: ClientListResponse;
  loadPage: (page: number) => void;
  loading: boolean;
}
