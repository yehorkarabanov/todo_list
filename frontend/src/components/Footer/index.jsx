import React from "react";
import {Link} from "react-router-dom";
import {LOGIN_PATH, REGISTER_PATH} from "../../utils/settings";

export const Footer = () => {
    return (
        <footer className={`py-3 my-4`}>
            <ul className={`nav justify-content-center border-bottom pb-3 mb-3`}>
                <li className={`nav-item`}>
                    <Link to={"/"} className={`nav-link px-2 text-muted`}>Home</Link>
                </li>
                <li className={`nav-item`}>
                    <Link to={LOGIN_PATH} className={`nav-link px-2 text-muted`}>Login</Link>
                </li>
                <li className={`nav-item`}>
                    <Link to={"/logout"} className={`nav-link px-2 text-muted`}>Logout</Link>
                </li>
                <li className={`nav-item`}>
                    <Link to={REGISTER_PATH} className={`nav-link px-2 text-muted`}>Register</Link>
                </li>
            </ul>
            <p className={`text-center text-muted`}>© {new Date().getFullYear()} TO-DO list, Inc</p>
        </footer>
    );
}