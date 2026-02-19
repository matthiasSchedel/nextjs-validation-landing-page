import { notFound } from "next/navigation";

import { ClassicSaasTemplate } from "@/components/templates/ClassicSaasTemplate";
import { FigmaExample03Template } from "@/components/templates/FigmaExample03Template";
import { FigmaExample04Template } from "@/components/templates/FigmaExample04Template";
import { FigmaExample05Template } from "@/components/templates/FigmaExample05Template";
import { FigmaExample06Template } from "@/components/templates/FigmaExample06Template";
import { FigmaExample07Template } from "@/components/templates/FigmaExample07Template";
import { FigmaExample08Template } from "@/components/templates/FigmaExample08Template";
import { MinimalMobileLightTemplate } from "@/components/templates/MinimalMobileLightTemplate";
import { TemplatePlaceholder } from "@/components/templates/TemplatePlaceholder";
import { getTemplateVariant, templateVariants } from "@/lib/template-catalog";

interface TemplatePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams(): Array<{ slug: string }> {
  return templateVariants.map((variant) => ({ slug: variant.slug }));
}

export default function TemplatePage({ params }: TemplatePageProps): JSX.Element {
  const variant = getTemplateVariant(params.slug);

  if (!variant) {
    notFound();
  }

  if (variant.slug === "minimal-mobile-light") {
    return <MinimalMobileLightTemplate />;
  }

  if (variant.slug === "classic-saas") {
    return <ClassicSaasTemplate />;
  }

  if (variant.slug === "figma-example-03") {
    return <FigmaExample03Template />;
  }

  if (variant.slug === "figma-example-04") {
    return <FigmaExample04Template />;
  }

  if (variant.slug === "figma-example-05") {
    return <FigmaExample05Template />;
  }

  if (variant.slug === "figma-example-06") {
    return <FigmaExample06Template />;
  }

  if (variant.slug === "figma-example-07") {
    return <FigmaExample07Template />;
  }

  if (variant.slug === "figma-example-08") {
    return <FigmaExample08Template />;
  }

  return <TemplatePlaceholder variant={variant} />;
}
