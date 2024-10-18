import React from "react";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {PasswordResetToken} from "../components/PasswordReset/PasswordResetToken";

export const PasswordResetConfirm = () => {
    return (
        <>
            <Header/>
            <PasswordResetToken/>
            <Footer/>
        </>
    )
}