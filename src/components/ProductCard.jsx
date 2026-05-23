import React from "react";
import { motion, useReducedMotion } from "motion/react";
import ProductIcon from "./ProductIcon.jsx";

export default function ProductCard({ product, index = 0, onBuy }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`product-card tone-${product.tone}`}
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
      transition={{
        duration: 0.26,
        delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.14),
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.22 },
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      <div className="product-media" aria-hidden="true">
        <ProductIcon product={product} />
      </div>
      <div className="product-body">
        <span className="product-badge">{product.badge}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <small>{product.delivery.label}</small>
      </div>
      <div className="product-footer">
        <strong>{product.price} ₽</strong>
        <motion.button
          type="button"
          onClick={() => onBuy(product)}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        >
          Купить
        </motion.button>
      </div>
    </motion.article>
  );
}
