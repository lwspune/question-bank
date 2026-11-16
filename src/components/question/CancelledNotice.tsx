import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { cancelledLine, type AltLang } from "@/lib/i18n/bilingual";

/**
 * The officially-cancelled notice. The English note is the row's own
 * `cancelled_note` (it names the sitting); a second, fixed line repeats it in
 * the question's own second print language (`alt`: Marathi for MPSC, Hindi for
 * RAS and SSC), so the notice reads in both languages whatever the viewer
 * chose. An English-only question gets no second line.
 */
export default function CancelledNotice({
  note,
  alt,
  className,
}: {
  note: string;
  alt: AltLang | null;
  className?: string;
}) {
  const second = cancelledLine(alt);
  return (
    <div
      role="note"
      className={cn(
        "mt-3 flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 font-sans text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200",
        className
      )}
    >
      <Ban className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      <div className="space-y-1">
        <p>
          <strong>Officially cancelled.</strong> {note}
        </p>
        {second && <p lang={second.lang}>{second.text}</p>}
      </div>
    </div>
  );
}
