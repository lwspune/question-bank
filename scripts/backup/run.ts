/**
 * Local database backup.
 *
 *   npm run db:backup                # dump, verify, prune to the newest 5 runs
 *   npm run db:backup -- --dry       # show what it would do; writes nothing
 *   npm run db:backup -- --keep=10   # override retention for this run
 *
 * Run it weekly from Task Scheduler, and BY HAND before any script that does a
 * bulk write. The second habit is the one that matters — see scripts/backup/lib.ts
 * for why the threat model is our own scripts rather than Supabase.
 *
 * WHAT EACH RUN WRITES (three files, one timestamp):
 *   <stamp>.dump           pg_dump custom format, DATA for every non-internal
 *                          schema — public, auth, storage, and anything new.
 *   <stamp>.schema.sql     DDL for `public`, as plain readable SQL.
 *   <stamp>.manifest.json  live row counts + sizes, so a restore can be checked
 *                          against what was actually there at dump time.
 *
 * WHY DATA AND SCHEMA SEPARATELY. Supabase's own CLI splits them, and restoring
 * platform-managed DDL (the `auth` schema is theirs, not ours) can break a
 * project. Our schema is reproducible from supabase/migrations — but this repo
 * has TWICE found a migration applied to prod and never committed (0021, 0066),
 * so a plain-SQL schema dump is cheap insurance against that exact recurrence.
 *
 * WHY CUSTOM FORMAT for the data. It is compressed natively, `pg_restore --list`
 * gives a verifiable table-of-contents (the coverage check below reads it), it
 * supports restoring a single table, and it avoids the `\restrict` psql
 * meta-command that plain-text dumps from pg_dump 17.10 carry. Convert to plain
 * SQL any time with: pg_restore -f - <file>.dump
 *
 * NOTHING HERE IS ENCRYPTED. Deliberate: these files stay on this machine, and
 * encryption was a mitigation for uploading them somewhere shared. They DO
 * contain student mobiles and consent records, so the directory must stay out
 * of git — the repo is public.
 */
import { execFileSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  BACKUP_PREFIX,
  dumpProblems,
  missingTables,
  planRetention,
  runStamp,
} from "./lib";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const BACKUP_DIR = path.join(process.cwd(), "backups");
const DEFAULT_KEEP = 5;
/** Below this the dump is treated as broken rather than merely small. */
const MIN_DUMP_BYTES = 1_000_000;

/**
 * Schemas Supabase manages for us. Taken verbatim from `supabase db dump
 * --dry-run`, which is the authoritative list of what their own tooling omits.
 *
 * THE POLARITY IS THE DESIGN, as in scripts/lib/needsBuild.ts: this is a list
 * of things to SKIP, so a schema nobody thought of is backed up rather than
 * silently dropped. An allowlist would rot the first time someone adds one.
 */
const EXCLUDED_SCHEMAS = [
  "information_schema",
  "graphql",
  "graphql_public",
  "pgsodium",
  "pgsodium_masks",
  "pgtle",
  "repack",
  "tiger",
  "tiger_data",
  "topology",
  "vault",
  "etl",
  "extensions",
  "pgbouncer",
  "realtime",
  "supabase_migrations",
  "_analytics",
  "_realtime",
  "_supavisor",
];
/** Wildcard schema families pg_dump matches with `*`; SQL needs LIKE patterns. */
const EXCLUDED_SCHEMA_PREFIXES = ["pg_", "timescaledb_", "_timescaledb_"];
/** Platform-managed migration ledgers; excluded from the dump, so also from the live list. */
const EXCLUDED_TABLES = [
  "auth.schema_migrations",
  "storage.migrations",
  "supabase_functions.migrations",
];

// ---------------------------------------------------------------- environment

/**
 * Locate the PostgreSQL client binaries.
 *
 * Absolute path on purpose: a scheduled task runs with a different environment
 * than an interactive shell, so a PATH-dependent script works when you test it
 * by hand and quietly does nothing at 3am on a Sunday. `PG_BIN` overrides.
 */
function resolvePgBin(): string {
  const override = process.env.PG_BIN;
  if (override) {
    if (fs.existsSync(path.join(override, exe("pg_dump")))) return override;
    fail(`PG_BIN is set to "${override}" but no pg_dump there.`);
  }

  const roots = ["C:\\Program Files\\PostgreSQL", "C:\\Program Files (x86)\\PostgreSQL"];
  const found: { version: number; dir: string }[] = [];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    for (const entry of fs.readdirSync(root)) {
      const dir = path.join(root, entry, "bin");
      if (fs.existsSync(path.join(dir, exe("pg_dump")))) {
        found.push({ version: Number.parseInt(entry, 10) || 0, dir });
      }
    }
  }
  // Newest client wins: pg_dump refuses to run against a server newer than itself.
  found.sort((a, b) => b.version - a.version);
  if (found[0]) return found[0].dir;

  fail(
    "Could not find pg_dump.\n" +
      "  Install the PostgreSQL 17+ client tools (command-line tools only — you do\n" +
      "  not need the server), or set PG_BIN to the directory containing pg_dump."
  );
}

