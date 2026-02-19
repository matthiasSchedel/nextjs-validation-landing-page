import Image from "next/image";
import Link from "next/link";

import { config } from "@/lib/config";

import { TemplateInlineWaitlistForm } from "./TemplateInlineWaitlistForm";

export function FigmaExample04Template(): JSX.Element {
  const topFeatures = config.features.slice(0, 4);
  const leadQuote = config.socialProof?.quotes[0];
  const topStat = config.socialProof?.stats[0];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(70,154,255,0.22),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(15,118,110,0.22),transparent_36%),#060A17] text-white">
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 sm:py-6">
        <Link href="/" className="text-lg font-semibold">
          {config.meta.title}
        </Link>
        <a href="#waitlist" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
          {config.hero.cta}
        </a>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-16 pt-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10 md:pb-20 md:pt-6">
        <div className="min-w-0">
          <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8fb3ff]">
            {config.hero.badge ?? "Private beta"}
          </p>
          <h1 className="mt-6 text-[clamp(2.05rem,9vw,3.75rem)] font-semibold tracking-[-0.04em] md:leading-[1.02]">
            {config.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg md:text-xl">{config.hero.subheadline}</p>

          <div id="waitlist" className="mt-8 max-w-xl">
            <TemplateInlineWaitlistForm
              inputId="figma-example-04-email"
              buttonLabel={config.hero.cta}
              placeholder="team@company.com"
              mode="dark"
            />
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {topFeatures.map((feature) => (
              <div key={feature.title} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/65">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[1.6rem] border border-white/10 bg-[#0d1429]/90 p-4 shadow-[0_36px_90px_rgba(0,0,0,0.35)] sm:p-5">
          <Image
            src={config.hero.image}
            alt={`${config.meta.title} dark preview`}
            width={920}
            height={620}
            className="h-auto w-full rounded-xl border border-white/10 bg-black/25"
            sizes="(min-width: 1024px) 38vw, 92vw"
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-white/60">Pipeline confidence</p>
              <p className="mt-2 text-2xl font-semibold">{topStat?.value ?? "99.99%"}</p>
              <p className="text-xs text-white/65">{topStat?.label ?? "delivery reliability target"}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-white/60">Built for</p>
              <p className="mt-2 text-lg font-semibold">{config.framework.buyerPersona}</p>
            </div>
          </div>

          {leadQuote ? (
            <blockquote className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-white/85">&quot;{leadQuote.text}&quot;</p>
              <footer className="mt-2 text-xs text-white/60">
                {leadQuote.author}
                {leadQuote.role ? `, ${leadQuote.role}` : ""}
              </footer>
            </blockquote>
          ) : null}
        </div>
      </section>
    </main>
  );
}
