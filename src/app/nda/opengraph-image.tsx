import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NDA Preparation — Past Papers, Strategy Guides, Teaching Notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function NdaHomeOpenGraphImage() {
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
            "linear-gradient(135deg, #1a0f2e 0%, #3d1e5f 50%, #1a0f2e 100%)",
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
              color: "#1a0f2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            Q
          </div>
          <span>PYQ Vault · NDA</span>
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
            NDA Preparation
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "78px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            <span>Past papers, strategy,</span>
            <span>and concept notes.</span>
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#cbd5e1",
              maxWidth: "950px",
              lineHeight: 1.4,
            }}
          >
            4,800+ past-year questions across 10 subjects · 2017–2026.
            Evidence-led guides for all six. Free, no sign-up.
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
          <span>pyqvault.com/nda</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
