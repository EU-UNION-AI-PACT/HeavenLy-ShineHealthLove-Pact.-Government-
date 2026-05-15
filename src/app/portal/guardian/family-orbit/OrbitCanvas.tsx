"use client";

import { useEffect, useRef, useState } from "react";

export default function OrbitCanvas({ parentName }: { parentName: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const t = tick * 0.008;

    ctx.clearRect(0, 0, W, H);

    // ── Outer protection ring (pulsing) ──
    const ringR = Math.min(W, H) * 0.38;
    const ringPulse = ringR + Math.sin(t * 1.5) * 6;
    ctx.beginPath();
    ctx.arc(cx, cy, ringPulse, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(76,175,125,${0.08 + Math.sin(t) * 0.03})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ── Inner connection line between the two parent nodes ──
    const offsetX = Math.min(W, H) * 0.22;
    const p1x = cx - offsetX;
    const p2x = cx + offsetX;
    const py = cy;
    ctx.beginPath();
    ctx.moveTo(p1x, py);
    ctx.lineTo(p2x, py);
    ctx.strokeStyle = "rgba(212,175,55,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // ── Central shield glow ──
    const shieldR = 30 + Math.sin(t * 2) * 4;
    const gShield = ctx.createRadialGradient(cx, cy, 0, cx, cy, shieldR);
    gShield.addColorStop(0, "rgba(76,175,125,0.15)");
    gShield.addColorStop(1, "rgba(76,175,125,0)");
    ctx.beginPath();
    ctx.arc(cx, cy, shieldR, 0, Math.PI * 2);
    ctx.fillStyle = gShield;
    ctx.fill();
    ctx.fillStyle = "rgba(76,175,125,0.6)";
    ctx.font = "14px serif";
    ctx.textAlign = "center";
    ctx.fillText("🛡", cx, cy + 5);

    // ── Parent node 1 (angemeldete Person) ──
    const r1 = 14 + Math.sin(t * 2.5) * 2;
    const g1 = ctx.createRadialGradient(p1x, py, 0, p1x, py, r1 * 2);
    g1.addColorStop(0, "rgba(212,175,55,0.8)");
    g1.addColorStop(1, "rgba(212,175,55,0)");
    ctx.beginPath();
    ctx.arc(p1x, py, r1 * 1.8, 0, Math.PI * 2);
    ctx.fillStyle = g1;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p1x, py, r1 * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = "#d4af37";
    ctx.fill();
    ctx.fillStyle = "rgba(249,241,215,0.85)";
    ctx.font = "10px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.fillText(parentName, p1x, py + r1 + 18);

    // ── Parent node 2 (Partner — noch nicht verknüpft, gepunktet) ──
    const r2 = 14 + Math.sin(t * 2.5 + 1.5) * 2;
    ctx.beginPath();
    ctx.arc(p2x, py, r2 * 0.6, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(230,126,34,0.5)";
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(249,241,215,0.4)";
    ctx.font = "10px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.fillText("Partner/in", p2x, py + r2 + 18);

  }, [tick, parentName]);

  return (
    <div className="flex justify-center mb-10">
      <canvas
        ref={canvasRef}
        width={480}
        height={320}
        className="w-full"
        style={{
          maxWidth: 480,
          background: "rgba(255,255,255,0.01)",
          border: "1px solid rgba(212,175,55,0.2)",
        }}
      />
    </div>
  );
}
