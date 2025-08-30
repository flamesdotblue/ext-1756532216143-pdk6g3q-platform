import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function ConstellationField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const DPR = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);

    function resize() {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
    }

    const stars = Array.from({ length: 140 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
      tw: Math.random() * 0.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.0006,
      dy: (Math.random() - 0.5) * 0.0006,
    }));

    function draw() {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      // faint space fog
      const g = ctx.createRadialGradient(w*0.7, h*0.2, 0, w*0.7, h*0.2, Math.max(w,h)*0.8);
      g.addColorStop(0, 'rgba(255,0,255,0.05)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      // stars
      for (let s of stars) {
        s.x += s.dx; s.y += s.dy;
        if (s.x < -0.05) s.x = 1.05; if (s.x > 1.05) s.x = -0.05;
        if (s.y < -0.05) s.y = 1.05; if (s.y > 1.05) s.y = -0.05;
        const x = s.x * w; const y = s.y * h; const r = (s.z * 1.6 + Math.sin(perfNow()*0.002 + x+y)*0.3) * DPR;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.4, r), 0, Math.PI*2);
        ctx.fillStyle = `rgba(${200 + s.z*55}, ${200 - s.z*80}, 255, ${0.4 + 0.5*s.tw})`;
        ctx.fill();
      }

      // connect some stars
      ctx.lineWidth = 0.8 * DPR;
      for (let i=0;i<stars.length;i+=3) {
        const a = stars[i], b = stars[(i+7)%stars.length];
        const x1=a.x*w, y1=a.y*h, x2=b.x*w, y2=b.y*h;
        const dist = Math.hypot(x1-x2, y1-y2);
        if (dist < Math.min(w,h)*0.2) {
          ctx.strokeStyle = 'rgba(180,220,255,0.12)';
          ctx.beginPath();
          ctx.moveTo(x1,y1);
          ctx.lineTo(x2,y2);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function perfNow(){ return (typeof performance!=='undefined'?performance.now():Date.now()); }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative py-24 md:py-28 border-t border-white/10">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">
            Your cosmic weather widget is a little too honest
          </h3>
          <p className="mt-3 text-white/70">
            We triangulate vibes using patented astral-fiber technology: part data, part divination, all drama.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-white/60">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Zap size={14} className="text-fuchsia-300" /> Vibe-certified
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" /> Constellations jittering
            </span>
          </div>
        </div>
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-x-6 bottom-6 p-4 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-white/10 backdrop-blur"
          >
            <p className="text-sm text-white/80">If the universe had a loading bar, this would be it.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
