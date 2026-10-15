import KatexRenderer from "./KatexRenderer";
import { BlockTree } from "./mathTree";

interface Props {
  text: string;
  className?: string;
  /** A worked solution: display equations left-align (`.solution-math` in globals.css). */
  solution?: boolean;
}

/**
 * Renders question/option content that MAY contain a GFM pipe-table, mixing
 * prose (KaTeX + **bold**, via KatexRenderer) with real `<table>` blocks.
 *
 * Fast path: when the text has no table (the overwhelming majority of bank
 * questions), it returns a bare <KatexRenderer> — byte-for-byte the prior
 * render behaviour, so existing questions are visually unchanged.
 */
export default function BlockText({ text, className, solution }: Props) {
  return <BlockTree text={text} className={className} solution={solution} Katex={KatexRenderer} />;
}
