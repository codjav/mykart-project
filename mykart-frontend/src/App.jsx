import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { Orders } from "./pages/orders/Orders";
import { Tracking } from "./pages/tracking/Tracking";
import { NotFoundPage } from "./pages/notfound/NotFoundPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
      const response = await axios.get("/api/cart-items?expand=product")
      setCart(response.data);
    };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path="orders" element={<Orders cart={cart} loadCart={loadCart} />} />
        <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
