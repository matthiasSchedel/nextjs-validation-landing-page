import Link from "next/link";

import { config } from "@/lib/config";
import { getPrimaryPricingTier, getTemplateFeatures } from "@/lib/template-data";

import { TemplateInlineWaitlistForm } from "./TemplateInlineWaitlistForm";

export function FigmaExample07Template(): JSX.Element {
  const primaryTier = getPrimaryPricingTier();
  const quickFeatures = getTemplateFeatures(6);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(95%_95%_at_0%_0%,rgba(255,255,255,0.32),transparent_50%),radial-gradient(90%_90%_at_100%_100%,rgba(255,255,255,0.26),transparent_58%),linear-gradient(135deg,#2d6ae6_0%,#227a94_50%,#0f766e_100%)] text-white">
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 sm:py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {config.meta.title}
        </Link>
        <a href="#waitlist" className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium">
          {config.hero.cta}
        </a>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6 md:pb-20">
        <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-[0_35px_85px_rgba(0,0,0,0.22)] backdrop-blur sm:p-7 md:p-10">
          <p className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
            {config.hero.badge ?? "Launch ready"}
          </p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.05rem,9vw,3.75rem)] font-semibold tracking-[-0.04em] md:leading-[1.04]">
            {config.hero.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-base text-white/85 sm:text-lg md:text-xl">{config.hero.subheadline}</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div id="waitlist" className="max-w-xl">
                <TemplateInlineWaitlistForm
                  inputId="figma-example-07-email"
                  buttonLabel={config.hero.cta}
                  placeholder="you@product.com"
                  mode="dark"
                />
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {quickFeatures.map((feature) => (
                  <li key={feature.title} className="rounded-2xl border border-white/20 bg-black/10 px-4 py-3">
                    <p className="text-sm font-semibold">{feature.title}</p>
                    <p className="mt-1 text-xs text-white/75">{feature.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="min-w-0 rounded-3xl border border-white/25 bg-black/15 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">{config.pricing.headline}</p>
              <div className="mt-4 rounded-2xl border border-white/25 bg-white/10 px-5 py-4">
                <p className="text-sm font-semibold">{primaryTier.name}</p>
                <p className="mt-1 text-3xl font-semibold">
                  {primaryTier.price === 0 ? "Free" : `$${primaryTier.price}/mo`}
                </p>
                <p className="mt-1 text-sm text-white/80">{primaryTier.description ?? "Pricing locks in at launch."}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {primaryTier.features.map((feature) => (
                  <li key={feature} className="rounded-xl border border-white/20 bg-black/10 px-3 py-2">
                    {feature}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
