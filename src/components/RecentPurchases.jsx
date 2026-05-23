import React from "react";
import { motion, useReducedMotion } from "motion/react";

export default function RecentPurchases({ purchases }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="recent section-shell" aria-labelledby="recent-title">
      <div className="section-heading compact">
        <div>
          <p className="section-kicker">Активность сервера</p>
          <h2 id="recent-title">Последние покупки</h2>
        </div>
      </div>

      <div className="purchase-list">
        {purchases.map((purchase, index) => (
          <motion.article
            className="purchase-item"
            key={purchase.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.24, delay: Math.min(index * 0.04, 0.18) }}
          >
            <div className="avatar-block" aria-hidden="true">
              {purchase.player.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3>{purchase.player}</h3>
              <p>
                купил <strong>{purchase.product}</strong>
              </p>
            </div>
            <time>{purchase.time}</time>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
