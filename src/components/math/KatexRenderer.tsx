"use client";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { KatexTree, renderMathError, type MathSet } from "./mathTree";

interface Props {
  text: string;
  className?: string;
}

/** react-katex draws each equation in the browser. For a page a phone should
 *  not draw twice, use StaticKatexRenderer (StaticMath.tsx). */
export const REACT_KATEX: MathSet = {
  Inline: ({ tex }) => <InlineMath renderError={renderMathError}>{tex}</InlineMath>,
  Block: ({ tex }) => <BlockMath renderError={renderMathError}>{tex}</BlockMath>,
};

export default function KatexRenderer({ text, className }: Props) {
  return <KatexTree text={text} className={className} math={REACT_KATEX} />;
}
