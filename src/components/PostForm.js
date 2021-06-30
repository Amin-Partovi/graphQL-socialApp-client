import { Form, Button } from "semantic-ui-react";
import useForm from "../util/hooks/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const PostForm = () => {
  const { values, handleSubmit, handleChange } = useForm(createPostCallback, {
    body: "",
  });

  function createPostCallback() {
    createPost();
  }

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      let writeableData = [...data.getPosts];
      writeableData = [result.data.createPost, ...writeableData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: writeableData },
      });
      console.log(data);
      console.log(result);
      values.body = "";
    },
  });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a Post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="hi world!"
            onChange={handleChange}
            name="body"
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      body
      id
      username
      createdAt
      likes {
        id
        createdAt
        username
      }
      likeCount
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default PostForm;
