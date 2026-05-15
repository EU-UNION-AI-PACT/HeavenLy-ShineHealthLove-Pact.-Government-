"use client";

import { useEffect, useRef, useState } from "react";

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  color: string;
  radius: number;
  type: "core" | "admin" | "portal" | "api" | "alliance";
  pulse?: boolean;
}

interface Edge {
  from: string;
  to: string;
  color: string;
  label?: string;
  dashed?: boolean;
}

const NODES: Node[] = [
  // ── Core ──
  { id: "landing",   x: 0.50, y: 0.05, label: "Landing Page",      sublabel: "/",                    color: "#d4af37", radius: 22, type: "core",    pulse: true },

  // ── Admin zone ──
  { id: "admin",     x: 0.12, y: 0.22, label: "Super Admin",        sublabel: "/admin",               color: "#7c3aed", radius: 20, type: "admin" },
  { id: "giessfast", x: 0.05, y: 0.40, label: "Gießfass",           sublabel: "/admin/giessfast",     color: "#7c3aed", radius: 15, type: "admin" },
  { id: "resonanz",  x: 0.05, y: 0.55, label: "Resonanz-Bilanz",    sublabel: "/admin/resonanz",      color: "#7c3aed", radius: 15, type: "admin" },
  { id: "jschutz",   x: 0.12, y: 0.68, label: "Junior-Schutz",      sublabel: "/admin/junior-safety", color: "#00bcd4", radius: 15, type: "admin" },
  { id: "mentors",   x: 0.20, y: 0.75, label: "Mentor-Vetting",     sublabel: "/admin/mentors",       color: "#00bcd4", radius: 15, type: "admin" },
  { id: "tenant",    x: 0.22, y: 0.38, label: "Tenant Admin",        sublabel: "/admin/tenant/[slug]", color: "#7c3aed", radius: 16, type: "admin" },

  // ── Portal zone ──
  { id: "portal",    x: 0.88, y: 0.22, label: "Pilger Portal",       sublabel: "/portal",             color: "#4caf7d", radius: 20, type: "portal" },
  { id: "petition",  x: 0.95, y: 0.38, label: "Fürbitte",            sublabel: "/portal/petition",    color: "#4caf7d", radius: 14, type: "portal" },
  { id: "news",      x: 0.95, y: 0.52, label: "Resonanz-Feed",       sublabel: "/portal/news",        color: "#4caf7d", radius: 14, type: "portal" },
  { id: "guardian",  x: 0.85, y: 0.62, label: "Eltern-Passage",      sublabel: "/portal/guardian",    color: "#e67e22", radius: 18, type: "portal" },
  { id: "orbit",     x: 0.78, y: 0.74, label: "Family Orbit",        sublabel: "/guardian/family-orbit", color: "#e67e22", radius: 12, type: "portal" },
  { id: "transition",x: 0.90, y: 0.74, label: "Age-Transition",      sublabel: "/guardian/transition",color: "#e67e22", radius: 12, type: "portal" },
  { id: "junior",    x: 0.68, y: 0.82, label: "Junior Mesh",         sublabel: "/portal/junior",      color: "#64b4ff", radius: 16, type: "portal", pulse: true },

  // ── Centre: Auth + DB ──
  { id: "auth",      x: 0.50, y: 0.35, label: "Auth / JWT",          sublabel: "NextAuth v5",         color: "#d4af37", radius: 18, type: "core" },
  { id: "db",        x: 0.50, y: 0.55, label: "Prisma / PostgreSQL",  sublabel: "12 Models",           color: "#d4af37", radius: 20, type: "core", pulse: true },
  { id: "proxy",     x: 0.50, y: 0.20, label: "Proxy Guards",         sublabel: "src/proxy.ts",        color: "#d4af37", radius: 14, type: "core" },

  // ── APIs ──
  { id: "api_seed",     x: 0.35, y: 0.80, label: "Seed API",         sublabel: "/api/seed",           color: "#f0d060", radius: 11, type: "api" },
  { id: "api_cron",     x: 0.42, y: 0.88, label: "Cron Resonanz",    sublabel: "/api/cron/resonanz",  color: "#f0d060", radius: 11, type: "api" },
  { id: "api_vac",      x: 0.58, y: 0.88, label: "Vacancies API",    sublabel: "/api/vacancies",      color: "#f0d060", radius: 11, type: "api" },
  { id: "api_news",     x: 0.65, y: 0.80, label: "News API",         sublabel: "/api/news",           color: "#f0d060", radius: 11, type: "api" },
  { id: "email",        x: 0.34, y: 0.65, label: "Resend Email",     sublabel: "Parent Relay Only",   color: "#e67e22", radius: 13, type: "api" },

  // ── Alliance nodes (top arc) ──
  { id: "id_eu",  x: 0.22, y: 0.10, label: "ID-EU",  sublabel: "EU-Union",        color: "#00bcd4", radius: 12, type: "alliance" },
  { id: "id_un",  x: 0.34, y: 0.06, label: "ID-UN",  sublabel: "United Nations",  color: "#00bcd4", radius: 12, type: "alliance" },
  { id: "id_us",  x: 0.50, y: 0.00, label: "ID-US",  sublabel: "USA",             color: "#00bcd4", radius: 12, type: "alliance" },
  { id: "id_ch",  x: 0.66, y: 0.06, label: "ID-CH",  sublabel: "Switzerland",     color: "#00bcd4", radius: 12, type: "alliance" },
  { id: "id_ie",  x: 0.78, y: 0.10, label: "ID-IE",  sublabel: "Ireland",         color: "#00bcd4", radius: 12, type: "alliance" },
];

