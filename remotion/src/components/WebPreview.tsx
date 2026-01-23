import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface WebPreviewProps {
  startFrame: number;
}

export const WebPreview: React.FC<WebPreviewProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = Math.max(0, frame - startFrame);

  const scale = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(
    relativeFrame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        width: "85%",
        maxWidth: 800,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        overflow: "hidden",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          gap: 12,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#27ca40",
            }}
          />
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: 6,
            padding: "6px 12px",
            fontSize: 12,
            color: "#666",
            border: "1px solid #ddd",
          }}
        >
          vibecodingclaude.com/es/
        </div>
      </div>

      {/* Website content preview */}
      <div
        style={{
          padding: "30px 40px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 16,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Vibe Coding con Claude
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: 16,
            marginBottom: 24,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          De cero a tu primera app con IA
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              color: "#764ba2",
              padding: "10px 24px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Empezar Guía
          </div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Ver Tutorial
          </div>
        </div>
      </div>
    </div>
  );
};
