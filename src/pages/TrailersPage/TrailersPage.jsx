import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./TrailersPage.module.css";

import Status from "../../services/statusData";
import tmdbAPI from "../../services/tmdbAPI";

import Spinner from "react-bootstrap/Spinner";

import YouTube from "react-youtube";

import sadFrog from "../../assets/img/sad_frog.png";

export default function TrailersPage() {
  const [videosData, setVideosData] = useState([]);
  const [videosError, setVideosError] = useState(null);
  const [statusData, setStatusData] = useState(Status.IDLE);
  const [player, setPlayer] = useState(null);

  const params = useParams();
  const movieId = params.id;

  const onReady = (e) => {
    setPlayer(e.target);
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    setStatusData(Status.PENDING);

    tmdbAPI
      .getTrailersForMovieById(movieId)
      .then((data) => {
        const ytData = data.results
          .filter(
            (item) =>
              item.site.toLowerCase() === "youtube" &&
              item.official &&
              (item.type === "Clip" ||
                item.type === "Teaser" ||
                item.type === "Trailer")
          )
          .map((item) => {
            const { id, type, name, key } = item;
            return { id, type, name, key };
          });

        setVideosData(ytData);
        setStatusData(Status.RESOLVED);
      })
      .catch((error) => {
        setVideosError(error);
        setStatusData(Status.REJECTED);
      });
  }, [movieId]);

  if (statusData === Status.IDLE) {
    return <div className={styles.container}>Preparing to load videos</div>;
  }

  if (statusData === Status.PENDING) {
    return (
      <div className={styles.container}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (statusData === Status.RESOLVED) {
    return (
      <div className={styles.container}>
        <ul className={styles.list}>
          {videosData.map((video) => (
            <li key={video.id} className={styles.listItem}>
              <div className={styles.type}>{video.type}</div>
              <h2 className={styles.title}>{video.name}</h2>
              <YouTube videoId={video.key} onReady={onReady} opts={opts} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (statusData === Status.REJECTED) {
    return (
      <div className={styles.errorContainer}>
        <img src={sadFrog} alt="error_img" className={styles.errorImg} />
        <h4 className={styles.errorTitle}>
          Not found related video's to selected movie
        </h4>
      </div>
    );
  }
}
