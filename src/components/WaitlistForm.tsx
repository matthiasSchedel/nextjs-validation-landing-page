"use client";

import { FormEvent, useState } from "react";

interface WaitlistFormProps {
  title: string;
  buttonLabel: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({ title, buttonLabel }: WaitlistFormProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
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
        setError(payload.error ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="waitlist" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="rounded-2xl border border-border bg-muted/30 p-8 md:p-10">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Join the {title} waitlist</h2>

        {isSuccess ? (
          <p className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
            You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : buttonLabel}
            </button>
          </form>
        )}

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </div>
    </section>
  );
}
