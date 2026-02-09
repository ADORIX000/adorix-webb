import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Smartphone,
  Cpu,
  Megaphone,
  BarChart3,
  ScanFace,
  Mic,
  Zap,
  Eye,
  Globe,
  Database,
  Wifi,
  Lock,
  Share2
} from "lucide-react";

/**
 * Configuration for the diagram
 */
const CARD_SIZE = 80; // Size of the square cards
const GAP = 20; // Gap between cards

// Grid positions (row, col) - 0-indexed
// 5 rows, 4 cols
const GRID_ROWS = 5;
const GRID_COLS = 4;

// Active Nodes Configuration (The colored ones)
const ACTIVE_NODES = {
  VISITOR: { r: 2, c: 0, label: "Visitor", icon: User, color: "#64748b" }, // Slate
  KIOSK: { r: 2, c: 1, label: "Kiosk", icon: Smartphone, color: "#0D8A9E" }, // Adorix Teal
  AI: { r: 0, c: 2, label: "AI Engine", icon: Cpu, color: "#8b5cf6" }, // Violet
  AD: { r: 2, c: 3, label: "Smart Ad", icon: Megaphone, color: "#f43f5e" }, // Rose
  ANALYTICS: { r: 4, c: 2, label: "Analytics", icon: BarChart3, color: "#0ea5e9" }, // Sky
};

// Ghost Nodes (Background decoration)
const GHOST_NODES = [
  { r: 0, c: 0, icon: Globe },
  { r: 0, c: 3, icon: Share2 },

  { r: 1, c: 1, icon: ScanFace },
  { r: 1, c: 2, icon: Mic }, // Between Kiosk and AI/Ad

  { r: 2, c: 2, icon: Zap }, // Between Kiosk and Ad

  { r: 3, c: 1, icon: Database },
  { r: 3, c: 3, icon: Wifi },

  { r: 4, c: 0, icon: Lock },
  { r: 4, c: 3, icon: Eye },
];

// Helper to get pixel coordinates for a grid position
const getPos = (r, c) => ({
  x: c * (CARD_SIZE + GAP),
  y: r * (CARD_SIZE + GAP),
});

// Card Component
const Card = ({ r, c, label, icon: Icon, color, isActive = false, delay = 0 }) => {
  const { x, y } = getPos(r, c);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={`absolute flex flex-col items-center justify-center rounded-2xl transition-all duration-300
        ${isActive
          ? "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 scale-110"
          : "bg-transparent border border-gray-100 z-0 opacity-40 hover:opacity-60"
        }
      `}
      style={{
        left: x,
        top: y,
        width: CARD_SIZE,
        height: CARD_SIZE,
      }}
    >
      {/* Icon */}
      <div
        className={`flex items-center justify-center rounded-xl mb-1
          ${isActive ? "w-10 h-10" : "w-8 h-8"}
        `}
        style={{ backgroundColor: isActive ? `${color}20` : "transparent" }}
      >
        <Icon
          className={isActive ? "w-6 h-6" : "w-5 h-5 text-gray-300"}
          style={{ color: isActive ? color : undefined }}
          strokeWidth={isActive ? 2.5 : 1.5}
        />
      </div>

      {/* Label (Only for Active) */}
      {isActive && (
        <div className="absolute -bottom-8 bg-white px-3 py-1 rounded-lg shadow-md text-xs font-bold text-gray-700 whitespace-nowrap">
          {label}
        </div>
      )}
    </motion.div>
  );
};

