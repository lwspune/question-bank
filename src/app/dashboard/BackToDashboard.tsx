import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** The one way back to the /dashboard hub, at the top of every page it links
 *  to. tests/dashboard-back-link.test.ts fails a page without it. */
export default function BackToDashboard() {
  return (
    // A block wrapper so its margin collapses into a `space-y-*` page's own gap
    // instead of adding to it.
    <div className="mb-4">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Dashboard
      </Link>
    </div>
  );
}
