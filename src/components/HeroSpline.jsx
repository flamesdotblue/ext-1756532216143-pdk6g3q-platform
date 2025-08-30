import React from 'react';
import { Spline } from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <section className="relative w-full h-[95vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(255,0,255,0.12),transparent),radial-gradient(60%_50%_at_30%_80%,rgba(0,255,255,0.1),transparent)] pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur border border-white/10 text-xs uppercase tracking-widest text-fuchsia-200/80 shadow-[0_0_20px_rgba(255,0,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            Cosmic Diagnostics Online
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-cyan-300">Is Mercury</span>
            <span className="relative inline-block mt-2">
              <GlitchText>in retrograde?</GlitchText>
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Consult the cosmic customer support line. Reboot your aura. Clear cache. Try incense.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-white/60">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-[ping_1.5s_linear_infinite]" />
              Quantum vibes loading
            </span>
            <span className="opacity-40">•</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-300 animate-[ping_2s_linear_infinite]" />
              Sarcasm enabled
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlitchText({ children }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10 px-2 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-200 via-white to-cyan-200 drop-shadow-[0_0_25px_rgba(255,0,255,0.2)]">
        {children}
      </span>
      <span className="absolute inset-0 blur-[1px] text-fuchsia-400/80 translate-x-[1px] -translate-y-[1px] mix-blend-screen animate-[glitchX_2.4s_infinite_steps(1,_end)] select-none pointer-events-none">{children}</span>
      <span className="absolute inset-0 blur-[1px] text-cyan-400/80 -translate-x-[1px] translate-y-[0.5px] mix-blend-screen animate-[glitchY_2.1s_infinite_steps(1,_end)] select-none pointer-events-none">{children}</span>
      <style>{`
        @keyframes glitchX { 0%,100%{transform:translateX(0)} 10%{transform:translateX(1px)} 20%{transform:translateX(-1px)} 30%{transform:translateX(2px)} 40%{transform:translateX(-2px)} 50%{transform:translateX(0.5px)} 60%{transform:translateX(-0.5px)} 70%{transform:translateX(1px)} 80%{transform:translateX(-1px)} 90%{transform:translateX(0)} }
        @keyframes glitchY { 0%,100%{transform:translateY(0)} 12%{transform:translateY(-1px)} 22%{transform:translateY(1px)} 36%{transform:translateY(-0.5px)} 48%{transform:translateY(0.5px)} 66%{transform:translateY(-1px)} 78%{transform:translateY(1px)} 90%{transform:translateY(0)} }
      `}</style>
    </span>
  );
}
