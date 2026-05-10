"use client";

import { useCountUp } from "@/lib/dashboard/countUp";

type Props =
  | { kind: "numeric"; value: number; label: string }
  | { kind: "text"; value: string; label: string };

export default function StatCard(props: Props) {
  return (
    <div className="rounded-lg border bg-card p-4 transition-colors hover:border-primary/30 sm:p-5">
      <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
        {props.kind === "numeric" ? (
          <AnimatedNumber target={props.value} />
        ) : (
          props.value
        )}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{props.label}</p>
    </div>
  );
}

function AnimatedNumber({ target }: { target: number }) {
  const value = useCountUp(target);
  return <>{value.toLocaleString("en-IN")}</>;
}
