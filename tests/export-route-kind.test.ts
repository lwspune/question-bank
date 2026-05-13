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

  it("accepts kind=paper and proceeds past kind validation (reaches query/auth layer)", async () => {
    const { POST } = await import("@/app/api/export/route");
    // Bad examId → query yields 0 rows → 400 "No questions match these filters".
    // If the route accepted kind, this is the next error we'll see.
    // Outside Next request scope cookies() can throw → 500 is also acceptable;
    // we just want to assert we passed kind validation (not the "kind"-themed 400).
    const res = await POST(
      makeReq({ kind: "paper", filters: VALID_FILTERS, options: OPTIONS })
    );
    expect([400, 500]).toContain(res.status);
    if (res.status === 400) {
      const body = await res.json();
      // Whatever 400 we got, it must NOT be the "kind" 400
      expect(body.error).not.toMatch(/^kind/i);
    }
  });
});
