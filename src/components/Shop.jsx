import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import ProductCard from "./ProductCard.jsx";

export default function Shop({
  categories,
  products,
  activeCategory,
  onSelectCategory,
  onBuyProduct,
}) {
  const reduceMotion = useReducedMotion();
  const visibleProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section className="shop section-shell" id="shop">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Каталог FeverBox</p>
          <h2>Магазин</h2>
        </div>
        <p className="section-note">Выберите категорию, добавьте товары и оформите демо-заказ.</p>
      </div>

      <div className="shop-layout">
        <aside className="category-panel" aria-label="Категории товаров">
          <span className="category-title">Категории</span>
          {categories.map((category) => (
            <button
              className={category.id === activeCategory ? "category active" : "category"}
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              aria-pressed={category.id === activeCategory}
            >
              {category.label}
            </button>
          ))}
        </aside>

        <motion.div className="product-grid" layout={!reduceMotion}>
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onBuy={onBuyProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
