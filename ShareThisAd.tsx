"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Property } from "@/lib/data";
import { buildShareLinks, propertyShareUrl } from "@/lib/shareAd";

interface ShareThisAdProps {
  property: Property;
}

const iconClass = "h-5 w-5";

export default function ShareThisAd({ property }: ShareThisAdProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPageUrl(propertyShareUrl(window.location.origin, property.id));
  }, [property.id]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const links = pageUrl ? buildShareLinks(pageUrl, property.title) : null;

  async function copyLink() {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch {
      const input = document.createElement("textarea");
      input.value = pageUrl;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
  }

  return (
    <section className="mt-8" aria-label="Share this ad">
      <h3 className="text-base font-bold text-zinc-900">Share This Ad</h3>
      <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-3">
        <ShareLink href={links?.facebook} label="Facebook" disabled={!links}>
          <FacebookIcon className={iconClass} />
        </ShareLink>
        <ShareLink href={links?.whatsapp} label="WhatsApp" disabled={!links}>
          <WhatsAppGlyph className={iconClass} />
        </ShareLink>
        <ShareLink href={links?.email} label="Email" disabled={!links}>
          <MailIcon className={iconClass} />
        </ShareLink>
        <ShareLink href={links?.x} label="X" disabled={!links}>
          <XIcon className={iconClass} />
        </ShareLink>
        <ShareLink href={links?.line} label="LINE" disabled={!links}>
          <LineIcon className={iconClass} />
        </ShareLink>
        <ShareLink href={links?.telegram} label="Telegram" disabled={!links}>
          <TelegramIcon className={iconClass} />
        </ShareLink>
        <ShareTip label={copied ? "Link copied" : "Copy link"}>
          <button
            type="button"
            onClick={copyLink}
            disabled={!pageUrl}
            aria-label={copied ? "Link copied" : "Copy link"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400 text-white transition-colors hover:bg-zinc-500 disabled:cursor-wait disabled:opacity-60"
          >
            <LinkIcon className={iconClass} />
          </button>
        </ShareTip>
      </div>
      <p className="mt-2 min-h-5 text-center text-sm text-zinc-500" aria-live="polite">
        {copied ? "Link copied" : ""}
      </p>
    </section>
  );
}

function ShareTip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}

function ShareLink({
  href,
  label,
  disabled,
  children,
}: {
  href?: string;
  label: string;
  disabled: boolean;
  children: ReactNode;
}) {
  const control =
    disabled || !href ? (
      <span
        aria-disabled="true"
        aria-label={label}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400 text-white opacity-60"
      >
        {children}
      </span>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400 text-white transition-colors hover:bg-zinc-500"
      >
        {children}
      </a>
    );

  return <ShareTip label={label}>{control}</ShareTip>;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 8.5V6.8c0-.7.5-1 1.1-1H17V3.5h-2.2C12.2 3.5 11 4.9 11 7.1V8.5H9V11h2v9.5h3.2V11H16.6L17 8.5h-2.5z" />
    </svg>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 4.5A7.46 7.46 0 0 0 4.6 11.9c0 1.32.35 2.6 1 3.73L4.5 19.5l3.98-1.04a7.5 7.5 0 0 0 3.56.9h.01a7.46 7.46 0 0 0 7.45-7.46 7.4 7.4 0 0 0-2.18-5.26 7.4 7.4 0 0 0-5.28-2.14zm4.36 10.58c-.18.51-1.06.98-1.46 1.04-.38.06-.86.09-1.39-.09-.32-.1-.73-.24-1.26-.47-2.22-.96-3.66-3.2-3.77-3.35-.11-.15-.9-1.2-.9-2.29 0-1.09.57-1.63.77-1.85.2-.22.44-.28.58-.28h.42c.13 0 .32-.05.5.38.18.44.62 1.52.67 1.63.06.11.1.24.02.39-.08.15-.12.24-.23.37-.12.13-.24.29-.35.39-.11.11-.23.23-.1.45.13.22.58.96 1.25 1.55.86.77 1.58 1.01 1.8 1.12.22.11.35.1.48-.06.13-.15.55-.64.7-.86.15-.22.29-.18.49-.11.2.07 1.26.59 1.48.7.22.11.36.16.42.25.05.09.05.52-.13 1.03z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 6.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm7.5 6.2 6.7-4.2H5.3L12 12.7zm0 1.5L5 9.8V16h14V9.8l-7 4.4z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.7 10.3 20.4 4h-1.4l-4.9 5.5L10 4H4.8l6 8.5L4.8 20h1.4l5.2-5.8L14.7 20h5.2l-5.2-9.7zm-1.8 2.1-.6-.8-4.8-6.6h2.1l3.9 5.3.6.8 5.1 6.9h-2.1l-4.2-5.6z" />
    </svg>
  );
}

function LineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 4.5C7.3 4.5 3.5 7.6 3.5 11.4c0 3.5 3.1 6.4 7.3 6.9.28.06.67.19.76.43.08.22.05.56.03.79l-.12.72c-.04.22-.17.86.75.47 1.1-.46 5.9-3.48 8.05-5.96 1.48-1.63 2.23-3.28 2.23-5.35C22.5 7.6 18.7 4.5 12 4.5zM8.7 13.6H7.3a.4.4 0 0 1-.4-.4V9.6c0-.22.18-.4.4-.4s.4.18.4.4v3.2h1a.4.4 0 0 1 0 .8zm1.7-.4a.4.4 0 0 1-.8 0V9.6a.4.4 0 0 1 .8 0v3.6zm3.5 0a.4.4 0 0 1-.7.26l-1.9-2.58v2.32a.4.4 0 0 1-.8 0V9.6a.4.4 0 0 1 .7-.26l1.9 2.58V9.6a.4.4 0 0 1 .8 0v3.6zm3.4-2.5a.4.4 0 0 1 0 .8h-1.2v.6h1.2a.4.4 0 0 1 0 .8h-1.6a.4.4 0 0 1-.4-.4V9.6c0-.22.18-.4.4-.4h1.6a.4.4 0 0 1 0 .8h-1.2v.7h1.2z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.8 5.3 4.9 11c-1 .4-1 .9-.2 1.2l3.8 1.2 1.5 4.6c.2.5.1.7.6.7.3 0 .5-.1.7-.4l2.1-2 4.3 3.2c.8.4 1.3.2 1.5-.7l2.7-12.7c.3-1.1-.4-1.6-1.1-1.3zM9.4 13.3l7.6-4.8c.4-.2.7 0 .4.3l-6.5 5.9-.2 2.4-1.3-3.8z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" d="M10 13a5 5 0 0 0 7.1.1l2.1-2.1a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
      <path strokeLinecap="round" d="M14 11a5 5 0 0 0-7.1-.1l-2.1 2.1a5 5 0 0 0 7.1 7.1l1.2-1.2" />
    </svg>
  );
}
