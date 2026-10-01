#!/bin/sh
# Every NOTES_WORKFLOW step-4 check for ONE CDS General Knowledge notes chapter, in one run.
# usage: sh scripts/notes-pipeline/cds-gk/probe.sh <route> <chapterSlug>
#   e.g. sh scripts/notes-pipeline/cds-gk/probe.sh cds-chemistry metals-non-metals
# Triage output, exits 0. Read every section: a step skipped here is a step skipped (2026-10-01:
# quiz:coverage and notes:arc --terms were left out of the first three chapters).
cd "$(git rev-parse --show-toplevel)"
R="$1"; C="$2"
echo "== notes:latex";        npm run -s notes:latex 2>&1 | tail -1
echo "== notes:lint (route)"; npm run -s notes:lint 2>&1 | grep -E "notes-lint:|ERROR|$R/$C"
echo "== notes:arc";          npm run -s notes:arc -- "$R" "$C" 2>&1 | grep "notes-arc:"
echo "== notes:arc --terms (vocabulary; triage each hit)"
npm run -s notes:arc -- "$R" "$C" --terms 2>&1 | grep -E "TERM_BEFORE|used in|defined :|notes-arc:"
echo "== notes:intro";        npm run -s notes:intro -- "$R" 2>&1 | grep -E "^[1-4]\.|^  [^n]" | head -12
echo "== quiz:coverage (traps >= 12, no empty formula)"
npm run -s quiz:coverage -- "$R" "$C" 2>&1 | grep -E "##|⚠|STRONG"
echo "== registry + intro-count tests"
npx vitest run tests/notes-chapters-registry.test.ts tests/notes-nav.test.ts tests/notes-registry-invariants.test.ts tests/notes-intro-audit.test.ts tests/notes-hero-collapsible.test.ts 2>&1 | grep -E "Tests |FAIL"
npx vitest run --config vitest.prod-contract.config.ts tests/notes-intro-counts.test.ts 2>&1 | grep -E "Tests |FAIL"
echo "== manual (no probe): read the chapter against NOTES_ARC_LEDGER.md's eight classes"
echo PROBE_DONE
