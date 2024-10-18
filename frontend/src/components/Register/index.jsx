import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {baseAxiosSettings, VERIFY_MAIL_URL} from "../../utils/settings";
import axios from "axios";

export const Register = () => {
    const [isButtonClicked, setIsButtonCliced] = React.useState(false);
    const chnageButtonClicked = () => {
        setIsButtonCliced(true);
    };

    // Yup validation schema for the Register form
    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required').test('apiValidation', 'Invalid username or password', async function (value) {
                console.log(VERIFY_MAIL_URL);
                if (isButtonClicked) {
                    try {
                        const apiInstance = axios.create(baseAxiosSettings);
                        const response = await apiInstance.post('user/register', {
                            email: this.parent.email,
                            password: this.parent.password,
                            confirm_password: value,
                        });

                        setIsButtonCliced(false);
                        return true;
                    } catch (error) {
                        setIsButtonCliced(false);
                        console.log(error.response.data);
                        return this.createError({
                            path: 'email',
                            message: 'Invalid username or password'
                        });
                    }
                }
                return true;
            }),
    });
    // Initial values for the form
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const navigate = useNavigate();
    // Form submit handler
    const handleSubmit = (values, {resetForm}) => {
        navigate(VERIFY_MAIL_URL);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5" style={{minHeight: "600px"}}>
            <div className="col-md-4">
                <h3 className="text-center mb-4">Register</h3>

                <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterSchema}
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
                                    {isSubmitting ? 'Registering...' : 'Register'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};