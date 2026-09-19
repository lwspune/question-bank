/**
 * Let a `tsx` script import a module that is marked `server-only`.
 *
 * `server-only` is a Next BUILD alias with no real module behind it, so any
 * script importing such a module dies at resolve time. The project's existing
 * answer (recorded in tests/stubs/server-only.ts and ARCHITECTURE.md) is that
 * modules a script needs simply omit the guard — which works, but pays for it
 * by removing a genuine safety property from shipped code.
 *
 * This is the other half of that trade, for the cases where the guard is worth
 * keeping. `lib/mocks/service.ts` holds `submitAttempt`, the write path that
 * decides a student's score and emits their drill fuel; it should keep failing
 * the build if it is ever pulled into a client bundle. So the resolver is
 * satisfied HERE, in the script process, instead.
 *
 * Import this BEFORE the module that needs it — ES imports evaluate in
 * declaration order, so the patch is installed by the time the guard resolves.
 */
import Module from "node:module";
import { join } from "node:path";

const STUB = join(__dirname, "stubs", "server-only.ts");

type Resolver = (this: unknown, request: string, ...rest: unknown[]) => string;
const internals = Module as unknown as { _resolveFilename: Resolver };
const original = internals._resolveFilename;

internals._resolveFilename = function (request: string, ...rest: unknown[]): string {
  if (request === "server-only") return STUB;
  return original.call(this, request, ...rest);
};
