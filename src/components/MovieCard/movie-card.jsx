import PropTypes from "prop-types";

 // The BookCard function component 
export const MovieCard = ({ book, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onBookClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onBookClick: PropTypes.func.isRequired
};