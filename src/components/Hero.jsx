import React from "react";
import { motion, useReducedMotion } from "motion/react";

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ onScrollToShop }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero section-shell" id="home">
      <motion.div
        className="hero-copy"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="section-kicker" variants={heroItem}>
          Донат-магазин Minecraft сервера
        </motion.p>
        <motion.h1 variants={heroItem}>FeverBox</motion.h1>
        <motion.p className="hero-subtitle" variants={heroItem}>
          Красно-черный серверный магазин с привилегиями, кейсами и быстрым checkout.
        </motion.p>

        <motion.div className="hero-actions" variants={heroItem}>
          <motion.button
            className="primary-button"
            type="button"
            onClick={onScrollToShop}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            Перейти в магазин
          </motion.button>
          <div className="online-card" aria-label="Онлайн сервера">
            <strong>0 из 0</strong>
            <span>играют сейчас</span>
          </div>
        </motion.div>

        <motion.div className="hero-metrics" variants={heroItem} aria-label="Преимущества магазина">
          <span>Моментальная выдача</span>
          <span>Демо-оплата</span>
          <span>Готово под API</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="visual-glow" />
        <div className="floating-cube cube-one">
          <span />
        </div>
        <div className="floating-cube cube-two">
          <span />
        </div>
        <motion.div
          className="server-core"
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="core-top" />
          <span className="core-face" />
          <span className="core-line line-one" />
          <span className="core-line line-two" />
        </motion.div>
        <div className="pixel-grid" />
      </motion.div>
    </section>
  );
}
