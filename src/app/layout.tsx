import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PersonJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const base = siteConfig.url;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1018" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${siteConfig.name} · ${siteConfig.university}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "psychology",
    "Gulu University",
    "research",
    "teaching",
    "community psychology",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.name, url: base }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: base,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.heroImage,
        width: 1200,
        height: 900,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.description,
    images: [siteConfig.heroImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: base },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${space.variable} min-h-screen font-sans`}
      >
        <PersonJsonLd />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
