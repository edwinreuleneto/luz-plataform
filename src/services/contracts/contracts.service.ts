// Services
import {
  type Contract,
  type ContractQueryDto,
  type CreateContractDto,
} from "./contracts.props";

const API_BASE_URL = process.env.API_BASE_URL ?? "";
const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export const listContracts = async (
  { clientId }: ContractQueryDto,
): Promise<Contract[]> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : undefined;

  const res = await fetch(
    buildUrl(`/api/v1/users/${clientId}/documents`),
    {
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

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
