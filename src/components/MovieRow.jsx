import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme
import MovieCard from "./MovieCard";

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const theme = useTheme(); // Access the current theme

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results || []);
    };
    fetchMovies();
  }, [fetchUrl]);

  return (
    <Box sx={{ margin: "40px 0", paddingX: 2 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: theme.palette.text.primary, // Set the title color
          fontWeight: "bold",
          fontStyle: "Roboto",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 2,
          maxHeight: "800px",
          overflowY: "auto",

          // Hide Scrollbar
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
};

export default MovieRow;