/**
 * Email bodies. Pure — no I/O — unit-tested in tests/email-templates.test.ts.
 *
 * Conventions carried over from the sibling English AI Tutor's v9 rewrite:
 *  - ALWAYS send text alongside HTML. Their note calls the plain-text
 *    alternative "the biggest deliverability win per Resend guidance".
 *  - Personalise the subject with a name + a real data hook (the score), not a
 *    generic "your practice is waiting" — which reads as a guilt-trip.
 *  - Inline styles only; no external CSS, no images, no tracking pixel.
 *
 * What we do that they don't: escape every interpolated value. `name` comes from
 * OAuth metadata (user-controlled) and lands inside HTML — unescaped it's an
 * injection vector into whatever renders the mail.
 *
 * Voice: PYQ Vault is the public brand (never "LWS" — that's the tenant org name
 * and is staff-surface only). Short, honest, specific. The ask names the real
 * time cost up front rather than hiding it.
 */
import { CONTACT_EMAIL } from "@/lib/brand";
import type { MockReport } from "./mockReport";
import type { Recipient } from "./recommend";

export const SITE_URL = "https://www.pyqvault.com";

/** Replies go to a real, monitored mailbox. `EMAIL_FROM` is a send-only address
 *  on the verified domain and has no inbox — without this, a student hitting
 *  Reply just bounces. The sibling English AI Tutor invites replies for exactly
 *  this reason: a student who can't sign in has no other channel to reach you.
 *
 *  BRAND: this address is student-facing (it's what their mail client shows on
 *  Reply), so it must carry the PYQ Vault brand — NOT the tenant-org address,
 *  which belongs to staff-gated surfaces only. Shares the ONE public-contact
 *  const with the Footer / /privacy / the report dialogs: four copy-pasted
 *  literals are exactly how that address drifted off-brand in the first place. */
export const REPLY_TO = CONTACT_EMAIL;

const BRAND = "PYQ Vault";
const ACCENT = "#4f46e5"; // indigo-600 — the brand fill (globals.css --brand)
const INK = "#334155";
const MUTED = "#64748b";

export type BuiltEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  headers: Record<string, string>;
};

/** Neutralise HTML-significant characters in interpolated values. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** "2 hours 30 min" — the honest time cost of the ask. */
export function formatDuration(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.round((secs % 3600) / 60);
  if (h && m) return `${h} hour${h === 1 ? "" : "s"} ${m} min`;
  if (h) return `${h} hour${h === 1 ? "" : "s"}`;
  return `${m} min`;
}

/** First name only — "Hi Asha" reads human; "Hi asha@gmail.com" doesn't.
 *  ~26% of students have no name, in which case we greet them without one. */
function greetingName(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? "";
  // displayName() falls back to the email / "(no name)" — neither is a name.
  if (!first || first.includes("@") || first.startsWith("(")) return "";
  return first;
}

