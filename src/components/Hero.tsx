import Image from "next/image";

interface HeroProps {
  badge?: string;
  headline: string;
  subheadline: string;
  cta: string;
  ctaSecondary?: string;
  ctaSecondaryUrl?: string;
  image: string;
}

export function Hero({
  badge,
  headline,
  subheadline,
  cta,
  ctaSecondary,
  ctaSecondaryUrl,
  image
}: HeroProps): JSX.Element {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-12 pt-16 md:grid-cols-2 md:items-center md:pb-20 md:pt-24">
      <div>
        {badge ? (
          <p className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {badge}
          </p>
        ) : null}
        <h1 className="max-w-xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{headline}</h1>
        <p className="mt-5 max-w-xl text-base text-foreground/75 md:text-lg">{subheadline}</p>
        <div className="mt-8 flex items-center gap-5">
          <a
            href="#waitlist"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {cta}
          </a>
          {ctaSecondary && ctaSecondaryUrl ? (
            <a href={ctaSecondaryUrl} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
              {ctaSecondary}
            </a>
          ) : null}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
          <Image
            src={image}
            alt="Product preview"
            width={1280}
            height={960}
            priority
            className="h-auto w-full"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
