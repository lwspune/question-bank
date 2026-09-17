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
 * and the fallback destination for BOTH the contact-form notification
 * (`lib/contact/service`, unless CONTACT_NOTIFY_EMAIL is set) and teacher-access
 * lead notifications (`lib/teacherAccess/service`, unless
 * TEACHER_REQUESTS_NOTIFY_EMAIL is set). Pointing this at a mailbox that does
 * not accept mail silently drops student replies and inbound leads, with no
 * error anywhere. Change it only on delivery EVIDENCE, never on intent.
 *
 * MOVED to the branded mailbox 2026-09-17, on that evidence:
 *   - `pyqvault.com` now has MX (`smtp.secureserver.net` / GoDaddy Titan). It
 *     had NONE until 2026-09-17, which is why this sat on a gmail — mail to
 *     hello@ did not reach the wrong inbox, it BOUNCED.
 *   - A live send through our own `sendEmail` was confirmed `delivered` by
 *     Resend AND observed in the INBOX. Inbox placement is the part that
 *     matters: GoDaddy's setup also added `DMARC p=quarantine`, whose failure
 *     mode is the spam folder, not a bounce — so `delivered` alone would not
 *     have been sufficient proof.
 *
 * Outbound sending is unaffected by the new receive records: Resend's DKIM is
 * at `resend._domainkey.pyqvault.com` and its Return-Path is the `send.`
 * subdomain, which keeps its own SPF + MX. The apex SPF GoDaddy added is a hard
 * fail (`-all`), so do NOT move Resend's Return-Path onto the apex.
 *
 * Note the address is `hello@`, not a `mailto:` on a free host: a site asking
 * teachers to trust its answer keys should be reachable at its own domain. The
 * form on /about (`contact_messages`) remains the primary channel regardless —
 * it writes a row and does not depend on email delivery at all.
 *
 * Pinned by `tests/brand-contact-email.test.ts`.
 */
export const CONTACT_EMAIL = "hello@pyqvault.com";
