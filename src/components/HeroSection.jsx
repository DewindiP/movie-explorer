import React from "react";
import SearchBar from "./SearchBar";
import { useTheme } from "@mui/material/styles";

const HeroSection = ({ title, subtitle, searchQuery, onSearchChange }) => {
  const theme = useTheme();

  // Define keyframes for fade-in animation
  const fadeInAnimation = {
    animation: "fadeIn 1.5s ease-out",
    "@keyframes fadeIn": {
      from: {
        opacity: 0,
        transform: "translateY(20px)",
      },
      to: {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        textAlign: "center",
        color: theme.palette.text.primary,
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Background YouTube Video */}
      <iframe
        src="https://www.youtube.com/embed/sfUAABzXsKQ?autoplay=1&mute=1&loop=1&playlist=sfUAABzXsKQ"
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      ></iframe>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay 
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "'Cinzel', serif", 
            color: theme.palette.text.primary, 
            ...fadeInAnimation, // Fade-in animation
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "30px",
            fontFamily: "'Cinzel', serif",
            color: theme.palette.text.secondary, 
            animation: "fadeIn 2s ease-out", 
          }}
        >
          {subtitle}
        </p>
        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      </div>
    </div>
  );
};

export default HeroSection;