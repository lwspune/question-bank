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
import type { Recipient } from "./recommend";

export const SITE_URL = "https://www.pyqvault.com";

/** Replies go to a real, monitored mailbox. `EMAIL_FROM` is a send-only address
 *  on the verified domain and has no inbox — without this, a student hitting
 *  Reply just bounces. The sibling English AI Tutor invites replies for exactly
 *  this reason: a student who can't sign in has no other channel to reach you.
 *
 *  BRAND: this address is student-facing (it's what their mail client shows on
 *  Reply), so it must carry the PYQ Vault brand — NOT the `connect.lwspune@…`
 *  tenant-org address, which belongs to staff-gated surfaces only. Same rule as
 *  the hardcoded-`LWS`-in-copy branding bug in CLAUDE.md's multi-tenancy note. */
export const REPLY_TO = "connect.pyqvault@gmail.com";

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
