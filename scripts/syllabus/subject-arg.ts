/**
 * `--subject=<key>` for the syllabus scripts.
 *
 * A FLAG, not a positional: several of these scripts already take a positional
 * argument that means something else (export-chapter-map-xlsx reads argv[2] as
 * "ncert" | "jee" | "all"), so a positional subject would collide with one of
 * them and silently run the wrong report.
 */
import {
  DEFAULT_SYLLABUS_SUBJECT,
  resolveSyllabusSubject,
  syllabusSubjectKeys,
  type SyllabusSubject,
} from "../../src/lib/syllabus/subjects";

/** The raw `--subject=` value, or undefined when the flag is absent. */
export function parseSubjectArg(argv: string[]): string | undefined {
  const hit = argv.find((a) => a.startsWith("--subject="));
  if (!hit) return undefined;
  return hit.slice("--subject=".length).trim() || undefined;
}

/**
 * Resolve the flag, defaulting to Chemistry so every existing invocation keeps
 * its current behaviour. Exits on an unknown subject rather than falling back —
 * a typo silently reporting on Chemistry is how a wrong number gets quoted.
 */
export function requireSubjectArg(argv: string[]): SyllabusSubject {
  const raw = parseSubjectArg(argv) ?? DEFAULT_SYLLABUS_SUBJECT;
  const resolved = resolveSyllabusSubject(raw);
  if (!resolved) {
    console.error(`unknown --subject=${raw}; known: ${syllabusSubjectKeys().join(", ")}`);
    process.exit(1);
  }
  return resolved;
}
