import React from "react";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {PasswordReset} from "../components/PasswordReset";

export const PasswordResetEmail = () => {
    return (
        <>
            <Header/>
            <PasswordReset/>
            <Footer/>
        </>
    )
}