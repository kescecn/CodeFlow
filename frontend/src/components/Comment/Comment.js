import { useState } from "react";
import { Card, Container, Dropdown } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import authActions from "../../authentication/actions/authActions";
import useAuth from "../../authentication/hook/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import LinkToUser from "../Users/LinkToUser";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  loggedInUser,
  commentSource,
  setNewComment,
  removeComment,
}) => {
  const [edit, setEdit] = useState(false);
  const [auth, authDispatch, history] = useAuth();

  const updateComment = (updatedComment) => {
    setNewComment(updatedComment);
    setEdit(false);
  };
  const deleteComment = () => {
    if (window.confirm("Do you want to delete your comment?"))
      axiosInstance(authDispatch, history)
        .delete(commentSource + "delete/" + comment.commentId)
        .then((res) => {
          removeComment(comment.commentId);
        })
        .catch((err) => {
          authDispatch({
            type: authActions.ERROR,
            payload: err.response ? err.response.data : "COULD NOT CONNECT",
          });
        });
  };
  return (
    <Card
      bg={"charcoal"}
      className="mb-2 mt-1 border border-rich-black text-baby-powder"
    >
      <Card.Header>
        <Container fluid className="p-0">
          <span>
            <LinkToUser name={comment.commenter.username}></LinkToUser>
          </span>
          {loggedInUser.username === comment.commenter.username && (
            <Dropdown className="d-inline float-right">
              <Dropdown.Toggle
                variant="charcoal"
                className="bg-charcoal text-baby-powder btn-sm border border-rich-black"
                id="dropdown-basic"
                split={true}
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                {!edit && (
                  <Dropdown.Item onClick={() => setEdit(!edit)}>
                    Edit
                  </Dropdown.Item>
                )}
                {edit && (
                  <Dropdown.Item onClick={() => setEdit(!edit)}>
                    Cancel
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={deleteComment}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Container>
      </Card.Header>
      {!edit && (
        <Card.Body>
          <span>
            <ReactMarkdown>{comment.comment}</ReactMarkdown>
          </span>
        </Card.Body>
      )}
      {edit && (
        <Card.Body className="p-0">
          <CommentForm
            method={updateComment}
            text={comment.comment}
            action={"update/"}
            id={comment.commentId}
            commentsSource={commentSource}
            buttonText={"Update"}
          ></CommentForm>
        </Card.Body>
      )}
    </Card>
  );
};

export default Comment;
