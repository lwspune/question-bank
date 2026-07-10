import { describe, it, expect } from "vitest";
import { deriveStudents, providerLabel, displayName, type AuthUserLite } from "@/lib/students/derive";

const u = (id: string, created: string, provider?: string, email?: string, name?: string): AuthUserLite => ({
  id,
  email: email ?? `${id}@example.com`,
  created_at: created,
  app_metadata: provider ? { provider } : null,
  user_metadata: name ? { full_name: name } : null,
});

describe("displayName", () => {
  it("prefers full_name, then name, then email", () => {
    expect(displayName({ full_name: "Asha K" }, "a@x.com")).toBe("Asha K");
    expect(displayName({ name: "Bob" }, "b@x.com")).toBe("Bob");
    expect(displayName(null, "c@x.com")).toBe("c@x.com");
  });
  it("falls back to email when the name is blank", () => {
    expect(displayName({ full_name: "  " }, "d@x.com")).toBe("d@x.com");
  });
});

describe("providerLabel", () => {
  it("maps known providers to a friendly label", () => {
    expect(providerLabel("google")).toBe("Google");
    expect(providerLabel("email")).toBe("Email");
  });
  it("treats a missing provider as Email (password signup)", () => {
    expect(providerLabel(undefined)).toBe("Email");
    expect(providerLabel(null)).toBe("Email");
  });
  it("capitalizes an unknown provider", () => {
    expect(providerLabel("github")).toBe("Github");
  });
});

describe("deriveStudents", () => {
  it("excludes staff (org members)", () => {
    const users = [u("staff1", "2026-01-01T00:00:00Z"), u("stud1", "2026-01-02T00:00:00Z")];
    const rows = deriveStudents(users, new Set(["staff1"]));
    expect(rows.map((r) => r.id)).toEqual(["stud1"]);
  });

  it("sorts newest signup first", () => {
    const users = [
      u("a", "2026-01-01T00:00:00Z"),
      u("c", "2026-03-01T00:00:00Z"),
      u("b", "2026-02-01T00:00:00Z"),
    ];
    expect(deriveStudents(users, new Set()).map((r) => r.id)).toEqual(["c", "b", "a"]);
  });

  it("derives name + email + provider label", () => {
    const rows = deriveStudents([u("s1", "2026-01-01T00:00:00Z", "google", "x@y.com", "Xavier Y")], new Set());
    expect(rows[0]).toMatchObject({ name: "Xavier Y", email: "x@y.com", provider: "Google" });
  });

  it("uses email as the name when there is no metadata name (email signup)", () => {
    const rows = deriveStudents([u("s1", "2026-01-01T00:00:00Z", "email", "e@y.com")], new Set());
    expect(rows[0].name).toBe("e@y.com");
  });

  it("falls back to a placeholder when email is missing", () => {
    const rows = deriveStudents(
      [{ id: "s1", email: null, created_at: "2026-01-01T00:00:00Z", app_metadata: null }],
      new Set()
    );
    expect(rows[0].email).toBe("(no email)");
  });
});
