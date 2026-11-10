import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The shared look of /login and /signup (2026-11-10): the real V logo linking
 * home (it was a generic book icon, and a phone had no way back to the site),
 * the form in a white card, rounded 44 px inputs and buttons, and the
 * homepage's blue gradient on the desktop panel. Each page keeps its own copy.
 */

// Rounded, 44 px tall: a full thumb target, matching the Google pill above.
export const AUTH_INPUT_CLASS = "h-11 rounded-xl bg-background";
export const AUTH_SUBMIT_CLASS =
  "h-11 w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90";

/** The V mark (public/icons/mark-96.png). Decorative: the wordmark names the link. */
function Mark({ size }: { size: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/icons/mark-96.png" alt="" aria-hidden width={size} height={size} className="shrink-0" />;
}

/** Above the card on a phone; the desktop panel carries the logo instead. */
export function AuthLogo() {
  return (
    <Link
      href="/"
      className="mb-5 flex items-center justify-center gap-2 rounded-md text-[15px] font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
    >
      <Mark size={28} />
      <span>PYQ Vault</span>
    </Link>
  );
}

export function AuthCard({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border bg-card px-6 py-7">{children}</div>;
}

/** The right-hand panel from `md` up. Decorative (aria-hidden): the form is the page. */
export function AuthBrandPanel({
  heading,
  body,
  footer,
}: {
  heading: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}) {
  return (
    <aside aria-hidden className="hero-brand hidden md:block">
      <div className="relative flex h-full flex-col justify-between p-12">
        <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          {/* A white tile, so the blue mark reads on the navy panel. */}
          <span className="rounded-lg bg-white p-1">
            <Mark size={22} />
          </span>
          <span>PYQ Vault</span>
        </div>
        <div>
          <p className="text-3xl font-bold leading-tight tracking-tight lg:text-4xl">{heading}</p>
          <p className="mt-4 max-w-md text-sm text-white/75">{body}</p>
        </div>
        <p className="text-xs text-white/60">{footer}</p>
      </div>
    </aside>
  );
}
