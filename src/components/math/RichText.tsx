"use client";

import "katex/dist/katex.min.css";
import { RichTree } from "./mathTree";
import { REACT_KATEX } from "./KatexRenderer";

/**
 * Block-aware renderer for authored prose fields (notes definitions):
 * paragraphs + `- ` bullet lists, with inline **bold** and \(math\).
 * Returns block elements, so use it inside a block container (a <div>),
 * never inline. For inline content (options, breadcrumbs) use KatexRenderer.
 */

interface Props {
  text: string;
  className?: string;
}

export default function RichText({ text, className }: Props) {
  return <RichTree text={text} className={className} math={REACT_KATEX} />;
}
