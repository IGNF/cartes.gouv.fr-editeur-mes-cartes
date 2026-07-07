import { apiURL } from "@/env";

type QueryPrimitive = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryPrimitive | QueryPrimitive[]>;

export class ApiError extends Error {
    public readonly status: number;
    public readonly payload: unknown;

    constructor(status: number, message: string, payload: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.payload = payload;
    }
}

type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    query?: QueryParams;
    headers?: HeadersInit;
    body?: BodyInit | null;
    signal?: AbortSignal;
};

const trimTrailingSlashes = (value: string): string => value.replace(/\/+$/, "");

const getBaseUrl = (): string => {
    const raw = apiURL.trim();
    return trimTrailingSlashes(raw);
};

const buildSearchParams = (query?: QueryParams): URLSearchParams => {
    const searchParams = new URLSearchParams();

    if (!query) {
        return searchParams;
    }

    for (const [key, rawValue] of Object.entries(query)) {
        const values = Array.isArray(rawValue) ? rawValue : [rawValue];

        for (const value of values) {
            if (value === undefined || value === null) {
                continue;
            }
            searchParams.append(key, String(value));
        }
    }

    return searchParams;
};

const buildUrl = (path: string, query?: QueryParams): string => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) {
        throw new Error("Missing API base URL. Set data-api-url on root or API_EDITEUR_URL/VITE_API_EDITEUR_URL.");
    }

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(`${baseUrl}${normalizedPath}`);
    const searchParams = buildSearchParams(query);
    url.search = searchParams.toString();

    return url.toString();
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
    if (response.status === 204) {
        return undefined;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
        return response.json();
    }

    return response.text();
};

export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
    const { method = "GET", query, headers, body, signal } = options;

    const response = await fetch(buildUrl(path, query), {
        method,
        headers: {
            Accept: "application/json",
            ...headers,
        },
        body,
        signal,
    });

    const payload = await parseResponseBody(response);

    if (!response.ok) {
        const defaultMessage = `API request failed (${response.status})`;
        const message = typeof payload === "object" && payload && "message" in payload
            ? String((payload as { message?: unknown }).message ?? defaultMessage)
            : defaultMessage;

        throw new ApiError(response.status, message, payload);
    }

    return payload as T;
};

export const get = <T>(path: string, options: Omit<RequestOptions, "method" | "body"> = {}): Promise<T> =>
    request<T>(path, { ...options, method: "GET" });

const client = {
    request,
    get,
};

export default client;
