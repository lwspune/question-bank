import { describe, expect, it } from "vitest";
import {
  checkSheetUrl,
  fetchSheetHtml,
  htmlToSheetText,
  keyRowsFromShifts,
  matchKeyRow,
  sheetHash,
  toStoredKeyRow,
  type StoredKeyRow,
} from "@/lib/scoreCalc/jeeServer";
import { parseNtaResponseText } from "@/lib/scoreCalc/ntaSheet";
import type { NtaKeyShift } from "@/lib/scoreCalc/ntaKey";

describe("checkSheetUrl", () => {
  it("accepts NTA's response-sheet host over https", () => {
    const r = checkSheetUrl("https://cdn3.digialm.com/per/g28/pub/2083/touchstone/AssessmentQPHTMLMode1/x.html");
    expect(r.ok).toBe(true);
  });

  it.each([
    ["http://cdn3.digialm.com/x.html", "plain http"],
    ["https://evil.com/cdn3.digialm.com/x.html", "another host"],
    ["https://cdn3.digialm.com.evil.com/x.html", "a look-alike host"],
    ["https://user:pw@cdn3.digialm.com/x.html", "credentials"],
    ["https://cdn3.digialm.com:8443/x.html", "a port"],
    ["https://127.0.0.1/x.html", "an address"],
    ["not a link", "not a URL"],
  ])("refuses %s (%s)", (url) => {
    expect(checkSheetUrl(url).ok).toBe(false);
  });
});

describe("fetchSheetHtml", () => {
  const ok = (body: string, headers: Record<string, string> = {}) =>
    new Response(body, { status: 200, headers: { "content-type": "text/html", ...headers } });

  it("returns the page", async () => {
    const r = await fetchSheetHtml(new URL("https://cdn3.digialm.com/a.html"), async () => ok("<p>hi</p>"));
    expect(r).toEqual({ ok: true, html: "<p>hi</p>" });
  });

  it("follows a redirect only within NTA's host", async () => {
    const calls: string[] = [];
    const fake = async (u: string | URL | Request) => {
      calls.push(String(u));
      if (calls.length === 1) return new Response(null, { status: 302, headers: { location: "https://evil.com/x" } });
      return ok("nope");
    };
    const r = await fetchSheetHtml(new URL("https://cdn3.digialm.com/a.html"), fake);
    expect(r.ok).toBe(false);
    expect(calls).toHaveLength(1);
  });

  it("refuses a page larger than the cap", async () => {
    const big = "x".repeat(6 * 1024 * 1024);
    const r = await fetchSheetHtml(new URL("https://cdn3.digialm.com/a.html"), async () => ok(big));
    expect(r.ok).toBe(false);
  });

  it("reports a page NTA no longer serves", async () => {
    const r = await fetchSheetHtml(new URL("https://cdn3.digialm.com/a.html"), async () => new Response("", { status: 404 }));
    expect(r.ok).toBe(false);
  });
});

describe("htmlToSheetText", () => {
  it("keeps labels and values apart and drops scripts", () => {
    const html = `<html><head><script>var a="Question ID : 1"</script><style>td{}</style></head><body>
      <table><tr><td class="bold">Q.1</td></tr></table>
      <table class="menu-tbl"><tr><td>Question Type :</td><td>MCQ</td></tr>
      <tr><td>Question ID :</td><td>7364751518</td></tr>
      <tr><td>Option 1 ID :</td><td>7364755171</td></tr>
      <tr><td>Option 2 ID :</td><td>7364755169</td></tr>
      <tr><td>Status :</td><td>Answered</td></tr>
      <tr><td>Chosen Option :</td><td>2</td></tr></table>
      <table><tr><td>Q.2</td></tr><tr><td>Given Answer :</td><td>&nbsp;12</td></tr></table>
      <table><tr><td>Question Type :</td><td>SA</td></tr><tr><td>Question ID :</td><td>7364751522</td></tr></table>
      </body></html>`;
    const rows = parseNtaResponseText(htmlToSheetText(html));
    expect(rows).toEqual([
      { questionId: "7364751518", chosen: "7364755169" },
      { questionId: "7364751522", chosen: "12" },
    ]);
  });
});

