import Link from "next/link";

import { config } from "@/lib/config";
import {
  FIGMA_REFERENCE_URL,
  GITHUB_REPO_URL,
  getTemplatePath,
  type TemplateVariant,
  templateVariants
} from "@/lib/template-catalog";

interface TemplateCard extends TemplateVariant {
  previewSrc: string;
  href: string;
}

function getTemplatePreviewSrc(slug: string): string {
  if (slug === "minimal-mobile-light") {
    return "/images/templates/minimal-mobile-phone.svg";
  }

  if (slug === "classic-saas") {
    return "/images/hero-flowsync.svg";
  }

  if (slug.startsWith("figma-example-")) {
    return `/images/templates/figma/${slug}.png`;
  }

  return "/images/og-flowsync.svg";
}

const templateCards: TemplateCard[] = templateVariants.map((variant) => ({
  ...variant,
  previewSrc: getTemplatePreviewSrc(variant.slug),
  href: getTemplatePath(variant.slug)
}));

export default function HomePage(): JSX.Element {
  const figmaTemplatesCount = templateCards.filter((template) => template.slug.startsWith("figma-example-")).length;

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.16),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-56 -z-10 h-[420px] bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.12),transparent_72%)]" />

      <section className="mx-auto w-full max-w-7xl px-6 pb-8 pt-14 md:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Template Gallery</p>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80 transition hover:border-primary hover:text-foreground"
          >
            GitHub Repository
          </a>
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          Top {figmaTemplatesCount} validation landing pages free to use
        </h1>
        <p className="mt-5 max-w-3xl text-base text-foreground/75 md:text-lg">
          Browse and open every variant instantly. Includes {figmaTemplatesCount} Figma-inspired layouts plus 2 bonus
          starter templates.
        </p>
        <p className="mt-4 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          {config.meta.title}: one config, many page concepts
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/templates"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Open all templates
          </Link>
          <a
            href={FIGMA_REFERENCE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold transition hover:border-primary"
          >
            View Figma source
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {templateCards.map((template) => (
            <article
              key={template.slug}
              className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-lg"
            >
              <Link href={template.href} className="block aspect-[4/3] border-b border-border bg-muted/40">
                <img src={template.previewSrc} alt={`${template.name} preview`} className="h-full w-full object-cover" />
              </Link>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">{template.name}</h2>
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      template.implemented ? "bg-primary/10 text-primary" : "bg-muted text-foreground/70"
                    }`}
                  >
                    {template.implemented ? "ready" : "draft"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-foreground/75">{template.description}</p>
                <Link
                  href={template.href}
                  className="mt-5 inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:border-primary"
                >
                  Open template
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
