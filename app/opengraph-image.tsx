import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card shown when the site is shared. Rendered by Satori, which supports only a subset of CSS:
 * flexbox only, and every element with more than one child needs an explicit `display: flex`.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0B",
          color: "#EDE8E0",
          padding: "68px 72px",
          borderTop: "10px solid #FFB547",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: "#FFB547" }} />
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#8C877F" }}>OPEN TO WORK</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#FFB547", marginTop: 20 }}>{site.role}</div>
          <div style={{ display: "flex", fontSize: 27, color: "#8C877F", marginTop: 14 }}>
            Next.js · React Native · Supabase
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 23,
            color: "#8C877F",
            borderTop: "1px solid #232221",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex" }}>{site.location}</div>
          <div style={{ display: "flex", color: "#EDE8E0" }}>{site.handle}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
