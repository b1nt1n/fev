import React from "react";

export default function RecentPurchases({ purchases }) {
  return (
    <section className="recent section-shell" aria-labelledby="recent-title">
      <div className="section-heading compact">
        <p className="section-kicker">Активность сервера</p>
        <h2 id="recent-title">Последние покупки</h2>
      </div>

      <div className="purchase-list">
        {purchases.map((purchase) => (
          <article className="purchase-item" key={purchase.id}>
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
          </article>
        ))}
      </div>
    </section>
  );
}
