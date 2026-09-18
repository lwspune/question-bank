import { ImageResponse } from "next/og";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getMockCardBySlug } from "@/lib/mocks/query";

export const alt = "Sit this past paper as a timed mock test on PYQ Vault";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per-mock link-preview card.
 *
 * WHY: a mock link dropped into a 200-person WhatsApp group used to preview as
 * bare text — this route had title/description metadata and no image at all.
 * The quiz funnel's card exists for exactly this reason and its own comment
 * puts the effect at roughly double the click-through; the mock share button on
 * the result screen makes that the highest-volume link this app emits.
 *
 * ANON CLIENT, and the card is built from the LISTING columns: a published mock
 * is public, so there is nothing here the service-role key is needed for, and
 * getMockCardBySlug leaves the question snapshot in the database rather than
 * dragging it across the network to print three numbers.
 *
 * Fails soft to a generic card. A link preview that renders something plausible
 * beats a broken image in a group chat, and this route has no way to signal an
 * error to anyone who could fix it.
 */
export default async function MockOpenGraphImage({ params }: { params: { slug: string } }) {
  let mock = null;
  try {
    mock = await getMockCardBySlug(createSupabaseAnonClient(), params.slug);
  } catch {
    mock = null;
  }

  const title = mock?.title ?? "Timed mock test";
  const badge = mock?.examName || "PYQ Vault";
  const mins = mock ? Math.round(mock.durationSecs / 60) : 0;

  const stats: { value: string; label: string }[] = mock
    ? [
        { value: String(mock.totalQuestions), label: "questions" },
        { value: String(mock.totalMarks), label: "marks" },
        { value: String(mins), label: "minutes" },
      ]
    : [];

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
          <span>PYQ Vault · Mock test</span>
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
              fontSize: title.length > 48 ? "58px" : "72px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          {stats.length > 0 && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "48px" }}>
              {stats.map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <span style={{ fontSize: "44px", fontWeight: 700 }}>{s.value}</span>
                  <span style={{ fontSize: "26px", color: "#c7d2fe" }}>{s.label}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ fontSize: "30px", color: "#c7d2fe" }}>
            Real past paper, timed and auto-scored the moment you finish.
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
