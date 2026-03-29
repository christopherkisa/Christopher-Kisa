import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { ResearchHighlights } from "@/components/research-highlights";
import { publications } from "@/lib/publications-data";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const latestPubs = [...publications]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <HomeHero />
      <ResearchHighlights />
      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
        aria-labelledby="latest-pubs-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="latest-pubs-heading"
              className="font-display text-3xl font-bold tracking-tight"
            >
              Latest publications
            </h2>
            <p className="mt-1 text-muted-foreground">
              Recent peer-reviewed work — explore the full list with live filters.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/publications">All publications</Link>
          </Button>
        </div>
        <ul className="mt-8 space-y-4">
          {latestPubs.map((p) => (
            <li key={p.id}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-wrap items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.authors}</p>
                    <p className="mt-1 text-sm font-medium">
                      {p.venue} · {p.year}
                    </p>
                  </div>
                  <Badge variant="accent">{p.type}</Badge>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="border-t border-border/80 bg-secondary/25 py-16"
        aria-labelledby="blog-preview-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                id="blog-preview-heading"
                className="font-display text-3xl font-bold tracking-tight"
              >
                From the blog
              </h2>
              <p className="mt-1 text-muted-foreground">
                Notes on teaching, methods, and field work — published as MDX.
              </p>
            </div>
            <Button asChild variant="accent">
              <Link href="/blog">Visit blog</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="h-full border-border/80">
                <CardHeader>
                  <Badge variant="secondary">{post.category}</Badge>
                  <CardTitle className="text-xl">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Card className="border-accent/30 bg-gradient-to-r from-primary/5 via-background to-accent/5">
          <CardContent className="flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Collaborate with {siteConfig.name.split(" ")[0]}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Guest lectures, joint grants, graduate supervision, and community projects —
                reach out with a short outline of your idea.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/contact">Schedule a conversation</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
