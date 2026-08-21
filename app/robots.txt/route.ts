import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const content = `User-agent: *\nAllow: /\nDisallow: /todo\nSitemap: ${getSiteUrl()}/sitemap.xml`;
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
