"use client";

import { FormEvent, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function MinimalMobileLightWaitlistForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);

    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Could not submit. Try again.");
        return;
      }

      setSuccess(true);
      setEmail("");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {success ? (
        <p className="rounded-2xl border border-[#b9cdfd] bg-[#f2f6ff] px-5 py-4 text-sm font-medium text-[#3b5bc8]">
          You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={submit} className="relative">
          <label htmlFor="minimal-mobile-email" className="sr-only">
            Email
          </label>
          <input
            id="minimal-mobile-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="jane@example.com"
            className="h-14 w-full rounded-full border border-[#e5e8ef] bg-[#f3f4f6] px-6 pr-20 text-base text-[#111827] outline-none transition focus:border-[#7a9bff]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            aria-label="Join waitlist"
            className="absolute right-1 top-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#5B87FF] text-xl text-white shadow-[0_10px_20px_rgba(91,135,255,0.3)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "…" : "→"}
          </button>
        </form>
      )}
      {error ? <p className="mt-2 text-sm text-[#B42318]">{error}</p> : null}
    </div>
  );
}
