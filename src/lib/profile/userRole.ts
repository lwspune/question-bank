/**
 * "Are you a teacher or a student?" (migration 0258, 2026-11-15).
 *
 * One line under the download buttons in every download box, asked once per
 * account. The download box is the third-largest signup route, but only 37% of
 * its accounts ever study: some are teachers, some are students who wanted a
 * file, and nothing told them apart. This labels them; it changes nothing a
 * teacher is offered yet.
 *
 * Pure: the route (src/app/api/profile/role) and the component
 * (src/components/profile/RoleQuestion) both read these rules.
 */
import { istDayKey } from "@/lib/email/dueNudge";
import type { ActivityEvent } from "@/lib/activity/events";
import { DOWNLOAD_BOXES, type DownloadBox } from "@/lib/activity/clientEvents";

/** The two answers, mirrored by the database CHECK (0258). */
export const USER_ROLES = ["teacher", "student"] as const;
export type UserRole = (typeof USER_ROLES)[number];

const ROLE_SET: ReadonlySet<string> = new Set(USER_ROLES);
const BOX_SET: ReadonlySet<string> = new Set(DOWNLOAD_BOXES);

export function isUserRole(v: unknown): v is UserRole {
  return typeof v === "string" && ROLE_SET.has(v);
}

export function isDownloadBox(v: unknown): v is DownloadBox {
  return typeof v === "string" && BOX_SET.has(v);
}

export type RoleAnswer =
  | { ok: true; role: UserRole; box: DownloadBox }
  | { ok: false; error: string };

/** The POST body: a role and the box that asked. Anything else is refused. */
export function parseRoleAnswer(raw: unknown): RoleAnswer {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { ok: false, error: "Invalid answer." };
  const { role, box } = raw as Record<string, unknown>;
  if (!isUserRole(role)) return { ok: false, error: "Unknown role." };
  if (!isDownloadBox(box)) return { ok: false, error: "Unknown box." };
  return { ok: true, role, box };
}

/** Ask only a signed-in, non-staff account that has not answered yet. */
export function shouldAskRole(input: { signedIn: boolean; isStaff: boolean; role: UserRole | null }): boolean {
  return input.signedIn && !input.isStaff && input.role === null;
}

/**
 * The question seen, once per box per student per IST day: the denominator
 * for the answer rate, split by box.
 */
export function roleQuestionShownEvent(userId: string, box: DownloadBox, now: Date): ActivityEvent {
  return {
    kind: "surface_viewed",
    metadata: { surface: "role_question", box },
    dedupeKey: `view:role_question:${box}:${userId}:${istDayKey(now)}`,
  };
}
