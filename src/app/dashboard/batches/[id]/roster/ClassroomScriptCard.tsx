import { MessageSquareText } from "lucide-react";
import {
  BOARD_SCRIPT,
  MOCK_SCRIPT,
  classroomScriptText,
} from "@/lib/education/classroomScript";
import CopyScriptButton from "./CopyScriptButton";

/**
 * "Five minutes in class" — the script a teacher reads after assigning a
 * paper, collapsed by default so the roster page gains nothing until it is
 * wanted. STUDENT_EDUCATION_SPEC.md §4 item 7 / slice 2.
 *
 * Server-rendered `<details>`: no client JS for the disclosure, keyboard and
 * screen-reader behaviour for free. The only island is the copy button, which
 * receives the plain-text form from here so there is one source of the words.
 *
 * Both variants are shown, mock first: a staffroom teaches NDA and Class 12 in
 * the same week, and the card cannot know which this batch is.
 */
export default function ClassroomScriptCard() {
  return (
    <details className="group rounded-lg border bg-card">
      <summary className="flex cursor-pointer list-none items-center gap-2 p-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg [&::-webkit-details-marker]:hidden">
        <MessageSquareText className="h-4 w-4 text-brand-accent" aria-hidden />
        Five minutes in class
        <span className="ml-auto text-xs font-normal text-muted-foreground group-open:hidden">
          the script to read after assigning a paper
        </span>
      </summary>
      <div className="space-y-4 border-t p-4">
        <p className="text-sm text-muted-foreground">
          Read aloud or paraphrase. Assumes students have phones and have signed up.
        </p>
        <ol className="list-decimal space-y-2 pl-5 font-serif text-sm leading-relaxed">
          {MOCK_SCRIPT.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            For board classes, instead of steps 1 to 4
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 font-serif text-sm leading-relaxed">
            {BOARD_SCRIPT.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <CopyScriptButton text={classroomScriptText()} />
          <span className="text-xs text-muted-foreground">Plain text, ready to paste.</span>
        </div>
      </div>
    </details>
  );
}
