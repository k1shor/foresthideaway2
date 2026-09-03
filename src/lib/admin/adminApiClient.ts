const TOKEN_KEY = "admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new Error("Unauthorized");
  }

  const json = (await res.json()) as ApiEnvelope<T>;
  if (!res.ok || !json.success) {
    throw new Error(json.message || `Request to ${path} failed with ${res.status}`);
  }
  return json.data;
}

export const adminApiClient = {
  list: <T>(resource: string) => request<T[]>(`/api/admin/${resource}`),
  get: <T>(resource: string, id: string) => request<T>(`/api/admin/${resource}/${id}`),
  create: <T>(resource: string, body: unknown) =>
    request<T>(`/api/admin/${resource}`, { method: "POST", body: JSON.stringify(body) }),
  update: <T>(resource: string, id: string, body: unknown) =>
    request<T>(`/api/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (resource: string, id: string) =>
    request<Record<string, never>>(`/api/admin/${resource}/${id}`, { method: "DELETE" }),
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const token = getToken();
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/admin/uploads", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (res.status === 401) {
      clearToken();
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
      throw new Error("Unauthorized");
    }
    const json = (await res.json()) as ApiEnvelope<{ url: string }>;
    if (!res.ok || !json.success) {
      throw new Error(json.message || "Upload failed");
    }
    return json.data;
  },
};

export async function loginRequest(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = (await res.json()) as ApiEnvelope<{
    token: string;
    user: { id: string; name: string; email: string; role: string };
  }>;
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Login failed");
  }
  return json.data;
}

export async function meRequest() {
  return request<{ id: string; name: string; email: string; role: string }>("/api/auth/me");
}
