// Services
import { type User } from "./users.props";

const API_BASE_URL = process.env.API_BASE_URL ?? "";

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(buildUrl(`/api/v1/users/${id}`), {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};
