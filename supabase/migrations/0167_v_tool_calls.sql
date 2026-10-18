-- 0167_v_tool_calls.sql
--
-- What V searched (2026-10-18): keep each AI answer's tool calls with the reply.
--
-- WHY. Reading V's first week of AI answers, two replies said "I couldn't find
-- that chapter" for chapters the bank holds (Maharashtra HSC 12 Rotational
-- Dynamics, 56 PYQs). Why could only be worked out by re-running the search
-- code with a guess at what the model had passed it: the model's search words
-- were never stored. With them, a miss explains itself.
--
-- tool_calls: a JSON array, one element per call, in the order made:
--   { "name": "find_chapters", "input": { "query": ..., "exam": ... }, "result": "<first 300 chars>" }
-- `result` is kept only for a tool that asks for it (lib/chat/anthropic.ts
-- VTool.logResult): the chapter search does; my_progress, which returns the
-- student's own results, does not. NULL when the reply made no call, and on
-- every row written before this migration.
--
-- Bounded: at most 10 calls (V makes at most 3 rounds) and 8 KB of text.
--
-- ACCESS unchanged: RLS on, zero policies.

alter table public.chat_interactions
  add column tool_calls jsonb check (
    tool_calls is null
    or (
      jsonb_typeof(tool_calls) = 'array'
      and jsonb_array_length(tool_calls) between 1 and 10
      and octet_length(tool_calls::text) <= 8000
    )
  );
