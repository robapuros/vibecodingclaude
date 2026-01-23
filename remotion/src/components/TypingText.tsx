import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface TypingTextProps {
  text: string;
  startFrame: number;
  typingSpeed?: number; // frames per character
  color?: string;
  showCursor?: boolean;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  startFrame,
  typingSpeed = 2,
  color = "#e0e0e0",
  showCursor = true,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  const charactersToShow = Math.floor(relativeFrame / typingSpeed);
  const displayedText = text.slice(0, charactersToShow);
  const isTyping = charactersToShow < text.length && frame >= startFrame;
  const isComplete = charactersToShow >= text.length;

  // Cursor blink every 15 frames
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  return (
    <span style={{ color }}>
      {displayedText}
      {showCursor && (isTyping || (isComplete && cursorVisible)) && (
        <span
          style={{
            backgroundColor: color,
            width: "0.6em",
            height: "1.2em",
            display: "inline-block",
            marginLeft: 2,
            animation: isComplete ? undefined : "none",
          }}
        />
      )}
    </span>
  );
};

interface FadeInTextProps {
  text: string;
  startFrame: number;
  duration?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const FadeInText: React.FC<FadeInTextProps> = ({
  text,
  startFrame,
  duration = 15,
  color = "#e0e0e0",
  style = {},
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <span style={{ color, opacity, ...style }}>
      {text}
    </span>
  );
};
