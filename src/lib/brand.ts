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

/** The public contact address. Monitored; students reply here. */
export const CONTACT_EMAIL = "connect.pyqvault@gmail.com";
