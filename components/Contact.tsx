import styles from "../styles/home.module.css";

export default function Contact() {
  return (
    <section
      id="contact"
      className={`${styles.section} ${styles.contact} ${styles.wrap}`}
      aria-labelledby="contact-title"
    >
      <p className={styles["section-kicker"]}>GET IN TOUCH</p>

      <h2 id="contact-title">
        Let&apos;s talk<span>.</span>
      </h2>

      <p>함께 일할 이야기가 있다면 편하게 연락해 주세요.</p>

      <a href="mailto:goodsosbva@naver.com">goodsosbva@naver.com ↗</a>
    </section>
  );
}
