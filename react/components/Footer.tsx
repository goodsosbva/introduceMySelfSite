import styles from "../styles/home.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} ${styles.wrap}`}>
      <span>© 2026 권현성. Frontend Developer.</span>

      <a href="#main">맨 위로 ↑</a>
    </footer>
  );
}
