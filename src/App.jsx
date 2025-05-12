import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/HomePage";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication

  return (
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/signin"
          element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/movie/:id"
          element={
            isAuthenticated ? (
              <MovieDetails />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;