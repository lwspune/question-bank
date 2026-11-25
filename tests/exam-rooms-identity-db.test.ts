/**
 * Integration test for exam rooms round 2 (migration 0290), on the TEST project:
 * - a room nickname is unique within a room, ignoring case and outer spaces,
 *   but the same nickname may be used in another room;
 * - a nickname is 2 to 20 characters;
 * - student_profiles.rooms_button_hidden_until takes a time or 'infinity'.
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const ROOM_A = `test-nick-a-${RUN_ID}`;
const ROOM_B = `test-nick-b-${RUN_ID}`;

describe.skipIf(!HAS_ENV)("exam rooms nicknames and hiding (0290)", () => {
  let admin: SupabaseClient;
  const users: string[] = [];

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    for (const who of ["a", "b"]) {
      const { data, error } = await admin.auth.admin.createUser({ email: `rooms-nick-${who}-${RUN_ID}@test.local`, email_confirm: true });
      if (error || !data.user) throw new Error(`createUser failed: ${error?.message}`);
      users.push(data.user.id);
    }
    const rooms = await admin.from("exam_rooms").insert([
      { exam_slug: ROOM_A, open: true },
      { exam_slug: ROOM_B, open: true },
    ]);
    if (rooms.error) throw new Error(rooms.error.message);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("exam_rooms").delete().in("exam_slug", [ROOM_A, ROOM_B]);
    for (const id of users) await admin.auth.admin.deleteUser(id);
  });

  const join = (slug: string, user: string, name: string) =>
    admin.from("exam_room_members").insert({ exam_slug: slug, user_id: user, display_name: name, last_read_id: 0 });

  it("keeps a nickname unique within a room, ignoring case and outer spaces", async () => {
    expect((await join(ROOM_A, users[0], "Quiet Falcon")).error).toBeNull();
    const clash = await join(ROOM_A, users[1], " quiet falcon ");
    expect(clash.error?.code).toBe("23505");
  });

  it("lets the same nickname be used in another room", async () => {
    expect((await join(ROOM_B, users[1], "Quiet Falcon")).error).toBeNull();
  });

  it("refuses a nickname under 2 or over 20 characters", async () => {
    const short = await admin.from("exam_room_members").update({ display_name: "Q" }).eq("exam_slug", ROOM_B).eq("user_id", users[1]);
    expect(short.error?.code).toBe("23514");
    const long = await admin.from("exam_room_members").update({ display_name: "Q".repeat(21) }).eq("exam_slug", ROOM_B).eq("user_id", users[1]);
    expect(long.error?.code).toBe("23514");
  });

  it("stores a hide time or infinity on the student's profile", async () => {
    const at = new Date(Date.now() + 2 * 3600_000).toISOString();
    const up = await admin
      .from("student_profiles")
      .upsert({ user_id: users[0], rooms_button_hidden_until: at }, { onConflict: "user_id" })
      .select("rooms_button_hidden_until")
      .single();
    expect(up.error).toBeNull();
    expect(Date.parse(up.data!.rooms_button_hidden_until as string)).toBe(Date.parse(at));
    const forever = await admin
      .from("student_profiles")
      .update({ rooms_button_hidden_until: "infinity" })
      .eq("user_id", users[0])
      .select("rooms_button_hidden_until")
      .single();
    expect(forever.error).toBeNull();
    expect(forever.data!.rooms_button_hidden_until).toBe("infinity");
  });
});
