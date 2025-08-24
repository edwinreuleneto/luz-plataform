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

export const uploadContractFile = async (
  clientId: string,
  file: File,
): Promise<string> => {
  const folder = `${clientId}/contratos`;
  const key = `${folder}/${file.name}`;
  const extension = file.name.split(".").pop() ?? "";

  const presignRes = await fetch(buildUrl("/api/v1/s3/presign"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, contentType: file.type }),
    credentials: "include",
  });

  if (!presignRes.ok) {
    throw new Error("Failed to generate presigned URL");
  }

  const { url } = await presignRes.json();
  const rawUrl = (url as string).split("?")[0];
  const baseUrl = rawUrl.replace(`/${key}`, "");

  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file");
  }

  const eTag = uploadRes.headers.get("ETag")?.replace(/"/g, "");

  const completeRes = await fetch(buildUrl("/api/v1/s3/complete-upload"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: file.name,
      extension,
      baseUrl,
      folder,
      file: key,
      url: rawUrl,
      size: file.size,
      contentType: file.type,
      eTag,
    }),
    credentials: "include",
  });

  if (!completeRes.ok) {
    throw new Error("Failed to complete upload");
  }

  const { id } = await completeRes.json();
  return id as string;
};

export const updateContractFile = async (
  id: string,
  fileId: string,
): Promise<void> => {
  const res = await fetch(buildUrl(`/api/v1/contracts/${id}/file`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to update contract file");
  }
};
