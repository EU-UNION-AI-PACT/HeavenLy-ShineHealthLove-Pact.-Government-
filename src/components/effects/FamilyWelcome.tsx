"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  onClose: () => void;
}

export default function FamilyWelcome({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(true);
  const [visible, setVisible] = useState(false);

  // ── Entrance animation ──
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  // ── Confetti engine ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "#d4af37", "#4caf7d", "#00bcd4", "#e67e22", "#7c3aed",
      "#f9f1d7", "#a78bfa", "#34d399", "#fbbf24",
    ];

    type Piece = {
      x: number; y: number;
      w: number; h: number;
      color: string;
      vx: number; vy: number;
      rot: number; vrot: number;
      shape: "rect" | "circle";
    };

    const pieces: Piece[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 3.5 + 1.5,
      rot: Math.random() * 360,
      vrot: Math.random() * 5 - 2.5,
      shape: Math.random() > 0.4 ? "rect" : "circle",
    }));

    const draw = () => {
      if (!runningRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.vrot;
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleClose = useCallback(() => {
    runningRef.current = false;
    cancelAnimationFrame(rafRef.current);
    setVisible(false);
    setTimeout(onClose, 400);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10,12,16,0.88)",
        backdropFilter: "blur(16px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
      onClick={handleClose}
    >
      {/* Konfetti-Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      {/* Popup-Fenster */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 540,
          width: "90%",
          background: "linear-gradient(145deg, rgba(16,18,28,0.98) 0%, rgba(10,12,16,0.99) 100%)",
          border: "1px solid rgba(212,175,55,0.4)",
          borderTop: "2px solid #d4af37",
          padding: "2.5rem 2rem",
          textAlign: "center",
          boxShadow: "0 0 60px rgba(212,175,55,0.12), 0 30px 60px rgba(0,0,0,0.6)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.88) translateY(20px)",
          transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {/* Decorative corners */}
        {[
          { top: "1rem", left: "1rem", borderTop: "1px solid rgba(212,175,55,0.5)", borderLeft: "1px solid rgba(212,175,55,0.5)" },
          { top: "1rem", right: "1rem", borderTop: "1px solid rgba(212,175,55,0.5)", borderRight: "1px solid rgba(212,175,55,0.5)" },
          { bottom: "1rem", left: "1rem", borderBottom: "1px solid rgba(212,175,55,0.5)", borderLeft: "1px solid rgba(212,175,55,0.5)" },
          { bottom: "1rem", right: "1rem", borderBottom: "1px solid rgba(212,175,55,0.5)", borderRight: "1px solid rgba(212,175,55,0.5)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 24, height: 24, ...s }} />
        ))}

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-ceremonial)",
          fontSize: "0.5rem",
          letterSpacing: "4px",
          color: "rgba(212,175,55,0.5)",
          marginBottom: "1.25rem",
        }}>
          ✦ &nbsp; HERZLICH WILLKOMMEN &nbsp; ✦
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: "var(--font-ceremonial)",
          fontSize: "clamp(1.3rem, 4vw, 2rem)",
          letterSpacing: "0.06em",
          color: "#d4af37",
          textShadow: "0 0 30px rgba(212,175,55,0.4)",
          marginBottom: "1.25rem",
          lineHeight: 1.2,
        }}>
          Wir sind zutiefst gerührt
        </h2>

        {/* Body */}
        <p style={{
          fontFamily: "var(--font-body, serif)",
          fontSize: "1rem",
          color: "rgba(249,241,215,0.7)",
          lineHeight: 1.85,
          marginBottom: "1.5rem",
        }}>
          Dass Sie sich als Familie — als Elternteil — für unser Projekt
          entscheiden und intelligent Verantwortung für das Wichtigste übernehmen:{" "}
          <strong style={{ color: "#f9f1d7" }}>die Zukunft unserer Kinder.</strong>
          <br /><br />
          Ihre Registrierungs-ID hat diese Entscheidung sicher und diskret im System
          verankert. Das Wish-Portal und alle textlichen Kontexte integrieren
          dank Ihrer ID bereits die behutsame Schutz-Hülle.
        </p>

        {/* Datenschutz-Hinweis */}
        <div style={{
          background: "rgba(230,126,34,0.07)",
          border: "1px solid rgba(230,126,34,0.35)",
          borderLeft: "3px solid #e67e22",
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
          textAlign: "left",
        }}>
          <p style={{
            fontFamily: "var(--font-ceremonial)",
            fontSize: "0.55rem",
            letterSpacing: "2px",
            color: "#e67e22",
            marginBottom: "0.5rem",
          }}>
            ⚠️ SYSTEM-SCHUTZ-HINWEIS
          </p>
          <p style={{
            fontFamily: "var(--font-body, serif)",
            fontSize: "0.85rem",
            color: "rgba(249,241,215,0.65)",
            lineHeight: 1.75,
          }}>
            Geben Sie im System <strong style={{ color: "#f9f1d7" }}>keine Namen,
            kein Alter und keine Adressen</strong> öffentlich kund —
            auch nicht in Wünschen oder Fürbitten. Datenfreigaben erfolgen
            ausschließlich verschlüsselt gegenüber berechtigten Ämtern.
            Zuwiderhandlung führt zum automatisierten System-Ausschluss.
          </p>
        </div>

        {/* Zertifikat-Versprechen */}
        <div style={{
          background: "rgba(76,175,125,0.05)",
          border: "1px solid rgba(76,175,125,0.25)",
          padding: "0.85rem 1.25rem",
          marginBottom: "2rem",
        }}>
          <p style={{
            fontFamily: "var(--font-ceremonial)",
            fontSize: "0.6rem",
            letterSpacing: "2px",
            color: "#4caf7d",
          }}>
            ✦ Sie erhalten ein offizielles, verifiziertes Zertifikat,
            dessen Zusage Ihre Zertifizierung widerspiegelt. ✦
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleClose}
          style={{
            fontFamily: "var(--font-ceremonial)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#0a0c10",
            background: "#d4af37",
            border: "none",
            padding: "0.85rem 2.5rem",
            cursor: "pointer",
            transition: "filter 0.25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
        >
          System betreten →
        </button>

        <p style={{
          fontFamily: "var(--font-ceremonial)",
          fontSize: "0.45rem",
          letterSpacing: "2px",
          color: "rgba(212,175,55,0.2)",
          marginTop: "1.5rem",
        }}>
          KEINE KINDERDATEN · DSGVO ART. 8 · NETZ-DIGITALISIERUNGS-SCHUTZGESETZ
        </p>
      </div>
    </div>
  );
}
