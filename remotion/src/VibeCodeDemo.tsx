import React from "react";
import {
  useCurrentFrame,
  AbsoluteFill,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { MacTerminal } from "./components/MacTerminal";
import { TypingText, FadeInText } from "./components/TypingText";
import { WebPreview } from "./components/WebPreview";

// Scene timings (in frames at 30fps)
const SCENES = {
  TERMINAL_INIT: { start: 0, duration: 140 },
  PROMPT_TYPING: { start: 140, duration: 150 },
  CLAUDE_RESPONSE: { start: 290, duration: 90 },
  WEB_PREVIEW: { start: 380, duration: 120 },
  CTA: { start: 500, duration: 100 },
};

const TerminalLine: React.FC<{
  prefix?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ prefix = "$", children, style }) => (
  <div style={{ marginBottom: 10, ...style }}>
    <span style={{ color: "#27ca40", marginRight: 10 }}>{prefix}</span>
    {children}
  </div>
);

const ClaudeResponse: React.FC<{
  children: React.ReactNode;
  startFrame: number;
}> = ({ children, startFrame }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        backgroundColor: "#252535",
        borderLeft: "4px solid #d97706",
        padding: "16px 20px",
        marginTop: 16,
        marginBottom: 12,
        borderRadius: "0 8px 8px 0",
        opacity,
      }}
    >
      <div style={{ color: "#d97706", fontSize: 14, marginBottom: 10, fontWeight: 600 }}>
        Claude
      </div>
      <div style={{ color: "#e0e0e0", fontSize: 16 }}>{children}</div>
    </div>
  );
};

// Claude Code ASCII Mascot
const ClaudeMascot: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        opacity,
        fontFamily: "monospace",
        fontSize: 14,
        lineHeight: 1.2,
        color: "#d97706",
        marginBottom: 8,
      }}
    >
      <pre style={{ margin: 0 }}>
{`    ╭──────────────────────────────────────────────────────────╮
    │                                                          │
    │    ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗     │
    │   ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝     │
    │   ██║     ██║     ███████║██║   ██║██║  ██║█████╗       │
    │   ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝       │
    │   ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗     │
    │    ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝     │
    │                                                          │`}
      </pre>
    </div>
  );
};

const ClaudeInfo: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        opacity,
        fontFamily: "monospace",
        fontSize: 14,
        lineHeight: 1.2,
        marginBottom: 16,
      }}
    >
      <pre style={{ margin: 0, color: "#666" }}>
{`    │           `}<span style={{ color: "#d97706", fontWeight: "bold" }}>Claude Code</span>{` `}<span style={{ color: "#888" }}>v2.17.0</span>{`                        │
    │                                                          │
    │   `}<span style={{ color: "#888" }}>/\\</span>{`    Your AI-powered coding assistant              │
    │  `}<span style={{ color: "#d97706" }}>/  \\</span>{`   Ready to vibe code with you                   │
    │ `}<span style={{ color: "#d97706" }}>/    \\</span>{`                                                │
    │`}<span style={{ color: "#d97706" }}>/ ◠  ◠ \\</span>{`  Type your request to get started             │
    │`}<span style={{ color: "#d97706" }}>\\  ──  /</span>{`                                               │
    │ `}<span style={{ color: "#d97706" }}>\\    /</span>{`                                                │
    │  `}<span style={{ color: "#d97706" }}>\\  /</span>{`                                                 │
    │   `}<span style={{ color: "#d97706" }}>\\/</span>{`                                                  │
    │                                                          │
    ╰──────────────────────────────────────────────────────────╯`}
      </pre>
    </div>
  );
};

export const VibeCodeDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene visibility
  const showTerminal = frame < SCENES.WEB_PREVIEW.start;
  const showWebPreview =
    frame >= SCENES.WEB_PREVIEW.start && frame < SCENES.CTA.start;
  const showCTA = frame >= SCENES.CTA.start;

  // Terminal scene content
  const terminalOpacity = interpolate(
    frame,
    [0, 15, SCENES.WEB_PREVIEW.start - 15, SCENES.WEB_PREVIEW.start],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // CTA animation
  const ctaScale = spring({
    frame: Math.max(0, frame - SCENES.CTA.start),
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #0f2744 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Terminal Scene */}
      {frame < SCENES.WEB_PREVIEW.start && (
        <div style={{ opacity: terminalOpacity }}>
          <MacTerminal>
            {/* Initial command */}
            <TerminalLine>
              <TypingText
                text="claude"
                startFrame={15}
                typingSpeed={3}
                color="#fff"
                showCursor={frame < 50}
              />
            </TerminalLine>

            {/* Claude Code ASCII Banner with Mascot */}
            <ClaudeMascot startFrame={45} />
            <ClaudeInfo startFrame={60} />

            {/* User prompt */}
            {frame >= SCENES.PROMPT_TYPING.start && (
              <TerminalLine prefix=">">
                <TypingText
                  text="Create a bilingual website about vibe coding with Astro"
                  startFrame={SCENES.PROMPT_TYPING.start + 10}
                  typingSpeed={1}
                  color="#fff"
                  showCursor={frame < SCENES.CLAUDE_RESPONSE.start}
                />
              </TerminalLine>
            )}

            {/* Claude response */}
            {frame >= SCENES.CLAUDE_RESPONSE.start && (
              <ClaudeResponse startFrame={SCENES.CLAUDE_RESPONSE.start}>
                <FadeInText
                  text="I'll create a bilingual Astro website with:"
                  startFrame={SCENES.CLAUDE_RESPONSE.start + 5}
                />
                <br />
                <FadeInText
                  text="✓ SEO-optimized structure"
                  startFrame={SCENES.CLAUDE_RESPONSE.start + 20}
                  color="#27ca40"
                />
                <br />
                <FadeInText
                  text="✓ Spanish & English pages"
                  startFrame={SCENES.CLAUDE_RESPONSE.start + 35}
                  color="#27ca40"
                />
                <br />
                <FadeInText
                  text="✓ Clean, minimal design"
                  startFrame={SCENES.CLAUDE_RESPONSE.start + 50}
                  color="#27ca40"
                />
                <br />
                <FadeInText
                  text="Building your project..."
                  startFrame={SCENES.CLAUDE_RESPONSE.start + 65}
                  color="#d97706"
                />
              </ClaudeResponse>
            )}
          </MacTerminal>
        </div>
      )}

      {/* Web Preview Scene */}
      {showWebPreview && <WebPreview startFrame={SCENES.WEB_PREVIEW.start} />}

      {/* CTA Scene */}
      {showCTA && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            transform: `scale(${ctaScale})`,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#fff",
              marginBottom: 20,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            Vibe Code
          </h1>
          <p
            style={{
              fontSize: 36,
              color: "rgba(255,255,255,0.9)",
              marginBottom: 40,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            your first app today
          </p>
          <div
            style={{
              backgroundColor: "#d97706",
              color: "#fff",
              padding: "20px 56px",
              borderRadius: 14,
              fontSize: 28,
              fontWeight: 600,
              fontFamily: "system-ui, -apple-system, sans-serif",
              boxShadow: "0 10px 40px rgba(217, 119, 6, 0.5)",
            }}
          >
            vibecodingclaude.com
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
