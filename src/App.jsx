import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Shop from "./components/Shop.jsx";
import RecentPurchases from "./components/RecentPurchases.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import {
  addProductToCart,
  completeDemoPayment,
  createCheckoutSession,
  issueDemoDonation,
} from "./services/shopApi.js";
import { categories, products, recentPurchases, socialLinks } from "./data/store.js";

const THEME_KEY = "feverbox-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return localStorage.getItem(THEME_KEY) || "dark";
}

function normalizePlayerName(value) {
  return value.trim().replace(/\s+/g, "");
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [checkoutState, setCheckoutState] = useState("idle");
  const [lastOrder, setLastOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const shopRef = useRef(null);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );
  const balance = 0;

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [cartItems],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", isCartOpen);
    return () => document.body.classList.remove("drawer-open");
  }, [isCartOpen]);

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
      setCartItems((items) => {
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          return items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [...items, { product: response.item, quantity: 1 }];
      });
      setCheckoutState("idle");
      setLastOrder(null);
      setIsCartOpen(true);
      setToastMessage(response.message);
    }
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems((items) => {
      if (quantity <= 0) {
        return items.filter((item) => item.product.id !== productId);
      }

      return items.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(quantity, 99) } : item,
      );
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCheckoutState("idle");
    setLastOrder(null);
  };

  const handleCheckout = async () => {
    const cleanPlayerName = normalizePlayerName(playerName);

    if (!cleanPlayerName) {
      setToastMessage("Введите ник игрока");
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,16}$/.test(cleanPlayerName)) {
      setToastMessage("Ник должен быть 3-16 символов: буквы, цифры или _");
      return;
    }

    if (cartItems.length === 0) {
      setToastMessage("Корзина пуста");
      return;
    }

    setPlayerName(cleanPlayerName);
    setLastOrder(null);
    setCheckoutState("creating");

    try {
      const order = await createCheckoutSession({
        playerName: cleanPlayerName,
        items: cartItems,
        total: cartTotal,
      });

      setLastOrder(order);
      setCheckoutState("payment");

      const paidOrder = await completeDemoPayment(order);
      setLastOrder(paidOrder);
      setCheckoutState("paid");
      window.setTimeout(() => setCheckoutState("issuing"), 160);

      const issuedOrder = await issueDemoDonation(paidOrder);
      setLastOrder(issuedOrder);
      setCartItems([]);
      setCheckoutState("issued");
      setToastMessage("Демо-оплата прошла, донат выдан");
    } catch {
      setCheckoutState("idle");
      setToastMessage("Не удалось оформить заказ");
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
        onOpenCart={() => setIsCartOpen(true)}
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
            <p className="section-kicker">Checkout</p>
            <h2>{cartCount} товаров выбрано</h2>
          </div>
          <div className="cart-preview-actions">
            <strong>{cartTotal} ₽</strong>
            <button className="ghost-button" type="button" onClick={() => setIsCartOpen(true)}>
              Открыть корзину
            </button>
          </div>
        </section>
        <RecentPurchases purchases={recentPurchases} />
      </main>
      <Footer links={socialLinks} />
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        total={cartTotal}
        playerName={playerName}
        checkoutState={checkoutState}
        lastOrder={lastOrder}
        onClose={() => setIsCartOpen(false)}
        onPlayerNameChange={setPlayerName}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onClear={handleClearCart}
        onCheckout={handleCheckout}
      />
      <Toast message={toastMessage} />
    </>
  );
}
