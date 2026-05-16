import React from "react";

export default function Header({
  cartCount,
  balance,
  theme,
  onToggleTheme,
  onScrollToShop,
  onOpenCart,
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="FeverBox">
        <span className="brand-mark" aria-hidden="true">
          F
        </span>
        <span>FeverBox</span>
      </a>

      <nav className="main-nav" aria-label="Основная навигация">
        <a href="#home">Главная</a>
        <button type="button" onClick={onScrollToShop}>
          Магазин
        </button>
        <a href="#help">Помощь</a>
      </nav>

      <div className="header-actions" aria-label="Информация пользователя">
        <button className="stat-pill stat-button" type="button" onClick={onOpenCart} title="Открыть корзину">
          <span className="stat-icon cart-icon" aria-hidden="true" />
          <strong>{cartCount}</strong>
        </button>
        <div className="stat-pill" title="Баланс">
          <span className="stat-icon wallet-icon" aria-hidden="true" />
          <strong>{balance} ₽</strong>
        </div>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label="Переключить светлую и темную тему"
          title="Переключить тему"
        >
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          <span className="theme-label">{theme === "dark" ? "Dark" : "Light"}</span>
        </button>
      </div>
    </header>
  );
}
