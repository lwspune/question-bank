/**
 * The owner's evening rooms email (owner moderates, 2026-11-25; migration
 * 0289): messages to check (hidden by reports first), doubts nobody answered,
 * then one line per room. A quiet day sends nothing. Every student-written
 * string is escaped in the HTML. Pure. Spec: tests/rooms-digest.test.ts.
 */

export type RoomsDigestInput = {
  dateLabel: string;
  dashboardUrl: string;
  flagged: { room: string; name: string; body: string; reports: number; hidden: boolean; reasons: string[] }[];
  unanswered: { room: string; name: string; body: string; hoursAgo: number }[];
  rooms: { room: string; messages: number; students: number; joined: number }[];
};

const REASON: Record<string, string> = { spam: "spam", abuse: "rude", personal: "personal details", off_topic: "off topic", other: "other" };

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function short(s: string, n = 220): string {
  const flat = s.replace(/\s+/g, " ").trim();
  return flat.length > n ? `${flat.slice(0, n).trimEnd()}…` : flat;
}

export function buildRoomsDigest(input: RoomsDigestInput): { subject: string; text: string; html: string } | null {
  const { flagged, unanswered, rooms } = input;
  if (flagged.length === 0 && unanswered.length === 0 && rooms.length === 0) return null;

  const parts: string[] = [];
  if (flagged.length) parts.push(`${flagged.length} to check`);
  if (unanswered.length) parts.push(`${unanswered.length} unanswered`);
  const subject = `Exam circles, ${input.dateLabel}${parts.length ? `: ${parts.join(", ")}` : ""}`;

  const flagLine = (f: RoomsDigestInput["flagged"][number]) =>
    `${f.room} · ${f.name} · ${f.hidden ? `Hidden after ${f.reports} reports` : `${f.reports} report${f.reports === 1 ? "" : "s"}`} (${f.reasons
      .map((r) => REASON[r] ?? r)
      .join(", ")})`;
  const doubtLine = (d: RoomsDigestInput["unanswered"][number]) => `${d.room} · ${d.name} · ${d.hoursAgo} h ago`;
  const roomLine = (r: RoomsDigestInput["rooms"][number]) =>
    `${r.room}: ${r.messages} messages from ${r.students} students, ${r.joined} joined`;

  const text: string[] = [];
  const html: string[] = [`<p>Exam circles, ${esc(input.dateLabel)}.</p>`];
  if (flagged.length) {
    text.push("TO CHECK (keep, hide or mute on the dashboard)", ...flagged.flatMap((f) => [flagLine(f), `  ${short(f.body)}`]), "");
    html.push(
      "<h3>To check</h3><ul>",
      ...flagged.map((f) => `<li><strong>${esc(flagLine(f))}</strong><br>${esc(short(f.body))}</li>`),
      "</ul>"
    );
  }
  if (unanswered.length) {
    text.push("DOUBTS NOBODY ANSWERED", ...unanswered.flatMap((d) => [doubtLine(d), `  ${short(d.body)}`]), "");
    html.push(
      "<h3>Doubts nobody answered</h3><ul>",
      ...unanswered.map((d) => `<li><strong>${esc(doubtLine(d))}</strong><br>${esc(short(d.body))}</li>`),
      "</ul>"
    );
  }
  if (rooms.length) {
    text.push("LAST 24 HOURS", ...rooms.map(roomLine), "");
    html.push("<h3>Last 24 hours</h3><ul>", ...rooms.map((r) => `<li>${esc(roomLine(r))}</li>`), "</ul>");
  }
  text.push(`Open the circles dashboard: ${input.dashboardUrl}`);
  html.push(`<p><a href="${esc(input.dashboardUrl)}">Open the circles dashboard</a></p>`);
  return { subject, text: text.join("\n"), html: html.join("\n") };
}
