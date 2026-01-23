import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [ searchParams ] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    let getHomeData;
    if (search) {
      getHomeData = async () => {
        const response = await axios.get(`/api/products?search=${search}`)
        setProducts(response.data);
      }
    }else {
      getHomeData = async () => {
        const response = await axios.get("/api/products")
        setProducts(response.data);
      };
    }

    getHomeData();
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>MyKart Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
