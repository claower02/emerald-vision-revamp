import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const mono = loadMono("normal", { weights: ["500", "700"], subsets: ["latin"] }).fontFamily;
const display = loadDisplay("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

const StatCard: React.FC<{ n: string; label: string; delay: number }> = ({ n, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
  return (
    <div style={{
      position: 'relative',
      border: '2px solid rgba(57,255,20,0.4)',
      background: 'rgba(57,255,20,0.05)',
      padding: '60px 40px', textAlign: 'center',
      opacity: s,
      transform: `translateY(${interpolate(s, [0, 1], [80, 0])}px) scale(${interpolate(s, [0, 1], [0.85, 1])})`,
      boxShadow: '0 0 40px rgba(57,255,20,0.2)',
    }}>
      <div style={{ position: 'absolute', top: -2, left: -2, width: 20, height: 20, borderTop: '4px solid #39FF14', borderLeft: '4px solid #39FF14' }} />
      <div style={{ position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderBottom: '4px solid #39FF14', borderRight: '4px solid #39FF14' }} />
      <div style={{
        fontFamily: mono, fontSize: 140, fontWeight: 700, color: '#39FF14',
        textShadow: '0 0 30px #39FF14, 0 0 60px rgba(57,255,20,0.5)', lineHeight: 1,
      }}>{n}</div>
      <div style={{
        fontFamily: mono, fontSize: 26, color: '#aaa', letterSpacing: 4,
        marginTop: 16, textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
};

export const Scene3Stats: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: 70, justifyContent: 'center' }}>
      <div style={{
        fontFamily: mono, color: '#39FF14', fontSize: 28, letterSpacing: 6, marginBottom: 24,
        opacity: interpolate(frame, [0, 12], [0, 1]),
      }}>
        // ПОКАЗАТЕЛИ
      </div>
      <div style={{
        fontFamily: display, color: '#fff', fontSize: 86, fontWeight: 700,
        lineHeight: 1, marginBottom: 60,
        opacity: interpolate(frame, [5, 25], [0, 1]),
        transform: `translateX(${interpolate(frame, [5, 25], [-30, 0], { extrapolateRight: 'clamp' })}px)`,
      }}>
        15 ЛЕТ <br/>НА РЫНКЕ <span style={{ color: '#39FF14' }}>KZ</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        <StatCard n="15+" label="ЛЕТ ОПЫТА" delay={20} />
        <StatCard n="500+" label="ОБЪЕКТОВ" delay={32} />
        <StatCard n="24/7" label="СЕРВИС" delay={44} />
      </div>
    </AbsoluteFill>
  );
};
