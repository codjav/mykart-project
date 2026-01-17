import axios from "axios";
import { useState, useEffect } from "react";
import { OrdersGrid } from "./OrdersGrid";
import { Header } from "../../components/Header";
import "./Orders.css";

export function Orders({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
