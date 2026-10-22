#!/bin/sh
# probe.sh for SEVERAL chapters of one route in one run: the bank-wide steps (latex, lint,
# the registry and intro-count tests) run ONCE, the per-chapter steps once per chapter.
# notes:lint alone reads every chapter in the bank (~30 min), so four probe.sh runs cost
# four lints for the same answer.
# usage: sh scripts/notes-pipeline/cds-gk/probe-subject.sh <route> <chapterSlug>...
#   e.g. sh scripts/notes-pipeline/cds-gk/probe-subject.sh cds-history ancient-india medieval-india
# Triage output, exits 0. Read every section.
cd "$(git rev-parse --show-toplevel)"
R="$1"; shift
echo "== notes:latex";        npm run -s notes:latex 2>&1 | tail -1
echo "== notes:lint (route)"; npm run -s notes:lint 2>&1 | grep -E "notes-lint:|ERROR|$R/"
for C in "$@"; do
  echo "######## $R/$C"
  echo "== notes:arc";          npm run -s notes:arc -- "$R" "$C" 2>&1 | grep "notes-arc:"
  echo "== notes:arc --terms (vocabulary; triage each hit)"
  npm run -s notes:arc -- "$R" "$C" --terms 2>&1 | grep -E "TERM_BEFORE|used in|defined :|notes-arc:"
  echo "== quiz:coverage (traps >= 12, no empty formula)"
  npm run -s quiz:coverage -- "$R" "$C" 2>&1 | grep -E "##|⚠|STRONG"
done
echo "== notes:intro";        npm run -s notes:intro -- "$R" 2>&1 | grep -E "^[1-4]\.|^  [^n]" | head -20
echo "== registry + intro-count tests"
npx vitest run tests/notes-chapters-registry.test.ts tests/notes-nav.test.ts tests/notes-registry-invariants.test.ts tests/notes-intro-audit.test.ts tests/notes-hero-collapsible.test.ts 2>&1 | grep -E "Tests |FAIL"
npx vitest run --config vitest.prod-contract.config.ts tests/notes-intro-counts.test.ts 2>&1 | grep -E "Tests |FAIL"
echo "== manual (no probe): read each chapter against NOTES_ARC_LEDGER.md's eight classes"
echo PROBE_DONE
