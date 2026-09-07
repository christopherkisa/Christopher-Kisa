import type { Metadata } from "next";
import { AboutSkills } from "@/components/about-skills";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Biography, education, and experience of ${siteConfig.name}.`,
};

const education = [
  {
    period: "2008 — 2012",
    title: "Ph.D. in Psychology",
    place: "Makerere University",
    detail:
      "Dissertation on community resilience and help-seeking in post-conflict settings.",
  },
  {
    period: "2005 — 2007",
    title: "M.A. in Clinical Psychology",
    place: "Gulu University",
    detail: "Focused on culturally grounded assessment and group interventions.",
  },
  {
    period: "2001 — 2005",
    title: "B.Sc. in Psychology",
    place: "Gulu University",
    detail: "Graduated with distinction; peer mentoring award.",
  },
];

const experience = [
  {
    period: "2018 — present",
    role: "Senior Lecturer",
    org: siteConfig.university,
    detail:
      "Leads graduate methods sequence; supervises community-engaged research teams.",
  },
  {
    period: "2013 — 2018",
    role: "Lecturer",
    org: siteConfig.university,
    detail:
      "Developed undergraduate labs in cognitive and developmental psychology.",
  },
  {
    period: "2012 — 2013",
    role: "Postdoctoral Research Fellow",
    org: "Regional Centre for Psychosocial Support",
    detail:
      "Coordinated multisite trials on school-based mental health promotion.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          About
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Scholar, teacher, collaborator
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {siteConfig.name} is {siteConfig.title.toLowerCase()} at{" "}
          {siteConfig.university}. {siteConfig.bioShort}
        </p>
      </header>

      <Separator className="my-12" />

      <section aria-labelledby="education-heading">
        <h2 id="education-heading" className="font-display text-2xl font-bold">
          Education
        </h2>
        <ol className="mt-8 space-y-8 border-l-2 border-accent/40 pl-6">
          {education.map((e) => (
            <li key={e.title} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
              <p className="text-sm font-medium text-accent">{e.period}</p>
              <h3 className="font-display text-lg font-semibold">{e.title}</h3>
              <p className="text-sm text-muted-foreground">{e.place}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed">{e.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="my-12" />

      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="font-display text-2xl font-bold">
          Experience timeline
        </h2>
        <ol className="mt-8 space-y-8 border-l-2 border-primary/30 pl-6">
          {experience.map((x) => (
            <li key={x.period} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              <p className="text-sm font-medium text-primary">{x.period}</p>
              <h3 className="font-display text-lg font-semibold">
                {x.role} · {x.org}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {x.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="my-12" />

      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="font-display text-2xl font-bold">
          Skills snapshot
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Self-assessed emphasis areas used to guide collaborations and student mentoring
          (illustrative visualization — not a formal evaluation).
        </p>
        <div className="mt-8 max-w-2xl">
          <AboutSkills />
        </div>
      </section>
    </div>
  );
}
