"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginRequest, setToken, getToken } from "@/lib/admin/adminApiClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/admin");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { token } = await loginRequest(email, password);
      setToken(token);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white border border-[#e8d8c0] rounded-lg shadow-sm p-8 space-y-5"
    >
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#c8923a] mb-2">
          Forest Hideaway
        </p>
        <h1 className="font-serif text-2xl text-[#1e1a14]">Admin Login</h1>
      </div>

      <div className="space-y-1">
        <label
          className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[#e8d8c0] rounded-md px-3 py-2 text-sm text-[#4a3a28] focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label
          className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#e8d8c0] rounded-md px-3 py-2 text-sm text-[#4a3a28] focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors"
        />
      </div>

      {error && <p className="text-sm text-[#a8503f]">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#c8923a] text-white rounded-md px-3 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#b5822f] transition-colors disabled:opacity-50"
      >
        {submitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
