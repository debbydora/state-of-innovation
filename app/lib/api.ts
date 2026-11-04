/**
 * Requests go to our own origin and are proxied to the real API by a rewrite
 * in next.config.ts, so the backend URL is never exposed to the browser,
 * there's no CORS, and the CSP can lock connect-src to 'self'.
 */
export const API_BASE_URL = "/api/proxy";

export const REPORT_REQUEST_PATH = "/reports/request";

export type ReportRequest = {
  fullName: string;
  role: string;
  organisation: string;
  email: string;
};

export type ReportResponse = {
  requestId: string;
  message: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function post<T>(path: string, body: unknown, signal?: AbortSignal) {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      credentials: "omit",
      cache: "no-store",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal,
    });
  } catch {
    throw new ApiError(
      "Network error. Please check your connection and try again.",
    );
  }

  const text = await res.text();
  let data: unknown = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {}

  if (!res.ok) {
    const msg =
      (data &&
        typeof data === "object" &&
        ((data as Record<string, unknown>).message ??
          (data as Record<string, unknown>).title)) ||
      (typeof data === "string" && data) ||
      "Something went wrong. Please try again.";
    throw new ApiError(String(msg), res.status);
  }
  return data as T;
}

export const requestReport = (payload: ReportRequest, signal?: AbortSignal) =>
  post<ReportResponse>(REPORT_REQUEST_PATH, payload, signal);
