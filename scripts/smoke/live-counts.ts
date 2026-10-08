/**
 * npm run smoke:live-counts — fetch the live homepage and /browse and fail if
 * either tells visitors the bank holds 0 questions. Runs daily in
 * prod-contract.yml. Read-only: two GETs, no database, no secrets.
 *
 * Why it exists and what counts as a failure: scripts/lib/liveCountsCheck.ts.
 */
import { zeroCountClaims } from "../lib/liveCountsCheck";

const SITE = process.env.SMOKE_SITE_URL ?? "https://www.pyqvault.com";
const PAGES = ["/", "/browse"];

async function main() {
  let failed = false;
  for (const path of PAGES) {
    const url = `${SITE}${path}`;
    const res = await fetch(url, { headers: { "user-agent": "pyqvault-live-counts-smoke" } });
    if (!res.ok) {
      console.error(`FAIL ${url}: HTTP ${res.status}`);
      failed = true;
      continue;
    }
    const claims = zeroCountClaims(await res.text());
    if (claims.length > 0) {
      console.error(`FAIL ${url} says: ${claims.join(" · ")}`);
      failed = true;
    } else {
      console.log(`ok   ${url}`);
    }
  }
  if (failed) {
    console.error(
      "\nThe exam catalog is probably serving a bad cached load. See " +
        "getExamCatalogForRender in src/lib/exam/allExamStats.ts; bumping its " +
        "cache key and redeploying drops the entry."
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
