import Link from "next/link";
import styles from "../styles/home.module.css";

export default function Profile() {
  return (
    <section
      id="profile"
      className={`${styles.section} ${styles.profile} ${styles.wrap}`}
      aria-labelledby="profile-title"
    >
      <div className={styles["section-heading"]}>
        <p className={styles["section-kicker"]}>ABOUT ME</p>

        <h2 id="profile-title">
          Profile<span>.</span>
        </h2>
      </div>

      <div className={styles["profile-intro"]}>
        <p className={styles["profile-lead"]}>
          사용자에게는 편리한 화면을,
          <br />
          동료에게는 함께 쓰기 좋은 구조를.
        </p>

        <p>
          프론트엔드 개발자 권현성입니다.
          <br />
          서비스를 만드는 과정에서 필요한 기술을 익히고 직접 적용합니다.
        </p>
      </div>

      <div id="career" aria-label="경력">
        <div className={styles["list-heading"]}>
          <h3>Experience</h3>

          <Link href="/career">
            경력 자세히 보기 <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <Link className={styles["career-row"]} href="/career#okestro">
          <strong>오케스트로</strong>
          <span>모니터링, 인프라 관리, 서비스 신청 화면과 공통 UI</span>
          <time>2023.09 — 현재</time>
          <b aria-hidden="true">↗</b>
        </Link>

        <Link className={styles["career-row"]} href="/career#casuri">
          <strong>카수리</strong>
          <span>정비 서비스 선택과 예약 화면</span>
          <time>2023.02 — 2023.08</time>
          <b aria-hidden="true">↗</b>
        </Link>

        <Link className={styles["career-row"]} href="/career#newsjelly">
          <strong>뉴스젤리</strong>
          <span>꼬맨틀 화면의 Vue 전환</span>
          <time>2022.12 — 2023.01</time>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
    </section>
  );
}
