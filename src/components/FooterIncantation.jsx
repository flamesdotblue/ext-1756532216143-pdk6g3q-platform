import React from 'react';

export default function FooterIncantation() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/80">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,0,255,0.12),transparent)]" />
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-sm text-white/60">
          Whispered by starlight, delivered with side-eye. Made with crystals and Ctrl+Z.
        </p>
        <p className="mt-2 text-xs text-white/40">This site is for vibes, jokes, and maybe one existential crisis. Consult an actual ephemeris for precision.</p>
      </div>
    </footer>
  );
}
