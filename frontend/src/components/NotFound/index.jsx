import React from 'react';
import styles from './NotFound.module.scss';
import {Link, Route} from "react-router-dom";
export const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>We can't seem to find the page you're looking for.</p>
      <Link to={"/"} className={"btn btn-outline-danger"}>Go Back Home</Link>
    </div>
  );
};