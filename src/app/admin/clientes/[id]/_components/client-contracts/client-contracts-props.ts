// Services
import { type Contract } from "@/services/contracts/contracts.props";

// DTOs
export interface ClientContractsProps {
  contracts: Contract[];
  clientId: string;
  organizationId: string;
}

