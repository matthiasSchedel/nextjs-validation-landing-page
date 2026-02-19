import { notFound } from "next/navigation";

import { ClassicSaasTemplate } from "@/components/templates/ClassicSaasTemplate";
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

  if (variant.slug === "classic-saas") {
    return <ClassicSaasTemplate />;
  }

  return <TemplatePlaceholder variant={variant} />;
}
