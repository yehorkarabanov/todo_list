import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

// Yup validation schema for the Register form
const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

export const Register = () => {
    // Initial values for the form
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    // Form submit handler
    const handleSubmit = (values, {resetForm}) => {
        console.log('Form values:', values);
        resetForm();  // Reset the form after submission
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
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
                                <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
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