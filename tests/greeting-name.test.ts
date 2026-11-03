import { describe, expect, it } from "vitest";
import { greetingName } from "@/lib/me/today";

describe("greetingName", () => {
  it("prefers the name the student set, then the account name, first word only", () => {
    expect(greetingName({ preferred_name: "Kartavya", full_name: "Mohinee Shirke" })).toBe("Kartavya");
    expect(greetingName({ full_name: "Riya Deshmukh" })).toBe("Riya");
    expect(greetingName({ name: "aarav" })).toBe("Aarav");
  });

  it("says nothing rather than greet a handle or an email", () => {
    expect(greetingName({ full_name: "rahul_007" })).toBeNull();
    expect(greetingName({ name: "someone@gmail.com" })).toBeNull();
    expect(greetingName(null)).toBeNull();
  });
});
