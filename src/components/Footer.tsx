import Link from "next/link";
import { BookOpen, Mail, NotebookPen } from "lucide-react";

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
            href="/notes/nda-maths/statistics"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <NotebookPen className="h-3 w-3" aria-hidden />
            Statistics Notes
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
