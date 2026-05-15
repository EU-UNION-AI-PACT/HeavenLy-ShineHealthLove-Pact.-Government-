"use client";

import { useEffect, useState } from "react";

const STATIONS = [
  { label: "Ursprung",   date: new Date("2026-01-06T00:00:00Z"), color: "#00bcd4" },
  { label: "Spiegelung", date: new Date("2026-06-12T00:00:00Z"), color: "#d4af37" },
  { label: "Krönung",    date: new Date("2026-12-24T00:00:00Z"), color: "#e67e22" },
];

function formatCountdown(diff: number) {
  if (diff <= 0) return "ANGEKOMMEN";
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const secs = Math.floor(diff % 60);
  return `${days}T ${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}

export default function CalendarWidget() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const yearStart = new Date("2026-01-01T00:00:00Z").getTime();
  const yearEnd   = new Date("2027-01-01T00:00:00Z").getTime();
  const yearProgress = now === null ? 0 : Math.max(0, Math.min(100, ((now - yearStart) / (yearEnd - yearStart)) * 100));

  return (
    <section className="bg-glass rounded-none mb-20 p-6" style={{ border: "1px solid var(--border-gold)" }}>
      <h2
        className="font-ceremonial text-center text-gold mb-6"
        style={{ fontSize: "0.75rem", letterSpacing: "4px" }}
      >
        Heiliges Jahr 2026 — Lebendiger Zähler
      </h2>

      {/* Year progress bar */}
      <div className="mb-8">
        <div style={{ height: "2px", background: "rgba(212,175,55,0.12)", position: "relative", width: "100%" }}>
          <div
            style={{
              height: "100%",
              width: `${yearProgress}%`,
              background: "linear-gradient(90deg, #00bcd4, #d4af37, #e67e22)",
              transition: "width 1s linear",
              boxShadow: "0 0 8px rgba(212,175,55,0.4)",
            }}
          />
          {STATIONS.map((s) => {
            const pos = ((s.date.getTime() - yearStart) / (yearEnd - yearStart)) * 100;
            return (
              <div
                key={s.label}
                style={{
                  position: "absolute",
                  top: "-4px",
                  left: `${pos}%`,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: s.color,
                  border: "2px solid rgba(10,12,16,0.8)",
                  boxShadow: `0 0 8px ${s.color}`,
                  transform: "translateX(-50%)",
                }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-3">
          <span className="font-ceremonial opacity-40" style={{ fontSize: "0.5rem" }}>JAN 2026</span>
          <span className="font-ceremonial opacity-40" style={{ fontSize: "0.5rem" }}>DEZ 2026</span>
        </div>
      </div>

      {/* Countdown per station */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATIONS.map((s) => {
          const diff = now === null ? Infinity : (s.date.getTime() - now) / 1000;
          const passed = diff <= 0;
          return (
            <div key={s.label} className="text-center">
              <div
                className="font-ceremonial mb-1"
                style={{ fontSize: "0.6rem", letterSpacing: "2px", color: s.color, opacity: 0.7 }}
              >
                {s.label.toUpperCase()}
              </div>
              <div
                className="font-ceremonial"
                style={{
                  fontSize: "1rem",
                  color: passed ? "#4caf7d" : s.color,
                  letterSpacing: "1px",
                  textShadow: `0 0 12px ${s.color}`,
                }}
              >
                {now === null ? "—" : formatCountdown(diff)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
