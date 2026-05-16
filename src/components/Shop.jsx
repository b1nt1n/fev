import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function Shop({
  categories,
  products,
  activeCategory,
  onSelectCategory,
  onBuyProduct,
}) {
  const visibleProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section className="shop section-shell" id="shop">
      <div className="section-heading">
        <p className="section-kicker">Каталог FeverBox</p>
        <h2>Магазин</h2>
      </div>

      <div className="shop-layout">
        <aside className="category-panel" aria-label="Категории товаров">
          {categories.map((category) => (
            <button
              className={category.id === activeCategory ? "category active" : "category"}
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </aside>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={onBuyProduct} />
          ))}
        </div>
      </div>
    </section>
  );
}
