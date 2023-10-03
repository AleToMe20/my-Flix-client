import PropTypes from "prop-types";
import './movie-view.scss';
import {Card, Button} from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card border="primary" className="movieCard">
    <Card.Img height="30%" className="object-fit-cover flex-fill" src={movie.image}/>
    <Card.Body>
        <Card.Title>Title: {movie.title}<br/></Card.Title>
        <Card.Text>
           Description: {movie.description}<br/>
           Director: {movie.director.name}<br/>
           Genre: {movie.genre.name}<br/>
        </Card.Text>
        <Button variant='primary' onClick={onBackClick}>Back</Button>
    </Card.Body>
</Card>);
}

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
