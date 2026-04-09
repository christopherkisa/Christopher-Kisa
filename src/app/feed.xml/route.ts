import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const rssItemsXml = sortedPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid>${siteConfig.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title><![CDATA[${siteConfig.name} - Blog]]></title>
        <link>${siteConfig.url}/blog</link>
        <description><![CDATA[${siteConfig.description}]]></description>
        <language>en</language>
        ${rssItemsXml}
      </channel>
    </rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
