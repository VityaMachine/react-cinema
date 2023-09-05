import styles from "./MoviesList.module.css";

import { NavLink } from "react-router-dom";

import noImgPlaceholder from "../../assets/img/no_img_placeholder.png";
import {ReactComponent as StarIcon} from '../../assets/icons/star-icon.svg'

export default function MoviesList({ movies }) {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => {
        const {
          id,
          backdrop_path,
          title,
          original_title,
          release_date,
          vote_average,
        } = movie;
        return (
          <li key={id}>
            <NavLink className={styles.link} to={`/movie/${id}`}>
              <div className={styles.card}>
                <div>
                  <img
                    src={
                      backdrop_path
                        ? `https://image.tmdb.org/t/p/w300${backdrop_path}`
                        : noImgPlaceholder
                    }
                    alt={original_title}
                    className={styles.img}
                  />
                </div>
                <div className={styles.infoContainer}>
                  <h4>{title}</h4>
                  <span className={styles.date}>{release_date.split("-").reverse().join(".")}</span>
                  <span className={styles.vote}><StarIcon className={styles.starIcon}/> {vote_average.toFixed(1)}</span>
                </div>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
