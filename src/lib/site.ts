export const siteConfig = {
  name: "Christopher Kisa Ebenezer",
  title: "Lecturer of Psychology",
  university: "Gulu University",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.pages.dev",
  ogImage: "/og-default.png",
  email: "c.ebenezer@guluniv.ac.ug",
  description:
    "Academic profile of Christopher Kisa Ebenezer — lecturer, researcher, and educator at Gulu University.",
  links: {
    scholar:
      "https://scholar.google.com/citations?user=placeholder&hl=en&oi=ao",
    orcid: "https://orcid.org/0000-0002-0000-0000",
    linkedin: "https://www.linkedin.com/in/",
    x: "https://x.com/",
    github: "https://github.com/",
  },
  office: {
    room: "Faculty Block C, Room 204",
    hours: "Tue & Thu, 14:00–16:00 EAT (by appointment)",
  },
  bioShort:
    "12+ years of university teaching with 40+ peer-reviewed publications; Google Scholar h-index 42. Passionate about evidence-based pedagogy and community-engaged research.",
  heroImage:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=900&fit=crop&q=80",
} as const;
