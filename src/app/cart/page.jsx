"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
} from "@/lib/slices/cartSlice";

const Cart = () => {
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const dispatch = useAppDispatch();

  const increase = (item) => {
    dispatch(addToCart(item));
  };
  const decrease = (item) => {
    dispatch(decreaseQuantity(item));
  };

  return (
    <div className={styles.cartWrapper}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      {cartProducts.map((item) => (
        <div className={styles.cartItem} key={item.id}>
          <div className={styles.itemDetails}>
            <div className={styles.imageWrapper}>
              <Link href={`/product/details/${item.id}`}>
                <Image
                  src={item.image}
                  width={80}
                  height={80}
                  alt={item.title}
                  style={{ cursor: "pointer" }}
                />
              </Link>
              <h3 className={styles.title}>{item.title}</h3>
            </div>
            <p className={styles.price}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <div className={styles.quantity}>
            <button onClick={() => decrease(item)}>-</button>
            <span className={styles.itemQuantity}>{item.quantity}</span>
            <button onClick={() => increase(item)}>+</button>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => dispatch(deleteFromCart(item))}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
