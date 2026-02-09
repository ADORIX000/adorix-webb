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

// Canvas Size 
const STAGE = { w: 750, h: 500 };
const CARD = { w: 60, h: 60 };

/* --------------------------
   Nodes Configuration
   Shifted Right by +40px (Total +70px from base) to fix cutoff
-------------------------- */
const nodes = {
  // Top Left Group
  // TTS: 75 -> 115
  // STT: 165 -> 205
  TTS: { x: 115, y: 30, label: "TTS", icon: AudioLines, color: "#10B981" },
  STT: { x: 205, y: 30, label: "STT", icon: Mic, color: "#0EA5E9" },

  // Top Right Group
  // AGE: 345 -> 385
  // GENDER: 465 -> 505
  AGE: { x: 385, y: 30, label: "Age Detection", icon: ScanFace, color: "#EC4899" },
  GENDER: { x: 505, y: 30, label: "Gender Detection", icon: ScanFace, color: "#EC4899" },

  // Middle Row
  // AI: 120 -> 160
  // KIOSK: 375 -> 415
  AI: { x: 160, y: 160, label: "AI Assistant", icon: Cpu, color: "#8B5CF6" },
  KIOSK: { x: 415, y: 160, label: "KIOSK", icon: Cpu, color: "#0D8A9E" },

  // Right Column
  // COMP/AD/DEV: 540 -> 580
  COMP: { x: 580, y: 120, label: "Companies", icon: Users, color: "#3B82F6" },
  AD: { x: 580, y: 210, label: "Advertisement", icon: Megaphone, color: "#F43F5E" },
  DEV: { x: 580, y: 380, label: "Developers", icon: Code2, color: "#6366F1" },

  // Bottom Area
  // VISITOR: 375 -> 415
  // QL: 180 -> 220
  // ATT: 375 -> 415
  VISITOR: { x: 415, y: 300, label: "Visitor", icon: User, color: "#64748B" },
  QL: { x: 220, y: 300, label: "Questions", icon: HelpCircle, color: "#F59E0B" },
  ATT: { x: 415, y: 410, label: "Attention Tracking", icon: BarChart3, color: "#14B8A6" },
};

/* --------------------------
   Helper Functions
-------------------------- */
function anchor(key, side = "center") {
  const n = nodes[key];
  const cx = n.x + CARD.w / 2;
  const cy = n.y + CARD.h / 2;
  const pad = 0;

  if (side === "left") return { x: n.x - pad, y: cy };
  if (side === "right") return { x: n.x + CARD.w + pad, y: cy };
  if (side === "top") return { x: cx, y: n.y - pad };
  if (side === "bottom") return { x: cx, y: n.y + CARD.h + pad };
  return { x: cx, y: cy };
}

/* Branch Path Builder */
function branchPath(start, ends, type) {
  let d = `M ${start.x} ${start.y}`;

  if (type === "fork-up") {
    const midY = (start.y + Math.max(...ends.map(e => e.y))) / 2;
    const minX = Math.min(...ends.map(e => e.x));
    const maxX = Math.max(...ends.map(e => e.x));

    d += ` V ${midY}`;
    d += ` M ${minX} ${midY} H ${maxX}`;
    ends.forEach(end => {
      d += ` M ${end.x} ${midY} V ${end.y}`;
    });
  }
  else if (type === "fork-right") {
    const midX = (start.x + Math.min(...ends.map(e => e.x))) / 2;
    const minY = Math.min(...ends.map(e => e.y));
    const maxY = Math.max(...ends.map(e => e.y));

    d += ` H ${midX}`;
    d += ` M ${midX} ${minY} V ${maxY}`;
    ends.forEach(end => {
      d += ` M ${midX} ${end.y} H ${end.x}`;
    });
  }
  return d;
}

/* --------------------------
   Components
-------------------------- */

