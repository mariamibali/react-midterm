"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartFetch = async () => {
      const res = await fetch(`https://fakestoreapi.com/carts/2`);
      const data = await res.json();

      const productDetails = await Promise.all(
        data.products.map(async (item) => {
          const prodRes = await fetch(
            `https://fakestoreapi.com/products/${item.productId}`
          );
          const prodData = await prodRes.json();
          return { ...prodData, quantity: item.quantity };
        })
      );
      setCartItems(productDetails);
    };
    cartFetch();
  }, []);

  const increase = (id) => {
    setCartItems((items) =>
      items.map((product) =>
        product.id === id && product.quantity < 10
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrease = (id) => {
    setCartItems((items) =>
      items.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <div className={styles.cartWrapper}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      {cartItems.map((item) => (
        <div className={styles.cartItem} key={item.id}>
          <div className={styles.itemDetails}>
            <div className={styles.imageWrapper}>
              <Image src={item.image} width={80} height={80} alt={item.title} />
              <h3 className={styles.title}>{item.title}</h3>
            </div>
            <p className={styles.price}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <div className={styles.quantity}>
            <button onClick={() => decrease(item.id)}>-</button>
            <span className={styles.itemQuantity}>{item.quantity}</span>
            <button onClick={() => increase(item.id)}>+</button>
          </div>
          <button className={styles.removeBtn}>{"🚫"}</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
