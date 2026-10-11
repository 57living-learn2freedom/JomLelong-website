import { type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  // confirm=t skips Drive's "can't scan for viruses" HTML page served for files over ~100MB.
  const driveUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`;
  const range = request.headers.get("range");

  const upstream = await fetch(driveUrl, {
    headers: range ? { Range: range } : undefined,
    redirect: "follow",
  });

  if (!upstream.ok && upstream.status !== 206) {
    return new Response("Video unavailable", { status: upstream.status });
  }

  const contentType = upstream.headers.get("content-type");
  if (contentType?.startsWith("text/html")) {
    await upstream.body?.cancel();
    return new Response("Video unavailable", { status: 502 });
  }

  const headers = new Headers();
  if (contentType) headers.set("Content-Type", contentType);

  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  const contentRange = upstream.headers.get("content-range");
  if (contentRange) headers.set("Content-Range", contentRange);

  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=3600");

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}
