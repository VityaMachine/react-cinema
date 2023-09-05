import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./StarPage.module.css";

import Spinner from "react-bootstrap/Spinner";

import tmdbAPI from "../../services/tmdbAPI";
import Status from "../../services/statusData";

import sadFrog from "../../assets/img/sad_frog.png";

export default function StarPage() {
  const [statusData, setStatusData] = useState(Status.IDLE);
  const [personData, setPersonData] = useState(null);
  const [personError, setPersonError] = useState(null);

  const params = useParams();
  const personId = params.id;

  useEffect(() => {
    setStatusData(Status.PENDING);

    tmdbAPI
      .getPersonById(personId)
      .then((data) => {
        setPersonData(data);
        setStatusData(Status.RESOLVED);
      })
      .catch((error) => {
        setPersonError(error);
        setStatusData(Status.REJECTED);
      });
  }, [personId]);

  if (statusData === Status.IDLE) {
    return <div className={styles.container}>Preparing to get person data</div>;
  }

  if (statusData === Status.PENDING) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (statusData === Status.RESOLVED) {
    return (
      <div className={styles.container}>
        <div className={styles.infoBox}>
          <div className={styles.profileImgBox}>
            <img
              src={`https://image.tmdb.org/t/p/h632${personData.profile_path}`}
              alt={personData.name}
              className={styles.profileImg}
            />
          </div>
          <div className={styles.profileTextBox}>
            <h3 className={styles.name}>Name: {personData.name}</h3>
            <div className={styles.about}>
              Birth Date: {personData.birthday.split("-").reverse().join(".")}
            </div>
            <div className={styles.about}>
              Birth Place: {personData.place_of_birth}
            </div>
            <div className={styles.about}>
              Gender: {personData.gender === 1 ? "Female" : "Male"}
            </div>

            <h4 className={styles.bioTitle}>Biography</h4>
            <p className={styles.biography}>{personData.biography}</p>
          </div>
        </div>
      </div>
    );
  }

  if (statusData === Status.REJECTED) {
    return (
      <div className={styles.errorContainer}>
        <img src={sadFrog} alt="error_img" className={styles.errorImg} />
        <h4 className={styles.errorTitle}>Person not found</h4>
      </div>
    );
  }
}
