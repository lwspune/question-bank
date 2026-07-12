"use client";

import { Check } from "lucide-react";

/**
 * A controlled group of toggle "chips" used across the profile surfaces
 * (post-signup onboarding + the /account profile form). Presentational only —
 * the parent owns selection state, so the same component serves single-select
 * (parent passes a one-item array) and multi-select.
 */
export type ChipOption = { value: string; label: string };

export default function ProfileChips({
  legend,
  options,
  selected,
  onToggle,
  disabled = false,
}: {
  legend: string;
  options: readonly ChipOption[];
  selected: readonly string[];
  onToggle: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {legend}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onToggle(opt.value)}
              className={[
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
                isSelected
                  ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                  : "border-input bg-background text-foreground hover:bg-accent",
              ].join(" ")}
            >
              {isSelected ? <Check className="h-3.5 w-3.5" aria-hidden /> : null}
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
