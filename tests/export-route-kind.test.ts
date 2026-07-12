/**
 * Validation tests for /api/export's required `kind: "paper" | "key"` field.
 *
 * The route uses createSupabaseServerClient() which reads next/headers
 * cookies() — that throws outside a real Next request scope. The rate-limit
 * check and payload validation fire BEFORE that throw, so the early 400/415
 * paths are reachable from a plain POST(request) call. Success-path .docx
 * shape is covered by tests/docx-export.test.ts directly on the builder.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";

const RUN_ID = randomUUID().slice(0, 8);

function makeReq(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `kind-test-${RUN_ID}-${Math.random().toString(36).slice(2, 8)}`,
    },
    body: JSON.stringify(body),
  });
}

const VALID_FILTERS = {
  examId: "00000000-0000-0000-0000-000000000000",
  subjectId: null,
  chapterIds: [],
  subtopicIds: [],
  difficulties: [],
  pyqYears: [],
  q: "",
  page: 1,
};

const OPTIONS = { title: "kind-test", includeSolutions: false };

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("/api/export kind validation", () => {
  it("rejects request with no kind", async () => {
    const { POST } = await import("@/app/api/export/route");
    const res = await POST(
      makeReq({ filters: VALID_FILTERS, options: OPTIONS })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/kind/i);
  });

  it("rejects request with unknown kind value", async () => {
    const { POST } = await import("@/app/api/export/route");
    const res = await POST(
      makeReq({ kind: "zip", filters: VALID_FILTERS, options: OPTIONS })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/kind/i);
  });

  it("accepts kind=paper but rejects when neither filters nor questionIds provided", async () => {
    const { POST } = await import("@/app/api/export/route");
    const res = await POST(makeReq({ kind: "paper", options: OPTIONS }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/filters|questionIds/i);
  });

  it("accepts kind=key but rejects when both filters AND questionIds provided", async () => {
    const { POST } = await import("@/app/api/export/route");
    const res = await POST(
      makeReq({
        kind: "key",
        filters: VALID_FILTERS,
        questionIds: ["x"],
        options: OPTIONS,
      })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/not both|filters or questionIds/i);
  });

  it("accepts kind=paper and proceeds past kind validation (reaches auth gate)", async () => {
    const { POST } = await import("@/app/api/export/route");
    // In tests cookies() throws → the request resolves as anon, so a valid
    // kind=paper now hits the download gate and returns 401 ("sign in to
    // download") BEFORE the query. 400/500 remain acceptable across
    // environments; we just assert we passed kind validation (not a "kind" 400).
    const res = await POST(
      makeReq({ kind: "paper", filters: VALID_FILTERS, options: OPTIONS })
    );
    expect([400, 401, 500]).toContain(res.status);
    if (res.status === 400) {
      const body = await res.json();
      // Whatever 400 we got, it must NOT be the "kind" 400
      expect(body.error).not.toMatch(/^kind/i);
    }
  });
});

/**
 * The download gate on the anon path. In tests cookies() throws → the request
 * resolves as anon, so every kind is denied with 401 ("sign in to download")
 * before the query runs. Student→200 / student-tags→403 / staff→200 need a real
 * cookie session and are covered by the pure resolveExportAccess spec
 * (tests/export-access.test.ts). Each request uses a unique x-forwarded-for so
 * the anon rate-limit bucket never interferes.
 */
describe.skipIf(!HAS_ENV)("/api/export download gate (anon)", () => {
  for (const kind of ["paper", "key", "tags"] as const) {
    it(`denies anon kind=${kind} with 401`, async () => {
      const { POST } = await import("@/app/api/export/route");
      const res = await POST(
        makeReq({ kind, filters: VALID_FILTERS, options: OPTIONS })
      );
      expect(res.status).toBe(401);
      const body = await res.json();
      expect(body.error).toBeTruthy();
    });
  }
});
