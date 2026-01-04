"use client";
import styles from "./Button.module.css";

const Button = ({ title, handleClick }) => {
  return (
    <button className={styles.addToCart} onClick={handleClick}>
      {title}
    </button>
  );
};

export default Button;
