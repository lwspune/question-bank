import type { OptionLabel, SavedResponse } from "./answers";

/** An `attempt_answers` row (snake_case, as read) in the shape isAnswered takes. */
export function answeredShape(r: Record<string, unknown>): SavedResponse {
  return {
    selectedLabel: (r.selected_label as OptionLabel | null) ?? null,
    numericResponse: r.numeric_response == null ? null : Number(r.numeric_response),
    selectedLabels: Array.isArray(r.selected_labels) ? (r.selected_labels as OptionLabel[]) : null,
  };
}
