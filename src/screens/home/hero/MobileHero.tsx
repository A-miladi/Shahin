"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroImage from "../../../../public/images/DesktopHero.png";
import { motion, Variants } from "motion/react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import Logo from "../../../../public/Logo2.png";

import { Button } from "@/common/ui/Button";
import { FaArrowRight } from "react-icons/fa6";
import OrderTracker from "@/common/components/OrderTracker";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const MobileHero = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative rounded-xl justify-center lg:hidden gap-24 h-fit py-4 w-full px-4 flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-br via-black/50 to-black/10 from-black" />

      <motion.div
        variants={staggerContainer}
        initial={false}
        animate={animate ? "visible" : "hidden"}
        className="w-full gap-3 top-3 flex items-center justify-end z-10"
      >
        <motion.button
          variants={fadeInUp}
          className="w-10 bg-white/10 relative rounded-xl flex shadow-lg shadow-black/80 items-center justify-center text-primary-300 backdrop-blur-sm border border-white/10 h-10"
        >
          <Image
            src={Logo}
            alt="Shahin"
            className="w-5 h-5 object-contain opacity-80"
            width={10}
            height={10}
            priority
          />
        </motion.button>

        <motion.div
          variants={fadeInUp}
          className="flex-1 bg-white/5 rounded-xl flex shadow-lg shadow-black/80 items-center justify-center text-white backdrop-blur-sm border border-white/10 h-10"
        >
          <OrderTracker currentStep={2} size={28} />
        </motion.div>

        <motion.button
          variants={fadeInUp}
          className="w-10 bg-white/10 relative rounded-xl flex shadow-lg shadow-black/80 items-center justify-center text-primary-300 backdrop-blur-sm border border-white/10 h-10"
        >
          <span className="absolute w-5 h-5 flex items-center justify-center font-bold font-audiowide text-[10px] rounded-full pb-[1px] pl-[1px] -top-2 text-black bg-primary-400 -right-2">
            2
          </span>
          <FiShoppingCart />
        </motion.button>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ scale: animate ? 1.4 : 1 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute lg:hidden w-full h-full z-0"
      >
        <Image
          src={HeroImage}
          alt="Shahin Cafe Hero"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial={false}
        animate={animate ? "visible" : "hidden"}
        className="max-w-2xl mt-auto mb-auto relative z-10"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-2xl font-audiowide text-white leading-tight mb-2"
        >
          More Than <br />
          Just <span className="text-primary-400">Coffee</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-gray-50 text-sm font-light mb-8 max-w-lg"
        >
          Premium coffee, fresh ingredients, and a unique experience.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              variant="primary"
              icon={FaArrowRight}
              onClick={() => console.log("Order Now clicked!")}
              className="text-sm"
            >
              Order Now
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="bottom-4 flex flex-1 w-full backdrop-blur-sm border bg-white/5 border-white/15 shadow-lg shadow-black/70 overflow-hidden rounded-xl max-w-md mx-auto z-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch size={20} className="text-gray-400 w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search menu..."
          className="w-full text-white placeholder-gray-400 text-sm rounded-full py-2.5 pl-11 pr-4 focus:outline-none transition-all duration-300"
        />
      </div>
    </section>
  );
};
