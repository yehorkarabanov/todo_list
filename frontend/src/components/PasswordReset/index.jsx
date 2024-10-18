import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {baseAxiosSettings} from "../../utils/settings";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const PasswordReset = () => {
    const dispatch = useDispatch();

    const [isButtonClicked, setIsButtonCliced] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const chnageButtonClicked = () => {
        setIsButtonCliced(true);
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required')
            .test('apiValidation', 'No user with such email', async function (value) {
                if (isButtonClicked) {
                    try {
                        const apiInstance = axios.create(baseAxiosSettings);
                        const response = await apiInstance.post('user/password-reset', {
                            email: value
                        });

                        setIsButtonCliced(false);
                        return true;
                    } catch (error) {
                        setIsButtonCliced(false);
                        console.log(error.response.data);
                        return this.createError({
                            path: 'email',
                            message: 'No user with such email'
                        });
                    }
                }
                return true;
            }),
    });
    // Initial values for the form
    const initialValues = {
        email: '',
    };

    // Form submit handler
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        handleShow();
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center mt-5"
                 style={{minHeight: "600px"}}>
                <div className="col-md-4">
                    <h3 className="text-center mb-4">Password reset</h3>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                {/* Email Field */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger"/>
                                </div>

                                {/* Login Button */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}
                                            onClick={chnageButtonClicked}>
                                        {isSubmitting ? 'Sending mail...' : 'Send mail'}
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
