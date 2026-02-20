import Image from "next/image";
import Link from "next/link";

import { config } from "@/lib/config";
import { getPrimaryPricingTier, getTemplateFeatures, getTemplateStats } from "@/lib/template-data";

import { TemplateInlineWaitlistForm } from "./TemplateInlineWaitlistForm";

export function FigmaExample08Template(): JSX.Element {
  const topFeatures = getTemplateFeatures(3);
  const topStats = getTemplateStats(2);
  const leadTier = getPrimaryPricingTier();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#101317_0%,#121a2a_26%,#f4f6fb_26%,#f4f6fb_100%)] text-[#0f172a] md:bg-[linear-gradient(180deg,#101317_0%,#121a2a_34%,#f4f6fb_34%,#f4f6fb_100%)]">
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-white sm:px-6 sm:py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {config.meta.title}
        </Link>
        <a href="#waitlist" className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium">
          {config.hero.cta}
        </a>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-2 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 text-white backdrop-blur sm:p-7 md:p-9">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9ac0ff]">
            {config.hero.badge ?? "Early access"}
          </p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.05rem,9vw,4rem)] font-semibold tracking-[-0.04em] md:leading-[1.02]">
            {config.hero.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-base text-white/80 sm:text-lg md:text-xl">{config.hero.subheadline}</p>

          <div id="waitlist" className="mt-8 max-w-xl">
            <TemplateInlineWaitlistForm
              inputId="figma-example-08-email"
              buttonLabel={config.hero.cta}
              placeholder="product@company.com"
              mode="dark"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="min-w-0 rounded-3xl border border-[#d8deeb] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5e6680]">Product preview</p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#e4e8f1] bg-[#f8fafd] p-3">
              <Image
                src={config.hero.image}
                alt={`${config.meta.title} interface preview`}
                width={980}
                height={600}
                className="h-auto w-full rounded-xl border border-white"
                sizes="(min-width: 1024px) 44vw, 92vw"
              />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {topStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[#e8ecf5] px-4 py-3">
                  <p className="text-2xl font-semibold text-[#182544]">{stat.value}</p>
                  <p className="text-xs text-[#5f687f]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="min-w-0 rounded-3xl border border-[#d8deeb] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5e6680]">Launch offer</p>
            <div className="mt-4 rounded-2xl border border-[#dbe5ff] bg-[#f0f5ff] px-5 py-4">
              <p className="text-sm font-semibold text-[#284898]">{leadTier.name}</p>
              <p className="mt-1 text-3xl font-semibold text-[#183177]">
                {leadTier.price === 0 ? "Free" : `$${leadTier.price}/mo`}
              </p>
              <p className="mt-1 text-sm text-[#3f5db5]">{leadTier.description ?? "Pricing locks in at launch."}</p>
            </div>

            <ul className="mt-4 space-y-2">
              {topFeatures.map((feature) => (
                <li key={feature.title} className="rounded-xl border border-[#e8ecf5] px-4 py-3">
                  <p className="text-sm font-semibold text-[#182544]">{feature.title}</p>
                  <p className="mt-1 text-sm text-[#5f687f]">{feature.description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
