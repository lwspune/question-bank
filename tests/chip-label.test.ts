/**
 * The /questions chapter page's buttons on a phone (2026-11-07, owner OK'd on
 * a mockup): three full-width buttons took three rows above the questions, so
 * on a phone they are compact pills with short labels. The full label stays
 * on wider screens (and as the accessible name there). Pure: lib/links/chipLabel.ts.
 */
import { describe, it, expect } from "vitest";
import { chipLabel } from "@/lib/links/chipLabel";

describe("chipLabel", () => {
  it("keeps the kind of a named playbook", () => {
    expect(chipLabel("Playbook: Cell Biology")).toBe("Playbook");
  });

  it("shortens a subject strategy guide", () => {
    expect(chipLabel("NDA Maths strategy")).toBe("Strategy");
    expect(chipLabel("NDA Current Affairs strategy")).toBe("Strategy");
  });

  it("shortens concept notes", () => {
    expect(chipLabel("Concept notes")).toBe("Notes");
  });

  it("leaves anything else as it is", () => {
    expect(chipLabel("Formula sheet")).toBe("Formula sheet");
  });
});
