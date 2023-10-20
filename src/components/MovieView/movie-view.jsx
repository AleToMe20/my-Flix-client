import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../MovieView/movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies?.find((m) => m._id === movieId);
  return (
    <div>
      <div>
        <img src={movie?.image} alt={movie?.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie?.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie?.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie?.genre?.name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie?.director?.name}</span>
      </div>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>{" "}
    </div>
  );
};

// Define PropTypes for MovieView component
MovieView.propTypes = {
  // array of movies
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
    }).isRequired
  ),
};
