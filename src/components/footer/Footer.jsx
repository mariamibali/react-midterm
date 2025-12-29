import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <Link className={styles.footerLink} href="#">
            Conditions of Use
          </Link>
          <Link className={styles.footerLink} href="#">
            Privacy Notice
          </Link>
          <Link className={styles.footerLink} href="#">
            Interest-Based Ads
          </Link>
        </div>
        <div>
          <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </footer>
    </div>
  );
}
