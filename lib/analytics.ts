// Thin wrapper around gtag. All calls are no-ops unless Google Analytics has
// been loaded (i.e. NEXT_PUBLIC_GA_ID was set at build time), so the site works
// identically with or without analytics enabled.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtagReady(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/** Fire a GA4 event. Safe to call anywhere; silently no-ops without gtag. */
export function trackEvent(event: string, params: GtagParams = {}): void {
  if (!gtagReady()) return;
  window.gtag!("event", event, params);
}

/** A call-to-action click, e.g. cta="book_calendar", location="hero". */
export function trackCta(cta: string, location: string): void {
  trackEvent("cta_click", { cta, location });
}

/** An outbound link click (external site or social profile). */
export function trackOutbound(url: string, label?: string): void {
  trackEvent("outbound_click", { link_url: url, link_label: label });
}

/** A section (hash "page") scrolling into view, e.g. section="work". */
export function trackSectionView(section: string): void {
  trackEvent("section_view", { section });
}
