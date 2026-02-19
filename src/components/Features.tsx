import Image from "next/image";

interface Feature {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

interface FeaturesProps {
  title: string;
  features: Feature[];
}

export function Features({ title, features }: FeaturesProps): JSX.Element {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-xl border border-border bg-background p-5 shadow-sm">
            {feature.image ? (
              <Image
                src={feature.image}
                alt={feature.title}
                width={160}
                height={120}
                className="mb-4 h-12 w-12 rounded-md object-cover"
              />
            ) : (
              <div className="mb-4 text-2xl" aria-hidden>
                {feature.icon ?? "\u2728"}
              </div>
            )}
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-foreground/75">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
