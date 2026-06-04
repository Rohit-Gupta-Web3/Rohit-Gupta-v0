import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

export async function GET() {
  const content = `User-agent: *\nAllow: /\nSitemap: ${getSiteUrl()}/sitemap.xml`;
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
