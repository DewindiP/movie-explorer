import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundColor: "#621940",
        borderRadius: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)", 
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)" 
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: "400",
            fontSize: "1.1rem",
            color: "#BFD8B3", 
            letterSpacing: "0.5px", 
          }}
        >
          {movie.title}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography ml={1} variant="body2">
            {movie.vote_average.toFixed(1)}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              color: "#A678B4",
              borderColor: "#A678B4",
            },
          }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          More Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
