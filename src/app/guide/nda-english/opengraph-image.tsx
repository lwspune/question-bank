import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NDA English (GAT) — Strategy Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function NdaEnglishOpenGraphImage() {
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
            "linear-gradient(135deg, #1a0c2e 0%, #4a1e5f 50%, #1a0c2e 100%)",
          color: "#f1f5f9",
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
              background: "#f1f5f9",
              color: "#1a0c2e",
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
              color: "#fbbf24",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid #fbbf24",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            NDA English (GAT)
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
            <span>How NDA English</span>
            <span>actually works.</span>
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#cbd5e1",
              maxWidth: "950px",
              lineHeight: 1.4,
            }}
          >
            A 900-question analysis of every GAT paper from 2017 to 2026 —
            16 playbooks, vocabulary families, trends, and traps.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            color: "#94a3b8",
          }}
        >
          <span>pyqvault.com/guide/nda-english</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
