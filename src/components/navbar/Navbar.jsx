"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/cart">Cart</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
