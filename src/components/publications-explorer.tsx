"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PublicationType, Publication } from "@/lib/publications-data";
import { publications, uniquePublicationYears } from "@/lib/publications-data";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";

type SortKey = "year" | "title" | "venue";

function typeLabel(t: PublicationType) {
  if (t === "journal") return "Journal";
  if (t === "conference") return "Conference";
  return "Book";
}

export function PublicationsExplorer({
  initial,
}: {
  initial?: Publication[];
}) {
  const data = initial ?? publications;
  const years = useMemo(() => uniquePublicationYears(), []);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const [year, setYear] = useState<string>(searchParams.get("year") ?? "all");
  const [type, setType] = useState<string>(searchParams.get("type") ?? "all");
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>((searchParams.get("sort") as SortKey) ?? "year");
  const [dir, setDir] = useState<"asc" | "desc">((searchParams.get("dir") as "asc" | "desc") ?? "desc");

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (year !== "all") params.set("year", year);
    else params.delete("year");
    
    if (type !== "all") params.set("type", type);
    else params.delete("type");
    
    if (q) params.set("q", q);
    else params.delete("q");
    
    if (sort !== "year") params.set("sort", sort);
    else params.delete("sort");
    
    if (dir !== "desc") params.set("dir", dir);
    else params.delete("dir");
    
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [year, type, q, sort, dir, router, searchParams]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return data.filter((p) => {
      if (year !== "all" && String(p.year) !== year) return false;
      if (type !== "all" && p.type !== type) return false;
      if (!ql) return true;
      const blob =
        `${p.title} ${p.authors} ${p.venue} ${p.keywords.join(" ")}`.toLowerCase();
      return blob.includes(ql);
    });
  }, [data, year, type, q]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sort === "year") cmp = a.year - b.year;
      else if (sort === "title") cmp = a.title.localeCompare(b.title);
      else cmp = a.venue.localeCompare(b.venue);
      return dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sort, dir]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Filter &amp; sort</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="pub-search">
              Keyword search
            </label>
            <Input
              id="pub-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Title, author, venue, keyword…"
              aria-controls="publications-results"
            />
          </div>
          <div className="space-y-2">
            <span id="year-label" className="text-sm font-medium">
              Year
            </span>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger aria-labelledby="year-label">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All years</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <span id="type-label" className="text-sm font-medium">
              Type
            </span>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger aria-labelledby="type-label">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="journal">Journal articles</SelectItem>
                <SelectItem value="conference">Conference papers</SelectItem>
                <SelectItem value="book">Books &amp; chapters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Sort</span>
            <div className="flex gap-2">
              <Select
                value={sort}
                onValueChange={(v) => setSort(v as SortKey)}
              >
                <SelectTrigger className="flex-1" aria-label="Sort by field">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="venue">Venue</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
                aria-label={`Sort direction: currently ${dir === "asc" ? "ascending" : "descending"}. Toggle.`}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div
        id="publications-results"
        className="space-y-4"
        role="region"
        aria-live="polite"
        aria-label="Filtered publications"
      >
        <p className="text-sm text-muted-foreground">
          Showing <strong>{sorted.length}</strong> of {data.length} entries
        </p>
        <ul className="space-y-4">
          {sorted.map((p) => (
            <li key={p.id}>
              <Card className="transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-display text-lg font-semibold leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{p.authors}</p>
                      <p className="text-sm font-medium text-foreground/90">
                        {p.venue} · {p.year}
                      </p>
                    </div>
                    <Badge variant="accent">{typeLabel(p.type)}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.keywords.map((k) => (
                      <Badge key={k} variant="secondary">
                        {k}
                      </Badge>
                    ))}
                  </div>
                  {p.doi ? (
                    <p className="mt-3 text-xs text-muted-foreground">
                      DOI:{" "}
                      <a
                        className="text-accent hover:underline"
                        href={`https://doi.org/${p.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.doi}
                      </a>
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No publications match your filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
