/**
 * Exam rooms (owner, 2026-11-25): the pure core. One room per exam; a student
 * sees only the rooms for the exams on their profile, with Join.
 *
 * - checkRoomText: what a student may post. Phone numbers, emails and links are
 *   REFUSED, not masked (a room is public to its members, and a masked number
 *   still invites "DM me"); abuse is refused; maths, years and question numbers
 *   pass.
 * - buildRoomList: joined rooms first, then the student's other exams; unknown
 *   slugs and closed rooms drop out.
 * - pickDailyQuestion: never used in this room first, else the one used longest ago.
 * - room V: the prompt carries the exam and the doubt; a SKIP reply posts nothing.
 */
import { describe, it, expect } from "vitest";
import { checkRoomText, ROOM_TEXT_MAX } from "@/lib/rooms/text";
import { buildRoomList, totalUnread, badgeText, plainPreview, roomBadge } from "@/lib/rooms/list";
import { pickDailyQuestion } from "@/lib/rooms/daily";
import { roomVMessage, cleanRoomVReply } from "@/lib/rooms/vReply";
import { hasPersonal } from "@/lib/chat/maskPersonal";

describe("checkRoomText", () => {
  it("trims and accepts an ordinary doubt with maths", () => {
    const r = checkRoomText("  If x + 1/x = 5, why is x^2 + 1/x^2 = 23 and not 25?  ");
    expect(r).toEqual({ ok: true, body: "If x + 1/x = 5, why is x^2 + 1/x^2 = 23 and not 25?" });
  });

  it("keeps years, question numbers and marks", () => {
    expect(checkRoomText("CGL 2024 Tier I Q.45, I got 142 marks").ok).toBe(true);
  });

  it("refuses an empty message and one over the limit", () => {
    expect(checkRoomText("   ").ok).toBe(false);
    expect(checkRoomText("a".repeat(ROOM_TEXT_MAX + 1)).ok).toBe(false);
    expect(checkRoomText("a".repeat(ROOM_TEXT_MAX)).ok).toBe(true);
  });

  it("refuses phone numbers and emails", () => {
    expect(checkRoomText("call me on 98765 43210").ok).toBe(false);
    expect(checkRoomText("+91 9876543210 whatsapp").ok).toBe(false);
    expect(checkRoomText("mail me at riya@gmail.com").ok).toBe(false);
  });

  it("refuses links, including bare domains and group invites", () => {
    for (const t of ["see https://example.com", "www.example.in", "join t.me/cglgroup", "wa.me/919876543210", "bit.ly/abc", "notes at drive.google.com/x"]) {
      expect(checkRoomText(t).ok, t).toBe(false);
    }
  });

  it("does not take a decimal or an abbreviation for a link", () => {
    expect(checkRoomText("speed is 2.5 m/s, i.e. 9 km/h").ok).toBe(true);
  });

  it("refuses abuse", () => {
    expect(checkRoomText("you are a chutiya").ok).toBe(false);
  });

  it("says why it refused", () => {
    const r = checkRoomText("call 9876543210");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/phone|email/i);
  });

  it("folds runs of blank lines", () => {
    const r = checkRoomText("line one\n\n\n\nline two");
    expect(r).toEqual({ ok: true, body: "line one\n\nline two" });
  });
});

describe("hasPersonal", () => {
  it("finds a mobile or an email and nothing else", () => {
    expect(hasPersonal("9876543210")).toBe(true);
    expect(hasPersonal("a@b.co")).toBe(true);
    expect(hasPersonal("2024 Q.45, 142 marks")).toBe(false);
  });
});

describe("buildRoomList", () => {
  const nameOf = (slug: string) => ({ nda: "NDA", cds: "CDS", "ssc-cgl": "SSC CGL" } as Record<string, string>)[slug] ?? null;

  it("puts joined rooms first, then the student's other exams, in profile order", () => {
    const list = buildRoomList({
      targetExams: ["cds", "ssc-cgl", "nda"],
      nameOf,
      joined: new Set(["ssc-cgl"]),
      closed: new Set(),
      unread: new Map([["ssc-cgl", 3]]),
    });
    expect(list.joined.map((r) => r.slug)).toEqual(["ssc-cgl"]);
    expect(list.joined[0]).toMatchObject({ name: "SSC CGL", unread: 3 });
    expect(list.others.map((r) => r.slug)).toEqual(["cds", "nda"]);
  });

  it("drops unknown slugs, closed rooms and repeats", () => {
    const list = buildRoomList({
      targetExams: ["cds", "gone-exam", "nda", "cds"],
      nameOf,
      joined: new Set(),
      closed: new Set(["nda"]),
      unread: new Map(),
    });
    expect(list.others.map((r) => r.slug)).toEqual(["cds"]);
  });

  it("keeps a joined room whose exam left the profile (the student can still leave it)", () => {
    const list = buildRoomList({ targetExams: ["cds"], nameOf, joined: new Set(["nda"]), closed: new Set(), unread: new Map() });
    expect(list.joined.map((r) => r.slug)).toEqual(["nda"]);
  });
});

