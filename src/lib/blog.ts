import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  featured?: boolean;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingTime?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): {
  meta: BlogPostMeta;
  content: string;
} | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;
  const words = content.trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.round(words / 200))} min read`;
  return {
    meta: {
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      category: fm.category,
      featured: fm.featured,
      readingTime,
    },
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getCategories(): string[] {
  return [...new Set(getAllPosts().map((p) => p.category))].sort();
}