const exe = (name: string) => (process.platform === "win32" ? `${name}.exe` : name);

function fail(message: string): never {
  console.error(`\n[db:backup] ${message}\n`);
  process.exit(1);
}

function requireDbUrl(): string {
  const url = process.env.SUPABASE_DB_URL;
  if (!url) {
    fail(
      "SUPABASE_DB_URL is not set.\n" +
        "  Add it to .env.local (the file is gitignored):\n" +
        "    SUPABASE_DB_URL=postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres\n" +
        "  Percent-encode the password if it contains @ : / or #."
    );
  }
  return url;
}

// ------------------------------------------------------------------ postgres

function psql(bin: string, dbUrl: string, sql: string): string {
  return execFileSync(path.join(bin, exe("psql")), [dbUrl, "-At", "-c", sql], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 32 * 1024 * 1024,
  });
}

/** Every table the dump is expected to carry, as `schema.table`. */
function liveTables(bin: string, dbUrl: string): string[] {
  const notIn = EXCLUDED_SCHEMAS.map((s) => `'${s}'`).join(", ");
  const notLike = EXCLUDED_SCHEMA_PREFIXES.map(
    (p) => `and n.nspname not like '${p.replace(/_/g, "\\_")}%'`
  ).join("\n      ");

  const rows = psql(
    bin,
    dbUrl,
    `select n.nspname || '.' || c.relname
     from pg_class c
     join pg_namespace n on n.oid = c.relnamespace
     where c.relkind = 'r'
       and n.nspname not in (${notIn})
       ${notLike}
     order by 1`
  );

  return rows
    .split("\n")
    .map((r) => r.trim())
    .filter((r) => r.length > 0 && !EXCLUDED_TABLES.includes(r));
}

/** Exact row count per table — the manifest's whole point, so no estimates. */
function rowCounts(bin: string, dbUrl: string, tables: string[]): Record<string, number> {
  if (tables.length === 0) return {};
  const union = tables
    .map((t) => {
      const [schema, name] = t.split(".");
      return `select '${t}' as t, count(*) as n from "${schema}"."${name}"`;
    })
    .join(" union all ");

  const counts: Record<string, number> = {};
  for (const line of psql(bin, dbUrl, `${union} order by 1`).split("\n")) {
    const [t, n] = line.split("|");
    if (t && n !== undefined) counts[t.trim()] = Number(n);
  }
  return counts;
}

/** Tables present in a custom-format dump, read from its table-of-contents. */
function dumpedTables(bin: string, dumpFile: string): string[] {
  const toc = execFileSync(path.join(bin, exe("pg_restore")), ["--list", dumpFile], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });

  const tables: string[] = [];
  for (const line of toc.split("\n")) {
    // e.g. "4234; 0 16499 TABLE DATA auth users supabase_auth_admin"
    const m = /\bTABLE DATA\s+(\S+)\s+(\S+)\s+\S+\s*$/.exec(line);
    if (m) tables.push(`${m[1]}.${m[2]}`);
  }
  return tables;
}

// ---------------------------------------------------------------------- main

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const keepArg = args.find((a) => a.startsWith("--keep="));
const keep = keepArg ? Number.parseInt(keepArg.split("=")[1], 10) : DEFAULT_KEEP;
// planRetention already fails safe on a garbage limit (it keeps everything),
// but say so out loud rather than silently doing something else than asked.
if (keepArg && !Number.isFinite(keep)) {
  fail(`--keep needs a whole number, got "${keepArg.split("=")[1]}".`);
}

const bin = resolvePgBin();
const dbUrl = requireDbUrl();
const stamp = runStamp(new Date());
const base = path.join(BACKUP_DIR, `${BACKUP_PREFIX}-${stamp}`);

const dumpFile = `${base}.dump`;
const schemaFile = `${base}.schema.sql`;
const manifestFile = `${base}.manifest.json`;

console.log(`[db:backup] ${new Date().toLocaleString()}  (run ${stamp} UTC)`);
console.log(`[db:backup] pg_dump: ${bin}`);

// --- what is actually in the database right now -----------------------------
const tables = liveTables(bin, dbUrl);
const counts = rowCounts(bin, dbUrl, tables);
const totalRows = Object.values(counts).reduce((a, b) => a + b, 0);
console.log(
  `[db:backup] live: ${tables.length} tables, ${totalRows.toLocaleString()} rows`
);

