// Services
import type { FileUploadResponse } from "./files.props";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const uploadFile = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/v1/files`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  return res.json();
};
