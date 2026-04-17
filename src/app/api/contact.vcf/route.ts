import { siteConfig } from "@/lib/site";

//export const runtime = "edge";

function buildVCard() {
  const fullName = siteConfig.name.trim();
  const email = siteConfig.email;
  const org = siteConfig.university;
  const title = siteConfig.title.trim();
  const github = siteConfig.links.github;
  const linkedin = siteConfig.links.linkedin;

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${fullName}`,
    `ORG:${org}`,
    `TITLE:${title}`,
    `EMAIL;TYPE=INTERNET:${email}`,
    `URL:${github}`,
    `URL:${linkedin}`,
    "END:VCARD",
    "",
  ].join("\r\n");
}

export async function GET() {
  const body = buildVCard();
  const filename = `${siteConfig.name.trim().replace(/\s+/g, "-").toLowerCase()}.vcf`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
