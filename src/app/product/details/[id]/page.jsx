"use client";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

function ProductDetails() {
  const { id } = useParams();
  const [product, setproduct] = useState(null);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setproduct(data));
  }, []);

  if (product === null) return;
  <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.detailsCard}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className={styles.image}
          />
        </div>
        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.priceRating}>
            <p className={styles.price}>${product.price}</p>
            <div className={styles.rating}>
              ⭐ {product.rating.rate}
              <span className={styles.count}>
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
