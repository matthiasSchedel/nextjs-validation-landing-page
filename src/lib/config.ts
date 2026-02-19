import { saasConfig, type SaasConfig } from "../../saas.config";

const FALLBACK_THEME = {
  primaryForeground: "#FFFFFF",
  foreground: "#0F172A",
  muted: "#E2E8F0",
  borderRadius: "0.5rem"
};

function assertNonEmptyString(value: string, label: string): void {
  if (!value.trim()) {
    throw new Error(`Config validation failed: ${label} is required.`);
  }
}

function assertValidHex(value: string, label: string): void {
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
    throw new Error(`Config validation failed: ${label} must be a valid hex color.`);
  }
}

function validateConfig(input: SaasConfig): SaasConfig {
  assertNonEmptyString(input.meta.title, "meta.title");
  assertNonEmptyString(input.meta.description, "meta.description");
  assertNonEmptyString(input.meta.url, "meta.url");
  assertNonEmptyString(input.meta.ogImage, "meta.ogImage");

  assertNonEmptyString(input.hero.headline, "hero.headline");
  assertNonEmptyString(input.hero.subheadline, "hero.subheadline");
  assertNonEmptyString(input.hero.cta, "hero.cta");
  assertNonEmptyString(input.hero.image, "hero.image");

  if (input.features.length === 0) {
    throw new Error("Config validation failed: features must include at least one item.");
  }

  input.features.forEach((feature, index) => {
    assertNonEmptyString(feature.title, `features[${index}].title`);
    assertNonEmptyString(feature.description, `features[${index}].description`);
  });

  assertNonEmptyString(input.pricing.headline, "pricing.headline");
  if (input.pricing.tiers.length === 0 || input.pricing.tiers.length > 3) {
    throw new Error("Config validation failed: pricing.tiers must contain 1 to 3 tiers.");
  }

  input.pricing.tiers.forEach((tier, index) => {
    assertNonEmptyString(tier.name, `pricing.tiers[${index}].name`);
    if (tier.price < 0) {
      throw new Error(`Config validation failed: pricing.tiers[${index}].price must be >= 0.`);
    }
    if (tier.features.length === 0) {
      throw new Error(`Config validation failed: pricing.tiers[${index}].features cannot be empty.`);
    }
    assertNonEmptyString(tier.cta, `pricing.tiers[${index}].cta`);
  });

  assertValidHex(input.theme.primary, "theme.primary");
  assertValidHex(input.theme.background, "theme.background");
  assertNonEmptyString(input.theme.font, "theme.font");

  if (input.socialProof) {
    if (input.socialProof.stats.length === 0) {
      throw new Error("Config validation failed: socialProof.stats cannot be empty when socialProof is set.");
    }
    if (input.socialProof.quotes.length === 0 || input.socialProof.quotes.length > 3) {
      throw new Error("Config validation failed: socialProof.quotes must contain between 1 and 3 quotes.");
    }
  }

  assertNonEmptyString(input.framework.buyerPersona, "framework.buyerPersona");
  assertNonEmptyString(input.framework.corePain, "framework.corePain");
  assertNonEmptyString(input.framework.channel, "framework.channel");

  const resendApiKey = process.env.RESEND_API_KEY ?? input.integrations.resendApiKey;
  const resendAudienceId = process.env.RESEND_AUDIENCE_ID ?? input.integrations.resendAudienceId;

  return {
    ...input,
    integrations: {
      ...input.integrations,
      resendApiKey: resendApiKey.trim(),
      resendAudienceId: resendAudienceId.trim()
    },
    theme: {
      ...input.theme,
      primaryForeground: input.theme.primaryForeground ?? FALLBACK_THEME.primaryForeground,
      foreground: input.theme.foreground ?? FALLBACK_THEME.foreground,
      muted: input.theme.muted ?? FALLBACK_THEME.muted,
      borderRadius: input.theme.borderRadius ?? FALLBACK_THEME.borderRadius
    }
  };
}

export const config = validateConfig(saasConfig);

export type { SaasConfig };
