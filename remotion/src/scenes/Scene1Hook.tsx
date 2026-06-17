import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const mono = loadMono("normal", { weights: ["500"], subsets: ["latin"] }).fontFamily;
const display = loadDisplay("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flicker = (frame % 30 < 2 || (frame > 18 && frame < 22)) ? 0.4 : 1;
  const s1 = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const s2 = spring({ frame: frame - 25, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60 }}>
      <div style={{
        fontFamily: mono, color: '#39FF14', fontSize: 32, letterSpacing: 8,
        opacity: flicker, marginBottom: 40, textShadow: '0 0 20px #39FF14',
      }}>
        // CODIX STYLE LINE
      </div>

      <div style={{
        fontFamily: display, color: '#fff', fontSize: 180, fontWeight: 700,
        lineHeight: 0.9, textAlign: 'center',
        transform: `translateY(${interpolate(s1, [0, 1], [60, 0])}px)`,
        opacity: s1,
      }}>
        CASE
      </div>
      <div style={{
        fontFamily: display, color: '#39FF14', fontSize: 180, fontWeight: 700,
        lineHeight: 0.9, textAlign: 'center',
        textShadow: '0 0 40px #39FF14, 0 0 80px rgba(57,255,20,0.5)',
        transform: `translateY(${interpolate(s2, [0, 1], [60, 0])}px)`,
        opacity: s2,
      }}>
        STUDY
      </div>

      <div style={{
        marginTop: 60, fontFamily: mono, color: '#888', fontSize: 28, letterSpacing: 4,
        opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        2026 / №01
      </div>
    </AbsoluteFill>
  );
};
