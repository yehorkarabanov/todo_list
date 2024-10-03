import React from "react";
import {Link} from "react-router-dom";
import styles from "./Welcome.module.scss";

export const Welcome = () => {
    return (
        <div className={styles.welcomeContainer}>
            <h2>Welcome to the TO-DO List App!</h2>
            <p>To use this app, please log in or register.</p>
            <div className={styles.buttons}>
                <Link to="/login" className={styles.button}>Login</Link>
                <Link to="/register" className={styles.button}>Register</Link>
            </div>
        </div>
    )

}