"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const pageBlobs = [
  {
    size: 500,
    color: "rgba(234, 179, 8, 0.15)",
    top: "-10%",
    left: "-10%",
    duration: 18,
  },
  {
    size: 400,
    color: "rgba(249, 115, 22, 0.15)",
    top: "40%",
    left: "60%",
    duration: 22,
  },
  {
    size: 350,
    color: "rgba(180, 83, 9, 0.12)",
    top: "70%",
    left: "10%",
    duration: 20,
  },
];

const cardBlobs = [
  {
    size: 140,
    color: "rgba(234, 179, 8, 0.12)",
    top: "-20%",
    left: "-10%",
    duration: 16,
  },
  {
    size: 110,
    color: "rgba(249, 115, 22, 0.1)",
    top: "50%",
    left: "70%",
    duration: 20,
  },
];

const pageIcons = [
  { icon: "fa-cross", left: "15%", size: 16, duration: 16, delay: 0 },
  { icon: "fa-dove", left: "75%", size: 20, duration: 20, delay: 4 },
  { icon: "fa-cross", left: "45%", size: 14, duration: 14, delay: 8 },
  { icon: "fa-dove", left: "25%", size: 16, duration: 22, delay: 2 },
  { icon: "fa-cross", left: "85%", size: 15, duration: 18, delay: 6 },
];

const cardIcons = [
  { icon: "fa-cross", left: "20%", size: 10, duration: 14, delay: 0 },
  { icon: "fa-dove", left: "70%", size: 12, duration: 18, delay: 3 },
];

type Particle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.4 + 0.2,
      })),
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-200"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            bottom: "-5%",
            opacity: p.opacity,
          }}
          animate={{
            y: ["0vh", "-110vh"],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

function FloatingIcons({ icons }: { icons: typeof pageIcons }) {
  return (
    <>
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-300/30"
          style={{ left: item.left, bottom: "-5%", fontSize: item.size }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, 20, -20, 0],
            opacity: [0, 0.5, 0.5, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <i className={`fa-solid ${item.icon}`} />
        </motion.div>
      ))}
    </>
  );
}

type AnimatedBackgroundProps = {
  variant?: "page" | "card";
};

export default function AnimatedBackground({
  variant = "page",
}: AnimatedBackgroundProps) {
  const isCard = variant === "card";
  const blobs = isCard ? cardBlobs : pageBlobs;
  const icons = isCard ? cardIcons : pageIcons;
  const particleCount = isCard ? 6 : 20;
  const blurClass = isCard ? "blur-xl" : "blur-3xl";

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {!isCard && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
      )}

      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${blurClass}`}
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: blob.color,
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <FloatingParticles count={particleCount} />
      <FloatingIcons icons={icons} />
    </div>
  );
}