export function buildEmail(r: Recipient, unsubscribeToken: string): BuiltEmail {
  const mockUrl = `${SITE_URL}/mock/${r.mock.slug}`;
  const unsubUrl = `${SITE_URL}/unsubscribe/${unsubscribeToken}`;
  const oneClickUrl = `${SITE_URL}/api/unsubscribe/${unsubscribeToken}`;
  const who = greetingName(r.name);
  const shape = `${r.mock.totalQuestions} questions, ${formatDuration(r.mock.durationSecs)}`;

  const { subject, lead } = r.kind === "next_mock" ? nextMockCopy(r, who) : firstMockCopy(who);

  const cta = r.kind === "next_mock" ? "Start this paper" : "Start your first mock";

  const text = [
    who ? `Hi ${who},` : "Hi,",
    "",
    lead,
    "",
    `${r.mock.title} — ${shape}, timed and auto-graded.`,
    // Carry the CTA the HTML renders as a button: the text body is a real
    // alternative, not a degraded one, and a bare URL with no label is worse.
    `${cta}: ${mockUrl}`,
    "",
    "It's a real past paper, served exactly as it was set. You get a score, a section split, and every question reviewable with the solution.",
    "",
    "Stuck, or can't sign in? Just reply to this email — it reaches a person.",
    "",
    `— ${BRAND}`,
    "",
    "---",
    `Don't want these emails? Unsubscribe: ${unsubUrl}`,
  ].join("\n");

  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 16px">${who ? `Hi ${escapeHtml(who)},` : "Hi,"}</p>
  <p style="margin:0 0 16px">${escapeHtml(lead)}</p>
  <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:0 0 20px">
    <p style="margin:0 0 4px;font-weight:600;color:#0f172a">${escapeHtml(r.mock.title)}</p>
    <p style="margin:0;color:${MUTED};font-size:14px">${escapeHtml(shape)}, timed and auto-graded</p>
  </div>
  <p style="margin:0 0 24px">
    <a href="${mockUrl}" style="background:${ACCENT};color:#fff;text-decoration:none;padding:11px 20px;border-radius:6px;display:inline-block;font-weight:600">${cta}</a>
  </p>
  <p style="margin:0 0 16px;color:${MUTED};font-size:14px">It's a real past paper, served exactly as it was set. You get a score, a section split, and every question reviewable with the solution.</p>
  <p style="margin:0 0 24px;color:${MUTED};font-size:14px">Stuck, or can&#39;t sign in? Just reply to this email — it reaches a person.</p>
  <p style="margin:0 0 24px">— ${BRAND}</p>
  <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 12px">
  <p style="margin:0;color:#94a3b8;font-size:12px">
    Don't want these emails? <a href="${unsubUrl}" style="color:#94a3b8">Unsubscribe</a>.
  </p>
</div>`;

  return {
    subject,
    text,
    html,
    replyTo: REPLY_TO,
    headers: {
      // RFC 8058 one-click. Gmail/Outlook render a native unsubscribe control
      // and reward it with better placement; it also gives people an exit that
      // doesn't depend on them finding the footer link.
      "List-Unsubscribe": `<${oneClickUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}

function nextMockCopy(r: Recipient, who: string): { subject: string; lead: string } {
  if (r.lastScore) {
    const { score, maxScore, mockTitle } = r.lastScore;
    const pretty = `${round(score)}/${round(maxScore)}`;
    return {
      subject: who ? `${pretty} last time, ${who} — ready for the next paper?` : `${pretty} last time — ready for the next paper?`,
      lead: `You scored ${pretty} on ${mockTitle}. Here's the next paper you haven't sat yet.`,
    };
  }
  return {
    subject: who ? `Your next NDA paper is ready, ${who}` : "Your next NDA paper is ready",
    lead: "Here's the next past paper you haven't sat yet.",
  };
}

function firstMockCopy(who: string): { subject: string; lead: string } {
  return {
    subject: who ? `${who}, your first NDA mock is waiting` : "Your first NDA mock is waiting",
    lead: "You've got an account but haven't sat a mock yet. The fastest way to find out where you actually stand is one real past paper, under the clock.",
  };
}

/** Scores are numeric(…) — drop a trailing .00 but keep a real fraction. */
function round(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, "");
}

// ── batch invites (migration 0084) ───────────────────────────────────────────

export type InviteEmailInput = {
  /** The inviting institute, from organizations.name. See the BRAND note below. */
  orgName: string;
  batchName: string;
  /** Absolute URL of the page where the invite is accepted or declined. */
  actionUrl: string;
};

/**
 * "X invited you to their batch" — transactional, sent on a teacher's action.
 *
 * BRAND EXCEPTION, DELIBERATE. Everywhere else the tenant org name is a
 * staff-gated string and a student never sees it (see CLAUDE.md). Here it MUST
 * appear: the student is being asked to let a specific institute see their exam
 * results, and consent that cannot name the party is not consent. PYQ Vault
 * remains the sender brand; the org is named as the inviter, not as the product.
 *
 * DELIBERATELY THIN. A mistyped address reaches a stranger, so this discloses
 * the institute, the batch name and nothing else — no student name, no scores,
 * no hint about whether the address has an account here. It ends with an
 * explicit ignore path so a wrong recipient has an action that is not "accept".
 *
 * NOT unsubscribable, and that is correct: this is a one-off transactional
 * message a human requested, not a campaign. `email_opt_out` gates the mock
 * recommendation run and does not apply.
 */
