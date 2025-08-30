import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Zap } from 'lucide-react';

export default function RetrogradeStatus() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRetro, setIsRetro] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const t = setTimeout(() => {
      fetch('https://mercuryretrogradeapi.com/')
        .then((r) => r.json())
        .then((json) => {
          if (!isMounted) return;
          setIsRetro(Boolean(json?.is_retrograde));
          setData(json);
          setLoading(false);
        })
        .catch((e) => {
          if (!isMounted) return;
          setError(e);
          setLoading(false);
        });
    }, 600); // just enough delay for the cosmic spinner to flex

    return () => {
      isMounted = false;
      clearTimeout(t);
    };
  }, []);

  const answer = isRetro ? 'Yes' : 'No';
  const vibeColor = isRetro ? 'from-fuchsia-500 to-cyan-400' : 'from-emerald-400 to-cyan-300';

  const spells = useMemo(() => {
    if (isRetro) return [
      'Back up your brain and your phone',
      'Type slowly. Slower. Slower...',
      'Offer three tabs of incense to the browser gods',
      'Send voice notes like lunar postcards',
    ];
    return [
      'Ship boldly, mortal',
      'Sign it, seal it, send it (no ravens required)',
      'Buy the ticket, board the star bus',
      'Rename files without fear (for now)',
    ];
  }, [isRetro]);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-black via-[#0a0010] to-black">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(40%_30%_at_70%_20%,rgba(255,0,255,0.2),transparent),radial-gradient(40%_30%_at_20%_80%,rgba(0,255,255,0.2),transparent)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <CosmicSpinner loading={loading} error={error} />

          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                key={answer}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 100, damping: 14 }}
                className="mt-6"
              >
                <h2 className="text-6xl md:text-7xl font-black tracking-tight">
                  <span className={`inline-block px-6 py-2 rounded-[2.5rem] bg-clip-text text-transparent bg-gradient-to-r ${vibeColor} drop-shadow-[0_0_32px_rgba(255,0,255,0.25)]`}>
                    {answer}
                  </span>
                </h2>
                <p className="mt-4 text-white/60">
                  {isRetro ? 'Mercury is moonwalking through your messages.' : 'Mercury is behaving. Pretend it will last.'}
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {spells.map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4"
                    >
                      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_90deg,rgba(255,0,255,0.18),rgba(0,255,255,0.18),transparent_60%)] blur-xl" />
                      <div className="relative z-10 flex items-start gap-3">
                        <BadgeIcon retro={isRetro} />
                        <div>
                          <p className="text-sm text-white/80 leading-relaxed">{s}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {data && (
                  <div className="mt-8 text-xs text-white/40">
                    <span className="uppercase tracking-widest">Source</span>: mercuryretrogradeapi.com • planet status cached by vibes
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CosmicSpinner({ loading, error }) {
  if (!loading) return null;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-2 border-fuchsia-400/30 animate-[spin_6s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-2 border-cyan-400/30 animate-[spin_4s_linear_infinite_reverse]" />
        <div className="absolute inset-6 rounded-full border-2 border-white/30 animate-[spin_3s_linear_infinite]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
      </div>
      <p className="mt-4 text-sm text-white/60">Consulting cosmic IT support…</p>
      {error && <p className="text-xs text-red-300/70">The stars are buffering. Try incense and refresh.</p>}
    </div>
  );
}

function BadgeIcon({ retro }) {
  return retro ? (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/30 text-fuchsia-200">
      <Sparkles size={16} />
    </div>
  ) : (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200">
      <Star size={16} />
    </div>
  );
}
