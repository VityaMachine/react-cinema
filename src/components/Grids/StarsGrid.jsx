import { NavLink } from "react-router-dom";

import styles from "./Grids.module.css";

export default function StarsGrid({ stars }) {
  return (
    <ul className={styles.cardList}>
      {stars.map((star) => {
        const { id, profile_path, name } = star;

        return (
          <li key={id} className={styles.card}>
            <NavLink className={styles.cardLink} to={`/person/${id}`}>
              <img
                className={styles.cardImg}
                src={`https://image.tmdb.org/t/p/h632/${profile_path}`}
                alt=""
              />

              <div className={styles.cardText}>
                <h4 className={styles.movieTitle}>{name}</h4>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
