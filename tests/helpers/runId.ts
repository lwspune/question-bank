/**
 * testRunId(): THE way a test names its fixtures (orgs, users, subjects).
 *
 *   const RUN_ID = testRunId();
 *   const EMAIL = `alice-${RUN_ID}@test.local`;
 *   const ORG = `Resolver Org ${RUN_ID}`;
 *
 * Same shape as the `randomUUID().slice(0, 8)` it replaces (8 hex), and it
 * records the id in this run's registry so the global teardown deletes these
 * rows and NOT another live run's (tests/helpers/runIdRegistry.ts). A fixture
 * named without it is deleted only once it is 6 hours old, and
 * tests/test-fixtures-use-run-id.test.ts fails any test that tries.
 */
import { inject } from "vitest";
import { newRunId } from "./runIdRegistry";

declare module "vitest" {
  export interface ProvidedContext {
    /** This run's id-registry folder, made by tests/global-teardown.ts. */
    testRunDir: string;
  }
}

export function testRunId(): string {
  let dir: string | undefined;
  try {
    dir = inject("testRunDir");
  } catch {
    dir = undefined; // outside a vitest worker: still a valid id, just unrecorded
  }
  return newRunId(dir);
}
