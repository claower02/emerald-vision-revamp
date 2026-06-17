import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const mono = loadMono("normal", { weights: ["500"], subsets: ["latin"] }).fontFamily;
const display = loadDisplay("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

const Tile: React.FC<{ img: string; title: string; n: string; delay: number }> = ({ img, title, n, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16 } });
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(57,255,20,0.4)',
      opacity: s,
      transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
      height: 380,
    }}>
      <Img src={staticFile(img)} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.3) contrast(1.1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.9))' }} />
      <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: mono, fontSize: 22, color: '#39FF14',
        background: 'rgba(0,0,0,0.8)', padding: '4px 10px', border: '1px solid rgba(57,255,20,0.6)' }}>
        №{n}
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24,
        fontFamily: display, fontWeight: 700, fontSize: 44, color: '#fff' }}>
        {title}
      </div>
    </div>
  );
};

export const Scene4Features: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: 70, justifyContent: 'center' }}>
      <div style={{
        fontFamily: mono, color: '#39FF14', fontSize: 28, letterSpacing: 6, marginBottom: 24,
        opacity: interpolate(frame, [0, 12], [0, 1]),
      }}>
        // 02 / КАТАЛОГ
      </div>
      <div style={{
        fontFamily: display, color: '#fff', fontSize: 88, fontWeight: 700,
        lineHeight: 0.95, marginBottom: 50,
        opacity: interpolate(frame, [4, 24], [0, 1]),
      }}>
        ПОЛНЫЙ<br/><span style={{ color: '#39FF14', textShadow: '0 0 30px #39FF14' }}>АРСЕНАЛ</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Tile img="images/rollers.jpg" title="РОЛИКИ" n="01" delay={20} />
        <Tile img="images/vulc.jpg" title="ВУЛКАНИЗАЦИЯ" n="02" delay={30} />
      </div>
      <div style={{ marginTop: 24 }}>
        <Tile img="images/engineer.jpg" title="СЕРВИС 24/7" n="03" delay={40} />
      </div>
    </AbsoluteFill>
  );
};
