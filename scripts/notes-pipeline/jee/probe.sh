#!/bin/sh
# usage: sh scripts/notes-pipeline/jee/probe.sh <route-slug> <intro-filter>
cd "$(git rev-parse --show-toplevel)"
npm run notes:lint 2>&1 | grep -E "notes-lint:|ERROR|jee-mains-maths/$1"
npm run notes:arc -- jee-mains-maths $1 2>&1 | grep "notes-arc:"
npm run notes:intro -- $2 2>&1 | grep -E "^[1-4]\.|^  [^n]" | head -12
npx vitest run tests/notes-chapters-registry.test.ts tests/notes-nav.test.ts tests/notes-registry-invariants.test.ts tests/notes-intro-audit.test.ts tests/notes-hero-collapsible.test.ts 2>&1 | grep -E "Tests |FAIL"
npx vitest run --config vitest.prod-contract.config.ts tests/notes-intro-counts.test.ts 2>&1 | grep -E "Tests |FAIL"
echo PROBE_DONE
