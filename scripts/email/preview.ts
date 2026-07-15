/**
 * Render both email templates with representative data — no DB, no sending.
 *
 *   npx tsx scripts/email/preview.ts            # print the plain-text bodies
 *   npx tsx scripts/email/preview.ts --html     # also write an HTML preview file
 *
 * Why this exists: copy is the part of a campaign most likely to be wrong, and
 * the slowest to notice. The sibling English AI Tutor solved the same problem
 * with a `test_mode` that emails one of each template to a single address; this
 * needs no API key, no verified domain, and no inbox — so it's usable from the
 * first minute, and in review it beats reading template source.
 *
 * The data below is REPRESENTATIVE, not live (note the example.com addresses —
 * they'd be rejected by isUndeliverable, which is the point: this never sends).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildEmail } from "../../src/lib/email/templates";
import type { MockLite, Recipient } from "../../src/lib/email/recommend";

const GAT: MockLite = {
  id: "gg25s",
  slug: "nda-2025-sep-gat",
  title: "NDA 2025 (II) — General Ability Test",
  examId: "exam-nda",
  paperCode: "gat",
  pyqYear: 2025,
  pyqMonth: "Sep",
  totalQuestions: 150,
  durationSecs: 9000,
};

const MATHS: MockLite = {
  id: "mm26a",
  slug: "nda-2026-apr-maths",
  title: "NDA 2026 (I) — Mathematics",
  examId: "exam-nda",
  paperCode: "maths",
  pyqYear: 2026,
  pyqMonth: "Apr",
  totalQuestions: 120,
  durationSecs: 9000,
};

const SAMPLES: Recipient[] = [
  {
    userId: "u1",
    email: "kaivalya@example.com",
    name: "Kaivalya Joshi",
    kind: "next_mock",
    mock: GAT,
    dedupeKey: "next_mock:u1:gg25s",
    lastScore: { score: 77.39, maxScore: 600, mockTitle: "NDA 2026 (I) — General Ability Test" },
  },
  {
    // The no-score variant: an attempt that expired ungraded, or a name-less
    // email/password signup (~26% of the roster has no name).
    userId: "u2",
    email: "ansh@example.com",
    name: "",
    kind: "next_mock",
    mock: MATHS,
    dedupeKey: "next_mock:u2:mm26a",
    lastScore: null,
  },
  {
    userId: "u3",
    email: "taksh@example.com",
    name: "Taksh Chauhan",
    kind: "first_mock",
    mock: MATHS,
    dedupeKey: "first_mock:u3",
    lastScore: null,
  },
];

const TOKEN = "00000000-1111-2222-3333-444444444444";

function main() {
  const built = SAMPLES.map((r) => ({ r, e: buildEmail(r, TOKEN) }));

  for (const { r, e } of built) {
    console.log("=".repeat(78));
    console.log(`${r.kind}${r.lastScore ? " (with score)" : ""}${r.name ? "" : " (no name)"}`);
    console.log(`SUBJECT: ${e.subject}`);
    console.log("=".repeat(78));
    console.log(e.text);
    console.log("");
  }

  if (process.argv.includes("--html")) {
    const body = built
      .map(
        ({ r, e }) => `<p style="font:13px sans-serif;color:#64748b;margin:0 0 6px">
  <b>${r.kind}</b> — Subject: ${e.subject}</p>
<div style="background:#fff;padding:24px;border-radius:8px;margin:0 0 28px">${e.html}</div>`
      )
      .join("\n");
    const out = join(process.cwd(), "generated-papers", "email-preview.html");
    writeFileSync(
      out,
      `<!doctype html><meta charset="utf-8"><title>Email preview</title>
<div style="background:#f8fafc;padding:24px">${body}</div>`
    );
    console.log(`HTML preview → ${out}`);
  }
}

main();
