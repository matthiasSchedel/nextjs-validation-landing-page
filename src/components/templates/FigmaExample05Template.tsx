import Link from "next/link";

import { config } from "@/lib/config";

import { TemplateInlineWaitlistForm } from "./TemplateInlineWaitlistForm";

export function FigmaExample05Template(): JSX.Element {
  const topFeatures = config.features.slice(0, 3);
  const primaryTier = config.pricing.tiers.find((tier) => tier.highlighted) ?? config.pricing.tiers[0];
  const secondaryTier = config.pricing.tiers.find((tier) => tier !== primaryTier) ?? config.pricing.tiers[0];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_0%_0%,rgba(15,118,110,0.16),transparent_40%),radial-gradient(circle_at_100%_10%,rgba(91,135,255,0.2),transparent_36%),#fbfcff] text-[#0f172a]">
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 sm:py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {config.meta.title}
        </Link>
        <a href="#waitlist" className="rounded-full bg-[#0f172a] px-4 py-2 text-sm font-medium text-white">
          {config.hero.cta}
        </a>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6 md:pb-20">
        <p className="inline-flex rounded-full border border-[#d9deea] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4257a9]">
          {config.hero.badge ?? "New launch"}
        </p>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.05rem,9vw,3.75rem)] font-semibold tracking-[-0.04em] text-[#101528] md:leading-[1.02]">
          {config.hero.headline}
        </h1>
        <p className="mt-5 max-w-3xl text-base text-[#576077] sm:text-lg md:text-xl">{config.hero.subheadline}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0 rounded-3xl border border-[#dce2ef] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5264a1]">What you get</p>
            <ul className="mt-4 space-y-3">
              {topFeatures.map((feature) => (
                <li key={feature.title} className="rounded-2xl border border-[#e8ecf5] px-4 py-3">
                  <p className="text-sm font-semibold text-[#101528]">{feature.title}</p>
                  <p className="mt-1 text-sm text-[#5b657c]">{feature.description}</p>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#e8ecf5] bg-[#f6f8fe] px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-[#5a678f]">Core pain</p>
                <p className="mt-1 text-sm text-[#25314f]">{config.framework.corePain}</p>
              </div>
              <div className="rounded-2xl border border-[#e8ecf5] bg-[#f6f8fe] px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-[#5a678f]">Primary channel</p>
                <p className="mt-1 text-sm text-[#25314f]">{config.framework.channel}</p>
              </div>
            </div>
          </div>

          <aside className="min-w-0 rounded-3xl border border-[#d5ddf1] bg-white p-5 shadow-[0_26px_60px_rgba(15,23,42,0.12)] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5264a1]">{config.pricing.headline}</p>
            <div className="mt-4 rounded-2xl border border-[#bfd0ff] bg-[#edf3ff] px-5 py-4">
              <p className="text-sm font-semibold text-[#304a9b]">{primaryTier.name}</p>
              <p className="mt-1 text-3xl font-semibold text-[#183177]">
                {primaryTier.price === 0 ? "Free" : `$${primaryTier.price}/mo`}
              </p>
              <p className="mt-1 text-sm text-[#3e5db9]">{primaryTier.description ?? "Pricing locks in at launch."}</p>
            </div>
            <div className="mt-3 rounded-2xl border border-[#e8ecf5] px-5 py-4">
              <p className="text-sm font-semibold text-[#101528]">{secondaryTier.name}</p>
              <p className="mt-1 text-2xl font-semibold text-[#202e52]">
                {secondaryTier.price === 0 ? "Free" : `$${secondaryTier.price}/mo`}
              </p>
            </div>

            <div id="waitlist" className="mt-6">
              <TemplateInlineWaitlistForm
                inputId="figma-example-05-email"
                buttonLabel={config.hero.cta}
                placeholder="founder@startup.com"
                mode="card"
              />
            </div>
            <p className="mt-3 text-xs text-[#576077]">Pricing locks in at launch for everyone on the waitlist.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
