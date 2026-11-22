/**
 * Is the database answering? Emails the owner when it stops, every 2 hours while
 * it stays down, and once when it is back (2026-11-22, after a 5.5-hour freeze
 * nobody noticed). Runs every 5 minutes from .github/workflows/db-alive.yml.
 *
 *   node scripts/monitor/db-alive.mjs           dry run: probe and print, send and save nothing
 *   node scripts/monitor/db-alive.mjs --apply   send the email and save the state (the workflow only)
 *
 * Env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY; with --apply also
 * RESEND_API_KEY, EMAIL_FROM, ALERT_EMAIL. State file: DB_ALIVE_STATE (default
 * .db-alive/state.json), carried between runs by the workflow's cache.
 *
 * No imports from the app and no npm install: it has to work when everything
 * else is broken. A probe is a one-row read through the public API with the
 * anon key, the same path every page takes.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { decide, emailFor, parseState } from "./dbAlive.mjs";

const TRIES = 3;
const TIMEOUT_MS = 20_000;
const GAP_MS = 15_000;

const apply = process.argv.includes("--apply");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const stateFile = process.env.DB_ALIVE_STATE || ".db-alive/state.json";
if (!url || !anon) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set");
  process.exit(2);
}
const projectRef = new URL(url).hostname.split(".")[0];

async function probeOnce() {
  try {
    const res = await fetch(`${url}/rest/v1/exams?select=id&limit=1`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return res.ok ? { ok: true } : { ok: false, why: `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, why: e instanceof Error ? e.name : String(e) };
  }
}

async function probe() {
  for (let i = 1; i <= TRIES; i++) {
    const r = await probeOnce();
    console.log(`try ${i}: ${r.ok ? "ok" : r.why}`);
    if (r.ok) return true;
    if (i < TRIES) await new Promise((res) => setTimeout(res, GAP_MS));
  }
  return false;
}

async function send(subject, text) {
  const to = process.env.ALERT_EMAIL;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!to || !key || !from) return "ALERT_EMAIL, RESEND_API_KEY and EMAIL_FROM must be set";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ from, to, subject, text }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return res.ok ? null : `Resend ${res.status} ${(await res.text()).slice(0, 300)}`;
  } catch (e) {
    return `Resend: ${e instanceof Error ? e.message : String(e)}`;
  }
}

let raw = null;
try {
  raw = readFileSync(stateFile, "utf8");
} catch {
  // First run, or the cache expired: start as a first run.
}
const prev = parseState(raw);
const up = await probe();
const now = new Date().toISOString();
const { send: kind, state } = decide(prev, up, now);
console.log(`was ${prev ? prev.status : "unknown"}, now ${up ? "up" : "down"}; email: ${kind ?? "none"}`);

let saved = state;
if (kind) {
  // The down email reads its start from the NEW state; recovered reads it from the old.
  const email = emailFor(kind, kind === "recovered" ? prev : state, now, projectRef);
  if (!apply) {
    console.log(`(dry run) would send: ${email.subject}\n${email.text}`);
  } else {
    const err = await send(email.subject, email.text);
    if (err) {
      // Keep the old state so the next run tries this email again.
      console.error(`email failed: ${err}`);
      saved = prev;
      process.exitCode = 1;
    } else {
      console.log(`sent: ${email.subject}`);
    }
  }
}

if (apply && saved) {
  mkdirSync(dirname(stateFile), { recursive: true });
  writeFileSync(stateFile, JSON.stringify(saved));
}
