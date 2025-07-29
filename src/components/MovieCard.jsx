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
import { useTheme } from "@mui/material/styles";

// Movie card component to display movie details
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#621940" : "#d9832e",
        borderRadius: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)", 
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)" 
        },
      }}
    >
      {/* Movie poster */}
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        {/* Movie title */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: "400",
            fontSize: "1.1rem",
            color: theme.palette.mode === "dark" ? "#BFD8B3" : "#621940",  
            letterSpacing: "0.5px", 
          }}
        >
          {movie.title}
        </Typography>

        {/* Movie Rating */}
        <Box display="flex" alignItems="center" mb={1}>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography ml={1} variant="body2" sx={{ color: "#BFD8B3" }}> 
            {movie.vote_average.toFixed(1)}
          </Typography>
        </Box>
        
        {/* More Details Button */}
        <Button
          variant="outlined"
          size="small"
          backgroundColor="#56021F"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              color: "#ffff",
              borderColor: "#56021F",
              backgroundColor: "#56021F"
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
