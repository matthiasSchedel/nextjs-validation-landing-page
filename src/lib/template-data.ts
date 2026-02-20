import { config, type SaasConfig } from "@/lib/config";

type SocialProof = NonNullable<SaasConfig["socialProof"]>;

export type TemplateFeature = SaasConfig["features"][number];
export type TemplatePricingTier = SaasConfig["pricing"]["tiers"][number];
export type TemplateStat = SocialProof["stats"][number];
export type TemplateQuote = SocialProof["quotes"][number];

export function getTemplateFeatures(limit: number, start = 0): TemplateFeature[] {
  const boundedLimit = Math.max(0, limit);
  const boundedStart = Math.max(0, start);
  return config.features.slice(boundedStart, boundedStart + boundedLimit);
}

export function getTemplateStats(limit: number): TemplateStat[] {
  const boundedLimit = Math.max(0, limit);
  return config.socialProof?.stats.slice(0, boundedLimit) ?? [];
}

export function getTemplateQuotes(): TemplateQuote[] {
  return config.socialProof?.quotes ?? [];
}

export function getTemplateQuote(index = 0): TemplateQuote | undefined {
  const quotes = getTemplateQuotes();
  if (quotes.length === 0) {
    return undefined;
  }

  const boundedIndex = Math.max(0, index);
  return quotes[boundedIndex];
}

export function getPrimaryPricingTier(): TemplatePricingTier {
  return config.pricing.tiers.find((tier) => tier.highlighted) ?? config.pricing.tiers[0];
}

export function getSecondaryPricingTier(primaryTier = getPrimaryPricingTier()): TemplatePricingTier {
  return config.pricing.tiers.find((tier) => tier !== primaryTier) ?? config.pricing.tiers[0];
}

export function getSignedUpText(fallback = "4.5k people signed up"): string {
  const firstStatValue = config.socialProof?.stats[0]?.value;
  return firstStatValue ? `${firstStatValue} people signed up` : fallback;
}
