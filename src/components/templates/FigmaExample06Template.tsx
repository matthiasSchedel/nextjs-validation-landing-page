import Image from "next/image";
import Link from "next/link";

import { config } from "@/lib/config";

import { TemplateInlineWaitlistForm } from "./TemplateInlineWaitlistForm";

export function FigmaExample06Template(): JSX.Element {
  const topStats = config.socialProof?.stats.slice(0, 3) ?? [];
  const topQuote = config.socialProof?.quotes[0];

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-[#0c111d]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-semibold">
          {config.meta.title}
        </Link>
        <a href="#waitlist" className="rounded-lg border border-[#d5dae3] bg-white px-4 py-2 text-sm font-medium">
          Join waitlist
        </a>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-16 pt-4 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-3xl border border-[#dde2ea] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f5f8c]">Current phase</p>
          <p className="mt-2 text-4xl font-semibold text-[#1a2544]">0{config.framework.phase}</p>
          <p className="mt-2 text-sm text-[#58637a]">{config.framework.buyerPersona}</p>

          <div className="mt-6 space-y-3">
            {topStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[#e8ecf3] px-4 py-3">
                <p className="text-2xl font-semibold text-[#14203f]">{stat.value}</p>
                <p className="text-xs text-[#5c6780]">{stat.label}</p>
              </div>
            ))}
          </div>

          {topQuote ? (
            <blockquote className="mt-6 rounded-xl border border-[#e8ecf3] bg-[#f8f9fc] p-4">
              <p className="text-sm text-[#2d3652]">&quot;{topQuote.text}&quot;</p>
              <footer className="mt-2 text-xs text-[#62708f]">
                {topQuote.author}
                {topQuote.role ? `, ${topQuote.role}` : ""}
              </footer>
            </blockquote>
          ) : null}
        </aside>

        <div className="rounded-3xl border border-[#d8dee8] bg-white p-6 shadow-[0_28px_70px_rgba(15,23,42,0.12)] md:p-8">
          <p className="inline-flex rounded-full border border-[#dce2ee] bg-[#f7f9fd] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f5f8c]">
            {config.hero.badge ?? "Soon"}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[#101528] md:text-[3.85rem] md:leading-[1.03]">
            {config.hero.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-[#576077] md:text-xl">{config.hero.subheadline}</p>

          <div id="waitlist" className="mt-8 max-w-xl">
            <TemplateInlineWaitlistForm
              inputId="figma-example-06-email"
              buttonLabel={config.hero.cta}
              placeholder="ops@company.com"
              mode="card"
            />
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#e2e6ef] bg-[#f8fafd] p-3">
            <Image
              src={config.hero.image}
              alt={`${config.meta.title} product snapshot`}
              width={1080}
              height={620}
              className="h-auto w-full rounded-xl border border-white"
              sizes="(min-width: 1024px) 55vw, 92vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
