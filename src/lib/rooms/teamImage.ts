/**
 * A picture on a team circle post (migration 0295): what may be uploaded,
 * where it is filed, and the team-post body. Pure (no node: imports), so the
 * route and the tests share it. Spec: tests/rooms-team-image.test.ts.
 */
import { z } from "zod";

/** The question-images bucket's own limit. */
export const TEAM_IMAGE_MAX_BYTES = 1024 * 1024;

export type TeamImageCheck = { ok: true; ext: "png" | "jpg"; contentType: "image/png" | "image/jpeg" } | { ok: false; error: string };

/** The type comes from the file's first bytes, never from its name or the browser's claim. */
export function checkTeamImage(head: Uint8Array, size: number): TeamImageCheck {
  if (size <= 0) return { ok: false, error: "The picture is empty." };
  if (size > TEAM_IMAGE_MAX_BYTES) return { ok: false, error: "The picture must be 1 MB or smaller. Save it as a JPEG to make it smaller." };
  const isPng = head.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((b, i) => head[i] === b);
  if (isPng) return { ok: true, ext: "png", contentType: "image/png" };
  const isJpeg = head.length >= 3 && head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
  if (isJpeg) return { ok: true, ext: "jpg", contentType: "image/jpeg" };
  return { ok: false, error: "Only PNG or JPEG pictures." };
}

export function teamImagePath(slug: string, id: string, ext: "png" | "jpg"): string {
  return `circles/${slug}/${id}.${ext}`;
}

/** Mirrors the 0295 CHECK, so a bad path fails here before the insert. */
export const TEAM_IMAGE_PATH_RE = /^circles\/[a-z0-9]+(-[a-z0-9]+)*\/[A-Za-z0-9_-]+\.(png|jpg)$/;

const Post = z
  .object({
    body: z.string().trim().min(1).max(1500),
    imagePath: z.string().regex(TEAM_IMAGE_PATH_RE).optional(),
    imageAlt: z.string().trim().min(1).max(300).optional(),
  })
  .refine((p) => (p.imagePath === undefined) === (p.imageAlt === undefined), "A picture needs a description, and a description needs a picture.");

export type TeamPost = { body: string; image: { path: string; alt: string } | null };

export function parseTeamPost(input: unknown): { ok: true; value: TeamPost } | { ok: false; error: string } {
  const r = Post.safeParse(input);
  if (!r.success) return { ok: false, error: r.error.issues[0]?.message ?? "Invalid post." };
  const { body, imagePath, imageAlt } = r.data;
  return { ok: true, value: { body, image: imagePath && imageAlt ? { path: imagePath, alt: imageAlt } : null } };
}
