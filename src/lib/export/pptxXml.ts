/**
 * Structural checks over hand-authored OOXML, plus the escaping helpers the
 * .pptx builder writes through.
 *
 * WHY THIS EXISTS: the .docx exporter delegates serialisation to the `docx`
 * library, so it can only produce well-formed XML. The .pptx exporter writes
 * its own parts, and PowerPoint validates them strictly — a single fault makes
 * it refuse the ENTIRE file with "PowerPoint could not open the file", naming
 * neither the part nor the reason. Every fault below cost a debugging cycle
 * during the build:
 *
 *   - `sz="undefined"` from a helper called without its optional argument.
 *   - a duplicate `xmlns:m`, because mml2omml ALREADY declares it and the
 *     first version of the slide writer declared it again.
 *
 * Deliberately structural-only — this checks lexical well-formedness, not
 * schema validity. Pure.
 */

/** Attribute values that are always a bug, never real data. */
const POISON_VALUES = new Set(["undefined", "NaN", "null", "[object Object]"]);

/**
 * OOXML attributes whose schema type is an integer. `attr()` refuses a
 * fractional number at the source; this set is the second line of defence,
 * catching a value that reached the XML as a pre-formatted string.
 */
const INTEGER_ATTRS = new Set([
  "cx", "cy", "x", "y", "w", "h", "sz", "val", "id", "b", "i", "u",
  "chOff", "chExt", "marL", "marR", "marT", "marB", "lIns", "rIns", "tIns", "bIns",
]);

const TAG_RE = /<(\/?)([A-Za-z_][\w:.-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
const ATTR_RE = /([A-Za-z_][\w:.-]*)\s*=\s*"([^"]*)"/g;
const VALID_ENTITY_RE = /^&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);/;

/**
 * Return every structural fault in `xml`, most useful first. An empty array
 * means the fragment is lexically well-formed.
 */
export function xmlFaults(xml: string): string[] {
  const faults: string[] = [];
  // The prolog and any comments are not element content; drop them so their
  // `?`/`--` punctuation cannot be mistaken for markup.
  const body = xml.replace(/<\?[\s\S]*?\?>/g, "").replace(/<!--[\s\S]*?-->/g, "");

  const stack: string[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  TAG_RE.lastIndex = 0;

  while ((match = TAG_RE.exec(body))) {
    checkText(body.slice(cursor, match.index), faults);
    cursor = match.index + match[0].length;

    const [, closing, name, attrs, selfClosing] = match;
    if (!closing) checkAttributes(name, attrs, faults);

    if (selfClosing === "/") continue;
    if (closing === "/") {
      const open = stack.pop();
      if (open !== name) {
        faults.push(`</${name}> closes <${open ?? "nothing"}>`);
      }
    } else {
      stack.push(name);
    }
  }
  checkText(body.slice(cursor), faults);

  if (stack.length) faults.push(`unclosed <${stack.join(">, <")}>`);
  return faults;
}

function checkAttributes(tag: string, attrs: string, faults: string[]): void {
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  ATTR_RE.lastIndex = 0;
  while ((m = ATTR_RE.exec(attrs))) {
    const [, name, value] = m;
    if (seen.has(name)) {
      faults.push(`duplicate attribute ${name} on <${tag}>`);
    }
    seen.add(name);
    if (POISON_VALUES.has(value.trim())) {
      faults.push(`<${tag} ${name}="${value}"> — placeholder leaked into output`);
    }
    if (INTEGER_ATTRS.has(name) && /^-?\d+\.\d+$/.test(value.trim())) {
      faults.push(
        `<${tag} ${name}="${value}"> — fractional value in an integer-typed attribute`
      );
    }
  }
}

function checkText(text: string, faults: string[]): void {
  if (!text) return;
  // A `<` surviving here was not lexed as a tag, so it is a raw angle bracket
  // in text content — invalid, and the usual sign of an unescaped stem.
  if (text.includes("<")) {
    faults.push(`unescaped '<' in text: ${snippet(text)}`);
  }
  for (let i = text.indexOf("&"); i !== -1; i = text.indexOf("&", i + 1)) {
    if (!VALID_ENTITY_RE.test(text.slice(i))) {
      faults.push(`unescaped '&' in text: ${snippet(text.slice(i))}`);
      break;
    }
  }
}

function snippet(s: string): string {
  const flat = s.replace(/\s+/g, " ").trim();
  return flat.length > 40 ? `${flat.slice(0, 40)}…` : flat;
}

/**
 * Characters XML 1.0 forbids outright — everything below #x20 except tab (#x9),
 * line feed (#xA) and carriage return (#xD). They cannot be escaped; a document
 * containing one is simply invalid, and PowerPoint refuses the whole file.
 *
 * This bank has produced them for real: a shell-mangled `\frac` leaves a form
 * feed where the backslash was.
 */
// eslint-disable-next-line no-control-regex
const ILLEGAL_XML_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

/**
 * Strip characters XML cannot represent.
 *
 * STRIPPED, not rejected — deliberately the opposite call from the ingestion
 * boundary (see [[reject-dont-normalise-when-hash-upstream]]). There, silent
 * repair desynchronises `content_hash` from the stored text, so the fix must
 * happen at the source. Here nothing is stored and nothing is hashed: this is
 * a render path, and dropping an invisible character the teacher cannot see
 * beats handing them no deck at all.
 */
export function stripIllegalXmlChars(s: string): string {
  return s.replace(ILLEGAL_XML_CHARS, "");
}

/** Escape a string for use as XML text content. */
export function escapeXml(s: string): string {
  return stripIllegalXmlChars(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Escape a string for use inside a double-quoted attribute value. */
export function escapeAttr(s: string): string {
  return escapeXml(s).replace(/"/g, "&quot;");
}

/**
 * Build an attribute string, REFUSING a value that is not finite/printable.
 * This is the runtime half of the POISON_VALUES guard: rather than emit
 * `sz="undefined"` and have PowerPoint reject the whole deck with an
 * unattributable error, fail here where the caller is on the stack.
 */
export function attr(name: string, value: string | number): string {
  if (value === undefined || value === null) {
    throw new Error(`pptx: missing value for attribute ${name}`);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error(`pptx: non-finite value for attribute ${name}: ${value}`);
    }
    // EVERY numeric attribute this builder emits is an OOXML integer type
    // (ST_PositiveCoordinate, ST_TextFontSize, ST_Percentage…). A fractional
    // value serialises as `cy="3147060.0000000005"` and PowerPoint rejects the
    // entire deck — silently, naming nothing. Refusing here turns that into a
    // stack trace at the call site that produced it, and forces the caller to
    // round explicitly rather than hope the arithmetic lands on a whole number.
    if (!Number.isInteger(value)) {
      throw new Error(
        `pptx: attribute ${name} must be an integer, got ${value} — round at the call site`
      );
    }
  }
  return ` ${name}="${escapeAttr(String(value))}"`;
}
