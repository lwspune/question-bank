/**
 * A mobile number rendered as a WhatsApp chat link — the one way staff surfaces
 * show someone's number.
 *
 * Renders plain text, not a broken link, when the number isn't one WhatsApp will
 * accept (see `whatsappHref`). The number's DISPLAY form stays at the call site:
 * the roster and the student detail page already pretty-print via `formatMobile`,
 * the leads and superadmin lists show the stored digits, and this component does
 * not quietly re-format either of them.
 *
 * No hooks, so it works unchanged in a server page (/dashboard/students/[id]) and
 * inside a client one (/dashboard/leads). A call site that needs to stop the click
 * reaching a parent (a <summary>, a row toggle) wraps it — no onClick prop crosses
 * the server/client boundary.
 */
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/profile/mobile";

export default function WhatsappLink({
  mobile,
  children,
  className,
  icon = true,
}: {
  mobile: string | null | undefined;
  /** Display text. Defaults to the number as stored. */
  children?: ReactNode;
  className?: string;
  /** Hide the icon where the row already carries one. */
  icon?: boolean;
}) {
  const href = whatsappHref(mobile);
  const label = children ?? mobile ?? "";

  if (!href) return <span className={className}>{label}</span>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // The link text is a number, which doesn't say where the link goes.
      aria-label={`Message ${mobile} on WhatsApp`}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm hover:text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:text-emerald-400",
        className
      )}
    >
      {icon && <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />}
      {label}
    </a>
  );
}
