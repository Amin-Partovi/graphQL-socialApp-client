import moment from "moment";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CustomPopup from "../util/customPopup";

const PostCard = ({
  post: {
    body,
    username,
    likes,
    comments,
    likeCount,
    commentCount,
    createdAt,
    id,
  },
}) => {
  const handleComment = () => {};
  const handleLike = () => {};

  const deletePostCallback = () => {};

  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ likeCount, likes, username, id }} user={user} />
        <CustomPopup content="comment on post">
          <Button as="div" labelPosition="right">
            <Button color="blue" basic as={Link} to={`posts/${id}`}>
              <Icon name="comments" />
            </Button>
            <Label as="a" basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </CustomPopup>
        {user && user.username === username && (
          <DeleteButton postId={id} callback={deletePostCallback} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
