import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog-explorer";
import { getAllPosts, getCategories } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Essays and teaching notes by ${siteConfig.name}.`,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Blog
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Field notes &amp; pedagogy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          MDX-powered posts with categories, featured pieces, and client-side search —
          ideal for academic storytelling without a heavy CMS.
        </p>
      </header>
      <div className="mt-12">
        <BlogExplorer posts={posts} categories={categories} />
      </div>
    </div>
  );
}
