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
  "tests/notes-intro-counts.test.ts", // /notes chapter-intro prose counts vs live bank
  "tests/resource-tags-batch.test.ts", // backlink chips vs live tags
  "tests/exam-home-stats.test.ts", // live-bank count shapes
  "tests/all-exam-stats.test.ts",
  "tests/go-routes.test.ts", // /go/* name-mode redirects resolve live NDA taxonomy
  "tests/format-mix-registry.test.ts", // EXAM_REGISTRY.mixedFormats vs the live corpus
  "tests/exam-registry-content.test.ts", // EXAM_REGISTRY.noPublicContent vs live PUBLIC counts
  "tests/mocks-registry.test.ts", // EXAM_REGISTRY.hasMocks vs live mock_tests
  "tests/past-paper-solutions-registry.test.ts", // EXAM_REGISTRY.pastPaperSolutions vs live past-paper solutions
  "tests/solution-coverage-registry.test.ts", // EXAM_REGISTRY.solutionCoverage vs live solution share
  "tests/mock-questions-visible.test.ts", // published mocks reference only live PUBLIC questions
  "tests/books-registry.test.ts", // book registry chapter/subject names vs live taxonomy
  "tests/planner-data.test.ts", // session-plan section refs vs the live syllabus spine
  "tests/blog-nda2-2026-stats.test.ts", // blog post figures vs the live NDA Maths corpus
  "tests/blog-nda2-2026-gat-stats.test.ts", // GAT post figures vs the live NDA GAT corpus
  "tests/blog-mhtcet-2027-stats.test.ts", // MHT-CET 2027 dates post: Std XI/XII split vs the live CET corpus
  "tests/performance-concept-graph-taxonomy.test.ts", // prereq-graph nodes vs live NDA Maths chapters
  "tests/mh-hsc-12-paper-catalog-prod.test.ts", // board-paper lane's generated catalog vs live HSC Maths taxonomy
  "tests/concept-ladder-urls.test.ts", // Concept Ladder chip: subtopic names vs live taxonomy, lesson URLs vs conceptladder.in
  "tests/visuals-ingestion-gate.test.ts", // new PUBLIC questions of a launched exam carry an animated-solution verdict
];
