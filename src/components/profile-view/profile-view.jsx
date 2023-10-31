import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import "./profile-view.scss";

export const ProfileView = ({ token, setUser, movies }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [showModal, setShowModal] = useState(false);
  const favoriteMovies = movies?.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };
    if (password) {
      data["Password"] = password;
    }

    fetch(`https://my-flix-host.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Update failed.");
        }
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      });
  };

  const handleDeleteUser = () => {
    fetch(
      `https://my-flix-host.onrender.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Your account has been deleted");
      } else {
        alert("something went wrong.");
      }
    });
  };

  return (
    <>
      <h1 className="profile">Profile</h1>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="form-group">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="form-group">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="form-group">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthday" className="form-group">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col className="save-button">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="delete-button">
          <Button
            variant="link"
            className="text-danger"
            onClick={handleShowModal}
          >
            Delete my account
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className="favorite-title">Favorite movies:</h3>
        </Col>
      </Row>
      <Row>
        {favoriteMovies?.map((movie) => (
          <Col className="mb-5" key={movie._id} md={6}>
            <MovieCard
              movie={movie}
              user={user}
              token={token}
              setUser={setUser}
            ></MovieCard>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account permanantly?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
