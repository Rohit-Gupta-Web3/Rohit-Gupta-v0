const DEFAULT_BASE_PATH = "";
const DEFAULT_SITE_URL = "http://localhost:3000";

export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH?.trim() || DEFAULT_BASE_PATH;
}

export function withBasePath(path: string) {
  const basePath = getBasePath();
  if (!basePath) {
    return path;
  }

  if (path.startsWith(basePath)) {
    return path;
  }

  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }

  return `${basePath}/${path}`;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
}
