"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroImage from "../../../../public/images/DesktopHero.png";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { motion, Variants } from "motion/react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const DesktopHero = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative max-lg:hidden w-full px-4 h-screen min-h-[700px] flex items-center overflow-hidden">
      <motion.div
        initial={false}
        animate={{ scale: animate ? 1.3 : 1 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute max-lg:hidden inset-0 z-0"
      >
        <Image
          src={HeroImage}
          alt="Shahin Cafe Hero"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      <div className="absolute bottom-0 w-full z-0 bg-gradient-to-t h-48 from-black" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center h-full">
        <motion.div
          variants={staggerContainer}
          initial={false}
          animate={animate ? "visible" : "hidden"}
          className="max-w-2xl mt-auto mb-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl font-audiowide text-white leading-tight mb-4"
          >
            More Than <br />
            Just <span className="text-primary-400">Coffee</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-300 text-lg md:text-xl font-light mb-8 max-w-lg"
          >
            Premium coffee, fresh ingredients, and a unique experience.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/menu"
                className="flex w-fit items-center gap-3 rounded-full bg-[#C49A6C] px-8 py-3.5 font-medium text-black transition-colors hover:bg-[#b08a5f]"
              >
                View Menu <FaArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
