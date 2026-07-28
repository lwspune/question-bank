/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