const EDGES: Edge[] = [
  // Landing → proxy → auth
  { from: "landing",    to: "proxy",      color: "rgba(212,175,55,0.5)" },
  { from: "proxy",      to: "auth",       color: "rgba(212,175,55,0.4)" },
  { from: "proxy",      to: "admin",      color: "rgba(124,58,237,0.4)" },
  { from: "proxy",      to: "portal",     color: "rgba(76,175,125,0.4)" },

  // Auth ↔ DB
  { from: "auth",       to: "db",         color: "rgba(212,175,55,0.5)" },

  // Admin subtree
  { from: "admin",      to: "giessfast",  color: "rgba(124,58,237,0.35)" },
  { from: "admin",      to: "resonanz",   color: "rgba(124,58,237,0.35)" },
  { from: "admin",      to: "jschutz",    color: "rgba(0,188,212,0.35)" },
  { from: "admin",      to: "mentors",    color: "rgba(0,188,212,0.35)" },
  { from: "admin",      to: "tenant",     color: "rgba(124,58,237,0.35)" },

  // Portal subtree
  { from: "portal",     to: "petition",   color: "rgba(76,175,125,0.35)" },
  { from: "portal",     to: "news",       color: "rgba(76,175,125,0.35)" },
  { from: "portal",     to: "guardian",   color: "rgba(230,126,34,0.5)" },
  { from: "guardian",   to: "orbit",      color: "rgba(230,126,34,0.35)" },
  { from: "guardian",   to: "transition", color: "rgba(230,126,34,0.35)" },
  { from: "guardian",   to: "junior",     color: "rgba(100,180,255,0.5)" },

  // DB connections
  { from: "db",         to: "petition",   color: "rgba(212,175,55,0.2)", dashed: true },
  { from: "db",         to: "resonanz",   color: "rgba(212,175,55,0.2)", dashed: true },
  { from: "db",         to: "jschutz",    color: "rgba(212,175,55,0.2)", dashed: true },
  { from: "db",         to: "api_vac",    color: "rgba(212,175,55,0.2)", dashed: true },
  { from: "db",         to: "api_news",   color: "rgba(212,175,55,0.2)", dashed: true },

  // APIs
  { from: "api_seed",   to: "db",         color: "rgba(240,208,96,0.3)", dashed: true },
  { from: "api_cron",   to: "resonanz",   color: "rgba(240,208,96,0.3)", dashed: true },
  { from: "api_vac",    to: "email",      color: "rgba(230,126,34,0.4)" },
  { from: "api_news",   to: "news",       color: "rgba(76,175,125,0.3)", dashed: true },
  { from: "email",      to: "guardian",   color: "rgba(230,126,34,0.5)", label: "parent only" },

  // Alliance → landing
  { from: "id_eu",  to: "landing",   color: "rgba(0,188,212,0.25)", dashed: true },
  { from: "id_un",  to: "landing",   color: "rgba(0,188,212,0.25)", dashed: true },
  { from: "id_us",  to: "landing",   color: "rgba(0,188,212,0.25)", dashed: true },
  { from: "id_ch",  to: "landing",   color: "rgba(0,188,212,0.25)", dashed: true },
  { from: "id_ie",  to: "landing",   color: "rgba(0,188,212,0.25)", dashed: true },
];

function getXY(node: Node, W: number, H: number) {
  return { x: node.x * W, y: node.y * H };
}

