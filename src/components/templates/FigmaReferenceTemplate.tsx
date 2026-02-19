import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { config } from "@/lib/config";
import { getFigmaReferenceVariant } from "@/lib/figma-reference";
import { FIGMA_REFERENCE_URL } from "@/lib/template-catalog";

interface FigmaReferenceTemplateProps {
  slug: string;
}

export function FigmaReferenceTemplate({ slug }: FigmaReferenceTemplateProps): JSX.Element {
  const variant = getFigmaReferenceVariant(slug);

  if (!variant) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f3f6fb] text-[#0f172a]">
      <header className="mx-auto flex w-full max-w-[96rem] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 md:py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {config.meta.title}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/templates"
            className="rounded-full border border-[#d7deea] bg-white px-4 py-2 text-sm font-medium text-[#1f2a44]"
          >
            All templates
          </Link>
          <a
            href={FIGMA_REFERENCE_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#d7deea] bg-white px-4 py-2 text-sm font-medium text-[#1f2a44]"
          >
            Open Figma
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[96rem] px-2 pb-8 sm:px-6 md:pb-14">
        <div className="overflow-hidden rounded-[1.4rem] border border-[#dae2f0] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
          <Image
            src={variant.imageSrc}
            alt={`${variant.figmaName} screenshot`}
            width={variant.width}
            height={variant.height}
            className="h-auto w-full"
            sizes="(min-width: 1536px) 1400px, (min-width: 1024px) 92vw, 100vw"
            priority
          />
        </div>

        <p className="mx-auto mt-3 max-w-[96rem] px-2 text-xs font-medium uppercase tracking-[0.14em] text-[#5f6d89] sm:text-sm">
          {variant.figmaName} ({variant.name})
        </p>
      </section>
    </main>
  );
}
