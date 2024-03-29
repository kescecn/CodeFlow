import { useEffect, useState } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import authActions from "../../authentication/actions/authActions";
import useAuth from "../../authentication/hook/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentsPanel = ({ commentsSource, id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth, authDispatch, history] = useAuth();

  useEffect(() => {
    axiosInstance(authDispatch, history)
      .get(commentsSource + id)
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        authDispatch({
          type: authActions.ERROR,
          payload: err.response ? err.response.data : "COULD NOT CONNECT",
        });
      });
  }, []);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const setNewComment = (newComment) => {
    let copy = [...comments];
    for (let i = 0; i < comments.length; i++) {
      if (copy[i].commentId === newComment.commentId) {
        copy[i] = newComment;
        break;
      }
    }
    setComments([...copy]);
  };

  const removeComment = (commentId) => {
    let filtered = comments.filter((comment) => {
      return comment.commentId !== commentId;
    });
    setComments([...filtered]);
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <Container
      fluid
      className="d-flex h-100 justify-content-between p-0 column"
    >
      <Container
        fluid
        className="flex-grow-1"
        style={{ height: "500px", overflow: "auto" }}
      >
        {comments.length === 0 && (
          <Jumbotron className="text-white mt-2 text-center bg-dark">
            It seems there are no comments here yet!{" "}
          </Jumbotron>
        )}
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              loggedInUser={auth.data}
              id={id}
              setNewComment={setNewComment}
              removeComment={removeComment}
              commentSource={commentsSource}
              key={comment.commentId + "-" + comment.commenter.username}
            ></Comment>
          );
        })}
      </Container>
      <Container fluid className="p-0">
        <CommentForm
          method={addComment}
          text={""}
          action={"create/"}
          id={id}
          commentsSource={commentsSource}
          buttonText={"Comment"}
        ></CommentForm>
      </Container>
    </Container>
  );
};

export default CommentsPanel;
