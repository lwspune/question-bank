import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NDA Chemistry — Strategy Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function NdaChemistryOpenGraphImage() {
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
          background:
            "linear-gradient(135deg, #0a2a16 0%, #1f5a2f 50%, #0a2a16 100%)",
          color: "#f0fdf4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#f0fdf4",
              color: "#0a2a16",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            Q
          </div>
          <span>Question Bank · Guides</span>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: "22px",
              fontWeight: 600,
              color: "#86efac",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid #86efac",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            NDA PART B Chemistry
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "82px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            <span>How NDA Chemistry</span>
            <span>actually works.</span>
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#bbf7d0",
              maxWidth: "950px",
              lineHeight: 1.4,
            }}
          >
            A 262-question analysis of every paper from 2017 to 2026 —
            12 chapter playbooks, 50-compound reference, trends, traps.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            color: "#bbf7d0",
          }}
        >
          <span>question-bank-sage.vercel.app/guide/nda-chemistry</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
