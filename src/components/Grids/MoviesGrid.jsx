import { NavLink } from "react-router-dom";

import styles from "./Grids.module.css";

export default function MoviesGrid({ movies }) {
  return (
    <ul className={styles.cardList}>
      {movies.map((movie) => {
        const { id, poster_path, title, release_date } = movie;

        return (
          <li key={id} className={styles.card}>
            <NavLink className={styles.cardLink} to={`/movie/${id}`}>
              <img
                className={styles.cardImg}
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
              />

              <div className={styles.cardText}>
                <h4 className={styles.movieTitle}>{title}</h4>
                <h5 className={styles.movieYear}>
                  {release_date.substring(0, 4)}
                </h5>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
