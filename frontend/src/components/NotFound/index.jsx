import React from 'react';
import styles from './NotFound.module.scss';
export const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>We can't seem to find the page you're looking for.</p>
      <a href="/" className={styles.backHome}>Go Back Home</a>
    </div>
  );
};