import { describe, it, expect } from "vitest";
import { CONTACT_EMAIL } from "@/lib/brand";
import { REPLY_TO } from "@/lib/email/templates";

/**
 * Pins the ONE public contact address.
 *
 * WHY THIS TEST EXISTS: `CONTACT_EMAIL` is not just a `mailto:` on the Footer —
 * it is `REPLY_TO` on every outbound student email and the fallback destination
 * for both the contact-form and teacher-access lead notifications. That makes
 * it a one-line change with a wide blast radius, and its failure mode is SILENT:
 * a wrong value drops student replies and inbound leads with no error anywhere.
 *
 * The address moved to the branded mailbox on 2026-09-17, once `pyqvault.com`
 * had an MX record (GoDaddy/Titan) and a live send was confirmed DELIVERED and
 * INBOX-placed — not spam, which matters because GoDaddy's setup also added
 * `DMARC p=quarantine`, whose failure mode is the spam folder rather than a
 * bounce. Before that the domain had no MX at all and mail to it BOUNCED, so
 * the constant deliberately sat on a working free mailbox instead.
 *
 * These assertions encode the REASON, not just the current string: the address
 * must be on the brand domain (a free-mail host is what we moved off), and
 * REPLY_TO must keep tracking it rather than drifting to its own literal — four
 * copy-pasted literals are how this address went off-brand the first time.
 */
describe("CONTACT_EMAIL", () => {
  it("is on the brand domain", () => {
    expect(CONTACT_EMAIL).toMatch(/@pyqvault\.com$/);
  });

  it("is not a free-mail address", () => {
    // The pre-2026-09-17 state. A regression here means student replies and
    // inbound leads are landing somewhere off-brand again.
    expect(CONTACT_EMAIL).not.toMatch(/@(gmail|yahoo|outlook|hotmail|rediffmail)\./i);
  });

  it("is not the tenant org's address", () => {
    // `connect.lwspune@…` is the founding TENANT's identity and belongs only on
    // staff-gated surfaces — never as the public face. See CLAUDE.md's
    // multi-tenancy note: brand vs. org-name are not the same axis.
    expect(CONTACT_EMAIL).not.toMatch(/lwspune/i);
  });

  it("is a single well-formed address, not a display-name pair", () => {
    // `EMAIL_FROM` is the "Name <addr>" shape; this const is a bare address
    // because it is interpolated straight into `mailto:` hrefs.
    expect(CONTACT_EMAIL).toMatch(/^[^\s<>@]+@[^\s<>@]+$/);
  });

  it("is what outbound student email replies to", () => {
    // Not a tautology worth skipping: REPLY_TO is exported separately and has
    // been a literal in sibling apps. If it stops tracking the const, a student
    // hitting Reply reaches an address nobody monitors.
    expect(REPLY_TO).toBe(CONTACT_EMAIL);
  });
});
