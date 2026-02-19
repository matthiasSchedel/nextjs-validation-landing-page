export const FIGMA_REFERENCE_URL =
  "https://www.figma.com/design/CyQvPi7MVFJwzs7PNy4eck/SaaS-Waitlist-Landing-Page-Examples--Community-?node-id=0-1&p=f&t=UWQO6cUIIVGnch3g-0";

export interface TemplateVariant {
  slug: string;
  name: string;
  description: string;
  implemented: boolean;
}

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
  {
    slug: "figma-example-03",
    name: "Figma Example 03",
    description: "Placeholder route ready for implementation.",
    implemented: false
  },
  {
    slug: "figma-example-04",
    name: "Figma Example 04",
    description: "Placeholder route ready for implementation.",
    implemented: false
  },
  {
    slug: "figma-example-05",
    name: "Figma Example 05",
    description: "Placeholder route ready for implementation.",
    implemented: false
  },
  {
    slug: "figma-example-06",
    name: "Figma Example 06",
    description: "Placeholder route ready for implementation.",
    implemented: false
  },
  {
    slug: "figma-example-07",
    name: "Figma Example 07",
    description: "Placeholder route ready for implementation.",
    implemented: false
  },
  {
    slug: "figma-example-08",
    name: "Figma Example 08",
    description: "Placeholder route ready for implementation.",
    implemented: false
  }
];

export function getTemplateVariant(slug: string): TemplateVariant | undefined {
  return templateVariants.find((variant) => variant.slug === slug);
}