const Card = ({ x, y, label, icon: Icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, scale: 1.05, shadow: "0px 25px 50px -12px rgba(0,0,0,0.25)" }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
    className="absolute flex flex-col items-center justify-center bg-white rounded-xl shadow-md border border-gray-100 z-10 group cursor-pointer"
    style={{ left: x, top: y, width: CARD.w, height: CARD.h }}
  >
    <div
      className="flex items-center justify-center w-7 h-7 rounded-md mb-1 transition-transform group-hover:scale-110"
      style={{ backgroundColor: `${color}15` }}
    >
      <Icon className="w-4 h-4" style={{ color: color }} strokeWidth={2} />
    </div>
    <div className="text-[8px] font-bold text-gray-600 text-center leading-tight px-0.5 group-hover:text-gray-900 transition-colors">
      {label}
    </div>
  </motion.div>
);

const AnimatedConnection = ({ d, color = "#CBD5E1", delay = 0 }) => (
  <>
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      opacity="0.2"
    />
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut", delay }}
    />
  </>
);

export default function WorkflowAnimation() {
  const arrows = useMemo(() => {
    const a = (k, side) => anchor(k, side);

    return [
      // 1. AI -> TTS / STT (Fork Up)
      {
        d: branchPath(a("AI", "top"), [a("TTS", "bottom"), a("STT", "bottom")], "fork-up"),
        delay: 0.5,
        color: "#0EA5E9"
      },

      // 2. Kiosk -> Age / Gender (Fork Up)
      {
        d: branchPath(a("KIOSK", "top"), [a("AGE", "bottom"), a("GENDER", "bottom")], "fork-up"),
        delay: 0.7,
        color: "#EC4899"
      },

      // 3. Kiosk -> Companies / Ads (Fork Right)
      {
        d: branchPath(a("KIOSK", "right"), [a("COMP", "left"), a("AD", "left")], "fork-right"),
        delay: 0.9,
        color: "#F43F5E"
      },

      // 4. Companies -> Developers (Blue Bracket)
      {
        d: `M ${a("COMP", "right").x} ${a("COMP", "right").y} H ${a("COMP", "right").x + 20} V ${a("DEV", "right").y} H ${a("DEV", "right").x}`,
        delay: 1.1,
        color: "#3B82F6"
      },
      // 5. Ad Connector
      {
        d: `M ${a("AD", "right").x} ${a("AD", "right").y} H ${a("AD", "right").x + 20}`,
        delay: 1.2,
        color: "#3B82F6"
      },

      // 6. Visitor -> Questions (Left)
      { d: `M ${a("VISITOR", "left").x} ${a("VISITOR", "left").y} H ${a("QL", "right").x}`, delay: 1.3, color: "#F59E0B" },

      // 7. Visitor -> Attention (Down)
      { d: `M ${a("VISITOR", "bottom").x} ${a("VISITOR", "bottom").y} V ${a("ATT", "top").y}`, delay: 1.4, color: "#14B8A6" },

      // 8. Visitor -> Kiosk (Up)
      { d: `M ${a("VISITOR", "top").x} ${a("VISITOR", "top").y} V ${a("KIOSK", "bottom").y}`, delay: 1.5, color: "#64748B" },

      // 9. AI -> Questions (Purple Path)
      {
        d: `M ${a("AI", "bottom").x} ${a("AI", "bottom").y} V ${a("QL", "top").y - 20} H ${a("QL", "top").x} V ${a("QL", "top").y}`,
        delay: 1.6,
        color: "#8B5CF6"
      }

    ];
  }, []);

  return (
    <div className="w-full flex justify-center py-10 overflow-x-auto bg-transparent rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="relative flex-shrink-0"
        style={{ width: STAGE.w, height: STAGE.h }}>

        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#CBD5E1 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* SVG Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
        >
          {arrows.map((arr, i) => (
            <AnimatedConnection key={i} d={arr.d} color={arr.color} delay={arr.delay} />
          ))}
        </svg>

        {/* Nodes Layer */}
        <div className="relative w-full h-full">
          {Object.entries(nodes).map(([key, n], i) => (
            <Card key={key} {...n} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </div>
  );
}