export function buildBatchInviteEmail(input: InviteEmailInput): BuiltEmail {
  const { orgName, batchName, actionUrl } = input;
  const subject = `${orgName} invited you to ${batchName} on ${BRAND}`;

  const text = [
    "Hi,",
    "",
    `${orgName} has invited you to join their batch "${batchName}" on ${BRAND}.`,
    "",
    "If you accept, their teachers will be able to see your mock test results.",
    "You can leave the batch at any time, which stops that.",
    "",
    `Accept or decline: ${actionUrl}`,
    "",
    `Don't recognise ${orgName}? Ignore this email — nothing happens unless you accept.`,
    "",
    `— ${BRAND}`,
  ].join("\n");

  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 16px">Hi,</p>
  <p style="margin:0 0 16px"><strong>${escapeHtml(orgName)}</strong> has invited you to join their batch &ldquo;${escapeHtml(batchName)}&rdquo; on ${BRAND}.</p>
  <p style="margin:0 0 20px">If you accept, their teachers will be able to see your mock test results. You can leave the batch at any time, which stops that.</p>
  <p style="margin:0 0 24px">
    <a href="${actionUrl}" style="background:${ACCENT};color:#fff;text-decoration:none;padding:11px 20px;border-radius:6px;display:inline-block;font-weight:600">Accept or decline</a>
  </p>
  <p style="margin:0 0 24px;color:${MUTED};font-size:14px">Don&#39;t recognise ${escapeHtml(orgName)}? Ignore this email — nothing happens unless you accept.</p>
  <p style="margin:0">— ${BRAND}</p>
</div>`;

  return { subject, text, html, replyTo: REPLY_TO, headers: {} };
}

// ── per-attempt mock report (migration 0110) ─────────────────────────────────

export type MockReportEmailInput = {
  report: MockReport;
  /** OAuth display name, or "" — greetingName handles both. */
  name: string;
  unsubscribeToken: string;
};

/** "1 min 20s" — a dwell reading, where the seconds matter. */
export function formatDwell(secs: number): string {
  if (secs <= 0) return "";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m ? `${m} min ${s}s` : `${s}s`;
}

/** "Algebra · Quadratic Equations", collapsing a missing half rather than
 *  rendering a naked separator. */
function where(q: { chapter: string; subtopic: string }): string {
  return [q.chapter, q.subtopic].filter(Boolean).join(" · ");
}

/** The peer line, only when there IS peer evidence. Absent evidence says
 *  nothing — it must never render as "0% of students got this right". */
function peerLine(peerPct: number | null): string {
  return peerPct === null ? "" : ` — ${peerPct}% of students got this right`;
}

/** Marks are numeric; show a whole number where it is one. */
function marks(n: number): string {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

/**
 * The report a student gets after each graded mock.
 *
 * WHY THIS IS GROWTH-FRAMED AND NOT A SCORECARD: the engagement gate in
 * CLAUDE.md forbids a bare score, and the result screen already showed them one
 * the moment they submitted. What this email adds is DELIBERATE PRACTICE — the
 * specific things to fix, named — which is the only reason it is worth an
 * inbox. The score appears once, as context for the findings, never as the
 * point.
 *
 * WHY EASY-WRONG LEADS: it is the section with the least ambiguity and the most
 * recoverable marks. A HARD question they lost is a study project; an EASY one
 * they lost is a habit, and habits move next week's score.
 *
 * SECTIONS DISAPPEAR RATHER THAN RENDER EMPTY. A paper where they left nothing
 * blank should not be told "you left 0 questions blank" — a section with no
 * content is a section with no business being in the email.
 */
export function buildMockReportEmail(input: MockReportEmailInput): BuiltEmail {
  const { report: r, name, unsubscribeToken } = input;
  const who = greetingName(name);
  const resultUrl = `${SITE_URL}/mock/attempt/${r.attemptId}/result`;
  const perfUrl = `${SITE_URL}/performance`;
  const unsubUrl = `${SITE_URL}/unsubscribe/${unsubscribeToken}`;
  const oneClickUrl = `${SITE_URL}/api/unsubscribe/${unsubscribeToken}`;

  const scoreLine = `${round(r.score)}/${round(r.maxScore)} (${r.pct}%) — ${r.correct} right, ${r.wrong} wrong, ${r.seenBlank} left blank`;

  const fixes = r.easyWrong.length || r.subtopics.length;
  const subject = who
    ? `${who}, ${round(r.score)}/${round(r.maxScore)} on ${r.mockTitle} — ${fixes} things to fix`
    : `${round(r.score)}/${round(r.maxScore)} on ${r.mockTitle} — what to fix`;

  // ── plain text ────────────────────────────────────────────────────────────
  const t: string[] = [who ? `Hi ${who},` : "Hi,", "", `You finished ${r.mockTitle}.`, scoreLine, ""];

  if (r.easyWrong.length) {
    t.push(`EASY MARKS YOU DROPPED (${r.easyWrong.length})`);
    for (const q of r.easyWrong) t.push(`  Q${q.position} · ${where(q)}${peerLine(q.peerPct)}`);
    t.push("");
  }
  if (r.easyLeft.length) {
    t.push(`EASY ONES YOU LOOKED AT AND LEFT (${r.easyLeft.length})`);
    for (const q of r.easyLeft) {
      const dwell = formatDwell(q.secs);
      t.push(`  Q${q.position} · ${where(q)}${dwell ? ` — you spent ${dwell} on it` : ""}`);
    }
    t.push("");
  }
  if (r.pacing) {
    t.push("PACING");
    t.push(
      `  You never reached ${r.pacing.neverReached} questions — ${marks(r.pacing.marksLeft)} marks you didn't get a shot at. That's the clock, not the syllabus.`
    );
    t.push("");
  }
  if (r.subtopics.length) {
    t.push("WHERE YOUR NEXT MARKS ARE");
    t.push("  Across every paper you've sat, not just this one:");
    for (const s of r.subtopics) {
      const acc = s.accuracy === null ? "" : ` (you're at ${s.accuracy}% over ${s.judged} questions)`;
      t.push(`  ${s.chapter} · ${s.subtopic} — about ${marks(s.gap)} marks${acc}`);
    }
    t.push("");
  }

  t.push(
    `Every question, with the solution: ${resultUrl}`,
    `Your full performance across all papers: ${perfUrl}`,
    "",
    "Reply to this email if something looks wrong — it reaches a person.",
    "",
    `— ${BRAND}`,
    "",
    "---",
    `Don't want these? Unsubscribe: ${unsubUrl}`
  );

  // ── html ──────────────────────────────────────────────────────────────────
  const card = (title: string, body: string) => `
  <div style="border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:0 0 14px">
    <p style="margin:0 0 10px;font-weight:600;color:#0f172a;font-size:14px">${escapeHtml(title)}</p>
    ${body}
  </div>`;

  const qRow = (q: MockReport["easyWrong"][number], showDwell: boolean) => {
    const dwell = showDwell ? formatDwell(q.secs) : "";
    const tail = showDwell
      ? dwell
        ? `<span style="color:${MUTED}"> — you spent ${escapeHtml(dwell)} on it</span>`
        : ""
      : q.peerPct === null
        ? ""
        : `<span style="color:${MUTED}"> — ${q.peerPct}% of students got this right</span>`;
    return `<p style="margin:0 0 8px;font-size:14px"><strong style="color:#0f172a">Q${q.position}</strong> &middot; ${escapeHtml(where(q))}${tail}</p>`;
  };

  const sections: string[] = [];

  if (r.easyWrong.length) {
    sections.push(
      card(`Easy marks you dropped (${r.easyWrong.length})`, r.easyWrong.map((q) => qRow(q, false)).join(""))
    );
  }
  if (r.easyLeft.length) {
    sections.push(
      card(`Easy ones you looked at and left (${r.easyLeft.length})`, r.easyLeft.map((q) => qRow(q, true)).join(""))
    );
  }
  if (r.pacing) {
    sections.push(
      card(
        "Pacing",
        `<p style="margin:0;font-size:14px">You never reached <strong>${r.pacing.neverReached} questions</strong> — ${escapeHtml(marks(r.pacing.marksLeft))} marks you didn&#39;t get a shot at. That&#39;s the clock, not the syllabus.</p>`
      )
    );
  }
  if (r.subtopics.length) {
    sections.push(
      card(
        "Where your next marks are",
        `<p style="margin:0 0 10px;color:${MUTED};font-size:13px">Across every paper you&#39;ve sat, not just this one.</p>` +
          r.subtopics
            .map((s) => {
              const acc =
                s.accuracy === null
                  ? ""
                  : `<span style="color:${MUTED}"> — you&#39;re at ${s.accuracy}% over ${s.judged} questions</span>`;
              return `<p style="margin:0 0 8px;font-size:14px"><strong style="color:#0f172a">${escapeHtml(marks(s.gap))} marks</strong> &middot; ${escapeHtml(s.chapter)} &middot; ${escapeHtml(s.subtopic)}${acc}</p>`;
            })
            .join("")
      )
    );
  }

  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 16px">${who ? `Hi ${escapeHtml(who)},` : "Hi,"}</p>
  <p style="margin:0 0 4px">You finished <strong>${escapeHtml(r.mockTitle)}</strong>.</p>
  <p style="margin:0 0 20px;color:${MUTED};font-size:14px">${escapeHtml(scoreLine)}</p>
  ${sections.join("\n")}
  <p style="margin:0 0 12px">
    <a href="${resultUrl}" style="background:${ACCENT};color:#fff;text-decoration:none;padding:11px 20px;border-radius:6px;display:inline-block;font-weight:600">Every question, with the solution</a>
  </p>
  <p style="margin:0 0 24px;font-size:14px">
    <a href="${perfUrl}" style="color:${ACCENT}">Your full performance across all papers &rarr;</a>
  </p>
  <p style="margin:0 0 24px;color:${MUTED};font-size:14px">Reply to this email if something looks wrong — it reaches a person.</p>
  <p style="margin:0 0 24px">— ${BRAND}</p>
  <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 12px">
  <p style="margin:0;color:#94a3b8;font-size:12px">
    Don&#39;t want these? <a href="${unsubUrl}" style="color:#94a3b8">Unsubscribe</a>.
  </p>
</div>`;

  return {
    subject,
    text: t.join("\n"),
    html,
    replyTo: REPLY_TO,
    headers: {
      "List-Unsubscribe": `<${oneClickUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}
