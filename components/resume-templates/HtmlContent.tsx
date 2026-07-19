"use client";

import React, { useMemo } from "react";
import DOMPurify from "dompurify";

interface HtmlContentProps {
  /** Raw HTML string from TipTap editor */
  html: string | undefined | null;
  className?: string;
}

/**
 * HtmlContent
 *
 * Safely renders HTML strings produced by the TipTap rich-text editor inside
 * resume templates. Uses DOMPurify to strip XSS vectors before injecting via
 * dangerouslySetInnerHTML.
 *
 * Only runs sanitization in the browser (DOMPurify requires the DOM).
 * During SSR the raw string is passed through — it is sanitized on the
 * client before it ever reaches the DOM.
 */
export function HtmlContent({ html, className }: HtmlContentProps) {
  const clean = useMemo(() => {
    if (!html) return "";
    if (typeof window === "undefined") return html;
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "a", "span"],
      ALLOWED_ATTR: ["href", "target", "rel", "class"],
    });
  }, [html]);

  if (!clean) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
