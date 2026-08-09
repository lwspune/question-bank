-- Sitemap <lastmod> for the ~398 /questions chapter landing pages.
--
-- PROBLEM (2026-08-09, from a Search Console coverage export): 942 of ~982 known
-- URLs sat in "Discovered – currently not indexed" — Google had the addresses and
-- had not crawled them. The one lever for saying "crawl THIS one, it changed" is
-- <lastmod>, and ours was useless: src/app/sitemap.ts read the clock once at build
-- and stamped that single value onto 984 of 988 URLs, so every deploy claimed all
-- of them had changed. Google discounts a lastmod it has learned not to trust.
--
-- A chapter landing page changes when questions are INGESTED into that chapter, so
-- its honest last-modified is max(created_at) over its PUBLIC questions.
--
-- WHY AN RPC RATHER THAN A .select(): this is a GROUP BY aggregate. Deriving it in
-- JS from a row payload would hit PostgREST's 1000-row cap and silently return the
-- wrong date for every chapter past row 1000 — the single most-repeated bug in this
-- codebase (see the "PostgREST 1000-row cap" pitfall). One RPC per kind returns one
-- row per chapter (~258 today) and stays under the cap by construction.
--
-- NOTE ON THE PARAMETER: p_kind is REQUIRED, not `p_kind is null or ...`. Migration
-- 0068 established that the optional-parameter idiom makes a `language sql` body
-- plan ONCE and generically, demoting every predicate to a filter. A required
-- parameter sidesteps that entirely; callers make two calls (pyq, practice).
--
-- `security invoker` so RLS still applies — the anon client can only ever see
-- PUBLIC rows, which is exactly the set the sitemap should describe.

create or replace function public.get_chapter_last_added(
  p_kind public.question_kind
)
returns table (chapter_id uuid, last_added timestamptz)
language sql
stable
security invoker
set search_path = ''
as $$
  select q.chapter_id, max(q.created_at) as last_added
  from public.questions q
  where q.visibility = 'PUBLIC'
    and q.question_kind = p_kind
    and q.chapter_id is not null
  group by q.chapter_id;
$$;

comment on function public.get_chapter_last_added(public.question_kind) is
  'Newest PUBLIC question per chapter for the given kind. Feeds the sitemap <lastmod> of /questions/<exam>/<subject>/<chapter>.';

revoke execute on function public.get_chapter_last_added(public.question_kind) from public;
grant execute on function public.get_chapter_last_added(public.question_kind) to anon, authenticated, service_role;
