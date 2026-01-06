"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/button/Button";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  if (products.length === 0) {
    return <div className={styles.loading}>products are fetching...</div>;
  }
  const handleAddToCart = (item) => {
    console.log("item added");
  };

  return (
    <div className={styles.productContainer}>
      {products?.map((item) => (
        <div className={styles.itemWrapper} key={item.id}>
          <Link href={`/product/details/${item.id}`}>
            <Image
              src={item.image}
              width={100}
              height={80}
              style={{ objectFit: "contain" }}
              alt={item.title}
            />
          </Link>
          <div>
            <p className={styles.ship}>Ships to Ukraine</p>
            <Link href={`/product/details/${item.id}`}>
              <h3 className={styles.title}>{item.title}</h3>
            </Link>
            <div className={styles.ratingPrice}>
              <p className={styles.rate}>{item.rating.rate} reviews</p>
              <div className={styles.priceContainer}>
                <p className={styles.price}>${item.price}</p>
                <p className={styles.oldPrice}>
                  ${(item.price * 1.2).toFixed(2)}
                </p>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                title={"🛒 Add To Cart"}
                handleClick={() => handleAddToCart(item)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
