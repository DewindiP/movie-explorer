import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  useTheme,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../components/Header";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

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
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!movie) return null;

  // Define theme-based colors
  const isDark = theme.palette.mode === "dark";
  const bgGradient = isDark
    ? "linear-gradient(to right, #1B1833, #621940)"
    : "linear-gradient(to right,  #FB773C , #d9832e)";
  const titleColor = isDark ? "#BFD8B3" : "#BFD8B3";
  const dateColor = isDark ? "#F5EFFF" : "#F5EFFF";
  const textColor = isDark ? "#E5D9F2" : "#E5D9F2";

  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: theme.palette.mode === "dark" ? "#621940" : "#FB773C",
            mt: 1,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            backgroundImage: bgGradient,
            border: "1px solid #621940",
            color: textColor,
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

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: titleColor,
              }}
            >
              {movie.title}
            </Typography>

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
              <strong style={{ color: dateColor }}>Release Date:</strong>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1rem",
                  color: titleColor,
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

            <Typography
              variant="body1"
              paragraph
              sx={{
                maxWidth: 600,
                fontSize: "0.9rem",
                color: textColor,
                textAlign: "justify",
                borderRadius: 2,
                p: 3,
                boxShadow: 3,
                backdropFilter: "blur(10px)",
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0,0,0,0.05)",
                animation: `${fadeIn} 1s ease-out`,
              }}
            >
              {movie.overview}
            </Typography>

            {trailerKey && (
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={() => setOpenTrailer(true)}
                sx={{
                  mt: 2,
                  mr: 2,
                  backgroundColor: theme.palette.mode === "dark" ? "#621940" : "#FB773C",
                  "&:hover": { backgroundColor: "#56021F" },
                  borderRadius: 2,
                  px: 4,
                }}
              >
                Watch Trailer
              </Button>
            )}

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
