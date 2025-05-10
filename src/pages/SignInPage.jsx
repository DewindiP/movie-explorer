import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (
      user &&
      user.email === inputs.email &&
      user.password === inputs.password
    ) {
      alert('Login successful!');
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  const fields = [
    { label: 'Email', type: 'email', name: 'email', value: inputs.email, onChange: handleChange },
    { label: 'Password', type: 'password', name: 'password', value: inputs.password, onChange: handleChange },
  ];

  return <AuthForm title="Sign In" fields={fields} onSubmit={handleSubmit} buttonText="Login" />;
};

export default SignIn;
