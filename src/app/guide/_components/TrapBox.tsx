import { AlertTriangle } from "lucide-react";

type Props = {
  chapter: string;
  difficulty?: string;
  /** "100% of HARD limit questions in the bank have a sign-flip distractor." */
  finding: string;
  /** "After solving, verify the sign on both one-sided limits." */
  rule: string;
};

export default function TrapBox({ chapter, difficulty, finding, rule }: Props) {
  return (
    <article className="rounded-lg border-l-4 border-amber-500 bg-amber-50/60 p-4 dark:bg-amber-950/30">
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500"
          aria-hidden
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
            Sign-flip trap — {chapter}
            {difficulty && <> · {difficulty}</>}
          </p>
          <p className="mt-1.5 font-serif text-sm leading-relaxed text-foreground">
            {finding}
          </p>
          <p className="mt-2 text-sm font-medium">
            <span className="text-amber-700 dark:text-amber-400">Rule:</span>{" "}
            {rule}
          </p>
        </div>
      </div>
    </article>
  );
}
