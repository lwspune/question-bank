/**
 * Every mobile number a staff surface renders is a WhatsApp link, built by one
 * helper.
 *
 * WHY A CONTRACT TEST. The five surfaces that show someone's number grew
 * independently and had drifted into three different answers: /dashboard/leads
 * hand-rolled a `wa.me` URL, the two /superadmin lists used `tel:` (a dead end on
 * the desktop where staff actually read them), and the roster and student detail
 * page rendered plain text. Nothing failed — a number that isn't a link looks
 * exactly like one that is until you click it.
 *
 * The rules below are what keeps the next surface from inventing a fourth answer:
 *
 *  1. No `tel:` built from a number. WhatsApp is the channel for this audience —
 *     `teacherAccess/validate.ts` says so, and `normalizeMobile` only ever accepts
 *     a 6-9 mobile, so none of these are landlines.
 *  2. `wa.me/<recipient>` is built ONLY by `whatsappHref`. A hand-rolled link
 *     skips the validity guard and sends staff to WhatsApp's "phone number shared
 *     via url is invalid" page. The recipient-LESS share link (`wa.me/?text=`) is
 *     a different thing and stays where it is.
 *  3. The known surfaces keep the link. A list rots by omission, so rule 2 is the
 *     one that catches a NEW surface; this one catches a regression in an old.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SRC = join(process.cwd(), "src");

/** The one module allowed to build a recipient link. */
const HELPER = join("src", "lib", "profile", "mobile.ts");

/** Surfaces that render someone else's number. Each must link it. */
const SURFACES = [
  join("src", "app", "dashboard", "leads", "LeadsBrowser.tsx"),
  join("src", "app", "dashboard", "students", "StudentRosterClient.tsx"),
  join("src", "app", "dashboard", "students", "[id]", "page.tsx"),
  join("src", "app", "superadmin", "TeacherRequests.tsx"),
  join("src", "app", "superadmin", "ContactMessages.tsx"),
];

function sourcesUnder(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) sourcesUnder(full, out);
    else if (entry.endsWith(".ts") || entry.endsWith(".tsx")) out.push(full);
  }
  return out;
}

describe("staff surfaces reach a number through WhatsApp, via one helper", () => {
  const files = sourcesUnder(SRC);

  it("scanned a real tree — an empty scan would pass every rule below", () => {
    expect(files.length).toBeGreaterThan(200);
  });

  it("builds no tel: link from a number", () => {
    const offenders = files
      .filter((f) => readFileSync(f, "utf8").includes("tel:"))
      .map((f) => relative(process.cwd(), f));
    expect(offenders).toEqual([]);
  });

  it("builds a wa.me RECIPIENT link only in the helper", () => {
    const offenders: string[] = [];
    for (const f of files) {
      const rel = relative(process.cwd(), f);
      if (rel === HELPER) continue;
      const src = readFileSync(f, "utf8");
      let i = src.indexOf("wa.me/");
      while (i !== -1) {
        // `wa.me/?text=` is the recipient-LESS share sheet, not a chat link.
        if (src[i + "wa.me/".length] !== "?") offenders.push(rel);
        i = src.indexOf("wa.me/", i + 1);
      }
    }
    expect([...new Set(offenders)]).toEqual([]);
  });

  it.each(SURFACES)("%s links the number it renders", (rel) => {
    const src = readFileSync(join(process.cwd(), rel), "utf8");
    expect(src.includes("WhatsappLink") || src.includes("whatsappHref")).toBe(true);
  });

  it("keeps the roster's WhatsApp link OUTSIDE the row <Link>", () => {
    // An <a> nested in an <a> is invalid HTML and hydrates badly. The roster row
    // is a Link over the whole name block, so the number had to move out of it.
    const src = readFileSync(join(process.cwd(), SURFACES[1]), "utf8");
    // Opening tags only: `<Link` followed by whitespace, so a `<Link>` written in
    // a nearby COMMENT can't be read as an unclosed tag. It can — it did, and the
    // probe failed on prose rather than on the code it exists to check.
    const opens = [...src.matchAll(/<Link\s/g)].map((m) => m.index);
    expect(opens.length).toBeGreaterThan(0);
    for (const open of opens) {
      const close = src.indexOf("</Link>", open);
      expect(close).toBeGreaterThan(open);
      expect(src.slice(open, close)).not.toContain("<WhatsappLink");
    }
  });
});
