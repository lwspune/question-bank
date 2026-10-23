-- 0180_v_cache_1h.sql
--
-- V moves to Anthropic's 1-hour prompt cache (2026-10-23).
--
-- The 5-minute cache was written afresh for 58 of 127 AI answers on
-- 2026-10-22: 39 of those came 5-60 minutes after the previous answer, so the
-- cache had just lapsed. A 1-hour write costs 2x the input price instead of
-- 1.25x, and the same 39 become reads at a tenth (lib/chat/anthropic.ts).
--
-- Because the two writes are priced apart, the 1-hour part is stored apart:
-- cache_write_1h_tokens is the PART of cache_write_tokens kept for an hour,
-- never added to it. Rows before this migration have none and keep their
-- 5-minute price, so the dashboard's past costs do not move. Prices stay in
-- TypeScript (lib/chat/interactions.ts aiAnswerCostUsd).
--
-- The table enforces the shape: the part cannot exceed the whole, and only an
-- AI row ('ai' or 'ai_failed') may carry it, as with the other cache counts.

alter table public.chat_interactions
  add column cache_write_1h_tokens integer,
  add constraint chat_interactions_cache_write_1h_within check (
    cache_write_1h_tokens is null
    or (cache_write_1h_tokens >= 0 and cache_write_tokens is not null and cache_write_1h_tokens <= cache_write_tokens)
  );

alter table public.chat_interactions
  drop constraint chat_interactions_cache_tokens_ai_only,
  add constraint chat_interactions_cache_tokens_ai_only check (
    -- coalesce: a NULL reply_source would make the left side NULL, and a CHECK passes on NULL.
    coalesce(reply_source, '') in ('ai', 'ai_failed')
    or (cache_read_tokens is null and cache_write_tokens is null and cache_write_1h_tokens is null)
  );

comment on column public.chat_interactions.cache_write_1h_tokens is
  'The part of cache_write_tokens written to the 1-hour prompt cache (2x the input price; 5-minute writes are 1.25x). Migration 0180.';

-- The return type gains a column, so the function is dropped and made again (0162's body otherwise).
drop function public.chat_ai_usage_by_day();

create function public.chat_ai_usage_by_day()
returns table (
  day date,
  answers integer,
  failed integer,
  tokens_in bigint,
  tokens_out bigint,
  cache_read_tokens bigint,
  cache_write_tokens bigint,
  cache_write_1h_tokens bigint
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    (c.created_at at time zone 'Asia/Kolkata')::date as day,
    (count(*) filter (where c.reply_source = 'ai'))::integer as answers,
    (count(*) filter (where c.reply_source = 'ai_failed'))::integer as failed,
    coalesce(sum(c.tokens_in), 0)::bigint as tokens_in,
    coalesce(sum(c.tokens_out), 0)::bigint as tokens_out,
    coalesce(sum(c.cache_read_tokens), 0)::bigint as cache_read_tokens,
    coalesce(sum(c.cache_write_tokens), 0)::bigint as cache_write_tokens,
    coalesce(sum(c.cache_write_1h_tokens), 0)::bigint as cache_write_1h_tokens
  from public.chat_interactions c
  where c.reply_source in ('ai', 'ai_failed')
  group by 1
  order by 1;
$$;

comment on function public.chat_ai_usage_by_day() is
  'V''s AI use per India-time day (answers, failed part-way, tokens, cache, 1-hour cache writes). Service role only; /dashboard/chat prices it.';

-- REVOKE FROM PUBLIC alone leaves the explicit anon/authenticated grants Supabase adds.
revoke execute on function public.chat_ai_usage_by_day() from public, anon, authenticated;
grant execute on function public.chat_ai_usage_by_day() to service_role;
