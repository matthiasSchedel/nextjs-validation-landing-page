import Link from "next/link";

import type { TemplateVariant } from "@/lib/template-catalog";

interface TemplatePlaceholderProps {
  variant: TemplateVariant;
}

export function TemplatePlaceholder({ variant }: TemplatePlaceholderProps): JSX.Element {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-20">
      <div className="w-full rounded-2xl border border-border bg-background p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Template not implemented yet</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">{variant.name}</h1>
        <p className="mt-3 max-w-2xl text-foreground/75">
          This route is scaffolded so you can fill it with the matching Figma layout later.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-primary">
            Back to template gallery
          </Link>
          <Link href="/templates/classic-saas" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Open implemented template
          </Link>
        </div>
      </div>
    </main>
  );
}
