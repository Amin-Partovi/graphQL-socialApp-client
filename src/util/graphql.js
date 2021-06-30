import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      body
      username
      id
      likeCount
      commentCount
      createdAt
      likes {
        id
        username
      }
      comments {
        body
        username
        id
        createdAt
      }
    }
  }
`;
