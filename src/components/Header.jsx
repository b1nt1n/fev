import React from "react";
import { motion, useReducedMotion } from "motion/react";

export default function Header({
  cartCount,
  balance,
  theme,
  onToggleTheme,
  onScrollToShop,
  onOpenCart,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <header className="site-header">
      <motion.a
        className="brand"
        href="#home"
        aria-label="FeverBox"
        whileHover={reduceMotion ? undefined : { y: -1 }}
      >
        <span className="brand-mark" aria-hidden="true">
          F
        </span>
        <span>FeverBox</span>
      </motion.a>

      <nav className="main-nav" aria-label="Основная навигация">
        <a href="#home">Главная</a>
        <button type="button" onClick={onScrollToShop}>
          Магазин
        </button>
        <a href="#help">Помощь</a>
      </nav>

      <div className="header-actions" aria-label="Информация пользователя">
        <motion.button
          className="stat-pill stat-button"
          type="button"
          onClick={onOpenCart}
          title="Открыть корзину"
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        >
          <span className="stat-icon cart-icon" aria-hidden="true" />
          <strong>{cartCount}</strong>
        </motion.button>
        <div className="stat-pill" title="Баланс">
          <span className="stat-icon wallet-icon" aria-hidden="true" />
          <strong>{balance} ₽</strong>
        </div>
        <motion.button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label="Переключить светлую и темную тему"
          title="Переключить тему"
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        >
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          <span className="theme-label">{theme === "dark" ? "Dark" : "Light"}</span>
        </motion.button>
      </div>
    </header>
  );
}
