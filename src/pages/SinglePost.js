import { useContext, useEffect, useState, useRef } from "react";
import gql from "graphql-tag";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from "../context/authContext";
import CustomPopup from "../util/customPopup";

const SinglePost = props => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const commentRef = useRef();

  const { data } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
      commentRef.current.blur();
    },
    variables: {
      body: comment,
      postId: postId,
    },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

  if (!data) return <div> loading Post ..</div>;

  const {
    username,
    id,
    likes,
    likeCount,
    createdAt,
    comments,
    commentCount,
    body,
  } = data.getPost;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Image
            floated="right"
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <LikeButton
                post={{ username, likes, likeCount, id }}
                user={user}
              />
              <CustomPopup content="comment on post">
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment")}>
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label pointing="left" color="blue">
                    {commentCount}
                  </Label>
                </Button>
              </CustomPopup>
              {user && user.username === username && (
                <DeleteButton postId={postId} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Form>
                <p>enter a comment:</p>
                <div className="ui input fluid action">
                  <input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    name="comment"
                    placeholder="comment .."
                    ref={commentRef}
                  />
                  <Button
                    type="submit"
                    onClick={submitComment}
                    color="teal"
                    disabled={comment.trim() === ""}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Content>
          </Card>
          {comments.map(comment => (
            <Card fluid>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={postId} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POST = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      likeCount
      commentCount
      createdAt
      likes {
        username
      }
      comments {
        id
        body
        createdAt
        username
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        createdAt
        username
        body
      }
    }
  }
`;
export default SinglePost;