function row(id: string, status: "provisional" | "final", qids: string[], loadedAt = "2027-02-01T00:00:00Z"): StoredKeyRow {
  return {
    id,
    sitting: "2027-01-22-s1",
    region: "india",
    status,
    drop_policy: "all",
    loaded_at: loadedAt,
    key: Object.fromEntries(qids.map((q) => [q, { subject: "maths", answer: { kind: "values", values: ["1"] } }])),
  };
}

describe("matchKeyRow", () => {
  const responses = ["a", "b", "c"].map((q) => ({ questionId: q, chosen: null }));

  it("picks the key that holds the sheet's questions", () => {
    const m = matchKeyRow(responses, [row("other", "final", ["x", "y"]), row("mine", "provisional", ["a", "b", "c"])]);
    expect(m?.row.id).toBe("mine");
  });

  it("prefers NTA's final key over the provisional one for the same shift", () => {
    const m = matchKeyRow(responses, [row("prov", "provisional", ["a", "b", "c"]), row("final", "final", ["a", "b", "c"])]);
    expect(m?.row.id).toBe("final");
  });

  it("finds nothing when no key holds the sheet's questions", () => {
    expect(matchKeyRow(responses, [row("other", "final", ["x"])])).toBeNull();
  });
});

describe("toStoredKeyRow", () => {
  const base = { id: "1", sitting: "2027-01-22-s1", region: "india", status: "final", drop_policy: "all", loaded_at: "x" };

  it("accepts the shape the loader writes", () => {
    const r = toStoredKeyRow({ ...base, key: { "11": { subject: "physics", answer: { kind: "values", values: ["5"] } } } });
    expect(r?.key["11"]).toEqual({ subject: "physics", answer: { kind: "values", values: ["5"] } });
  });

  const badKeys: [unknown, string][] = [
    [{ "11": { subject: "biology", answer: { kind: "dropped" } } }, "an unknown subject"],
    [{ "11": { subject: "maths", answer: { kind: "values", values: [] } } }, "no accepted answer"],
    [{ "11": { subject: "maths", answer: { kind: "maybe" } } }, "an unknown answer kind"],
    [["11"], "an array"],
  ];
  it.each(badKeys)("refuses a key with %j (%s)", (key) => {
    expect(toStoredKeyRow({ ...base, key })).toBeNull();
  });
});

describe("sheetHash", () => {
  it("is the same for the same answers and differs when one changes", () => {
    const a = sheetHash([{ questionId: "1", chosen: "2" }, { questionId: "3", chosen: null }]);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(sheetHash([{ questionId: "1", chosen: "2" }, { questionId: "3", chosen: null }])).toBe(a);
    expect(sheetHash([{ questionId: "1", chosen: "4" }, { questionId: "3", chosen: null }])).not.toBe(a);
  });
});

describe("keyRowsFromShifts", () => {
  it("turns parsed shifts into one row per shift and region", () => {
    const shifts: NtaKeyShift[] = [
      {
        region: "india",
        date: "2027-01-22",
        shift: 1,
        entries: new Map([["11", { subject: "maths", answer: { kind: "dropped" } }]]),
      },
    ];
    expect(keyRowsFromShifts(shifts, { status: "provisional", sourceUrl: "https://nta.example/key.pdf" })).toEqual([
      {
        calculator: "jee-main",
        sitting: "2027-01-22-s1",
        region: "india",
        status: "provisional",
        drop_policy: "all",
        source_url: "https://nta.example/key.pdf",
        key: { "11": { subject: "maths", answer: { kind: "dropped" } } },
      },
    ]);
  });
});
