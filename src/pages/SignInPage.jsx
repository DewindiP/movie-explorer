import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import AuthForm from "../components/AuthForm";

const SignIn = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === inputs.email &&
      storedUser.password === inputs.password
    ) {
      setIsAuthenticated(true); // Update authentication state
      navigate("/"); // Navigate to home page
    } else {
      alert("Invalid email or password!");
    }
  };

  const fields = [
    { label: "Email", type: "email", name: "email", value: inputs.email, onChange: handleChange },
    { label: "Password", type: "password", name: "password", value: inputs.password, onChange: handleChange },
  ];

  return (
    <div>
      <AuthForm title="Sign In" fields={fields} onSubmit={handleSubmit} buttonText="Sign In" />
      {/* Add a link to the SignUp page */}
      <p style={{ textAlign: "center", marginTop: "1rem", color: "#BFD8B3" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#A678B4", textDecoration: "none" }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;