import "server-only";
import type { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ClassLead } from "@/lib/classes/interest";

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

const PAGE = 1000; // PostgREST's row cap: page, never trust one read past it

/**
 * Every offline-class lead (migration 0265), with the account's email where a
 * signed-in visitor left it. Service role: the table has no read policy, so
 * call this only after a superadmin check.
 */
export async function loadClassLeads(admin: Admin): Promise<ClassLead[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await admin
      .from("class_interest")
      .select("id, user_id, name, courses, city, is_pune, mobile, from_section, called_at, created_at, updated_at")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`class leads read failed: ${error.message}`);
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < PAGE) break;
  }

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
