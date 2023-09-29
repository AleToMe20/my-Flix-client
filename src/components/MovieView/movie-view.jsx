import PropTypes from "prop-types";
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
      <img src={movie.image} className='w-100' />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
                  <button
                onClick={onBackClick}
                className='back-button'
                style={{ cursor: 'pointer' }}
            >
                Back
            </button>
    </div>
  );
};

// Define PropTypes for MovieView component
MovieView.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired
  }),
}).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
