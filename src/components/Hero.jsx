import React from "react";

export default function Hero({ onScrollToShop }) {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <p className="section-kicker">Донат-магазин Minecraft сервера</p>
        <h1>FeverBox</h1>
        <p className="hero-subtitle">Minecraft сервер</p>
        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={onScrollToShop}>
            Перейти в магазин
          </button>
          <div className="online-card" aria-label="Онлайн сервера">
            <strong>0 из 0</strong>
            <span>играют сейчас</span>
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="floating-cube cube-one">
          <span />
        </div>
        <div className="floating-cube cube-two">
          <span />
        </div>
        <div className="server-core">
          <span className="core-top" />
          <span className="core-face" />
          <span className="core-line line-one" />
          <span className="core-line line-two" />
        </div>
        <div className="pixel-grid" />
      </div>
    </section>
  );
}
