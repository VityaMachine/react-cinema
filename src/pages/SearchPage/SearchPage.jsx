import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./SearchPage.module.css";

import tmdbAPI from "../../services/tmdbAPI";
import Status from "../../services/statusData";

import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";

import MoviesList from "../../components/MoviesList";

import sadFace from "../../assets/img/sad_emogi.png";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchData, setSearchData] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [searchStatus, setSearchStatus] = useState(Status.PENDING);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const movieQuery = searchParams.get("name");
  const movieQueryPage = searchParams.get("page");

  useEffect(() => {
    setSearchStatus(Status.PENDING);

    tmdbAPI
      .getMoviesByQuery(movieQuery, movieQueryPage)
      .then((data) => {
        if (data.total_results === 0) {
          setSearchError(new Error(`movies ${movieQuery} not found`));
          setSearchStatus(Status.REJECTED);
          return;
        }

        setSearchData(data.results);
        setPage(data.page);
        setTotalPages(data.total_pages);
        setSearchStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setSearchError(error);
        setSearchStatus(Status.REJECTED);
      });
  }, [movieQuery, movieQueryPage]);

  const pageHandler = (action) => {
    switch (action) {
      case "first":
        setPage(1);
        setSearchParams({ name: movieQuery, page: 1 });
        break;
      case "prev":
        setPage((page) => page - 1);
        setSearchParams({ name: movieQuery, page: page - 1 });
        break;
      case "next":
        setPage((page) => page + 1);
        setSearchParams({ name: movieQuery, page: page + 1 });
        break;
      case "last":
        setPage(totalPages);
        setSearchParams({ name: movieQuery, page: totalPages });
        break;
      default:
        return;
    }
  };

  if (searchStatus === Status.IDLE) {
    return (
      <div className={styles.container}>
        Preparing to looking for {movieQuery}
      </div>
    );
  }

  if (searchStatus === Status.PENDING) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (searchStatus === Status.RESOLVED) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Results for: {movieQuery}</h2>
        <MoviesList movies={searchData} />

        <Pagination size="lg" data-bs-theme="dark">
          <Pagination.First
            disabled={page === 1}
            onClick={() => pageHandler("first")}
          />
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => pageHandler("prev")}
          />
          <Pagination.Item disabled>{page}</Pagination.Item>
          <Pagination.Next
            disabled={page === totalPages}
            onClick={() => pageHandler("next")}
          />
          <Pagination.Last
            disabled={page === totalPages}
            onClick={() => pageHandler("last")}
          />
        </Pagination>
      </div>
    );
  }

  if (searchStatus === Status.REJECTED) {
    return (
      <div className={styles.container}>
        <img src={sadFace} alt="not_found_img" className={styles.errorImg} />
        <h3 className={styles.errorMsg}>
          {searchError.message ? searchError.message : "Unexpected error"}
        </h3>
      </div>
    );
  }
}

export default SearchPage;
