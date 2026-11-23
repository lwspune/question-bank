/**
 * Database-alive alert, the pure part (2026-11-22). The runner is db-alive.mjs.
 *
 * Why it exists: on 2026-11-22 the database host froze at 00:47 IST and nobody
 * knew until 06:00. Every other job here keeps its state in the database, which
 * is exactly what is down when this matters, so the state is a small JSON file
 * the workflow carries in GitHub's cache. Plain .mjs with no imports so the
 * workflow runs it without `npm ci`: it must run when everything else is broken.
 *
 * @typedef {{ status: "up" | "down", since: string, lastAlertAt: string | null }} AliveState
 * @typedef {"down" | "still-down" | "recovered"} AlertKind
 */

/** While still down, remind every 2 hours (the 100/day Resend quota is shared). */
export const REMIND_MS = 2 * 60 * 60 * 1000;

/**
 * What to send, and the state to save, given the last state and this run's probe.
 * @param {AliveState | null} prev
 * @param {boolean} up
 * @param {string} nowIso
 * @returns {{ send: AlertKind | null, state: AliveState }}
 */
export function decide(prev, up, nowIso) {
  if (up) {
    if (prev && prev.status === "down") {
      return { send: "recovered", state: { status: "up", since: nowIso, lastAlertAt: null } };
    }
    return { send: null, state: prev ?? { status: "up", since: nowIso, lastAlertAt: null } };
  }
  if (!prev || prev.status === "up") {
    return { send: "down", state: { status: "down", since: nowIso, lastAlertAt: nowIso } };
  }
  const last = Date.parse(prev.lastAlertAt ?? prev.since);
  if (Date.parse(nowIso) - last >= REMIND_MS) {
    return { send: "still-down", state: { ...prev, lastAlertAt: nowIso } };
  }
  return { send: null, state: prev };
}

const isIso = (v) => typeof v === "string" && !Number.isNaN(Date.parse(v)) && /^\d{4}-\d{2}-\d{2}T/.test(v);

/**
 * The saved state, or null when there is none or it is unreadable (a broken
 * file must never stop the check: it starts over as a first run).
 * @param {string | null} raw
 * @returns {AliveState | null}
 */
export function parseState(raw) {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw);
    if ((s.status !== "up" && s.status !== "down") || !isIso(s.since)) return null;
    return { status: s.status, since: s.since, lastAlertAt: isIso(s.lastAlertAt) ? s.lastAlertAt : null };
  } catch {
    return null;
  }
}

function ist(iso) {
  return new Date(Date.parse(iso) + 330 * 60_000).toISOString().replace(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}).*$/, "$2 IST on $1");
}

function span(fromIso, toIso) {
  const min = Math.max(0, Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 60_000));
  const h = Math.floor(min / 60);
  return h ? `${h} h ${min % 60} min` : `${min} min`;
}

/**
 * @param {AlertKind} kind
 * @param {AliveState} downState the state while down (its `since` is when it stopped)
 * @param {string} nowIso
 * @param {string} projectRef
 */
export function emailFor(kind, downState, nowIso, projectRef) {
  const restart = `https://supabase.com/dashboard/project/${projectRef}/settings/general`;
  if (kind === "recovered") {
    const text = [
      `The database is answering again (checked ${ist(nowIso)}).`,
      `It was down for about ${span(downState.since, nowIso)}, from ${ist(downState.since)}.`,
      "",
      "Jobs that ran while it was down may have failed: check GitHub Actions.",
    ].join("\n");
    return { subject: "PYQ Vault: database is back", text };
  }
  const text = [
    kind === "down"
      ? `The database stopped answering: first failed check ${ist(downState.since)}.`
      : `The database has not answered since ${ist(downState.since)} (${span(downState.since, nowIso)} so far).`,
    "Three tries over about a minute all failed, so this is not a blip.",
    "",
    "The site shows cached pages only: sign-in, mocks and V do not work.",
    "",
    `If it does not come back by itself, restart it: ${restart}`,
    "(Restart project, near the bottom of the page.)",
  ].join("\n");
  return {
    subject: kind === "down" ? "PYQ Vault: database not answering" : "PYQ Vault: database still not answering",
    text,
  };
}
