import { useState, useEffect } from "react"; 
import { MovieCard } from "../MovieCard/movie-card.jsx";
import { MovieView } from "../MovieView/movie-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    if (token) { //if theres no token, dont execute the rest

    fetch("https://my-flix-host.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.title,
            image: movie.image,
            description: movie.description,
            genre: {
              name: movie.genre.name
            },
            director: {
              name: movie.director.name
            },
          releaseYear: movie.releaseYear,
        };
        });
        setMovies(moviesFromApi);
      })


      .catch((error) => {
        console.error('There was an error fetching the movies:', error);
      });
      return;
    }
  }, [token]);

console.log(movies);

if (!user) {
  return ( 
    <>
    <LoginView
      onLoggedIn={(user, token) => {
        setUser(user); //if the login was successful, set the user so useState isnt null
        setToken(token); //set the token as well
        localStorage.setItem('token',token);
        localStorage.setItem('user', JSON.stringify(user));
      }}
    />
    or
    <SignupView />
    </>
  ); 
}
return (
  <div>
    <button
      onClick={() => {
        setUser(null);
        localStorage.clear();
      }}
    >
      Logout
    </button>
    {movies.map((movie) => (
      <MovieCard
        key={movie.title}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
    ))}
     <button onClick={() => { setUser(null);setToken(null); localStorage.clear();}}>Logout</button> 
  </div>
);
};
