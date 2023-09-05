import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./Layout.module.css";

import SearchInput from "../SearchInput";

export default function Layout({ searchQueryHandler, searchQuery }) {
  return (
    <>
      <header className={styles.header}>
        <NavLink className={styles.navLink} to="/">
          <h2 className={styles.title}>React cinema</h2>
        </NavLink>

        <SearchInput
          searchQueryHandler={searchQueryHandler}
          searchQuery={searchQuery}
        />
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>

      <footer className={styles.main}>
        <div className={styles.footerContainer}>
          <h2 className={styles.footerTitle}>
            <span className={styles.footerTitleBold}>Vilm</span> © 2023
          </h2>
          <h4>powered by tmdb </h4>
        </div>
      </footer>
    </>
  );
}
