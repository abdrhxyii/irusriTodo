import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackgroundImageLayout from '../../components/BackgroundImageLayout/BackgroundImageLayout';
import FormHeader from '../../components/FormHeader/FormHeader';

const Register = () => {
    const navigate = useNavigate();
    const notifySuccess = () => toast.success('Registration Successful!', { duration: 3000 });
  
    const validationSchema = Yup.object({
      name: Yup.string().required('Name is required').required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(user => user.email === values.email);
      if (userExists) {
          toast.error('Email already registered');
      } else {
          const newUser = { name: values.name, email: values.email, password: values.password };
          users.push(newUser); 
          localStorage.setItem('users', JSON.stringify(users));
          notifySuccess();
          setTimeout(() => {
            navigate('/login');
          }, 1000)
      }
      resetForm();
  }

    return (
    <div className="flex flex-col md:flex-row h-screen">
      <BackgroundImageLayout/>
      <div className="flex flex-col lg:justify-center md:justify-center w-full h-screen md:w-1/2 lg:w-1/3 p-6 md:p-12 bg-white">
      <FormHeader title={"IrusriTodo"}/>

        <h2 className="text-xl font-semibold mb-4">Welcome 👋</h2>
        <p className="text-gray-500 mb-8">Please register here</p>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
            <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Name</label>
            <Field
                as={Input}
                type="text"
                id="name"
                name="name"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
                placeholder="Enter your name"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
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
                  Already have an account?{' '}
                  <span
                    onClick={() => navigate('/login')}
                    className="text-primary font-semibold cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-md focus:outline-none focus:ring-2 "
                disabled={isSubmitting}
            >
                Register
            </button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
    )
}

export default Register