import Image from "next/image";
import Link from "next/link";

import { config } from "@/lib/config";

import { MinimalMobileLightWaitlistForm } from "./MinimalMobileLightWaitlistForm";

function signedUpText(): string {
  const firstStat = config.socialProof?.stats[0]?.value;
  return firstStat ? `${firstStat} people signed up` : "4.5k people signed up";
}

export function MinimalMobileLightTemplate(): JSX.Element {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f7fb] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-44 top-10 h-[360px] w-[360px] rounded-full bg-white/80 blur-2xl" />
        <div className="absolute -right-28 top-24 h-[260px] w-[260px] rounded-full bg-white/70 blur-2xl" />
        <div className="absolute -bottom-28 left-8 h-[280px] w-[280px] rounded-full bg-white/70 blur-2xl" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#d9deea] bg-white text-sm font-semibold">✓</span>
          <span className="text-sm font-semibold tracking-wide">{config.meta.title}</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-xl border border-[#e2e6ef] bg-white px-4 py-2 text-sm text-[#374151]">Mobile Light</button>
          <button className="rounded-xl bg-[#5B87FF] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(91,135,255,0.28)]">
            Buy $5
          </button>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 pb-14 pt-6 md:grid-cols-2 md:items-center md:gap-16 md:px-10 md:pb-20 md:pt-10">
        <div className="order-2 flex justify-center md:order-1">
          <div className="w-full max-w-md md:max-w-lg">
            <Image
              src="/images/templates/minimal-mobile-phone.svg"
              alt="Mobile analytics preview"
              width={760}
              height={980}
              priority
              className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.14)]"
              sizes="(min-width: 1024px) 42vw, (min-width: 768px) 45vw, 88vw"
            />
          </div>
        </div>

        <div className="order-1 md:order-2">
          <p className="inline-flex rounded-full border border-[#dfe5f4] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5B87FF]">
            {config.hero.badge ? config.hero.badge : "Coming soon"}
          </p>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[#0B1020] md:text-6xl">
            {config.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-[#5f6473]">{config.hero.subheadline}</p>

          <div className="mt-8 max-w-xl">
            <MinimalMobileLightWaitlistForm />
          </div>

          <div className="mt-5 flex items-center gap-4 text-[#656b7a]">
            <div className="flex -space-x-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#cfd8ee] text-[10px] font-semibold text-[#1f2937]">
                AL
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#d6e7ff] text-[10px] font-semibold text-[#1f2937]">
                JM
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#fce5d8] text-[10px] font-semibold text-[#1f2937]">
                KS
              </span>
            </div>
            <p className="text-lg">{signedUpText()}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