export default function SystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<Node | null>(null);
  const [dims, setDims] = useState({ w: 900, h: 620 });

  useEffect(() => {
    function resize() {
      const el = canvasRef.current?.parentElement;
      if (el) setDims({ w: el.clientWidth, h: Math.max(520, el.clientWidth * 0.68) });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w: W, h: H } = dims;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    const t = tick * 0.03;

    // ── Background subtle radial ──
    const bg = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.65);
    bg.addColorStop(0, "rgba(212,175,55,0.03)");
    bg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // ── Draw edges ──
    for (const edge of EDGES) {
      const from = NODES.find((n) => n.id === edge.from);
      const to   = NODES.find((n) => n.id === edge.to);
      if (!from || !to) continue;
      const f = getXY(from, W, H);
      const t2 = getXY(to, W, H);
      ctx.beginPath();
      if (edge.dashed) ctx.setLineDash([4, 6]);
      else              ctx.setLineDash([]);
      const mx = (f.x + t2.x) / 2 + Math.sin(t + from.x * 10) * 10;
      const my = (f.y + t2.y) / 2 + Math.cos(t + to.y * 10) * 10;
      ctx.moveTo(f.x, f.y);
      ctx.quadraticCurveTo(mx, my, t2.x, t2.y);
      ctx.strokeStyle = edge.color;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // animated packet along edge
      const progress = (t * 0.4 + from.x + to.y) % 1;
      const px = Math.pow(1 - progress, 2) * f.x + 2 * (1 - progress) * progress * mx + Math.pow(progress, 2) * t2.x;
      const py = Math.pow(1 - progress, 2) * f.y + 2 * (1 - progress) * progress * my + Math.pow(progress, 2) * t2.y;
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = edge.color.replace("0.", "0.9");
      ctx.fill();
    }

    // ── Draw nodes ──
    for (const node of NODES) {
      const { x, y } = getXY(node, W, H);
      const isHov = hovered?.id === node.id;
      const pulseR = node.pulse
        ? node.radius + Math.sin(t * 2 + node.x * 5) * 4
        : node.radius;
      const r = isHov ? pulseR + 4 : pulseR;

      // glow halo
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      glow.addColorStop(0, hexToRgba(node.color, 0.15));
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // node body
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = isHov ? node.color : `${node.color}33`;
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isHov ? 2 : 1;
      ctx.fill();
      ctx.stroke();

      // label
      ctx.fillStyle = isHov ? "#0a0c10" : node.color;
      ctx.font = isHov
        ? `bold ${Math.max(9, r * 0.52)}px 'Cinzel', serif`
        : `${Math.max(8, r * 0.45)}px 'Cinzel', serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const label = node.label.length > 12 ? node.label.substring(0, 11) + "…" : node.label;
      ctx.fillText(label, x, y - 1);

      // sublabel below node
      if (!isHov) {
        ctx.fillStyle = "rgba(212,175,55,0.35)";
        ctx.font = `${Math.max(6, r * 0.35)}px monospace`;
        ctx.fillText(node.sublabel ?? "", x, y + r + 10);
      }
    }

    // ── Hovered tooltip ──
    if (hovered) {
      const { x, y } = getXY(hovered, W, H);
      const tw = 160; const th = 48;
      const tx = Math.min(x - tw / 2, W - tw - 10);
      const ty = y + hovered.radius + 14;
      ctx.fillStyle = "rgba(10,12,16,0.92)";
      ctx.strokeStyle = hovered.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(tx, ty, tw, th, 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = hovered.color;
      ctx.font = "bold 9px 'Cinzel', serif";
      ctx.textAlign = "left";
      ctx.fillText(hovered.label, tx + 10, ty + 16);
      ctx.fillStyle = "rgba(212,175,55,0.5)";
      ctx.font = "8px monospace";
      ctx.fillText(hovered.sublabel ?? "", tx + 10, ty + 34);
    }
  }, [tick, hovered, dims]);

  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (dims.w / rect.width);
    const my = (e.clientY - rect.top)  * (dims.h / rect.height);
    const found = NODES.find((n) => {
      const { x, y } = getXY(n, dims.w, dims.h);
      return Math.hypot(mx - x, my - y) < n.radius + 8;
    });
    setHovered(found ?? null);
  }

  return (
    <canvas
      ref={canvasRef}
      width={dims.w}
      height={dims.h}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setHovered(null)}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        cursor: hovered ? "pointer" : "default",
        background: "transparent",
      }}
    />
  );
}