describe("roomBadge", () => {
  it("uses the exam's distinctive short word, plus a level or class", () => {
    expect(roomBadge("SSC CGL")).toBe("CGL");
    expect(roomBadge("SSC CGL Tier II")).toBe("CGL II");
    expect(roomBadge("NDA")).toBe("NDA");
    expect(roomBadge("CBSE Class 12")).toBe("CBSE 12");
    expect(roomBadge("JEE Mains")).toBe("JEE");
    expect(roomBadge("MHT-CET")).toBe("CET");
    expect(roomBadge("MPSC Group B & C")).toBe("MPSC");
  });
  it("falls back to initials when no short capital word exists", () => {
    expect(roomBadge("Foundation Course")).toBe("FC");
    expect(roomBadge("Worksheets")).toBe("WOR");
  });
});

describe("plainPreview", () => {
  it("drops maths delimiters and writes simple LaTeX as text for one-line previews", () => {
    expect(plainPreview("If \\(x + \\frac{1}{x} = 5\\), find \\(x^2 + \\frac{1}{x^2}\\)")).toBe("If x + 1/x = 5, find x² + 1/x²");
    expect(plainPreview("\\(a^{3} - b^3\\) and \\(x^{n}\\)")).toBe("a³ - b³ and x^n");
    expect(plainPreview("So \\(25 - 2 \\cdot 1 = 23\\)")).toBe("So 25 - 2 · 1 = 23");
    expect(plainPreview("line one\n\nline two")).toBe("line one line two");
  });
  it("leaves plain text alone", () => {
    expect(plainPreview("Why take 2 away? I keep getting 25.")).toBe("Why take 2 away? I keep getting 25.");
  });
});

describe("unread badge", () => {
  it("adds joined rooms' unread and caps the label", () => {
    expect(totalUnread([{ unread: 3 }, { unread: 0 }, { unread: 4 }])).toBe(7);
    expect(badgeText(0)).toBeNull();
    expect(badgeText(7)).toBe("7");
    expect(badgeText(12)).toBe("9+");
  });
});

describe("pickDailyQuestion", () => {
  it("takes the first candidate never posted in the room", () => {
    expect(pickDailyQuestion(["a", "b", "c"], new Map([["a", "2026-11-20"]]))).toBe("b");
  });
  it("takes the one used longest ago once all are used", () => {
    const used = new Map([
      ["a", "2026-11-20"],
      ["b", "2026-11-02"],
      ["c", "2026-11-11"],
    ]);
    expect(pickDailyQuestion(["a", "b", "c"], used)).toBe("b");
  });
  it("is null with no candidates", () => {
    expect(pickDailyQuestion([], new Map())).toBeNull();
  });
});

describe("room V", () => {
  it("names the exam and carries the doubt and what it replies to", () => {
    const m = roomVMessage({
      examName: "SSC CGL",
      doubt: "Why take 2 away?",
      repliesTo: "Got (a). Squared both sides and took 2 away.",
      question: { text: "If x + 1/x = 5, what is x^2 + 1/x^2?", options: ["23", "25", "27", "21"] },
    });
    expect(m).toContain("SSC CGL");
    expect(m).toContain("Why take 2 away?");
    expect(m).toContain("Squared both sides");
    expect(m).toContain("x + 1/x = 5");
  });

  it("posts nothing on SKIP or an empty reply, and trims a long one", () => {
    expect(cleanRoomVReply("SKIP")).toBeNull();
    expect(cleanRoomVReply("  ")).toBeNull();
    expect(cleanRoomVReply("  The middle term is 2.  ")).toBe("The middle term is 2.");
    expect((cleanRoomVReply("x".repeat(5000)) ?? "").length).toBeLessThanOrEqual(1500);
  });
});
