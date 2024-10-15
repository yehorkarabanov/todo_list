import React from "react";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Welcome} from "../components/Welcome";
import {TodoList} from "../components/TodoList";
import {useSelector} from "react-redux";

export const Home = () => {
    const user = useSelector((state) => state.user);
    return (
        <>
            <Header/>
            {user.isLogin ?
                <TodoList/>
                :
                <Welcome/>
            }
            <Footer/>
        </>
    )
}