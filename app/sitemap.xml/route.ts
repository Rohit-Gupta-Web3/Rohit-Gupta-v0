import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://rohit-gupta.vercel.app'
  const pages = ['']

  const urls = pages
    .map(path => {
      return `<url><loc>${baseUrl}${path}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    })
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
