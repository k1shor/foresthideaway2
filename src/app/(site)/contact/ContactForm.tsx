"use client";

import { useState, FormEvent } from "react";
import { apiPost } from "@/lib/api/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[A-Za-z\s.'-]+$/;

type Fields = {
  name: string;
  email: string;
  arrival: string;
  guests: string;
  package: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const initialFields: Fields = {
  name: "",
  email: "",
  arrival: "",
  guests: "",
  package: "",
  message: "",
};

function validateField(name: keyof Fields, value: string): string | undefined {
  switch (name) {
    case "name": {
      const trimmed = value.trim();
      if (!trimmed) return "Please enter your name.";
      if (trimmed.length < 2) return "Name looks too short.";
      if (!NAME_RE.test(trimmed)) return "Name can only contain letters and punctuation.";
      return undefined;
    }
    case "email": {
      if (!value.trim()) return "Please enter your email.";
      if (!EMAIL_RE.test(value.trim())) return "Please enter a valid email address.";
      return undefined;
    }
    case "arrival": {
      if (!value) return undefined;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(value) < today) return "Arrival date can't be in the past.";
      return undefined;
    }
    case "guests":
      if (!value) return "Please select number of guests.";
      return undefined;
    case "package":
      if (!value) return "Please select what you're interested in.";
      return undefined;
    case "message": {
      const trimmed = value.trim();
      if (!trimmed) return "Please tell us a bit about your trip.";
      if (trimmed.length < 10) return "Message is a little too short.";
      return undefined;
    }
    default:
      return undefined;
  }
}

const inputClass =
  "w-full px-4 py-3 border bg-white text-[#1e1a14] placeholder:text-[#b0a090] focus:outline-none transition-colors text-sm";

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof Fields) {
    const error = validateField(key, fields[key]);
    setErrors((prev) => ({ ...prev, [key]: error }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Errors = {};
    (Object.keys(fields) as (keyof Fields)[]).forEach((key) => {
      const error = validateField(key, fields[key]);
      if (error) nextErrors[key] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      await apiPost("/api/contact", fields);
      setSubmitted(true);
      setFields(initialFields);
    } catch {
      setSubmitError("Something went wrong sending your enquiry. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const borderClass = (key: keyof Fields) =>
    errors[key] ? "border-red-400" : "border-[#e8d8c0] focus:border-[#c8923a]";

  return (
    <form className="space-y-5" id="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
            Full Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={fields.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={`${inputClass} ${borderClass("name")}`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            value={fields.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${inputClass} ${borderClass("email")}`}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-arrival" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
            Arrival Date
          </label>
          <input
            id="contact-arrival"
            name="arrival"
            type="date"
            value={fields.arrival}
            onChange={(e) => handleChange("arrival", e.target.value)}
            onBlur={() => handleBlur("arrival")}
            className={`${inputClass} ${borderClass("arrival")}`}
          />
          {errors.arrival && <p className="mt-1.5 text-xs text-red-600">{errors.arrival}</p>}
        </div>
        <div>
          <label htmlFor="contact-guests" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
            No. of Guests
          </label>
          <select
            id="contact-guests"
            name="guests"
            required
            value={fields.guests}
            onChange={(e) => handleChange("guests", e.target.value)}
            onBlur={() => handleBlur("guests")}
            className={`${inputClass} ${borderClass("guests")} appearance-none`}
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
              <option key={n} value={n}>{n} {typeof n === "number" && n === 1 ? "guest" : "guests"}</option>
            ))}
          </select>
          {errors.guests && <p className="mt-1.5 text-xs text-red-600">{errors.guests}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-package" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
          Interested In
        </label>
        <select
          id="contact-package"
          name="package"
          required
          value={fields.package}
          onChange={(e) => handleChange("package", e.target.value)}
          onBlur={() => handleBlur("package")}
          className={`${inputClass} ${borderClass("package")} appearance-none`}
        >
          <option value="">Select a package or activity</option>
          <option>Jungle Discovery (2N/3D)</option>
          <option>Bardia Signature Stay (3N/4D)</option>
          <option>Complete Wilderness Retreat (4N/5D)</option>
          <option>Wildlife Photography Tour</option>
          <option>Tharu Cultural Tour</option>
          <option>Custom / Not sure yet</option>
        </select>
        {errors.package && <p className="mt-1.5 text-xs text-red-600">{errors.package}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your ideal Bardia journey, any special requirements, or questions you have..."
          value={fields.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          className={`${inputClass} ${borderClass("message")} resize-none`}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
      </div>

      {submitted && (
        <p className="text-xs text-[#4d7a52] bg-[#4d7a52]/10 border border-[#4d7a52]/30 px-4 py-3">
          Thanks for reaching out — your enquiry has been sent. We&apos;ll get back to you shortly.
        </p>
      )}
      {submitError && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-4 py-3">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group/btn relative w-full overflow-hidden py-4 bg-[#1c2316] text-[#f5ede0] uppercase tracking-[0.2em] text-xs border border-[#2a3320] transition-colors duration-500 disabled:opacity-60"
      >
        <span className="absolute inset-0 bg-[#c8923a] [clip-path:circle(0%_at_50%_50%)] group-hover/btn:[clip-path:circle(150%_at_50%_50%)] opacity-0 group-hover/btn:opacity-25 transition-[clip-path,opacity] duration-[900ms] ease-in-out" />
        <span className="relative z-10">{submitting ? "Sending..." : "Send Enquiry"}</span>
      </button>
    </form>
  );
}
