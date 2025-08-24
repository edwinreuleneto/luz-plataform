// Services
import {
  type Contract,
  type ContractQueryDto,
  type CreateContractDto,
} from "./contracts.props";

const API_BASE_URL = process.env.API_BASE_URL ?? "";
const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export const listContracts = async (
  query: ContractQueryDto = {}
): Promise<Contract[]> => {
  const url = new URL(buildUrl("/api/v1/contracts"));
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to list contracts");
  }

  return res.json();
};

export const createContract = async (
  data: CreateContractDto,
): Promise<Contract> => {
  const res = await fetch(buildUrl("/api/v1/contracts"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to create contract");
  }

  return res.json();
};
