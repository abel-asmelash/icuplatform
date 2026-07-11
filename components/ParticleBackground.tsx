"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PARTICLE_COUNT = 25;

type Particle = {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
};

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-orange-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            opacity: p.opacity,
          }}
          initial={{ y: "110vh" }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
