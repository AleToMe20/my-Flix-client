import { useState, useEffect } from "react"; 
import { MovieCard } from "../MovieCard/movie-card.jsx";
import { MovieView } from "../MovieView/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => { // Use useEffect to fetch movie data
    fetch("https://my-flix-host.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => ({
          id: doc.key,
          title: doc.title,
          image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
          author: doc.author_name?.[0],
        }));

        setMovies(moviesFromApi);
      });
  }, []); // Empty dependency array, runs once on component mount
  
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
