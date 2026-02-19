import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import {
  Inter,
  Lato,
  Manrope,
  Montserrat,
  Nunito,
  Open_Sans,
  Poppins,
  Roboto
} from "next/font/google";

import { config } from "@/lib/config";
import "@/styles/globals.css";

const interFont = Inter({ subsets: ["latin"], display: "swap" });
const manropeFont = Manrope({ subsets: ["latin"], display: "swap" });
const poppinsFont = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const robotoFont = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const openSansFont = Open_Sans({ subsets: ["latin"], display: "swap" });
const latoFont = Lato({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const montserratFont = Montserrat({ subsets: ["latin"], display: "swap" });
const nunitoFont = Nunito({ subsets: ["latin"], display: "swap" });

function normalizeFontName(input: string): string {
  return input.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
}

const fontClassMap: Record<string, string> = {
  inter: interFont.className,
  manrope: manropeFont.className,
  poppins: poppinsFont.className,
  roboto: robotoFont.className,
  "open sans": openSansFont.className,
  lato: latoFont.className,
  montserrat: montserratFont.className,
  nunito: nunitoFont.className
};

const themeFontClass = fontClassMap[normalizeFontName(config.theme.font)] ?? interFont.className;

const siteDomain = new URL(config.meta.url);

export const metadata: Metadata = {
  metadataBase: siteDomain,
  title: config.meta.title,
  description: config.meta.description,
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    url: config.meta.url,
    images: [config.meta.ogImage]
  },
  twitter: {
    card: "summary_large_image",
    title: config.meta.title,
    description: config.meta.description,
    creator: config.meta.twitterHandle,
    images: [config.meta.ogImage]
  }
};

interface ThemeVariables extends CSSProperties {
  "--color-primary": string;
  "--color-primary-foreground": string;
  "--color-background": string;
  "--color-foreground": string;
  "--color-muted": string;
  "--color-border": string;
  "--radius": string;
}

const themeVariables: ThemeVariables = {
  "--color-primary": config.theme.primary,
  "--color-primary-foreground": config.theme.primaryForeground ?? "#FFFFFF",
  "--color-background": config.theme.background,
  "--color-foreground": config.theme.foreground ?? "#0F172A",
  "--color-muted": config.theme.muted ?? "#E2E8F0",
  "--color-border": config.theme.muted ?? "#CBD5E1",
  "--radius": config.theme.borderRadius ?? "0.5rem"
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" data-theme={config.theme.mode} style={themeVariables}>
      <body className={`${themeFontClass} bg-background text-foreground antialiased`}>{children}</body>
    </html>
  );
}
