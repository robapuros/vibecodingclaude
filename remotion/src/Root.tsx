import { Composition } from "remotion";
import { VibeCodeDemo } from "./VibeCodeDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VibeCodeDemo"
        component={VibeCodeDemo}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
