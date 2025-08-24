// Services
import { type Client } from "@/services/clients/clients.props";

// DTOs
export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface Address {
  id: string;
  street: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface ClientProfileProps {
  client: Client & {
    contacts?: Contact[];
    addresses?: Address[];
  };
}

