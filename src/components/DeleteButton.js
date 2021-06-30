import { Button, Icon, Confirm } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import CustomPopup from "../util/customPopup";

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        let writeable = [...data.getPosts];
        writeable = writeable.filter(p => p.id !== postId);
        console.log(data);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: writeable },
        });
      }

      setConfirmOpen(false);
      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <CustomPopup content={commentId ? "delete comment" : "delete post"}>
        <Button
          floated="right"
          onClick={() => setConfirmOpen(true)}
          as="div"
          color="red">
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </CustomPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      likes {
        id
        username
      }
      likeCount
      commentCount
      comments {
        id
        username
        createdAt
      }
    }
  }
`;
export default DeleteButton;
