/**
 * Generates a responsive image URL with optimized parameters
 * @param src Original image source
 * @param width Desired width
 * @param quality Image quality (1-100)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(src: string, width = 800, quality = 80): string {
  // If it's already a placeholder, return as is
  if (src.includes("placeholder.svg")) {
    return src
  }

  // If it's a blob URL from v0.dev, return as is
  if (src.includes("blob.v0.dev")) {
    return src
  }

  // For external images, we can't optimize them directly
  if (src.startsWith("http")) {
    return src
  }

  // For local images, add width and quality parameters
  return `${src}?w=${width}&q=${quality}`
}
