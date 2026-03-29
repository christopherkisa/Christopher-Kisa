import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, GraduationCap, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/site";

const social: {
  name: string;
  href: string;
  Icon?: LucideIcon;
  text?: string;
}[] = [
  { name: "LinkedIn", href: siteConfig.links.linkedin, Icon: Linkedin },
  { name: "Google Scholar", href: siteConfig.links.scholar, Icon: GraduationCap },
  { name: "ORCID", href: siteConfig.links.orcid, text: "ORCID" },
  { name: "X", href: siteConfig.links.x, Icon: Twitter },
  { name: "GitHub", href: siteConfig.links.github, Icon: Github },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {siteConfig.title} · {siteConfig.university}
          </p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {siteConfig.bioShort}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {social.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              aria-label={s.name}
            >
              {s.Icon ? (
                <s.Icon className="h-4 w-4" aria-hidden />
              ) : (
                <span
                  className="font-display text-xs font-bold tracking-wide"
                  aria-hidden
                >
                  {s.text}
                </span>
              )}
              <span>{s.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}. Academic personal site.
      </div>
    </footer>
  );
}
