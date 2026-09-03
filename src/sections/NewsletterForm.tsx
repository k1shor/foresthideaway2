"use client";

import { useState, FormEvent } from "react";
import { apiPost } from "@/lib/api/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email.");
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await apiPost("/api/contact/newsletter", { email: trimmed });
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          Email Address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 px-5 py-3.5 bg-transparent border text-[#f5ede0] placeholder:text-[#7a6852] focus:outline-none transition-colors ${
            error ? "border-red-400" : "border-[#3d4f2c] focus:border-[#c8923a]"
          }`}
        />
        <button
          type="submit"
          disabled={submitting}
          className="group/btn relative overflow-hidden px-7 py-3.5 border border-[#c8923a] text-[#f5ede0] uppercase tracking-[0.18em] text-xs transition-colors duration-500 whitespace-nowrap disabled:opacity-60"
        >
          <span className="absolute inset-0 bg-[#c8923a] [clip-path:circle(0%_at_50%_50%)] group-hover/btn:[clip-path:circle(150%_at_50%_50%)] opacity-0 group-hover/btn:opacity-100 transition-[clip-path,opacity] duration-[900ms] ease-in-out" />
          <span className="relative z-10 group-hover/btn:text-[#1c2316] transition-colors duration-500">
            {submitting ? "Signing Up..." : "Sign Me Up"}
          </span>
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-400 text-left sm:text-center">{error}</p>}
      {submitted && (
        <p className="mt-2 text-xs text-[#d4a85a] text-left sm:text-center">
          You&apos;re on the list — thanks for signing up!
        </p>
      )}
    </div>
  );
}
