import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <Grid container spacing={2} padding={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
