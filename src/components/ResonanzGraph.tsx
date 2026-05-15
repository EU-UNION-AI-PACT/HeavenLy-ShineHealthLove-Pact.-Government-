"use client";

import { useRef, useCallback } from "react";
import ForceGraph2D, { ForceGraphMethods, NodeObject, LinkObject } from "react-force-graph-2d";

type NodeType = "allianz" | "leitanker" | "guardian" | "flora" | "institution" | "subject";

interface GNode extends NodeObject {
  id: string;
  label: string;
  type: NodeType;
  val: number;
}

interface GLink {
  source: string;
  target: string;
  relation: string;
  value: number;
}

const NODE_COLORS: Record<NodeType, string> = {
  allianz:     "#d4af37",
  leitanker:   "#f0c040",
  guardian:    "#60a5fa",
  flora:       "#4caf7d",
  institution: "#00bcd4",
  subject:     "rgba(255,255,255,0.5)",
};

const GRAPH_DATA: { nodes: GNode[]; links: GLink[] } = {
  nodes: [
    { id: "eu",       label: "EU-UNION",         type: "allianz",     val: 20 },
    { id: "un",       label: "UN",               type: "allianz",     val: 20 },
    { id: "vatikan",  label: "Vatikan",          type: "allianz",     val: 15 },
    { id: "usa",      label: "USA",              type: "allianz",     val: 18 },
    { id: "lt1",      label: "Leitanker A",      type: "leitanker",   val: 12 },
    { id: "lt2",      label: "Leitanker B",      type: "leitanker",   val: 12 },
    { id: "lt3",      label: "Leitanker C",      type: "leitanker",   val: 10 },
    { id: "g1",       label: "Guardian DE-01",   type: "guardian",    val: 8  },
    { id: "g2",       label: "Guardian CH-07",   type: "guardian",    val: 8  },
    { id: "g3",       label: "Guardian US-12",   type: "guardian",    val: 8  },
    { id: "g4",       label: "Guardian IE-03",   type: "guardian",    val: 7  },
    { id: "flora1",   label: "Stadtwald DE",     type: "flora",       val: 6  },
    { id: "flora2",   label: "Rhein-Wasser",     type: "flora",       val: 6  },
    { id: "flora3",   label: "Alpen-Ökosystem",  type: "flora",       val: 5  },
    { id: "inst1",    label: "Hospiz Detmold",   type: "institution", val: 7  },
    { id: "inst2",    label: "Streetwork Berlin", type: "institution", val: 7  },
    { id: "s1",       label: "Anonym #1",        type: "subject",     val: 4  },
    { id: "s2",       label: "Anonym #2",        type: "subject",     val: 4  },
    { id: "s3",       label: "Anonym #3",        type: "subject",     val: 4  },
    { id: "s4",       label: "Anonym #4",        type: "subject",     val: 4  },
    { id: "s5",       label: "Anonym #5",        type: "subject",     val: 4  },
  ],
  links: [
    { source: "eu",      target: "lt1",    relation: "Weisheit",          value: 3 },
    { source: "eu",      target: "lt2",    relation: "Intentions-Flow",   value: 3 },
    { source: "un",      target: "lt3",    relation: "Intentions-Flow",   value: 3 },
    { source: "vatikan", target: "lt1",    relation: "Fürbitte",          value: 2 },
    { source: "usa",     target: "g3",     relation: "Wohnraum",          value: 2 },
    { source: "lt1",     target: "g1",     relation: "Weisheit",          value: 3 },
    { source: "lt2",     target: "g2",     relation: "Erfahrungs-Relay",  value: 3 },
    { source: "lt3",     target: "g4",     relation: "Sorglos-Gießfass",  value: 2 },
    { source: "g1",      target: "s1",     relation: "Beheimatung",       value: 2 },
    { source: "g1",      target: "inst1",  relation: "Wünsche-Wagen",     value: 2 },
    { source: "g2",      target: "s2",     relation: "Andocken",          value: 2 },
    { source: "g3",      target: "s3",     relation: "Intentions-Flow",   value: 2 },
    { source: "g4",      target: "s4",     relation: "Andocken",          value: 2 },
    { source: "g4",      target: "s5",     relation: "Beheimatung",       value: 2 },
    { source: "g2",      target: "inst2",  relation: "Safe-Haven",        value: 3 },
    { source: "flora1",  target: "eu",     relation: "Natur-Brücke",      value: 2 },
    { source: "flora2",  target: "un",     relation: "Wind-Resonanz",     value: 2 },
    { source: "flora3",  target: "vatikan",relation: "Habitat",           value: 2 },
    { source: "inst1",   target: "lt1",    relation: "Story-Relay",       value: 2 },
    { source: "inst2",   target: "lt2",    relation: "Story-Relay",       value: 2 },
    { source: "s1",      target: "flora1", relation: "Inter-Spezies",     value: 1 },
    { source: "s3",      target: "flora2", relation: "Inter-Spezies",     value: 1 },
  ],
};

export default function ResonanzGraph() {
  const graphRef = useRef<ForceGraphMethods<GNode, LinkObject<GNode, GLink>>>(undefined);

  const paintNode = useCallback(
    (node: NodeObject<GNode>, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const r = Math.sqrt(node.val) * 3;
      const color = NODE_COLORS[node.type] ?? "#fff";

      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.shadowBlur = node.type === "allianz" ? 16 : 6;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (globalScale >= 0.7) {
        ctx.font = `${Math.max(4, 6 / globalScale)}px Cinzel, serif`;
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x ?? 0, (node.y ?? 0) + r + 4);
      }
    },
    []
  );

  return (
    <div style={{ width: "100%", height: 480, background: "oklch(0.11 0.03 265)", border: "1px solid rgba(212,175,55,0.15)", position: "relative", overflow: "hidden" }}>
      <ForceGraph2D
        ref={graphRef}
        graphData={GRAPH_DATA}
        backgroundColor="oklch(0.11 0.03 265)"
        nodeCanvasObject={paintNode}
        nodeCanvasObjectMode={() => "replace"}
        linkColor={() => "rgba(212,175,55,0.18)"}
        linkWidth={(link: GLink) => link.value * 0.6}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={(link: GLink) => link.value * 0.4}
        linkDirectionalParticleColor={() => "#d4af37"}
        linkDirectionalParticleSpeed={0.003}
        cooldownTicks={120}
        d3AlphaDecay={0.015}
        d3VelocityDecay={0.3}
        width={undefined}
        height={480}
      />
    </div>
  );
}
