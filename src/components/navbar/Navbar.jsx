"use client";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Link from "next/link";

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
  return (
    <div className={styles.nav}>
      <div className={styles.navbar}>
        {NAV_LIST.map((item) => (
          <div key={item.id} className={styles.navList}>
            <Link href={item.url}>
              <h2
                className={
                  pathname === item.url ? styles.activeLink : styles.link
                }
              >
                {item.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
