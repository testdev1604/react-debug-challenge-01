import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [showingCart, setShowingCart] = useState(false);

  return (
    <div className="app">
      <Header onViewCart={setShowingCart} showingCart={showingCart} />
      <main>{showingCart ? <Cart /> : <ProductList />}</main>
    </div>
  );
}

export default App;
