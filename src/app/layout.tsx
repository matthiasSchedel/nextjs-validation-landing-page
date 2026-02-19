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

interface LoadedFont {
  className: string;
}

const fontLoaders: Record<string, () => LoadedFont> = {
  inter: () => Inter({ subsets: ["latin"], display: "swap" }),
  manrope: () => Manrope({ subsets: ["latin"], display: "swap" }),
  poppins: () => Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" }),
  roboto: () => Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" }),
  "open sans": () => Open_Sans({ subsets: ["latin"], display: "swap" }),
  lato: () => Lato({ subsets: ["latin"], weight: ["400", "700"], display: "swap" }),
  montserrat: () => Montserrat({ subsets: ["latin"], display: "swap" }),
  nunito: () => Nunito({ subsets: ["latin"], display: "swap" })
};

function normalizeFontName(input: string): string {
  return input.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
}

function getThemeFont(fontName: string): LoadedFont {
  const normalized = normalizeFontName(fontName);
  const selectedLoader = fontLoaders[normalized] ?? fontLoaders.inter;
  return selectedLoader();
}

const themeFont = getThemeFont(config.theme.font);

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
      <body className={`${themeFont.className} bg-background text-foreground antialiased`}>{children}</body>
    </html>
  );
}
