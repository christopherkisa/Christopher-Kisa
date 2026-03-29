import type { Metadata } from "next";
import { MapPin, Clock, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} at ${siteConfig.university}.`,
};

const social = [
  { name: "LinkedIn", href: siteConfig.links.linkedin },
  { name: "Google Scholar", href: siteConfig.links.scholar },
  { name: "ORCID", href: siteConfig.links.orcid },
  { name: "X", href: siteConfig.links.x },
  { name: "GitHub", href: siteConfig.links.github },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Contact
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Let&apos;s connect
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Use the secure form below (protected by Cloudflare Turnstile). Add Resend or
          Email Workers in the server action to deliver mail in production.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-accent" aria-hidden />
                Office
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{siteConfig.university}</p>
              <p>{siteConfig.office.room}</p>
              <p className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>Office hours: {siteConfig.office.hours}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <a
                  className="font-medium text-accent hover:underline"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Map placeholder</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div
                className="flex aspect-video w-full items-center justify-center bg-muted text-sm text-muted-foreground"
                role="img"
                aria-label="Map placeholder: embed Google Maps or OpenStreetMap here"
              >
                Campus map iframe area — replace with your embed.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profiles</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {social.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  {s.name}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
