// Services
import { type Client } from "@/services/clients";

// DTOs
export interface ClientRowsProps {
  clients: Client[];
  loading: boolean;
}
