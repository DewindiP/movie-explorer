import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import AuthForm from "../components/AuthForm";
import Header from "../components/Header";

 // Display search results
  const SignIn = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  // Handle input changes and update
  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

  // Validate user credentials
    if (
      storedUser &&
      storedUser.email === inputs.email &&
      storedUser.password === inputs.password
    ) {
      setIsAuthenticated(true); // Update authentication 
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
       {/* Add the Header component */}
       <Header />

      <AuthForm title="Sign In" fields={fields} onSubmit={handleSubmit} buttonText="Sign In" />
      {/* Add a link to the SignUp page */}
      <p style={{ textAlign: "center", marginTop: "1rem", color: "#FB773C" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#56021F", textDecoration: "bold" }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;