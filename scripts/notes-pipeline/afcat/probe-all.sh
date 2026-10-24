#!/bin/sh
# Every NOTES_WORKFLOW step-4 check for several AFCAT notes chapters in one run: the corpus-wide
# checks once (latex, lint, intro, registry and intro-count tests), arc and quiz coverage per chapter.
#   sh scripts/notes-pipeline/afcat/probe-all.sh average clock ...
# Triage output, exits 0. probe.sh (cds-gk) runs the corpus-wide lint once PER chapter, which is
# minutes each; this is the batch form.
cd "$(git rev-parse --show-toplevel)"
echo "== notes:latex";  npm run -s notes:latex 2>&1 | tail -1
echo "== notes:lint (afcat-maths lines)"; npm run -s notes:lint 2>&1 | grep -E "notes-lint:|ERROR|afcat-maths/"
echo "== notes:intro";  npm run -s notes:intro -- afcat-maths 2>&1 | grep -E "^[1-4]\.|^  [^n]" | head -20
for C in "$@"; do
  echo "== $C: arc";  npm run -s notes:arc -- afcat-maths "$C" 2>&1 | grep -E "NOTATION|notes-arc:|used in|excerpt"
  echo "== $C: quiz:coverage"; npm run -s quiz:coverage -- afcat-maths "$C" 2>&1 | grep -E "##|⚠|STRONG"
done
echo "== registry + intro-count tests"
npx vitest run tests/notes-chapters-registry.test.ts tests/notes-nav.test.ts tests/notes-registry-invariants.test.ts tests/notes-intro-audit.test.ts tests/notes-hero-collapsible.test.ts tests/notes-nav-index.test.ts tests/chat-notes-item.test.ts tests/voice-ratchet.test.ts 2>&1 | grep -E "Tests |FAIL|afcat"
npx vitest run --config vitest.prod-contract.config.ts tests/notes-intro-counts.test.ts 2>&1 | grep -E "Tests |afcat-maths"
echo PROBE_DONE
