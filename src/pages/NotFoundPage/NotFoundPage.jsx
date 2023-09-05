import shruggingImg from "../../assets/img/shrugging_man.png";

import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <img src={shruggingImg} alt="404" className={styles.img} />
      <h2 className={styles.title}>404!!!</h2>
      <h4 className={styles.subtitle}>Ooops!!! Page not found!!!</h4>
    </div>
  );
}
