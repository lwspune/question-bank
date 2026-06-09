import { ImageResponse } from "next/og";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getPublicQuizBySlug } from "@/lib/quiz/publicQuiz";

export const alt = "Take this quiz on PYQ Vault";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Per-quiz link-preview card. The whole reason the funnel lives in this Next.js
// app — a rich card roughly doubles forum/WhatsApp click-through. nodejs runtime
// (default) so it can reuse the admin client + getPublicQuizBySlug.
export default async function QuizOpenGraphImage({ params }: { params: { slug: string } }) {
  let quiz = null;
  try {
    quiz = await getPublicQuizBySlug(createSupabaseAdminClient(), params.slug);
  } catch {
    quiz = null;
  }

  const title = quiz?.title ?? "NDA Practice Quiz";
  const badge = [quiz?.exam, quiz?.subject].filter(Boolean).join(" ") || "NDA";
  const count = quiz?.questions.length ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #1e1b4b 100%)",
          color: "#eef2ff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "26px", fontWeight: 600 }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#eef2ff",
              color: "#312e81",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            Q
          </div>
          <span>PYQ Vault · Quiz</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: "22px",
              fontWeight: 600,
              color: "#a5b4fc",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid #a5b4fc",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: "30px", color: "#c7d2fe" }}>
            {count > 0 ? `${count} PYQ-based questions · ` : ""}See your score the moment you finish.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: "24px", color: "#a5b4fc" }}>
          <span>pyqvault.com — free past-year practice</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
