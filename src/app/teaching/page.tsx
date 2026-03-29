import type { Metadata } from "next";
import { CoursesExplorer } from "@/components/courses-explorer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Teaching",
  description: `Courses taught by ${siteConfig.name} at ${siteConfig.university}.`,
};

export default function TeachingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Teaching
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Courses &amp; syllabi
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Current and archived offerings with searchable cards. Syllabus links point to
          sample paths — replace with hosted PDFs or your LMS.
        </p>
      </header>
      <div className="mt-12">
        <CoursesExplorer />
      </div>
    </div>
  );
}
