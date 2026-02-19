interface SocialStat {
  value: string;
  label: string;
}

interface SocialQuote {
  text: string;
  author: string;
  role?: string;
}

interface SocialProofProps {
  stats: SocialStat[];
  quotes: SocialQuote[];
}

export function SocialProof({ stats, quotes }: SocialProofProps): JSX.Element {
  return (
    <section className="border-y border-border bg-muted/40 py-14 md:py-18">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-background p-5">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {quotes.map((quote) => (
            <blockquote key={`${quote.author}-${quote.text}`} className="rounded-lg border border-border bg-background p-5">
              <p className="text-sm leading-relaxed text-foreground/85">"{quote.text}"</p>
              <footer className="mt-4 text-sm font-semibold">
                {quote.author}
                {quote.role ? <span className="ml-2 font-normal text-foreground/70">{quote.role}</span> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
