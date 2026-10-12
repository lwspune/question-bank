/**
 * "Take photo" on the answer-sheet upload (2026-10-12): the camera adds one
 * page per tap. Camera photos all arrive named image.jpg, so each is renamed
 * by its place in the list, which is the page order the grader reads.
 */
import { describe, it, expect } from "vitest";
import { ALLOWED_TYPES, CAMERA_ACCEPT, cameraPageName } from "@/lib/answerSheets/upload";

describe("CAMERA_ACCEPT", () => {
  it("asks the camera for photos only, every one of them a type the grader reads", () => {
    const types = CAMERA_ACCEPT.split(",");
    expect(types.length).toBeGreaterThan(0);
    for (const t of types) {
      expect(t.startsWith("image/")).toBe(true);
      expect(ALLOWED_TYPES[t]).toBeDefined();
    }
    expect(types).not.toContain("application/pdf");
  });
});

describe("cameraPageName", () => {
  it("names a photo by its page number", () => {
    expect(cameraPageName(1, "image/jpeg")).toBe("Page 1.jpg");
    expect(cameraPageName(12, "image/png")).toBe("Page 12.png");
  });

  it("falls back to jpg for a type it does not know (the upload check still refuses it)", () => {
    expect(cameraPageName(3, "image/heic")).toBe("Page 3.jpg");
  });
});
