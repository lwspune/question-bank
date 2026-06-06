/**
 * The composition "machine" chain for (f∘g)(x) = f(g(x)): x enters g, its
 * output g(x) feeds f, producing f(g(x)). Emphasises do-g-first ordering.
 * Static server-component SVG.
 */
export default function CompositionMachine() {
  const W = 360;
  const H = 150;
  const midY = 70;
  const boxW = 64;
  const boxH = 50;

  const Box = ({ x, label }: { x: number; label: string }) => (
    <>
      <rect x={x} y={midY - boxH / 2} width={boxW} height={boxH} rx={8} className="fill-indigo-100 stroke-indigo-500 dark:fill-indigo-900/50 dark:stroke-indigo-400" strokeWidth="1.5" />
      <text x={x + boxW / 2} y={midY + 7} className="fill-indigo-900 dark:fill-indigo-100" fontSize="20" fontWeight="700" textAnchor="middle">{label}</text>
    </>
  );

  const Arrow = ({ x1, x2, label }: { x1: number; x2: number; label: string }) => (
    <>
      <line x1={x1} y1={midY} x2={x2 - 8} y2={midY} className="stroke-indigo-500" strokeWidth="1.6" markerEnd="url(#cm-arrow)" />
      <text x={(x1 + x2) / 2} y={midY - 12} className="fill-indigo-700 dark:fill-indigo-300" fontSize="12" textAnchor="middle">{label}</text>
    </>
  );

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Composition machine: x goes into g, output g of x goes into f, producing f of g of x">
        <text x={W / 2} y={22} className="fill-indigo-900 dark:fill-indigo-100" fontSize="13" fontWeight="600" textAnchor="middle">(f ∘ g)(x) = f(g(x)) — do g first</text>

        <text x={20} y={midY + 6} className="fill-indigo-900 dark:fill-indigo-100" fontSize="16" fontWeight="700" textAnchor="middle">x</text>
        <Arrow x1={32} x2={96} label="" />
        <Box x={96} label="g" />
        <Arrow x1={160} x2={236} label="g(x)" />
        <Box x={236} label="f" />
        <line x1={300} y1={midY} x2={332} y2={midY} className="stroke-indigo-500" strokeWidth="1.6" markerEnd="url(#cm-arrow)" />
        <text x={W - 6} y={midY + 5} className="fill-indigo-900 dark:fill-indigo-100" fontSize="12" fontWeight="700" textAnchor="end">f(g(x))</text>

        <text x={W / 2} y={H - 8} className="fill-rose-700 dark:fill-rose-300" fontSize="10.5" textAnchor="middle">Reverse the order and you usually get a different result: f∘g ≠ g∘f.</text>

        <defs>
          <marker id="cm-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-indigo-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