if (dry) {
  const existing = fs.existsSync(BACKUP_DIR) ? fs.readdirSync(BACKUP_DIR) : [];
  const plan = planRetention([...existing, `${BACKUP_PREFIX}-${stamp}.dump`], keep);
  console.log(`[db:backup] DRY RUN — nothing written.`);
  console.log(`            would write   ${path.relative(process.cwd(), dumpFile)} (+ schema, manifest)`);
  console.log(`            would keep    ${plan.keepStamps.length} run(s): ${plan.keepStamps.join(", ") || "none"}`);
  console.log(`            would delete  ${plan.removeFiles.length} file(s)`);
  process.exit(0);
}

fs.mkdirSync(BACKUP_DIR, { recursive: true });

// --- the dump ---------------------------------------------------------------
console.log(`[db:backup] dumping data …`);
let exitCode = 0;
try {
  execFileSync(
    path.join(bin, exe("pg_dump")),
    [
      dbUrl,
      "--data-only",
      "--format=custom",
      "--compress=9",
      "--quote-all-identifiers",
      "--schema=*",
      `--exclude-schema=${[...EXCLUDED_SCHEMAS, ...EXCLUDED_SCHEMA_PREFIXES.map((p) => `${p}*`)].join("|")}`,
      ...EXCLUDED_TABLES.flatMap((t) => [`--exclude-table=${t}`]),
      "--file",
      dumpFile,
    ],
    { stdio: ["ignore", "inherit", "inherit"] }
  );
} catch (err) {
  exitCode = typeof (err as { status?: number }).status === "number" ? (err as { status: number }).status : 1;
}

console.log(`[db:backup] dumping public schema (DDL) …`);
try {
  execFileSync(
    path.join(bin, exe("pg_dump")),
    [dbUrl, "--schema-only", "--schema=public", "--quote-all-identifiers", "--file", schemaFile],
    { stdio: ["ignore", "inherit", "inherit"] }
  );
} catch {
  // Non-fatal: the schema is also in supabase/migrations. Reported, not gated.
  console.warn(`[db:backup] WARNING: schema dump failed — data dump is unaffected.`);
}

// --- verify before we trust it ----------------------------------------------
const bytes = fs.existsSync(dumpFile) ? fs.statSync(dumpFile).size : 0;
let inDump: string[] = [];
if (bytes > 0 && exitCode === 0) {
  try {
    inDump = dumpedTables(bin, dumpFile);
  } catch {
    // pg_restore could not read its own archive: treat as corrupt, not as a crash.
    console.error(`[db:backup] the dump's table-of-contents is unreadable — archive is corrupt`);
    exitCode = 1;
  }
}
const missing = missingTables(tables, inDump);
const problems = dumpProblems({ bytes, minBytes: MIN_DUMP_BYTES, missing, exitCode });

if (problems.length > 0) {
  for (const p of problems) console.error(`[db:backup] PROBLEM: ${p}`);
  // Delete the artifacts rather than leave a bad backup looking like a good one.
  for (const f of [dumpFile, schemaFile, manifestFile]) {
    if (fs.existsSync(f)) fs.rmSync(f);
  }
  fail("backup REJECTED and removed. Nothing was pruned — your previous backups are intact.");
}

// --- manifest ---------------------------------------------------------------
fs.writeFileSync(
  manifestFile,
  `${JSON.stringify(
    {
      stamp,
      takenAt: new Date().toISOString(),
      serverVersion: psql(bin, dbUrl, "select current_setting('server_version')").trim(),
      pgDumpVersion: execFileSync(path.join(bin, exe("pg_dump")), ["--version"], {
        encoding: "utf8",
      }).trim(),
      dumpBytes: bytes,
      tableCount: tables.length,
      totalRows,
      rowCounts: counts,
    },
    null,
    2
  )}\n`
);

// --- retention --------------------------------------------------------------
const plan = planRetention(fs.readdirSync(BACKUP_DIR), keep);
for (const f of plan.removeFiles) fs.rmSync(path.join(BACKUP_DIR, f));

// --- report -----------------------------------------------------------------
const mb = (n: number) => `${(n / 1024 / 1024).toFixed(1)} MB`;
const previous = plan.keepStamps[1];
console.log(`\n[db:backup] OK  ${path.relative(process.cwd(), dumpFile)}  ${mb(bytes)}`);
console.log(`[db:backup] ${tables.length} tables verified present, ${totalRows.toLocaleString()} rows`);
if (previous) {
  const prevManifest = path.join(BACKUP_DIR, `${BACKUP_PREFIX}-${previous}.manifest.json`);
  if (fs.existsSync(prevManifest)) {
    const prev = JSON.parse(fs.readFileSync(prevManifest, "utf8")) as { totalRows: number };
    const delta = totalRows - prev.totalRows;
    console.log(
      `[db:backup] vs previous run: ${delta >= 0 ? "+" : ""}${delta.toLocaleString()} rows`
    );
  }
}
console.log(
  `[db:backup] keeping ${plan.keepStamps.length} run(s); deleted ${plan.removeFiles.length} file(s)\n`
);
