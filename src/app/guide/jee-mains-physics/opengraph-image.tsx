import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JEE Mains Physics — Strategy Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function JeeMainsPhysicsOpenGraphImage() {
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
            "linear-gradient(135deg, #0f1033 0%, #312e81 50%, #0f1033 100%)",
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
              color: "#0f1033",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            Q
          </div>
          <span>PYQ Vault · Guides</span>
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
            JEE Mains Physics
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
            <span>How JEE Mains Physics</span>
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
            A 3,556-question analysis of every shift from 2021 to 2026 — +4 for
            a right answer, −1 for a wrong one, 24 chapter playbooks.
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
          <span>pyqvault.com/guide/jee-mains-physics</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
