import Image from "next/image";
import Link from "next/link";

import { config } from "@/lib/config";
import { getPrimaryPricingTier, getTemplateFeatures, getTemplateStats } from "@/lib/template-data";

import { TemplateInlineWaitlistForm } from "./TemplateInlineWaitlistForm";

export function FigmaExample03Template(): JSX.Element {
  const topFeatures = getTemplateFeatures(3);
  const topStats = getTemplateStats(3);
  const highlightedTier = getPrimaryPricingTier();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(90%_90%_at_100%_0%,rgba(91,135,255,0.18),transparent_60%),radial-gradient(70%_70%_at_0%_100%,rgba(15,118,110,0.12),transparent_60%),#f7f9fc] text-[#0f172a]">
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 sm:py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {config.meta.title}
        </Link>
        <a
          href="#waitlist"
          className="inline-flex rounded-full border border-[#d3dbeb] bg-white px-4 py-2 text-sm font-medium text-[#111827] shadow-sm"
        >
          {config.hero.cta}
        </a>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-16 pt-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 md:pb-20 md:pt-6">
        <div className="min-w-0">
          <p className="inline-flex rounded-full border border-[#dbe1ee] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5B87FF]">
            {config.hero.badge ?? "Coming soon"}
          </p>
          <h1 className="mt-6 text-[clamp(2.05rem,9vw,3.75rem)] font-semibold tracking-[-0.04em] text-[#0B1020] md:leading-[1.02]">
            {config.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-[#5f6473] sm:text-lg md:text-xl">{config.hero.subheadline}</p>

          <div id="waitlist" className="mt-8 max-w-[28rem]">
            <TemplateInlineWaitlistForm
              inputId="figma-example-03-email"
              buttonLabel={config.hero.cta}
              placeholder="jane@example.com"
              mode="pill"
              submitSymbol="→"
            />
          </div>

          <ul className="mt-7 grid gap-3 text-sm text-[#3d4558] sm:grid-cols-2 md:grid-cols-2">
            {topFeatures.map((feature) => (
              <li key={feature.title} className="rounded-xl border border-[#e0e5f2] bg-white/80 px-4 py-3">
                <p className="font-semibold text-[#0f172a]">{feature.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#5b6375]">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 rounded-[2rem] border border-[#dce2f0] bg-white p-4 shadow-[0_36px_90px_rgba(15,23,42,0.13)] sm:p-5 md:p-6">
          <div className="rounded-[1.5rem] border border-[#ebeff7] bg-[#f5f8ff] p-3">
            <Image
              src={config.hero.image}
              alt={`${config.meta.title} preview`}
              width={920}
              height={640}
              className="h-auto w-full rounded-[1.2rem] border border-white/80"
              sizes="(min-width: 1024px) 40vw, 92vw"
            />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {topStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[#e4e9f5] bg-white px-4 py-3">
                <p className="text-2xl font-semibold text-[#111827]">{stat.value}</p>
                <p className="text-xs text-[#5f6473]">{stat.label}</p>
              </div>
            ))}
            <div className="rounded-xl border border-[#d7e4ff] bg-[#eef4ff] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3559cb]">{highlightedTier.name}</p>
              <p className="mt-1 text-2xl font-semibold text-[#1f3f9f]">
                {highlightedTier.price === 0 ? "Free" : `$${highlightedTier.price}/mo`}
              </p>
              <p className="text-xs text-[#3559cb]">Pricing locks in at launch.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
