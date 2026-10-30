import Link from "next/link";
import { legalLinks } from "@/lib/nav/footerLinks";
import { INTL_EXAMS } from "@/lib/sites/intl";

/**
 * The footer on intl.pyqvault.com (2026-10-30): each international exam's
 * notes and mocks, the pass, and the legal pages. No PYQ Vault India links.
 */
export default function IntlFooter() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-muted-foreground">
        <p>
          <span className="font-medium">PYQ Vault International</span>. Past papers, notes and timed mocks
          for international entrance exams. Free to browse.
        </p>
        <nav aria-label="Site links" className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          {INTL_EXAMS.map((exam) => (
            <div key={exam.slug}>
              <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
                {exam.displayName}
              </h2>
              <ul className="space-y-1.5">
                <li>
                  <Link href={exam.notesPath ?? `/notes/${exam.slug}`} className="transition-colors hover:text-foreground">
                    Notes
                  </Link>
                </li>
                <li>
                  <Link href={`/mock/exam/${exam.slug}`} className="transition-colors hover:text-foreground">
                    Mock tests
                  </Link>
                </li>
                <li>
                  <Link href={`/formula/${exam.slug}`} className="transition-colors hover:text-foreground">
                    Formula sheets
                  </Link>
                </li>
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-foreground/70">Account</h2>
            <ul className="space-y-1.5">
              <li>
                <Link href="/pricing" className="transition-colors hover:text-foreground">
                  Premium Pass
                </Link>
              </li>
              <li>
                <Link href="/account" className="transition-colors hover:text-foreground">
                  Your account
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <nav aria-label="Legal" className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4">
          {legalLinks().map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
