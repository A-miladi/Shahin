"use client";

import { motion } from "framer-motion";

export const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden  pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #cfbdac 1px, transparent 1px),
            linear-gradient(to bottom, #cfbdac 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(207, 189, 172, 0.15) 0%, rgba(207, 189, 172, 0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
          top: "-200px",
          left: "-200px",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 80, 150, 0],
          scale: [1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(185, 130, 95, 0.12) 0%, rgba(185, 130, 95, 0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
          bottom: "-150px",
          right: "-150px",
        }}
        animate={{
          x: [0, -80, -30, 0],
          y: [0, -60, -120, 0],
          scale: [1, 1.3, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(170, 142, 119, 0.08) 0%, transparent 60%)",
          filter: "blur(100px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.6, 1, 0.7, 0.6],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-primary-500/10"
          style={{
            top: "50%",
            left: "50%",
            width: `${300 + i * 200}px`,
            height: `${300 + i * 200}px`,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      <div className="absolute inset-0 flex justify-between px-[10%]">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`vline-${i}`}
            className="w-[1px] h-full bg-gradient-to-b from-transparent via-primary-500/10 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-20 right-20 w-2 h-2 rounded-full bg-primary-400"
        style={{
          boxShadow: "0 0 20px 4px rgba(207, 189, 172, 0.5)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-24 w-1.5 h-1.5 rounded-full bg-primary-300"
        style={{
          boxShadow: "0 0 15px 3px rgba(207, 189, 172, 0.4)",
        }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-state-500/50 via-transparent to-state-500/50" />
    </div>
  );
};
