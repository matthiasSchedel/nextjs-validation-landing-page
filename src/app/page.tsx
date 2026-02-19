import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { SocialProof } from "@/components/SocialProof";
import { WaitlistForm } from "@/components/WaitlistForm";
import { config } from "@/lib/config";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Navbar title={config.meta.title} cta={config.hero.cta} />
      <main>
        <Hero
          badge={config.hero.badge}
          headline={config.hero.headline}
          subheadline={config.hero.subheadline}
          cta={config.hero.cta}
          ctaSecondary={config.hero.ctaSecondary}
          ctaSecondaryUrl={config.hero.ctaSecondaryUrl}
          image={config.hero.image}
        />
        <Features title={`Why teams choose ${config.meta.title}`} features={config.features} />
        {config.socialProof ? <SocialProof stats={config.socialProof.stats} quotes={config.socialProof.quotes} /> : null}
        <Pricing headline={config.pricing.headline} subheadline={config.pricing.subheadline} tiers={config.pricing.tiers} />
        <WaitlistForm title={config.meta.title} buttonLabel={config.hero.cta} />
      </main>
      <Footer title={config.meta.title} twitterHandle={config.meta.twitterHandle} />
    </>
  );
}
