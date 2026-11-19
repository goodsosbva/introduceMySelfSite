import Link from "next/link";
import styles from "../styles/home.module.css";

export default function Projects() {
  return (
    <section
      id="work"
      className={`${styles.section} ${styles.projects} ${styles.wrap}`}
      aria-labelledby="work-title"
    >
      <div className={styles["section-heading"]}>
        <p className={styles["section-kicker"]}>SELECTED WORK</p>

        <h2 id="work-title">
          Projects<span>.</span>
        </h2>

        <p className={styles["section-description"]}>
          만들고, 적용하고, 함께 사용한 기록입니다.
        </p>
      </div>

      <div className={styles["project-list"]}>
        <Link className={styles["project-row"]} href="/projects/common-ui">
          <span className={styles["project-number"]}>01</span>

          <div>
            <span className={styles.tag}>실무 / 공통 UI TF</span>

            <h3>공통 UI</h3>

            <p>
              공통 UI TF에서 테이블과 버튼 개발 및 개선에 참여하고, Storybook
              사용 가이드를 정리했습니다.
            </p>
          </div>

          <span className={styles["project-arrow"]} aria-hidden="true">
            ↗
          </span>
        </Link>

        <Link className={styles["project-row"]} href="/projects/citywatch">
          <span className={styles["project-number"]}>02</span>

          <div>
            <span className={styles.tag}>개인 프로젝트</span>

            <h3>CityWatch FE Lab</h3>

            <p>
              여러 프론트엔드 기술을 직접 적용하고 구현 구조를 살펴보는 학습
              프로젝트입니다.
            </p>
          </div>

          <span className={styles["project-arrow"]} aria-hidden="true">
            ↗
          </span>
        </Link>

        <Link className={styles["project-row"]} href="/projects/common-tester">
          <span className={styles["project-number"]}>03</span>

          <div>
            <span className={styles.tag}>협업 / 테스트 생성기</span>

            <h3>Common Tester</h3>

            <p>
              협업에서 테스트 생성에 사용한 도구입니다. 요구사항 근거와 테스트,
              실행 결과를 연결합니다.
            </p>
          </div>

          <span className={styles["project-arrow"]} aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
