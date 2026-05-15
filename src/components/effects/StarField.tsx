"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  r: number; speed: number;
  opacity: number; pulse: number;
  color: string;
}

const COLORS = [
  "212,175,55",   // gold
  "212,175,55",   // gold (2x weight)
  "249,241,215",  // cream
  "0,188,212",    // cyan-UN
  "212,175,55",   // gold (3x weight)
];

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function buildStars() {
      if (!canvas) return;
      const count = Math.floor((canvas.width * canvas.height) / 6000);
      stars = Array.from({ length: count }, () => ({
        x:       Math.random() * canvas!.width,
        y:       Math.random() * canvas!.height,
        r:       Math.random() * 1.2 + 0.2,
        speed:   Math.random() * 0.08 + 0.01,
        opacity: Math.random() * 0.6 + 0.1,
        pulse:   Math.random() * Math.PI * 2,
        color:   COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }

    let t = 0;
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;

      for (const s of stars) {
        s.pulse += s.speed * 0.5;
        const alpha = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.fill();

        // slow drift upward
        s.y -= s.speed * 0.3;
        if (s.y < -2) s.y = canvas.height + 2;
      }

      // subtle center nebula
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const nebula = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(canvas.width, canvas.height) * 0.55);
      nebula.addColorStop(0, `rgba(212,175,55,${0.025 + 0.01 * Math.sin(t)})`);
      nebula.addColorStop(0.5, `rgba(212,175,55,${0.01 + 0.005 * Math.sin(t + 1)})`);
      nebula.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    }

    resize();
    buildStars();
    draw();

    const onResize = () => { resize(); buildStars(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.9,
      }}
      aria-hidden
    />
  );
}
