import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import styles from "./MoviePage.module.css";

import tmdbAPI from "../../services/tmdbAPI";
import Status from "../../services/statusData";

import Spinner from "react-bootstrap/Spinner";

import { ReactComponent as StarIcon } from "../../assets/icons/star-icon.svg";
import sadFrog from "../../assets/img/sad_frog.png";

export default function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [loadStatus, setLoadStatus] = useState(Status.IDLE);
  const [loadError, setLoadError] = useState(null);

  const params = useParams();

  useEffect(() => {
    setLoadStatus(Status.PENDING);

    tmdbAPI
      .getMovieById(params.id)
      .then((modiveData) => {
        setMovie(modiveData);
        setLoadStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setLoadError(error);
        setLoadStatus(Status.REJECTED);
      });
  }, [params.id]);

  if (loadStatus === Status.IDLE) {
    return <div>Preparing to load movie with id: {params.id}</div>;
  }

  if (loadStatus === Status.PENDING) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (loadStatus === Status.RESOLVED) {
    const {
      backdrop_path,
      poster_path,
      original_title,
      title,
      release_date,
      vote_average,
      overview,
      genres,
      production_companies,
    } = movie;

    return (
      <div className={styles.container}>
        <div className={styles.imagesContainer}>
          <img
            className={styles.backdropImg}
            src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
            alt={original_title}
          />
        </div>
        <div className={styles.posterContainer}>
          <img
            className={styles.posterImg}
            src={`https://image.tmdb.org/t/p/w342${poster_path}`}
            alt={original_title}
          />
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoHead}>
            <h2 className={styles.title}>
              {title} ({release_date.substring(0, 4)})
            </h2>
            <div className={styles.subtitleBox}>
              <span className={styles.starContainer}>
                <StarIcon className={styles.starIcon} />
                {vote_average.toFixed(1)}
              </span>
              <NavLink
                to={`/movie/${params.id}/videos`}
                className={styles.trailerBtn}
              >
                Watch video's
              </NavLink>
            </div>
          </div>
          <div className={styles.mainBox}>
            <h4 className={styles.mainBoxTitle}>Overview</h4>
            <p className={styles.overviewText}>{overview}</p>

            <h4 className={styles.mainBoxTitle}>Genres</h4>
            <ul>
              {genres.map((genre) => (
                <li className={styles.genresListItem} key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>

            <h4 className={styles.mainBoxTitle}>Companies</h4>
            <ul>
              {production_companies.map((company) => (
                <li className={styles.genresListItem} key={company.id}>
                  {company.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (loadStatus === Status.REJECTED) {
    return (
      <div className={styles.rejectContainer}>
        <img src={sadFrog} alt="SadFrogMeme" className={styles.errorImg} />
        <h3>Something going wrong</h3>
        {loadError.message && <h4>{loadError.message}</h4>}
      </div>
    );
  }
}
