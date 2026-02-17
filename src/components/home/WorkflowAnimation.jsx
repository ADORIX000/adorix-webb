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

// Canvas Size - Increased for readability
const STAGE = { w: 850, h: 550 };
// Card Size - Increased from 60 to 72
const CARD = { w: 72, h: 72 };

/* --------------------------
   Nodes Configuration
   Shifted Right by +40px (Total +70px from base)
   Note: Since we increased CARD size, we might need slightly more breathing room, 
   but the current grid should hold thanks to large stage.
-------------------------- */
const nodes = {
  // Top Left Group
  TTS: { x: 115, y: 30, label: "TTS", icon: AudioLines, color: "#10B981" },
  STT: { x: 215, y: 30, label: "STT", icon: Mic, color: "#0EA5E9" }, // slightly moved STT right +10

  // Top Right Group
  AGE: { x: 400, y: 30, label: "Age Detection", icon: ScanFace, color: "#EC4899" }, // +15
  GENDER: { x: 530, y: 30, label: "Gender Detection", icon: ScanFace, color: "#EC4899" }, // +25

  // Middle Row
  AI: { x: 160, y: 180, label: "AI Assistant", icon: Cpu, color: "#8B5CF6" }, // y+20
  KIOSK: { x: 440, y: 180, label: "KIOSK", icon: Cpu, color: "#0D8A9E" }, // x+25, y+20

  // Right Column
  COMP: { x: 620, y: 120, label: "Companies", icon: Users, color: "#3B82F6" }, // x+40
  AD: { x: 620, y: 220, label: "Advertisement", icon: Megaphone, color: "#F43F5E" }, // x+40
  DEV: { x: 620, y: 400, label: "Developers", icon: Code2, color: "#6366F1" }, // x+40

  // Bottom Area
  VISITOR: { x: 440, y: 330, label: "Visitor", icon: User, color: "#64748B" }, // x+25, y+30
  QL: { x: 230, y: 330, label: "Questions", icon: HelpCircle, color: "#F59E0B" }, // x+10, y+30
  ATT: { x: 440, y: 450, label: "Attention Tracking", icon: BarChart3, color: "#14B8A6" }, // x+25, y+40
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
    className="absolute flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-gray-100 z-10 group cursor-pointer"
    style={{ left: x, top: y, width: CARD.w, height: CARD.h }}
  >
    <div
      className="flex items-center justify-center w-8 h-8 rounded-lg mb-1.5 transition-transform group-hover:scale-110"
      style={{ backgroundColor: `${color}15` }}
    >
      <Icon className="w-5 h-5" style={{ color: color }} strokeWidth={2.5} />
    </div>
    <div className="text-[10px] font-bold text-gray-600 text-center leading-tight px-1 group-hover:text-gray-900 transition-colors">
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
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.2"
    />
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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

      // 4. Companies -> Developers 
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

  // Dynamic height calculation based on scale to prevent whitespace
  // Standard height 550px. 
  // Mobile scale 0.6 -> Height ~330px
  // Tablet scale 0.8 -> Height ~440px

  return (
    <div className="w-full flex justify-center py-0 md:py-6 overflow-hidden">
      <div
        className="relative flex-shrink-0 origin-top transform transition-transform duration-300"
        style={{
          width: STAGE.w,
          height: STAGE.h,
          // We use a CSS variable for scale, and we MUST adjust the container height 
          // via a wrapper or simple max-height approach in CSS to crop the empty space 
          // left by the scale() transform.
          transform: 'scale(var(--scale-factor, 1))',
          marginBottom: 'var(--margin-adjust, 0px)'
        }}
      >
        <style jsx>{`
            @media (max-width: 640px) {
                .transform { 
                    --scale-factor: 0.6; 
                    --margin-adjust: -220px; /* Pull bottom content up: 550 * (1-0.6) approx */
                }
            }
            @media (min-width: 641px) and (max-width: 1024px) {
                .transform { 
                    --scale-factor: 0.8; 
                    --margin-adjust: -110px; /* Pull bottom content up */
                }
            }
        `}</style>

        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#CBD5E1 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
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