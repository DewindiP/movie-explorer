import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(inputs)); // Store user in localStorage
    alert("Account created!");
    navigate("/signin"); // Navigate to sign-in page
  };

  const fields = [
    { label: "Name", type: "text", name: "name", value: inputs.name, onChange: handleChange },
    { label: "Email", type: "email", name: "email", value: inputs.email, onChange: handleChange },
    { label: "Password", type: "password", name: "password", value: inputs.password, onChange: handleChange },
  ];

  return <AuthForm title="Create Account" fields={fields} onSubmit={handleSubmit} buttonText="Sign Up" />;
};

export default SignUp;