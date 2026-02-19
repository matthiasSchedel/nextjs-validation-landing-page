import Link from "next/link";

import { config } from "@/lib/config";
import { FIGMA_REFERENCE_URL, templateVariants } from "@/lib/template-catalog";

export default function HomePage(): JSX.Element {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Template Gallery</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{config.meta.title} landing variants</h1>
        <p className="mt-4 text-base text-foreground/75 md:text-lg">
          Choose a one-pager variant, customize `saas.config.ts`, and keep adding new routes as you port designs.
        </p>
        <a href={FIGMA_REFERENCE_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline">
          Figma source for this template set
        </a>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {templateVariants.map((variant) => (
          <article key={variant.slug} className="rounded-xl border border-border bg-background p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold">{variant.name}</h2>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                  variant.implemented ? "bg-primary/10 text-primary" : "bg-muted text-foreground/70"
                }`}
              >
                {variant.implemented ? "ready" : "placeholder"}
              </span>
            </div>
            <p className="mt-3 text-sm text-foreground/75">{variant.description}</p>
            <Link
              href={`/templates/${variant.slug}`}
              className="mt-6 inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:border-primary"
            >
              Open template
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
