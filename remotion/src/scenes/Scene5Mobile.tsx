import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const mono = loadMono("normal", { weights: ["500"], subsets: ["latin"] }).fontFamily;
const display = loadDisplay("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

export const Scene5Mobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const float = Math.sin(frame / 18) * 12;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 50 }}>
      <div style={{
        fontFamily: mono, color: '#39FF14', fontSize: 26, letterSpacing: 6,
        opacity: interpolate(frame, [0, 12], [0, 1]),
        position: 'absolute', top: 120,
      }}>
        // RESPONSIVE / MOBILE READY
      </div>
      <div style={{
        fontFamily: display, color: '#fff', fontSize: 80, fontWeight: 700,
        textAlign: 'center', position: 'absolute', top: 180, lineHeight: 0.95,
        opacity: interpolate(frame, [6, 22], [0, 1]),
      }}>
        ВЕЗДЕ <span style={{ color: '#39FF14' }}>ИДЕАЛЬНО</span>
      </div>

      {/* Phone mockup */}
      <div style={{
        width: 480, height: 980, borderRadius: 60, padding: 16,
        background: 'linear-gradient(145deg, #222, #050505)',
        border: '2px solid rgba(57,255,20,0.4)',
        boxShadow: '0 0 80px rgba(57,255,20,0.4), 0 30px 60px rgba(0,0,0,0.8)',
        transform: `translateY(${interpolate(s, [0, 1], [120, float])}px) rotate(${interpolate(s, [0, 1], [10, -3])}deg)`,
        opacity: s,
        marginTop: 80,
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 46, overflow: 'hidden', background: '#050a05', position: 'relative' }}>
          <Img src={staticFile('images/hero.jpg')} style={{ width: '100%', height: '60%', objectFit: 'cover', opacity: 0.5 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,10,5,0.3), rgba(5,10,5,1) 70%)' }} />
          <div style={{ position: 'absolute', inset: 0, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ fontFamily: mono, color: '#39FF14', fontSize: 14, letterSpacing: 3, marginBottom: 12 }}>
              // DEMETRA
            </div>
            <div style={{ fontFamily: display, color: '#fff', fontSize: 50, fontWeight: 700, lineHeight: 1 }}>
              РЕМОНТ <span style={{ color: '#39FF14', textShadow: '0 0 20px #39FF14' }}>КОНВЕЙЕРОВ</span>
            </div>
            <div style={{ marginTop: 24, padding: '16px 24px', background: '#39FF14', color: '#000',
              fontFamily: mono, fontWeight: 700, fontSize: 18, letterSpacing: 2, textAlign: 'center',
              boxShadow: '0 0 30px #39FF14' }}>
              ОСТАВИТЬ ЗАЯВКУ →
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
