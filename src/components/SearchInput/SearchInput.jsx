import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

import styles from "./SearchInput.module.css";

import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";

export default function SearchInput() {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("search")) {
      setInputValue(searchParams.get("name"));
    } else {
      setInputValue("");
    }
  }, [location.pathname, searchParams]);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;

    if (query.length === 0) {
      return;
    }

    navigate(`/search?name=${query.split(" ").join("+")}&page=1`);
  };

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input
        className={styles.searchInput}
        type="search"
        name="search"
        value={inputValue}
        onChange={inputHandler}
      />
      <button type="submit" className={styles.searchBtn}>
        <SearchIcon className={styles.searchIcon} />
      </button>
    </form>
  );
}
