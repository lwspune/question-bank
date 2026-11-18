/**
 * commitStaged must be told the visibility to write AT INSERT.
 *
 * 2026-11-18: 36 commit scripts left it out, so rows landed on the PUBLIC
 * column default and a second step hid them. A network error between the two
 * left 27 PRIVATE-lane AISSEE rows public for half an hour. With `visibility`
 * required, the compiler names any caller that forgets it (npm run typecheck
 * covers this file): the call below must NOT compile.
 */
import { describe, expect, it } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { commitStaged } from "@/lib/upload/commit";

// Never called: only its type is checked.
function omitsVisibility(client: SupabaseClient) {
  // @ts-expect-error visibility is required
  return commitStaged(client, { orgId: "o", examId: "e", filename: "f", createdBy: "u", rows: [] });
}

function statesVisibility(client: SupabaseClient) {
  return commitStaged(client, { orgId: "o", examId: "e", filename: "f", createdBy: "u", rows: [], visibility: "PRIVATE" });
}

describe("commitStaged visibility", () => {
  it("is a required argument (checked by typecheck)", () => {
    expect(typeof omitsVisibility).toBe("function");
    expect(typeof statesVisibility).toBe("function");
  });
});
