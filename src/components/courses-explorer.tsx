"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/lib/courses-data";
import { courses } from "@/lib/courses-data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpDown } from "lucide-react";

type SortKey = "term" | "title" | "code";

export function CoursesExplorer({ initial }: { initial?: Course[] }) {
  const data = initial ?? courses;
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("term");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return data.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (level !== "all" && c.level !== level) return false;
      if (!ql) return true;
      const blob =
        `${c.code} ${c.title} ${c.description} ${c.term}`.toLowerCase();
      return blob.includes(ql);
    });
  }, [data, q, status, level]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sort === "term") cmp = a.term.localeCompare(b.term);
      else if (sort === "title") cmp = a.title.localeCompare(b.title);
      else cmp = a.code.localeCompare(b.code);
      return dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sort, dir]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Search courses</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium" htmlFor="course-search">
              Keyword
            </label>
            <Input
              id="course-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Course code, title, term…"
              aria-controls="courses-results"
            />
          </div>
          <div className="space-y-2">
            <span id="status-label" className="text-sm font-medium">
              Schedule
            </span>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger aria-labelledby="status-label">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Current &amp; past</SelectItem>
                <SelectItem value="current">Current only</SelectItem>
                <SelectItem value="past">Past only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <span id="level-label" className="text-sm font-medium">
              Level
            </span>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger aria-labelledby="level-label">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
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
                <SelectTrigger className="flex-1" aria-label="Sort courses">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="term">Term</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="code">Course code</SelectItem>
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

      <div
        id="courses-results"
        className="grid gap-6 md:grid-cols-2"
        role="list"
        aria-live="polite"
      >
        {sorted.map((c) => (
          <Card key={c.id} className="h-full transition-shadow hover:shadow-md" role="listitem">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={c.status === "current" ? "accent" : "secondary"}>
                  {c.status === "current" ? "Current" : "Past"}
                </Badge>
                <Badge variant="outline">{c.level}</Badge>
                <Badge variant="secondary">{c.code}</Badge>
              </div>
              <CardTitle className="text-xl">{c.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{c.term}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Role: {c.role === "instructor" ? "Primary instructor" : "Co-instructor"}
              </p>
              <a
                href={c.syllabusUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                aria-label={`Mock syllabus for ${c.title}`}
              >
                View syllabus (sample PDF path)
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </CardContent>
          </Card>
        ))}
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground md:col-span-2">
            No courses match your filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
