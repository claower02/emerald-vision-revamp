import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const mono = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily;
const display = loadDisplay("normal", { weights: ["300", "700"], subsets: ["latin"] }).fontFamily;

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s1 = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const s2 = spring({ frame: frame - 20, fps, config: { damping: 18 } });
  const lineW = interpolate(frame, [10, 40], [0, 100], { extrapolateRight: 'clamp' });
  const pulse = 1 + Math.sin(frame / 8) * 0.04;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60 }}>
      <div style={{
        fontFamily: mono, color: '#39FF14', fontSize: 28, letterSpacing: 8,
        opacity: interpolate(frame, [0, 15], [0, 1]),
        marginBottom: 50,
      }}>
        DESIGNED & BUILT BY
      </div>

      <div style={{
        fontFamily: display, fontWeight: 700, fontSize: 130, color: '#fff', lineHeight: 1,
        textAlign: 'center', letterSpacing: -2,
        opacity: s1,
        transform: `scale(${interpolate(s1, [0, 1], [0.8, 1])})`,
      }}>
        CODIX
      </div>
      <div style={{
        fontFamily: display, fontWeight: 700, fontSize: 130, lineHeight: 1,
        color: '#39FF14', textShadow: '0 0 40px #39FF14, 0 0 100px rgba(57,255,20,0.5)',
        textAlign: 'center', letterSpacing: -2,
        transform: `scale(${pulse})`,
        opacity: s2,
      }}>
        STYLE LINE
      </div>

      <div style={{
        width: `${lineW}%`, height: 3, background: '#39FF14', marginTop: 40,
        boxShadow: '0 0 20px #39FF14', maxWidth: 600,
      }} />

      <div style={{
        fontFamily: mono, color: '#aaa', fontSize: 32, letterSpacing: 6, marginTop: 40,
        opacity: interpolate(frame, [35, 55], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        design studio
      </div>

      <div style={{
        marginTop: 100, padding: '24px 60px',
        border: '2px solid #39FF14', background: 'rgba(57,255,20,0.08)',
        fontFamily: mono, color: '#39FF14', fontSize: 30, letterSpacing: 4, fontWeight: 500,
        boxShadow: '0 0 40px rgba(57,255,20,0.4)',
        opacity: interpolate(frame, [55, 75], [0, 1], { extrapolateRight: 'clamp' }),
        transform: `translateY(${interpolate(frame, [55, 75], [30, 0], { extrapolateRight: 'clamp' })}px)`,
      }}>
        ЗАКАЖИ САЙТ → DM
      </div>
    </AbsoluteFill>
  );
};
