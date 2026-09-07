import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      authors: [siteConfig.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <nav aria-label="Breadcrumb">
        <Button variant="ghost" asChild className="-ml-2 mb-8 h-auto px-2 py-1">
          <Link href="/blog">← Back to blog</Link>
        </Button>
      </nav>
      <article>
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{meta.category}</Badge>
            {meta.featured ? <Badge variant="accent">Featured</Badge> : null}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{meta.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            <time dateTime={meta.date}>
              {new Date(meta.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {meta.readingTime ? ` · ${meta.readingTime}` : ""}
          </p>
        </header>
        <div className="py-10">
          <MdxContent source={content} />
        </div>
      </article>
    </div>
  );
}
