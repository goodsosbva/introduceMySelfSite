import Link from "next/link";
import styles from "../styles/home.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${styles.wrap}`} aria-label="주요 메뉴">
        <a href="https://github.com/goodsosbva">GitHub ↗</a>

        <Link href="/" className={styles.brand} aria-label="권현성 홈">
          KHS
        </Link>

        <div className={styles["nav-links"]}>
          <a href="#profile">프로필</a>
          <a href="#work">프로젝트</a>
          <a href="#career">경력</a>
          <a href="#skills">기술</a>
          <a href="#contact">연락</a>
        </div>
      </nav>
    </header>
  );
}
