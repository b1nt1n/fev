import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Shop from "./components/Shop.jsx";
import RecentPurchases from "./components/RecentPurchases.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import { addProductToCart } from "./services/shopApi.js";
import { categories, products, recentPurchases, socialLinks } from "./data/store.js";

const THEME_KEY = "feverbox-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return localStorage.getItem(THEME_KEY) || "dark";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const shopRef = useRef(null);

  const cartCount = cartItems.length;
  const balance = 0;

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price, 0),
    [cartItems],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToastMessage(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleScrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleToggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const handleBuyProduct = async (product) => {
    const response = await addProductToCart(product);

    if (response.ok) {
      setCartItems((items) => [...items, response.item]);
      setToastMessage(response.message);
    }
  };

  return (
    <>
      <Header
        cartCount={cartCount}
        balance={balance}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onScrollToShop={handleScrollToShop}
      />
      <main>
        <Hero onScrollToShop={handleScrollToShop} />
        <div ref={shopRef}>
          <Shop
            categories={categories}
            products={products}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onBuyProduct={handleBuyProduct}
          />
        </div>
        <section className="cart-preview section-shell" aria-label="Состояние корзины">
          <div>
            <p className="section-kicker">Демо-корзина</p>
            <h2>{cartCount} товаров выбрано</h2>
          </div>
          <strong>{cartTotal} ₽</strong>
        </section>
        <RecentPurchases purchases={recentPurchases} />
      </main>
      <Footer links={socialLinks} />
      <Toast message={toastMessage} />
    </>
  );
}
