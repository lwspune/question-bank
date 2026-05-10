/**
 * Read the natural (intrinsic) pixel dimensions of a PNG or JPEG buffer
 * without decoding the image. Used by the docx exporter so embedded images
 * keep their aspect ratio instead of being squashed into a fixed rectangle.
 *
 * Returns null for unrecognised or truncated buffers — callers should fall
 * back to a sensible default rectangle in that case.
 */
export type Dimensions = { width: number; height: number };

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

export function readImageDimensions(bytes: Buffer): Dimensions | null {
  if (bytes.length >= 24 && hasPngSignature(bytes)) {
    return readPngDimensions(bytes);
  }
  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    return readJpegDimensions(bytes);
  }
  return null;
}

function hasPngSignature(bytes: Buffer): boolean {
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (bytes[i] !== PNG_SIGNATURE[i]) return false;
  }
  return true;
}

function readPngDimensions(bytes: Buffer): Dimensions {
  // After the 8-byte signature: 4-byte length, 4-byte "IHDR", then
  // 4-byte width and 4-byte height (big-endian).
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

function readJpegDimensions(bytes: Buffer): Dimensions | null {
  let offset = 2; // past SOI (FFD8)
  while (offset < bytes.length - 1) {
    if (bytes[offset] !== 0xff) {
      offset++;
      continue;
    }
    while (offset < bytes.length && bytes[offset] === 0xff) offset++;
    if (offset >= bytes.length) return null;

    const marker = bytes[offset++];

    // Markers without payload — keep walking.
    if (marker === 0x00 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue;
    }
    // EOI / SOS — image data follows; we won't find SOF beyond here.
    if (marker === 0xd9 || marker === 0xda) return null;

    if (offset + 1 >= bytes.length) return null;
    const segLength = (bytes[offset] << 8) | bytes[offset + 1];

    if (isSofMarker(marker)) {
      // SOF segment: 2-byte length, 1-byte precision, 2-byte height,
      // 2-byte width.
      if (offset + 7 >= bytes.length) return null;
      const height = (bytes[offset + 3] << 8) | bytes[offset + 4];
      const width = (bytes[offset + 5] << 8) | bytes[offset + 6];
      return { width, height };
    }

    offset += segLength;
  }
  return null;
}

function isSofMarker(marker: number): boolean {
  // SOF0..SOF15 minus DHT (C4), JPG (C8), DAC (CC).
  if (marker < 0xc0 || marker > 0xcf) return false;
  return marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
}

/**
 * Scale a (width, height) pair down to fit inside (maxWidth, maxHeight)
 * while preserving aspect ratio. Returns the input unchanged when it
 * already fits. Output is rounded to whole integers.
 */
export function fitWithinBox(
  natural: Dimensions,
  maxWidth: number,
  maxHeight: number
): Dimensions {
  if (natural.width <= maxWidth && natural.height <= maxHeight) {
    return { width: natural.width, height: natural.height };
  }
  const scale = Math.min(
    maxWidth / natural.width,
    maxHeight / natural.height
  );
  return {
    width: Math.round(natural.width * scale),
    height: Math.round(natural.height * scale),
  };
}
