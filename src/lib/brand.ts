/**
 * Public brand constants. Client-safe (no server imports) — the tsx scripts and
 * client components both pull from here.
 *
 * WHY this module exists: the public contact address was copy-pasted into four
 * files (Footer, /privacy, the two report dialogs) and had drifted to the tenant
 * org's address. The 2026-07-12 brand sweep fixed the visible "LWS" *name* in
 * copy but couldn't see the *addresses*, so a Footer reading "From the team at
 * PYQ Vault" sat directly above a `connect.lwspune@…` mailto. One const, one
 * place — the duplication is what let it drift.
 *
 * THE RULE (see CLAUDE.md's multi-tenancy note): anything a student or anon
 * visitor can see carries the PYQ Vault brand. `connect.lwspune@…` is the
 * founding TENANT ORG's address and belongs only on staff-gated surfaces — it is
 * not stale branding to purge (the org row is legitimate tenant identity), but
 * it must never be the public face.
 */

/**
 * The public contact address. Monitored; students reply here.
 *
 * ⚠ DEPLOY ORDER MATTERS. This constant is not just a `mailto:` on the Footer —
 * it is also `REPLY_TO` on every outbound Resend email (`lib/email/templates`)
 * and the fallback destination for teacher-access lead notifications
 * (`lib/teacherAccess/service`, unless TEACHER_REQUESTS_NOTIFY_EMAIL is set).
 * Shipping this value before the mailbox accepts mail silently drops student
 * replies and inbound leads, with no error anywhere.
 *
 * So: confirm forwarding for hello@pyqvault.com is live at GoDaddy and that a
 * test message arrives, THEN push. Moved off the gmail address 2026-09-16
 * because a site asking teachers to trust its answer keys should not be
 * reachable only at a free mailbox.
 */
export const CONTACT_EMAIL = "hello@pyqvault.com";
