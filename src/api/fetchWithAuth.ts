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
  
  const data = await response.json();
  
  // Correspond aux format créés par orval
  return {
    status: response.status,
    data,
    headers: response.headers,
  } as T;
};