// Connecting Line Component
const Connection = ({ start, end, color = "#94a3b8", delay = 0.5 }) => {
  const p1 = getPos(start.r, start.c);
  const p2 = getPos(end.r, end.c);

  // Adjust to center of cards
  const startX = p1.x + CARD_SIZE / 2;
  const startY = p1.y + CARD_SIZE / 2;
  const endX = p2.x + CARD_SIZE / 2;
  const endY = p2.y + CARD_SIZE / 2;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0.2 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, delay, ease: "easeInOut" }
    }
  };

  let d = "";
  const radius = 20;

  if (start.r === end.r) {
    // Horizontal straight line
    d = `M ${startX + CARD_SIZE / 2} ${startY} L ${endX - CARD_SIZE / 2} ${endY}`;
  } else if (start.c === end.c) {
    // Vertical straight line
    d = `M ${startX} ${startY + CARD_SIZE / 2} L ${endX} ${endY - CARD_SIZE / 2}`;
  } else {
    // L-shape or S-shape
    // We want to avoid crossing through centers of other cards if possible, 
    // but given the grid constraints, orthogonal paths often overlap.

    // Simple L-shape: Horizontal then Vertical
    // d = `M ${startX + CARD_SIZE/2} ${startY} H ${endX} V ${endY - CARD_SIZE/2}`; -- No, corners need radius

    // Let's do: Exit Horizontal -> Turn -> Enter Vertical
    // This looks good for Kiosk -> AI/Analytics

    if (end.c > start.c) {
      // Going Right
      if (end.r < start.r) {
        // Going Up (Kiosk -> AI)
        // Go right, then up
        const midX = endX;
        d = `M ${startX + CARD_SIZE / 2} ${startY} 
                  H ${midX - radius} 
                  Q ${midX} ${startY} ${midX} ${startY - radius}
                  V ${endY + CARD_SIZE / 2}`;
      } else {
        // Going Down (Kiosk -> Analytics)
        const midX = endX;
        d = `M ${startX + CARD_SIZE / 2} ${startY} 
                   H ${midX - radius} 
                   Q ${midX} ${startY} ${midX} ${startY + radius}
                   V ${endY - CARD_SIZE / 2}`;
      }
    }
  }

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={pathVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  );
};


const WorkflowAnimation = () => {
  return (
    <div className="w-full flex justify-center py-10 bg-adorix-light/50 rounded-3xl overflow-hidden">
      <div className="relative" style={{ width: 450, height: 550 }}>

        {/* Background Grid/Lines (Optional) */}
        <div className="absolute inset-0 border-l border-dashed border-gray-200 left-1/2 -z-10 h-full w-[1px]"></div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">

          {/* Visitor -> Kiosk */}
          <Connection
            start={ACTIVE_NODES.VISITOR}
            end={ACTIVE_NODES.KIOSK}
            color="#cbd5e1" // Faint connection
            delay={0.6}
          />

          {/* Kiosk -> AI */}
          <Connection
            start={ACTIVE_NODES.KIOSK}
            end={ACTIVE_NODES.AI}
            color="#8b5cf6" // Violet
            delay={0.9}
          />

          {/* Kiosk -> Ad (Through the ghost node) */}
          <motion.path
            d={`M ${getPos(2, 1).x + CARD_SIZE + CARD_SIZE / 2} ${getPos(2, 1).y + CARD_SIZE / 2} L ${getPos(2, 3).x + CARD_SIZE / 2 - CARD_SIZE} ${getPos(2, 3).y + CARD_SIZE / 2}`}
          // Manual straight line correcting for card width? 
          // Actually let's just draw connection between KIOSK and AD. 
          // Since they are on same row (r=2), the Connection component handles it.
          // But it passes through (2,2).
          />
          <Connection
            start={ACTIVE_NODES.KIOSK}
            end={ACTIVE_NODES.AD}
            color="#f43f5e" // Rose
            delay={1.1}
          />

          {/* Kiosk -> Analytics */}
          <Connection
            start={ACTIVE_NODES.KIOSK}
            end={ACTIVE_NODES.ANALYTICS}
            color="#0ea5e9" // Sky
            delay={1.3}
          />

        </svg>

        {/* Ghost Nodes */}
        {GHOST_NODES.map((node, i) => (
          <Card
            key={`ghost-${i}`}
            {...node}
            delay={i * 0.05}
          />
        ))}

        {/* Active Nodes */}
        <Card {...ACTIVE_NODES.VISITOR} isActive delay={0.5} />
        <Card {...ACTIVE_NODES.KIOSK} isActive delay={0.7} />
        <Card {...ACTIVE_NODES.AI} isActive delay={1.0} />
        <Card {...ACTIVE_NODES.AD} isActive delay={1.2} />
        <Card {...ACTIVE_NODES.ANALYTICS} isActive delay={1.4} />

      </div>
    </div>
  );
};

export default WorkflowAnimation;