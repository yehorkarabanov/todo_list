import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import apiInstance from "../../utils/axios";
import {useDispatch} from "react-redux";
import {setTokens} from "../../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();

    const [isButtonClicked, setIsButtonCliced] = React.useState(false);
    const chnageButtonClicked = () => {
        setIsButtonCliced(true);
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
            .test('apiValidation', 'Invalid username or password', async function (value) {
                if(isButtonClicked) {
                    try {
                        const response = await apiInstance.post('user/login', {
                            email: this.parent.email,
                            password: value
                        });
                        dispatch(setTokens(response.data));

                        setIsButtonCliced(false);
                        return true;
                    } catch (error) {
                        setIsButtonCliced(false);
                        console.log(error);
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
    };

    // Form submit handler
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        navigate("/");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="col-md-4">
                <h3 className="text-center mb-4">Login</h3>

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

                            {/* Login Button */}
                            <div className="d-grid">
                                <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}
                                onClick={chnageButtonClicked}>
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
