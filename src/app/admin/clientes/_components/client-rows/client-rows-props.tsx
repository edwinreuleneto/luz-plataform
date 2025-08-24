// Services
import { type Client } from "@/app/services/clients";

// DTOs
export interface ClientRowsProps {
  clients: Client[];
  loading: boolean;
}
