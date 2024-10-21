import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fullLogOut, logOut} from "../../redux/slices/userSlice";
import {clearTasks} from "../../redux/slices/taskSlice";
export const Logout = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user.isLogin) {
            dispatch(fullLogOut()).catch(err => console.log(err));
            dispatch(clearTasks());
        }
    }, []);
    return (
        <div className={"container text-center"} style={{minHeight: "600px", marginTop: "100px"}}>
            <h1>You logged out!</h1>
            <Link to={"/"} className={"btn btn-outline-primary mt-5"}>Go Back Home</Link>
        </div>
    );
}