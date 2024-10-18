import React from "react";
import {Link} from "react-router-dom";
import styles from "./Welcome.module.scss";
import {LOGIN_PATH, REGISTER_PATH} from "../../utils/settings";

export const Welcome = () => {
    return (
        <div className={styles.welcomeContainer}>
            <h2>Welcome to the TO-DO List App!</h2>
            <p>To use this app, please log in or register.</p>
            <div className={styles.buttons}>
                <Link to={LOGIN_PATH} className={styles.button}>Login</Link>
                <Link to={REGISTER_PATH} className={styles.button}>Register</Link>
            </div>
        </div>
    )

}