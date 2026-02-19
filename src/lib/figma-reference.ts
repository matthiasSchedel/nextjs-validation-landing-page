export interface FigmaReferenceVariant {
  slug: string;
  name: string;
  figmaName: string;
  nodeId: string;
  width: number;
  height: number;
  imageSrc: string;
}

export const figmaReferenceVariants: FigmaReferenceVariant[] = [
  {
    slug: "figma-example-01",
    name: "Figma Example 01",
    figmaName: "Waitlist Landing Page 01",
    nodeId: "22:3",
    width: 1440,
    height: 839,
    imageSrc: "/images/templates/figma/figma-example-01.png"
  },
  {
    slug: "figma-example-02",
    name: "Figma Example 02",
    figmaName: "Waitlist Landing Page 02",
    nodeId: "23:101",
    width: 958,
    height: 660,
    imageSrc: "/images/templates/figma/figma-example-02.png"
  },
  {
    slug: "figma-example-03",
    name: "Figma Example 03",
    figmaName: "Waitlist Landing Page 03",
    nodeId: "23:124",
    width: 1028,
    height: 756,
    imageSrc: "/images/templates/figma/figma-example-03.png"
  },
  {
    slug: "figma-example-04",
    name: "Figma Example 04",
    figmaName: "Waitlist Landing Page 04",
    nodeId: "23:123",
    width: 1200,
    height: 644,
    imageSrc: "/images/templates/figma/figma-example-04.png"
  },
  {
    slug: "figma-example-05",
    name: "Figma Example 05",
    figmaName: "Waitlist Landing Page 05",
    nodeId: "22:6",
    width: 1440,
    height: 959,
    imageSrc: "/images/templates/figma/figma-example-05.png"
  },
  {
    slug: "figma-example-06",
    name: "Figma Example 06",
    figmaName: "Waitlist Landing Page 06",
    nodeId: "23:121",
    width: 992,
    height: 636,
    imageSrc: "/images/templates/figma/figma-example-06.png"
  },
  {
    slug: "figma-example-07",
    name: "Figma Example 07",
    figmaName: "Waitlist Landing Page 07",
    nodeId: "23:119",
    width: 904,
    height: 615,
    imageSrc: "/images/templates/figma/figma-example-07.png"
  },
  {
    slug: "figma-example-08",
    name: "Figma Example 08",
    figmaName: "Waitlist Landing Page 08",
    nodeId: "23:122",
    width: 868,
    height: 650,
    imageSrc: "/images/templates/figma/figma-example-08.png"
  },
  {
    slug: "figma-example-09",
    name: "Figma Example 09",
    figmaName: "Waitlist Landing Page 09",
    nodeId: "2001:12",
    width: 891,
    height: 471,
    imageSrc: "/images/templates/figma/figma-example-09.png"
  },
  {
    slug: "figma-example-10",
    name: "Figma Example 10",
    figmaName: "Waitlist Landing Page 10",
    nodeId: "23:107",
    width: 916,
    height: 645,
    imageSrc: "/images/templates/figma/figma-example-10.png"
  },
  {
    slug: "figma-example-11",
    name: "Figma Example 11",
    figmaName: "Waitlist Landing Page 11",
    nodeId: "2001:10",
    width: 996,
    height: 664,
    imageSrc: "/images/templates/figma/figma-example-11.png"
  },
  {
    slug: "figma-example-12",
    name: "Figma Example 12",
    figmaName: "Waitlist Landing Page 12",
    nodeId: "23:102",
    width: 1400,
    height: 767,
    imageSrc: "/images/templates/figma/figma-example-12.png"
  },
  {
    slug: "figma-example-13",
    name: "Figma Example 13",
    figmaName: "Waitlist Landing Page 13",
    nodeId: "2001:2",
    width: 1086,
    height: 724,
    imageSrc: "/images/templates/figma/figma-example-13.png"
  },
  {
    slug: "figma-example-14",
    name: "Figma Example 14",
    figmaName: "Waitlist Landing Page 14",
    nodeId: "2007:94",
    width: 1394,
    height: 867,
    imageSrc: "/images/templates/figma/figma-example-14.png"
  },
  {
    slug: "figma-example-15",
    name: "Figma Example 15",
    figmaName: "Waitlist Landing Page 15",
    nodeId: "23:105",
    width: 1920,
    height: 992,
    imageSrc: "/images/templates/figma/figma-example-15.png"
  },
  {
    slug: "figma-example-16",
    name: "Figma Example 16",
    figmaName: "Waitlist Landing Page 16",
    nodeId: "23:120",
    width: 1200,
    height: 817,
    imageSrc: "/images/templates/figma/figma-example-16.png"
  },
  {
    slug: "figma-example-17",
    name: "Figma Example 17",
    figmaName: "Waitlist Landing Page 17",
    nodeId: "23:92",
    width: 1238,
    height: 832,
    imageSrc: "/images/templates/figma/figma-example-17.png"
  },
  {
    slug: "figma-example-18",
    name: "Figma Example 18",
    figmaName: "Waitlist Landing Page 18",
    nodeId: "23:100",
    width: 1074,
    height: 672,
    imageSrc: "/images/templates/figma/figma-example-18.png"
  },
  {
    slug: "figma-example-19",
    name: "Figma Example 19",
    figmaName: "Waitlist Landing Page 19",
    nodeId: "23:126",
    width: 908,
    height: 578,
    imageSrc: "/images/templates/figma/figma-example-19.png"
  },
  {
    slug: "figma-example-20",
    name: "Figma Example 20",
    figmaName: "Waitlist Landing Page 20",
    nodeId: "2001:4",
    width: 1034,
    height: 752,
    imageSrc: "/images/templates/figma/figma-example-20.png"
  }
];

const figmaVariantBySlug = new Map(
  figmaReferenceVariants.map((variant) => [variant.slug, variant] as const)
);

export function getFigmaReferenceVariant(slug: string): FigmaReferenceVariant | undefined {
  return figmaVariantBySlug.get(slug);
}

export function isFigmaReferenceSlug(slug: string): boolean {
  return figmaVariantBySlug.has(slug);
}
