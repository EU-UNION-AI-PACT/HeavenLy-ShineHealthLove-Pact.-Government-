"use client";

import { ALLIANCE_NODES } from "@/types";

export default function AllianceBar() {
  return (
    <section className="my-16">
      <h2
        className="font-ceremonial text-gold text-center mb-10"
        style={{ fontSize: "0.75rem", letterSpacing: "5px" }}
      >
        Welt-Allianz Netzwerk — Aktive Knoten
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {ALLIANCE_NODES.map((node) => (
          <div
            key={node.id}
            className="metric-card text-center"
            style={{ padding: "1rem 0.75rem" }}
          >
            <div
              className="font-ceremonial mb-1"
              style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#00bcd4" }}
            >
              {node.id}
            </div>
            <div
              className="font-ceremonial"
              style={{ fontSize: "0.7rem", letterSpacing: "1.5px", color: "#d4af37" }}
            >
              {node.label}
            </div>
            <div
              className="mt-1 opacity-50"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}
            >
              {node.role}
            </div>
            <div className="mt-2 flex items-center justify-center gap-1">
              <span
                className="animate-orbit-pulse"
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: node.status === "ONLINE" ? "#4caf7d" : "#e67e22",
                }}
              />
              <span
                className="font-ceremonial opacity-50"
                style={{ fontSize: "0.5rem", letterSpacing: "1px" }}
              >
                {node.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-center mt-6 font-ceremonial opacity-30"
        style={{ fontSize: "0.55rem", letterSpacing: "2px" }}
      >
        🌍 GLOBAL MESH — VERIFIZIERT DURCH EU | UN | USA | CH | IE | SCAN &nbsp;|&nbsp;
        DSGVO / COPPA KONFORM
      </p>
    </section>
  );
}
