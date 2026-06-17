import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Hero } from "./scenes/Scene2Hero";
import { Scene3Stats } from "./scenes/Scene3Stats";
import { Scene4Features } from "./scenes/Scene4Features";
import { Scene5Mobile } from "./scenes/Scene5Mobile";
import { Scene6Outro } from "./scenes/Scene6Outro";

const Grid: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 0.6) % 80;
  return (
    <AbsoluteFill style={{
      backgroundImage: `linear-gradient(rgba(57,255,20,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.06) 1px, transparent 1px)`,
      backgroundSize: '80px 80px',
      backgroundPosition: `${shift}px ${shift}px`,
    }} />
  );
};

const ScanBeam: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const y = ((frame * 14) % (height + 200)) - 100;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, top: y, height: 3,
        background: 'linear-gradient(90deg, transparent, #39FF14, transparent)',
        boxShadow: '0 0 20px #39FF14, 0 0 60px #39FF14',
        opacity: 0.7,
      }} />
    </AbsoluteFill>
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill style={{
    background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
    pointerEvents: 'none',
  }} />
);

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050a05', fontFamily: 'sans-serif' }}>
      {/* Persistent background layers */}
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(57,255,20,0.18), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(57,255,20,0.10), transparent 70%)',
      }} />
      <Grid />
      <ScanBeam />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={75}><Scene1Hook /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />

        <TransitionSeries.Sequence durationInFrames={120}><Scene2Hero /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />

        <TransitionSeries.Sequence durationInFrames={110}><Scene3Stats /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: 'from-bottom-right' })} timing={linearTiming({ durationInFrames: 18 })} />

        <TransitionSeries.Sequence durationInFrames={130}><Scene4Features /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />

        <TransitionSeries.Sequence durationInFrames={110}><Scene5Mobile /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />

        <TransitionSeries.Sequence durationInFrames={130}><Scene6Outro /></TransitionSeries.Sequence>
      </TransitionSeries>

      <Vignette />
    </AbsoluteFill>
  );
};
