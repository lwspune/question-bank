-- 0162_v_ai_usage.sql
--
-- V's token tracking without gaps (2026-10-16).
--
-- 1. reply_source 'ai_failed': the student got the fixed reply because an AI
--    answer failed PART-WAY, after earlier rounds were already billed (say the
--    chapter search ran, then the second call errored). Until now such a row
--    was a plain 'fallback' that could not hold tokens, so the cost vanished.
--    A failure before anything came back stays a plain 'fallback' with no
--    tokens (lib/chat/anthropic.ts reports what was spent on every failure).
--    'ai_failed' may carry tokens and cache counts; thumbs stay on 'ai' only.
--
-- 2. chat_ai_usage_by_day(): AI use summed per India-time day, IN THE DATABASE.
--    /dashboard/chat priced V by reading rows, newest 5,000 only; at 40-80 rows
--    a day that cap arrives in a few months and the all-time cost would start
--    undercounting silently (the PostgREST row-limit family in CLAUDE.md). One
--    row per day comes back instead, so there is nothing to truncate. Prices
--    stay in TypeScript (lib/chat/interactions.ts aiAnswerCostUsd), one place.
--    Service role only: it is platform-wide, like every /dashboard/chat read.

alter table public.chat_interactions
  drop constraint chat_interactions_reply_source_check,
  add constraint chat_interactions_reply_source_check
    check (reply_source is null or reply_source in ('ai', 'ai_failed', 'fallback', 'template', 'followup'));

-- Unchanged apart from the typed_question branch, which now admits 'ai_failed'
-- and lets it carry tokens.
alter table public.chat_interactions
  drop constraint chat_interactions_reply_shape,
  add constraint chat_interactions_reply_shape check (
    (
      (reply is null and reply_source is null and tokens_in is null and tokens_out is null and reply_links is null)
      or (
        event_type = 'typed_question'
        and reply is not null
        and reply_source is not null
        and reply_source in ('ai', 'ai_failed', 'fallback')
        and (reply_source in ('ai', 'ai_failed') or (tokens_in is null and tokens_out is null))
      )
      or (
        event_type = 'faq_click' and reply is not null and reply_source is not null
        and reply_source = 'template' and tokens_in is null and tokens_out is null
      )
      or (
        event_type = 'v_followup' and reply is not null and reply_source is not null
        and reply_source = 'followup' and tokens_in is null and tokens_out is null
      )
    )
    and (feedback is null or reply_source = 'ai')
    and ((feedback is null) = (feedback_at is null))
  );

alter table public.chat_interactions
  drop constraint chat_interactions_cache_tokens_ai_only,
  add constraint chat_interactions_cache_tokens_ai_only check (
    -- coalesce: a NULL reply_source would make the left side NULL, and a CHECK passes on NULL.
    coalesce(reply_source, '') in ('ai', 'ai_failed') or (cache_read_tokens is null and cache_write_tokens is null)
  );

create function public.chat_ai_usage_by_day()
returns table (
  day date,
  answers integer,
  failed integer,
  tokens_in bigint,
  tokens_out bigint,
  cache_read_tokens bigint,
  cache_write_tokens bigint
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
    coalesce(sum(c.cache_write_tokens), 0)::bigint as cache_write_tokens
  from public.chat_interactions c
  where c.reply_source in ('ai', 'ai_failed')
  group by 1
  order by 1;
$$;

comment on function public.chat_ai_usage_by_day() is
  'V''s AI use per India-time day (answers, failed part-way, tokens, cache). Service role only; /dashboard/chat prices it.';

-- REVOKE FROM PUBLIC alone leaves the explicit anon/authenticated grants Supabase adds.
revoke execute on function public.chat_ai_usage_by_day() from public, anon, authenticated;
grant execute on function public.chat_ai_usage_by_day() to service_role;
