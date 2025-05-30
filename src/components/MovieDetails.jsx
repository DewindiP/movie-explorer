import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import {
  Container,
  Typography,
  CardMedia,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../components/Header";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px); // Start slightly below
  }
  to {
    opacity: 1;
    transform: translateY(0); // End at the original position
  }
`;

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    try {
      const [movieRes, videoRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        ),
      ]);

      setMovie(movieRes.data);

      const trailers = videoRes.data.results.filter(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailers.length > 0) {
        setTrailerKey(trailers[0].key);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching movie:", err);
      setError("Failed to load movie details.");
    } finally {
      setLoading(false);
    }
  }, [id, API_KEY]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!movie) return null;

  return (
    <div>
      {/* Add the Header component */}
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Go Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: "#621940",
            mb: 2,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            backgroundImage: "linear-gradient(to right, #1B1833, #621940)",
            border: "1px solid #621940",
            color: "white",
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            gap: 4,
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          {/* Left Column: Movie Poster */}
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{
              borderRadius: 2,
              width: { xs: "100%", md: 300 },
              height: "auto",
              alignSelf: "center",
            }}
          />

          {/* Right Column: Movie Details */}
          <Box sx={{ flex: 1 }}>
            {/* Movie Title */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#BFD8B3",
              }}
            >
              {movie.title}
            </Typography>

            {/* Release Date */}
            <Typography
              variant="body1"
              paragraph
              sx={{
                maxWidth: 600,
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <strong style={{ color: "#F5EFFF" }}>Release Date:</strong>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1rem",
                  color: "#BFD8B3",
                  fontWeight: "bold",
                }}
              >
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Typography>

            {/* Movie Overview */}
            <Typography
              variant="body1"
              paragraph
              sx={{
                maxWidth: 600,
                fontSize: "0.9rem",
                color: "#E5D9F2",
                textAlign: "justify",
                borderRadius: 2,
                p: 3, // Padding
                boxShadow: 3, // Subtle shadow for depth
                backdropFilter: "blur(10px)",
                animation: `${fadeIn} 1s ease-out`,
              }}
            >
              {movie.overview}
            </Typography>

            {/* Watch Trailer Button */}
            {trailerKey && (
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={() => setOpenTrailer(true)}
                sx={{
                  mt: 2,
                  mr: 2,
                  backgroundColor: "#621940",
                  "&:hover": { backgroundColor: "#56021F" },
                  borderRadius: 2,
                  px: 4,
                }}
              >
                Watch Trailer
              </Button>
            )}

            {/* Refresh Details Button */}
            <Button
              onClick={fetchMovieDetails}
              variant="outlined"
              sx={{
                mt: 2,
                color: "white",
                borderColor: "white",
                "&:hover": {
                  color: "#ffff",
                  borderColor: "#56021F",
                },
              }}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh Details"}
            </Button>
          </Box>
        </Box>

        {/* Trailer Dialog */}
        <Dialog
          open={openTrailer}
          onClose={() => setOpenTrailer(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent sx={{ p: 0 }}>
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              width="100%"
              height="500"
              frameBorder="0"
              allowFullScreen
            />
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default MovieDetails;
