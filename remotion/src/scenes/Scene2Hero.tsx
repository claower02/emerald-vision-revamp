import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const mono = loadMono("normal", { weights: ["500"], subsets: ["latin"] }).fontFamily;
const display = loadDisplay("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

const Word: React.FC<{ text: string; delay: number; accent?: boolean }> = ({ text, delay, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
  const blur = interpolate(s, [0, 1], [12, 0]);
  return (
    <div style={{
      fontFamily: display, fontSize: 140, fontWeight: 700, lineHeight: 0.95,
      color: accent ? '#39FF14' : '#fff',
      textShadow: accent ? '0 0 30px #39FF14, 0 0 60px rgba(57,255,20,0.6)' : 'none',
      opacity: s,
      filter: `blur(${blur}px)`,
      transform: `translateX(${interpolate(s, [0, 1], [-40, 0])}px)`,
    }}>{text}</div>
  );
};

export const Scene2Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 120], [1.05, 1.2]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 0.45 }}>
        <Img src={staticFile('images/hero.jpg')} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transform: `scale(${zoom})`,
        }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(5,10,5,0.6), rgba(5,10,5,0.95))' }} />

      <AbsoluteFill style={{ padding: 70, justifyContent: 'center' }}>
        <div style={{
          fontFamily: mono, color: '#39FF14', fontSize: 28, letterSpacing: 6, marginBottom: 30,
          opacity: interpolate(frame, [0, 15], [0, 1]),
        }}>
          + DEMETRA // INDUSTRIAL SYSTEMS
        </div>
        <Word text="РЕМОНТ" delay={5} accent />
        <Word text="КОНВЕЙЕРНЫХ" delay={15} />
        <Word text="СИСТЕМ" delay={25} />
        <Word text="НОВОГО" delay={35} accent />
        <Word text="ПОКОЛЕНИЯ" delay={45} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
