import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = {
  key: string;
  label: string;
};

export function Stepper({
  steps,
  current,
  className,
}: {
  steps: Step[];
  current: number;
  className?: string;
}) {
  return (
    <ol
      className={cn("flex w-full items-center", className)}
      aria-label="Progress"
    >
      {steps.map((step, i) => {
        const isComplete = i < current;
        const isCurrent = i === current;
        const isLast = i === steps.length - 1;
        return (
          <li
            key={step.key}
            className={cn(
              "flex items-center",
              !isLast && "flex-1"
            )}
            aria-current={isCurrent ? "step" : undefined}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  isComplete &&
                    "border-primary bg-primary text-primary-foreground",
                  isCurrent &&
                    "border-primary bg-background text-primary",
                  !isComplete &&
                    !isCurrent &&
                    "border-border bg-background text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-3 h-px flex-1 transition-colors",
                  isComplete ? "bg-primary" : "bg-border"
                )}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
