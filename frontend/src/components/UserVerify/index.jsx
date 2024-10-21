import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {API_URL, baseAxiosSettings, VERIFY_MAIL_PATH} from "../../utils/settings";
import {useDispatch} from "react-redux";
import {setTokens} from "../../redux/slices/userSlice";
import {delay} from "lodash"
import axios from "axios";
import {getTasks} from "../../redux/slices/taskSlice";

export const UserVerify = () => {
    const dispatch = useDispatch();
    let {token} = useParams();
    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState('Click to verify your email');
    const navigate = useNavigate();

    const handleVerifyEmail = async () => {
        try {
            const apiInstance = axios.create(baseAxiosSettings);
            const response = await apiInstance.post(API_URL + VERIFY_MAIL_PATH, {
                token: token
            });

            setIsVerified(true);
            setMessage('Your email has been successfully verified!');

            dispatch(setTokens(response.data));
            dispatch(getTasks());

            delay(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.log(error.response.data);
            setMessage('Some error occurred during verification!');
        }
    };

    return (
        <div className="container text-center mt-5" style={{minHeight: "600px"}}>
            <h1>{message}</h1>
            {!isVerified && (
                <button
                    onClick={handleVerifyEmail}
                    className="btn btn-success mt-4"
                >
                    Verify Email
                </button>
            )}
        </div>
    );
}