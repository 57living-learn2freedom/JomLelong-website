export function resolveNavHref(pathname: string, hash: string): string {
  return pathname === "/" ? hash : `/${hash}`;
}
