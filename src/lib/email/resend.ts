/**
 * Resend transport. Raw fetch, no SDK — the `resend` package is a thin typed
 * wrapper over this one REST endpoint, and CLAUDE.md's dependency rule is
 * "prefer native APIs; every new dependency must be justified by a clear
 * capability gap". There isn't one. (The sibling English AI Tutor reaches the
 * same conclusion independently.)
 *
 * NOT marked "server-only" precisely so the tsx script can import it (the
 * src/lib/quiz/assemble.ts precedent — `server-only` is a Next build-time alias
 * and is unresolvable under tsx). The key is read from process.env at CALL time
 * and never at module scope, so importing this into a client bundle would still
 * ship no secret — but don't: this belongs to route handlers and scripts.
 */

const ENDPOINT = "https://api.resend.com/emails";

/** Resend's free tier is 2 req/sec; a tight send loop hits it and 429s (the
 *  sibling app shipped this as a v8 bugfix after real failures). We send
 *  sequentially and space the calls. Batch (/emails/batch, 100/request) would
 *  collapse this — worth it at hundreds of recipients, but it also collapses
 *  per-recipient error granularity, and we want one sent/failed row per person
 *  in email_sends. At ~40 recipients this loop takes ~25s. */
export const THROTTLE_MS = 600;

export type SendPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
  headers?: Record<string, string>;
};

export type SendResult =
  | { ok: true; providerId: string }
  | { ok: false; error: string };

export function emailEnv(): { apiKey: string; from: string } {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  if (!from) throw new Error('EMAIL_FROM is not set (e.g. "PYQ Vault <mocks@pyqvault.com>")');
  return { apiKey, from };
}

/** POST one email. Never throws on a provider error — the caller records the
 *  failure in email_sends and moves on, so one bad address can't abort a run. */
export async function sendEmail(payload: SendPayload): Promise<SendResult> {
  let apiKey: string;
  let from: string;
  try {
    ({ apiKey, from } = emailEnv());
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
        ...(payload.headers ? { headers: payload.headers } : {}),
      }),
    });

    const body = await res.text();
    if (!res.ok) {
      // The classic first-run failure is 403 "domain is not verified" — SPF +
      // DKIM for pyqvault.com must exist at the DNS host before anything sends.
      return { ok: false, error: `${res.status} ${body.slice(0, 400)}` };
    }
    const id = (JSON.parse(body) as { id?: string }).id;
    return id ? { ok: true, providerId: id } : { ok: false, error: `200 but no id: ${body.slice(0, 200)}` };
  } catch (e) {
    return { ok: false, error: `network: ${(e as Error).message}` };
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
