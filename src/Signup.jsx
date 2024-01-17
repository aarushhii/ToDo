import React from 'react';
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const generateRandomToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 10;
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
};

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      
      localStorage.removeItem('signupToken');

 
      console.log('SignUp Form Values:', values);

      
      localStorage.setItem('signupDetails', JSON.stringify(values));

      const token = generateRandomToken();

      localStorage.setItem('signupToken', token);

      navigate(`/signin?token=${token}`);
    },
  });


  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && <div className="error-message">{formik.errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
