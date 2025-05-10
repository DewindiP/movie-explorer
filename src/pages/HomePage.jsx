import React, { useEffect } from 'react';
import axios from "axios";
import MovieList from "../components/MovieList";


const HomePage = () => {
    const [movies, setMovies] = React.useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;
    console.log(API_KEY); // Outputs: your_api_key_here
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const fetchMovie = async () => {
        await axios.get(API_URL).then((response) => {
            console.log(response.data);
        })
    }

  return (<>
     <button onClick={fetchMovie}>
        Fetch
      </button>
      </>
  )
}

export default HomePage;