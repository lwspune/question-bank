import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NDA Physics — Strategy Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function NdaPhysicsOpenGraphImage() {
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
            "linear-gradient(135deg, #2a0c0c 0%, #7a1f1f 50%, #2a0c0c 100%)",
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
              color: "#2a0c0c",
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
              color: "#fb923c",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid #fb923c",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            NDA PART B Physics
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
            <span>How NDA Physics</span>
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
            A 449-question analysis of every paper from 2017 to 2026 —
            14 chapter playbooks, formula compendium, trends, traps.
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
          <span>pyqvault.com/guide/nda-physics</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
