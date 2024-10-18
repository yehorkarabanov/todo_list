import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {API_URL, baseAxiosSettings, LOGIN_PATH, VERIFY_MAIL_PATH, VERIFY_MAIL_URL} from "../../utils/settings";
import {useDispatch} from "react-redux";
import {setTokens} from "../../redux/slices/userSlice";
import {delay} from "lodash"
import axios from "axios";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const PasswordResetToken = () => {
    const [show, setShow] = React.useState(false);

    const navigate = useNavigate();
    const handleClose = () => {
        setShow(false);
        navigate(LOGIN_PATH)
    };
    const handleShow = () => setShow(true);
    let {token} = useParams();
    const [isButtonClicked, setIsButtonCliced] = React.useState(false);
    const chnageButtonClicked = () => {
        setIsButtonCliced(true);
    };

    // Yup validation schema for the Register form
    const RegisterSchema = Yup.object().shape({
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required').test('apiValidation', 'Invalid username or password', async function (value) {
                console.log(VERIFY_MAIL_URL);
                if (isButtonClicked) {
                    try {
                        const apiInstance = axios.create(baseAxiosSettings);
                        const response = await apiInstance.post('user/password-reset/token', {
                            token: token,
                            password: this.parent.password,
                            confirm_password: value,
                        });

                        setIsButtonCliced(false);
                        return true;
                    } catch (error) {
                        setIsButtonCliced(false);
                        console.log(error.response.data);
                        return this.createError({
                            path: 'password',
                            message: 'Error while setting new password'
                        });
                    }
                }
                return true;
            }),
    });
    // Initial values for the form
    const initialValues = {
        password: '',
        confirmPassword: '',
    };


    // Form submit handler
    const handleSubmit = (values, {resetForm}) => {
        handleShow();
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center mt-5"
                 style={{minHeight: "600px"}}>
                <div className="col-md-4">
                    <h3 className="text-center mb-4">Register</h3>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                {/* Password Field */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-danger"/>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Repeat Password</label>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Repeat your password"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-danger"/>
                                </div>

                                {/* Register Button */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}
                                            onClick={chnageButtonClicked}>
                                        {isSubmitting ? 'Setting new password...' : 'Set new password'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Email sent successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>This may take coupe minutes to get a mail.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};