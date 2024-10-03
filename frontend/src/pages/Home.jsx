import React from "react";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Welcome} from "../components/Welcome";
import {TodoList} from "../components/TodoList";

export const Home = () => {
    return (
        <>
            <Header/>
            <Welcome/>
            <TodoList/>
            <Footer/>
        </>
    )
}