/**
 * A picture on a team post (migration 0295). Staff upload a PNG or JPEG of at
 * most 1 MB (the question-images bucket's own limit) to circles/<exam>/<id>.<ext>;
 * the type is read from the file's first bytes, never from the name or the
 * browser's claim. A picture always carries a description for screen readers.
 * Spec for lib/rooms/teamImage.
 */
import { describe, it, expect } from "vitest";
import { checkTeamImage, teamImagePath, parseTeamPost, TEAM_IMAGE_MAX_BYTES } from "@/lib/rooms/teamImage";

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0]);
const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0]);
const GIF = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);

describe("checkTeamImage", () => {
  it("accepts a PNG or a JPEG by its bytes", () => {
    expect(checkTeamImage(PNG, PNG.length)).toEqual({ ok: true, ext: "png", contentType: "image/png" });
    expect(checkTeamImage(JPEG, JPEG.length)).toEqual({ ok: true, ext: "jpg", contentType: "image/jpeg" });
  });
  it("refuses any other file and anything over 1 MB", () => {
    expect(checkTeamImage(GIF, GIF.length).ok).toBe(false);
    expect(checkTeamImage(PNG, TEAM_IMAGE_MAX_BYTES + 1).ok).toBe(false);
    expect(checkTeamImage(new Uint8Array(), 0).ok).toBe(false);
  });
});

describe("teamImagePath", () => {
  it("files a picture under its exam", () => {
    expect(teamImagePath("cbse-12", "1b2c3d4e-0000-4000-8000-000000000000", "png")).toBe("circles/cbse-12/1b2c3d4e-0000-4000-8000-000000000000.png");
  });
});

describe("parseTeamPost", () => {
  it("takes a text post as before", () => {
    expect(parseTeamPost({ body: "Hello" })).toEqual({ ok: true, value: { body: "Hello", image: null } });
  });
  it("takes a picture with its description", () => {
    expect(parseTeamPost({ body: "Tips", imagePath: "circles/cbse-12/abc-1.png", imageAlt: "Chart of chapter shares" })).toEqual({
      ok: true,
      value: { body: "Tips", image: { path: "circles/cbse-12/abc-1.png", alt: "Chart of chapter shares" } },
    });
  });
  it("refuses a picture without a description, a description without a picture, and a path outside circles/", () => {
    expect(parseTeamPost({ body: "Tips", imagePath: "circles/cbse-12/abc.png" }).ok).toBe(false);
    expect(parseTeamPost({ body: "Tips", imageAlt: "Chart" }).ok).toBe(false);
    expect(parseTeamPost({ body: "Tips", imagePath: "nda/q1.png", imageAlt: "x" }).ok).toBe(false);
    expect(parseTeamPost({ body: "Tips", imagePath: "circles/../secret.png", imageAlt: "x" }).ok).toBe(false);
  });
});
