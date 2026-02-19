interface PricingTier {
  name: string;
  price: number;
  description?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

interface PricingProps {
  headline: string;
  subheadline?: string;
  tiers: PricingTier[];
}

export function Pricing({ headline, subheadline, tiers }: PricingProps): JSX.Element {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{headline}</h2>
      {subheadline ? <p className="mt-3 text-foreground/75">{subheadline}</p> : null}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const isPaid = tier.price > 0;
          return (
            <article
              key={tier.name}
              className={`flex h-full flex-col rounded-xl border bg-background p-6 ${tier.highlighted ? "border-primary shadow-lg" : "border-border"}`}
            >
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-2 text-3xl font-bold">
                {tier.price === 0 ? "Free" : `$${tier.price}`}
                {tier.price > 0 ? <span className="ml-1 text-sm font-normal text-foreground/60">/month</span> : null}
              </p>
              {tier.description ? <p className="mt-3 text-sm text-foreground/75">{tier.description}</p> : null}

              <ul className="mt-5 flex-1 space-y-2 text-sm text-foreground/85">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-[2px] text-primary">\u2713</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border bg-background hover:border-primary"
                }`}
              >
                {tier.cta}
              </a>

              {isPaid ? <p className="mt-3 text-xs text-foreground/65">Pricing locks in at launch.</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
