/**
 * Word export must respect each image's natural aspect ratio. Hardcoded
 * 320x240 (questions) / 200x150 (options) used to stretch portrait crops
 * and squish wide circuit diagrams. readImageDimensions reads the natural
 * size from PNG/JPEG headers; fitWithinBox scales-to-fit while preserving
 * aspect ratio, leaving smaller-than-cap images at natural size.
 */
import { describe, it, expect } from "vitest";
import { TINY_PNG } from "./fixtures/tinyImage";
import {
  readImageDimensions,
  fitWithinBox,
} from "@/lib/export/imageDimensions";

function makePng(width: number, height: number): Buffer {
  // Minimal valid-shape PNG: signature + IHDR (4-byte length, "IHDR",
  // 4-byte width, 4-byte height, then 5 more IHDR bytes). The decoder
  // only reads up to byte 24, so the remaining IHDR bytes can be zeros.
  const buf = Buffer.alloc(33);
  buf[0] = 0x89;
  buf[1] = 0x50;
  buf[2] = 0x4e;
  buf[3] = 0x47;
  buf[4] = 0x0d;
  buf[5] = 0x0a;
  buf[6] = 0x1a;
  buf[7] = 0x0a;
  buf.writeUInt32BE(13, 8); // IHDR length
  buf.write("IHDR", 12, "ascii");
  buf.writeUInt32BE(width, 16);
  buf.writeUInt32BE(height, 20);
  return buf;
}

function makeJpegWithSof0(width: number, height: number): Buffer {
  // Minimal sniff-able shape: SOI (FFD8) + SOF0 segment with the supplied
  // dimensions. Real decoders need much more, but our parser only walks
  // the segment chain to find the first SOF marker.
  return Buffer.from([
    0xff,
    0xd8, // SOI
    0xff,
    0xc0, // SOF0
    0x00,
    0x11, // segment length (17)
    0x08, // precision
    (height >> 8) & 0xff,
    height & 0xff,
    (width >> 8) & 0xff,
    width & 0xff,
    0x03,
    0x01,
    0x22,
    0x00,
    0x02,
    0x11,
    0x01,
    0x03,
    0x11,
    0x01,
  ]);
}

function makeJpegWithSkippedSegment(width: number, height: number): Buffer {
  // SOI + an APP0 segment we must skip + SOF0. Verifies the parser walks
  // segments rather than just reading from a fixed offset.
  const app0Length = 16;
  const out: number[] = [
    0xff,
    0xd8, // SOI
    0xff,
    0xe0, // APP0 marker
    0x00,
    app0Length, // length
    ...new Array(app0Length - 2).fill(0x00), // padding
    0xff,
    0xc0, // SOF0
    0x00,
    0x11,
    0x08,
    (height >> 8) & 0xff,
    height & 0xff,
    (width >> 8) & 0xff,
    width & 0xff,
    0x03,
    0x01,
    0x22,
    0x00,
    0x02,
    0x11,
    0x01,
    0x03,
    0x11,
    0x01,
  ];
  return Buffer.from(out);
}

describe("readImageDimensions", () => {
  it("reads 1x1 from the canonical TINY_PNG fixture", () => {
    expect(readImageDimensions(TINY_PNG)).toEqual({ width: 1, height: 1 });
  });

  it("reads PNG width and height from IHDR", () => {
    expect(readImageDimensions(makePng(640, 480))).toEqual({
      width: 640,
      height: 480,
    });
    expect(readImageDimensions(makePng(1024, 256))).toEqual({
      width: 1024,
      height: 256,
    });
  });

  it("reads JPEG width and height from SOF0", () => {
    expect(readImageDimensions(makeJpegWithSof0(800, 600))).toEqual({
      width: 800,
      height: 600,
    });
  });

  it("walks JPEG segments past APP0 to reach SOF0", () => {
    expect(readImageDimensions(makeJpegWithSkippedSegment(400, 200))).toEqual({
      width: 400,
      height: 200,
    });
  });

  it("returns null for unrecognised or truncated buffers", () => {
    expect(readImageDimensions(Buffer.from([0x00, 0x01, 0x02]))).toBeNull();
    expect(readImageDimensions(Buffer.alloc(0))).toBeNull();
  });
});

describe("fitWithinBox", () => {
  it("returns natural dimensions when the image already fits", () => {
    expect(fitWithinBox({ width: 200, height: 150 }, 320, 240)).toEqual({
      width: 200,
      height: 150,
    });
  });

  it("scales to fit width while preserving aspect ratio", () => {
    // 640x320 → cap width 320 → height becomes 160
    expect(fitWithinBox({ width: 640, height: 320 }, 320, 240)).toEqual({
      width: 320,
      height: 160,
    });
  });

  it("scales to fit height when height is the binding constraint", () => {
    // 200x400 → cap height 240 → width becomes 120
    expect(fitWithinBox({ width: 200, height: 400 }, 320, 240)).toEqual({
      width: 120,
      height: 240,
    });
  });

  it("scales by the tighter of the two when both exceed", () => {
    // 800x800 with 320x240 cap → height drives (240/800), width 240
    expect(fitWithinBox({ width: 800, height: 800 }, 320, 240)).toEqual({
      width: 240,
      height: 240,
    });
  });

  it("rounds output to integers", () => {
    // 333x333 in 100x100 → 100x100 exact since both equal
    expect(fitWithinBox({ width: 333, height: 333 }, 100, 100)).toEqual({
      width: 100,
      height: 100,
    });
    // 333x111 in 100x100 → width drives (100/333), height 33 (rounded)
    expect(fitWithinBox({ width: 333, height: 111 }, 100, 100)).toEqual({
      width: 100,
      height: 33,
    });
  });
});
