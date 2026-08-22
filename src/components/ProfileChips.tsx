"use client";

import { Check } from "lucide-react";

/**
 * A controlled group of toggle "chips" used across the profile surfaces
 * (post-signup onboarding + the /account profile form). Presentational only —
 * the parent owns selection state, so the same component serves single-select
 * (parent passes a one-item array) and multi-select.
 */
/**
 * `group` is optional and purely visual — options carrying one render together
 * under a sub-heading (the board exams: "Class 9 … Class 12" under
 * "Maharashtra State Board"). The VALUE is unaffected, so a grouped chip
 * persists exactly what an ungrouped one would.
 */
export type ChipOption = { value: string; label: string; group?: string };

/**
 * Split into render rows: the ungrouped options as one unlabelled row, then one
 * labelled row per group in first-appearance order. With no groups at all this
 * yields exactly one unlabelled row — byte-identical to the original markup, so
 * every existing caller (stage, medium, stream) is untouched.
 */
function toRows(options: readonly ChipOption[]) {
  const ungrouped = options.filter((o) => !o.group);
  const groups = new Map<string, ChipOption[]>();
  for (const opt of options) {
    if (!opt.group) continue;
    groups.set(opt.group, [...(groups.get(opt.group) ?? []), opt]);
  }
  return [
    ...(ungrouped.length > 0 ? [{ label: null, options: ungrouped }] : []),
    ...Array.from(groups, ([label, opts]) => ({ label, options: opts })),
  ];
}

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
  const rows = toRows(options);
  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {legend}
      </legend>
      <div className="mt-3 space-y-3">
        {rows.map((row) => (
          <div key={row.label ?? "__ungrouped__"}>
            {row.label && (
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                {row.label}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {row.options.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    // The visible label is "Class 9" inside its board row, which
                    // is ambiguous read on its own by a screen reader — so the
                    // accessible name carries the board too.
                    aria-label={row.label ? `${row.label} ${opt.label}` : undefined}
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
          </div>
        ))}
      </div>
    </fieldset>
  );
}
