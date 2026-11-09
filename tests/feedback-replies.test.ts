/**
 * Replies to feature requests (migration 0243). Pure core:
 * src/lib/feedback/replies.ts.
 *
 * Staff reply to a student's request with a status and a short note. The
 * student sees it on /feedback, gets a menu line while it is unread, and gets
 * ONE email per status (a note edit sends nothing; the email_sends dedupe key
 * holds that, tested in tests/feedback-replies-db.test.ts).
 */
import { describe, it, expect } from "vitest";
import {
  REPLY_STATUSES,
  STATUS_LABELS,
  validateReply,
  isUnreadAgain,
  feedbackReplyDedupeKey,
  buildFeedbackReplyEmail,
} from "@/lib/feedback/replies";

describe("validateReply", () => {
  it("accepts every status, with or without a note", () => {
    for (const status of REPLY_STATUSES) {
      expect(validateReply({ status, note: "" })).toEqual({ ok: true, value: { status, note: null } });
    }
    expect(validateReply({ status: "planned", note: "  Coming in December.  " })).toEqual({
      ok: true,
      value: { status: "planned", note: "Coming in December." },
    });
  });

  it("treats a missing or whitespace-only note as no note", () => {
    expect(validateReply({ status: "done" })).toEqual({ ok: true, value: { status: "done", note: null } });
    expect(validateReply({ status: "done", note: " \n " })).toEqual({ ok: true, value: { status: "done", note: null } });
  });

  it("rejects an unknown status", () => {
    expect(validateReply({ status: "shipped", note: "" }).ok).toBe(false);
    expect(validateReply({ status: undefined, note: "" }).ok).toBe(false);
  });

  it("rejects a note over 1,000 characters (the DB CHECK) and a non-string note", () => {
    expect(validateReply({ status: "done", note: "x".repeat(1000) }).ok).toBe(true);
    expect(validateReply({ status: "done", note: "x".repeat(1001) }).ok).toBe(false);
    expect(validateReply({ status: "done", note: 42 }).ok).toBe(false);
  });
});

describe("STATUS_LABELS", () => {
  it("has a student-facing label for every status, with no em dashes", () => {
    for (const status of REPLY_STATUSES) {
      expect(STATUS_LABELS[status]).toBeTruthy();
      expect(STATUS_LABELS[status]).not.toMatch(/—/);
    }
  });
});

describe("isUnreadAgain", () => {
  it("a first reply is unread", () => {
    expect(isUnreadAgain(null, { status: "received", note: null })).toBe(true);
  });

  it("a status change is unread again", () => {
    expect(isUnreadAgain({ status: "planned", note: "Soon" }, { status: "done", note: "Soon" })).toBe(true);
  });

  it("a note edit is unread again (the email is decided by the send log, not here)", () => {
    expect(isUnreadAgain({ status: "planned", note: "Soon" }, { status: "planned", note: "In December" })).toBe(true);
    expect(isUnreadAgain({ status: "planned", note: null }, { status: "planned", note: "In December" })).toBe(true);
  });

  it("saving the same reply again leaves it as it was", () => {
    expect(isUnreadAgain({ status: "done", note: "Live" }, { status: "done", note: "Live" })).toBe(false);
  });
});

describe("feedbackReplyDedupeKey", () => {
  it("is one key per request AND status, so each status mails once", () => {
    const id = "11111111-2222-3333-4444-555555555555";
    expect(feedbackReplyDedupeKey(id, "planned")).toBe(`feedback_reply:${id}:planned`);
    expect(feedbackReplyDedupeKey(id, "planned")).not.toBe(feedbackReplyDedupeKey(id, "done"));
  });
});

describe("buildFeedbackReplyEmail", () => {
  const base = {
    name: "Asha Patil",
    request: "Please add CUET papers",
    status: "done" as const,
    note: "CUET is live now.",
  };

  it("greets by first name, quotes the request, gives the status and note, links to /feedback", () => {
    const e = buildFeedbackReplyEmail(base);
    expect(e.text).toContain("Hi Asha,");
    expect(e.text).toContain("Please add CUET papers");
    expect(e.text).toContain(STATUS_LABELS.done);
    expect(e.text).toContain("CUET is live now.");
    expect(e.text).toContain("https://www.pyqvault.com/feedback");
    expect(e.html).toContain("https://www.pyqvault.com/feedback");
  });

  it("has a subject per status", () => {
    const subjects = new Set(REPLY_STATUSES.map((status) => buildFeedbackReplyEmail({ ...base, status }).subject));
    expect(subjects.size).toBe(REPLY_STATUSES.length);
  });

  it("works with no note and no name", () => {
    const e = buildFeedbackReplyEmail({ ...base, name: "", note: null });
    expect(e.text.startsWith("Hi,")).toBe(true);
    expect(e.text).not.toContain("null");
    expect(e.html).not.toContain("null");
  });

  it("escapes HTML in the student's request and in the note", () => {
    const e = buildFeedbackReplyEmail({ ...base, request: "<script>x</script>", note: "a & b" });
    expect(e.html).not.toContain("<script>");
    expect(e.html).toContain("&lt;script&gt;");
    expect(e.html).toContain("a &amp; b");
  });

  it("cuts a long request in the email so it stays short", () => {
    const e = buildFeedbackReplyEmail({ ...base, request: "word ".repeat(200) });
    expect(e.text.length).toBeLessThan(1200);
  });

  it("has no em dashes", () => {
    for (const status of REPLY_STATUSES) {
      const e = buildFeedbackReplyEmail({ ...base, status });
      expect(e.text + e.subject).not.toMatch(/—/);
    }
  });
});
