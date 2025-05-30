import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import HeroSection from "../components/HeroSection";
import MovieRow from "../components/MovieRow";
import Header from "../components/Header"; // Adjust path if different

// API key for TMDB 
const API_KEY = process.env.REACT_APP_API_KEY;

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Delay of 500ms
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    // Main container for the HomePage
    <Container maxWidth="xl" disableGutters>
        <Header />
        
       {/* Hero section with title, subtitle, and search bar */}  
      <HeroSection
        title="CineScope"
        subtitle="Discover Your Favorite Films"
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />
       
       {/* Conditional rendering based on whether a search query exists */}
      {!debouncedSearchQuery ? (
        <>
         {/* Display rows of movies when no search query is entered */}
          <MovieRow
            title="All Movies"
            fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`}
          />
          <MovieRow
            title="Now Playing"
            fetchUrl={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`}
          />
          <MovieRow
            title="Top Rated"
            fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
          />
          <MovieRow
            title="Upcoming"
            fetchUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`}
          />
        </>
      ) : (
         // Display search results
        <MovieRow
          title={`Search Results for "${debouncedSearchQuery}"`}
          fetchUrl={`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedSearchQuery}`}
        />
      )}
    </Container>
  );
};

export default HomePage;