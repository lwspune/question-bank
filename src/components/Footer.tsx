import Link from "next/link";
import { Atom, BookOpen, FlaskConical, Globe, Landmark, Languages, Leaf, Mail, Newspaper, NotebookPen, Scale, TrendingUp } from "lucide-react";

const REPORT_EMAIL = "connect.lwspune@gmail.com";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          From the team at <span className="font-medium">LWS Pune</span> — free
          for teachers.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link
            href="/guide/nda-maths"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <BookOpen className="h-3 w-3" aria-hidden />
            NDA Maths Guide
          </Link>
          <Link
            href="/guide/nda-english"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Languages className="h-3 w-3" aria-hidden />
            NDA English Guide
          </Link>
          <Link
            href="/guide/nda-physics"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Atom className="h-3 w-3" aria-hidden />
            NDA Physics Guide
          </Link>
          <Link
            href="/guide/nda-chemistry"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <FlaskConical className="h-3 w-3" aria-hidden />
            NDA Chemistry Guide
          </Link>
          <Link
            href="/guide/nda-biology"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Leaf className="h-3 w-3" aria-hidden />
            NDA Biology Guide
          </Link>
          <Link
            href="/guide/nda-geography"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Globe className="h-3 w-3" aria-hidden />
            NDA Geography Guide
          </Link>
          <Link
            href="/guide/nda-history"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Landmark className="h-3 w-3" aria-hidden />
            NDA History Guide
          </Link>
          <Link
            href="/guide/nda-polity"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Scale className="h-3 w-3" aria-hidden />
            NDA Polity Guide
          </Link>
          <Link
            href="/guide/nda-economics"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <TrendingUp className="h-3 w-3" aria-hidden />
            NDA Economics Guide
          </Link>
          <Link
            href="/guide/nda-current-affairs"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Newspaper className="h-3 w-3" aria-hidden />
            NDA Current Affairs Guide
          </Link>
          <Link
            href="/notes/nda-maths"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <NotebookPen className="h-3 w-3" aria-hidden />
            NDA Maths Notes
          </Link>
          <Link
            href="/notes/nda-physics"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <NotebookPen className="h-3 w-3" aria-hidden />
            NDA Physics Notes
          </Link>
          <Link
            href="/notes/mht-cet-maths"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <NotebookPen className="h-3 w-3" aria-hidden />
            MHT-CET Maths Notes
          </Link>
          <a
            href={`mailto:${REPORT_EMAIL}?subject=Question%20Bank%20feedback`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Mail className="h-3 w-3" aria-hidden />
            Report a question
          </a>
          <a
            href="https://github.com/lwspune/question-bank"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
