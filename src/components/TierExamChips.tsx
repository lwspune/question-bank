"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import ProfileChips from "@/components/ProfileChips";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { examChipsForTier } from "@/lib/profile/examChoices";
import { tierOfStage, type Stage } from "@/lib/profile/onboarding";

/**
 * The "Target exam" chips on /welcome and /account, narrowed to the stage the
 * student picked (EXAM_TIER_SPEC.md §4.1). The rest sit behind "Show all
 * exams". A selected exam outside the stage's tier stays visible, so changing
 * the stage never hides a pick. With no stage, every exam shows, as before.
 */
export default function TierExamChips({
  stage,
  selected,
  onToggle,
  disabled = false,
}: {
  stage: Stage | null;
  selected: readonly string[];
  onToggle: (value: string) => void;
  disabled?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const panelId = useId();
  const { shown, hidden } = examChipsForTier(tierOfStage(stage), selected, EXAM_REGISTRY);

  return (
    <div>
      <ProfileChips
        legend="Target exam"
        options={shown}
        selected={selected}
        onToggle={onToggle}
        disabled={disabled}
      />
      {hidden.length > 0 && (
        <div className="mt-3">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls={panelId}
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {showAll ? "Hide other exams" : "Show all exams"}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${showAll ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {showAll && (
            <div id={panelId} className="mt-3">
              <ProfileChips
                legend="Other exams"
                options={hidden}
                selected={selected}
                onToggle={onToggle}
                disabled={disabled}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
