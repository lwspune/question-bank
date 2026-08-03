/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The 317 /questions landing pages prerender concurrently at build, and each
  // queries Postgres. The query itself is fast (EXPLAIN: ~13ms on an existing
  // index) — the failures are CONTENTION: a burst of prerenders trips Postgres'
  // statement_timeout, and queryQuestions' 57014 retry can only absorb so much.
  //
  // cpus caps how many pages generate at once, which attacks the cause.
  // staticPageGenerationTimeout raises the 60s worker limit whose SIGTERM was
  // killing pages MID-RETRY — turning a slow-but-recovering page into a hard
  // build failure. Cost of both: a slower build.
  staticPageGenerationTimeout: 180,
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
