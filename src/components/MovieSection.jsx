import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import MovieList from "./MovieList";

const MovieSection = ({ title, url }) => {
  const [movies, setMovies] = useState([]);

// Fetch movies from the API when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(url); // Fetch data from the API
        setMovies(response.data.results); // Update the movies state
      } catch (err) {
        console.error(`Failed to fetch ${title}:`, err);
      }
    };

    fetchCategory(); 
  }, [url]);

  return (
    <Box sx={{ mb: 6 }}> {/* Wrapper Box for spacing and layout */}
      {/* Title of the section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#BFD8B3",
          mb: 3,
          textAlign: "center",
          textTransform: "uppercase", }}>
        {title}
      </Typography>
      
      {/* Movie list component to display the movies */}
        <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieSection;
