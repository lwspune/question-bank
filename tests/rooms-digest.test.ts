/**
 * The owner's evening rooms email (owner moderates, 2026-11-25): what needs a
 * look (hidden by reports, reported but showing), doubts nobody answered, and
 * a one-line count per room. Nothing to look at and no activity: no email.
 */
import { describe, it, expect } from "vitest";
import { buildRoomsDigest, type RoomsDigestInput } from "@/lib/rooms/digest";

const base: RoomsDigestInput = {
  dateLabel: "25 Nov",
  dashboardUrl: "https://www.pyqvault.com/dashboard/rooms",
  flagged: [],
  unanswered: [],
  rooms: [],
};

describe("buildRoomsDigest", () => {
  it("sends nothing on a quiet day", () => {
    expect(buildRoomsDigest(base)).toBeNull();
  });

  it("lists hidden and reported messages first, with who wrote them and why", () => {
    const email = buildRoomsDigest({
      ...base,
      flagged: [
        { room: "SSC CGL", name: "Ravi K.", body: "join my group <b>now</b>", reports: 3, hidden: true, reasons: ["spam"] },
        { room: "CDS", name: "Meena", body: "this is rubbish", reports: 1, hidden: false, reasons: ["abuse"] },
      ],
    })!;
    expect(email.subject).toMatch(/2 to check/);
    expect(email.text).toContain("Hidden after 3 reports");
    expect(email.text).toContain("Ravi K.");
    expect(email.text.indexOf("SSC CGL")).toBeLessThan(email.text.indexOf("CDS"));
    expect(email.html).not.toContain("<b>now</b>");
    expect(email.html).toContain("&lt;b&gt;now&lt;/b&gt;");
    expect(email.text).toContain("https://www.pyqvault.com/dashboard/rooms");
  });

  it("lists unanswered doubts and the day's counts", () => {
    const email = buildRoomsDigest({
      ...base,
      unanswered: [{ room: "NDA", name: "Arjun", body: "How do I solve Q.45 of NDA 2024?", hoursAgo: 5 }],
      rooms: [{ room: "NDA", messages: 14, students: 6, joined: 3 }],
    })!;
    expect(email.subject).toMatch(/1 unanswered/);
    expect(email.text).toContain("How do I solve Q.45");
    expect(email.text).toContain("NDA: 14 messages from 6 students, 3 joined");
  });
});
