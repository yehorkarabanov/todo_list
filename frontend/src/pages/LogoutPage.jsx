import React from "react";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Logout} from "../components/Logout";

export const LogoutPage = () => {
    return (
        <>
            <Header/>
            <Logout/>
            <Footer/>
        </>
    )
}