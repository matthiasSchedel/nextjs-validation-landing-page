"use client";

import { FormEvent, useState } from "react";

type WaitlistFormMode = "pill" | "card" | "dark";

interface TemplateInlineWaitlistFormProps {
  inputId: string;
  buttonLabel: string;
  mode?: WaitlistFormMode;
  placeholder?: string;
  successMessage?: string;
  submitSymbol?: string;
}

interface WaitlistApiPayload {
  ok?: boolean;
  error?: string;
}

interface WaitlistModeStyles {
  wrapper: string;
  input: string;
  button: string;
  success: string;
  error: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MODE_STYLES: Record<WaitlistFormMode, WaitlistModeStyles> = {
  pill: {
    wrapper: "relative",
    input:
      "h-14 w-full rounded-full border border-[#e6e9f0] bg-[#f1f2f4] px-6 pr-20 text-base text-[#111827] outline-none transition placeholder:text-[#adb3bf] focus:border-[#7a9bff] focus:bg-white",
    button:
      "absolute right-[6px] top-[6px] inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#8eabff] bg-[#5B87FF] text-xl text-white shadow-[0_10px_22px_rgba(91,135,255,0.32)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70",
    success: "rounded-full border border-[#c8d7ff] bg-[#f4f8ff] px-5 py-4 text-sm font-medium text-[#3b5bc8]",
    error: "mt-2 text-sm text-[#B42318]"
  },
  card: {
    wrapper: "flex flex-col gap-3 sm:flex-row",
    input:
      "h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-primary/20",
    button:
      "inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70",
    success: "rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary",
    error: "mt-2 text-sm text-rose-600"
  },
  dark: {
    wrapper: "flex flex-col gap-3 sm:flex-row",
    input:
      "h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-primary focus:ring-2 focus:ring-primary/30",
    button:
      "inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#111827] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70",
    success: "rounded-xl border border-emerald-300/40 bg-emerald-300/15 px-4 py-3 text-sm font-medium text-emerald-100",
    error: "mt-2 text-sm text-rose-300"
  }
};

function parseWaitlistApiPayload(value: unknown): WaitlistApiPayload {
  if (typeof value !== "object" || value === null) {
    return {};
  }

  let ok: boolean | undefined;
  let error: string | undefined;

  if ("ok" in value && typeof value.ok === "boolean") {
    ok = value.ok;
  }

  if ("error" in value && typeof value.error === "string") {
    error = value.error;
  }

  return { ok, error };
}

export function TemplateInlineWaitlistForm({
  inputId,
  buttonLabel,
  mode = "card",
  placeholder = "you@company.com",
  successMessage = "You're on the list.",
  submitSymbol
}: TemplateInlineWaitlistFormProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const styles = MODE_STYLES[mode];

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
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

      const payload = parseWaitlistApiPayload(await response.json());

      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Could not submit. Try again.");
        return;
      }

      setIsSuccess(true);
      setEmail("");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {isSuccess ? (
        <p className={styles.success}>{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
          <label htmlFor={inputId} className="sr-only">
            Email
          </label>
          <input
            id={inputId}
            name={inputId}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            className={styles.input}
          />
          <button type="submit" disabled={isSubmitting} aria-label={buttonLabel} className={styles.button}>
            {isSubmitting ? "..." : submitSymbol ?? buttonLabel}
          </button>
        </form>
      )}
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
