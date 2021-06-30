import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import CustomPopup from "../util/customPopup";

const LikeButton = ({ post: { username, likes, likeCount, id }, user }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user) {
      if (likes.find(like => user.username === like.username)) {
        setLiked(true);
      } else setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const LikeBtn = () => {
    return user ? (
      liked ? (
        <Button color="teal">
          <Icon name="heart" />
        </Button>
      ) : (
        <Button color="teal" basic>
          <Icon name="heart" />
        </Button>
      )
    ) : (
      <Button color="teal" as={Link} to="/login" basic>
        <Icon name="heart" />
      </Button>
    );
  };

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <CustomPopup content={liked ? "unlike" : "like"}>{LikeBtn()}</CustomPopup>
      <Label as="a" basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        createdAt
        username
        id
      }
      likeCount
    }
  }
`;

export default LikeButton;
