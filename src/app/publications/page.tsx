import type { Metadata } from "next";
import { Suspense } from "react";
import { PublicationsExplorer } from "@/components/publications-explorer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Publications",
  description: `Peer-reviewed publications, books, and proceedings by ${siteConfig.name}.`,
};

export default function PublicationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Publications
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Research output
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Filter by year, venue type, and keyword. Sort by year, title, or venue — all
          processing happens in your browser for snappy interactions.
        </p>
      </header>
      <div className="mt-12">
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading publications...</div>}>
          <PublicationsExplorer />
        </Suspense>
      </div>
    </div>
  );
}
