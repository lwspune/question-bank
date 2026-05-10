-- 0011_rate_limits.sql
--
-- Phase D of the public-product pivot. Per-IP rate limit on /api/export so a
-- single client can't curl through the entire bank in a loop.
--
-- Storage: a single Postgres table keyed by (bucket, window_start). No new
-- service or dependency. Atomic via INSERT ... ON CONFLICT DO UPDATE wrapped
-- in a SECURITY DEFINER function callable only by service_role.
--
-- Garbage collection: each call to the function deletes rows older than 2h
-- for the calling bucket. Cheap (bucket-scoped) and avoids needing a cron.

create table rate_limits (
  bucket       text not null,
  window_start timestamptz not null,
  count        int not null default 0,
  primary key (bucket, window_start)
);

-- Defense in depth: RLS on, zero policies = anon/authenticated cannot read.
-- Only service_role (which bypasses RLS) ever touches this table.
alter table rate_limits enable row level security;

create index rate_limits_cleanup_idx on rate_limits (window_start);

-- Atomic increment. Returns the new count for the (bucket, window_start) pair.
-- Also opportunistically GCs old windows for the same bucket so the table
-- stays small without a separate cron job.
create or replace function public.rate_limit_increment(
  p_bucket text,
  p_window_start timestamptz
)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count int;
begin
  insert into rate_limits (bucket, window_start, count)
  values (p_bucket, p_window_start, 1)
  on conflict (bucket, window_start)
  do update set count = rate_limits.count + 1
  returning count into new_count;

  delete from rate_limits
  where bucket = p_bucket and window_start < now() - interval '2 hours';

  return new_count;
end;
$$;

-- PostgREST advertises public functions; lock execute to service_role only
-- so anon/authenticated can't call /rest/v1/rpc/rate_limit_increment.
-- Note: Supabase auto-grants EXECUTE on public.* to anon + authenticated, so
-- a `from public` revoke alone is not enough — the per-role revoke is what
-- actually removes those auto-grants and clears advisor lints 0028/0029.
revoke all on function public.rate_limit_increment(text, timestamptz) from public;
revoke execute on function public.rate_limit_increment(text, timestamptz) from anon, authenticated;
grant execute on function public.rate_limit_increment(text, timestamptz) to service_role;
