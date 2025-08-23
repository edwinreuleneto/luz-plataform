// Services
import {
  type Client,
  type CreateClientDto,
  type ClientQueryDto,
  type UpdateClientDto,
} from "./clients.props";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export const listClients = async (
  query: ClientQueryDto = {}
): Promise<Client[]> => {
  const url = new URL(buildUrl("/api/v1/clients"));
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to list clients");
  }

  return res.json();
};

export const getClient = async (id: string): Promise<Client> => {
  const res = await fetch(buildUrl(`/api/v1/clients/${id}`), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch client");
  }

  return res.json();
};

export const createClient = async (
  data: CreateClientDto
): Promise<Client> => {
  const res = await fetch(buildUrl("/api/v1/clients"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create client");
  }

  return res.json();
};

export const updateClient = async (
  id: string,
  data: UpdateClientDto
): Promise<Client> => {
  const res = await fetch(buildUrl(`/api/v1/clients/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update client");
  }

  return res.json();
};
