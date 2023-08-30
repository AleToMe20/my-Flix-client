import { useState, useEffect } from "react"; 
import { MovieCard } from "../MovieCard/movie-card.jsx";
import { MovieView } from "../MovieView/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Use useEffect to fetch movie data
    fetch("https://my-flix-host.onrender.com/movies", {
      mode: 'no-cors'  // Set to no-cors mode
    })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id, // Assuming '_id' exists in your movie objects
          title: movie.Title,
        }));
  
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('There was an error fetching the movies:', error);
      });
  }, []);

console.log(movies);

  if (selectedMovie) {
    return (
      <MovieView 
      movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} 
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
