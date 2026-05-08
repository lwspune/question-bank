import { randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BUCKET, publicImageUrl } from "./imageUrl";

export { BUCKET, publicImageUrl };
export const MAX_SIZE_BYTES = 1024 * 1024;
// WebP is intentionally excluded — the docx library's ImageRun does not
// support it, so we'd be unable to embed those images in Word exports.
export const ALLOWED_MIME = ["image/png", "image/jpeg"] as const;
export type AllowedMime = (typeof ALLOWED_MIME)[number];

const EXT_BY_MIME: Record<AllowedMime, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
};

export function isAllowedMime(mime: string): mime is AllowedMime {
  return (ALLOWED_MIME as readonly string[]).includes(mime);
}

export function extensionFromMime(mime: AllowedMime): string {
  return EXT_BY_MIME[mime];
}

export type ValidationResult =
  | { ok: true; mime: AllowedMime }
  | { ok: false; error: string };

export function validateImageUpload(input: {
  size: number;
  mime: string;
}): ValidationResult {
  if (input.size <= 0) {
    return { ok: false, error: "Image is empty." };
  }
  if (input.size > MAX_SIZE_BYTES) {
    return {
      ok: false,
      error: `Image is too large (${Math.round(
        input.size / 1024
      )} KB). Max 1 MB.`,
    };
  }
  if (!isAllowedMime(input.mime)) {
    return {
      ok: false,
      error: `Unsupported type "${input.mime}". Use PNG, JPEG, or WebP.`,
    };
  }
  return { ok: true, mime: input.mime };
}

export async function uploadImage(
  client: SupabaseClient,
  orgId: string,
  buffer: Buffer | Uint8Array,
  mime: AllowedMime
): Promise<string> {
  const path = `${orgId}/${randomUUID()}.${extensionFromMime(mime)}`;
  const { error } = await client.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: mime, upsert: false });
  if (error) throw new Error(`storage upload failed: ${error.message}`);
  return path;
}

export async function deleteImage(
  client: SupabaseClient,
  path: string
): Promise<void> {
  const { error } = await client.storage.from(BUCKET).remove([path]);
  if (error) throw new Error(`storage delete failed: ${error.message}`);
}

export function publicUrl(client: SupabaseClient, path: string): string {
  return client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function downloadImage(
  client: SupabaseClient,
  path: string
): Promise<Buffer> {
  const { data, error } = await client.storage.from(BUCKET).download(path);
  if (error || !data) {
    throw new Error(`storage download failed: ${error?.message ?? "no data"}`);
  }
  return Buffer.from(await data.arrayBuffer());
}
