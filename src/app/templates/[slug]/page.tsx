import { notFound } from "next/navigation";

import { ClassicSaasTemplate } from "@/components/templates/ClassicSaasTemplate";
import { FigmaExample03Template } from "@/components/templates/FigmaExample03Template";
import { FigmaExample04Template } from "@/components/templates/FigmaExample04Template";
import { FigmaExample05Template } from "@/components/templates/FigmaExample05Template";
import { FigmaExample06Template } from "@/components/templates/FigmaExample06Template";
import { FigmaExample07Template } from "@/components/templates/FigmaExample07Template";
import { FigmaExample08Template } from "@/components/templates/FigmaExample08Template";
import { FigmaReferenceTemplate } from "@/components/templates/FigmaReferenceTemplate";
import { MinimalMobileLightTemplate } from "@/components/templates/MinimalMobileLightTemplate";
import { TemplatePlaceholder } from "@/components/templates/TemplatePlaceholder";
import { isFigmaReferenceSlug } from "@/lib/figma-reference";
import { getTemplateVariant, templateVariants } from "@/lib/template-catalog";

interface TemplatePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams(): Array<{ slug: string }> {
  return templateVariants.map((variant) => ({ slug: variant.slug }));
}

const DIRECT_TEMPLATE_RENDERERS: Record<string, () => JSX.Element> = {
  "minimal-mobile-light": () => <MinimalMobileLightTemplate />,
  "classic-saas": () => <ClassicSaasTemplate />,
  "figma-example-03": () => <FigmaExample03Template />,
  "figma-example-04": () => <FigmaExample04Template />,
  "figma-example-05": () => <FigmaExample05Template />,
  "figma-example-06": () => <FigmaExample06Template />,
  "figma-example-07": () => <FigmaExample07Template />,
  "figma-example-08": () => <FigmaExample08Template />
};

export default function TemplatePage({ params }: TemplatePageProps): JSX.Element {
  const variant = getTemplateVariant(params.slug);

  if (!variant) {
    notFound();
  }

  const renderDirectTemplate = DIRECT_TEMPLATE_RENDERERS[variant.slug];
  if (renderDirectTemplate) {
    return renderDirectTemplate();
  }

  if (isFigmaReferenceSlug(variant.slug)) {
    return <FigmaReferenceTemplate slug={variant.slug} />;
  }

  return <TemplatePlaceholder variant={variant} />;
}
