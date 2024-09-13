import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackgroundImageLayout from '../../components/BackgroundImageLayout/BackgroundImageLayout';
import FormHeader from '../../components/FormHeader/FormHeader';
import { useDispatch } from 'react-redux';
import { login } from '../../states/slices/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = users.find(user => user.email === values.email);

      if (!foundUser) {
          toast.error('Email address doesn’t exist');
      } else if (foundUser.password !== values.password) {
          toast.error('Incorrect password');
      } else {
          dispatch(login(foundUser));
          localStorage.setItem("loggedInUser", JSON.stringify(foundUser))
          toast.success('Login Successful!', { duration: 5000 });
          setTimeout(() => {
            navigate('/home');
          }, 1000)
      }

      resetForm();
  };

  return (
     <div className="flex flex-col md:flex-row h-screen">
      <BackgroundImageLayout/>
      <div className="flex flex-col lg:justify-center md:justify-center w-full h-screen md:w-1/2 lg:w-1/3 p-6 md:p-12 bg-white">
      <FormHeader title={"IrusriTodo"}/>
        <p className="text-gray-500 mb-8">Please login here</p>

        <Formik
          initialValues={{ email: '', password: '', rememberMe: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <Field
                  as={Input}
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  as={Input.Password}
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex items-center justify-center mb-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <span
                    onClick={() => navigate('/register')}
                    className="text-primary font-semibold cursor-pointer hover:underline"
                  >
                    Sign Up
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-md focus:outline-none focus:ring-2 "
                disabled={isSubmitting}
            >
                Login
            </button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  )
}

export default Login