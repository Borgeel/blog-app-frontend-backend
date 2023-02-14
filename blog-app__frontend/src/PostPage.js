import React, { useContext } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import client from "./client";
import DataContext from "./context/DataContext";

function PostPage() {
  const { posts, setPosts } = useContext(DataContext);

  const { id } = useParams();
  const post = posts.find((post) => post._id.toString() === id);
  const history = useHistory();

  // const deleteHandler = async (id) => {
  //   try {
  //     await api.delete(`/posts/${id}`);
  //     const postsList = posts.filter((post) => post.id !== id);
  //     setPosts(postsList);
  //     history.push("/");
  //   } catch (error) {
  //     console.log(`Error: ${error.message}`);
  //   }
  // };

  const deleteHandler = (id) => {
    client.delete(id).then(() => {
      history.push("/");
    });
  };

  return (
    <>
      {post && (
        <Container>
          <Card>
            <Card.Header as="h3"> {post.title} </Card.Header>
            <Card.Body>
              <Card.Subtitle> {post.date} </Card.Subtitle>
              <Card.Text> {post.body} </Card.Text>
              <Link to={`/edit/${post._id}`}>
                <Button variant="secondary" className="m-2">
                  Edit Post
                </Button>
              </Link>
              <Button variant="danger" onClick={() => deleteHandler(post._id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Container>
      )}
      {!post && (
        <Container>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </Container>
      )}
    </>
  );
}

export default PostPage;
