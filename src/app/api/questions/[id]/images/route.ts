import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import {
  validateImageUpload,
  uploadImage,
  deleteImage,
} from "@/lib/storage/images";

export const maxDuration = 60;

const SLOTS = ["q_image", "a_image", "b_image", "c_image", "d_image"] as const;
type Slot = (typeof SLOTS)[number];

type QuestionRecord = {
  id: string;
  org_id: string;
  image_url: string | null;
  options: { id: string; label: string; image_url: string | null }[];
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await requireAdmin();
    const supabase = createSupabaseServerClient();

    const { data: question, error: qErr } = await supabase
      .from("questions")
      .select("id, org_id, image_url, options(id, label, image_url)")
      .eq("id", params.id)
      .maybeSingle<QuestionRecord>();

    if (qErr || !question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }
    if (question.org_id !== member.orgId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const errors: { slot: Slot; error: string }[] = [];
    let updated = 0;

    for (const slot of SLOTS) {
      const value = formData.get(slot);
      if (value == null) continue;

      if (typeof value === "string") {
        if (value !== "remove") {
          errors.push({
            slot,
            error: `Unrecognized value "${value}". Send a File or the string "remove".`,
          });
          continue;
        }
        const currentPath = currentImagePath(question, slot);
        if (currentPath) {
          try {
            await deleteImage(supabase, currentPath);
          } catch (err) {
            errors.push({
              slot,
              error: err instanceof Error ? err.message : "delete failed",
            });
            continue;
          }
        }
        await writeColumn(supabase, question, slot, null);
        updated++;
        continue;
      }

      if (value instanceof File) {
        const validation = validateImageUpload({
          size: value.size,
          mime: value.type,
        });
        if (!validation.ok) {
          errors.push({ slot, error: validation.error });
          continue;
        }
        const buffer = Buffer.from(await value.arrayBuffer());
        try {
          const newPath = await uploadImage(
            supabase,
            member.orgId,
            buffer,
            validation.mime
          );
          const oldPath = currentImagePath(question, slot);
          if (oldPath) {
            await deleteImage(supabase, oldPath).catch(() => undefined);
          }
          await writeColumn(supabase, question, slot, newPath);
          updated++;
        } catch (err) {
          errors.push({
            slot,
            error: err instanceof Error ? err.message : "upload failed",
          });
        }
      }
    }

    return NextResponse.json({ updated, errors });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("images route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

function currentImagePath(q: QuestionRecord, slot: Slot): string | null {
  if (slot === "q_image") return q.image_url;
  const label = slot[0].toUpperCase() as "A" | "B" | "C" | "D";
  return q.options.find((o) => o.label === label)?.image_url ?? null;
}

async function writeColumn(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  q: QuestionRecord,
  slot: Slot,
  path: string | null
): Promise<void> {
  if (slot === "q_image") {
    await supabase.from("questions").update({ image_url: path }).eq("id", q.id);
    return;
  }
  const label = slot[0].toUpperCase() as "A" | "B" | "C" | "D";
  const opt = q.options.find((o) => o.label === label);
  if (!opt) return;
  await supabase.from("options").update({ image_url: path }).eq("id", opt.id);
}
