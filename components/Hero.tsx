import styles from "../styles/home.module.css";

export default function Hero() {
  return (
    <section
      className={`${styles.hero} ${styles.wrap}`}
      aria-labelledby="hero-title"
    >
      <p className={styles["hero-word"]} aria-hidden="true">
        Portfolio
      </p>

      <div className={styles.monogram} aria-hidden="true">
        <span>HS</span>
        <small>Frontend</small>
      </div>

      <p className={styles["hero-label"]}>FRONTEND DEVELOPER</p>

      <h1 id="hero-title">
        Hello, <em>I`m</em> 권현성<span>.</span>
      </h1>

      <a
        className={styles["scroll-down"]}
        href="#conversation"
        aria-label="소개로 이동"
      >
        ↓
      </a>
    </section>
  );
}
