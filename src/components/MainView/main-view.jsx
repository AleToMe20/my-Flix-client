import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card.jsx";
import { MovieView } from "../MovieView/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        title: "Wonder Women",
        image: "https://upload.wikimedia.org/wikipedia/en/9/93/Wonder_Woman.jpg",
        description:
          "A pilot crashes on a mysterious island and one of the Amazonian women there goes with him back to England to help them fight in the war.",
        genre: "Adventure",
        director: "Patty Jenkins",
      },
  
      {
        id: 2,
        title: "The Rocketeer",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-MTS8bU1LallUVaHtiEpNgg3ug-rPTeTlTUKVs8bvnSc3vuOa",
        description:
          "An action film is built around the main character being thrust into a series of events which involve voilence, explosions and  chases.",
        genre: "Action",
        director: "Joe Johnston",
      },
  
      {
        id: 3,
        title: "Dick Tracy",
        image: "https://upload.wikimedia.org/wikipedia/en/d/de/Dicktracy1238.jpg",
        description:
          "Detective Dick Tracy is trying to find evidence to put the city's crime boss, Big Boy Caprice, away for good.",
        genre: "Action",
        director: "Warren Beatty",
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
