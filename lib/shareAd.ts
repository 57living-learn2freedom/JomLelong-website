/** Public path for one listing. Shared links open this page. */
export function propertySharePath(id: string): string {
  return `/ad/${encodeURIComponent(id)}`;
}

export function propertyShareUrl(origin: string, id: string): string {
  return `${origin.replace(/\/$/, "")}${propertySharePath(id)}`;
}

export function buildShareLinks(url: string, title: string) {
  const message = `${title}\n${url}`;
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  };
}
