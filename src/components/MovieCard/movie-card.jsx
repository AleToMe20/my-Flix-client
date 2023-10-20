import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

  const addFavoriteMovie = () => {
    fetch(
      `https://my-flix-host.onrender.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user)); // updating user on local storage
          setUser(user); // updating the react application
          setIsFavorite(true);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavoriteMovie = async () => {
    try {
      const response = await fetch(
        `https://my-flix-host.onrender.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        alert("Failed");
        return;
      }

      const updatedUser = await response.json();

      if (updatedUser) {
        alert("successfully deleted from favorites");
        localStorage.setItem("user", JSON.stringify(updatedUser)); // updating user on local storage
        setUser(updatedUser); // updating the react application
        setIsFavorite(false);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Card className="h-100 card text-bg-dark mb-3">
        <Card.Img className="w-100" variant="top" src={movie.image} />
        <Card.Body>
          {isFavorite ? (
            <Button variant="danger" onClick={removeFavoriteMovie}>
              Remove from favorite
            </Button>
          ) : (
            <Button variant="primary" onClick={addFavoriteMovie}>
              Add to favorite
            </Button>
          )}
        </Card.Body>

        <Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Button className="info-button" variant="outline-light">
              More Info
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
