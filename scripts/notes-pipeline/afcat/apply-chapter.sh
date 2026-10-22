#!/bin/sh
# Main-session data step for ONE AFCAT notes chapter, after its agent's plan has been reviewed
# and any key or solution fixes are in data/<chapterId>.overrides.json (BRIEF.md).
#   sh scripts/notes-pipeline/afcat/apply-chapter.sh <chapterId> <code> "<DB chapter name>"
#   e.g. sh scripts/notes-pipeline/afcat/apply-chapter.sh average av "Average"
# Steps: re-cut the source of record, prove the chapter still builds, snapshot the bank, move
# the rows, push changed solutions, re-dump. Stops at the first failure (set -e). Key or
# option changes are NOT done here: run correct-in-place.ts --ids=... for those first.
set -e
cd "$(git rev-parse --show-toplevel)"
ID="$1"; CODE="$2"; NAME="$3"
PLAN="generated-papers/_af$CODE-plan.json"
echo "== recut ($PLAN)";        npx tsx scripts/afcat/recut.ts "$ID" "$PLAN" --apply
echo "== build check";          npx tsx scripts/afcat/preview.ts "$ID"
echo "== snapshot";             npx tsx scripts/afcat/snapshot-subtopics.ts "$NAME" "generated-papers/_af$CODE-snapshot.json"
echo "== sync subtopics";       npx tsx scripts/afcat/sync-subtopics.ts "$ID" --apply
echo "== sync solutions";       npx tsx scripts/afcat/sync-solutions.ts "$ID" --apply
echo "== re-dump";              npx tsx scripts/notes-pipeline/cds-gk/dump.ts "Numerical Ability" "$NAME" "af$CODE" --exam=AFCAT
echo APPLY_DONE
