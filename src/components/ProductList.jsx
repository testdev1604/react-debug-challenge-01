import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductList() {
  return (
    <section className="product-list">
      <h2 className="section-title">Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
