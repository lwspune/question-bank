/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Raises Next's 60s per-page static-generation limit, whose SIGTERM used to
  // kill a /questions page MID-RETRY and turn a slow-but-recovering page into a
  // hard build failure.
  //
  // KEPT even though the cause is gone (2026-08-05): this is a CEILING, not a
  // delay. Pages now generate in milliseconds, so it costs nothing when nothing
  // is slow, and reverting to the 60s default would only re-expose the SIGTERM
  // edge.
  staticPageGenerationTimeout: 180,

  // Caps how many pages prerender at once. Added 2026-08-03 alongside the
  // timeout above to contain the /questions statement timeouts.
  //
  // KEPT. Once the real cause was fixed (the queryQuestions sort spill,
  // 2026-08-05) this looked like leftover scaffolding costing build speed, so
  // it was A/B'd on clean-.next builds — and the experiment was INCONCLUSIVE,
  // which is the useful part to record:
  //
  //     cpus: 4  -> 177s        (baseline)
  //     no cap   -> 527s        (looks 3x slower...)
  //     cpus: 4  -> 484s        (...but the CONTROL did not reproduce)
  //
  // The control condition itself drifted 177s -> 484s, so the 527s says nothing
  // about the cap. Cause: a concurrent ingestion session was loading both this
  // machine and the shared Postgres throughout. All three runs produced 623
  // prerendered pages with zero timeout/SIGTERM/ECONNRESET, so removing the cap
  // is not DANGEROUS — there is simply no evidence it is faster.
  //
  // Keeping it is the conservative default: it is the shipped state, and it
  // demonstrably holds up under exactly the concurrent load that makes builds
  // fragile. To settle it, re-run the A/B on an IDLE machine with no ingestion
  // or MCP traffic, alternating configs at least twice each (A-B-A-B), and
  // treat a result as real only if the two A runs agree.
  experimental: { cpus: 4 },
  async redirects() {
    return [
      {
        // The admin question editor moved to /dashboard/questions/[id]/edit so the
        // public per-chapter landing pages could take /questions/<exam>/<subject>/<chapter>.
        // Next.js forbids two differently-named dynamic segments at the same
        // position, so `[id]` and `[examSlug]` cannot both sit directly under
        // /questions. Keeping this as a CONFIG redirect rather than a route file
        // preserves old bookmarks without recreating that conflict — and it can't
        // shadow the landing pages, which are three segments deep, not two.
        source: "/questions/:id/edit",
        destination: "/dashboard/questions/:id/edit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
