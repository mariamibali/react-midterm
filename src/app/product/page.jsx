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

  if (products === null) {
    return <div>products are fetching</div>;
  }
  const handleAddToCart = (item) => {
    console.log("item added");
  };

  return (
    <div className={styles.productContainer}>
      {products?.map((item) => (
        <div className={styles.itemWrapper} key={item.id}>
          <Image
            src={item.image}
            width={100}
            height={80}
            style={{ objectFit: "contain" }}
            alt={item.title}
          />
          <div>
            <p className={styles.ship}>Ships to Ukraine</p>
            <h3 className={styles.title}>{item.title}</h3>
            <Link href={`/product/details/${item.id}`}>
              <p className={styles.seeDetails}>see details</p>
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
                title={"Add To Cart"}
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
