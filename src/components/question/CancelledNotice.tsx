import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The officially-cancelled notice. The English note is the row's own
 * `cancelled_note` (it names the sitting); the Marathi line is fixed, so the
 * notice reads in both languages whatever the viewer chose.
 */
export default function CancelledNotice({ note, className }: { note: string; className?: string }) {
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
        <p lang="mr">हा प्रश्न आयोगाने अंतिम उत्तरतालिकेत रद्द केला आहे; कोणताही पर्याय बरोबर नाही.</p>
      </div>
    </div>
  );
}
