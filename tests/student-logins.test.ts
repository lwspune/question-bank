/**
 * Pure helpers behind "Create student logins" on a batch roster: the paste
 * parser, the password generator and the credentials sheet.
 */
import { describe, it, expect } from "vitest";
import {
  parseStudentLines,
  generatePassword,
  credentialsCsv,
  credentialsText,
  MAX_STUDENT_LOGINS_PER_REQUEST,
  PASSWORD_ALPHABET,
} from "@/lib/batches/studentLogins";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/credentials";

describe("parseStudentLines", () => {
  it("reads name, email per line; email lowercased, name trimmed", () => {
    const r = parseStudentLines("Anita Rao, Anita@Yahoo.com\n  Rahul K ,rahul@school.edu.in  ");
    expect(r.valid).toEqual([
      { name: "Anita Rao", email: "anita@yahoo.com", password: null },
      { name: "Rahul K", email: "rahul@school.edu.in", password: null },
    ]);
    expect(r.invalid).toEqual([]);
  });

  it("accepts a spreadsheet paste (tabs) and either column order", () => {
    const r = parseStudentLines("anita@x.com\tAnita\nRahul\trahul@x.com");
    expect(r.valid.map((v) => [v.name, v.email])).toEqual([
      ["Anita", "anita@x.com"],
      ["Rahul", "rahul@x.com"],
    ]);
  });

  it("a tab-separated line keeps commas inside the name", () => {
    const r = parseStudentLines("Rao, Anita	anita@x.com	");
    expect(r.valid).toEqual([{ name: "Rao, Anita", email: "anita@x.com", password: null }]);
  });

  it("takes an optional third column as the password", () => {
    const r = parseStudentLines(`Anita, anita@x.com, ${"p".repeat(MIN_PASSWORD_LENGTH)}`);
    expect(r.valid[0].password).toBe("p".repeat(MIN_PASSWORD_LENGTH));
  });

  it("rejects a short password rather than silently replacing it", () => {
    const r = parseStudentLines("Anita, anita@x.com, short");
    expect(r.valid).toEqual([]);
    expect(r.invalid[0].reason).toMatch(/password/i);
  });

  it("reports bad lines AS TYPED with a reason, and skips blanks", () => {
    const r = parseStudentLines("\nAnita, not-an-email\njust-a-name\n, a@x.com\n\n");
    expect(r.valid).toEqual([]);
    expect(r.invalid.map((i) => i.line)).toEqual(["Anita, not-an-email", "just-a-name", ", a@x.com"]);
    expect(r.invalid.every((i) => i.reason.length > 0)).toBe(true);
  });

  it("drops a repeated email (first one wins)", () => {
    const r = parseStudentLines("Anita, a@x.com\nAnita again, A@X.com");
    expect(r.valid).toHaveLength(1);
    expect(r.valid[0].name).toBe("Anita");
  });

  it("caps one request and counts the overflow", () => {
    const lines = Array.from(
      { length: MAX_STUDENT_LOGINS_PER_REQUEST + 3 },
      (_, i) => `S${i}, s${i}@x.com`
    ).join("\n");
    const r = parseStudentLines(lines);
    expect(r.valid).toHaveLength(MAX_STUDENT_LOGINS_PER_REQUEST);
    expect(r.overflow).toBe(3);
  });
});

describe("generatePassword", () => {
  it("is long enough to pass sign-in validation", () => {
    expect(generatePassword().length).toBeGreaterThanOrEqual(Math.max(10, MIN_PASSWORD_LENGTH));
  });

  it("uses only characters that can't be misread when read out (no 0/O, 1/l/I)", () => {
    for (const ch of "0O1lI") expect(PASSWORD_ALPHABET).not.toContain(ch);
    for (let i = 0; i < 50; i++) {
      for (const ch of generatePassword()) expect(PASSWORD_ALPHABET).toContain(ch);
    }
  });

  it("does not repeat", () => {
    const seen = new Set(Array.from({ length: 200 }, () => generatePassword()));
    expect(seen.size).toBe(200);
  });
});

describe("credentials sheet", () => {
  const rows = [
    { name: 'Anita "A" Rao', email: "anita@x.com", password: "abc,def" },
    { name: "Rahul", email: "rahul@x.com", password: "=SUM(1)" },
  ];

  it("CSV quotes commas/quotes and defuses spreadsheet formulas", () => {
    const csv = credentialsCsv(rows);
    const lines = csv.trim().split(/\r?\n/);
    expect(lines[0]).toBe("Name,Email,Password,Sign in at");
    expect(lines[1]).toContain('"Anita ""A"" Rao"');
    expect(lines[1]).toContain('"abc,def"');
    // A cell starting with = would run as a formula when the sheet is opened.
    expect(lines[2]).toContain("'=SUM(1)");
  });

  it("text block names the sign-in page once per student", () => {
    const text = credentialsText(rows);
    expect(text).toContain("anita@x.com");
    expect(text).toContain("abc,def");
    expect(text.match(/pyqvault\.com\/login/g)).toHaveLength(2);
  });
});
