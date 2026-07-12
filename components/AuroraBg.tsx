"use client";

import { motion } from "framer-motion";

const AuroraBg = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[140px]"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-40 bottom-10 h-[550px] w-[550px] rounded-full bg-purple-600/20 blur-[160px]"
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AuroraBg;
