import styles from "../styles/home.module.css";

export default function Skills() {
  return (
    <section
      id="skills"
      className={`${styles.section} ${styles.skills} ${styles.wrap}`}
      aria-labelledby="skills-title"
    >
      <div className={styles["section-heading"]}>
        <p className={styles["section-kicker"]}>WHAT I USE</p>

        <h2 id="skills-title">
          Skills<span>.</span>
        </h2>

        <p className={styles["section-description"]}>
          프론트엔드를 중심으로 서버와 인프라까지 필요한 기술을 익히고
          적용합니다.
        </p>
      </div>

      <div className={styles["skills-list"]}>
        <div>
          <h3>프론트엔드</h3>
          <p>React / Next.js / Vue 3 / TypeScript</p>
        </div>

        <div>
          <h3>서버</h3>
          <p>Node.js / NestJS / FastAPI</p>
        </div>

        <div>
          <h3>인프라와 배포</h3>
          <p>Docker / Kubernetes</p>
        </div>

        <div>
          <h3>AI 활용</h3>
          <p>LangChain / MCP / RAG</p>
        </div>

        <div>
          <h3>개발 구조와 품질</h3>
          <p>Monorepo / Module Federation / Storybook / Playwright</p>
        </div>
      </div>
    </section>
  );
}
