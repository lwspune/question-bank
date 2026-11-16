import "server-only";
import type { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ClassLead } from "@/lib/classes/interest";
import { readAllPages } from "@/lib/supabase/readAllPages";

type Admin = ReturnType<typeof createSupabaseAdminClient>;

type Row = {
  id: string;
  user_id: string | null;
  name: string | null;
  courses: string[];
  city: string;
  is_pune: boolean;
  mobile: string;
  from_section: string | null;
  called_at: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * Every offline-class lead (migration 0265), with the account's email where a
 * signed-in visitor left it. Service role: the table has no read policy, so
 * call this only after a superadmin check. Paged past PostgREST's 1000-row cap,
 * ordered by a unique key so no row repeats or drops between pages.
 */
export async function loadClassLeads(admin: Admin): Promise<ClassLead[]> {
  const rows = await readAllPages<Row>((from, to) =>
    admin
      .from("class_interest")
      .select("id, user_id, name, courses, city, is_pune, mobile, from_section, called_at, created_at, updated_at")
      .order("created_at", { ascending: false })
      .order("id")
      .range(from, to)
  );

  // Leads are few and most are signed out, so one lookup per account is cheap.
  const userIds = Array.from(new Set(rows.map((r) => r.user_id).filter((id): id is string => !!id)));
  const emails = new Map<string, string | null>();
  await Promise.all(
    userIds.map(async (id) => {
      const { data } = await admin.auth.admin.getUserById(id);
      emails.set(id, data.user?.email ?? null);
    })
  );

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.user_id ? (emails.get(r.user_id) ?? null) : null,
    courses: r.courses,
    city: r.city,
    isPune: r.is_pune,
    mobile: r.mobile,
    fromSection: r.from_section,
    calledAt: r.called_at,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
}
