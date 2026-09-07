"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type SortKey = "date" | "title";

export function BlogExplorer({
  posts,
  categories,
}: {
  posts: BlogPostMeta[];
  categories: string[];
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("date");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (featuredOnly && !p.featured) return false;
      if (cat !== "all" && p.category !== cat) return false;
      if (!ql) return true;
      const blob =
        `${p.title} ${p.description} ${p.category}`.toLowerCase();
      return blob.includes(ql);
    });
  }, [posts, q, cat, featuredOnly]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sort === "date")
        cmp = +new Date(a.date) - +new Date(b.date);
      else cmp = a.title.localeCompare(b.title);
      return dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sort, dir]);

  const featured = useMemo(
    () => posts.filter((p) => p.featured),
    [posts],
  );

  return (
    <div className="space-y-10">
      {featured.length > 0 ? (
        <section aria-labelledby="featured-posts">
          <h2 id="featured-posts" className="font-display text-2xl font-bold">
            Featured
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {featured.map((p) => (
              <Card
                key={p.slug}
                className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent"
              >
                <CardHeader>
                  <Badge variant="accent">Featured</Badge>
                  <CardTitle className="text-lg">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="hover:text-accent"
                    >
                      {p.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(p.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Browse posts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium" htmlFor="blog-search">
              Search
            </label>
            <Input
              id="blog-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title or description…"
              aria-controls="blog-results"
            />
          </div>
          <div className="space-y-2">
            <span id="cat-label" className="text-sm font-medium">
              Category
            </span>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger aria-labelledby="cat-label">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Featured</span>
            <Select
              value={featuredOnly ? "yes" : "no"}
              onValueChange={(v) => setFeaturedOnly(v === "yes")}
            >
              <SelectTrigger aria-label="Filter featured posts">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">All posts</SelectItem>
                <SelectItem value="yes">Featured only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 lg:col-span-2">
            <span className="text-sm font-medium">Sort</span>
            <div className="flex gap-2">
              <Select
                value={sort}
                onValueChange={(v) => setSort(v as SortKey)}
              >
                <SelectTrigger className="flex-1" aria-label="Sort blog posts">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
                aria-label="Toggle sort direction"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ul
        id="blog-results"
        className="space-y-4"
        aria-live="polite"
      >
        <li className="text-sm text-muted-foreground">
          Showing <strong>{sorted.length}</strong> posts
        </li>
        {sorted.map((p) => (
          <li key={p.slug}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{p.category}</Badge>
                    {p.featured ? (
                      <Badge variant="accent">Featured</Badge>
                    ) : null}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="hover:text-accent"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(p.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {p.readingTime ? ` · ${p.readingTime}` : ""}
                  </p>
                </div>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Read post
                </Link>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
