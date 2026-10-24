import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

interface FogPuff {
  x: number;
  y: number;
  radius: number;
  vx: number;
  alpha: number;
}

export const FogCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 35 : 85;
    const fogCount = isMobile ? 6 : 14;

    // Supernatural dust motes
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isCrimson = Math.random() < 0.15; // 15% are sinister red motes
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.1, // slowly float upwards
        alpha: Math.random() * 0.6 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.2,
        color: isCrimson ? '255, 24, 56' : '199, 196, 213',
      });
    }

    // Drifting volumetric fog puffs
    const fogs: FogPuff[] = [];
    for (let i = 0; i < fogCount; i++) {
      fogs.push({
        x: Math.random() * width,
        y: height * 0.4 + Math.random() * (height * 0.6), // stay lower half
        radius: Math.random() * 250 + 150,
        vx: (Math.random() - 0.4) * 0.25,
        alpha: Math.random() * 0.045 + 0.015,
      });
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting fog puffs
      fogs.forEach(f => {
        f.x += f.vx;
        if (f.x - f.radius > width) f.x = -f.radius;
        if (f.x + f.radius < -100) f.x = width + f.radius;

        const grad = ctx.createRadialGradient(f.x, f.y, 10, f.x, f.y, f.radius);
        grad.addColorStop(0, `rgba(74, 23, 109, ${f.alpha * 1.3})`);
        grad.addColorStop(0.5, `rgba(11, 10, 16, ${f.alpha})`);
        grad.addColorStop(1, 'rgba(5, 5, 7, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render supernatural motes
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full opacity-70"
    />
  );
};
