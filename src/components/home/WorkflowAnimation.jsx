import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  AudioLines,
  Cpu,
  ScanFace,
  Megaphone,
  HelpCircle,
  BarChart3,
  User,
  Users,
  Code2,
} from "lucide-react";

const STAGE = { w: 1400, h: 700 };
const CARD = { w: 120, h: 115 };
const ICON_BOX = 38;
const ICON_SIZE = 20;

/* --------------------------
   Nodes
-------------------------- */
const nodes = {
  TTS: { x: 40, y: 100, label: "TTS", icon: AudioLines },
  STT: { x: 220, y: 100, label: "STT", icon: Mic },
  AI: { x: 130, y: 280, label: "AI Assistant", icon: Cpu },
  QL: { x: 200, y: 450, label: "Questions", icon: HelpCircle },
  AGE: { x: 400, y: 100, label: "Age detection", icon: ScanFace },
  GENDER: { x: 600, y: 100, label: "Gender detection", icon: ScanFace },
  KIOSK: { x: 500, y: 280, label: "KIOSK", icon: Cpu },
  VISITOR: { x: 500, y: 450, label: "Visitor", icon: User },
  AD: { x: 750, y: 370, label: "Advertisement", icon: Megaphone },
  ATT: { x: 500, y: 600, label: "Attention tracking", icon: BarChart3 },
  COMP: { x: 750, y: 220, label: "Companies", icon: Users },
  DEV: { x: 750, y: 520, label: "Developers", icon: Code2 },
};

function anchor(key, side = "center") {
  const n = nodes[key];
  const cx = n.x + CARD.w / 2;
  const cy = n.y + CARD.h / 2;
  const pad = 10;

  if (side === "left") return { x: n.x - pad, y: cy };
  if (side === "right") return { x: n.x + CARD.w + pad, y: cy };
  if (side === "top") return { x: cx, y: n.y - pad };
  if (side === "bottom") return { x: cx, y: n.y + CARD.h + pad };
  return { x: cx, y: cy };
}

/* Curved path builder */
function curvedPath(p1, p2) {
  const midX = (p1.x + p2.x) / 2;
  return `M ${p1.x} ${p1.y} C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`;
}

const Node = ({ x, y, label, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    whileHover={{ y: -4, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="absolute group"
    style={{ left: x, top: y, width: CARD.w, height: CARD.h }}
  >
    <div className="w-full h-full rounded-3xl bg-white/85 backdrop-blur-xl border border-adorix-primary/15 shadow-[0_12px_36px_rgba(0,0,0,0.10)] flex flex-col items-center justify-center gap-2 hover:shadow-[0_0_12px_rgba(79,70,229,0.6)] transition">
      <div
        className="rounded-2xl bg-adorix-light flex items-center justify-center"
        style={{ width: ICON_BOX, height: ICON_BOX }}
      >
        <Icon
          className="text-adorix-primary"
          style={{ width: ICON_SIZE, height: ICON_SIZE }}
        />
      </div>
      <div className="text-[12px] font-semibold text-adorix-dark text-center px-2 leading-tight">
        {label}
      </div>
    </div>

    {/* Tooltip */}
    <div
      className="absolute -top-8 left-1/2 -translate-x-1/2 
                 bg-black/80 text-white text-[11px] px-2 py-1 rounded
                 opacity-0 group-hover:opacity-100 transition pointer-events-none"
    >
      {label}
    </div>
  </motion.div>
);

const AnimatedArrow = ({ d, delay = 0 }) => (
  <>
    <path
      d={d}
      fill="none"
      stroke="rgba(13,138,158,0.20)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd="url(#arrowHead)"
    />
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(13,138,158,0.80)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="10 14"
      initial={{ strokeDashoffset: 60, opacity: 0.25 }}
      animate={{ strokeDashoffset: [60, 0], opacity: [0.25, 1, 0.6] }}
      transition={{
        duration: 2.0,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
      markerEnd="url(#arrowHead)"
    />
  </>
);

export default function WorkflowAnimation() {
  const arrows = useMemo(() => {
    const a = (k, side) => anchor(k, side);

    return [
      { d: curvedPath(a("VISITOR", "left"), a("QL", "right")), delay: 0.0 },
      { d: curvedPath(a("QL", "top"), a("AI", "bottom")), delay: 0.2 },
      { d: curvedPath(a("AI", "top"), a("TTS", "bottom")), delay: 0.4 },
      { d: curvedPath(a("AI", "top"), a("STT", "bottom")), delay: 0.6 },
      { d: curvedPath(a("KIOSK", "top"), a("AGE", "bottom")), delay: 0.8 },
      { d: curvedPath(a("KIOSK", "top"), a("GENDER", "bottom")), delay: 1.0 },
      { d: curvedPath(a("VISITOR", "top"), a("KIOSK", "bottom")), delay: 1.2 },
      { d: curvedPath(a("KIOSK", "right"), a("AD", "left")), delay: 1.4 },
      { d: curvedPath(a("KIOSK", "right"), a("COMP", "left")), delay: 1.6 },
      { d: curvedPath(a("VISITOR", "bottom"), a("ATT", "top")), delay: 1.8 },
      { d: curvedPath(a("COMP", "bottom"), a("DEV", "top")), delay: 2.0 },
    ];
  }, []);

  return (
    <div className="w-full p-8 bg-adorix-light rounded-3xl">
      <div className="relative w-full bg-white/35 backdrop-blur-sm border border-adorix-primary/10 rounded-[2.5rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.06)]">
        {/* dotted background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(13,138,158,0.18) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative p-12">
          <div className="relative mx-auto w-full" style={{ height: STAGE.h }}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="arrowHead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path
                    d="M 0 0 L 10 5 L 0 10 z"
                    fill="rgba(13,138,158,0.8)"
                  />
                </marker>
              </defs>

              {arrows.map((a, i) => (
                <AnimatedArrow key={i} d={a.d} delay={a.delay} />
              ))}
            </svg>

            {Object.entries(nodes).map(([key, n]) => (
              <Node key={key} {...n} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}