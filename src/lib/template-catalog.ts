import { figmaReferenceVariants } from "./figma-reference";

export const FIGMA_REFERENCE_URL =
  "https://www.figma.com/design/CyQvPi7MVFJwzs7PNy4eck/SaaS-Waitlist-Landing-Page-Examples--Community-?node-id=0-1&p=f&t=UWQO6cUIIVGnch3g-0";
export const GITHUB_REPO_URL = "https://github.com/matthiasSchedel/nextjs-validation-landing-page";

export interface TemplateVariant {
  slug: string;
  name: string;
  description: string;
  implemented: boolean;
}

const figmaTemplateVariants: TemplateVariant[] = figmaReferenceVariants.map((variant) => ({
  slug: variant.slug,
  name: variant.name,
  description: `${variant.figmaName} as a real coded one-pager variant.`,
  implemented: true
}));

export const templateVariants: TemplateVariant[] = [
  {
    slug: "minimal-mobile-light",
    name: "Minimal Mobile Light",
    description: "Clean one-pager with floating phone mockup and inline waitlist capture.",
    implemented: true
  },
  {
    slug: "classic-saas",
    name: "Classic SaaS",
    description: "Multi-section validation landing page with features, social proof, and pricing.",
    implemented: true
  },
  ...figmaTemplateVariants
];

export function getTemplateVariant(slug: string): TemplateVariant | undefined {
  return templateVariants.find((variant) => variant.slug === slug);
}

export function getTemplatePath(slug: string): string {
  return `/templates/${slug}`;
}
