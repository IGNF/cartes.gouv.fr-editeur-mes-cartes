import { getAuthHeader } from "@/oidc";

export const fetchWithAuth = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const header = await getAuthHeader();
  const response = await fetch(url, {
    ...options,
    
    headers: {
      ...options?.headers,
      ...(header ? header : {}),
    },
  });
  return response.json();
};