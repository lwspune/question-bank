import { describe, it, expect } from "vitest";
import {
  channelOf,
  landingGroup,
  summariseChannels,
  summariseLandings,
  describeSource,
  parseAcqWindow,
  parseAcqExam,
  type AcqRow,
} from "@/lib/pmf/acquisition";
import { MIN_SEGMENT_N } from "@/lib/pmf/snapshot";

const row = (p: Partial<AcqRow>): AcqRow => ({
  source: null,
  medium: null,
  campaign: null,
  beforeTracking: false,
  students: 1,
  signalled: 0,
  mocked: 0,
  paid: 0,
  ...p,
});

describe("channelOf", () => {
  it("names the channels that matter by name", () => {
    expect(channelOf(row({ source: "chatgpt.com", medium: "campaign" })).label).toBe("ChatGPT");
    expect(channelOf(row({ source: "google", medium: "organic" })).label).toBe("Google");
    expect(channelOf(row({ source: "bing", medium: "organic" })).label).toBe("Bing");
  });

  it("puts a shared mock result ahead of whatever host carried it", () => {
    expect(channelOf(row({ source: "whatsapp", medium: "social", campaign: "mock-result" })).label).toBe(
      "Shared mock result"
    );
  });

  it("groups the long tail", () => {
    expect(channelOf(row({ source: "yahoo", medium: "organic" })).label).toBe("Other search");
    expect(channelOf(row({ source: "instagram", medium: "social" })).label).toBe("Social");
    expect(channelOf(row({ source: "some-blog.in", medium: "referral" })).label).toBe("Other websites");
    expect(channelOf(row({ source: "newsletter", medium: "email" })).label).toBe("Tagged links");
  });

  it("keeps 'nothing recorded' and 'before tracking' apart — neither is direct", () => {
    expect(channelOf(row({})).label).toBe("No referrer recorded");
    expect(channelOf(row({ beforeTracking: true })).label).toBe("Before 17 Sep (never recorded)");
  });
});

describe("summariseChannels", () => {
  it("merges rows of one channel, sorts by size and keeps 'before tracking' last", () => {
    const out = summariseChannels([
      row({ beforeTracking: true, students: 50 }),
      row({ source: "google", medium: "organic", students: 3 }),
      row({ source: "chatgpt.com", medium: "campaign", students: 4 }),
      row({ source: "chatgpt.com", medium: "referral", students: 2 }),
    ]);
    expect(out.map((c) => [c.label, c.students])).toEqual([
      ["ChatGPT", 6],
      ["Google", 3],
      ["Before 17 Sep (never recorded)", 50],
    ]);
  });

  it("withholds rates below the sample floor but always shows counts", () => {
    const [small] = summariseChannels([
      row({ source: "google", medium: "organic", students: MIN_SEGMENT_N - 1, signalled: 5, mocked: 2, paid: 1 }),
    ]);
    expect(small).toMatchObject({ students: MIN_SEGMENT_N - 1, signalled: 5, mocked: 2, paid: 1 });
    expect(small.signalledRate).toBeNull();
    expect(small.mockedRate).toBeNull();

    const [big] = summariseChannels([
      row({ source: "google", medium: "organic", students: 20, signalled: 10, mocked: 5, paid: 1 }),
    ]);
    expect(big.signalledRate).toBe(0.5);
    expect(big.mockedRate).toBe(0.25);
  });
});

describe("landingGroup", () => {
  it("groups by section and exam", () => {
    expect(landingGroup("/notes/mht-cet-maths/differentiation/logarithmic")).toBe("/notes/mht-cet-maths");
    expect(landingGroup("/questions/mh-hsc-12/physics/thermodynamics")).toBe("/questions/mh-hsc-12");
    expect(landingGroup("/board/cbse-12/mathematics/vector-algebra")).toBe("/board/cbse-12");
    expect(landingGroup("/mock/exam/cds")).toBe("/mock/exam");
    expect(landingGroup("/welcome")).toBe("/welcome");
    expect(landingGroup("/")).toBe("/");
    expect(landingGroup(null)).toBe("(not recorded)");
  });
});

describe("summariseLandings", () => {
  it("sums by group and keeps the top N", () => {
    const out = summariseLandings(
      [
        { landing: "/notes/mht-cet-maths/a", students: 2, signalled: 1, mocked: 0, paid: 0 },
        { landing: "/notes/mht-cet-maths/b", students: 3, signalled: 1, mocked: 1, paid: 0 },
        { landing: "/", students: 4, signalled: 0, mocked: 0, paid: 0 },
        { landing: "/questions/nda/maths/x", students: 1, signalled: 0, mocked: 0, paid: 0 },
      ],
      2
    );
    expect(out.map((l) => [l.group, l.students])).toEqual([
      ["/notes/mht-cet-maths", 5],
      ["/", 4],
    ]);
  });
});

describe("parseAcqWindow / parseAcqExam (the page's URL filters)", () => {
  const now = new Date("2026-09-28T12:00:00Z");

  it("defaults to 30 days and accepts 7 days or 'since tracking began'", () => {
    expect(parseAcqWindow(undefined, now)).toEqual({ key: "30", since: "2026-08-29T12:00:00.000Z", label: "Last 30 days" });
    expect(parseAcqWindow("7", now).since).toBe("2026-09-21T12:00:00.000Z");
    expect(parseAcqWindow("tracked", now)).toEqual({
      key: "tracked",
      since: "2026-09-16T18:30:00.000Z", // 17 Sep, midnight IST
      label: "Since tracking began (17 Sep)",
    });
  });

  it("falls back to the default on anything else", () => {
    expect(parseAcqWindow("9999", now).key).toBe("30");
    expect(parseAcqWindow(["7", "30"], now).key).toBe("7");
  });

  it("accepts only the exams on offer", () => {
    expect(parseAcqExam("mht-cet")).toBe("mht-cet");
    expect(parseAcqExam(undefined)).toBeNull();
    expect(parseAcqExam("'; drop table")).toBeNull();
  });
});

describe("describeSource (one student's page)", () => {
  it("says where a student came from, and where they landed", () => {
    expect(
      describeSource({ source: "chatgpt.com", medium: "campaign", campaign: null, landing: "/questions/mht-cet/maths/limits", createdAt: "2026-09-20T00:00:00Z" })
    ).toBe("ChatGPT → /questions/mht-cet/maths/limits");
  });

  it("is honest about accounts from before tracking and about empty rows", () => {
    expect(describeSource({ source: null, medium: null, campaign: null, landing: null, createdAt: "2026-08-01T00:00:00Z" })).toBe(
      "Before 17 Sep (never recorded)"
    );
    expect(describeSource({ source: null, medium: null, campaign: null, landing: null, createdAt: "2026-09-20T00:00:00Z" })).toBe(
      "No referrer recorded"
    );
  });
});
