import { useState, useEffect } from "react"; 
import { MovieCard } from "../MovieCard/movie-card.jsx";
import { MovieView } from "../MovieView/movie-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    return (
        <Row className='justify-content-md-center'>
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : (movies.length === 0) ? (
                <div>
                    The list is empty!
                </div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className='mb-5' key={movie.id} s={1} md={4} l={3} xl={2}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}

                    <button
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </button>
                </>
            )}
        </Row>
    );
};