import Link from "next/link";

import { templateVariants } from "@/lib/template-catalog";

export default function HomePage(): JSX.Element {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-14 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Index</h1>
      <p className="mt-3 text-sm text-foreground/75 md:text-base">Simple route list for this project.</p>

      <ul className="mt-8 space-y-3">
        <li>
          <Link href="/templates" className="text-primary underline-offset-4 hover:underline">
            /templates
          </Link>
        </li>
        {templateVariants.map((variant) => (
          <li key={variant.slug}>
            <Link href={`/templates/${variant.slug}`} className="text-primary underline-offset-4 hover:underline">
              {`/templates/${variant.slug}`}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
