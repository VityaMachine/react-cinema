import { NavLink } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import { ReactComponent as StarIcon } from "../../assets/icons/star-icon.svg";

import styles from "./CustomCarousel.module.css";

export default function CustomCarousel({ movies }) {
  const randomMoviesIds = [];

  if (movies.length > 0) {
    while (randomMoviesIds.length < 3) {
      const randomIndex = Math.floor(Math.random() * movies.length);

      if (randomMoviesIds.includes(movies[randomIndex].id)) {
        return;
      }
      randomMoviesIds.push(movies[randomIndex].id);
    }
  }

  const randomMovies = randomMoviesIds.map((id) =>
    movies.find((movie) => movie.id === id)
  );

  return (
    <div className={styles.carouselContainer}>
      <Carousel>
        {randomMovies.map((movie) => {
          const { id, backdrop_path, title, overview, vote_average } = movie;

          return (
            <Carousel.Item interval={10000} key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
                alt=""
                className="d-block w-100"
              />

              <div className={styles.carouselInfoBlock}>
                <div className={styles.carouselInfoBlockBackdrop}>
                  <NavLink className={styles.carouselLink} to={`/movie/${id}`}>
                    <h4 className={styles.carouselTitle}>{title}</h4>
                  </NavLink>

                  {overview && (
                    <>
                      <p className={styles.carouselText}>{overview}</p>
                      <span className={styles.popularity}>
                        <StarIcon className={styles.starIcon} />
                        {vote_average.toFixed(1)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
