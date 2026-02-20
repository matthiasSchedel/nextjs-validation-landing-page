import Link from "next/link";
import { notFound } from "next/navigation";

import { config } from "@/lib/config";
import { getFigmaReferenceVariant } from "@/lib/figma-reference";
import {
  getPrimaryPricingTier,
  getSecondaryPricingTier,
  getTemplateFeatures,
  getTemplateQuotes,
  getTemplateStats
} from "@/lib/template-data";
import { FIGMA_REFERENCE_URL } from "@/lib/template-catalog";
import { TemplateInlineWaitlistForm } from "@/components/templates/TemplateInlineWaitlistForm";

interface GeneratedTheme {
  page: string;
  shell: string;
  panel: string;
  subtlePanel: string;
  heading: string;
  body: string;
  muted: string;
  chip: string;
  softChip: string;
  primaryButton: string;
  secondaryButton: string;
  formMode: "card" | "dark";
}

const GENERATED_THEMES: GeneratedTheme[] = [
  {
    page: "bg-[radial-gradient(circle_at_8%_4%,rgba(42,115,255,0.18),transparent_34%),radial-gradient(circle_at_92%_18%,rgba(15,118,110,0.16),transparent_32%),#f4f7ff]",
    shell: "border-[#dbe2f4] bg-white/95",
    panel: "border-[#dbe2f4] bg-white shadow-[0_26px_70px_rgba(15,23,42,0.12)]",
    subtlePanel: "border-[#e6ebf6] bg-[#f7f9ff]",
    heading: "text-[#0f172a]",
    body: "text-[#4f5d78]",
    muted: "text-[#5f6d89]",
    chip: "border-[#c7d3f8] bg-[#edf2ff] text-[#2f4ea5]",
    softChip: "border-[#dce3f4] bg-white text-[#2f3c61]",
    primaryButton: "bg-[#1d4ed8] text-white hover:brightness-95",
    secondaryButton: "border-[#d0d9ee] bg-white text-[#1f2a44]",
    formMode: "card"
  },
  {
    page: "bg-[radial-gradient(circle_at_20%_0%,rgba(111,38,218,0.36),transparent_42%),radial-gradient(circle_at_86%_12%,rgba(28,148,125,0.28),transparent_36%),#0b1222]",
    shell: "border-white/15 bg-white/[0.04]",
    panel: "border-white/15 bg-white/[0.06] shadow-[0_28px_80px_rgba(0,0,0,0.35)]",
    subtlePanel: "border-white/15 bg-black/15",
    heading: "text-white",
    body: "text-white/80",
    muted: "text-white/65",
    chip: "border-[#8ab4ff]/40 bg-[#8ab4ff]/20 text-[#d7e7ff]",
    softChip: "border-white/20 bg-white/10 text-white/90",
    primaryButton: "bg-white text-[#111827] hover:bg-white/90",
    secondaryButton: "border-white/25 bg-white/10 text-white",
    formMode: "dark"
  },
  {
    page: "bg-[radial-gradient(circle_at_0%_0%,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_100%_6%,rgba(59,130,246,0.2),transparent_34%),#fffaf1]",
    shell: "border-[#f1dfbf] bg-white/95",
    panel: "border-[#f1dfbf] bg-white shadow-[0_28px_70px_rgba(120,84,19,0.14)]",
    subtlePanel: "border-[#f5e7cb] bg-[#fff7e8]",
    heading: "text-[#1f2937]",
    body: "text-[#556070]",
    muted: "text-[#6e7787]",
    chip: "border-[#f0c987] bg-[#ffe6be] text-[#7f4a00]",
    softChip: "border-[#f0dfbf] bg-white text-[#5a4324]",
    primaryButton: "bg-[#a16207] text-white hover:brightness-95",
    secondaryButton: "border-[#f1dfbf] bg-white text-[#5a4324]",
    formMode: "card"
  },
  {
    page: "bg-[radial-gradient(circle_at_12%_4%,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_92%_14%,rgba(16,185,129,0.16),transparent_32%),#eef7f5]",
    shell: "border-[#cde7e1] bg-white/95",
    panel: "border-[#cde7e1] bg-white shadow-[0_26px_68px_rgba(15,89,76,0.14)]",
    subtlePanel: "border-[#d6ebe7] bg-[#f3fbf9]",
    heading: "text-[#0f2d2c]",
    body: "text-[#3f615d]",
    muted: "text-[#53706d]",
    chip: "border-[#95d3c4] bg-[#ddf5ee] text-[#0f5f53]",
    softChip: "border-[#d2e8e3] bg-white text-[#21514a]",
    primaryButton: "bg-[#0f766e] text-white hover:brightness-95",
    secondaryButton: "border-[#cde7e1] bg-white text-[#21514a]",
    formMode: "card"
  }
];

