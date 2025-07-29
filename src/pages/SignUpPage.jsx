import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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

  return (
    <div
      style={{
      minHeight: "100vh",
      backgroundImage: 'url("/assets/harry-potter.jpg")', // Use your image path
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
      {/* Add the Header component */}
      <Header />

    <AuthForm title="Create Account" fields={fields} onSubmit={handleSubmit} buttonText="Sign Up" />;
    </div>
  );
};

export default SignUp;