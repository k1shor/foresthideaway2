const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function apiFetch<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, { next: { revalidate } });
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("NOT_FOUND");
    }
    throw new Error(`Request to ${path} failed with ${res.status}`);
  }
  const json = (await res.json()) as ApiEnvelope<T>;
  return json.data;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as ApiEnvelope<T>;
  if (!res.ok || !json.success) {
    throw new Error(json.message || `Request to ${path} failed with ${res.status}`);
  }
  return json.data;
}
