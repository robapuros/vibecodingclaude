import React from "react";

interface MacTerminalProps {
  children: React.ReactNode;
  title?: string;
}

export const MacTerminal: React.FC<MacTerminalProps> = ({
  children,
  title = "claude — ~/vibecodingclaude",
}) => {
  return (
    <div
      style={{
        width: "95%",
        maxWidth: 1100,
        backgroundColor: "#1a1a1a",
        borderRadius: 16,
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.6)",
        overflow: "hidden",
        fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "14px 20px",
          backgroundColor: "#2a2a2a",
          borderBottom: "1px solid #3a3a3a",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#27ca40",
            }}
          />
        </div>
        {/* Title */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            color: "#888",
            fontSize: 14,
            marginRight: 70,
          }}
        >
          {title}
        </div>
      </div>

      {/* Terminal content */}
      <div
        style={{
          padding: "24px 32px",
          minHeight: 420,
          color: "#e0e0e0",
          fontSize: 17,
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </div>
  );
};
