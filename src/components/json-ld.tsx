import { siteConfig } from "@/lib/site";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.university,
    },
    email: siteConfig.email,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.scholar,
      siteConfig.links.orcid,
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.x,
    ],
    description: siteConfig.bioShort,
    knowsAbout: [
      "Psychology",
      "Community psychology",
      "Higher education",
      "Psychometrics",
      "Mental health",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
