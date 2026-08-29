/**
 * PROD-CONTRACT test files: read-only suites whose PURPOSE is asserting that
 * editorial/code artifacts still match the LIVE production content (guide
 * drill targets resolve, notes cross-links hold, live counts are sane).
 * Running them against the seeded test project would be meaningless — the
 * content they check only exists in prod.
 *
 * They are EXCLUDED from the default `npm test` (which targets the dedicated
 * test project) and run via `npm run test:prod-contract` with PROD_CONTRACT=1
 * (read-only prod access — see tests/helpers/testdb.ts).
 *
 * Shared by vitest.config.ts (exclude) and vitest.prod-contract.config.ts
 * (include) so the two lists cannot drift.
 */
export const PROD_CONTRACT_FILES: string[] = [
  "tests/guide-*.test.ts", // playbook drill-target resolution vs live taxonomy
  "tests/cross-link-integrity.test.ts", // notes/guide cross-refs vs live DB
  "tests/resource-tags-batch.test.ts", // backlink chips vs live tags
  "tests/exam-home-stats.test.ts", // live-bank count shapes
  "tests/all-exam-stats.test.ts",
  "tests/go-routes.test.ts", // /go/* name-mode redirects resolve live NDA taxonomy
  "tests/format-mix-registry.test.ts", // EXAM_REGISTRY.mixedFormats vs the live corpus
  "tests/mocks-registry.test.ts", // EXAM_REGISTRY.hasMocks vs live mock_tests
];
