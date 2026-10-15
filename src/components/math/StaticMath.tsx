import "katex/dist/katex.min.css";
import katex from "katex";
import { BlockTree, KatexTree, RichTree, renderMathError, type MathSet } from "./mathTree";

/**
 * Math drawn on the server, for pages a phone should not draw twice
 * (2026-10-16). Not a client component, so each equation reaches the browser
 * as finished markup and costs no JavaScript there.
 *
 * Why: on the notes print handout every equation was a client component, so a
 * phone drew all of them again after the server already had. On a budget
 * Android phone the 1,493-equation MHT-CET Indefinite Integration handout froze
 * for 52 s, and a student tapped "Download as PDF" seven times and left
 * (insight handout-freezes-phones in lib/growth/insights.ts).
 *
 * By default it drops KaTeX's hidden MathML copy: that halves the markup and a
 * printed PDF never carries it. Pass `mathml` to keep it; with it on, the
 * output is byte-identical to the client components (tests/static-math.test.ts).
 *
 * The HTML set below comes from KaTeX's renderer, which escapes the source it
 * is given; the source here is our own notes registry.
 */
type Output = "html" | "htmlAndMathml";

function texHtml(tex: string, displayMode: boolean, output: Output): { html: string } | { error: Error } {
  try {
    // throwOnError, then renderMathError: the same contract react-katex has
    // when it is given a renderError.
    return { html: katex.renderToString(tex, { displayMode, throwOnError: true, output }) };
  } catch (error) {
    if (error instanceof katex.ParseError || error instanceof TypeError) return { error };
    throw error;
  }
}

function staticMathSet(output: Output): MathSet {
  return {
    Inline: ({ tex }) => {
      const r = texHtml(tex, false, output);
      return "error" in r ? renderMathError(r.error) : <span data-testid="react-katex" dangerouslySetInnerHTML={{ __html: r.html }} />;
    },
    Block: ({ tex }) => {
      const r = texHtml(tex, true, output);
      return "error" in r ? renderMathError(r.error) : <div data-testid="react-katex" dangerouslySetInnerHTML={{ __html: r.html }} />;
    },
  };
}

const LEAN = staticMathSet("html");
const WITH_MATHML = staticMathSet("htmlAndMathml");

type Props = { text: string; className?: string; mathml?: boolean };

export function StaticKatexRenderer({ text, className, mathml }: Props) {
  return <KatexTree text={text} className={className} math={mathml ? WITH_MATHML : LEAN} />;
}

export function StaticRichText({ text, className, mathml }: Props) {
  return <RichTree text={text} className={className} math={mathml ? WITH_MATHML : LEAN} />;
}

export function StaticBlockText({ text, className, solution, mathml }: Props & { solution?: boolean }) {
  const Katex = mathml ? StaticKatexWithMathml : StaticKatexRenderer;
  return <BlockTree text={text} className={className} solution={solution} Katex={Katex} />;
}

function StaticKatexWithMathml({ text, className }: { text: string; className?: string }) {
  return <StaticKatexRenderer text={text} className={className} mathml />;
}
