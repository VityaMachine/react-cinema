import React, { useEffect, useState } from "react";
import tmdbAPI from "../../services/tmdbAPI";

import styles from "./HomePage.module.css";

import Spinner from "react-bootstrap/Spinner";

import Status from "../../services/statusData";

import sadFace from "../../assets/img/sad_emogi.png";
import sadFrog from "../../assets/img/sad_frog.png";
import CustomCarousel from "../../components/CustomCarousel";
import MoviesGrid from "../../components/Grids/MoviesGrid";
import StarsGrid from "../../components/Grids/StarsGrid";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [errorMovies, setErrorMovies] = useState(null);
  const [statusMovies, setStatusMovies] = useState(Status.IDLE);

  const [stars, setStars] = useState(null);
  const [errorStars, setErrorStars] = useState(null);
  const [statusStars, setStatusStars] = useState(Status.IDLE);

  useEffect(() => {
    setStatusMovies(Status.PENDING);
    tmdbAPI
      .getTrendingMovies()
      .then((moviesData) => {
        if (moviesData.total_results === 0) {
          setErrorMovies({ code: 404, message: `Films not found` });
          setStatusMovies(Status.REJECTED);
          return;
        }

        setMovies(moviesData.results);
        setStatusMovies(Status.RESOLVED);
      })
      .catch((error) => {
        setErrorMovies(error);
        setStatusMovies(Status.REJECTED);
      });

    setStatusStars(Status.PENDING);
    tmdbAPI
      .getPopularStars()
      .then((starsData) => {
        if (starsData.total_results === 0) {
          setErrorStars({ code: 404, message: `Stars not found` });
          setStatusStars(Status.REJECTED);
          return;
        }

        setStars(starsData.results);
        setStatusStars(Status.RESOLVED);
      })
      .catch((error) => {
        setErrorStars(error);
        setStatusStars(Status.REJECTED);
      });
  }, []);

  // Markup Data Object
  const markupData = {
    carousel: "",
    films: "",
    stars: "",
  };

  // Idle markup
  if (statusMovies === Status.IDLE) {
    markupData.films = (
      <div className={styles.idleText}>Preparing to load films data</div>
    );
  }

  if (statusStars === Status.IDLE) {
    markupData.stars = (
      <div className={styles.idleText}>Preparing to load stars data</div>
    );
  }

  // pending markup
  if (statusMovies === Status.PENDING) {
    markupData.films = (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (statusStars === Status.PENDING) {
    markupData.stars = (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  // resolved markup

  if (statusMovies === Status.RESOLVED) {
    // carousel markup
    markupData.carousel = <CustomCarousel movies={movies} />;

    // film list markup
    markupData.films = (
      <div className={styles.container}>
        <h3 className={styles.title}>Now in Production</h3>
        <MoviesGrid movies={movies} />
      </div>
    );
  }

  if (statusStars === Status.RESOLVED) {
    // stars list markup
    markupData.stars = (
      <div className={styles.container}>
        <h3 className={styles.title}>Popular stars</h3>
        <StarsGrid stars={stars} />
      </div>
    );
  }

  // rejjected markup
  if (statusMovies === Status.REJECTED) {
    markupData.films = (
      <div className={styles.errorContainer}>
        <img src={sadFace} alt="movies_problem" className={styles.errorImg} />
        <h3 className={styles.errorMsg}>
          {errorMovies?.message
            ? errorMovies.message
            : "Unexpected movies error"}
        </h3>
      </div>
    );
  }

  if (statusStars === Status.REJECTED) {
    markupData.stars = (
      <div className={styles.errorContainer}>
        <img src={sadFrog} alt="stars_problem" className={styles.errorImg} />
        <h3 className={styles.errorMsg}>
          {errorStars?.message ? errorStars.message : "Unexpected stars error"}
        </h3>
      </div>
    );
  }

  return (
    <>
      {markupData.carousel}
      {markupData.films}
      {markupData.stars}
    </>
  );
}
