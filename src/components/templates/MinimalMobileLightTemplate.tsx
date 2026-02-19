import Image from "next/image";
import Link from "next/link";

import { config } from "@/lib/config";

import { MinimalMobileLightWaitlistForm } from "./MinimalMobileLightWaitlistForm";

const socialAvatars = [
  "/images/templates/avatar-01.svg",
  "/images/templates/avatar-02.svg",
  "/images/templates/avatar-03.svg"
];

function signedUpText(): string {
  const firstStat = config.socialProof?.stats[0]?.value;
  return firstStat ? `${firstStat} people signed up` : "4.5k people signed up";
}

export function MinimalMobileLightTemplate(): JSX.Element {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f4f7] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-white/80 blur-3xl" />
        <div className="absolute -right-44 top-[-5rem] h-[24rem] w-[24rem] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-[24rem] w-[24rem] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-[20rem] w-[20rem] rounded-full bg-white/65 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-[1300px] items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <Link href="/" className="inline-flex items-center gap-2" aria-label={`${config.meta.title} gallery`}>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9deea] bg-white text-sm font-semibold shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
            ✓
          </span>
          <span className="sr-only">{config.meta.title}</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden rounded-xl border border-[#e2e6ef] bg-white px-3 py-2 text-sm text-[#374151] shadow-[0_8px_18px_rgba(15,23,42,0.06)] md:inline-flex">
            Mobile Light
          </button>
          <button className="rounded-xl bg-[#5B87FF] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(91,135,255,0.3)]">
            Buy $5
          </button>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-104px)] w-full max-w-[1300px] items-center gap-10 px-6 pb-14 pt-8 md:grid-cols-2 md:gap-8 md:px-10 md:pb-24 md:pt-0">
        <div className="order-2 hidden justify-center md:order-1 md:flex">
          <div className="w-full max-w-[29rem]">
            <Image
              src="/images/templates/minimal-mobile-phone.svg"
              alt="Mobile analytics preview"
              width={760}
              height={980}
              priority
              className="h-auto w-full drop-shadow-[0_48px_62px_rgba(0,0,0,0.16)]"
              sizes="(min-width: 1200px) 33rem, (min-width: 768px) 42vw, 80vw"
            />
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[35rem] md:order-2 md:mx-0">
          <p className="inline-flex rounded-full border border-[#dfe5f4] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5B87FF]">
            {config.hero.badge ? config.hero.badge : "Coming soon"}
          </p>
          <h1 className="mt-6 max-w-xl text-[2.2rem] font-medium leading-[1.05] tracking-[-0.03em] text-[#0B1020] md:text-[4.1rem]">
            {config.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5f6473] md:text-[1.75rem] md:leading-[1.35]">
            {config.hero.subheadline}
          </p>

          <div className="mt-8 max-w-[28rem]">
            <MinimalMobileLightWaitlistForm />
          </div>

          <div className="mt-5 flex items-center gap-4 text-[#656b7a]">
            <div className="flex -space-x-2">
              {socialAvatars.map((avatar) => (
                <Image
                  key={avatar}
                  src={avatar}
                  alt="Customer avatar"
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] rounded-full border-2 border-white object-cover shadow-[0_4px_8px_rgba(15,23,42,0.08)]"
                />
              ))}
            </div>
            <p className="text-base md:text-xl">{signedUpText()}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
