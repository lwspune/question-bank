/**
 * The /dashboard hub's cards, grouped into sections, as data. The page renders
 * whatever this returns for the viewer's role; tests/dashboard-hub-cards.test.ts
 * fails if a /dashboard page is not linked here, so a new page cannot end up
 * reachable only by URL (Quiz Leads was, until 2026-11-06).
 *
 * Audience: `everyone` = any staff member who reaches the hub (teachers are
 * redirected to /browse before it renders); `admin` = an org ADMIN; `superadmin`
 * = platform staff, for the cross-org pages read with the service role.
 */
import {
  Activity,
  BarChart3,
  BookOpen,
  Building2,
  CalendarClock,
  FileText,
  Flag,
  FlaskConical,
  Gem,
  GraduationCap,
  HandHelping,
  HeartPulse,
  IndianRupee,
  ListChecks,
  MessageCircle,
  MessageSquareHeart,
  PenLine,
  Phone,
  School,
  Search,
  Swords,
  Table2,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";

export type HubAudience = "everyone" | "admin" | "superadmin";

export type HubContext = {
  /** The org holds no questions yet (and the stats read did not fail). */
  isFresh: boolean;
  openReports: number;
  openConceptReports: number;
  sheetsWaiting: number;
};

export type HubCard = {
  href: string;
  icon: LucideIcon;
  audience: HubAudience;
  title: (c: HubContext) => string;
  describe: (c: HubContext) => string;
  /** A count shown as a red badge when above zero. */
  badge?: (c: HubContext) => number;
  primary?: boolean;
};

export type HubSection = { id: string; heading: string; cards: HubCard[] };

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

const card = (
  href: string,
  icon: LucideIcon,
  audience: HubAudience,
  title: string | ((c: HubContext) => string),
  describe: string | ((c: HubContext) => string),
  extra: Pick<HubCard, "badge" | "primary"> = {},
): HubCard => ({
  href,
  icon,
  audience,
  title: typeof title === "string" ? () => title : title,
  describe: typeof describe === "string" ? () => describe : describe,
  ...extra,
});

export const HUB_SECTIONS: readonly HubSection[] = [
  {
    id: "todo",
    heading: "Waiting for you",
    cards: [
      card("/dashboard/reports", Flag, "admin", "Question reports", (c) =>
        c.openReports > 0
          ? `${c.openReports} open ${plural(c.openReports, "report needs", "reports need")} review.`
          : "Reports students and V file on questions. Nothing open.",
        { badge: (c) => c.openReports },
      ),
      card("/dashboard/notes-reports", BookOpen, "admin", "Concept reports", (c) =>
        c.openConceptReports > 0
          ? `${c.openConceptReports} open ${plural(c.openConceptReports, "report", "reports")} on notes concepts.`
          : "Reports on /notes concepts. Nothing open.",
        { badge: (c) => c.openConceptReports },
      ),
      card("/dashboard/answer-sheets", PenLine, "superadmin", "Answer sheets", (c) =>
        c.sheetsWaiting > 0
          ? `${c.sheetsWaiting} answer ${plural(c.sheetsWaiting, "sheet", "sheets")} waiting to be checked.`
          : "Board papers students sent for checking. Nothing waiting.",
        { badge: (c) => c.sheetsWaiting },
      ),
    ],
  },
  {
    id: "teach",
    heading: "Questions and teaching",
    cards: [
      card("/browse", Search, "everyone", "Browse questions", (c) =>
        c.isFresh
          ? "Once questions are uploaded, you'll filter and download them here."
          : "Filter by exam, chapter and difficulty, then download a question paper.",
        { primary: true },
      ),
      card(
        "/upload",
        Upload,
        "superadmin",
        (c) => (c.isFresh ? "Add your first questions" : "Upload questions"),
        "Add a new batch from an Excel file.",
      ),
      card("/dashboard/papers", FileText, "everyone", "Papers",
        "Build an exam paper together: each teacher fills their subject's section."),
      card("/dashboard/batches", Users, "everyone", "Batches",
        "Student cohorts and their rosters. Papers for a batch warn on repeated questions."),
      card("/dashboard/branches", Building2, "admin", "Branches",
        "Your campuses. Batches file under a branch; teachers are assigned to branches."),
      card("/dashboard/members", Users, "admin", "Members",
        "Add admins and teachers, reset passwords, manage roles."),
      card("/dashboard/syllabus", Table2, "everyone", "Syllabus map",
        "Which State Board Std XI/XII Chemistry, Physics and Maths topics each exam asks for, and the gaps."),
      card("/dashboard/planner", CalendarClock, "everyone", "Session plan",
        "The Std XI Maths book cut into one-hour classes, with NDA and CBSE gaps folded in."),
    ],
  },
  {
    id: "students",
    heading: "Students",
    cards: [
      card("/dashboard/students", GraduationCap, "superadmin", "Registered students",
        "Who has signed up and how they use the app: mocks, notes, scores. Filter by exam and activity."),
      card("/dashboard/mocks", Timer, "superadmin", "Mock performance",
        "How students scored on each published mock, attempt by attempt."),
      card("/dashboard/results", Trophy, "superadmin", "Student results",
        "Who cleared which exam, and the names waiting to go on /results."),
      card("/dashboard/feedback", MessageSquareHeart, "superadmin", "Feedback",
        "Mock ratings, NPS and student suggestions: what to build next."),
      card("/dashboard/tutor", HandHelping, "superadmin", "Tutor interest",
        "Who wants 1:1 tutoring or would teach it: online or offline, by city, with contact details."),
      card("/dashboard/quizzes", ListChecks, "superadmin", "Daily quizzes",
        "Quizzes built from the /notes question pool, and which are public."),
      card("/dashboard/leads", Phone, "superadmin", "Quiz leads",
        "People who took a public quiz, by mobile number, with a WhatsApp link."),
    ],
  },
  {
    id: "money",
    heading: "Money",
    cards: [
      card("/dashboard/sales", BarChart3, "superadmin", "Sales",
        "Passes and books sold, and the money taken, by day, week and month."),
      card("/dashboard/pricing", IndianRupee, "superadmin", "Pricing",
        "The passes on sale (price, length, copy) and the free limits. No deploy needed."),
      card("/dashboard/institutes", School, "superadmin", "Institutes near FC Road",
        "Coaching classes from Google Maps to sell to, small ones first: call, WhatsApp, status and notes."),
      card("/dashboard/entitlements", Gem, "superadmin", "Access",
        "Give or take back free pass access for a student, by email."),
    ],
  },
  {
    id: "readouts",
    heading: "How the product is doing",
    cards: [
      card("/dashboard/growth", FlaskConical, "superadmin", "Growth",
        "The North Star, signups by week, and each growth experiment against its own decision rule."),
      card("/dashboard/pmf", TrendingUp, "superadmin", "Product/market fit",
        "Cohort retention, feature use and which exams stick, plus what we still cannot see."),
      card("/dashboard/activity", Activity, "superadmin", "Usage shape",
        "How students use the app: daily or in bursts, and what they do most."),
      card("/dashboard/chat", MessageCircle, "superadmin", "V usage",
        "How often students open V, what they ask, what V answered and what it costs."),
      card("/dashboard/item-stats", Target, "superadmin", "Item statistics",
        "How hard each question really is, and where a distractor outpulls the key."),
    ],
  },
  {
    id: "reference",
    heading: "Reference",
    cards: [
      card("/dashboard/competitors", Swords, "superadmin", "Competitors",
        "What rival apps and sites offer, where we stand on each feature, and the gaps worth closing."),
      card("/dashboard/health", HeartPulse, "superadmin", "Database health",
        "Daily snapshots: disk spill, capacity against the plan caps, and the busiest queries."),
    ],
  },
];

function sees(audience: HubAudience, role: { isAdmin: boolean; isSuperadmin: boolean }): boolean {
  if (audience === "everyone") return true;
  if (audience === "admin") return role.isAdmin;
  return role.isSuperadmin;
}

/** The sections this viewer sees, in order, each holding only its visible cards.
 *  A section left with none is dropped, never rendered as a bare heading. */
export function visibleSections(role: { isAdmin: boolean; isSuperadmin: boolean }): HubSection[] {
  return HUB_SECTIONS.map((s) => ({ ...s, cards: s.cards.filter((c) => sees(c.audience, role)) })).filter(
    (s) => s.cards.length > 0,
  );
}
