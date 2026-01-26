"use client";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useAppSelector } from "@/lib/hook";
import { selectTotalQuantity } from "@/lib/slices/cartSlice";

const NAV_LIST = [
  {
    id: 1,
    title: "Products",
    url: "/",
  },
  {
    id: 2,
    title: "Profile",
    url: "/profile",
  },
  {
    id: 3,
    title: "Cart",
    url: "/cart",
  },
];
const Navbar = () => {
  const pathname = usePathname();
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <div className={styles.nav}>
      <div className={styles.navbar}>
        {NAV_LIST.map((item) => (
          <Link href={item.url} key={item.id} className={styles.navList}>
            <div className={styles.linkWrapper}>
              <h2
                className={
                  pathname === item.url ? styles.activeLink : styles.link
                }
              >
                {item.title}
              </h2>
              {item.url === "/cart" && totalQuantity > 0 && (
                <span className={styles.badge}>{totalQuantity}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
