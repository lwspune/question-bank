/**
 * The /me "Today" card: ONE lead action, and the greeting above it.
 * Spec: tests/me-today.test.ts.
 *
 * /me used to show three full-width blue buttons before any progress. The
 * card now leads with the first of: a mock left open, mistakes waiting in the
 * drill, the topic being read, a timed mock. A topic in progress that is not
 * the lead stays as one quiet link.
 */
export type TodayAction = {
  kind: "resume" | "drill" | "continue" | "mock";
  eyebrow: string;
  title: string;
  subtitle?: string;
  cta: string;
  href: string;
  secondary?: { label: string; href: string };
};

type Reading = { title: string; chapter: string; href: string };

export function pickTodayAction(input: {
  resume?: { title: string; href: string };
  /** Mistakes due in the drill; null while unknown (still loading). */
  due: number | null;
  cont?: Reading;
  mockHref: string;
}): TodayAction {
  const { resume, due, cont, mockHref } = input;
  const secondary = cont ? { label: cont.title, href: cont.href } : undefined;

  if (resume) {
    return { kind: "resume", eyebrow: "Mock in progress", title: resume.title, cta: "Resume", href: resume.href, secondary };
  }
  if (due !== null && due > 0) {
    return {
      kind: "drill",
      eyebrow: "Today",
      title: `Fix ${due} ${due === 1 ? "mistake" : "mistakes"}`,
      subtitle: "From your mocks, five at a time.",
      cta: "Start",
      href: "/drill",
      secondary,
    };
  }
  if (cont) {
    return { kind: "continue", eyebrow: "Continue reading", title: cont.title, subtitle: cont.chapter, cta: "Continue", href: cont.href };
  }
  return {
    kind: "mock",
    eyebrow: "Today",
    title: "Sit a timed past paper",
    subtitle: "Your score and every answer the moment you finish.",
    cta: "Start a mock",
    href: mockHref,
  };
}

/** Greeting for an hour of the day in IST (0-23). Late night counts as evening. */
export function greetingFor(hourIst: number): string {
  if (hourIst >= 5 && hourIst < 12) return "Good morning";
  if (hourIst >= 12 && hourIst < 17) return "Good afternoon";
  return "Good evening";
}