type VariantLayout = "split" | "spotlight" | "checklist";

const LAYOUT_ORDER: VariantLayout[] = ["split", "spotlight", "checklist"];

interface FigmaReferenceTemplateProps {
  slug: string;
}

export function FigmaReferenceTemplate({ slug }: FigmaReferenceTemplateProps): JSX.Element {
  const variant = getFigmaReferenceVariant(slug);

  if (!variant) {
    notFound();
  }

  const features = getTemplateFeatures(6);
  const stats = getTemplateStats(3);
  const quotes = getTemplateQuotes();
  const leadTier = getPrimaryPricingTier();
  const fallbackTier = getSecondaryPricingTier(leadTier);
  const variantNumber = getVariantNumber(variant.slug);
  const theme = GENERATED_THEMES[(variantNumber - 1) % GENERATED_THEMES.length];
  const layout = LAYOUT_ORDER[(variantNumber - 1) % LAYOUT_ORDER.length];
  const quote = quotes.length > 0 ? quotes[(variantNumber - 1) % quotes.length] : null;
  const featureStartIndex = (variantNumber - 1) % Math.max(1, features.length - 2);
  const highlightedFeatures = features.slice(featureStartIndex, featureStartIndex + 3);

  return (
    <main className={`min-h-screen overflow-x-hidden px-4 pb-14 pt-4 sm:px-6 sm:pt-6 ${theme.page}`}>
      <div className={`mx-auto w-full max-w-6xl rounded-[1.8rem] border p-4 sm:p-6 ${theme.shell}`}>
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className={`text-lg font-semibold tracking-tight ${theme.heading}`}>
            {config.meta.title}
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/templates"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${theme.secondaryButton}`}
            >
              All templates
            </Link>
            <a
              href={FIGMA_REFERENCE_URL}
              target="_blank"
              rel="noreferrer"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${theme.primaryButton}`}
            >
              Open Figma
            </a>
          </div>
        </header>

        <section className="mt-6">
          {layout === "split" ? (
            <div className={`grid gap-5 rounded-[1.4rem] border p-5 md:grid-cols-[1.2fr_0.8fr] md:p-7 ${theme.panel}`}>
              <div>
                <p className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${theme.chip}`}>
                  {variant.figmaName}
                </p>
                <h1 className={`mt-5 max-w-3xl text-[clamp(2rem,7.8vw,3.6rem)] font-semibold tracking-[-0.04em] md:leading-[1.03] ${theme.heading}`}>
                  {config.hero.headline}
                </h1>
                <p className={`mt-4 max-w-2xl text-base sm:text-lg ${theme.body}`}>{config.hero.subheadline}</p>

                <div className="mt-6 max-w-xl">
                  <TemplateInlineWaitlistForm
                    inputId={`${variant.slug}-email`}
                    buttonLabel={config.hero.cta}
                    mode={theme.formMode}
                    placeholder="you@company.com"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {highlightedFeatures.map((feature) => (
                    <span key={feature.title} className={`rounded-full border px-3 py-1 text-xs font-semibold ${theme.softChip}`}>
                      {feature.title}
                    </span>
                  ))}
                </div>
              </div>

              <aside className={`rounded-2xl border p-4 sm:p-5 ${theme.subtlePanel}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.muted}`}>{config.pricing.headline}</p>
                <div className="mt-3 rounded-xl border border-inherit bg-white/10 px-4 py-3">
                  <p className={`text-sm font-semibold ${theme.heading}`}>{leadTier.name}</p>
                  <p className={`mt-1 text-3xl font-semibold ${theme.heading}`}>
                    {leadTier.price === 0 ? "Free" : `$${leadTier.price}/mo`}
                  </p>
                  <p className={`mt-1 text-sm ${theme.body}`}>{leadTier.description ?? "Pricing locks in at launch."}</p>
                </div>
                <ul className="mt-3 space-y-2">
                  {leadTier.features.slice(0, 3).map((feature) => (
                    <li key={feature} className={`rounded-lg border px-3 py-2 text-sm ${theme.softChip}`}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          ) : null}

          {layout === "spotlight" ? (
            <div className={`rounded-[1.4rem] border p-5 sm:p-7 ${theme.panel}`}>
              <div className="mx-auto max-w-4xl text-center">
                <p className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${theme.chip}`}>
                  {variant.figmaName}
                </p>
                <h1 className={`mx-auto mt-5 max-w-3xl text-[clamp(2rem,8vw,3.8rem)] font-semibold tracking-[-0.04em] md:leading-[1.02] ${theme.heading}`}>
                  {config.hero.headline}
                </h1>
                <p className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg ${theme.body}`}>{config.hero.subheadline}</p>
                <div className="mx-auto mt-6 max-w-xl">
                  <TemplateInlineWaitlistForm
                    inputId={`${variant.slug}-email`}
                    buttonLabel={config.hero.cta}
                    mode={theme.formMode}
                    placeholder="team@company.com"
                  />
                </div>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className={`rounded-xl border p-4 ${theme.subtlePanel}`}>
                    <p className={`text-2xl font-semibold ${theme.heading}`}>{stat.value}</p>
                    <p className={`mt-1 text-xs ${theme.body}`}>{stat.label}</p>
                  </div>
                ))}
                {quote ? (
                  <blockquote className={`rounded-xl border p-4 md:col-span-3 ${theme.subtlePanel}`}>
                    <p className={`text-sm sm:text-base ${theme.body}`}>&quot;{quote.text}&quot;</p>
                    <footer className={`mt-2 text-xs ${theme.muted}`}>
                      {quote.author}
                      {quote.role ? `, ${quote.role}` : ""}
                    </footer>
                  </blockquote>
                ) : null}
              </div>
            </div>
          ) : null}

          {layout === "checklist" ? (
            <div className={`grid gap-5 rounded-[1.4rem] border p-5 md:grid-cols-[0.95fr_1.05fr] md:p-7 ${theme.panel}`}>
              <aside className={`rounded-2xl border p-4 sm:p-5 ${theme.subtlePanel}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.muted}`}>Build for</p>
                <p className={`mt-2 text-base font-semibold ${theme.heading}`}>{config.framework.buyerPersona}</p>
                <p className={`mt-3 text-sm ${theme.body}`}>{config.framework.corePain}</p>
                <div className={`mt-4 rounded-xl border px-4 py-3 ${theme.softChip}`}>
                  <p className="text-xs uppercase tracking-wide">Distribution channel</p>
                  <p className="mt-1 text-sm font-medium">{config.framework.channel}</p>
                </div>
                <div className={`mt-3 rounded-xl border px-4 py-3 ${theme.softChip}`}>
                  <p className="text-xs uppercase tracking-wide">Current phase</p>
                  <p className="mt-1 text-lg font-semibold">0{config.framework.phase}</p>
                </div>
              </aside>

              <div>
                <p className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${theme.chip}`}>
                  {variant.figmaName}
                </p>
                <h1 className={`mt-5 max-w-3xl text-[clamp(2rem,8vw,3.5rem)] font-semibold tracking-[-0.04em] md:leading-[1.03] ${theme.heading}`}>
                  {config.hero.headline}
                </h1>
                <div className="mt-5 max-w-xl">
                  <TemplateInlineWaitlistForm
                    inputId={`${variant.slug}-email`}
                    buttonLabel={config.hero.cta}
                    mode={theme.formMode}
                    placeholder="founder@startup.com"
                  />
                </div>

                <ul className="mt-6 space-y-2">
                  {highlightedFeatures.map((feature) => (
                    <li key={feature.title} className={`rounded-xl border px-4 py-3 ${theme.softChip}`}>
                      <p className="text-sm font-semibold">{feature.title}</p>
                      <p className="mt-1 text-sm">{feature.description}</p>
                    </li>
                  ))}
                </ul>

                <div className={`mt-5 rounded-xl border p-4 ${theme.subtlePanel}`}>
                  <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.muted}`}>Launch offer</p>
                  <p className={`mt-1 text-xl font-semibold ${theme.heading}`}>
                    {fallbackTier.name}: {fallbackTier.price === 0 ? "Free" : `$${fallbackTier.price}/mo`}
                  </p>
                  <p className={`mt-1 text-sm ${theme.body}`}>{fallbackTier.description ?? "Perfect for proving demand quickly."}</p>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <footer className={`mt-5 flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-medium uppercase tracking-[0.14em] ${theme.muted}`}>
          <span>
            {variant.name} • {variant.figmaName}
          </span>
          <span>Fully coded route (no static screenshot)</span>
        </footer>
      </div>
    </main>
  );
}

function getVariantNumber(slug: string): number {
  const parts = slug.split("-");
  const candidate = parts[parts.length - 1];
  const parsed = Number.parseInt(candidate ?? "", 10);
  return Number.isNaN(parsed) ? 1 : parsed;
}
