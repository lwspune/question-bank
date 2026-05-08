import { describe, it, expect } from "vitest";
import {
  isAllowedMime,
  extensionFromMime,
  validateImageUpload,
  MAX_SIZE_BYTES,
} from "@/lib/storage/images";

describe("isAllowedMime", () => {
  it.each(["image/png", "image/jpeg"])("accepts %s", (mime) => {
    expect(isAllowedMime(mime)).toBe(true);
  });

  it.each([
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "application/pdf",
    "text/html",
    "",
  ])("rejects %s (webp dropped because docx ImageRun doesn't support it)", (mime) => {
    expect(isAllowedMime(mime)).toBe(false);
  });
});

describe("extensionFromMime", () => {
  it("maps each allowed mime to its conventional extension", () => {
    expect(extensionFromMime("image/png")).toBe("png");
    expect(extensionFromMime("image/jpeg")).toBe("jpg");
  });
});

describe("validateImageUpload", () => {
  it("accepts a valid 1KB PNG", () => {
    const result = validateImageUpload({
      size: 1024,
      mime: "image/png",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects a file at exactly the cap as too large", () => {
    const result = validateImageUpload({
      size: MAX_SIZE_BYTES + 1,
      mime: "image/png",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/size|too large|1 ?MB/i);
  });

  it("accepts a file at exactly the cap", () => {
    const result = validateImageUpload({
      size: MAX_SIZE_BYTES,
      mime: "image/png",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects an unsupported mime type", () => {
    const result = validateImageUpload({
      size: 100,
      mime: "image/gif",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/png|jpeg|type/i);
  });

  it("rejects a zero-byte file", () => {
    const result = validateImageUpload({
      size: 0,
      mime: "image/png",
    });
    expect(result.ok).toBe(false);
  });
});
