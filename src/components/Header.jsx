import { useCart } from "../context/CartContext";

export default function Header({ onViewCart, showingCart }) {
  const { totalItems } = useCart();

  return (
    <header className="store-header">
      <h1 className="store-logo" onClick={() => onViewCart(false)}>
        ShopReact
      </h1>
      <button
        className="cart-button"
        data-testid="cart-link"
        onClick={() => onViewCart(!showingCart)}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span className="cart-badge" data-testid="cart-count">
          {totalItems}
        </span>
      </button>
    </header>
  );
}
